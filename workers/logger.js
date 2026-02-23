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

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS });
    }

    const url = new URL(request.url);

    // POST /log — store a single event (called per game event, fire-and-forget)
    if (url.pathname === '/log' && request.method === 'POST') {
      try {
        const event = await request.json();
        // Key: evt:{sessionId}:{timestamp}:{4-char random} — unique, sortable
        const key = `evt:${event.sid || 'x'}:${event.ts || Date.now()}:${Math.random().toString(36).slice(2, 6)}`;
        // Store for 90 days
        await env.GAME_LOGS.put(key, JSON.stringify(event), { expirationTtl: 60 * 60 * 24 * 90 });
        return new Response('ok', { headers: CORS });
      } catch (e) {
        return new Response('error', { status: 400, headers: CORS });
      }
    }

    // GET /logs — return all events as sorted JSON array (for dev dashboard)
    if (url.pathname === '/logs' && request.method === 'GET') {
      try {
        let allKeys = [];
        let cursor;
        do {
          const list = await env.GAME_LOGS.list({ prefix: 'evt:', cursor, limit: 1000 });
          allKeys = allKeys.concat(list.keys);
          cursor = list.list_complete ? undefined : list.cursor;
        } while (cursor);

        const events = await Promise.all(
          allKeys.map(k => env.GAME_LOGS.get(k.name).then(v => v ? JSON.parse(v) : null))
        );

        const sorted = events.filter(Boolean).sort((a, b) => a.ts - b.ts);
        return new Response(JSON.stringify(sorted), {
          headers: { ...CORS, 'Content-Type': 'application/json' },
        });
      } catch (e) {
        return new Response('[]', { headers: { ...CORS, 'Content-Type': 'application/json' } });
      }
    }

    // DELETE /logs — wipe all events (dev dashboard clear button)
    if (url.pathname === '/logs' && request.method === 'DELETE') {
      try {
        let allKeys = [];
        let cursor;
        do {
          const list = await env.GAME_LOGS.list({ prefix: 'evt:', cursor, limit: 1000 });
          allKeys = allKeys.concat(list.keys.map(k => k.name));
          cursor = list.list_complete ? undefined : list.cursor;
        } while (cursor);
        await Promise.all(allKeys.map(k => env.GAME_LOGS.delete(k)));
        return new Response('ok', { headers: CORS });
      } catch (e) {
        return new Response('error', { status: 500, headers: CORS });
      }
    }

    // GET /players — aggregate by codename: sessions, turns, API calls, last seen
    if (url.pathname === '/players' && request.method === 'GET') {
      try {
        let allKeys = [];
        let cursor;
        do {
          const list = await env.GAME_LOGS.list({ prefix: 'evt:', cursor, limit: 1000 });
          allKeys = allKeys.concat(list.keys);
          cursor = list.list_complete ? undefined : list.cursor;
        } while (cursor);

        const events = await Promise.all(
          allKeys.map(k => env.GAME_LOGS.get(k.name).then(v => v ? JSON.parse(v) : null))
        );

        const players = {};
        events.filter(Boolean).forEach(e => {
          const cn = e.cn || 'Unknown';
          if (!players[cn]) players[cn] = { codename: cn, sessions: new Set(), turns: 0, apiCalls: 0, firstSeen: e.ts, lastSeen: e.ts };
          const p = players[cn];
          if (e.sid) p.sessions.add(e.sid);
          if (e.type === 'turn_end') p.turns++;
          p.apiCalls++;
          if (e.ts < p.firstSeen) p.firstSeen = e.ts;
          if (e.ts > p.lastSeen) p.lastSeen = e.ts;
        });

        const result = Object.values(players).map(p => ({
          codename: p.codename,
          sessions: p.sessions.size,
          turns: p.turns,
          apiCalls: p.apiCalls,
          firstSeen: p.firstSeen,
          lastSeen: p.lastSeen,
        })).sort((a, b) => b.lastSeen - a.lastSeen);

        return new Response(JSON.stringify(result), {
          headers: { ...CORS, 'Content-Type': 'application/json' },
        });
      } catch (e) {
        return new Response('[]', { headers: { ...CORS, 'Content-Type': 'application/json' } });
      }
    }

    return new Response('not found', { status: 404, headers: CORS });
  },
};
