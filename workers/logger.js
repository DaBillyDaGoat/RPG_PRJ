// ProjectLeroy — Dev Log Worker
// Cloudflare Worker + KV backend for cross-device dev logging
//
// Setup:
//   1. Go to Workers & Pages → Create Worker → paste this file
//   2. Go to KV → Create namespace → Name: GAME_LOGS
//   3. In the Worker → Settings → Variables → KV namespace bindings
//      Variable name: GAME_LOGS  →  KV namespace: GAME_LOGS
//   4. Copy your Worker URL (e.g. https://projectleroy-logger.YOUR.workers.dev)
//   5. Paste it into LOG_REMOTE_URL in js/game.js

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const JSON_HEADERS = { ...CORS, 'Content-Type': 'application/json' };

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: JSON_HEADERS });
}

function ok(text = 'ok') {
  return new Response(text, { headers: CORS });
}

function err(msg = 'error', status = 400) {
  return new Response(msg, { status, headers: CORS });
}

/** List ALL keys with a given prefix (handles pagination). */
async function listAllKeys(kv, prefix) {
  let allKeys = [];
  let cursor;
  do {
    const list = await kv.list({ prefix, cursor, limit: 1000 });
    allKeys = allKeys.concat(list.keys);
    cursor = list.list_complete ? undefined : list.cursor;
  } while (cursor);
  return allKeys;
}

/** Read a JSON value from KV, return parsed object or null. */
async function kvGet(kv, key) {
  const raw = await kv.get(key);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

/** Write JSON to KV (no TTL). */
async function kvPut(kv, key, obj) {
  await kv.put(key, JSON.stringify(obj));
}

/** Unique-ify an array in place and return it. */
function uniqPush(arr, val) {
  if (val != null && !arr.includes(val)) arr.push(val);
  return arr;
}

// ---------------------------------------------------------------------------
// Summary builders — called from POST /log
// ---------------------------------------------------------------------------

function freshPlayer(codename, ts) {
  return {
    codename,
    totalSessions: 0, totalTurns: 0, totalEvents: 0,
    wins: 0, losses: 0,
    deathCauses: {}, victoryTypes: {},
    factionCounts: {}, classCounts: {},
    totalGoldEarned: 0, peakGold: 0,
    locationsVisited: [],
    maxTerritoriesHeld: 0,
    avgSurvivalTurns: 0, longestRun: 0, fastestWin: Infinity,
    sessionIds: [],
    username: null, loginCode: null,
    firstSeen: ts, lastSeen: ts,
  };
}

function freshSession(sid, codename, ts) {
  return {
    sid, codename,
    campaign: null, faction: null, class: null, charName: null,
    skills: null,
    startedAt: ts, endedAt: null,
    turnCount: 0, outcome: null, outcomeDetail: null,
    finalHp: 0, finalDay: 0,
    maxTerritoriesHeld: 0, peakGold: 0,
    locationsVisited: [],
    choicesMade: 0, customActions: 0,
    factionsContacted: [],
    lastGold: 0,
  };
}

/** Update player + session summaries for one event. */
async function updateSummaries(kv, event) {
  const codename = event.cn || 'Unknown';
  const sid = event.sid || 'x';
  const ts = event.ts || Date.now();
  const type = event.type;

  // --- Read existing summaries (or create fresh) ---
  let player, session;
  try {
    player = (await kvGet(kv, `player:${codename}`)) || freshPlayer(codename, ts);
  } catch { player = freshPlayer(codename, ts); }
  try {
    session = (await kvGet(kv, `session:${sid}`)) || freshSession(sid, codename, ts);
  } catch { session = freshSession(sid, codename, ts); }

  // --- Global bookkeeping ---
  player.totalEvents++;
  if (ts > player.lastSeen) player.lastSeen = ts;
  if (ts < player.firstSeen) player.firstSeen = ts;
  uniqPush(player.sessionIds, sid);

  // --- Per-type logic ---
  switch (type) {
    case 'session_start': {
      player.totalSessions++;
      const faction = event.faction || event.fid || null;
      const cls = event.class || event.cls || null;
      session.campaign = event.campaign || 'jersey';
      session.faction = faction;
      session.class = cls;
      session.charName = event.name || event.charName || null;
      session.skills = event.skills || null;
      session.startedAt = ts;
      if (faction) player.factionCounts[faction] = (player.factionCounts[faction] || 0) + 1;
      if (cls) player.classCounts[cls] = (player.classCounts[cls] || 0) + 1;
      // Store username/loginCode if present
      if (event.username) { player.username = event.username; }
      if (event.loginCode) { player.loginCode = event.loginCode; }
      break;
    }

    case 'turn_end': {
      session.turnCount++;
      player.totalTurns++;
      // Gold tracking
      const currentGold = event.gold ?? 0;
      const earned = Math.max(0, currentGold - (session.lastGold || 0));
      player.totalGoldEarned += earned;
      if (currentGold > player.peakGold) player.peakGold = currentGold;
      if (currentGold > session.peakGold) session.peakGold = currentGold;
      session.lastGold = currentGold;
      // Territory tracking
      const terr = event.terr ?? 0;
      if (terr > session.maxTerritoriesHeld) session.maxTerritoriesHeld = terr;
      if (terr > player.maxTerritoriesHeld) player.maxTerritoriesHeld = terr;
      break;
    }

    case 'choice_made': {
      session.choicesMade++;
      break;
    }

    case 'custom_action': {
      session.customActions++;
      break;
    }

    case 'travel': {
      const dest = event.to || null;
      if (dest) {
        uniqPush(session.locationsVisited, dest);
        uniqPush(player.locationsVisited, dest);
      }
      break;
    }

    case 'faction_talk': {
      const fid = event.fid || null;
      if (fid) uniqPush(session.factionsContacted, fid);
      break;
    }

    case 'territory_change': {
      const territories = event.territories ?? 0;
      if (territories > session.maxTerritoriesHeld) session.maxTerritoriesHeld = territories;
      if (territories > player.maxTerritoriesHeld) player.maxTerritoriesHeld = territories;
      break;
    }

    case 'game_over': {
      const outcome = event.outcome || 'loss'; // 'win' or 'loss'
      const detail = event.detail || event.outcomeDetail || null;
      session.outcome = outcome;
      session.outcomeDetail = detail;
      session.finalHp = event.hp ?? 0;
      session.finalDay = event.day ?? event.days ?? 0;
      session.endedAt = ts;

      if (outcome === 'win') {
        player.wins++;
        if (detail) player.victoryTypes[detail] = (player.victoryTypes[detail] || 0) + 1;
        // Fastest win
        if (session.turnCount < player.fastestWin) player.fastestWin = session.turnCount;
      } else {
        player.losses++;
        if (detail) player.deathCauses[detail] = (player.deathCauses[detail] || 0) + 1;
      }

      // Longest run
      if (session.turnCount > player.longestRun) player.longestRun = session.turnCount;

      // Average survival turns
      const totalGames = player.wins + player.losses;
      if (totalGames > 0) {
        // Incremental average: ((old_avg * (n-1)) + new_value) / n
        player.avgSurvivalTurns = Math.round(
          ((player.avgSurvivalTurns * (totalGames - 1)) + session.turnCount) / totalGames * 10
        ) / 10;
      }
      break;
    }
  }

  // --- Persist ---
  try { await kvPut(kv, `player:${codename}`, player); } catch {}
  try { await kvPut(kv, `session:${sid}`, session); } catch {}

  // --- Rebuild leaderboard on game_over ---
  if (type === 'game_over') {
    try { await rebuildLeaderboard(kv); } catch {}
  }
}

// ---------------------------------------------------------------------------
// Leaderboard
// ---------------------------------------------------------------------------

async function rebuildLeaderboard(kv) {
  const playerKeys = await listAllKeys(kv, 'player:');
  const players = (await Promise.all(
    playerKeys.map(k => kvGet(kv, k.name))
  )).filter(Boolean);

  const board = {
    updatedAt: Date.now(),
    mostWins: players
      .filter(p => p.wins > 0)
      .sort((a, b) => b.wins - a.wins || (a.wins + a.losses) - (b.wins + b.losses))
      .slice(0, 10)
      .map(p => ({ codename: p.codename, wins: p.wins, totalGames: p.wins + p.losses })),
    longestRun: players
      .filter(p => p.longestRun > 0)
      .sort((a, b) => b.longestRun - a.longestRun)
      .slice(0, 10)
      .map(p => ({ codename: p.codename, turns: p.longestRun })),
    maxTerritories: players
      .filter(p => p.maxTerritoriesHeld > 0)
      .sort((a, b) => b.maxTerritoriesHeld - a.maxTerritoriesHeld)
      .slice(0, 10)
      .map(p => ({ codename: p.codename, territories: p.maxTerritoriesHeld })),
    fastestWin: players
      .filter(p => p.fastestWin < Infinity && p.wins > 0)
      .sort((a, b) => a.fastestWin - b.fastestWin)
      .slice(0, 10)
      .map(p => ({ codename: p.codename, turns: p.fastestWin })),
    mostSessions: players
      .filter(p => p.totalSessions > 0)
      .sort((a, b) => b.totalSessions - a.totalSessions)
      .slice(0, 10)
      .map(p => ({ codename: p.codename, sessions: p.totalSessions })),
  };

  await kvPut(kv, 'leaderboard:global', board);
  return board;
}

// ---------------------------------------------------------------------------
// POST /rebuild — one-time migration from raw events
// ---------------------------------------------------------------------------

async function handleRebuild(kv, authKey) {
  if (authKey !== '55') return err('unauthorized', 401);

  // Read all raw events
  const evtKeys = await listAllKeys(kv, 'evt:');
  const events = (await Promise.all(
    evtKeys.map(k => kvGet(kv, k.name))
  )).filter(Boolean).sort((a, b) => (a.ts || 0) - (b.ts || 0));

  // Group by codename and session
  const playerMap = {};  // codename -> player summary
  const sessionMap = {}; // sid -> session summary

  for (const e of events) {
    const codename = e.cn || 'Unknown';
    const sid = e.sid || 'x';
    const ts = e.ts || 0;
    const type = e.type;

    if (!playerMap[codename]) playerMap[codename] = freshPlayer(codename, ts);
    if (!sessionMap[sid]) sessionMap[sid] = freshSession(sid, codename, ts);

    const player = playerMap[codename];
    const session = sessionMap[sid];

    // Global bookkeeping
    player.totalEvents++;
    if (ts > player.lastSeen) player.lastSeen = ts;
    if (ts < player.firstSeen) player.firstSeen = ts;
    uniqPush(player.sessionIds, sid);

    switch (type) {
      case 'session_start': {
        player.totalSessions++;
        const faction = e.faction || e.fid || null;
        const cls = e.class || e.cls || null;
        session.campaign = e.campaign || 'jersey';
        session.faction = faction;
        session.class = cls;
        session.charName = e.name || e.charName || null;
        session.skills = e.skills || null;
        session.startedAt = ts;
        if (faction) player.factionCounts[faction] = (player.factionCounts[faction] || 0) + 1;
        if (cls) player.classCounts[cls] = (player.classCounts[cls] || 0) + 1;
        if (e.username) player.username = e.username;
        if (e.loginCode) player.loginCode = e.loginCode;
        break;
      }
      case 'turn_end': {
        session.turnCount++;
        player.totalTurns++;
        const currentGold = e.gold ?? 0;
        const earned = Math.max(0, currentGold - (session.lastGold || 0));
        player.totalGoldEarned += earned;
        if (currentGold > player.peakGold) player.peakGold = currentGold;
        if (currentGold > session.peakGold) session.peakGold = currentGold;
        session.lastGold = currentGold;
        const terr = e.terr ?? 0;
        if (terr > session.maxTerritoriesHeld) session.maxTerritoriesHeld = terr;
        if (terr > player.maxTerritoriesHeld) player.maxTerritoriesHeld = terr;
        break;
      }
      case 'choice_made': {
        session.choicesMade++;
        break;
      }
      case 'custom_action': {
        session.customActions++;
        break;
      }
      case 'travel': {
        const dest = e.to || null;
        if (dest) {
          uniqPush(session.locationsVisited, dest);
          uniqPush(player.locationsVisited, dest);
        }
        break;
      }
      case 'faction_talk': {
        const fid = e.fid || null;
        if (fid) uniqPush(session.factionsContacted, fid);
        break;
      }
      case 'territory_change': {
        const territories = e.territories ?? 0;
        if (territories > session.maxTerritoriesHeld) session.maxTerritoriesHeld = territories;
        if (territories > player.maxTerritoriesHeld) player.maxTerritoriesHeld = territories;
        break;
      }
      case 'game_over': {
        const outcome = e.outcome || 'loss';
        const detail = e.detail || e.outcomeDetail || null;
        session.outcome = outcome;
        session.outcomeDetail = detail;
        session.finalHp = e.hp ?? 0;
        session.finalDay = e.day ?? e.days ?? 0;
        session.endedAt = ts;
        if (outcome === 'win') {
          player.wins++;
          if (detail) player.victoryTypes[detail] = (player.victoryTypes[detail] || 0) + 1;
          if (session.turnCount < player.fastestWin) player.fastestWin = session.turnCount;
        } else {
          player.losses++;
          if (detail) player.deathCauses[detail] = (player.deathCauses[detail] || 0) + 1;
        }
        if (session.turnCount > player.longestRun) player.longestRun = session.turnCount;
        const totalGames = player.wins + player.losses;
        if (totalGames > 0) {
          player.avgSurvivalTurns = Math.round(
            ((player.avgSurvivalTurns * (totalGames - 1)) + session.turnCount) / totalGames * 10
          ) / 10;
        }
        break;
      }
    }
  }

  // Persist all summaries
  const writes = [];
  for (const [codename, player] of Object.entries(playerMap)) {
    writes.push(kvPut(kv, `player:${codename}`, player));
  }
  for (const [sid, session] of Object.entries(sessionMap)) {
    writes.push(kvPut(kv, `session:${sid}`, session));
  }
  await Promise.all(writes);

  // Build leaderboard
  await rebuildLeaderboard(kv);

  return json({
    status: 'rebuilt',
    players: Object.keys(playerMap).length,
    sessions: Object.keys(sessionMap).length,
    eventsProcessed: events.length,
  });
}

// ---------------------------------------------------------------------------
// Router
// ---------------------------------------------------------------------------

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // -----------------------------------------------------------------------
    // POST /log — store raw event + update summaries
    // -----------------------------------------------------------------------
    if (path === '/log' && request.method === 'POST') {
      try {
        const event = await request.json();
        // Key: evt:{sessionId}:{timestamp}:{4-char random} — unique, sortable
        const key = `evt:${event.sid || 'x'}:${event.ts || Date.now()}:${Math.random().toString(36).slice(2, 6)}`;
        // Permanent storage — no TTL
        await env.GAME_LOGS.put(key, JSON.stringify(event));
        // Update pre-computed summaries (fire-and-forget style, but awaited)
        try { await updateSummaries(env.GAME_LOGS, event); } catch {}
        return ok();
      } catch (e) {
        return err('error', 400);
      }
    }

    // -----------------------------------------------------------------------
    // POST /rebuild — one-time migration from raw events
    // -----------------------------------------------------------------------
    if (path === '/rebuild' && request.method === 'POST') {
      const authKey = url.searchParams.get('key');
      return handleRebuild(env.GAME_LOGS, authKey);
    }

    // -----------------------------------------------------------------------
    // GET /logs — return all raw events sorted (for dev dashboard)
    // -----------------------------------------------------------------------
    if (path === '/logs' && request.method === 'GET') {
      try {
        const allKeys = await listAllKeys(env.GAME_LOGS, 'evt:');
        const events = (await Promise.all(
          allKeys.map(k => kvGet(env.GAME_LOGS, k.name))
        )).filter(Boolean).sort((a, b) => (a.ts || 0) - (b.ts || 0));
        return json(events);
      } catch (e) {
        return json([]);
      }
    }

    // -----------------------------------------------------------------------
    // DELETE /logs — wipe all events (dev dashboard clear button)
    // -----------------------------------------------------------------------
    if (path === '/logs' && request.method === 'DELETE') {
      try {
        const allKeys = await listAllKeys(env.GAME_LOGS, 'evt:');
        await Promise.all(allKeys.map(k => env.GAME_LOGS.delete(k.name)));
        return ok();
      } catch (e) {
        return err('error', 500);
      }
    }

    // -----------------------------------------------------------------------
    // GET /players — aggregate by codename (legacy compat + new data)
    // -----------------------------------------------------------------------
    if (path === '/players' && request.method === 'GET') {
      try {
        // Try pre-computed player summaries first
        const playerKeys = await listAllKeys(env.GAME_LOGS, 'player:');
        if (playerKeys.length > 0) {
          const players = (await Promise.all(
            playerKeys.map(k => kvGet(env.GAME_LOGS, k.name))
          )).filter(Boolean);
          const result = players.map(p => ({
            codename: p.codename,
            sessions: p.totalSessions,
            turns: p.totalTurns,
            apiCalls: p.totalEvents,
            firstSeen: p.firstSeen,
            lastSeen: p.lastSeen,
          })).sort((a, b) => b.lastSeen - a.lastSeen);
          return json(result);
        }

        // Fallback: aggregate from raw events (pre-migration)
        const allKeys = await listAllKeys(env.GAME_LOGS, 'evt:');
        const events = (await Promise.all(
          allKeys.map(k => kvGet(env.GAME_LOGS, k.name))
        )).filter(Boolean);

        const playersMap = {};
        events.forEach(e => {
          const cn = e.cn || 'Unknown';
          if (!playersMap[cn]) playersMap[cn] = { codename: cn, sessions: new Set(), turns: 0, apiCalls: 0, firstSeen: e.ts, lastSeen: e.ts };
          const p = playersMap[cn];
          if (e.sid) p.sessions.add(e.sid);
          if (e.type === 'turn_end') p.turns++;
          p.apiCalls++;
          if (e.ts < p.firstSeen) p.firstSeen = e.ts;
          if (e.ts > p.lastSeen) p.lastSeen = e.ts;
        });

        const result = Object.values(playersMap).map(p => ({
          codename: p.codename,
          sessions: p.sessions.size,
          turns: p.turns,
          apiCalls: p.apiCalls,
          firstSeen: p.firstSeen,
          lastSeen: p.lastSeen,
        })).sort((a, b) => b.lastSeen - a.lastSeen);
        return json(result);
      } catch (e) {
        return json([]);
      }
    }

    // -----------------------------------------------------------------------
    // GET /users — all players with username/loginCode
    // -----------------------------------------------------------------------
    if (path === '/users' && request.method === 'GET') {
      try {
        const playerKeys = await listAllKeys(env.GAME_LOGS, 'player:');
        const players = (await Promise.all(
          playerKeys.map(k => kvGet(env.GAME_LOGS, k.name))
        )).filter(Boolean);

        const result = players.map(p => ({
          codename: p.codename,
          username: p.username || null,
          loginCode: p.loginCode || null,
          lastSeen: p.lastSeen,
        })).sort((a, b) => b.lastSeen - a.lastSeen);
        return json(result);
      } catch (e) {
        return json([]);
      }
    }

    // -----------------------------------------------------------------------
    // GET /leaderboard — pre-computed global leaderboard
    // -----------------------------------------------------------------------
    if (path === '/leaderboard' && request.method === 'GET') {
      try {
        const board = await kvGet(env.GAME_LOGS, 'leaderboard:global');
        return json(board || { updatedAt: null, mostWins: [], longestRun: [], maxTerritories: [], fastestWin: [], mostSessions: [] });
      } catch (e) {
        return json({ updatedAt: null, mostWins: [], longestRun: [], maxTerritories: [], fastestWin: [], mostSessions: [] });
      }
    }

    // -----------------------------------------------------------------------
    // GET /player/:codename — single player summary
    // -----------------------------------------------------------------------
    const playerMatch = path.match(/^\/player\/([^/]+)$/);
    if (playerMatch && request.method === 'GET') {
      try {
        const codename = decodeURIComponent(playerMatch[1]);
        const player = await kvGet(env.GAME_LOGS, `player:${codename}`);
        if (!player) return json({ error: 'player not found' }, 404);
        return json(player);
      } catch (e) {
        return err('error', 500);
      }
    }

    // -----------------------------------------------------------------------
    // GET /player/:codename/sessions — all sessions for a player
    // -----------------------------------------------------------------------
    const playerSessionsMatch = path.match(/^\/player\/([^/]+)\/sessions$/);
    if (playerSessionsMatch && request.method === 'GET') {
      try {
        const codename = decodeURIComponent(playerSessionsMatch[1]);
        const player = await kvGet(env.GAME_LOGS, `player:${codename}`);
        if (!player) return json({ error: 'player not found' }, 404);
        const sessionIds = player.sessionIds || [];
        const sessions = (await Promise.all(
          sessionIds.map(sid => kvGet(env.GAME_LOGS, `session:${sid}`))
        )).filter(Boolean).sort((a, b) => (b.startedAt || 0) - (a.startedAt || 0));
        return json(sessions);
      } catch (e) {
        return json([]);
      }
    }

    // -----------------------------------------------------------------------
    // GET /session/:sid — single session summary
    // -----------------------------------------------------------------------
    const sessionMatch = path.match(/^\/session\/([^/]+)$/);
    if (sessionMatch && request.method === 'GET') {
      try {
        const sid = decodeURIComponent(sessionMatch[1]);
        const session = await kvGet(env.GAME_LOGS, `session:${sid}`);
        if (!session) return json({ error: 'session not found' }, 404);
        return json(session);
      } catch (e) {
        return err('error', 500);
      }
    }

    // -----------------------------------------------------------------------
    // GET /session/:sid/events — all raw events for a session
    // -----------------------------------------------------------------------
    const sessionEventsMatch = path.match(/^\/session\/([^/]+)\/events$/);
    if (sessionEventsMatch && request.method === 'GET') {
      try {
        const sid = decodeURIComponent(sessionEventsMatch[1]);
        const evtKeys = await listAllKeys(env.GAME_LOGS, `evt:${sid}:`);
        const events = (await Promise.all(
          evtKeys.map(k => kvGet(env.GAME_LOGS, k.name))
        )).filter(Boolean).sort((a, b) => (a.ts || 0) - (b.ts || 0));
        return json(events);
      } catch (e) {
        return json([]);
      }
    }

    return new Response('not found', { status: 404, headers: CORS });
  },
};
