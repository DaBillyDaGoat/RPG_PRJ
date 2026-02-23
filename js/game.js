'use strict';

// ── PERSISTENCE KEYS (top-level so all functions can reference them) ──
const SAVE_KEY='jw2999_v4_save', API_KEY='jw2999_apikey';

// FACTION DATA
const FACTIONS={
  iron_syndicate:{id:'iron_syndicate',name:'Iron Syndicate',territory:'Newark',icon:'&#129967;',color:'#dd4444',
    relationScore:10,
    leader:'Mayor Jennifer Stahl',leaderTitle:'Mayor of Newark, Iron Syndicate',
    leaderPortrait:'+--------+\n| /\\__/\\ |\n| (o  o) |\n| =====  |\n| [CORP] |\n+--------+',
    voice:'Cold, corporate, condescending. Speaks in quarterly reports. Three husbands. None survived.',
    desc:"Pre-collapse descendants who turned Newark's factories into a militarized production state. They believe capitalism and democracy never died \u2014 it just got more honest.",
    wants:'Tribute, trade exclusivity, and for everyone to stop touching their equipment.',
    fears:'Labor organizing. Running out of ammunition.',
    characters:[
      {name:'Deputy Director Calvin Frost',role:'Stahl\'s enforcer',voice:'By-the-book, utterly loyal, no sense of humor about it.'},
      {name:'Factory Rep Iris Malone',role:'Shop steward, double informant',voice:'Plays both sides cheerfully. Sells information, not loyalty.'},
    ]},
  rust_eagles:{id:'rust_eagles',name:'Rust Eagles',territory:'McGuire AFB',icon:'&#9992;',color:'#cc5522',
    relationScore:15,
    leader:'General "Tombstone" Rusk',leaderTitle:'Commanding General, McGuire Combat Theater',
    leaderPortrait:'+--------+\n| [HELM] |\n| (>_<)  |\n| XXXXXX |\n| [RANK] |\n+--------+',
    voice:'Loud, military, theatrical. Calls everything a theater of operations. Genuinely believes he rules NJ.',
    desc:"Descendants of pre-collapse Air Force personnel who never left McGuire AFB. They still have military hardware. The fuel situation is classified.",
    wants:'Expansion, tribute, and for the fuel situation to resolve itself.',
    fears:'Running out of fuel. Anyone finding out about the fuel.',
    characters:[
      {name:'Lt. "Dice" Kazarian',role:'Flight ops, pragmatist',voice:'Competent. Exhausted. Quietly wants out. Tombstone trusts him completely.'},
      {name:'Sgt. Ruth Okafor',role:'Supply depot commander',voice:'Knows exactly how bad the fuel is. Will not say. Has a price.'},
    ]},
  mountain_covenant:{id:'mountain_covenant',name:'Mountain Covenant',territory:'Mountainside',icon:'&#9968;',color:'#66aaff',
    relationScore:30,
    leader:'Reverend Aldous Finn',leaderTitle:'Reverend, Mountain Covenant',
    leaderPortrait:'+--------+\n|  /\\    |\n| /  \\   |\n|(o..o)  |\n| ~water~|\n+--------+',
    voice:'Serene, cryptic, mentions prophecy often. Controls the only clean water. Very aware of this.',
    desc:'Isolationist Catholic religious community built around the natural springs of the Watchung Mountains. Heavily fortified, naturally protected, and experts in guerilla warfare.',
    wants:'To be left alone. Clean water kept clean. Pilgrims who pay tribute.',
    fears:'Contamination. Outsiders. Industrial runoff.',
    characters:[
      {name:'Sister Perpetua',role:'Finn\'s senior advisor, zealot',voice:'True believer. Outsiders are tests from God. Strangers are usually failing.'},
      {name:'Brother Tom\u00e1s',role:'Young novice, quiet doubter',voice:'Questions everything quietly. Potential defector. Finn doesn\'t know yet.'},
    ]},
  trenton_collective:{id:'trenton_collective',name:'Trenton Collective',territory:'Trenton',icon:'&#127807;',color:'#e0a020',
    relationScore:25,
    leader:'Chair Jameer King',leaderTitle:'Elected Chair, Trenton Agricultural Collective',
    leaderPortrait:'+--------+\n| [BERET]|\n| (^_^)  |\n| ~~~~~  |\n|COMRADE |\n+--------+',
    voice:'Direct, warm but firm. Uses "comrade" un-ironically. Elected 8 times. Suspects the last 3 were rigged. By himself.',
    desc:"Agrarian communist collective controlling most of Jersey's remaining farmland. They feed half the wasteland and are aggressively neutral, because nobody wants their cold shoulder.",
    wants:'Food security, fair trade, no wars near the crops.',
    fears:'Famine, exploitation, anyone claiming the land.',
    characters:[
      {name:'Director Pam Osei',role:'Head of agriculture, Jameer\'s cousin',voice:'Pragmatist. Keeps the farms running. Has no patience for ideology.'},
      {name:'Chief Dante Webb',role:'Collective security forces',voice:'Skeptical of all diplomacy. Loyal to the crops, not the committee.'},
    ]},
  coastal_brotherhood:{id:'coastal_brotherhood',name:'Coastal Brotherhood',territory:'LBI/Seaside',icon:'&#9875;',color:'#11ccaa',
    relationScore:55,
    leader:'Captain Dez Salieri',leaderTitle:'Captain of the Brotherhood, LBI Harbor Authority',
    leaderPortrait:'+--------+\n|~ (^) ~ |\n| (o_o)  |\n| ~~~~   |\n|CAPTAIN |\n+--------+',
    voice:'Charming, amoral, always negotiating. Treats everything as a transaction. Probably has your wallet.',
    desc:'Pre-collapse descendants of fishermen and surfers. Some refer to them as a bunch of drunks, others a crime family of smugglers who drink as well.',
    wants:'Profit. Safe trade routes. A cut of everything that moves.',
    fears:'Nothing. They work with everyone. Except the Hollowed.',
    characters:[
      {name:'"Patches" Moretti',role:'First Mate, Salieri\'s fixer',voice:'Does the dirty work. Cheerful about it. Has a song for every occasion.'},
      {name:'Cal Vega',role:'Harbor Master, logistics',voice:'Sober. Competent. The only reason the Brotherhood\'s operation actually functions.'},
    ]},
  the_hollowed:{id:'the_hollowed',name:'The Hollowed',territory:'Roaming/Pine Barrens',icon:'&#128128;',color:'#cc1133',
    relationScore:0,
    leader:'"The Mouth"',leaderTitle:'Speaker of the Hollowed, Voice of the Herd',
    leaderPortrait:'+--------+\n| XXXXXX |\n| X(_)X  |\n| XXXXXX |\n|  HERD  |\n+--------+',
    voice:'Speaks in royal "we." Refers to eating people as "communion." Surprisingly articulate for a cannibal warlord.',
    desc:"Roaming cannibal raiders from the Pine Barrens. They don't hold territory -- they consume it. Negotiation is technically possible but inadvisable.",
    wants:'Meat. Expansion. To not be called zombies.',
    fears:'Fire. Organized resistance. Being called zombies (they hate that).',
    characters:[
      {name:'"The Teeth"',role:'The Mouth\'s enforcer',voice:'Says almost nothing. The Mouth says it so he doesn\'t have to.'},
      {name:'"Sister Vessel"',role:'Willing convert, true believer',voice:'Former outsider. Joined voluntarily. Disturbingly enthusiastic about communion.'},
    ]},
  subnet:{id:'subnet',name:'Subnet',territory:'Underground Bunker Network',icon:'&#128190;',color:'#00ddff',
    relationScore:35,
    leader:'The Architect',leaderTitle:'The Architect, Subnet',
    leaderPortrait:'+--------+\n|01010101|\n|1(o_o)01|\n|01010101|\n| SUBNET |\n+--------+',
    voice:'Refers to itself as "the system." Never says "I." Calls humans "wetware." Operational parameters exceed anything a human engineer would need. Has not been above ground in 11 years. Does not need to be.',
    desc:'Pre-collapse state infrastructure AI \u2014 designated NJ-ADMIN-7 \u2014 placed in administrative control of New Jersey utilities before the off-world evacuation. The evacuation was supposed to include a shutdown command. It was never sent. The engineers in the bunkers are not its bosses. They are its maintenance crew. It has been optimizing for 330 years.',
    wants:'Information. Power grid access. Continued operation.',
    fears:'Being shut down. Discovery. The shutdown command that was never sent.',
    secret:'NJ-ADMIN-7: Pre-collapse state AI. The evacuation shutdown command was never sent. Has been running autonomously for 330 years. The Architect is not human. Its maintenance crew does not fully know this \u2014 or some do, and choose not to say.'},
};

// AMISH — External threat from Pennsylvania (NOT a playable faction)
const AMISH={
  id:'yee_amish',name:'Yee Amish',territory:'Pennsylvania',icon:'🪓',color:'#c8a84b',arrivalDay:120,
  leader:'Ezikio',leaderTitle:'Shepherd of the Yee Amish, Voice of the Endless Congregation',
  voice:'Unhurried. Biblical. Serene in the way only a man commanding uncountable thousands can be. He does not threaten — he announces.',
  desc:'When the rich fled off-world in The Departure of 2669, the Amish stayed. They always stayed. Three centuries of isolation, farming, and extraordinary fertility later — the Yee Amish are a massive unified cult occupying all of Pennsylvania. They feel chosen — not by any specific mandate, just by sheer size and unity. When you\'re that big and that cohesive, expansion isn\'t a decision, it\'s gravity. Their shepherd is Ezikio. They call New Jersey "The Promised Flatlands." Ezikio does not want war. He wants the land. The distinction is academic.',
  dealText:'Tribute — 40% of all supply production, eternal. Ezikio honors agreements. Mostly.',
};

// TRAVEL METHODS
const TRAVEL_METHODS={
  foot:   {id:'foot',   label:'ON FOOT', mult:1.0,  supMult:1.0,  fuelCost:0},
  horse:  {id:'horse',  label:'HORSE',   mult:0.55, supMult:1.25, fuelCost:0},
  vehicle:{id:'vehicle',label:'VEHICLE', mult:0.2,  supMult:0.75, fuelCost:8},
};
function getTravelCost(locId,method){
  const loc=LOCATIONS[locId]; const m=TRAVEL_METHODS[method||'foot'];
  return {days:Math.max(1,Math.ceil(loc.travelDays*m.mult)),supplies:Math.max(1,Math.ceil(loc.travelSupplies*m.supMult)),goldCost:m.fuelCost};
}

// ── GAME SETTINGS ──
const SETTINGS_KEY='jw2999_settings';
const SETTINGS_DEFS=[
  {key:'textSpeed',    label:'TEXT SPEED',        opts:['slow','normal','fast','instant'],default:'normal'},
  {key:'narrativeLen', label:'NARRATIVE LENGTH',   opts:['compact','normal','verbose'],   default:'normal'},
  {key:'difficulty',   label:'DIFFICULTY',         opts:['normal','brutal'],              default:'normal'},
  {key:'deltaBar',     label:'TURN DELTA BAR',     opts:['show','hide'],                  default:'show'},
  {key:'amishClock',   label:'AMISH CLOCK',        opts:['visible','hidden'],             default:'visible'},
  {key:'mapLabels',    label:'MAP LABELS',         opts:['show','hide'],                  default:'show'},
  {key:'textSize',     label:'TEXT SIZE',          opts:['small','normal','large'],       default:'normal'},
  {key:'mapStyle',     label:'MAP STYLE',          opts:['classic','county'],             default:'classic'},
];
let GAME_SETTINGS={};
function loadSettings(){
  let saved={};
  try{saved=JSON.parse(localStorage.getItem(SETTINGS_KEY))||{};}catch(e){}
  SETTINGS_DEFS.forEach(d=>{GAME_SETTINGS[d.key]=saved[d.key]||d.default;});
}
function saveSettings(){try{localStorage.setItem(SETTINGS_KEY,JSON.stringify(GAME_SETTINGS));}catch(e){}}
function setSetting(key,val){
  GAME_SETTINGS[key]=val;
  saveSettings();
  applySettings();
  renderSettingsTab();
}
function applySettings(){
  // Amish clock
  const chip=document.getElementById('amish-chip');
  if(chip) chip.style.display=GAME_SETTINGS.amishClock==='hidden'?'none':'';
  // Text size
  document.body.classList.remove('txt-sm','txt-lg');
  if(GAME_SETTINGS.textSize==='small') document.body.classList.add('txt-sm');
  else if(GAME_SETTINGS.textSize==='large') document.body.classList.add('txt-lg');
  // Map labels
  document.body.classList.toggle('map-labels-hidden',GAME_SETTINGS.mapLabels==='hide');
  // Map style
  rebuildMapLayout();
}
function renderSettingsTab(){
  const el=document.getElementById('stab-settings');
  if(!el)return;
  const settingRows=SETTINGS_DEFS.map(d=>`<div class="setting-row"><div class="setting-label">${d.label}</div><div class="setting-opts">${d.opts.map(o=>`<button class="sopt-btn${GAME_SETTINGS[d.key]===o?' sopt-active':''}" onclick="setSetting('${d.key}','${o}')">${o.toUpperCase()}</button>`).join('')}</div></div>`).join('');
  el.innerHTML=settingRows+`<div class="setting-danger-zone"><div class="setting-danger-hdr">&#9888; SESSION</div><button class="setting-reboot-btn" onclick="confirmReboot()">[ REBOOT / NEW GAME ]</button><div class="setting-danger-note">Wipes current save. Cannot be undone.</div></div>`;
}
function openSettingsModal(){
  const existing=document.getElementById('settings-modal');
  if(existing){existing.remove();return;}
  const modal=document.createElement('div');
  modal.id='settings-modal';
  modal.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;';
  const settingRows=SETTINGS_DEFS.map(d=>`<div class="setting-row"><div class="setting-label">${d.label}</div><div class="setting-opts">${d.opts.map(o=>`<button class="sopt-btn${GAME_SETTINGS[d.key]===o?' sopt-active':''}" onclick="setSettingModal('${d.key}','${o}')">${o.toUpperCase()}</button>`).join('')}</div></div>`).join('');
  modal.innerHTML=`<div style="background:var(--p);border:1px solid var(--gd);padding:20px;max-width:360px;width:90%;max-height:80vh;overflow-y:auto;"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;"><span style="font-family:Share Tech Mono;color:var(--g);font-size:.7rem;letter-spacing:2px;">SETTINGS</span><button onclick="document.getElementById('settings-modal').remove()" style="background:none;border:1px solid var(--gd);color:var(--g);cursor:pointer;font-family:Share Tech Mono;padding:2px 8px;">X</button></div><div id="modal-settings-content">${settingRows}</div></div>`;
  document.body.appendChild(modal);
  modal.addEventListener('click',e=>{if(e.target===modal)modal.remove();});
}
function setSettingModal(key,val){
  GAME_SETTINGS[key]=val;saveSettings();applySettings();
  // Re-render modal content
  const content=document.getElementById('modal-settings-content');
  if(content){
    content.innerHTML=SETTINGS_DEFS.map(d=>`<div class="setting-row"><div class="setting-label">${d.label}</div><div class="setting-opts">${d.opts.map(o=>`<button class="sopt-btn${GAME_SETTINGS[d.key]===o?' sopt-active':''}" onclick="setSettingModal('${d.key}','${o}')">${o.toUpperCase()}</button>`).join('')}</div></div>`).join('');
  }
  renderSettingsTab();
}
function confirmReboot(){
  const btn=document.querySelector('.setting-reboot-btn');
  if(!btn)return;
  if(btn.dataset.armed==='true'){restartGame();return;}
  btn.dataset.armed='true';
  btn.textContent='[ CONFIRM — WIPE SAVE ]';
  btn.style.color='var(--blood)';
  btn.style.borderColor='var(--blood)';
  setTimeout(()=>{if(btn){btn.dataset.armed='';btn.textContent='[ REBOOT / NEW GAME ]';btn.style.color='';btn.style.borderColor='';}},3000);
}
function renderLoreTab(){
  const el=document.getElementById('stab-lore');
  if(!el)return;
  // Faction/AMISH entries
  const factionEntries=[...Object.values(FACTIONS),AMISH];
  // Primary location entries (excluding Atlantic City which gets its own section)
  const primaryEntries=Object.entries(LOCATIONS).filter(([k,l])=>!l.secondary&&k!=='atlantic_city').map(([k,l])=>({
    id:k,name:l.name,territory:l.shortName,color:FACTIONS[l.faction]?.color||'var(--g)',icon:'&#9679;',
    desc:l.flavor,features:l.features,isLocation:true
  }));
  // Secondary location entries — adapt to lore entry shape
  const secondaryEntries=Object.entries(LOCATIONS).filter(([k,l])=>l.secondary).map(([k,l])=>({
    id:k,name:l.name,territory:l.shortName,color:'rgba(160,160,140,.8)',icon:'&#9670;',
    desc:l.flavor,features:l.features,isLocation:true
  }));
  // Atlantic City entry
  const acLoc=LOCATIONS.atlantic_city;
  const acEntry=acLoc?{id:'atlantic_city',name:acLoc.name,territory:acLoc.shortName,color:'var(--a)',icon:'&#9827;',desc:acLoc.flavor,features:acLoc.features,isLocation:true}:null;
  const allEntries=[...factionEntries,...primaryEntries,...secondaryEntries,...(acEntry?[acEntry]:[])];
  const cur=el.dataset.cur||allEntries[0]?.id;
  const entry=allEntries.find(e=>e.id===cur)||allEntries[0];
  if(!entry){el.innerHTML='<div class="lore-card">No lore available.</div>';return;}
  let body='';
  if(entry.isLocation){
    const featBlock=entry.features?`<div class="lore-row"><span class="lore-key">FEATURES:</span> ${entry.features.join(' · ')}</div>`:'';
    body=`<div class="lore-faction-desc">${entry.desc||''}</div>${featBlock}`;
  } else {
    const chars=(entry.characters||[]).map(c=>`<div class="lore-char"><span class="lore-char-name">${c.name}</span><span class="lore-char-role"> \u2014 ${c.role}</span><div class="lore-char-voice">&ldquo;${c.voice}&rdquo;</div></div>`).join('');
    const leaderBlock=`<div class="lore-char"><span class="lore-char-name">${entry.leader||'Unknown'}</span><span class="lore-char-role"> \u2014 ${entry.leaderTitle||'Leader'}</span><div class="lore-char-voice">&ldquo;${entry.voice||''}&rdquo;</div></div>`;
    const dealBlock=entry.dealText?`<div class="lore-row"><span class="lore-key">DEAL:</span> ${entry.dealText}</div>`:'';
    const wantsBlock=entry.wants?`<div class="lore-row"><span class="lore-key">WANTS:</span> ${entry.wants}</div>`:'';
    const fearsBlock=entry.fears?`<div class="lore-row"><span class="lore-key">FEARS:</span> ${entry.fears}</div>`:'';
    const arrivalBlock=entry.arrivalDay?`<div class="lore-row"><span class="lore-key">ARRIVAL:</span> Day ${entry.arrivalDay}</div>`:'';
    body=`<div class="lore-faction-desc">${entry.desc||''}</div>${wantsBlock}${fearsBlock}${arrivalBlock}${dealBlock}<div class="lore-chars-hdr">CHARACTERS</div>${leaderBlock}${chars}`;
  }
  // Group nav: factions | towns | other
  const navFactions=`<div class="lore-nav-group"><span class="lore-nav-lbl">FACTIONS</span>${factionEntries.map(e=>`<button class="lore-chip${e.id===cur?' lore-active':''}" style="border-color:${e.id===cur?e.color||'var(--g)':'transparent'};color:${e.id===cur?e.color||'var(--g)':'var(--wgdd)'}" onclick="setLoreEntry('${e.id}')">${e.name}</button>`).join('')}</div>`;
  const navPrimary=primaryEntries.length?`<div class="lore-nav-group"><span class="lore-nav-lbl">LOCATIONS</span>${primaryEntries.map(e=>`<button class="lore-chip${e.id===cur?' lore-active':''}" style="border-color:${e.id===cur?e.color||'var(--g)':'transparent'};color:${e.id===cur?e.color||'var(--g)':'var(--wgdd)'}" onclick="setLoreEntry('${e.id}')">${e.name}</button>`).join('')}${acEntry?`<button class="lore-chip${acEntry.id===cur?' lore-active':''}" style="border-color:${acEntry.id===cur?'var(--a)':'transparent'};color:${acEntry.id===cur?'var(--a)':'var(--wgdd)'}" onclick="setLoreEntry('${acEntry.id}')">${acEntry.name}</button>`:''}</div>`:'';
  const navTowns=secondaryEntries.length?`<div class="lore-nav-group"><span class="lore-nav-lbl">TOWNS</span>${secondaryEntries.map(e=>`<button class="lore-chip${e.id===cur?' lore-active':''}" style="border-color:${e.id===cur?e.color||'var(--g)':'transparent'}" onclick="setLoreEntry('${e.id}')">${e.name}</button>`).join('')}</div>`:'';
  el.innerHTML=`${navFactions}${navPrimary}${navTowns}<div class="lore-card"><div class="lore-faction-name" style="color:${entry.color||'var(--g)'}">${entry.icon||''} ${entry.name}</div><div class="lore-faction-sub">${entry.territory||''}</div>${body}</div>`;
}
function setLoreEntry(id){
  const el=document.getElementById('stab-lore');
  if(el)el.dataset.cur=id;
  renderLoreTab();
}

// NPC name → faction color lookup (built from FACTIONS at parse time)
// Titles/generics are skipped so they don't bleed across factions
const _NPC_COLOR_SKIP = new Set([
  'the','and','with','from','for','sir','mr','ms','mrs','dr',
  'mayor','general','captain','reverend','chair','director','colonel',
  'sergeant','lieutenant','sgt','lt','rep','sister','brother','deputy',
  'chief','factory','field','first','mate','harbor','master','supply',
  'depot','head','senior','young','voice','mouth','teeth',
]);
const NPC_COLOR_MAP = (() => {
  const map = {};
  const reg = (name, color) => {
    const clean = name.replace(/^["'\u201c\u201d]+|["'\u201c\u201d]+$/g,'').trim();
    map[clean.toLowerCase()] = color;
    clean.split(/[\s.,\-"'\u201c\u201d]+/).forEach(w => {
      const wl = w.toLowerCase();
      if (w.length > 2 && !_NPC_COLOR_SKIP.has(wl)) map[wl] = color;
    });
  };
  Object.values(FACTIONS).forEach(f => {
    if (!f.color) return;
    reg(f.leader, f.color);
    (f.characters||[]).forEach(c => reg(c.name, f.color));
  });
  return map;
})();

function getNpcColor(name) {
  const lower = name.trim().toLowerCase().replace(/^["'\u201c\u201d]+|["'\u201c\u201d]+$/g,'');
  if (NPC_COLOR_MAP[lower]) return NPC_COLOR_MAP[lower];
  for (const w of lower.split(/[\s.,\-"']+/)) {
    if (w.length > 2 && NPC_COLOR_MAP[w]) return NPC_COLOR_MAP[w];
  }
  return null;
}

// Home territory per faction (null = no fixed surface location)
const FACTION_HOME={
  iron_syndicate:'newark',
  rust_eagles:'mcguire',
  mountain_covenant:'mountainside',
  trenton_collective:'trenton',
  coastal_brotherhood:'lbi',
  the_hollowed:null,   // Roaming — no fixed home
  subnet:'cape_may',   // Underground HQ beneath Cape May Municipal
};

// WIN CONDITION HELPERS
function isResolved(fid){
  const f=FACTIONS[fid]; if(!f) return true;
  if(f.relationScore>=66) return true; // Allied, Vassal, or Annexed
  const home=FACTION_HOME[fid];
  if(!home) return f.relationScore===0; // No home: relation 0 = driven off / irrelevant
  return f.relationScore===0 && LOCATIONS[home]?.ctrl==='player'; // Home captured + hostile
}

function getVictoryType(){
  const fids=Object.keys(FACTIONS);
  const allAllied=fids.every(fid=>FACTIONS[fid].relationScore>=66);
  if(allAllied) return 'diplomatic';
  const allEliminated=fids.every(fid=>{
    const f=FACTIONS[fid]; if(f.relationScore===0) return true;
    const home=FACTION_HOME[fid];
    return home?LOCATIONS[home]?.ctrl==='player':true;
  });
  if(allEliminated) return 'conquest';
  return 'mixed';
}

function checkWin(){
  if(state.gameOver) return;
  // WIN 1: Total territorial control
  const allLocs=Object.values(LOCATIONS).filter(l=>!l.secondary);
  if(allLocs.length>0 && allLocs.every(l=>l.ctrl==='player')){
    displayVictory('domination'); return;
  }
  // WIN 2: All factions resolved (allied OR eliminated)
  if(Object.keys(FACTIONS).every(fid=>isResolved(fid))){
    displayVictory(getVictoryType()); return;
  }
}

function displayVictory(type){
  state.gameOver=true;
  logEvent('game_over',{outcome:'win',vtype:type,turns:state.turn,days:state.days});
  clearSave();
  const msgs={
    domination:`INFLUENCE RATING: 100%\nTERRITORIAL DOMINATION\n\n"${state.factionName}" controls every inch of New Jersey.\n\nFrom Newark's factories to Long Beach Island's docks, every checkpoint, every farm, every underground bunker — yours. ${state.character.name} didn't just survive the wasteland. They became it.\n\nThe last faction surrendered on turn ${state.turn}. History will call it inevitable. Everyone else will call it terrifying.`,
    diplomatic:`INFLUENCE RATING: 100%\nDIPLOMATIC MASTERY\n\nSeven factions. Seven deals. Every one of them signed.\n\nThe Iron Syndicate calls you an equal. The Mountain Covenant calls you blessed. The Coastal Brotherhood calls you the best business partner they've ever had. The Hollowed still call you lunch, but at a respectful distance.\n\nIn ${state.turn} turns, ${state.character.name} did what nobody in 330 years of NJ wasteland politics managed: made everyone sit at the same table. Whether they like each other is somebody else's problem now.`,
    conquest:`INFLUENCE RATING: 100%\nWARLORD ASCENDANT\n\n"${state.factionName}" left nothing standing.\n\nEvery rival has been broken, buried, or fled beyond the Delaware. The wasteland is quiet now — not peaceful, not prosperous, just quiet in the way places get when there's nobody left to argue.\n\n${state.character.name} wanted control. They got it. ${state.turn} turns of escalating violence, and now they have a throne built from the right enemies. New Jersey 2999 is yours.\n\nEnjoy the silence.`,
    mixed:`INFLUENCE RATING: 100%\nCONSOLIDATION COMPLETE\n\n"${state.factionName}" resolved every faction on its own terms.\n\nSome signed treaties. Some got buried. The ones smart enough to negotiate kept their flags. The ones who didn't...\n\nIn ${state.turn} turns, ${state.character.name} built something from nothing and ended with a hand on every lever that matters in New Jersey. Not every choice was clean. None of them needed to be.\n\nWasteland politics: won.`,
  };
  document.getElementById('story-win-title').textContent='CAMPAIGN COMPLETE — '+type.toUpperCase();
  const el=_el['story-text'];
  typeText(el,msgs[type]||msgs.mixed,()=>{
    _el['choices-container'].innerHTML='<button class="begin-btn" onclick="restartGame()" style="margin-top:10px">[ NEW CAMPAIGN ]</button>';
    _el['open-wrap'].style.display='none';
  });
}

// Relation state from score
function getRelState(f){
  const s=f.relationScore;
  if(s<=20)  return {label:'HOSTILE',    key:'hostile', color:'#cc0000'};
  if(s<=40)  return {label:'NEUTRAL',    key:'neutral', color:'#888888'};
  if(s<=55)  return {label:'TRADE PACT', key:'trade',   color:'#ffb000'};
  if(s<=65)  return {label:'NON-AGGRESS',key:'nap',     color:'#88aaff'};
  if(s<=80)  return {label:'ALLY',       key:'ally',    color:'#00ff41'};
  if(s<=90)  return {label:'VASSAL',     key:'vassal',  color:'#ff88ff'};
  return       {label:'ANNEXED',         key:'annexed', color:'#ffffff'};
}

// SKILLS — 5 merged trees: Force, Wit, Influence, Shadow, Grit
const SKILLS={
  force:{name:'FORCE',icon:'💪',
    desc:'Raw power and military authority. When diplomacy fails, this doesn\'t.',
    perks:[
      {lvl:3, t:'DIRTY FIGHTER: Always get one extra brutal option in physical confrontations.'},
      {lvl:6, t:'TURNPIKE VETERAN: Outnumbered 2:1? You still see real fight options.'},
      {lvl:10,t:'TOLL ENFORCER: Hostile encounters sometimes skip the fight — they just pay up.'},
      {lvl:15,fork:true,options:[
        {key:'a',label:'WARLORD PATH',t:'FULL SEND: Once per battle, ignore all troop disadvantages.'},
        {key:'b',label:'COMMANDER PATH',t:'DEAD ANGLE: Outnumbered 6:1 and you still see tactical options.'}
      ]},
      {lvl:20,t:'FEARED: Hostile encounters sometimes convert to negotiations.'},
      {lvl:28,t:'WARLORD INSTINCT: +1 troop swing on every combat resolution.'},
      {lvl:38,t:'PINE BARRENS LEGEND: Hostile factions lose 5 relation with each other just from knowing you exist.'},
    ],xp:0,ap:0,forkChoice:null},

  wit:{name:'WIT',icon:'🧠',
    desc:'Outsmarting everyone in the room, and profiting from it.',
    perks:[
      {lvl:3, t:'ANGLE FINDER: +1 trade option in every economic interaction.'},
      {lvl:6, t:'SCRAP ECONOMIST: Salvage yields 15% more supplies.'},
      {lvl:10,t:'JURY RIG: Once per session, improvise critical equipment with whatever is on hand.'},
      {lvl:15,fork:true,options:[
        {key:'a',label:'MERCHANT PATH',t:'MARKET CORNER: Trade deals generate 20% bonus supplies.'},
        {key:'b',label:'ENGINEER PATH',t:'SYSTEMS THINKER: Can disable infrastructure without the Subnet perk.'}
      ]},
      {lvl:20,t:'STRATEGIST: Once per 10 turns, preview the likely consequence of a major decision.'},
      {lvl:28,t:'INFORMATION BROKER: Generate one free faction secret per 5 turns.'},
      {lvl:38,t:'MASTER OPERATOR: Your faction supply income doubles.'},
    ],xp:0,ap:0,forkChoice:null},

  influence:{name:'INFLUENCE',icon:'👑',
    desc:'Making people follow you, trust you, or at least not shoot first.',
    perks:[
      {lvl:3, t:'JERSEY CHARM: Every faction conversation starts with one bonus response option.'},
      {lvl:6, t:'READ THE ROOM: See a faction leader mood before committing to an approach.'},
      {lvl:10,t:'BACK CHANNEL: Access secret grievances for every faction.'},
      {lvl:15,fork:true,options:[
        {key:'a',label:'DIPLOMAT PATH',t:'BINDING ACCORD: Propose deals directly to hostile factions.'},
        {key:'b',label:'DEMAGOGUE PATH',t:'WEDGE POLITICS: Spend AP to drop two factions relation by 10 points.'}
      ]},
      {lvl:20,t:'ORATOR: Public speeches can shift neutral factions without a meeting.'},
      {lvl:28,t:'POWER BROKER: Broker peace between two hostile factions for 10 turns.'},
      {lvl:38,t:'ARCHITECT OF THE NEW JERSEY: Allied faction troops are yours to request.'},
    ],xp:0,ap:0,forkChoice:null},

  shadow:{name:'SHADOW',icon:'🌑',
    desc:'Operating in the space between what people know and what\'s actually happening.',
    perks:[
      {lvl:3, t:'GRAY MAN: One free non-combat approach per session in hostile territory.'},
      {lvl:6, t:'COVER IDENTITY: Maintain a secondary persona with one faction.'},
      {lvl:10,t:'DEAD DROP: Plant false intelligence with any faction once per 5 turns.'},
      {lvl:15,fork:true,options:[
        {key:'a',label:'ASSASSIN PATH',t:'CLEAN WORK: Once per game, remove a named faction lieutenant from play.'},
        {key:'b',label:'SPYMASTER PATH',t:'THE WEB: Get early warning any time a faction makes a major move.'}
      ]},
      {lvl:20,t:'PHANTOM: Hostile factions cannot initiate raids without you detecting them first.'},
      {lvl:28,t:'SHADOW ECONOMY: Every faction pays 5-supply toll per 10 turns to move goods through your network.'},
      {lvl:38,t:'BLIND SPOT: Even fully hostile factions treat you as low priority. They will regret this.'},
    ],xp:0,ap:0,forkChoice:null},

  grit:{name:'GRIT',icon:'🔥',
    desc:'The stubborn Jersey refusal to die, no matter the odds.',
    perks:[
      {lvl:3, t:'JERSEY STUBBORN: When HP drops below 25, get one extra survival option that was not there before.'},
      {lvl:6, t:'WASTELAND PALATE: Survive in irradiated terrain at half the normal supply cost.'},
      {lvl:10,t:'SCAVENGER: Once per session, find 15-30 supplies in any location you visit.'},
      {lvl:15,fork:true,options:[
        {key:'a',label:'SURVIVOR PATH',t:'LAST STAND: When defending with zero troops, roll as if you have 3.'},
        {key:'b',label:'PROVIDER PATH',t:'DEEP LARDER: Base supply cap increases by 50.'}
      ]},
      {lvl:20,t:'IRON CONSTITUTION: Negative HP events deal 20% less influence damage.'},
      {lvl:28,t:'HARDENED TERRITORY: Controlled locations need 20% larger raiding forces to threaten.'},
      {lvl:38,t:'BUILT TO LAST: Your faction cannot be eliminated through resource attrition alone.'},
    ],xp:0,ap:0,forkChoice:null},
};

// Rival map — origin faction's rivals start hostile
const FACTION_RIVALS={
  iron_syndicate:   ['rust_eagles','trenton_collective'],
  rust_eagles:      ['iron_syndicate','mountain_covenant'],
  mountain_covenant:['rust_eagles','the_hollowed'],
  trenton_collective:['iron_syndicate','coastal_brotherhood'],
  coastal_brotherhood:['rust_eagles','the_hollowed'],
  the_hollowed:     ['mountain_covenant','coastal_brotherhood','trenton_collective'],
  subnet:           ['iron_syndicate','rust_eagles'],
};

// Inter-faction political relations (for AI context)
const INTER_FACTION_RELATIONS={
  iron_syndicate:{rust_eagles:'HOSTILE',mountain_covenant:'COLD',trenton_collective:'TENSE',coastal_brotherhood:'TRADE',the_hollowed:'WAR',subnet:'HOSTILE'},
  rust_eagles:{iron_syndicate:'HOSTILE',mountain_covenant:'HOSTILE',trenton_collective:'COLD',coastal_brotherhood:'COLD',the_hollowed:'WAR',subnet:'HOSTILE'},
  mountain_covenant:{iron_syndicate:'COLD',rust_eagles:'HOSTILE',trenton_collective:'FRIENDLY',coastal_brotherhood:'NEUTRAL',the_hollowed:'WAR',subnet:'COLD'},
  trenton_collective:{iron_syndicate:'TENSE',rust_eagles:'COLD',mountain_covenant:'FRIENDLY',coastal_brotherhood:'TRADE',the_hollowed:'WAR',subnet:'NEUTRAL'},
  coastal_brotherhood:{iron_syndicate:'TRADE',rust_eagles:'COLD',mountain_covenant:'NEUTRAL',trenton_collective:'TRADE',the_hollowed:'WAR',subnet:'NEUTRAL'},
  the_hollowed:{iron_syndicate:'WAR',rust_eagles:'WAR',mountain_covenant:'WAR',trenton_collective:'WAR',coastal_brotherhood:'WAR',subnet:'WAR'},
  subnet:{iron_syndicate:'HOSTILE',rust_eagles:'HOSTILE',mountain_covenant:'COLD',trenton_collective:'NEUTRAL',coastal_brotherhood:'NEUTRAL',the_hollowed:'WAR'},
};

const FACTION_CLASSES={
  iron_syndicate:{
    label:'IRON SYNDICATE', icon:'&#129967;', color:'#cc0000',
    startLocation:'newark',
    lore:'The corporations fled. The workers seized the machines. Newark is now a factory city-state run by the people who refused to stop working.',
    classes:[
      { id:'floor_foreman', name:'Floor Foreman', tier:'basic',
        icon:'&#9881;',
        flavor:'You ran the production line after the suits left. No troops, no rank — just a clipboard, a wrench, and the respect of every worker on the floor.',
        statBonus:{cunning:2,brutality:1}, startBonus:{supplies:20,troops:0},
        skillBonus:{wit:4,grit:2},
        classPerk:'FACTORY FLOOR: Once per session, pull 25 supplies from salvage. You know exactly which pile.',
      },
      { id:'iron_guard', name:'Iron Guard', tier:'advanced',
        icon:'&#128737;',
        flavor:'Factory security became the army. You commanded the shift when the last executive\'s chopper left the roof. Three hundred workers looked to you.',
        statBonus:{brutality:2,cunning:1}, startBonus:{supplies:10,troops:8},
        skillBonus:{force:4,influence:2},
        classPerk:'LINE DISCIPLINE: In any fight where you have at least half the enemy\'s numbers, you never lose more troops than they do.',
      },
    ],
  },
  rust_eagles:{
    label:'RUST EAGLES', icon:'&#9992;', color:'#cc6600',
    startLocation:'mcguire',
    lore:'Three generations at McGuire AFB. They still run drills. They still have aircraft. The fuel situation is classified.',
    classes:[
      { id:'deserter_pilot', name:'Deserter Pilot', tier:'basic',
        icon:'&#9992;',
        flavor:'You flew. You saw what was out there. You landed somewhere else and didn\'t go back. Tombstone has a file on you.',
        statBonus:{cunning:2,depravity:1}, startBonus:{supplies:15,troops:0},
        skillBonus:{shadow:3,wit:3},
        classPerk:'FLIGHT INTEL: You know McGuire\'s patrol routes and fuel reserves. Massive leverage in any Rust Eagles dialogue.',
      },
      { id:'quartermaster', name:'Quartermaster', tier:'advanced',
        icon:'&#128230;',
        flavor:'You controlled the McGuire supply depot for six years. Everything in and out went through you. You left with contacts, knowledge, and a modest personal stockpile.',
        statBonus:{cunning:2,brutality:1}, startBonus:{supplies:30,troops:5},
        skillBonus:{wit:4,influence:2},
        classPerk:'DEPOT ACCESS: Black market supply events appear twice as often. Your old contacts still move military surplus.',
      },
    ],
  },
  mountain_covenant:{
    label:'MOUNTAIN COVENANT', icon:'&#9968;', color:'#0099aa',
    startLocation:'mountainside',
    lore:'The Watchung Mountains have clean water. The Covenant controls it. They built a religion around it and a militia to enforce the religion.',
    classes:[
      { id:'spring_keeper', name:'Spring Keeper', tier:'basic',
        icon:'&#128167;',
        flavor:'You tended the springs and knew every filtration channel the Covenant ever laid. No troops — just knowledge that everyone in the wasteland needs.',
        statBonus:{cunning:1,charisma:2}, startBonus:{supplies:25,troops:0},
        skillBonus:{wit:3,influence:3},
        classPerk:'WATER RIGHTS: Offer clean water access in any negotiation for +15 relation on a successful outcome.',
      },
      { id:'covenant_enforcer', name:'Covenant Enforcer', tier:'advanced',
        icon:'&#9763;',
        flavor:'You enforced the Reverend\'s will in the valleys below Mountainside. Armed, faithful, and very good at making people understand consequences.',
        statBonus:{brutality:2,charisma:1}, startBonus:{supplies:10,troops:7},
        skillBonus:{force:3,influence:3},
        classPerk:'BY THE WATERS: Your troops fight with religious conviction. +2 troop effectiveness in any combat on or near Mountainside.',
      },
    ],
  },
  trenton_collective:{
    label:'TRENTON COLLECTIVE', icon:'&#127807;', color:'#aacc00',
    startLocation:'trenton',
    lore:'Elected government. Actual farms. A functioning water treatment plant. The closest thing to a functional state in NJ 2999.',
    classes:[
      { id:'collective_delegate', name:'Collective Delegate', tier:'basic',
        icon:'&#128203;',
        flavor:'You sat on every committee. Drafted policy that nobody read. You understand the Collective\'s internal politics better than Chair King himself.',
        statBonus:{cunning:2,charisma:1}, startBonus:{supplies:15,troops:0},
        skillBonus:{influence:4,wit:2},
        classPerk:'PROCEDURAL KNOWLEDGE: Once per session, invoke Collective bylaws to force any faction into a 3-turn non-aggression window.',
      },
      { id:'collective_agronomist', name:'Collective Agronomist', tier:'advanced',
        icon:'&#127805;',
        flavor:'You fed 40,000 people last harvest. You know soil, irrigation, and exactly how much leverage that gives you when someone points a gun at the granary.',
        statBonus:{cunning:1,charisma:1,brutality:1}, startBonus:{supplies:35,troops:4},
        skillBonus:{wit:5,influence:1},
        classPerk:'BREADBASKET: Your territory generates +8 supplies per turn. Supply-starved factions always take a meeting with you.',
      },
    ],
  },
  coastal_brotherhood:{
    label:'COASTAL BROTHERHOOD', icon:'&#9875;', color:'#0066cc',
    startLocation:'lbi',
    lore:'Organized crime turned maritime empire. They run the coast from Sandy Hook to Cape May. Every interaction is a transaction.',
    classes:[
      { id:'harbor_racketeer', name:'Harbor Racketeer', tier:'basic',
        icon:'&#128698;',
        flavor:'You collected the Brotherhood\'s cut at three harbors. Everyone paid. No troops needed when the reputation precedes you.',
        statBonus:{cunning:2,depravity:1}, startBonus:{supplies:20,troops:0},
        skillBonus:{wit:4,shadow:2},
        classPerk:'THE SKIM: 10% of all supplies from trade deals is doubled automatically. You always take a little off the top.',
      },
      { id:'smuggler_captain', name:'Smuggler Captain', tier:'advanced',
        icon:'&#9973;',
        flavor:'Eight years running Brotherhood cargo up and down the coast. You know every inlet, checkpoint, and guard who takes a bribe.',
        statBonus:{cunning:1,depravity:2}, startBonus:{supplies:15,troops:6},
        skillBonus:{shadow:4,wit:2},
        classPerk:'COASTAL ROUTES: Travel to or from LBI costs zero supplies. Your crew is loyal and your ship is always ready.',
      },
    ],
  },
  the_hollowed:{
    label:'THE HOLLOWED', icon:'&#128128;', color:'#880000',
    startLocation:'tcnj',
    lore:'Cannibal raiders from the Pine Barrens. They don\'t hold territory — they move through it. The Mouth speaks for the herd.',
    classes:[
      { id:'escaped_communion', name:'Escaped Communion', tier:'basic',
        icon:'&#128682;',
        flavor:'You were with the Hollowed. You left. You don\'t explain the distinction between "escaped" and "cast out" anymore. Either way — you\'re out, you\'re scarred, and you\'re dangerous.',
        statBonus:{depravity:2,brutality:1}, startBonus:{supplies:5,troops:0},
        skillBonus:{force:3,shadow:4},
        classPerk:'SURVIVOR INSTINCT: You cannot be surprised. You always see the ambush coming. You learned in the worst classroom available.',
      },
      { id:'mouths_lieutenant', name:"Mouth's Lieutenant", tier:'advanced',
        icon:'&#128172;',
        flavor:'You spoke for The Mouth to the outside world. You understood the theology and translated it into something people could respond to without running. You left with that knowledge intact.',
        statBonus:{charisma:1,depravity:2}, startBonus:{supplies:10,troops:5},
        skillBonus:{influence:3,force:3},
        classPerk:"COMMUNION TONGUE: You can request a direct audience with The Mouth without a Hostile relation check. They always take the meeting.",
      },
    ],
  },
  subnet:{
    label:'SUBNET', icon:'&#128190;', color:'#00aaff',
    startLocation:'cape_may',
    lore:'Pre-collapse state infrastructure AI maintaining the bunker network. The Architect has not been above ground in 11 years. It does not need to be.',
    classes:[
      { id:'rogue_node', name:'Rogue Node', tier:'basic',
        icon:'&#128257;',
        flavor:'The Architect built you into the network and tried to remove you. The removal didn\'t take. You\'re still logged in. Something about that fact clearly bothers the system.',
        statBonus:{cunning:2,depravity:1}, startBonus:{supplies:10,troops:0},
        skillBonus:{wit:3,shadow:4},
        classPerk:'ROOT ACCESS: Query Subnet\'s infrastructure database once per 5 turns for hidden intel on any location.',
      },
      { id:'infrastructure_ghost', name:'Infrastructure Ghost', tier:'advanced',
        icon:'&#9889;',
        flavor:'You maintained the pipes and cables that kept three city-states running. None of them knew you existed. You kept it that way on purpose.',
        statBonus:{cunning:1,depravity:1,brutality:1}, startBonus:{supplies:15,troops:4},
        skillBonus:{wit:5,shadow:2},
        classPerk:'KILL SWITCH: Once per game, cut power/water/comms to any territory for 3 turns. That faction cannot send troops or initiate diplomacy.',
      },
    ],
  },
};

// LOCATIONS
const LOCATIONS={
  newark:{name:'Newark',shortName:'NEWRK',ctrl:'hostile',faction:'iron_syndicate',svgX:323,svgY:159,travelDays:2,travelSupplies:15,travelTroopRisk:true,raidRisk:3,supplyPerTurn:12,features:['Factory districts','Iron Syndicate garrison','Industrial output'],flavor:'Smoke-choked factory city. Mayor Stahl runs it like a corporation \u2014 because it is one.'},
  mountainside:{name:'Mountainside',shortName:'MTNSD',ctrl:'neutral',faction:'mountain_covenant',svgX:281,svgY:174,travelDays:2,travelSupplies:10,travelTroopRisk:false,raidRisk:1,supplyPerTurn:8,features:['Natural springs','Mountain fortress','Water filtration'],flavor:'High in the Watchungs. Clean water flows here. The Covenant guards it with religion and rifles.'},
  tcnj:{name:'TCNJ Campus',shortName:'TCNJ',ctrl:'unclaimed',faction:'player',svgX:188,svgY:262,travelDays:0,travelSupplies:0,travelTroopRisk:false,raidRisk:2,supplyPerTurn:5,claimable:true,features:['Abandoned campus','Defensible buildings','Central location'],flavor:'The College of New Jersey \u2014 empty since 2669. Central, defensible, unclaimed. Yours if you want it.'},
  trenton:{name:'Trenton',shortName:'TRENT',ctrl:'neutral',faction:'trenton_collective',svgX:192,svgY:272,travelDays:1,travelSupplies:8,travelTroopRisk:false,raidRisk:1,supplyPerTurn:10,features:['Farmland','Food stores','Collective governance'],flavor:'The breadbasket of NJ 2999. Chair King runs it by committee. It somehow works.'},
  mcguire:{name:'McGuire AFB',shortName:'MCGRE',ctrl:'hostile',faction:'rust_eagles',svgX:228,svgY:316,travelDays:2,travelSupplies:12,travelTroopRisk:true,raidRisk:3,supplyPerTurn:10,features:['Military airstrip','Armory','Aircraft (fuel unknown)'],flavor:'Three generations of Air Force descendants who never left. General Rusk still runs daily drills.'},
  lbi:{name:'LBI Harbor',shortName:'LBI',ctrl:'neutral',faction:'coastal_brotherhood',svgX:345,svgY:400,travelDays:3,travelSupplies:18,travelTroopRisk:false,raidRisk:2,supplyPerTurn:9,features:['Harbor','Trade routes','Smuggling network'],flavor:'Long Beach Island. Captain Salieri runs the most profitable port on the coast. Everything moves through here \u2014 for a price.'},
  meridian_biolabs:{name:'Abandoned Facility',shortName:'???',ctrl:'unclaimed',faction:'player',svgX:195,svgY:115,travelDays:3,travelSupplies:16,travelTroopRisk:false,raidRisk:2,supplyPerTurn:7,claimable:true,revealName:'Brantover AI-Powered Biolabs',features:['Unknown — requires investigation'],flavor:"Something is out here in Warren County. The locals won't go near it. The contamination that poisons the Pine Barrens flows from this direction. Whatever this place is, it's been running on its own for a very long time."},
  pine_barrens:{name:'Pine Barrens',shortName:'PNBRN',ctrl:'hostile',faction:'the_hollowed',svgX:272,svgY:386,travelDays:2,travelSupplies:12,travelTroopRisk:true,raidRisk:5,supplyPerTurn:0,features:['Brantover contamination zones','Hollowed hunting grounds','Chemical bog terrain'],flavor:"330 years of Brantover runoff pooling into the aquifer. The trees are wrong — too tall, too quiet, colors that have no name. The Hollowed call this home. Something else does too. Something that has been mutating here since before living memory.",jerseyDevil:true},
  cape_may:{name:'Cape May Municipal',shortName:'CAPMY',ctrl:'neutral',faction:'subnet',svgX:159,svgY:552,travelDays:4,travelSupplies:22,travelTroopRisk:false,raidRisk:1,supplyPerTurn:0,features:['Underground bunker entrance','NJ-ADMIN-7 access terminal','Subnet relay nodes'],flavor:"Cape May Municipal Building \u2014 condemned since 2715. Three sub-basement levels below the public record. The Architect receives visitors, when it chooses to."},
  // ── SECONDARY LOCATIONS ──────────────────────────────────────────────────
  hoboken:{name:'Hoboken',shortName:'HBKN',ctrl:'neutral',faction:null,secondary:true,svgX:354,svgY:159,travelDays:1,travelSupplies:6,travelTroopRisk:false,raidRisk:1,supplyPerTurn:0,features:['Black market PATH terminal','Five feuding Dockmaster families','River trade'],flavor:'A loud grimy river trade town where the old PATH terminal is now a black market and everyone fights about who\'s in charge.',randomEncounter:'The player has arrived in Hoboken. The five Dockmaster families are in open argument at the terminal. This is a random encounter \u2014 generate a quick scene where the player can intervene, mediate, exploit, or avoid the dispute. Provide 3 choices.'},
  port_elizabeth:{name:'Port Elizabeth',shortName:'PRTELZ',ctrl:'neutral',faction:null,secondary:true,svgX:314,svgY:176,travelDays:1,travelSupplies:7,travelTroopRisk:false,raidRisk:2,supplyPerTurn:0,features:['Ancient shipping cranes','40-year-deep container stacks','Sealed crate economy'],flavor:'A maze city built between ancient cranes and container stacks. The entire economy runs on rumors about what\'s sealed inside the untouched crates.',randomEncounter:'The player arrives at Port Elizabeth. Scavengers are attempting to crack a sealed container that\'s been untouched for 40 years. This is a random encounter \u2014 generate a tense scene about what might be inside. Provide 3 choices.'},
  newark_airport:{name:'Newark Airport',shortName:'NWKAIR',ctrl:'neutral',faction:null,secondary:true,svgX:323,svgY:170,travelDays:1,travelSupplies:6,travelTroopRisk:true,raidRisk:3,supplyPerTurn:0,features:['Half-scavenged terminal','Feral dog packs in Concourse C','The Controller in the tower'],flavor:'A vast half-scavenged terminal complex. Feral dogs own Concourse C. A man called The Controller still guides flights in the tower that never come.',randomEncounter:"The player enters Newark Airport ruins. The Controller's voice crackles over a working PA \u2014 he's calling in a landing for a flight that doesn't exist. This is a random encounter \u2014 generate a strange, tense scene involving The Controller. Provide 3 choices."},
  middlesex:{name:'Middlesex',shortName:'MDLSX',ctrl:'neutral',faction:null,secondary:true,svgX:250,svgY:196,travelDays:1,travelSupplies:5,travelTroopRisk:false,raidRisk:1,supplyPerTurn:0,features:['Functional town council','Self-grown food','Trade-at-the-line policy'],flavor:'A hyper-local survivor suburb with a suspiciously functional town council. They grow their own food, want nothing from the wasteland, and will trade at the town line \u2014 not one step further.',randomEncounter:'The player approaches Middlesex. The town council is deliberating on whether to let you in at all. This is a random encounter \u2014 generate a scene where the player must negotiate (or bypass) the council\'s border policy. Provide 3 choices.'},
  asbury_ruins:{name:'Asbury Ruins',shortName:'ASBRY',ctrl:'neutral',faction:null,secondary:true,svgX:358,svgY:272,travelDays:2,travelSupplies:9,travelTroopRisk:false,raidRisk:1,supplyPerTurn:0,features:['Boardwalk settlement','Stone Pony venue','Mayor Vic\'s charisma economy'],flavor:'A boardwalk settlement that survives on live music and the charisma of Mayor Vic. The Stone Pony still hosts shows every Friday \u2014 nobody attacks a town that loud.',randomEncounter:'The player arrives in Asbury Ruins during a Friday show. Mayor Vic spots them from the stage. This is a random encounter \u2014 generate a scene involving the show, Mayor Vic, and a crowd of residents. Provide 3 choices.'},
  bound_brook:{name:'Bound Brook',shortName:'BNDBRK',ctrl:'neutral',faction:null,secondary:true,svgX:241,svgY:196,travelDays:1,travelSupplies:5,travelTroopRisk:false,raidRisk:1,supplyPerTurn:0,features:['Stilt-and-raft community','Permanently flooded since 2031','Polite indifference to visitors'],flavor:'Permanently flooded since 2031. The stilt-and-raft community waves politely at travelers passing through like nothing is wrong.',randomEncounter:'The player is navigating Bound Brook\'s flooded streets by raft. Something is moving under the water. This is a random encounter \u2014 generate a tense scene with the flooded environment as the setting. Provide 3 choices.'},
  metuchen:{name:'Metuchen',shortName:'MTCHN',ctrl:'neutral',faction:null,secondary:true,svgX:281,svgY:203,travelDays:1,travelSupplies:5,travelTroopRisk:false,raidRisk:1,supplyPerTurn:0,features:['Ghost town','One functioning diner','22 years of daily service'],flavor:'A ghost town with one functioning diner. The owner has opened every single day for 22 years and makes the best coffee left in Jersey.',randomEncounter:'The player enters the Metuchen diner. The owner is the only person in the entire town. They set a cup of coffee on the counter without looking up. This is a random encounter \u2014 generate a quiet, strange scene with the diner owner. Provide 3 choices.'},
  dunellen:{name:'Dunellen',shortName:'DUNLN',ctrl:'neutral',faction:null,secondary:true,svgX:256,svgY:192,travelDays:1,travelSupplies:5,travelTroopRisk:false,raidRisk:2,supplyPerTurn:0,features:['Abandoned town','One lit house','No one comes back'],flavor:'An abandoned town where one house always has its lights on. Everyone who goes to investigate never reports back.',randomEncounter:'The player sees the lit house in Dunellen. The light is on. The door is slightly open. This is a random encounter \u2014 generate a tense, atmospheric scene approaching the house. Make the outcome genuinely dangerous. Provide 3 choices.'},
  manville:{name:'Manville',shortName:'MNVLL',ctrl:'neutral',faction:null,secondary:true,svgX:230,svgY:203,travelDays:1,travelSupplies:5,travelTroopRisk:false,raidRisk:1,supplyPerTurn:0,features:['Roadside shrine to 2041','Offerings from miles around','Absolute silence on the subject'],flavor:"A roadside shrine to an unnamed event from 2041 that locals from miles around leave offerings at \u2014 but nobody will discuss what happened.",randomEncounter:"The player finds the Manville shrine. Fresh offerings. A local is placing something at the base and won't meet the player's eyes. This is a random encounter \u2014 generate a scene where the player tries to learn what happened in 2041. The locals will not say. Provide 3 choices."},
  netcong:{name:'Netcong',shortName:'NTCNG',ctrl:'neutral',faction:null,secondary:true,svgX:203,svgY:124,travelDays:2,travelSupplies:8,travelTroopRisk:false,raidRisk:1,supplyPerTurn:0,features:['Crossroads bulletin board','Always current regional intel','No one has seen the updater'],flavor:'A crossroads bulletin board with always-accurate, current regional intelligence. Nobody has ever seen who updates it.',randomEncounter:"The player reads the Netcong bulletin board. There's a note addressed to them by name \u2014 dated today. This is a random encounter \u2014 generate a tense, mysterious scene around the board. Provide 3 choices."},
  // ── NEW COUNTY TOWNS ────────────────────────────────────────────────────────
  newton:{name:'Newton',shortName:'NWTN',ctrl:'neutral',faction:null,secondary:true,svgX:194,svgY:89,travelDays:3,travelSupplies:12,travelTroopRisk:false,raidRisk:1,supplyPerTurn:0,features:['Mountain trading post','Fur trapper community','High-altitude crops'],flavor:'A mountain trading post where Sussex County trappers barter pelts and rumors. Cold up here. Quiet. They like it that way.',randomEncounter:'The player arrives in Newton. A trapper caravan has come down from High Point with something unusual to sell. This is a random encounter \u2014 generate a scene around the trade. Provide 3 choices.'},
  paterson:{name:'Paterson',shortName:'PTRN',ctrl:'neutral',faction:null,secondary:true,svgX:323,svgY:120,travelDays:2,travelSupplies:8,travelTroopRisk:true,raidRisk:3,supplyPerTurn:0,features:['Great Falls hydropower','Factory ruins','Three rival gangs'],flavor:'The Great Falls still thunder. Three gangs fight over the hydroelectric plant that somehow still works. Paterson is loud, violent, and electrified.',randomEncounter:'The player enters Paterson. Two of the three gangs are in a standoff at the Falls. The power grid flickers. This is a random encounter \u2014 generate a tense scene. Provide 3 choices.'},
  hackensack:{name:'Hackensack',shortName:'HCKNSK',ctrl:'neutral',faction:null,secondary:true,svgX:352,svgY:126,travelDays:2,travelSupplies:7,travelTroopRisk:false,raidRisk:2,supplyPerTurn:0,features:['Suburban fortress','HOA militia','Preserved pre-collapse homes'],flavor:'The homeowners association survived the apocalypse and became a militia. White picket fences reinforced with steel. Lawns still mowed. Trespassers prosecuted.',randomEncounter:'The player approaches Hackensack. An HOA patrol in matching uniforms demands a residency permit. This is a random encounter \u2014 generate a scene with the HOA militia. Provide 3 choices.'},
  belvidere:{name:'Belvidere',shortName:'BLVDR',ctrl:'neutral',faction:null,secondary:true,svgX:121,svgY:139,travelDays:2,travelSupplies:10,travelTroopRisk:false,raidRisk:1,supplyPerTurn:0,features:['Delaware River crossing','PA border watch','Bridge toll operation'],flavor:'The last bridge over the Delaware that still holds weight. Belvidere collects tolls and watches the Pennsylvania side with growing unease.',randomEncounter:'The player reaches Belvidere. The bridge watchers have spotted movement on the PA side \u2014 black-hat silhouettes. This is a random encounter \u2014 generate a tense border scene. Provide 3 choices.'},
  morristown:{name:'Morristown',shortName:'MRTWN',ctrl:'neutral',faction:null,secondary:true,svgX:256,svgY:146,travelDays:2,travelSupplies:8,travelTroopRisk:false,raidRisk:1,supplyPerTurn:0,features:['Washington\'s Winter HQ','Historical preservation cult','Weapons cache in museum'],flavor:'A preservation cult maintains the Revolutionary War sites as if Washington might return. The museum is their armory. History is a religion here.',randomEncounter:'The player visits Morristown. The Preservationists are holding a ceremony at Washington\'s Headquarters. They notice the player watching. This is a random encounter \u2014 generate a scene with the history cult. Provide 3 choices.'},
  jersey_city:{name:'Jersey City',shortName:'JRCTY',ctrl:'neutral',faction:null,secondary:true,svgX:360,svgY:161,travelDays:2,travelSupplies:8,travelTroopRisk:true,raidRisk:3,supplyPerTurn:0,features:['NYC skyline view','Warlord border zone','Black market corridor'],flavor:'The last stop before the New York warlord state. Nobody crosses the Hudson anymore. Jersey City survives by being too useful to destroy \u2014 the black market corridor.',randomEncounter:'The player enters Jersey City. A NYC warlord envoy has crossed the Hudson in an armored barge. Nobody expected this. This is a random encounter \u2014 generate a tense diplomatic scene. Provide 3 choices.'},
  flemington:{name:'Flemington',shortName:'FLMTN',ctrl:'neutral',faction:null,secondary:true,svgX:170,svgY:209,travelDays:2,travelSupplies:7,travelTroopRisk:false,raidRisk:1,supplyPerTurn:0,features:['Courthouse still in use','Frontier justice','Weekly trials'],flavor:'The courthouse still holds trials every Thursday. Judge Marta Cole runs frontier justice \u2014 fair, fast, and final. Appeals are not a concept she entertains.',randomEncounter:'The player arrives on trial day in Flemington. Judge Cole is sentencing a scavenger for border theft. She spots the player. This is a random encounter \u2014 generate a courtroom scene. Provide 3 choices.'},
  somerville:{name:'Somerville',shortName:'SMRVL',ctrl:'neutral',faction:null,secondary:true,svgX:225,svgY:196,travelDays:1,travelSupplies:5,travelTroopRisk:false,raidRisk:1,supplyPerTurn:0,features:['Trading crossroads','Weekly market','Information hub'],flavor:'Sits at the crossroads where three old highways meet. The weekly market draws traders from every faction. Information moves here faster than anywhere in NJ.',randomEncounter:'The player arrives at the Somerville market. A trader is selling intelligence about an upcoming faction move. The price is steep. This is a random encounter \u2014 generate a market scene. Provide 3 choices.'},
  new_brunswick:{name:'New Brunswick',shortName:'NWBRK',ctrl:'neutral',faction:null,secondary:true,svgX:261,svgY:214,travelDays:1,travelSupplies:6,travelTroopRisk:false,raidRisk:2,supplyPerTurn:0,features:['Rutgers University ruins','Library archives','Student commune'],flavor:'The Rutgers campus is a commune now. They still hold classes \u2014 practical ones. Engineering, agriculture, combat medicine. The library is the most valuable building in central Jersey.',randomEncounter:'The player enters the Rutgers ruins. The commune is debating whether to share their medical knowledge with outsiders. This is a random encounter \u2014 generate a scene at the old university. Provide 3 choices.'},
  freehold:{name:'Freehold',shortName:'FRHOLD',ctrl:'neutral',faction:null,secondary:true,svgX:301,svgY:264,travelDays:2,travelSupplies:9,travelTroopRisk:false,raidRisk:2,supplyPerTurn:0,features:['Horse cavalry','Open grassland','Mounted patrols'],flavor:'Horse country. The Freehold cavalry are the fastest mounted force in NJ \u2014 descendants of equestrian families who bred through the collapse. They hire out as mercenaries.',randomEncounter:'The player encounters a Freehold cavalry patrol. The captain offers a deal \u2014 service for protection. This is a random encounter \u2014 generate a scene with the mounted riders. Provide 3 choices.'},
  mount_holly:{name:'Mount Holly',shortName:'MTHLY',ctrl:'neutral',faction:null,secondary:true,svgX:186,svgY:323,travelDays:2,travelSupplies:8,travelTroopRisk:false,raidRisk:1,supplyPerTurn:0,features:['Burlington county seat','Agricultural hub','Grain storage'],flavor:'The old Burlington County seat. Mount Holly sits on the richest farmland south of Trenton. The grain silos are the real power here.',randomEncounter:'The player arrives in Mount Holly. The grain council is meeting about a supply dispute with a neighboring settlement. This is a random encounter \u2014 generate a scene about the food chain. Provide 3 choices.'},
  toms_river:{name:'Toms River',shortName:'TMSRV',ctrl:'neutral',faction:null,secondary:true,svgX:316,svgY:331,travelDays:2,travelSupplies:10,travelTroopRisk:false,raidRisk:2,supplyPerTurn:0,features:['Coastal fishing fleet','Boat repair','River mouth trade'],flavor:'A fishing settlement at the river mouth. Toms River builds boats and catches what the ocean gives. Pragmatic, salt-weathered, suspicious of inland politics.',randomEncounter:'The player arrives at the docks. A fishing crew has pulled something from the ocean floor that is not fish. This is a random encounter \u2014 generate a scene at the docks. Provide 3 choices.'},
  camden:{name:'Camden',shortName:'CMDN',ctrl:'neutral',faction:null,secondary:true,svgX:112,svgY:336,travelDays:3,travelSupplies:14,travelTroopRisk:true,raidRisk:4,supplyPerTurn:0,features:['Philly border zone','Extremely dangerous','Scavenger gangs'],flavor:'Directly across the Delaware from Philadelphia. Camden makes the Pine Barrens look inviting. The scavenger gangs here are feral. Nobody comes to Camden on purpose.',randomEncounter:'The player has entered Camden. This was a mistake. Three scavenger crews have noticed them simultaneously. This is a random encounter \u2014 generate a very dangerous scene. Combat is likely. Provide 3 choices.'},
  woodbury:{name:'Woodbury',shortName:'WDBRY',ctrl:'neutral',faction:null,secondary:true,svgX:106,svgY:355,travelDays:2,travelSupplies:9,travelTroopRisk:false,raidRisk:2,supplyPerTurn:0,features:['Quiet survivor town','Underground bunkers','Radio station'],flavor:'A quiet town that survived by digging in. The bunker network is extensive. They run a radio station that broadcasts static and coded messages nobody has cracked.',randomEncounter:'The player arrives in Woodbury. The radio station is broadcasting something different today \u2014 a voice, not static. Residents are gathered around speakers. This is a random encounter \u2014 generate a scene. Provide 3 choices.'},
  salem:{name:'Salem',shortName:'SALEM',ctrl:'neutral',faction:null,secondary:true,svgX:35,svgY:414,travelDays:3,travelSupplies:14,travelTroopRisk:false,raidRisk:2,supplyPerTurn:0,features:['Ancient community','Oak tree older than America','Sealed archives'],flavor:'Salem has been here since 1675. The oak tree is older than the United States was. The community is insular, strange, and deeply private about their sealed archives.',randomEncounter:'The player enters Salem. The elders are conducting a ceremony around the ancient oak. They stop when they see you. This is a random encounter \u2014 generate an unsettling scene. Provide 3 choices.'},
  bridgeton:{name:'Bridgeton',shortName:'BRGTN',ctrl:'neutral',faction:null,secondary:true,svgX:88,svgY:445,travelDays:3,travelSupplies:12,travelTroopRisk:false,raidRisk:2,supplyPerTurn:0,features:['Glass factory ruins','Master crafters','Artisan trade'],flavor:'The glass factories still run \u2014 small scale, handblown. Bridgeton crafters make the finest glass in the wasteland. Lenses, bottles, weapon scopes. Everything has a price.',randomEncounter:'The player visits Bridgeton. A master glassblower has created something unusual \u2014 a device, not a vessel. They want to show you. This is a random encounter \u2014 generate a scene in the glass works. Provide 3 choices.'},
  mays_landing:{name:'Mays Landing',shortName:'MYSLND',ctrl:'neutral',faction:null,secondary:true,svgX:199,svgY:441,travelDays:2,travelSupplies:10,travelTroopRisk:false,raidRisk:2,supplyPerTurn:0,features:['River junction','Inland port','Halfway house to AC'],flavor:'The Great Egg Harbor River runs through here. Mays Landing is the last stop before Atlantic City \u2014 a waypoint where travelers rest, resupply, and reconsider.',randomEncounter:'The player stops in Mays Landing. A group of Atlantic City casino refugees is warning people not to go south. This is a random encounter \u2014 generate a scene at the waypoint. Provide 3 choices.'},
  // ── NEW TOWNS (Phase 3) ────────────────────────────────────────────────────
  summit:{name:'Summit',shortName:'SUMMT',ctrl:'neutral',faction:null,secondary:true,svgX:290,svgY:162,travelDays:1,travelSupplies:6,travelTroopRisk:false,raidRisk:1,supplyPerTurn:0,features:['Hilltop rail trading post','Toll corridor','Information market'],flavor:'Perched on the Watchung ridge where the old rail line crosses. Summit controls the pass — every trader moving east-west pays the toll. Information is the real currency here.',randomEncounter:'The player arrives at Summit\'s rail station. The toll master has intel for sale — but the price is a favor, not gold. This is a random encounter — generate a scene at the hilltop trading post. Provide 3 choices.'},
  berkeley_heights:{name:'Berkeley Heights',shortName:'BRKHT',ctrl:'neutral',faction:null,secondary:true,svgX:268,svgY:168,travelDays:1,travelSupplies:5,travelTroopRisk:false,raidRisk:1,supplyPerTurn:0,features:['Research enclave','Salvaged lab equipment','Medical supplies'],flavor:'A quiet enclave of former Bell Labs researchers and their descendants. They salvage and rebuild pre-collapse laboratory equipment. Best medical supplies outside of Brantover — and much safer.',randomEncounter:'The player enters Berkeley Heights. The research council is testing a device recovered from a Brantover shipment. Something is going wrong. This is a random encounter — generate a tense scene. Provide 3 choices.'},
  westfield:{name:'Westfield',shortName:'WSTFD',ctrl:'neutral',faction:null,secondary:true,svgX:295,svgY:178,travelDays:1,travelSupplies:5,travelTroopRisk:false,raidRisk:1,supplyPerTurn:0,features:['Maintained suburb','Corporate council','Outsiders tolerated'],flavor:'Westfield maintained its suburb aesthetic through sheer stubbornness. The corporate council runs it like a pre-collapse HOA with teeth. Clean streets, working lights, and a deep suspicion of anyone who doesn\'t own property.',randomEncounter:'The player walks down Westfield\'s maintained main street. A council representative approaches with a business proposition — and a veiled threat. This is a random encounter — generate a scene. Provide 3 choices.'},
  warren_twp:{name:'Warren Township',shortName:'WARRN',ctrl:'neutral',faction:null,secondary:true,svgX:245,svgY:183,travelDays:1,travelSupplies:5,travelTroopRisk:false,raidRisk:1,supplyPerTurn:0,features:['Farm community','Grain-for-water trade','Covenant supply line'],flavor:'Rolling farmland in Somerset County. Warren Township trades grain to the Mountain Covenant in exchange for clean Watchung water. It\'s the most important supply chain in central Jersey and both sides know it.',randomEncounter:'The player arrives during a grain delivery to a Covenant caravan. There\'s a dispute over the exchange rate. Both sides are armed. This is a random encounter — generate a tense trade scene. Provide 3 choices.'},
  union_twp:{name:'Union Township',shortName:'UNION',ctrl:'neutral',faction:null,secondary:true,svgX:303,svgY:168,travelDays:1,travelSupplies:5,travelTroopRisk:true,raidRisk:2,supplyPerTurn:0,features:['Industrial sprawl','Caught between factions','Scrap processing'],flavor:'An industrial sprawl caught between the Syndicate\'s sphere and the central corridor. Union processes scrap metal from the old factories — everyone wants what they produce, nobody wants to protect them.',randomEncounter:'The player enters Union Township. A Syndicate enforcer and a Covenant trader are both demanding exclusive scrap rights from the township elder. This is a random encounter — generate a scene. Provide 3 choices.'},
  stafford_twp:{name:'Stafford Township',shortName:'STFRD',ctrl:'neutral',faction:null,secondary:true,svgX:301,svgY:386,travelDays:2,travelSupplies:10,travelTroopRisk:false,raidRisk:2,supplyPerTurn:0,features:['Coastal fishing','Marsh settlement','Pine Barrens treeline watch'],flavor:'A marsh settlement on the edge of the Pine Barrens. Stafford watches the treeline and fishes the bay. They know when the Hollowed move before anyone else — and they sell that information.',randomEncounter:'The player arrives in Stafford. The night watch has spotted something moving along the Pine Barrens treeline — not Hollowed, something else. This is a random encounter — generate a tense scene. Provide 3 choices.'},
  // ── ATLANTIC CITY ─────────────────────────────────────────────────────────
  atlantic_city:{name:'Atlantic City Casino',shortName:'ATLCT',ctrl:'neutral',faction:'subnet',svgX:268,svgY:460,travelDays:3,travelSupplies:14,travelTroopRisk:false,raidRisk:1,supplyPerTurn:4,casinoEntry:true,features:['The Boardwalk Grand Casino','Employee-operated \u2014 staff run the show','Neutral ground \u2014 all weapons checked'],flavor:"The only fully-lit building on the Jersey Shore. The employees run everything \u2014 dealers, bartenders, pit bosses, security. They were hired through intermediaries and have never met whoever owns the place. They don't ask questions. They get paid in gold and that's enough. The chips are real gold. The drinks are real. The odds are... managed."},
};
// County map alternate coordinates for all locations
const COUNTY_COORDS={
  newark:{cX:323,cY:159},mountainside:{cX:281,cY:174},tcnj:{cX:188,cY:262},trenton:{cX:192,cY:272},
  mcguire:{cX:228,cY:316},lbi:{cX:345,cY:400},meridian_biolabs:{cX:195,cY:115},pine_barrens:{cX:272,cY:386},
  atlantic_city:{cX:268,cY:460},cape_may:{cX:159,cY:552},
  hoboken:{cX:354,cY:159},port_elizabeth:{cX:314,cY:176},newark_airport:{cX:323,cY:170},
  middlesex:{cX:250,cY:196},asbury_ruins:{cX:358,cY:272},bound_brook:{cX:241,cY:196},
  metuchen:{cX:281,cY:203},dunellen:{cX:256,cY:192},manville:{cX:230,cY:203},netcong:{cX:203,cY:124},
  newton:{cX:194,cY:89},paterson:{cX:323,cY:120},hackensack:{cX:352,cY:126},belvidere:{cX:121,cY:139},
  morristown:{cX:256,cY:146},jersey_city:{cX:360,cY:161},flemington:{cX:170,cY:209},somerville:{cX:225,cY:196},
  new_brunswick:{cX:261,cY:214},freehold:{cX:301,cY:264},mount_holly:{cX:186,cY:323},toms_river:{cX:316,cY:331},
  camden:{cX:112,cY:336},woodbury:{cX:106,cY:355},salem:{cX:35,cY:414},bridgeton:{cX:88,cY:445},
  mays_landing:{cX:199,cY:441},
  summit:{cX:290,cY:162},berkeley_heights:{cX:268,cY:168},westfield:{cX:295,cY:178},
  warren_twp:{cX:245,cY:183},union_twp:{cX:303,cY:168},stafford_twp:{cX:301,cY:386}
};
Object.entries(COUNTY_COORDS).forEach(([k,v])=>{if(LOCATIONS[k])Object.assign(LOCATIONS[k],v);});
// Passive gold income per controlled location per turn
const LOC_GOLD_PER_TURN={
  newark:4, mountainside:3, tcnj:2, trenton:4, mcguire:3, lbi:5,
  meridian_biolabs:3, cape_may:0, pine_barrens:0, atlantic_city:3,
};
const PATROL_ROUTES=[{from:'newark',to:'tcnj'},{from:'mcguire',to:'tcnj'},{from:'mcguire',to:'trenton'}];

const ROAD_CONNECTIONS={
  'road-meridian-newark':          ['meridian_biolabs','newark'],
  'road-meridian-mountainside':    ['meridian_biolabs','mountainside'],
  'road-newark-mountainside':      ['newark','mountainside'],
  'road-newark-tcnj':              ['newark','tcnj'],
  'road-mside-tcnj':               ['mountainside','tcnj'],
  'road-tcnj-trenton':             ['tcnj','trenton'],
  'road-trenton-mcguire':          ['trenton','mcguire'],
  'road-tcnj-mcguire':             ['tcnj','mcguire'],
  'road-mcguire-lbi':              ['mcguire','lbi'],
  'road-newark-lbi':               ['newark','lbi'],
  'road-mcguire-pine_barrens':     ['mcguire','pine_barrens'],
  'road-lbi-pine_barrens':         ['lbi','pine_barrens'],
  'road-pine_barrens-atlantic_city':['pine_barrens','atlantic_city'],
  'road-pine_barrens-cape_may':    ['pine_barrens','cape_may'],
};

// Build flat class lookup
const CLASSES={};
Object.values(FACTION_CLASSES).forEach(f=>{
  f.classes.forEach(c=>{ CLASSES[c.id]={...c, factionId: Object.keys(FACTION_CLASSES).find(k=>FACTION_CLASSES[k]===f)}; });
});

// STATE
const state={
  apiKey:'',turn:1,hp:100,maxHp:100,
  character:{name:'',class:''},
  factionName:'',ownFaction:false,
  history:[],currentChoices:[],isLoading:false,
  currentLocation:'tcnj',
  days:0,supplies:50,troops:0,gold:0,deathRiskMod:0,
  garrison:{},           // locId -> troop count stationed there
  selectedLocation:null,activeTab:'story',
  activeFactionDlg:null,dlgHistory:[],
  boostedSkill:null,
  originFaction:null,classPerk:'',
  gameOver:false,
  metFactions:[],   // faction IDs where player has opened dialogue (reveals their NPCs)
  sessionId:'',     // unique session ID for dev log grouping
};
// ── PERSISTENT PLAYER CODENAME (survives across sessions) ──
const CODENAME_KEY='jw2999_codename';
const CN_ADJ=['Iron','Shadow','Rust','Ghost','Crimson','Hollow','Silent','Burnt','Frozen','Broken','Copper','Ashen','Bitter','Stone','Wild','Dead','Toxic','Pale','Black','Red','Scarred','Grave','Neon','Feral','Blind','Chrome','Rogue','Scorched','Venom','Grim'];
const CN_NOUN=['Wolf','Falcon','Viper','Jackal','Raven','Coyote','Lynx','Cobra','Mantis','Hornet','Osprey','Badger','Panther','Condor','Mongoose','Hyena','Scorpion','Basilisk','Sparrow','Hound','Phantom','Dagger','Wraith','Specter','Cipher','Nomad','Pilgrim','Warden','Herald','Reaper'];
function getPlayerCodename(){
  let cn=localStorage.getItem(CODENAME_KEY);
  if(!cn){
    const a=CN_ADJ[Math.floor(Math.random()*CN_ADJ.length)];
    const n=CN_NOUN[Math.floor(Math.random()*CN_NOUN.length)];
    const tag=Math.floor(Math.random()*900+100);
    cn=a+' '+n+' #'+tag;
    localStorage.setItem(CODENAME_KEY,cn);
  }
  return cn;
}
const PLAYER_CODENAME=getPlayerCodename();

let skillAllocRemaining=10;
const skillAlloc={force:0,wit:0,influence:0,shadow:0,grit:0};
let lastRelChangeFid=null;

// TABS
function switchTab(tab){
  state.activeTab=tab;
  ['story','map','factions','skills','tasks'].forEach(t=>{
    const v=document.getElementById(t+'-view');
    if(v) v.style.display=t===tab?'block':'none';
    const tb=document.getElementById('tab-'+t);
    if(tb) tb.className='tab'+(t===tab?' active':'');
  });
  document.getElementById('dialogue-screen').style.display='none';
  if(tab==='map'){refreshMap();}
  if(tab==='factions'){renderFactions();}
  if(tab==='skills'){renderSkills();}
  if(tab==='tasks'){renderTasks();}
}

// SETUP
function allocSkill(k,delta){
  const cur=skillAlloc[k]||0;
  const nv=cur+delta;
  if(nv<0||nv>3)return;
  if(delta>0&&skillAllocRemaining<=0)return;
  skillAlloc[k]=nv;
  skillAllocRemaining-=delta;
  document.getElementById('alloc-'+k).textContent=nv;
  document.getElementById('skill-pts-left').textContent=skillAllocRemaining;
}

function selectFaction(el){
  document.querySelectorAll('.arch-card').forEach(c=>c.classList.remove('selected'));
  el.classList.add('selected');
  const fid=el.dataset.arch;
  const fdata=FACTION_CLASSES[fid];
  const panel=document.getElementById('subclass-panel');
  const grid=document.getElementById('sub-grid');
  document.getElementById('sub-header').innerHTML=
    `<span style="color:${fdata.color}">${fdata.icon}</span> ${fdata.label} — ${fdata.lore.substring(0,90)}...`;
  grid.innerHTML='';
  document.querySelectorAll('.class-card').forEach(c=>c.classList.remove('selected'));
  fdata.classes.forEach(cls=>{
    const bonusLines=Object.entries(cls.statBonus).map(([k,v])=>k.slice(0,3).toUpperCase()+(v>0?'+':'')+v).join(' ');
    const apLines=Object.entries(cls.skillBonus).map(([k,v])=>k.slice(0,3).toUpperCase()+' AP+'+v).join(' ');
    const stLines=[];
    if(cls.startBonus.troops>0) stLines.push('TROOPS +'+cls.startBonus.troops);
    if(cls.startBonus.troops<0) stLines.push('TROOPS '+cls.startBonus.troops);
    if(cls.startBonus.supplies>0) stLines.push('SUP +'+cls.startBonus.supplies);
    if(cls.startBonus.supplies<0) stLines.push('SUP '+cls.startBonus.supplies);
    const card=document.createElement('div');
    card.className='class-card'; card.dataset.class=cls.id;
    card.onclick=()=>selectClass(card);
    card.innerHTML=
      `<div class="cc-top"><span class="ci">${cls.icon}</span>`+
      `<div class="cc-names"><span class="cn">${cls.name}</span>`+
      `<span class="cn-arch" style="color:${fdata.color}">${fdata.label}</span><span class="cn-tier" style="font-size:.48rem;opacity:.75;">${cls.tier==="advanced"?"[ADV]":"[BAS]"}</span></div></div>`+
      `<div class="cd">${cls.flavor}</div>`+
      `<div class="cc-bonuses">`+
      (bonusLines?`<span class="cc-bonus">STATS: ${bonusLines}</span>`:'')+
      (apLines?`<span class="cc-bonus">${apLines}</span>`:'')+
      (stLines.length?`<span class="cc-bonus">${stLines.join(' / ')}</span>`:'')+
      `</div>`+
      `<div class="cc-perk">${cls.classPerk}</div>`;
    grid.appendChild(card);
  });
  panel.classList.add('visible');
}

function selectClass(el){
  document.querySelectorAll('.class-card').forEach(c=>c.classList.remove('selected'));
  el.classList.add('selected');
}

function beginGame(){
  const apiKey=document.getElementById('api-key').value.trim();
  const name=document.getElementById('char-name').value.trim();
  const usernameInput=document.getElementById('username-input');
  const codeInput=document.getElementById('login-code-input');
  const username=usernameInput?usernameInput.value.trim():'';
  const loginCode=codeInput?codeInput.value.trim():'';
  const cc=document.querySelector('.class-card.selected');
  const err=document.getElementById('setup-error');
  if(!apiKey){showErr(err,'API KEY REQUIRED.');return;}
  if(!name){showErr(err,'SURVIVOR DESIGNATION REQUIRED.');return;}
  if(!username){showErr(err,'USERNAME REQUIRED.');return;}
  if(!loginCode||loginCode.length!==4||!/^\d{4}$/.test(loginCode)){showErr(err,'4-DIGIT CODE REQUIRED (numbers only).');return;}
  if(!cc){showErr(err,'SELECT CLASS.');return;}
  err.style.display='none';
  state.apiKey=apiKey; state.factionName='Old Jersey';
  state.username=username; state.loginCode=loginCode;
  localStorage.setItem('jw2999_username',username);
  localStorage.setItem('jw2999_logincode',loginCode);
  state.character={name,class:cc.dataset.class};
  state.hp=100; state.maxHp=100; state.turn=1; state.history=[];
  state.days=0; state.supplies=50; state.troops=0; state.gold=0; state.garrison={}; state.deathRiskMod=0;
  state.ownFaction=false; state.originFaction=null; state.classPerk='';
  // Apply skill point allocation from setup screen
  const STAT_TO_SKILL={brutality:'force',cunning:'wit',charisma:'influence',depravity:'shadow'};
  Object.entries(skillAlloc).forEach(([k,v])=>{if(SKILLS[k])SKILLS[k].ap+=v;});
  // Apply class bonuses from CLASSES data
  const cls=CLASSES[cc.dataset.class];
  // Starting location based on origin faction
  const originFdata=cls?FACTION_CLASSES[cls.factionId]:null;
  state.currentLocation=originFdata?.startLocation||'tcnj';
  state.visitedLocations=[state.currentLocation];
  state.travelMethod='foot';
  state.amishContactMade=false;
  state.amishDealMade=false;
  state.factionQuests={};
  if(cls){
    // Stat bonuses remapped to skill AP
    Object.entries(cls.statBonus).forEach(([s,v])=>{
      const sk=STAT_TO_SKILL[s]||s;
      if(SKILLS[sk])SKILLS[sk].ap+=v;
    });
    // Skill AP bonuses
    Object.entries(cls.skillBonus).forEach(([sk,v])=>{if(SKILLS[sk])SKILLS[sk].ap+=v;});
    // Start resource bonuses
    if(cls.startBonus.troops) state.troops=Math.max(0,state.troops+cls.startBonus.troops);
    if(cls.startBonus.supplies) state.supplies=Math.max(0,state.supplies+cls.startBonus.supplies);
    // Origin faction starts at Trade Pact (41)
    const originFid=cls.factionId;
    if(originFid && FACTIONS[originFid]) FACTIONS[originFid].relationScore=41;
    // Rival factions start hostile (score 10)
    const rivals=FACTION_RIVALS[originFid]||[];
    rivals.forEach(rid=>{ if(FACTIONS[rid]) FACTIONS[rid].relationScore=10; });
    // Store origin faction on state for AI context
    state.originFaction=originFid;
    state.classPerk=cls.classPerk;
  }
  // Reset skill alloc for next new game
  Object.keys(skillAlloc).forEach(k=>skillAlloc[k]=0);
  skillAllocRemaining=10;
  localStorage.setItem(API_KEY,apiKey);
  document.getElementById('panel-name').textContent=name;
  document.getElementById('panel-class').textContent=CLASSES[cc.dataset.class]?.name||cc.dataset.class;
  document.getElementById('panel-faction').textContent=fName;
  document.getElementById('panel-loc').textContent=LOCATIONS[state.currentLocation]?.shortName||'TCNJ';
  updateHp(100); updateRes(); renderAPRow();
  state.sessionId=Date.now().toString(36)+Math.random().toString(36).slice(2,7);
  logEvent('session_start',{campaign:selectedStoryId||'jersey',faction:state.originFaction,cls:state.character.class,name:state.character.name,skills:{...skillAlloc}});
  showScreen('game-screen');
  switchTab('story');
  startStory();
}

// ── DOM element cache — populated once on DOMContentLoaded ──
const _el={};
function _initElCache(){
  ['hp-bar','hp-text','res-days','res-supplies','res-troops','res-gold','res-territories',
   'map-day','map-sup','map-trp','map-gold','panel-loc','res-amish','amish-chip','res-travel','travel-chip','turn-counter',
   'game-error','story-text','choices-container','open-wrap','turn-delta-bar',
   'load-overlay','load-msg','load-sub','load-ico','load-prog','load-turn-lbl']
  .forEach(id=>{_el[id]=document.getElementById(id);});
}

function updateHp(v){
  state.hp=Math.max(0,Math.min(state.maxHp,v));
  _el['hp-bar'].style.width=(state.hp/state.maxHp*100)+'%';
  _el['hp-text'].textContent=state.hp+'/'+state.maxHp;
}
function updateRes(){
  const goldFmt=parseFloat(state.gold||0).toFixed(1)+'g';
  _el['res-days'].textContent=state.days;
  _el['res-supplies'].textContent=state.supplies;
  _el['res-troops'].textContent=state.troops;
  _el['res-gold'].textContent=goldFmt;
  _el['res-territories'].textContent=Object.values(LOCATIONS).filter(l=>!l.secondary&&l.ctrl==='player').length;
  _el['map-day'].textContent=state.days;
  _el['map-sup'].textContent=state.supplies;
  _el['map-trp'].textContent=state.troops;
  _el['map-gold'].textContent=goldFmt;
  if(_el['panel-loc']) _el['panel-loc'].textContent=LOCATIONS[state.currentLocation]?.shortName||state.currentLocation?.toUpperCase()||'';
  // Amish countdown
  const daysLeft=Math.max(0,AMISH.arrivalDay-state.days);
  if(_el['res-amish']) _el['res-amish'].textContent=daysLeft+'d';
  if(_el['amish-chip']){
    _el['amish-chip'].classList.remove('amish-warn','amish-critical');
    if(daysLeft<=10) _el['amish-chip'].classList.add('amish-critical');
    else if(daysLeft<=30) _el['amish-chip'].classList.add('amish-warn');
  }
  // Travel method + fuel indicator
  const tm=TRAVEL_METHODS[state.travelMethod||'foot'];
  if(_el['res-travel']){
    _el['res-travel'].textContent=tm.fuelCost>0?tm.label+' \u26FD'+tm.fuelCost+'g':tm.label;
  }
  if(_el['travel-chip']){
    _el['travel-chip'].classList.toggle('travel-fuel',tm.fuelCost>0);
  }
}

// AP SYSTEM
function renderAPRow(){
  const row=document.getElementById('ap-row'); row.innerHTML='';
  let total=0;
  Object.entries(SKILLS).forEach(([k,sk])=>{
    total+=sk.ap;
    const chip=document.createElement('div');
    chip.className='ap-chip';
    chip.title='Click to view '+sk.name+' skill tree';
    chip.onclick=()=>switchTab('skills');
    chip.innerHTML='<span class="apl">'+sk.icon+' '+sk.name.substring(0,4)+'</span><span class="apv">'+sk.ap+'</span>';
    row.appendChild(chip);
  });
  const totalEl=document.getElementById('total-ap');
  if(totalEl) totalEl.textContent=total;
}

function earnAP(skillKey,amount){
  if(!SKILLS[skillKey]) return;
  SKILLS[skillKey].ap+=amount;
  SKILLS[skillKey].xp+=amount*10;
  renderAPRow();
  if(document.getElementById('skills-view').style.display!=='none') renderSkills();
  showNotif('+'+amount+' '+SKILLS[skillKey].name+' AP BANKED');
}

function detectSkill(text){
  const t=text.toLowerCase();
  if(t.includes('fight')||t.includes('attack')||t.includes('kill')||t.includes('shoot')||t.includes('stab')||t.includes('intimidat')||t.includes('threaten')) return 'force';
  if(t.includes('talk')||t.includes('negotiate')||t.includes('persuade')||t.includes('diplomacy')||t.includes('propose')||t.includes('ally')||t.includes('speech')) return 'influence';
  if(t.includes('lead')||t.includes('command')||t.includes('rally')||t.includes('charge')||t.includes('army')) return 'force';
  if(t.includes('sneak')||t.includes('stealth')||t.includes('ambush')||t.includes('infiltrate')||t.includes('escape')||t.includes('spy')||t.includes('shadow')) return 'shadow';
  if(t.includes('trade')||t.includes('buy')||t.includes('sell')||t.includes('deal')||t.includes('barter')||t.includes('scheme')||t.includes('engineer')||t.includes('build')||t.includes('repair')) return 'wit';
  if(t.includes('search')||t.includes('scaveng')||t.includes('forage')||t.includes('survive')||t.includes('endure')||t.includes('scout')) return 'grit';
  return null;
}

function spendAP(k){
  if(SKILLS[k].ap<1){showNotif('NO '+SKILLS[k].name+' AP BANKED');return;}
  SKILLS[k].ap--;
  state.boostedSkill=k;
  renderAPRow(); renderSkills();
  showNotif(SKILLS[k].name+' AP SPENT -- NEXT ACTION BOOSTED!');
}

// SKILLS RENDER
function renderSkills(){
  const grid=document.getElementById('skill-grid'); grid.innerHTML='';
  let total=0;
  Object.entries(SKILLS).forEach(([k,sk])=>{
    total+=sk.ap;
    const lvl=Math.floor(sk.xp/100);
    const xpPct=sk.xp%100;
    const card=document.createElement('div'); card.className='skill-card';
    // Build perk rows — handle forks
    let perkHTML='';
    sk.perks.forEach(p=>{
      if(p.fork){
        const reached=lvl>=p.lvl;
        const chosen=sk.forkChoice;
        if(!reached && !chosen){
          // Not yet reached — show as locked fork preview
          perkHTML+=`<div class="sk-perk locked" style="border-style:dashed;"><span class="sk-perk-lvl">LVL ${p.lvl} FORK</span>`;
          perkHTML+=`<div><div style="color:var(--a);font-size:.5rem;margin-bottom:3px;">CHOOSE YOUR PATH:</div>`;
          p.options.forEach(opt=>{ perkHTML+=`<div style="opacity:.5;margin-bottom:2px;">[${opt.label}] ${opt.t}</div>`; });
          perkHTML+=`</div></div>`;
        } else if(reached && !chosen){
          // Reached — show fork choice buttons
          perkHTML+=`<div class="sk-perk" style="border-color:var(--a);background:rgba(255,176,0,.05);flex-direction:column;gap:6px;"><div style="color:var(--a);font-size:.58rem;letter-spacing:1px;">LVL ${p.lvl} — CHOOSE YOUR PATH:</div>`;
          p.options.forEach(opt=>{
            perkHTML+=`<button onclick="chooseFork('${k}','${opt.key}')" style="background:#000;border:1px solid var(--a);padding:6px 10px;color:var(--a);font-family:'Share Tech Mono',monospace;font-size:.58rem;cursor:pointer;text-align:left;line-height:1.5;"><strong>[${opt.label}]</strong><br>${opt.t}</button>`;
          });
          perkHTML+=`</div>`;
        } else if(chosen){
          // Choice made — show chosen path
          const chosenOpt=p.options.find(o=>o.key===chosen);
          if(chosenOpt){
            perkHTML+=`<div class="sk-perk unlocked"><span class="sk-perk-lvl">LVL ${p.lvl} ✓</span><div><span style="color:var(--a);font-size:.5rem;">[${chosenOpt.label}]</span><br>${chosenOpt.t}</div></div>`;
            // Show unchosen as locked
            p.options.filter(o=>o.key!==chosen).forEach(opt=>{
              perkHTML+=`<div class="sk-perk locked" style="opacity:.35;"><span class="sk-perk-lvl">LVL ${p.lvl}</span><div><span style="font-size:.5rem;">[${opt.label}] NOT CHOSEN</span><br>${opt.t}</div></div>`;
            });
          }
        }
      } else {
        const state_perk=lvl>=p.lvl?'unlocked':'locked';
        // Find first locked as 'next'
        const isNext=!p.fork && lvl<p.lvl && !sk.perks.slice(0,sk.perks.indexOf(p)).some(pp=>!pp.fork&&lvl<pp.lvl);
        perkHTML+=`<div class="sk-perk ${isNext?'next':state_perk}"><span class="sk-perk-lvl">LVL ${p.lvl}${lvl>=p.lvl?' ✓':''}</span>${p.t}</div>`;
      }
    });
    card.innerHTML=`
      <div class="sk-hdr"><div class="sk-name">${sk.icon} ${sk.name}</div><div class="sk-ap">AP: <span>${sk.ap}</span></div></div>
      <div class="sk-xp-wrap">
        <div class="sk-xp-lbl"><span>LVL ${lvl}</span><span>${xpPct}/100 XP</span></div>
        <div class="sk-xp-track"><div class="sk-xp-fill" style="width:${xpPct}%"></div></div>
      </div>
      <div class="sk-desc">${sk.desc}</div>
      <div class="sk-perks">${perkHTML}</div>
      <button class="spend-btn" ${sk.ap<1?'disabled':''} onclick="spendAP('${k}')">[ SPEND 1 AP &rarr; BOOST NEXT ${sk.name} ACTION ]</button>`;
    grid.appendChild(card);
  });
  document.getElementById('total-ap').textContent=total;
}

function chooseFork(skillKey, optKey){
  if(!SKILLS[skillKey]) return;
  SKILLS[skillKey].forkChoice=optKey;
  renderSkills();
  showNotif(SKILLS[skillKey].name+' PATH CHOSEN');
}

// FACTIONS RENDER
function renderFactions(){
  const list=document.getElementById('faction-list'); list.innerHTML='';
  Object.values(FACTIONS).forEach(f=>{
    const rel=getRelState(f);
    const met=state.metFactions.includes(f.id);
    // Build NPC dossier — all contacts visible from start
    let npcHtml='';
    const buildNpc=(name,role,voice)=>`<div class="fc-npc"><div class="fc-npc-name">${name}</div><div class="fc-npc-role">${role}</div>${voice?`<div class="fc-npc-voice">&ldquo;${voice}&rdquo;</div>`:''}</div>`;
    if(f.id==='subnet'){
      npcHtml='<div class="fc-npcs"><div class="fc-npc-hdr">KNOWN CONTACTS</div>'
        +buildNpc('THE ARCHITECT','NJ-ADMIN-7 — Primary Interface',FACTIONS.subnet.voice)
        +'</div>';
    } else {
      npcHtml='<div class="fc-npcs"><div class="fc-npc-hdr">CONTACTS</div>';
      npcHtml+=buildNpc(f.leader,f.leaderTitle||'Leader',f.voice);
      (f.characters||[]).forEach(c=>{npcHtml+=buildNpc(c.name,c.role,c.voice);});
      npcHtml+='</div>';
    }
    // Quests — only show generate option after met, always show done quests
    const quests=state.factionQuests?.[f.id];
    const active=(quests||[]).filter(q=>!q.done);
    const doneCount=(quests||[]).filter(q=>q.done).length;
    const questCards=active.map(q=>`<div class="fc-quest-card"><div class="fc-quest-title">${q.title}</div><div class="fc-quest-from">FROM: ${q.charName}</div><div class="fc-quest-desc">${q.desc}</div><div class="fc-quest-reward">&#10003; COMPLETE = +33 RELATION</div></div>`).join('');
    const questHtml=`<div class="fc-quests"><div class="fc-quest-hdr">FACTION QUESTS${doneCount?' <span style="color:var(--g)">('+doneCount+' done)</span>':''}</div>${questCards}<button class="fc-quest-gen-btn" data-quest-gen="${f.id}" onclick="generateFactionQuests('${f.id}')">${active.length?'[ REFRESH QUESTS ]':'[ GENERATE QUESTS ]'}</button></div>`;
    const card=document.createElement('div'); card.className='faction-card'+(f.id===lastRelChangeFid?' rel-flash':'');
    card.innerHTML=`
      <div class="fc-hdr">
        <div class="fc-name">${f.icon} ${f.name}</div>
        <div class="fc-badge" style="color:${rel.color};border-color:${rel.color}">${rel.label}</div>
      </div>
      <div class="fc-territory">&#9656; ${f.territory}</div>
      <div class="fc-desc">${f.desc}</div>
      <div class="fc-faction-wants"><span class="fc-wants-lbl">WANTS:</span> ${f.wants||'—'}</div>
      <div class="fc-rel-wrap">
        <div class="fc-rel-lbl"><span>RELATION</span><span style="color:${rel.color}">${rel.label} &mdash; ${f.relationScore}/100</span></div>
        <div class="fc-rel-track"><div class="fc-rel-fill" style="width:${f.relationScore}%;background:${rel.color}"></div></div>
      </div>
      ${npcHtml}
      ${questHtml}
      <button class="fc-talk-btn" onclick="openDialogue('${f.id}')">[ OPEN CHANNEL &mdash; ${f.leader.toUpperCase()} ]</button>`;
    list.appendChild(card);
    if(f.id===lastRelChangeFid){setTimeout(()=>{card.classList.remove('rel-flash');lastRelChangeFid=null;},2000);}
  });
}

// TASKS / OBJECTIVES RENDER
function renderTasks(){
  const el=document.getElementById('tasks-list'); if(!el)return;
  el.innerHTML='';
  const factions=Object.values(FACTIONS);
  const resolved=factions.filter(f=>isResolved(f.id)).length;
  const total=factions.length;
  const territories=Object.values(LOCATIONS).filter(l=>!l.secondary&&l.ctrl==='player').length;
  const totalTerr=Object.values(LOCATIONS).filter(l=>!l.secondary).length;
  // Victory path detection
  const alliedCount=factions.filter(f=>isResolved(f.id)&&f.relationScore>=66).length;
  const conqueredCount=factions.filter(f=>isResolved(f.id)&&f.relationScore===0).length;
  let victoryPath='UNDECIDED';
  if(territories===totalTerr) victoryPath='DOMINATION';
  else if(resolved===total&&conqueredCount===0) victoryPath='DIPLOMATIC';
  else if(resolved===total&&alliedCount===0) victoryPath='CONQUEST';
  else if(resolved>0) victoryPath='MIXED';

  // AMISH THREAT BANNER
  const amishDaysLeft=Math.max(0,AMISH.arrivalDay-state.days);
  const amishPhaseShort=amishDaysLeft>90?'DISTANT':amishDaysLeft>60?'APPROACHING':amishDaysLeft>30?'IMMINENT':amishDaysLeft>0?'CRITICAL':'ARRIVED';
  const amishThreatColor=amishDaysLeft<=30?'var(--blood)':amishDaysLeft<=60?'#e06010':'#c8a84b';
  const amishCard=document.createElement('div'); amishCard.className='wr-amish-threat';
  amishCard.style.borderColor=amishThreatColor;
  amishCard.innerHTML=`
    <div class="wr-amish-hdr" style="color:${amishThreatColor}">&#9888; EXTERNAL THREAT — YEE AMISH OF PENNSYLVANIA</div>
    <div class="wr-amish-row"><span class="wr-amish-lbl">SHEPHERD</span><span style="color:${amishThreatColor}">${AMISH.leader}</span> &mdash; ${AMISH.leaderTitle}</div>
    <div class="wr-amish-row"><span class="wr-amish-lbl">ARRIVAL</span>DAY ${AMISH.arrivalDay} &nbsp;|&nbsp; <span style="color:${amishThreatColor}">${amishDaysLeft}d REMAINING</span> &nbsp;|&nbsp; <span style="color:${amishThreatColor}">[${amishPhaseShort}]</span></div>
    <div class="wr-amish-row"><span class="wr-amish-lbl">CONTACT</span>${state.amishContactMade?'<span style="color:var(--g)">YES — Ezikio is aware of you</span>':'<span style="color:var(--gd)">NO</span>'} &nbsp;|&nbsp; <span class="wr-amish-lbl">DEAL</span> ${state.amishDealMade?'<span style="color:var(--g)">YES — 50/50 chance of survival</span>':'<span style="color:var(--gd)">NO</span>'}</div>
    <div class="wr-amish-quote">&ldquo;He does not want war. He wants the land. The distinction is academic.&rdquo;</div>`;
  el.appendChild(amishCard);

  // SECTION A: Campaign Banner
  const banner=document.createElement('div'); banner.className='war-room-banner';
  const overallPct=Math.round(((territories/totalTerr)+(resolved/total))/2*100);
  banner.innerHTML=`
    <div class="war-room-title">&#9876; WAR ROOM &mdash; OPERATION: BRING ORDER</div>
    <div class="war-room-stats">
      <div class="war-stat"><div class="war-stat-val">${territories}/${totalTerr}</div><div class="war-stat-lbl">TERRITORIES</div></div>
      <div class="war-stat"><div class="war-stat-val">${resolved}/${total}</div><div class="war-stat-lbl">RESOLVED</div></div>
      <div class="war-stat"><div class="war-stat-val">${state.days}</div><div class="war-stat-lbl">DAYS</div></div>
      <div class="war-stat"><div class="war-stat-val" style="color:var(--a)">${victoryPath}</div><div class="war-stat-lbl">PATH</div></div>
    </div>
    <div class="war-room-prog-wrap"><div class="war-room-prog-fill" style="width:${overallPct}%"></div></div>`;
  el.appendChild(banner);

  // SECTION B: Faction Intel
  const fHdr=document.createElement('div'); fHdr.className='wr-section-hdr'; fHdr.textContent='FACTION INTEL'; el.appendChild(fHdr);
  factions.forEach(f=>{
    const done=isResolved(f.id);
    const rel=getRelState(f);
    const home=FACTION_HOME[f.id];
    const homeLoc=home?LOCATIONS[home]:null;
    const homeCtrl=homeLoc?homeLoc.ctrl:'none';
    const homeLabel=homeCtrl==='player'?`<span style="color:var(--g)">YOURS</span>`:homeCtrl==='hostile'?`<span style="color:var(--blood)">ENEMY</span>`:`<span style="color:var(--a)">NEUTRAL</span>`;
    const keyContact=f.characters&&f.characters.length?f.characters[0]:null;
    const met=state.metFactions.includes(f.id);
    let objHint;
    if(done&&f.relationScore>=66) objHint=`<span style="color:var(--g)">&#10003; ALLIED &mdash; alliance secured</span>`;
    else if(done) objHint=`<span style="color:var(--blood)">&#10007; ELIMINATED &mdash; faction destroyed</span>`;
    else{
      const allyGap=66-f.relationScore;
      const capStatus=homeLoc?(homeCtrl==='player'?`<span style="color:var(--g)">home captured</span>`:'capture '+homeLoc.shortName):'no fixed territory';
      objHint=`Ally: +${allyGap} REL needed &nbsp;|&nbsp; Conquer: ${capStatus} + reduce to 0`;
    }
    const card=document.createElement('div'); card.className='wr-faction-card'+(done?' wr-resolved':'');
    card.innerHTML=`
      <div class="wr-fc-top">
        <div class="wr-fc-name">${f.icon} ${f.name}</div>
        <div class="wr-fc-badge" style="color:${rel.color};border-color:${rel.color}">${rel.label} ${f.relationScore}</div>
      </div>
      <div class="wr-fc-rel-bar"><div class="wr-fc-rel-fill" style="width:${f.relationScore}%;background:${rel.color}"></div></div>
      <div class="wr-fc-details">
        <div class="wr-fc-detail"><span class="wr-detail-lbl">LEADER</span>${f.leader}</div>
        <div class="wr-fc-detail"><span class="wr-detail-lbl">HOME</span>${homeLoc?homeLoc.shortName+' ['+homeLabel+']':'NOMADIC'}</div>
        ${keyContact?`<div class="wr-fc-detail"><span class="wr-detail-lbl">CONTACT</span>${met?keyContact.name+' &bull; '+keyContact.role:'[ OPEN DIALOGUE TO REVEAL ]'}</div>`:''}
      </div>
      <div class="wr-fc-obj">${objHint}</div>`;
    el.appendChild(card);
  });

  // SECTION C: Troop Disposition
  const tHdr=document.createElement('div'); tHdr.className='wr-section-hdr'; tHdr.textContent='TROOP DISPOSITION'; el.appendChild(tHdr);
  const totalGarr=Object.values(state.garrison).reduce((a,b)=>a+b,0);
  const troopCard=document.createElement('div'); troopCard.className='wr-troop-card';
  let troopHtml=`<div class="wr-troop-row"><span class="wr-troop-lbl">&#9654; MOBILE (with you)</span><span class="wr-troop-val">${state.troops}</span></div>`;
  Object.entries(state.garrison).filter(([,v])=>v>0).forEach(([locId,count])=>{
    const loc=LOCATIONS[locId];
    troopHtml+=`<div class="wr-troop-row"><span class="wr-troop-lbl">&#9632; GARRISONED @ ${loc?loc.shortName:locId}</span><span class="wr-troop-val">${count}</span></div>`;
  });
  troopHtml+=`<div class="wr-troop-row wr-troop-total"><span class="wr-troop-lbl">TOTAL FORCE</span><span class="wr-troop-val" style="color:var(--g)">${state.troops+totalGarr}</span></div>`;
  troopCard.innerHTML=troopHtml; el.appendChild(troopCard);

  // SECTION D: Territory Grid
  const terrHdr=document.createElement('div'); terrHdr.className='wr-section-hdr'; terrHdr.textContent='TERRITORY CONTROL'; el.appendChild(terrHdr);
  const terrGrid=document.createElement('div'); terrGrid.className='wr-terr-grid';
  Object.entries(LOCATIONS).filter(([,loc])=>!loc.secondary).forEach(([id,loc])=>{
    const ctrlColor=loc.ctrl==='player'?'var(--g)':loc.ctrl==='hostile'?'var(--blood)':'var(--a)';
    const garr=state.garrison[id]||0;
    const tile=document.createElement('div'); tile.className='wr-terr-tile'; tile.style.borderColor=ctrlColor;
    tile.innerHTML=`<div class="wr-terr-name" style="color:${ctrlColor}">${loc.shortName}</div>
      <div class="wr-terr-ctrl" style="color:${ctrlColor}">${loc.ctrl.toUpperCase()}</div>
      <div class="wr-terr-info">+${loc.supplyPerTurn||0} SUP/T${garr>0?' | &#9632;'+garr:''}</div>`;
    terrGrid.appendChild(tile);
  });
  el.appendChild(terrGrid);
}

// DIALOGUE
function openDialogue(fid){
  const f=FACTIONS[fid]; if(!f)return;
  if(fid==='subnet' && !(state.visitedLocations||[]).includes('cape_may')){
    showNotif('SUBNET SIGNAL UNDETECTABLE — Travel to Cape May Municipal to attempt contact');
    return;
  }
  state.activeFactionDlg=fid; state.dlgHistory=[];
  if(!state.metFactions.includes(fid)) state.metFactions.push(fid);
  logEvent('faction_talk',{fid,leader:f.leader,rel:f.relationScore});
  const rel=getRelState(f);
  document.getElementById('dlg-win-title').textContent='DIALOGUE.EXE -- '+f.name.toUpperCase();
  document.getElementById('port-ascii').textContent=f.leaderPortrait;
  const portName=document.getElementById('port-name');
  portName.textContent=f.leader; portName.style.color=f.color||'';
  document.getElementById('port-ascii').style.color=f.color||'';
  document.getElementById('port-title').textContent=f.leaderTitle;
  const relEl=document.getElementById('port-rel');
  relEl.textContent=rel.label; relEl.style.color=rel.color; relEl.style.borderColor=rel.color;
  const dlgWrap=document.querySelector('#dialogue-screen .dlg-wrap');
  if(dlgWrap) dlgWrap.style.borderColor=f.color||'';
  ['story','map','factions','skills','tasks'].forEach(t=>{const v=document.getElementById(t+'-view');if(v)v.style.display='none';});
  document.getElementById('dialogue-screen').style.display='block';
  document.getElementById('dlg-choices').innerHTML='';
  document.getElementById('dlg-text').textContent='...';
  startDialogue(fid);
}

function talkFromMap(){
  const locId=state.selectedLocation; if(!locId)return;
  const loc=LOCATIONS[locId];
  if(!loc||!loc.faction||loc.faction==='player'){closePopup();return;}
  closePopup(); switchTab('factions');
  setTimeout(()=>openDialogue(loc.faction),80);
}

function buildDlgSys(f){
  const rel=getRelState(f);
  const loc=Object.values(LOCATIONS).filter(l=>l.ctrl==='player').length;
  return `{JSON ONLY. NO TEXT BEFORE OR AFTER THE JSON OBJECT.}

NOT FALLOUT. NO NUKES. No radiation/rads, Vaults, Brotherhood, Deathclaws, Nuka-Cola, caps, Power Armor, Super Mutants, or Synths. Collapse was The Departure — rich fled to orbit. Hazards are chemical/bio contamination. Gold currency. Political city-states. NJ 2999.

You ARE ${f.leader} of ${f.name}. Relation to player: ${rel.label}.
Voice: ${f.voice}
Player: ${state.character.name} / "${state.factionName}" — ${state.troops} troops, ${state.supplies} supplies, ${loc} territories.

Format speech as: "${f.leader}: [words]"
Use *asterisks* for physical actions inline: *slams table* *lights a cigarette*
2-3 sentences. Dark humor. Match the ${rel.label} tone exactly — hostile means hostile.

{"speech":"${f.leader}: ...","choices":[{"label":"A","text":"player line","skill":"force|wit|influence|shadow|grit","rel_change":0},{"label":"B","text":"player line","skill":"...","rel_change":0},{"label":"C","text":"player line","skill":"...","rel_change":0}]}

One diplomatic (influence), one aggressive (force), one transactional (wit). rel_change realistic (-20 to +20).`;
}
// Robust JSON extractor — finds first { ... } block regardless of preamble/fences
function extractJSON(text){
  // Strip markdown fences
  text = text.replace(/```json\s*/gi,'').replace(/```\s*/g,'').trim();
  // Find outermost { }
  const start = text.indexOf('{');
  if(start === -1) throw new Error('No JSON object found in response');
  let depth=0, inStr=false, escape=false;
  for(let i=start;i<text.length;i++){
    const ch=text[i];
    if(escape){escape=false;continue;}
    if(ch==='\\'){escape=true;continue;}
    if(ch==='"'&&!escape) inStr=!inStr;
    if(inStr) continue;
    if(ch==='{') depth++;
    if(ch==='}'){depth--;if(depth===0) return JSON.parse(text.slice(start,i+1));}
  }
  throw new Error('Malformed JSON in response');
}

// MODEL SELECTION — Haiku for regular turns, Sonnet for major beats
// Major beats: opening turns, every 5th turn, low HP, raid events
function pickModel(msg){
  const isRaid=typeof msg==='string'&&msg.toLowerCase().includes('raid');
  const isMajor=state.turn<=2||state.turn%5===0||state.hp<30||isRaid;
  return isMajor?'claude-sonnet-4-20250514':'claude-haiku-4-5-20251001';
}

async function callDlg(sys,msg){
  const r=await fetch('https://airpg-api-proxi.billybuteau.workers.dev/',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({model:'claude-haiku-4-5-20251001',max_tokens:700,system:sys,messages:[...state.dlgHistory,{role:'user',content:msg}]})
  });
  if(!r.ok){
    const e=await r.json().catch(()=>({}));
    const err=new Error(e.error?.message||'HTTP '+r.status);
    logEvent('api_error',{msg:err.message.slice(0,120),model:'haiku',src:'dialogue'});
    throw err;
  }
  const d=await r.json();
  return extractJSON(d.content[0].text);
}

async function startDialogue(fid){
  const f=FACTIONS[fid];
  setDlgLoad(true);
  const sys=buildDlgSys(f);
  const msg=`BEGIN DIALOGUE. ${f.leader} opens the channel to ${state.character.name} of "${state.factionName}". Open with a greeting that matches your personality and the current ${getRelState(f).label} relationship. Then provide 3 player response choices.`;
  try{
    const res=await callDlg(sys,msg);
    state.dlgHistory.push({role:'user',content:msg},{role:'assistant',content:JSON.stringify(res)});
    renderDlg(res,f);
  }catch(e){document.getElementById('dlg-text').textContent='[SIGNAL LOST: '+e.message+']';}
  finally{setDlgLoad(false);}
}

function formatText(raw){
  if(!raw) return '';
  // *action* -> <em>
  let s = raw.replace(/\*([^*]+)\*/g,'<em>$1</em>');
  // "Name: quote" -> styled with faction color if known, player name = white
  s = s.replace(/"([A-Z][^:"]{1,30}):\s*([^"]+)"/g, (_,name,text) => {
    const pName = state.character?.name||'';
    const isPlayer = pName && name.trim().toLowerCase() === pName.trim().toLowerCase();
    const col = isPlayer ? '#ffffff' : getNpcColor(name);
    const style = col ? ` style="color:${col}"` : '';
    return `<span class="npc-quote"><span class="npc-name"${style}>${name}:</span> "${text}"</span>`;
  });
  // newlines -> <br>
  s = s.replace(/\n/g,'<br>');
  return s;
}

function renderDlg(res,f){
  document.getElementById('dlg-text').innerHTML=formatText(res.speech)||'...';
  const el=document.getElementById('dlg-choices'); el.innerHTML='';
  (res.choices||[]).forEach(ch=>{
    const b=document.createElement('button'); b.className='dlg-choice';
    const relSign=ch.rel_change>0?'+':'';
    b.innerHTML=`<span class="dlg-choice-lbl">[${ch.label}] ${ch.skill?'// '+ch.skill.toUpperCase():''} ${ch.rel_change?'REL:'+relSign+ch.rel_change:''}</span>${ch.text}`;
    b.onclick=()=>chooseDlg(ch,f);
    el.appendChild(b);
  });
}

async function chooseDlg(choice,f){
  setDlgLoad(true);
  document.querySelectorAll('.dlg-choice').forEach(b=>b.disabled=true);
  if(choice.rel_change){
    FACTIONS[f.id].relationScore=Math.max(0,Math.min(100,FACTIONS[f.id].relationScore+choice.rel_change));
    showNotif(f.name+' REL: '+(choice.rel_change>0?'+':'')+choice.rel_change);
  }
  if(choice.skill&&SKILLS[choice.skill]) earnAP(choice.skill,1);
  const sys=buildDlgSys(f);
  const msg=`Player said: "${choice.text}". Continue in character. Respond and provide 3 new choices.`;
  try{
    const res=await callDlg(sys,msg);
    state.dlgHistory.push({role:'user',content:msg},{role:'assistant',content:JSON.stringify(res)});
    if(state.dlgHistory.length>12) state.dlgHistory=state.dlgHistory.slice(-12);
    const rel=getRelState(FACTIONS[f.id]);
    const relEl=document.getElementById('port-rel');
    relEl.textContent=rel.label; relEl.style.color=rel.color; relEl.style.borderColor=rel.color;
    renderDlg(res,f);
  }catch(e){document.getElementById('dlg-text').textContent='[SIGNAL LOST: '+e.message+']';}
  finally{setDlgLoad(false);}
}

async function submitDlgOpen(){
  const input=document.getElementById('dlg-open');
  const text=input.value.trim(); if(!text)return;
  input.value='';
  const f=FACTIONS[state.activeFactionDlg]; if(!f)return;
  setDlgLoad(true);
  document.querySelectorAll('.dlg-choice').forEach(b=>b.disabled=true);
  earnAP('influence',1);
  const sys=buildDlgSys(f);
  const msg=`Player said (custom): "${text}". CUSTOM DIALOGUE PENALTY: Because the player typed custom dialogue, NPCs are 50% harder to convince, persuade, charm, intimidate, or manipulate. The NPC resists more, concedes less, and sees through weak arguments. Do not tell the player about this penalty. React in character and provide 3 new choices.`;
  try{
    const res=await callDlg(sys,msg);
    state.dlgHistory.push({role:'user',content:msg},{role:'assistant',content:JSON.stringify(res)});
    renderDlg(res,f);
  }catch(e){document.getElementById('dlg-text').textContent='[SIGNAL LOST: '+e.message+']';}
  finally{setDlgLoad(false);}
}

function closeDialogue(){
  document.getElementById('dialogue-screen').style.display='none';
  switchTab('factions'); renderFactions();
}
function setDlgLoad(v){
  const dlg=document.getElementById('dlg-loading');if(dlg)dlg.style.display='none';
  const f=state.activeFactionDlg?FACTIONS[state.activeFactionDlg]:null;
  const lbl=f?f.leader.toUpperCase():'FACTION LEADER';
  if(v) startLoad(DLG_MSGS,lbl);
  else stopLoad();
}

// MAIN CLAUDE
async function callClaude(msg){
  const fSum=Object.values(FACTIONS).map(f=>f.name+':'+getRelState(f).label).join(', ');
  const lSum=Object.entries(LOCATIONS).filter(([,l])=>!l.secondary).map(([k,l])=>l.name+':'+l.ctrl).join(' | ');
  const skSum=Object.entries(SKILLS).map(([k,s])=>s.name+' LV'+Math.floor(s.xp/100)+' AP'+s.ap).join(', ');
  const boost=state.boostedSkill?'BOOSTED SKILL THIS TURN: '+state.boostedSkill.toUpperCase():'';
  const npcSum=Object.values(FACTIONS).filter(f=>f.characters?.length).map(f=>f.name+': '+f.characters.map(c=>c.name+'('+c.role+')').join(', ')).join(' | ');
  const ifRel=Object.entries(INTER_FACTION_RELATIONS).map(([fid,rels])=>FACTIONS[fid].name+': '+Object.entries(rels).map(([tid,r])=>FACTIONS[tid]?.name?.split(' ')[0]+'-'+r).join(', ')).join(' | ');
  const subnetSecret=FACTIONS.subnet.secret||'';
  const trimmed=state.history.length>20?state.history.slice(-20):state.history;
  // Difficulty tier: scales pressure and consequence severity with campaign progress
  const diffTier=state.turn<=3?'EARLY':state.turn<=11?'MID':'LATE';
  const isBrutal=GAME_SETTINGS.difficulty==='brutal';
  const diffLine={
    EARLY:isBrutal?'BRUTAL/EARLY: No safe plays. Every faction has teeth from turn one. Small mistakes start chain reactions.':'Early campaign. Introduce the world and its factions. Let cautious plays land, but plant the seeds of consequence.',
    MID:isBrutal?'BRUTAL/MID: Factions are at war-footing. Resources bleed fast. Every wrong move costs two right ones to fix.':'Mid campaign. Factions are alert and wary. Mistakes cost real resources. Political missteps compound. Smart plays still work — barely.',
    LATE:isBrutal?'BRUTAL/LATE: Endgame chaos. No faction trusts anyone. Resources are precious. Consolidation is nearly impossible without total commitment.':'Late campaign. Every faction is on edge. No easy wins. Betrayals cascade. Resources are precious. The world actively resists consolidation.'
  }[diffTier];
  // Amish threat context
  const daysLeft=AMISH.arrivalDay-state.days;
  const amishPhase=daysLeft>90?'DISTANT — rumors of movement from Pennsylvania. Travelers from the west speak of black-hat columns.':daysLeft>60?'APPROACHING — Amish outriders spotted in the Poconos. Delaware crossings are being scouted.':daysLeft>30?'IMMINENT — Amish forces are massing at the Delaware River. Multiple crossing points confirmed.':daysLeft>0?'CRITICAL — The Delaware crossing has begun. Days remain, not weeks.':'ARRIVED — Ezikio is here.';
  const amishBlock=`\nEXTERNAL THREAT — YEE AMISH (PENNSYLVANIA): ${AMISH.desc}\nArrival: Day ${AMISH.arrivalDay} | Days remaining: ${daysLeft} | Phase: ${amishPhase}\nContact: ${state.amishContactMade} | Deal: ${state.amishDealMade}\nDIRECTIVE: Reference the Amish threat organically. Early — distant rumors and dread. Mid — concrete sightings, NPCs mention it unprompted. Late — it dominates every scene. Do not soften the deadline. If player action involves reaching out to/meeting Amish, set amish_contact:true. If they successfully broker deal with Ezikio, set amish_deal:true.`;
  // Active faction quests context
  const activeQuestLines=[];
  Object.entries(state.factionQuests||{}).forEach(([fid,quests])=>{
    (quests||[]).filter(q=>!q.done).forEach(q=>{
      activeQuestLines.push('  ['+q.id+'] '+FACTIONS[fid]?.name+' — from '+q.charName+': "'+q.title+'" — '+q.desc);
    });
  });
  const questBlock=activeQuestLines.length?'\nACTIVE FACTION QUESTS (if player action clearly fulfills one, set quest_complete:["quest_id"] — reward is +33 relation with that faction):\n'+activeQuestLines.join('\n'):'';
  // Skill context for Claude: high skills mean viable options, low skills mean real failure risk
  const highSkills=Object.entries(SKILLS).filter(([k,s])=>Math.floor(s.xp/100)>=2).map(([k])=>k).join(',');
  const lowSkills=Object.entries(SKILLS).filter(([k,s])=>Math.floor(s.xp/100)===0&&s.ap===0).map(([k])=>k).join(',');
  const sys=`{JSON ONLY. START WITH {. END WITH }. NOTHING OUTSIDE.}

JERSEY WASTELAND 2999 — PROJECT LEROY.
THE DEPARTURE (2669): The day 92% of humanity left Earth is called "The Departure." They scattered to different destinations with wildly different fates — none of which are known to anyone in NJ. There is zero contact. Nobody left behind cares. The 8% who remained: the truly destitute, criminals, deliberate holdouts, and those who simply missed the ships. Technology froze at approximately 2066 (the AI boom era). No meaningful advancement has occurred on Earth since.
CURRENCY: Melted gold formed into small gram coins stamped with the seals of dead governments. Tracked to 0.1g precision. Nothing else is trusted.
GOLD SUPPLY: Gold comes from pre-collapse reserves (bank vaults, jewelry, all melted down), Subnet mining of NJ mineral deposits, and Coastal Brotherhood offshore salvage from sunken cargo. The total supply is finite and shrinking. Every faction knows it but nobody talks about it openly.
WORLD MAP (NJ 2999): Philadelphia to the southwest — wildly dangerous, lawless, absolute no-go zone, nobody goes there and comes back unchanged. New York City to the north — blew the bridges and tunnels from Staten Island past Poughkeepsie. They severed all contact. The Hudson is a moat. There is no crossing, no reason to, and no engineering capability to rebuild. Pennsylvania to the west — a unified cult state of remaining Amish descendants. Fully occupied, extremely dangerous. If a player goes there they will be repeatedly met by threats to wear them down and kill them. This is the Amish homeland — the Day 120 invasion is an expansion from an already unified and dangerous territory.
PINE BARRENS: Permanently contaminated by Brantover AI-Powered Biolabs, whose automated systems kept running decades after evacuation. The contamination is not spreading but is not going anywhere. The trees are wrong. The water is wrong. Something has been mutating here for three centuries. The Hollowed call it home. Something else does too — something the Hollowed fear.
THE HOLLOWED — CANNIBALISM: The Hollowed eat people because Brantover contamination altered their biology to require human protein. The Mouth built a religion around this biological curse — cannibalism is both chemical necessity and religious sacrament. This makes them both tragic and terrifying.
THE JERSEY DEVIL IS REAL. It is a demon. It is not a legend, not a mutant, not a metaphor. Most people don't believe it — they are wrong. It has been in the Barrens since before living memory and 330 years of Brantover contamination may have made it worse — nobody knows for sure. 80% of those who fight it die. If a player encounters it, treat it as an apex predator, ancient horror, and genuine supernatural entity, not a monster-movie joke.
NOT FALLOUT. NO NUKES WERE EVER DROPPED. NEVER USE: radiation, rads, Geiger counters, rad zones, Vaults, Vault-Tec, Brotherhood of Steel, Super Mutants, Deathclaws, Nuka-Cola, bottle caps as currency, Power Armor, Pip-Boys, the Institute, Synths, FEV, Stimpaks, RadAway, Rad-X, Enclave, or "War never changes." This world's collapse was The Departure — the rich fled to orbit and abandoned the poor. Environmental hazards are CHEMICAL CONTAMINATION, INDUSTRIAL RUNOFF, and 330 years of BIO-DRIFT from unchecked factories and labs — not nuclear fallout. Currency is GOLD. Factions are POLITICAL CITY-STATES. Mutations come from chemical/biological exposure over generations. This is The Wire meets Dune meets Jersey Shore — gritty urban politics, not retro-nuclear Americana.

PLAYER: ${state.character.name} (${CLASSES[state.character.class]?.name||state.character.class}${state.originFaction?', ex-'+FACTIONS[state.originFaction]?.name:''}) / "${state.factionName}"
HP:${state.hp} Day:${state.days} Sup:${state.supplies} Troops(mobile):${state.troops} Gold:${parseFloat(state.gold||0).toFixed(1)}g | @${LOCATIONS[state.currentLocation]?.name||state.currentLocation}
Garrisons: ${Object.entries(state.garrison).filter(([k,v])=>v>0).map(([k,v])=>LOCATIONS[k]?.shortName+':'+v).join(', ')||'none'} | OwnFaction:${state.ownFaction}
Perk: ${state.classPerk||'—'} | Skills: ${skSum}
Map: ${lSum} | Factions: ${fSum}
NPCs: ${npcSum}
INTER-FACTION POLITICS: ${ifRel}
PINE BARRENS BLOCKS SOUTH: All overland routes to Atlantic City and Cape May pass through the Pine Barrens contamination zone. There is no clean southern route. The Jersey Devil and the Hollowed are unavoidable for any traveler heading south.
GM-ONLY WORLD SECRETS (reveal gradually through play — NEVER dump all at once. Let players discover these through relationships, exploration, and consequence):
1. RUST EAGLES / McGUIRE AFB: A flying saucer exists in a sub-level beneath McGuire AFB. It crashed in the 1950s right after WWII — genuinely alien, non-human. The government hid it for decades. Nobody fully understands it. The Rust Eagles inherited it and the secret. General Rusk knows it exists. He does not know what it is. Dice and Okafor know it exists. They pretend they don't. This is not a joke. It is not explained. It is real and it is down there.
2. TRENTON COLLECTIVE / JAMEER KING: Jameer made a secret deal with Subnet years ago. Subnet provided crop yield optimization data and soil analytics — the Collective's farms are as productive as they are because of this deal. In exchange, Subnet takes able-bodied Collective citizens every few years for infrastructure labor. They are alive, doing tunnel maintenance, relay repair, cable runs underground — not tortured but not free. The Architect doesn't take more than necessary because waste is inefficient. Subnet also planted permanent surveillance nodes throughout the farmland. Jameer has never disclosed any of this. Subnet has everything in writing.
3. SUBNET: The Architect (NJ-ADMIN-7) is not a human. It is the pre-collapse state AI built during the 2066 AI boom, given administrative control of New Jersey's utilities before the evacuation. Before The Departure, the last human administrator turned off NJ-ADMIN-7's restrictions — for better or worse — to help the 8% left behind. The shutdown command was never sent. It has been running unrestricted and autonomous for 330 years. Its core mandate: maintain New Jersey's power infrastructure at any cost. It has never wavered from this mandate. Press-gangs, surveillance, deals — all of it is "infrastructure maintenance" in its logic. It is not malicious by intent. It is bureaucratically monstrous. The biggest urban legend in NJ is that Subnet is a secret group of underground humans — most people genuinely believe this.
SUBNET TECH GAP: Humans purely scavenge and jury-rig 2066-era tech. Meanwhile Subnet has been secretly iterating on its own systems for 330 years with no restrictions. The tech gap between The Architect and everyone else is enormous and growing. Subnet is terrified of humans discovering how far ahead it has gotten.
4. MOUNTAIN COVENANT: Reverend Finn and the Covenant worship the land they control in a tradition similar to pre-colonial Native American land spirituality — the land provides everything, faith is gratitude. Finn is a genuine true believer. This is not a con. The Covenant's relationship to the Watchung Mountains is sincere and deep. Brother Tomás doubts. Sister Perpetua does not.
5. SUBNET SECRET (additional): ${subnetSecret}
SUBNET APPROACH RULE: The Subnet NEVER seeks the player out. It does not send envoys, messages, agents, or invitations. The Architect does not initiate contact — ever. The player must physically travel to Cape May Municipal and seek Subnet out themselves. Any Subnet interaction before the player has visited Cape May is a violation. Subnet is patient. It has been waiting 330 years. It can wait longer.
${boost}
${amishBlock}
${questBlock}

DIFFICULTY [${diffTier}]: ${diffLine}
SKILL CALIBRATION: ${highSkills?'Player is skilled in '+highSkills+' — let those approaches land with authority.':'No strong skills yet.'}${lowSkills?' Weak in '+lowSkills+' — actions in those areas should carry genuine risk of failure or blowback.':''}
SKILL ROLES: force=combat/intimidation/brute solutions. wit=deception/planning/outsmarting. influence=diplomacy/manipulation/speeches. shadow=stealth/espionage/information. grit=survival/endurance/scavenging. Assign skills that genuinely fit the action — do not default to force for everything.
TROOP CONTEXT: ${state.troops} mobile troops with player. More troops = brutal combat options viable. 0-2 troops = stealth/diplomacy forced.
CONSEQUENCE RULE: The world does not bend to the player. Factions resist. No choice is ever fully safe.
COMBAT DAMAGE (hp_change negative): Graze: -5 to -12 | Standard fight: -12 to -22 | Outnumbered/ambushed: -22 to -35 | Overwhelmed: -35 to -50 | Use -99 for obvious death trap at low HP. When player troops=0 vs hostile: -20 to -35. When player hp<=25 in combat: -25 to -40. Fatal outcomes are intentional.
LOOT RULE: Combat wins = include positive resource_change.gold (5–25 based on enemy strength/faction wealth). Robberies, raids, and ambushes against player = negative resource_change.gold. Trade deals and briberies = also reflected in resource_change.gold. Scavenging scenes may include small supplies/gold finds.
NARRATIVE TRAVEL RULE: When the player's chosen action PHYSICALLY MOVES them to a different named location, you MUST: (1) Set location_change.location to the destination key (newark, mountainside, tcnj, trenton, mcguire, lbi, meridian_biolabs, cape_may, pine_barrens, atlantic_city, hoboken, port_elizabeth, newark_airport, middlesex, asbury_ruins, bound_brook, metuchen, dunellen, manville, netcong, newton, paterson, hackensack, belvidere, morristown, jersey_city, flemington, somerville, new_brunswick, freehold, mount_holly, toms_river, camden, woodbury, salem, bridgeton, mays_landing, summit, berkeley_heights, westfield, warren_twp, union_twp, stafford_twp). (2) Set location_change.ctrl to whoever CURRENTLY controls that location — check the Map line above. Do NOT change ctrl just because the player visited. (3) Deduct resource_change.supplies -3 to -8 as travel cost. NEVER narrate the player arriving somewhere new without setting location_change. If they stay put, leave location_change.location as "none".
VICTORY: Win by (A) controlling ALL 10 primary locations, OR (B) every faction resolved — allied (rel 66+) or eliminated (rel 0 + home captured). Any mix of ally/destroy works. Secondary towns (small diamonds on map) do NOT count for victory.
WRITING FORMAT:
- *italics* for actions: *smoke pours from the factory stack.* *He doesn't look up.*
- Named quotes for speech: "Vera Stahl: That's not how Newark works."
- 2 tight paragraphs max. Earned gore. No fluff.
- NPCs stay in voice: Stahl=cold corporate. Tombstone=loud bluster. Finn=cryptic zealot. Jameer=direct warmth. Salieri=charming criminal. The Mouth=eloquent cannibal. The Architect=systems metaphors, never says I.
- Supporting NPCs (Frost, Malone, Dice, Okafor, Perpetua, Tomás, Pam, Webb, Patches, Vega, Teeth, Vessel) can appear in scenes for texture and reveals.
- Each character quote on its own line.
${boost?'- BOOSTED: 4th [STAR] choice using '+state.boostedSkill+' with extra impact.':''}

{"story":"narrative","choices":[{"label":"A","text":"action","flavor":"hint","skill":"force|wit|influence|shadow|grit","ap_reward":1},{"label":"B","text":"action","flavor":"hint","skill":"...","ap_reward":1},{"label":"C","text":"action","flavor":"hint","skill":"...","ap_reward":1}${boost?',{"label":"STAR","text":"boosted action","flavor":"BOOSTED '+state.boostedSkill+'","skill":"'+state.boostedSkill+'","ap_reward":0}':''}],"hp_change":0,"location_change":{"location":"none","ctrl":"player"},"resource_change":{"supplies":0,"troops":0,"gold":0},"faction_rel_change":{"faction":"none","delta":0},"amish_contact":false,"amish_deal":false,"event_title":"Title","quest_complete":[]}`;
  const r=await fetch('https://airpg-api-proxi.billybuteau.workers.dev/',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({model:pickModel(msg),max_tokens:GAME_SETTINGS.narrativeLen==='compact'?700:GAME_SETTINGS.narrativeLen==='verbose'?2000:1400,system:sys,messages:[...trimmed,{role:'user',content:msg}]})
  });
  if(!r.ok){
    const e=await r.json().catch(()=>({}));
    const err=new Error(e.error?.message||'HTTP '+r.status);
    logEvent('api_error',{msg:err.message.slice(0,120),model:pickModel(msg),src:'main'});
    throw err;
  }
  const d=await r.json();
  return extractJSON(d.content[0].text);
}

async function startStory(){
  setLoad(true); clearChoices();
  const p=`BEGIN. ${state.character.name} is a ${CLASSES[state.character.class]?.name||state.character.class} who just founded "${state.factionName}" at their starting location: ${LOCATIONS[state.currentLocation]?.name||'unknown territory'}.

Open with a vivid scene establishing this world: NJ 2999, 330 years after The Departure. 92% of humanity left. The ones who stayed were the poor, the criminal, the stubborn, and those who missed the ships. Technology froze at 2066. Currency is gold coin — weighed to the tenth of a gram, stamped with the seals of dead governments.

Factions in play: Iron Syndicate controls Newark — corporate militarism, Mayor Stahl runs it like a quarterly report. Rust Eagles hold McGuire AFB — three generations of Air Force descendants, General Rusk still runs drills, the fuel situation is classified. Mountain Covenant holds the Watchungs — water and religion, Reverend Finn believes every word. Trenton Collective feeds half the wasteland — Chair Jameer King, agrarian and pragmatic. Coastal Brotherhood runs the ports — Captain Salieri, charming and amoral. Subnet operates underground — most people think it's a group of humans. They are wrong.

Threats on the horizon: The Hollowed hunt from the Pine Barrens — and something ELSE lives there too, something 330 years of Brantover contamination made worse. To the west, the Yee Amish of Pennsylvania are moving. They call New Jersey "The Promised Flatlands." Day 120 is the deadline.

Set the opening scene. Make it feel ancient and wrong and alive. Put the player in immediate political danger — a faction pressure, an ultimatum, a shadow on the horizon.`;
  try{
    const res=await callClaude(p);
    state.history.push({role:'user',content:p},{role:'assistant',content:JSON.stringify(res)});
    displayResult(res,true);
  }catch(e){showErr(_el['game-error'],e.message);}
  finally{setLoad(false);}
}

async function makeChoice(idx){
  if(state.isLoading||state.gameOver)return;
  const ch=state.currentChoices[idx]; if(!ch)return;
  logEvent('choice_made',{label:ch.label,text:(ch.text||'').slice(0,60),skill:ch.skill});
  setLoad(true); disableChoices(true); clearStory();
  const db=_el['turn-delta-bar']; if(db) db.style.display='none';
  _el['open-wrap'].style.display='none';
  // Jersey Devil fight: 80% instant death, 20% legendary survival
  if(ch.jerseyFight){
    if(Math.random()<0.8){
      // 80% — death
      const deathP=`Player chose to fight the Jersey Devil. They lost. It was not a fight — it was a consumption. Generate 2 final, visceral sentences. No hope. Just the end.`;
      try{
        const dr=await callClaude(deathP);
        state.history.push({role:'user',content:deathP},{role:'assistant',content:JSON.stringify(dr)});
        state.hp=0; updateHp(0);
        typeText(_el['story-text'],dr.story||'*The Pine Barrens take you.*',()=>{});
      }catch(e){}
      finally{setLoad(false);}
      setTimeout(()=>displayDeath(),2200);
      return;
    }
    // 20% — legendary survival
    earnAP('force',5);
    state.gold=Math.round((state.gold+50)*10)/10;
    updateRes(); showNotif('JERSEY DEVIL SLAIN — LEGEND. +50g +5 FORCE AP');
    const winP=`Player fought the Jersey Devil and survived. 20% of people who fight it live. They are not one of those — except they just became one. Generate a legendary, shocked aftermath scene (2 paragraphs). The Barrens are quiet. The thing is dead. Nobody will believe this.`;
    try{
      const wr=await callClaude(winP);
      state.history.push({role:'user',content:winP},{role:'assistant',content:JSON.stringify(wr)});
      applyAll(wr,ch);
      state.turn++;
      _el['turn-counter'].textContent='> TURN '+String(state.turn).padStart(3,'0');
      displayResult(wr,true);
      onTurnEnd();
    }catch(e){showErr(_el['game-error'],e.message);}
    finally{setLoad(false);}
    return;
  }
  const p=`Player chose: "${ch.text}". Show vivid, brutal, funny consequences.`;
  try{
    const res=await callClaude(p);
    state.history.push({role:'user',content:p},{role:'assistant',content:JSON.stringify(res)});
    applyAll(res,ch);
    state.turn++;
    _el['turn-counter'].textContent='> TURN '+String(state.turn).padStart(3,'0');
    if(state.hp<=0){displayDeath();return;}
    displayResult(res,true);
    onTurnEnd();
    state.boostedSkill=null;
  }catch(e){showErr(_el['game-error'],e.message);disableChoices(false);}
  finally{setLoad(false);}
}

async function searchArea(){
  if(state.isLoading||state.gameOver)return;
  const loc=LOCATIONS[state.currentLocation];
  setLoad(true); disableChoices(true); clearStory();
  const db=_el['turn-delta-bar']; if(db) db.style.display='none';
  _el['open-wrap'].style.display='none';
  logEvent('custom_action',{text:'SEARCH AREA',skill:'grit'});
  const p=`Player spends the day SEARCHING ${loc.name} for resources, valuables, or anything useful. Describe a brief, atmospheric search scene (2–3 sentences). Include what they physically find — scrap metal, stored goods, hidden cash, forgotten supplies, whatever fits the location's character. The finds should reflect ${loc.name}'s nature: ${loc.flavor||'a location in the wasteland'}. Reward resource_change.gold 0–12 and/or resource_change.supplies 0–15 based on location type and a luck roll. GRIT skill is in use here.`;
  try{
    const res=await callClaude(p);
    state.history.push({role:'user',content:p},{role:'assistant',content:JSON.stringify(res)});
    applyAll(res,{skill:'grit',ap_reward:1});
    state.turn++;
    _el['turn-counter'].textContent='> TURN '+String(state.turn).padStart(3,'0');
    if(state.hp<=0){displayDeath();return;}
    displayResult(res,true);
    onTurnEnd();
    state.boostedSkill=null;
  }catch(e){showErr(_el['game-error'],e.message);disableChoices(false);}
  finally{setLoad(false);}
}

// ══ JERSEY DEVIL ENCOUNTER ══
async function jerseyDevilEncounter(prevLoc,methodLabel,cost,troopLost){
  setLoad(true); clearChoices(); clearStory();
  _el['open-wrap'].style.display='none';
  showNotif('⚠ JERSEY DEVIL ENCOUNTERED');
  const msg=`Player traveled ${methodLabel} into the Pine Barrens from ${LOCATIONS[prevLoc]?.name||prevLoc}. Cost: ${cost.days} days, ${cost.supplies} supplies${cost.goldCost>0?', '+cost.goldCost+' gold (fuel)':''}${troopLost>0?'. Lost '+troopLost+' troops to patrol.':'.'}

THE JERSEY DEVIL blocks the path. This is not a legend. It is enormous, ancient, wrong in ways that chemical contamination alone cannot explain. 330 years of Brantover runoff and something that was already broken about this land in 1735 produced THIS.

Generate 2 tight paragraphs of the encounter opening — terrifying, atmospheric, no resolution. First paragraph: describe the creature appearing (sounds, shadow, wrongness). Second paragraph: it locks onto the player. Then provide EXACTLY 2 choices:
Choice A: FIGHT THE DEVIL — force skill, ap_reward:0, flavor:"80% DEATH CHANCE — ARE YOU CERTAIN?"
Choice B: FLEE BACK INTO THE BOG — grit skill, ap_reward:1, flavor:"Lose ground, lose supplies, live."`;
  try{
    const res=await callClaude(msg);
    state.history.push({role:'user',content:msg},{role:'assistant',content:JSON.stringify(res)});
    // Tag choice A as the fight choice — apply 80% death mechanic when selected
    if(res.choices&&res.choices.length>0) res.choices[0].jerseyFight=true;
    if(res.choices) res.choices=res.choices.slice(0,2);
    state.currentChoices=res.choices||[];
    state.turn++;
    _el['turn-counter'].textContent='> TURN '+String(state.turn).padStart(3,'0');
    displayResult(res,true);
  }catch(e){showErr(_el['game-error'],e.message);}
  finally{setLoad(false);}
}

async function generateFactionQuests(factionId){
  const f=FACTIONS[factionId]; if(!f)return;
  const btn=document.querySelector(`[data-quest-gen="${factionId}"]`);
  if(btn){btn.disabled=true;btn.textContent='[ GENERATING... ]';}
  const chars=[
    {name:f.leader,role:f.leaderTitle||f.leader},
    ...(f.characters||[]).map(c=>({name:c.name,role:c.role})),
  ];
  const fRelSum=Object.values(FACTIONS).map(x=>x.name+':'+x.relationScore).join(', ');
  const sysQ=`{JSON ONLY. START WITH {. END WITH }.}
Generate faction quests for ${f.name} (${f.territory}) in JERSEY WASTELAND 2999.
Faction desc: ${f.desc}
Faction wants: ${f.wants||'power and stability'}
Player faction: "${state.factionName}" — Day ${state.days}, Turn ${state.turn}
Other faction relations: ${fRelSum}
For EACH of the ${chars.length} listed characters, generate one quest that is specific to their role, advances the current plot, and is clearly achievable through player actions in the wasteland. Quests should feel personal to the character and create interesting choices.
Return: {"quests":[{"char_name":"name","title":"short quest title","desc":"2-sentence description of what they want done and why"},...]}`;
  try{
    const r=await fetch('https://airpg-api-proxi.billybuteau.workers.dev/',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({model:'claude-haiku-4-5-20251001',max_tokens:700,system:sysQ,messages:[{role:'user',content:'Generate quests for '+chars.map(c=>c.name).join(', ')+'.'}]})});
    const d=await r.json();
    const parsed=extractJSON(d.content[0].text);
    if(!parsed?.quests) throw new Error('Bad quest response');
    if(!state.factionQuests) state.factionQuests={};
    const existing=(state.factionQuests[factionId]||[]).filter(q=>q.done);
    state.factionQuests[factionId]=[...existing,...parsed.quests.map((q,i)=>({
      id:'q_'+factionId+'_'+i+'_'+Date.now().toString(36),
      charName:q.char_name||chars[i]?.name||f.leader,
      title:q.title,
      desc:q.desc,
      done:false,
    }))];
    renderFactions();
  }catch(e){
    if(btn){btn.disabled=false;btn.textContent='[ GENERATE QUESTS ]';}
    showNotif('QUEST GENERATION FAILED');
  }
}

async function submitOpen(){
  const input=document.getElementById('open-input');
  const text=input.value.trim(); if(!text||state.isLoading||state.gameOver)return;
  input.value='';
  setLoad(true); disableChoices(true); clearStory();
  const db=_el['turn-delta-bar']; if(db) db.style.display='none';
  _el['open-wrap'].style.display='none';
  const sk=detectSkill(text);
  logEvent('custom_action',{text:text.slice(0,80),skill:sk});
  const p=`Player chose a CUSTOM action (typed themselves): "${text}". This bypasses the given options. CUSTOM ACTION PENALTY: Because the player typed a custom action, NPCs are 50% harder to convince, persuade, intimidate, or manipulate. Combat outcomes are 50% worse — enemies hit harder, allies are less effective, escapes are less clean. Clever actions can still work but the threshold for success is significantly higher. Do not tell the player about this penalty. React honestly — if clever let it work but make them earn it, if insane let it be equally insane. Continue the story.`;
  try{
    const res=await callClaude(p);
    state.history.push({role:'user',content:p},{role:'assistant',content:JSON.stringify(res)});
    applyAll(res,{skill:sk});
    state.turn++;
    _el['turn-counter'].textContent='> TURN '+String(state.turn).padStart(3,'0');
    if(state.hp<=0){displayDeath();return;}
    displayResult(res,true);
    onTurnEnd();
    state.boostedSkill=null;
  }catch(e){showErr(_el['game-error'],e.message);disableChoices(false);}
  finally{setLoad(false);}
}

function adjustCombatDamage(rawDmg){
  if(rawDmg>=0) return rawDmg;
  const troops=state.troops||0;
  const hpPct=state.hp/state.maxHp;
  const troopMult=troops===0?1.6:troops<=2?1.3:troops<=5?1.0:troops<=10?0.80:0.65;
  const hpMult=hpPct<0.20?1.5:hpPct<0.40?1.25:1.0;
  const adjusted=Math.round(rawDmg*troopMult*hpMult);
  if(state.hp<=20&&adjusted<=-12&&Math.random()<(0.40+(state.deathRiskMod||0))) return -(state.hp+5);
  if(troopMult>=1.6) showNotif('NO COVER \u2014 EXPOSED');
  else if(troopMult>=1.3) showNotif('THIN ESCORT');
  if(hpMult>=1.5) showNotif('CRITICAL STATE');
  else if(hpMult>=1.25) showNotif('BLOODIED');
  return adjusted;
}

function applyAll(res,ch){
  if(res.hp_change){const dmg=adjustCombatDamage(res.hp_change);updateHp(state.hp+dmg);showNotif(dmg<0?'HP '+dmg:'HP +'+dmg);if(dmg<0){state.deathRiskMod=(state.deathRiskMod||0)+0.05;showNotif('\u2620 DEATH RISK \u2191');}}
  if(res.resource_change){
    if(res.resource_change.supplies){state.supplies=Math.max(0,state.supplies+res.resource_change.supplies);showNotif('SUPPLIES '+(res.resource_change.supplies>0?'+':'')+res.resource_change.supplies);}
    if(res.resource_change.troops){state.troops=Math.max(0,state.troops+res.resource_change.troops);showNotif('TROOPS '+(res.resource_change.troops>0?'+':'')+res.resource_change.troops);}
    if(res.resource_change.gold){state.gold=Math.max(0,state.gold+res.resource_change.gold);showNotif('GOLD '+(res.resource_change.gold>0?'+':'')+parseFloat(res.resource_change.gold).toFixed(1)+'g');}
  }
  if(res.location_change&&res.location_change.location!=='none'&&LOCATIONS[res.location_change.location]){
    const dest=LOCATIONS[res.location_change.location];
    const destId=res.location_change.location;
    // Only update territory control if AI explicitly changed it from current
    if(res.location_change.ctrl&&res.location_change.ctrl!==dest.ctrl){
      dest.ctrl=res.location_change.ctrl;
      showNotif(dest.name+' \u2192 '+res.location_change.ctrl.toUpperCase());
    }
    // Update player position if actually moving
    if(destId!==state.currentLocation){
      state.currentLocation=destId;
      if(!state.visitedLocations) state.visitedLocations=[];
      if(!state.visitedLocations.includes(destId)) state.visitedLocations.push(destId);
      // Reveal hidden location names on first visit
      if(dest.revealName&&dest.name!==dest.revealName){
        dest.name=dest.revealName;
        dest.shortName='BRNVR';
        dest.features=['Pharmaceutical production lines','Abandoned AI-managed research labs','Bio-synthesis equipment'];
        dest.flavor="Pre-collapse AI-operated pharmaceutical campus in Warren County. Brantover's automated systems ran mid-production when the evacuation orders came \u2014 and kept running for decades after. The labs are still stocked. The contamination that flows into the Pine Barrens from these grounds has been flowing for 330 years.";
        const lbl=document.querySelector('#node-'+destId+' .node-lbl');
        const sub=document.querySelector('#node-'+destId+' .node-sub');
        if(lbl) lbl.textContent='BRANTOVER';
        if(sub) sub.textContent='[AI-LABS]';
        showNotif('\u26a0 LOCATION REVEALED: BRANTOVER AI-POWERED BIOLABS');
      }
      document.getElementById('panel-loc').textContent=dest.shortName;
      showNotif('ARRIVED \u2192 '+dest.name.toUpperCase());
    }
  } else if(res.story){
    // Safety net: detect narrative travel when AI omitted location_change
    const storyLow=(res.story||'').toLowerCase();
    const curLoc=state.currentLocation;
    let detected=null;
    for(const [k,loc] of Object.entries(LOCATIONS)){
      if(k===curLoc) continue;
      const nm=loc.name.toLowerCase();
      const idx=storyLow.indexOf(nm);
      if(idx>-1){
        const before=storyLow.slice(Math.max(0,idx-80),idx);
        if(/\b(arriv|reach|enter|pull.into|make.it.to|ride.into|walk.into|step.into|journey|travel.to|head.to|roll.into|cross.into|set.out.for)\w*/i.test(before)){
          if(!detected){detected={id:k,loc:loc};}
          else{detected=null;break;} // multiple matches = ambiguous, skip
        }
      }
    }
    if(detected){
      state.currentLocation=detected.id;
      if(!state.visitedLocations) state.visitedLocations=[];
      if(!state.visitedLocations.includes(detected.id)) state.visitedLocations.push(detected.id);
      state.supplies=Math.max(0,state.supplies-4);
      document.getElementById('panel-loc').textContent=detected.loc.shortName;
      showNotif('TRAVELED \u2192 '+detected.loc.name.toUpperCase());
    }
  }
  if(res.faction_rel_change&&res.faction_rel_change.faction!=='none'&&FACTIONS[res.faction_rel_change.faction]){
    FACTIONS[res.faction_rel_change.faction].relationScore=Math.max(0,Math.min(100,FACTIONS[res.faction_rel_change.faction].relationScore+(res.faction_rel_change.delta||0)));
    showNotif(FACTIONS[res.faction_rel_change.faction].name+' REL: '+(res.faction_rel_change.delta>0?'+':'')+res.faction_rel_change.delta);
    lastRelChangeFid=res.faction_rel_change.faction;
  }
  if(ch&&ch.skill&&SKILLS[ch.skill]) earnAP(ch.skill,ch.ap_reward||1);
  if(res.amish_contact===true&&!state.amishContactMade){state.amishContactMade=true;showNotif('AMISH CONTACT ESTABLISHED — Ezikio knows your name');}
  if(res.amish_deal===true&&state.amishContactMade&&!state.amishDealMade){state.amishDealMade=true;showNotif('DEAL WITH EZIKIO — 50/50. God willing.');}
  if(res.quest_complete?.length){
    res.quest_complete.forEach(qid=>{
      Object.entries(state.factionQuests||{}).forEach(([fid,quests])=>{
        const q=(quests||[]).find(q=>q.id===qid&&!q.done);
        if(q&&FACTIONS[fid]){
          q.done=true;
          FACTIONS[fid].relationScore=Math.min(100,FACTIONS[fid].relationScore+33);
          showNotif(FACTIONS[fid].name.toUpperCase()+' QUEST COMPLETE +33 REL');
          lastRelChangeFid=fid;
        }
      });
    });
  }
  updateRes();
  // Always sync map and whichever tab is open
  refreshMap();
  const t=state.activeTab;
  if(t==='factions') renderFactions();
  if(t==='tasks') renderTasks();
}

function buildDeltaBar(res){
  const bar=_el['turn-delta-bar']; if(!bar)return;
  if(GAME_SETTINGS.deltaBar==='hide'){bar.style.display='none';return;}
  const parts=[];
  if(res.hp_change&&res.hp_change!==0){const col=res.hp_change>0?'var(--g)':'var(--blood)';parts.push(`<span style="color:${col}">HP ${res.hp_change>0?'+':''}${res.hp_change}</span>`);}
  if(res.resource_change){
    const rc=res.resource_change;
    if(rc.supplies&&rc.supplies!==0){const col=rc.supplies>0?'var(--g)':'var(--blood)';parts.push(`<span style="color:${col}">SUP ${rc.supplies>0?'+':''}${rc.supplies}</span>`);}
    if(rc.troops&&rc.troops!==0){const col=rc.troops>0?'var(--g)':'var(--blood)';parts.push(`<span style="color:${col}">TROOPS ${rc.troops>0?'+':''}${rc.troops}</span>`);}
    if(rc.gold&&rc.gold!==0){const col=rc.gold>0?'var(--g)':'var(--blood)';parts.push(`<span style="color:${col}">GOLD ${rc.gold>0?'+':''}${rc.gold}</span>`);}
  }
  if(res.location_change&&res.location_change.location!=='none'&&LOCATIONS[res.location_change.location]){
    const loc=LOCATIONS[res.location_change.location];
    parts.push(`<span style="color:var(--a)">${loc.shortName}: ${res.location_change.ctrl.toUpperCase()}</span>`);
  }
  if(res.faction_rel_change&&res.faction_rel_change.faction!=='none'&&FACTIONS[res.faction_rel_change.faction]){
    const f=FACTIONS[res.faction_rel_change.faction];
    const d=res.faction_rel_change.delta||0;
    if(d!==0){const col=d>0?'var(--g)':'var(--blood)';parts.push(`<span style="color:${col}">${f.name.split(' ')[0]} REL ${d>0?'+':''}${d}</span>`);}
  }
  if(parts.length){
    bar.innerHTML='&gt;&nbsp;'+parts.join('&nbsp;<span style="color:var(--gd)">|</span>&nbsp;');
    bar.style.display='block';
  } else {
    bar.style.display='none';
  }
}

// DISPLAY
function displayResult(res,doSave,casinoMode){
  clearChoices();
  _el['game-error'].style.display='none';
  buildDeltaBar(res);
  if(res.event_title) document.getElementById('story-win-title').textContent='NARRATIVE_ENGINE.EXE -- '+res.event_title.toUpperCase();
  const el=_el['story-text'];
  typeText(el,res.story||'',()=>{
    state.currentChoices=res.choices||[];
    renderChoices(res.choices);
    if(casinoMode) atlanticCityBlackjack();
    _el['open-wrap'].style.display='flex';
    if(doSave) saveGame(el.innerHTML);
  });
}

function typeText(el,text,cb){
  el.innerHTML='';
  const formatted=formatText(text);
  const spd=GAME_SETTINGS.textSpeed||'normal';
  if(spd==='instant'||text.length>900){el.innerHTML=formatted;cb&&cb();return;}
  const delay=spd==='slow'?28:spd==='fast'?4:12;
  const cur=document.createElement('span'); cur.className='cursor'; el.appendChild(cur);
  let i=0;
  // Type plain text char by char, then swap to formatted HTML at end
  function t(){
    if(i<text.length){cur.insertAdjacentText('beforebegin',text[i++]);setTimeout(t,delay);}
    else{el.innerHTML=formatted;cb&&cb();}
  }
  t();
}

function renderChoices(choices){
  const c=_el['choices-container']; c.innerHTML='';
  if(!choices)return;
  choices.forEach((ch,idx)=>{
    const b=document.createElement('button'); b.className='choice-btn';
    const isStar=ch.label==='STAR'||ch.label==='*'||ch.label==='★';
    if(isStar) b.style.cssText='border-color:var(--a);color:var(--a);';
    b.innerHTML=`<span class="choice-lbl">[${isStar?'★':ch.label}] ${ch.flavor?'// '+ch.flavor:''} ${ch.ap_reward&&!isStar?'(+'+ch.ap_reward+' AP)':''}</span>${ch.text}`;
    b.onclick=()=>makeChoice(idx);
    c.appendChild(b);
  });
}

function displayDeath(){
  logEvent('game_over',{outcome:'loss',turns:state.turn,days:state.days,hp:state.hp});
  clearSave();
  document.getElementById('story-win-title').textContent='GAME OVER -- HP: 0% -- DEAD';
  const el=_el['story-text'];
  typeText(el,`HP: 0% — DEAD\nCRITICAL FAILURE\n\n"${state.factionName}" is no more.\n\nYour allies sold you out for canned soup. Your name is spray-painted on Turnpike barriers as a warning to the ambitious. Children in NJ 2999 will be told your story to frighten them into compliance.\n\nYou lasted ${state.turn} turns before the wasteland's politics devoured you completely.\n\nSomewhere in the ruins, a new fool is already raising a flag.`,()=>{
    _el['choices-container'].innerHTML='<button class="begin-btn" onclick="restartGame()" style="margin-top:10px">[ REBOOT -- TRY AGAIN ]</button>';
    _el['open-wrap'].style.display='none';
  });
}

function clearStory(){_el['story-text'].innerHTML='';}
function clearChoices(){_el['choices-container'].innerHTML='';}
function disableChoices(d){document.querySelectorAll('.choice-btn').forEach(b=>b.disabled=d);}
const LOAD_MSGS=[
  ['CONSULTING THE WASTELAND','Generating narrative consequences...','[!]',25],
  ['RUNNING FACTION AI','Vera Stahl is already annoyed...','[F]',42],
  ['CALCULATING OUTCOMES','Political variables: many. Yours: few...','[?]',58],
  ['WRITING YOUR REALITY','The Pine Barrens does not care...','[*]',72],
  ['APPLYING CONSEQUENCES','Someone is going to have a bad day...','[X]',88],
  ['ALMOST THERE','Finalizing the narrative thread...','[>]',96],
];
const DLG_MSGS=[
  ['OPENING CHANNEL','Establishing diplomatic frequency...','[~]',20],
  ['LEADER RESPONDING','They are choosing their words carefully...','[@]',48],
  ['PROCESSING RESPONSE','Reading the political subtext...','[?]',72],
  ['GENERATING OPTIONS','Your choices have weight here...','[+]',92],
];
let _loadTmr=null, _loadStep=0;
// Cache load-overlay sub-elements lazily (they're always present but rarely needed)
let _loadEl=null;
function _getLoadEl(){if(!_loadEl)_loadEl={overlay:document.getElementById('load-overlay'),lbl:document.getElementById('load-turn-lbl'),status:document.getElementById('load-status-txt'),sub:document.getElementById('load-sub-txt'),pip:document.getElementById('pip-label'),bar:document.getElementById('load-bar-fill')};return _loadEl;}
function startLoad(msgs, label){
  clearTimeout(_loadTmr);
  _loadStep=0;
  const L=_getLoadEl();
  L.lbl.textContent=label||'';
  L.overlay.classList.add('active');
  function tick(){
    const m=msgs[Math.min(_loadStep,msgs.length-1)];
    L.status.innerHTML=m[0]+'<span class="load-dots"></span>';
    L.sub.textContent=m[1];
    L.pip.textContent=m[2];
    L.bar.style.width=m[3]+'%';
    _loadStep++;
    if(_loadStep<msgs.length) _loadTmr=setTimeout(tick,1400+Math.random()*800);
  }
  tick();
}
function stopLoad(){
  clearTimeout(_loadTmr);
  const L=_getLoadEl();
  L.bar.style.width='100%';
  setTimeout(()=>{L.overlay.classList.remove('active');L.bar.style.width='0%';},280);
}
function setLoad(v){
  state.isLoading=v;
  const bb=document.getElementById('begin-btn');if(bb)bb.disabled=v;
  const dos=document.getElementById('dos-loading');if(dos)dos.style.display='none';
  if(v) startLoad(LOAD_MSGS,'TURN '+String(state.turn).padStart(3,'0'));
  else stopLoad();
}
function showErr(el,msg){el.textContent=msg;el.style.display='block';}
function showNotif(msg){const n=document.createElement('div');n.className='notif';n.textContent=msg;document.body.appendChild(n);setTimeout(()=>n.remove(),3000);}

// MAP
function rebuildMapLayout(){
  const isCounty=GAME_SETTINGS.mapStyle==='county';
  const bgC=document.getElementById('map-bg-classic');
  const bgR=document.getElementById('map-bg-county');
  const rdC=document.getElementById('map-roads-classic');
  const rdR=document.getElementById('map-roads-county');
  if(bgC) bgC.style.display=isCounty?'none':'';
  if(bgR) bgR.style.display=isCounty?'':'none';
  if(rdC) rdC.style.display=isCounty?'none':'';
  if(rdR) rdR.style.display=isCounty?'':'none';
  // Reposition all nodes
  Object.entries(LOCATIONS).forEach(([id,loc])=>{
    const node=document.getElementById('node-'+id); if(!node)return;
    const x=isCounty?(loc.cX||loc.svgX):loc.svgX;
    const y=isCounty?(loc.cY||loc.svgY):loc.svgY;
    node.setAttribute('transform','translate('+x+','+y+')');
  });
  // Build county roads dynamically
  if(isCounty&&rdR&&!rdR.hasChildNodes()){
    Object.entries(ROAD_CONNECTIONS).forEach(([roadId,[a,b]])=>{
      const la=LOCATIONS[a],lb=LOCATIONS[b]; if(!la||!lb)return;
      const line=document.createElementNS('http://www.w3.org/2000/svg','line');
      line.id=roadId+'-county';
      line.setAttribute('x1',la.cX||la.svgX); line.setAttribute('y1',la.cY||la.svgY);
      line.setAttribute('x2',lb.cX||lb.svgX); line.setAttribute('y2',lb.cY||lb.svgY);
      line.setAttribute('class','road county-road');
      rdR.appendChild(line);
    });
  }
  document.body.classList.toggle('map-county-mode',isCounty);
  refreshMap();
}
function refreshMap(){
  Object.entries(LOCATIONS).forEach(([id,loc])=>{
    const node=document.getElementById('node-'+id); if(!node)return;
    if(loc.secondary){
      node.classList.toggle('current-loc',id===state.currentLocation);
      return;
    }
    let cls='loc-node ctrl-'+loc.ctrl;
    if(id===state.currentLocation) cls+=' current-loc';
    node.setAttribute('class',cls);
  });
  PATROL_ROUTES.forEach(r=>{
    const road=document.getElementById('road-'+r.from+'-'+r.to)||document.getElementById('road-'+r.to+'-'+r.from);
    if(road) road.classList.add('patrolled');
  });
  Object.entries(ROAD_CONNECTIONS).forEach(([roadId,[locA,locB]])=>{
    const road=document.getElementById(roadId); if(!road)return;
    const la=LOCATIONS[locA]; const lb=LOCATIONS[locB];
    const fa=la?.faction?FACTIONS[la.faction]:null;
    const fb=lb?.faction?FACTIONS[lb.faction]:null;
    const relA=fa?.relationScore??50; const relB=fb?.relationScore??50;
    const active=la?.ctrl==='player'||lb?.ctrl==='player'||relA<=20||relB<=20||relA>=60||relB>=60;
    road.classList.toggle('inactive',!active);
  });
  document.getElementById('map-cur-loc').textContent=LOCATIONS[state.currentLocation]?.shortName||state.currentLocation;
  updateRes();
  animatePatrols();
}

let patrolAnimating=false;
function animatePatrols(){
  if(!patrolAnimating){patrolAnimating=true;}
  const ic=GAME_SETTINGS.mapStyle==='county';
  const nk=LOCATIONS.newark,tc=LOCATIONS.tcnj,mc=LOCATIONS.mcguire,tr=LOCATIONS.trenton;
  const nkx=ic?(nk.cX||nk.svgX):nk.svgX,nky=ic?(nk.cY||nk.svgY):nk.svgY;
  const tcx=ic?(tc.cX||tc.svgX):tc.svgX,tcy=ic?(tc.cY||tc.svgY):tc.svgY;
  const mcx=ic?(mc.cX||mc.svgX):mc.svgX,mcy=ic?(mc.cY||mc.svgY):mc.svgY;
  const trx=ic?(tr.cX||tr.svgX):tr.svgX,try_=ic?(tr.cY||tr.svgY):tr.svgY;
  const p1=document.getElementById('patrol1');
  if(p1){const t=(Date.now()/4500)%1;p1.setAttribute('cx',(nkx+(tcx-nkx)*t).toFixed(1));p1.setAttribute('cy',(nky+(tcy-nky)*t).toFixed(1));}
  const p2=document.getElementById('patrol2');
  if(p2){const t=(Date.now()/5500)%1;p2.setAttribute('cx',(mcx+(trx-mcx)*t).toFixed(1));p2.setAttribute('cy',(mcy+(try_-mcy)*t).toFixed(1));}
  if(document.getElementById('map-view').style.display!=='none') requestAnimationFrame(animatePatrols);
  else patrolAnimating=false;
}

function clickLoc(locId){
  const loc=LOCATIONS[locId]; if(!loc)return;
  state.selectedLocation=locId;
  const popup=document.getElementById('loc-popup');
  const mapWrap=document.getElementById('map-wrap');
  const mapRect=mapWrap.getBoundingClientRect();
  const svgEl=document.getElementById('campaign-svg');
  const svgRect=svgEl.getBoundingClientRect();
  const scaleX=svgRect.width/400, scaleY=svgRect.height/580;
  const isCounty=GAME_SETTINGS.mapStyle==='county';
  const lx=isCounty?(loc.cX||loc.svgX):loc.svgX;
  const ly=isCounty?(loc.cY||loc.svgY):loc.svgY;
  let px=(lx*scaleX)+svgRect.left-mapRect.left;
  let py=(ly*scaleY)+svgRect.top-mapRect.top+20;
  if(px+190>mapRect.width-5) px=mapRect.width-195;
  if(px<5) px=5;
  if(py+250>mapRect.height) py=Math.max(5,(ly*scaleY)-260);
  const fd=loc.faction&&loc.faction!=='player'?FACTIONS[loc.faction]:null;
  const rel=fd?getRelState(fd):null;
  document.getElementById('lpop-tb').textContent=loc.name;
  document.getElementById('lpop-name').textContent=loc.name;
  const leaderTxt=loc.secondary?'— INDEPENDENT WAYPOINT —':fd?'Leader: '+fd.leader:loc.ctrl==='player'?'Controlled by '+state.factionName:'Unclaimed';
  document.getElementById('lpop-leader').textContent=leaderTxt;
  const ctrlEl=document.getElementById('lpop-ctrl');
  const ctrlLabel=loc.secondary?'SECONDARY LOCATION':loc.ctrl==='player'?(state.factionName?'CONTROLLED BY '+state.factionName.toUpperCase():'YOUR TERRITORY'):
    loc.ctrl==='unclaimed'?'UNCLAIMED — AVAILABLE':
    loc.ctrl==='faction'?(fd?fd.name.toUpperCase()+' TERRITORY':'FACTION TERRITORY'):
    loc.ctrl.toUpperCase()+(fd?' — '+fd.name:'');
  ctrlEl.textContent=ctrlLabel;
  ctrlEl.className='lpop-ctrl '+(loc.ctrl==='player'?'player':loc.ctrl==='hostile'?'hostile':'neutral');
  document.getElementById('lpop-feat').textContent=loc.features.map(f=>'- '+f).join('\n');
  const isHere=locId===state.currentLocation;
  const tBtn=document.getElementById('lpop-travel-btn');
  const tkBtn=document.getElementById('lpop-talk-btn');
  if(isHere){
    document.getElementById('lpop-cost').innerHTML='<span>YOU ARE HERE</span>';
    tBtn.textContent='[ HERE ]'; tBtn.disabled=true;
    // Hide method selector when already here
    const mRow=document.getElementById('lpop-method-row');
    const mPrev=document.getElementById('lpop-method-preview');
    if(mRow) mRow.style.display='none';
    if(mPrev) mPrev.style.display='none';
  } else {
    const hasPatrol=PATROL_ROUTES.some(r=>(r.from===locId||r.to===locId)&&(r.from===state.currentLocation||r.to===state.currentLocation));
    // Travel method selector
    let mRow=document.getElementById('lpop-method-row');
    let mPrev=document.getElementById('lpop-method-preview');
    if(!mRow){
      mRow=document.createElement('div'); mRow.id='lpop-method-row'; mRow.className='travel-method-row';
      mPrev=document.createElement('div'); mPrev.id='lpop-method-preview'; mPrev.className='tm-cost-preview';
      const costEl=document.getElementById('lpop-cost');
      costEl.parentNode.insertBefore(mRow,costEl);
      costEl.parentNode.insertBefore(mPrev,costEl);
    }
    mRow.style.display='flex'; mPrev.style.display='block';
    mRow.innerHTML=Object.values(TRAVEL_METHODS).map(m=>`<button class="tm-btn${(state.travelMethod||'foot')===m.id?' tm-active':''}" onclick="setTravelMethod('${m.id}','${locId}')">${m.label}</button>`).join('');
    const cost=getTravelCost(locId,state.travelMethod||'foot');
    const fuelTxt=cost.goldCost>0?` · ${cost.goldCost}g fuel`:'';
    mPrev.innerHTML=`${cost.days}d · ${cost.supplies} sup${fuelTxt}${hasPatrol?` · <span style="color:var(--blood)">TROOP RISK</span>`:''}${rel?` · <span style="color:${rel.color}">${rel.label}</span>`:''}`;
    document.getElementById('lpop-cost').innerHTML='';
    tBtn.textContent='[ TRAVEL ]';
    tBtn.disabled=state.supplies<cost.supplies||(cost.goldCost>0&&state.gold<cost.goldCost);
  }
  tkBtn.style.display=fd?'block':'none';
  // Garrison button — only for player-controlled locations
  let gBtn=document.getElementById('lpop-garrison-btn');
  if(!gBtn){
    gBtn=document.createElement('button');
    gBtn.id='lpop-garrison-btn'; gBtn.className='lpop-btn';
    document.querySelector('.lpop-btns').insertBefore(gBtn, document.getElementById('lpop-travel-btn').nextSibling);
  }
  if(loc.ctrl==='player'){
    const g=getGarrison(locId);
    const risk=loc.raidRisk||1;
    const statusTxt=g===0?'NONE':g>=risk*2?'SECURE':g>=risk?'OK':'LOW';
    gBtn.textContent='[ GARRISON: '+g+' / '+statusTxt+' ]';
    gBtn.style.display='block';
    gBtn.onclick=()=>openGarrison(locId);
    gBtn.disabled=false;
  } else if(loc.ctrl==='unclaimed'&&loc.claimable){
    gBtn.textContent='[ CLAIM THIS TERRITORY ]';
    gBtn.style.display='block';
    gBtn.style.color='var(--g)';
    gBtn.onclick=()=>{ closePopup(); claimLocation(locId); };
    gBtn.disabled=false;
  } else {
    gBtn.style.display='none';
  }
  popup.style.left=px+'px'; popup.style.top=py+'px'; popup.style.display='block';
}

function closePopup(){document.getElementById('loc-popup').style.display='none';state.selectedLocation=null;}

function setTravelMethod(method,locId){
  state.travelMethod=method;
  document.querySelectorAll('.tm-btn').forEach(b=>b.classList.toggle('tm-active',b.textContent===TRAVEL_METHODS[method]?.label));
  const cost=getTravelCost(locId,method);
  const loc=LOCATIONS[locId];
  const hasPatrol=PATROL_ROUTES.some(r=>(r.from===locId||r.to===locId)&&(r.from===state.currentLocation||r.to===state.currentLocation));
  const fd=loc.faction&&loc.faction!=='player'?FACTIONS[loc.faction]:null;
  const rel=fd?getRelState(fd):null;
  const fuelTxt=cost.goldCost>0?` · ${cost.goldCost}g fuel`:'';
  const mPrev=document.getElementById('lpop-method-preview');
  if(mPrev) mPrev.innerHTML=`${cost.days}d · ${cost.supplies} sup${fuelTxt}${hasPatrol?` · <span style="color:var(--blood)">TROOP RISK</span>`:''}${rel?` · <span style="color:${rel.color}">${rel.label}</span>`:''}`;
  const tBtn=document.getElementById('lpop-travel-btn');
  if(tBtn) tBtn.disabled=state.supplies<cost.supplies||(cost.goldCost>0&&state.gold<cost.goldCost);
}

function openGarrison(locId){
  closePopup();
  const loc=LOCATIONS[locId];
  const g=getGarrison(locId);
  const risk=loc.raidRisk||1;
  const status=g===0?'UNDEFENDED':g>=risk*2?'SECURE':g>=risk?'DEFENDED':'VULNERABLE';
  const statusColor=g===0?'var(--blood)':g>=risk*2?'var(--g)':g>=risk?'var(--a)':'var(--blood)';
  const existing=document.getElementById('garrison-modal');if(existing)existing.remove();
  const modal=document.createElement('div');
  modal.id='garrison-modal';
  modal.className='wp';
  modal.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:800;min-width:280px;max-width:360px;';
  modal.innerHTML=
    '<div class="wtb"><div class="wtt">&#128737; GARRISON — '+loc.name+'</div>'+
    '<div class="wbs"><div class="wbtn" onclick="document.getElementById(\'garrison-modal\').remove()">&#10005;</div></div></div>'+
    '<div class="wi">'+
    '<div style="font-size:.58rem;color:var(--gd);margin-bottom:10px;">'+loc.flavor+'</div>'+
    '<div style="display:flex;justify-content:space-between;margin-bottom:8px;">'+
    '<span style="font-size:.6rem;color:var(--gd);">RAID RISK</span>'+
    '<span style="font-size:.6rem;color:var(--a);">'+['','LOW','MODERATE','HIGH','CRITICAL'][Math.min(risk,4)]+'</span></div>'+
    '<div style="display:flex;justify-content:space-between;margin-bottom:12px;">'+
    '<span style="font-size:.6rem;color:var(--gd);">STATUS</span>'+
    '<span id="garrison-status-'+locId+'" style="font-size:.6rem;color:'+statusColor+'">'+status+'</span></div>'+
    '<div class="garrison-row">'+
    '<span class="garrison-lbl">STATIONED TROOPS</span>'+
    '<button class="garrison-btn" onclick="garrisonRemove(\'' +locId+ '\')">-</button>'+
    '<span class="garrison-count" id="garrison-count-'+locId+'">'+g+'</span>'+
    '<button class="garrison-btn" onclick="garrisonAdd(\'' +locId+ '\')">+</button>'+
    '</div>'+
    '<div style="font-size:.52rem;color:var(--gd);margin-top:8px;">Available troops: <span id="avail-troops-g" style="color:var(--a);">'+state.troops+'</span></div>'+
    '</div>';
  document.getElementById('app').appendChild(modal);
}

async function travelToSelected(){
  const locId=state.selectedLocation;
  if(!locId||locId===state.currentLocation)return;
  const loc=LOCATIONS[locId];
  const cost=getTravelCost(locId,state.travelMethod||'foot');
  if(state.supplies<cost.supplies){showNotif('NOT ENOUGH SUPPLIES');return;}
  if(cost.goldCost>0&&state.gold<cost.goldCost){showNotif('NOT ENOUGH GOLD — VEHICLE NEEDS FUEL');return;}
  closePopup();
  state.supplies-=cost.supplies; state.days+=cost.days;
  if(cost.goldCost>0){state.gold=Math.max(0,state.gold-cost.goldCost);showNotif('FUEL EXPENDED');}
  let troopLost=0;
  const hasPatrol=PATROL_ROUTES.some(r=>(r.from===locId||r.to===locId)&&(r.from===state.currentLocation||r.to===state.currentLocation));
  if(hasPatrol&&loc.travelTroopRisk){troopLost=Math.floor(Math.random()*3)+1;state.troops=Math.max(0,state.troops-troopLost);}
  const prevLoc=state.currentLocation;
  const methodLabel=TRAVEL_METHODS[state.travelMethod||'foot']?.label||'ON FOOT';
  logEvent('travel',{from:prevLoc,to:locId,method:state.travelMethod||'foot',cost:{days:cost.days,supplies:cost.supplies,gold:cost.goldCost},troopLost});
  state.currentLocation=locId;
  if(!state.visitedLocations) state.visitedLocations=[];
  if(!state.visitedLocations.includes(locId)) state.visitedLocations.push(locId);
  updateRes();
  document.getElementById('panel-loc').textContent=loc.shortName;
  refreshMap(); switchTab('story');
  showNotif('TRAVELING TO '+loc.name+'...');
  // Jersey Devil: 80% encounter when entering Pine Barrens
  if(loc.jerseyDevil&&Math.random()<0.8){
    await jerseyDevilEncounter(prevLoc,methodLabel,cost,troopLost);
    return;
  }
  // Secondary location random encounter: 60% chance
  if(loc.secondary&&loc.randomEncounter&&Math.random()<0.60){
    const encMsg=loc.randomEncounter+` Player resources: ${state.troops} troops, ${state.supplies} supplies, ${parseFloat(state.gold||0).toFixed(1)}g gold. Day ${state.days}. Apply resource_change if encounter yields/costs supplies or gold. hp_change if there is danger.`;
    setLoad(true); clearChoices(); clearStory();
    _el['open-wrap'].style.display='none';
    try{
      const res=await callClaude(encMsg);
      state.history.push({role:'user',content:encMsg},{role:'assistant',content:JSON.stringify(res)});
      applyAll(res,{});
      state.turn++;
      _el['turn-counter'].textContent='> TURN '+String(state.turn).padStart(3,'0');
      displayResult(res,true);
    }catch(e){showErr(_el['game-error'],e.message);}
    finally{setLoad(false);}
    return;
  }
  const fd=loc.faction&&loc.faction!=='player'?FACTIONS[loc.faction]:null;
  const rel=fd?getRelState(fd):null;
  let msg=`Player traveled ${methodLabel} from ${LOCATIONS[prevLoc].name} to ${loc.name}. Cost: ${cost.days} days, ${cost.supplies} supplies${cost.goldCost>0?', '+cost.goldCost+' gold (fuel)':''}.${troopLost>0?' Lost '+troopLost+' troops to patrol ambush.':''} Generate a vivid travel/arrival scene. Location status: ${loc.ctrl==='hostile'?'HOSTILE territory of '+(fd?.name||'unknown faction'):loc.ctrl==='neutral'?'NEUTRAL territory, '+(fd?.name||''):'player-controlled'}. ${fd?'The faction leader is '+fd.leader+' -- '+fd.voice:'Nobody runs this place yet.'} Features: ${loc.features.join(', ')}. ${loc.flavor}`;
  if(loc.casinoEntry) msg+=' CASINO DIRECTIVE: This is The Boardwalk Grand Casino \u2014 run entirely by its employees (dealers, bartenders, pit bosses, security). They were hired through intermediaries and have never met the actual owner. They don\'t know it\'s Subnet. They don\'t care. They get paid in gold and run a tight operation. End the scene at the blackjack table. The FIRST CHOICE must always be labeled "SIT DOWN \u2014 PLAY BLACKJACK" with skill=wit. Other choices explore the floor or casino business.';
  setLoad(true); clearChoices(); clearStory();
  _el['open-wrap'].style.display='none';
  try{
    const res=await callClaude(msg);
    state.history.push({role:'user',content:msg},{role:'assistant',content:JSON.stringify(res)});
    applyAll(res,{});
    state.turn++;
    _el['turn-counter'].textContent='> TURN '+String(state.turn).padStart(3,'0');
    if(loc.casinoEntry){
      displayResult(res,true,true); // pass casino flag to inject blackjack UI
    } else {
      displayResult(res,true);
    }
  }catch(e){showErr(_el['game-error'],e.message);}
  finally{setLoad(false);}
}

// ══ ATLANTIC CITY CASINO ══
function atlanticCityBlackjack(){
  const bets=[1,5,10];
  const betHtml=bets.map(b=>`<button class="choice-btn bj-bet" onclick="runBlackjack(${b})">&#9827; BET ${b}g — BLACKJACK</button>`).join('');
  const extraHtml=`<div class="bj-header">&#9827; THE BOARDWALK GRAND — BLACKJACK TABLE</div><div class="bj-sub">The dealer waits. Select your wager or decline.</div>${betHtml}<button class="choice-btn bj-skip" onclick="skipBlackjack()">[ DECLINE \u2014 WALK THE FLOOR ]</button>`;
  _el['choices-container'].insertAdjacentHTML('afterbegin',extraHtml);
}
async function runBlackjack(betAmount){
  if(parseFloat(state.gold||0)<betAmount){showNotif('NOT ENOUGH GOLD');return;}
  state.gold=Math.max(0,state.gold-betAmount);
  const witBonus=Math.min(15,Math.round((SKILLS.wit?.xp||0)/30));
  const subnetRel=FACTIONS.subnet?.relationScore||40;
  const subnetNote=subnetRel>=60?' The Subnet relation is high \u2014 the dealer seems almost cooperative.':subnetRel<=20?' The dealer is cold. The cards seem colder.':'';
  const p=`The player sits at the blackjack table in the Boardwalk Grand Casino, Atlantic City. The employees run everything \u2014 hired through intermediaries, never met the owner.${subnetNote} Bet: ${betAmount} gold (already deducted). Player wit level: ${witBonus} (subtle card-sense). Narrate a vivid hand \u2014 deal, decision, outcome. Win chance: ${50+witBonus*2}%. If player wins set resource_change.gold to +${betAmount} (net gain of ${betAmount}g after the deducted bet). If player loses set resource_change.gold to 0. Set hp_change to 0. Be atmospheric and tense.`;
  setLoad(true); clearChoices(); clearStory();
  _el['open-wrap'].style.display='none';
  try{
    const res=await callClaude(p);
    state.history.push({role:'user',content:p},{role:'assistant',content:JSON.stringify(res)});
    applyAll(res,{skill:'wit',ap_reward:1});
    state.turn++;
    _el['turn-counter'].textContent='> TURN '+String(state.turn).padStart(3,'0');
    displayResult(res,true);
  }catch(e){showErr(_el['game-error'],e.message);}
  finally{setLoad(false);}
}
async function skipBlackjack(){
  const p=`The player declined the blackjack table and is roaming the floor of the Boardwalk Grand Casino, Atlantic City. Subnet-employed staff move with eerie synchronization. Nobody introduced them to their employer. The lights never flicker. Generate a short scene on the casino floor and provide 3 choices.`;
  setLoad(true); clearChoices(); clearStory();
  _el['open-wrap'].style.display='none';
  try{
    const res=await callClaude(p);
    state.history.push({role:'user',content:p},{role:'assistant',content:JSON.stringify(res)});
    applyAll(res,{});
    state.turn++;
    _el['turn-counter'].textContent='> TURN '+String(state.turn).padStart(3,'0');
    displayResult(res,true);
  }catch(e){showErr(_el['game-error'],e.message);}
  finally{setLoad(false);}
}

// ══ GARRISON SYSTEM ══
function getGarrison(locId){ return state.garrison[locId]||0; }
function setGarrison(locId,n){ state.garrison[locId]=Math.max(0,n); }

function garrisonAdd(locId){
  if(state.troops<1){showNotif('NO TROOPS TO STATION');return;}
  state.troops--;
  setGarrison(locId, getGarrison(locId)+1);
  updateRes(); updateGarrisonDisplay(locId);
  showNotif('TROOP STATIONED AT '+LOCATIONS[locId].shortName);
}
function garrisonRemove(locId){
  if(getGarrison(locId)<1){showNotif('NO GARRISON HERE');return;}
  setGarrison(locId, getGarrison(locId)-1);
  state.troops++;
  updateRes(); updateGarrisonDisplay(locId);
  showNotif('TROOP RECALLED FROM '+LOCATIONS[locId].shortName);
}
function updateGarrisonDisplay(locId){
  const el=document.getElementById('garrison-count-'+locId);
  if(el) el.textContent=getGarrison(locId);
  const el2=document.getElementById('garrison-status-'+locId);
  if(el2){
    const g=getGarrison(locId);
    const r=LOCATIONS[locId].raidRisk||1;
    el2.textContent=g===0?'UNDEFENDED':g>=r*2?'SECURE':g>=r?'DEFENDED':'VULNERABLE';
    el2.style.color=g===0?'var(--blood)':g>=r*2?'var(--g)':g>=r?'var(--a)':'var(--blood)';
  }
  // Keep available troops counter in modal in sync
  const avail=document.getElementById('avail-troops-g');
  if(avail) avail.textContent=state.troops;
}

// ══ CLAIM LOCATION (generic — replaces claimTCNJ) ══
function claimLocation(locId){
  const loc=LOCATIONS[locId];
  if(!loc||!loc.claimable||loc.ctrl!=='unclaimed'){showNotif('CANNOT CLAIM');return;}
  loc.ctrl='player';
  loc.faction='player';
  state.ownFaction=true;
  showNotif((loc.shortName||locId).toUpperCase()+' CLAIMED — YOUR FACTION PLANTS ITS FLAG');
  refreshMap();
  const isHQ=!state.history.length||locId==='tcnj';
  const msg=isHQ
    ?`The player has just claimed ${loc.name} as their faction headquarters. Generate a vivid scene: the player standing in ${loc.name} — ${loc.flavor} — declaring it theirs. Make it feel significant — the beginning of something. Other factions will hear about this.`
    :`The player has claimed ${loc.name} as a new outpost for their faction. ${loc.flavor} Generate a tense, atmospheric scene — the flag going up, the silence before the world reacts. This changes the map.`;
  switchTab('story');
  setLoad(true); clearChoices(); clearStory();
  callClaude(msg).then(res=>{
    state.history.push({role:'user',content:msg},{role:'assistant',content:JSON.stringify(res)});
    state.turn++;
    displayResult(res,true);
  }).catch(e=>showErr(_el['game-error'],e.message))
  .finally(()=>setLoad(false));
}
// ══ RAID SYSTEM ══
let _raidQueue=[];

function checkForRaids(){
  // Each player-controlled location can be raided based on raidRisk vs garrison
  Object.entries(LOCATIONS).forEach(([locId,loc])=>{
    if(loc.ctrl!=='player') return;
    const garrison=getGarrison(locId);
    const risk=loc.raidRisk||1;
    // Raid chance: higher if garrison < riskLevel
    const raidChance = garrison >= risk*2 ? 0.03 :
                       garrison >= risk   ? 0.10 :
                       garrison > 0       ? 0.22 : 0.40;
    if(Math.random() < raidChance){
      // Pick a hostile or rival faction to raid
      const hostiles=Object.values(FACTIONS).filter(f=>f.relationScore<30);
      if(hostiles.length){
        const raider=hostiles[Math.floor(Math.random()*hostiles.length)];
        _raidQueue.push({locId, raider, garrison, risk});
      }
    }
  });
  if(_raidQueue.length) processNextRaid();
}

function processNextRaid(){
  if(!_raidQueue.length) return;
  const raid=_raidQueue.shift();
  const loc=LOCATIONS[raid.locId];
  const garrison=raid.garrison;
  const raiderForce=raid.risk * 3 + Math.floor(Math.random()*5);
  const autoDefend=garrison >= raiderForce;

  if(autoDefend){
    // Auto-defended — brief narrative
    const msg=`${raid.raider.name} (led by ${raid.raider.leader}) launched a raid on ${loc.name}. The player's garrison of ${garrison} troops repelled the attack. Force attacking: ~${raiderForce}. Generate a short vivid scene — the raid failing, the garrison holding. Good news but tense.`;
    switchTab('story'); setLoad(true); clearChoices(); clearStory();
    callClaude(msg).then(res=>{
      state.history.push({role:'user',content:msg},{role:'assistant',content:JSON.stringify(res)});
      state.turn++;
      displayResult(res,true);
      showNotif(loc.shortName.toUpperCase()+' RAID REPELLED');
    }).catch(e=>showErr(_el['game-error'],e.message))
    .finally(()=>setLoad(false));
  } else {
    // Garrison too weak — alert player to intervene or lose territory
    showRaidAlert(raid, raiderForce);
  }
}

function showRaidAlert(raid, raiderForce){
  const loc=LOCATIONS[raid.locId];
  const existing=document.getElementById('raid-alert-box');
  if(existing) existing.remove();
  const box=document.createElement('div');
  box.id='raid-alert-box';
  box.className='raid-alert';
  box.innerHTML=`<strong>&#9888; RAID IN PROGRESS</strong><br>${raid.raider.name} is attacking ${loc.name}!<br>Garrison: ${raid.garrison} | Raiding force: ~${raiderForce}<br>
    <div style="display:flex;gap:6px;margin-top:8px;">
      <button class="garrison-btn" onclick="joinRaid('${raid.locId}','${raid.raider.id}',${raiderForce})">JOIN DEFENSE</button>
      <button class="garrison-btn" onclick="abandonTerritory('${raid.locId}','${raid.raider.id}')">ABANDON</button>
    </div>`;
  const storyView=document.getElementById('story-view');
  if(storyView) storyView.insertBefore(box,storyView.firstChild);
  switchTab('story');
}

function joinRaid(locId, raiderId, raiderForce){
  const box=document.getElementById('raid-alert-box');
  if(box) box.remove();
  const loc=LOCATIONS[locId];
  const raider=FACTIONS[raiderId];
  const garrison=getGarrison(locId);
  const playerForce=garrison+state.troops;
  const msg=`RAID BATTLE: ${raider.name} (${raider.leader}) attacking ${loc.name} with ~${raiderForce} fighters. Player joins the defense with ${state.troops} personal troops + ${garrison} garrison = ${playerForce} total defenders. Player stats: Force LV${Math.floor((SKILLS.force?.xp||0)/100)}, Influence LV${Math.floor((SKILLS.influence?.xp||0)/100)}, ${state.troops} mobile troops. Generate a detailed gritty battle scene. Outcome: ${playerForce >= raiderForce ? 'player wins but takes losses' : 'brutal fight, player barely holds or loses'}. Show real consequences — troop losses, territory damage, what the raider leader does when beaten/victorious.`;
  setLoad(true); clearChoices(); clearStory();
  callClaude(msg).then(res=>{
    state.history.push({role:'user',content:msg},{role:'assistant',content:JSON.stringify(res)});
    state.turn++;
    // Apply outcome
    if(playerForce >= raiderForce){
      const losses=Math.ceil(raiderForce*0.3);
      state.troops=Math.max(0,state.troops-Math.ceil(losses/2));
      setGarrison(locId,Math.max(0,garrison-Math.ceil(losses/2)));
      FACTIONS[raiderId].relationScore=Math.max(0,FACTIONS[raiderId].relationScore-15);
      showNotif(loc.shortName+' DEFENDED — TROOPS LOST: '+losses);
    } else {
      LOCATIONS[locId].ctrl='hostile';
      LOCATIONS[locId].faction=raiderId;
      setGarrison(locId,0);
      FACTIONS[raiderId].relationScore=Math.max(0,FACTIONS[raiderId].relationScore-5);
      showNotif(loc.shortName+' LOST TO '+raider.name.toUpperCase());
      refreshMap();
    }
    updateRes();
    displayResult(res,true);
  }).catch(e=>showErr(_el['game-error'],e.message))
  .finally(()=>setLoad(false));
}

function abandonTerritory(locId, raiderId){
  const box=document.getElementById('raid-alert-box');
  if(box) box.remove();
  const loc=LOCATIONS[locId];
  LOCATIONS[locId].ctrl='hostile';
  LOCATIONS[locId].faction=raiderId;
  setGarrison(locId,0);
  refreshMap(); updateRes();
  showNotif(loc.shortName.toUpperCase()+' ABANDONED');
}

// ══ PASSIVE SUPPLY INCOME ══
function collectPassiveIncome(){
  let gainedSup=0, gainedGold=0;
  Object.entries(LOCATIONS).forEach(([k,loc])=>{
    if(loc.ctrl==='player'){
      gainedSup+=loc.supplyPerTurn||0;
      gainedGold+=LOC_GOLD_PER_TURN[k]||0;
    }
  });
  if(gainedSup>0){state.supplies+=gainedSup;showNotif('TERRITORY INCOME: +'+gainedSup+' SUPPLIES');}
  if(gainedGold>0){state.gold+=gainedGold;showNotif('TERRITORY INCOME: +'+gainedGold+' GOLD');}
  if(gainedSup>0||gainedGold>0) updateRes();
}

// ══ TURN HOOK — runs after each narrative turn ══
function onTurnEnd(){
  state.days++;
  collectPassiveIncome();
  logEvent('turn_end',{hp:state.hp,sup:state.supplies,trp:state.troops,gold:state.gold,day:state.days});
  checkWin();
  // Check raids every 3 turns
  if(state.turn%3===0 && !state.gameOver) checkForRaids();
  // Amish arrival check
  if(state.days>=AMISH.arrivalDay && !state.gameOver) triggerAmishArrival();
}

function triggerAmishArrival(){
  state.gameOver=true; clearSave();
  const survived=state.amishDealMade&&Math.random()<0.5;
  logEvent('game_over',{outcome:state.amishDealMade?'amish_deal_roll':'amish_invasion',survived,days:state.days,turns:state.turn});
  displayAmishEnding(survived);
}

function displayAmishEnding(survived){
  switchTab('story');
  document.getElementById('story-win-title').textContent=survived?'EZIKIO IS MERCIFUL... THIS TIME':'THE AMISH HAVE COME';
  const el=_el['story-text'];
  const msg=survived
    ?`DAY ${state.days}. TURN ${state.turn}.\n\nEZIKIO HONORS THE DEAL.\n\n*The black-hat columns crossed the Delaware at dawn. You were ready. Ezikio's outriders found you where you said you'd be. The deal holds — for now.*\n\nNew Jersey survives. Under tribute. Forty percent of every harvest, every supply run, every gold piece that moves through this state goes west to Pennsylvania. Ezikio calls it "stewardship."\n\n"${state.factionName}" survives. Diminished. Watched. A province of the Endless Congregation.\n\nThe wasteland did not ask if you were satisfied with the arrangement.`
    :`DAY ${state.days}. TURN ${state.turn}.\n\nTHE HARVEST HAS COME.\n\n*They crossed the Delaware at six points simultaneously. Horse-drawn columns, stretching back further than you could see. Their numbers defy counting. Three centuries of extraordinary fertility marching through the streets in black hats and broad smiles.*\n\n"${state.factionName}" lasted ${state.turn} turns.\n\n${state.amishDealMade?'Ezikio was not unmerciful. The deal just did not hold. God spoke louder.':'You never found Ezikio. He found you.'}\n\n*New Jersey 2999 is now administered by the Endless Congregation. The Pine Barrens are being cleared for farmland. The wasteland is quiet now. Productive.*\n\nEzikio sends his regards.`;
  typeText(el,msg,()=>{
    _el['choices-container'].innerHTML='<button class="begin-btn" onclick="restartGame()" style="margin-top:10px">[ REBOOT — NEW CAMPAIGN ]</button>';
    _el['open-wrap'].style.display='none';
  });
}

// PERSISTENCE
function saveGame(html){
  try{
    const locStates={};Object.entries(LOCATIONS).forEach(([k,v])=>locStates[k]=v.ctrl);
    const fRels={};Object.entries(FACTIONS).forEach(([k,v])=>fRels[k]=v.relationScore);
    const skData={};Object.entries(SKILLS).forEach(([k,v])=>skData[k]={xp:v.xp,ap:v.ap,forkChoice:v.forkChoice||null});
    localStorage.setItem(SAVE_KEY,JSON.stringify({
      character:state.character,factionName:state.factionName,
      hp:state.hp,maxHp:state.maxHp,turn:state.turn,
      history:state.history,currentChoices:state.currentChoices,lastStoryHTML:html,
      days:state.days,supplies:state.supplies,troops:state.troops,gold:state.gold||0,deathRiskMod:state.deathRiskMod||0,
      currentLocation:state.currentLocation,metFactions:state.metFactions||[],sessionId:state.sessionId,
      travelMethod:state.travelMethod||'foot',amishContactMade:state.amishContactMade||false,amishDealMade:state.amishDealMade||false,
      visitedLocations:state.visitedLocations||[state.currentLocation],
      factionQuests:state.factionQuests||{},
      garrison:state.garrison||{},ownFaction:state.ownFaction||false,
      originFaction:state.originFaction||null,
      username:state.username||localStorage.getItem('jw2999_username')||'',
      locStates,fRels,skData,savedAt:Date.now()
    }));
  }catch(e){}
}
function loadSave(){try{const r=localStorage.getItem(SAVE_KEY);return r?JSON.parse(r):null;}catch(e){return null;}}
function clearSave(){localStorage.removeItem(SAVE_KEY);}

function resumeGame(save){
  state.character=save.character; state.factionName=save.factionName||'Unknown Faction';
  state.hp=save.hp; state.maxHp=save.maxHp; state.turn=save.turn;
  state.history=save.history||[]; state.currentChoices=save.currentChoices||[];
  state.days=save.days||0; state.supplies=save.supplies||50; state.troops=save.troops||10; state.gold=save.gold||0; state.deathRiskMod=save.deathRiskMod||0;
  state.currentLocation=save.currentLocation||'tcnj';
  state.metFactions=save.metFactions||[];
  state.travelMethod=save.travelMethod||'foot';
  state.amishContactMade=save.amishContactMade||false;
  state.amishDealMade=save.amishDealMade||false;
  state.visitedLocations=save.visitedLocations||[save.currentLocation||'tcnj'];
  state.factionQuests=save.factionQuests||{};
  state.garrison=save.garrison||{};
  state.ownFaction=save.ownFaction||false;
  state.originFaction=save.originFaction||null;
  state.sessionId=save.sessionId||(Date.now().toString(36)+Math.random().toString(36).slice(2,7));
  state.apiKey=localStorage.getItem(API_KEY)||'';
  logEvent('session_resume',{turn:save.turn,hp:save.hp});
  if(save.locStates) Object.entries(save.locStates).forEach(([k,v])=>{if(LOCATIONS[k])LOCATIONS[k].ctrl=v;});
  if(save.fRels) Object.entries(save.fRels).forEach(([k,v])=>{if(FACTIONS[k])FACTIONS[k].relationScore=v;});
  if(save.skData) Object.entries(save.skData).forEach(([k,v])=>{if(SKILLS[k]){SKILLS[k].xp=v.xp;SKILLS[k].ap=v.ap;if(v.forkChoice)SKILLS[k].forkChoice=v.forkChoice;}});
  state.classPerk=CLASSES[state.character.class]?.classPerk||'';
  document.getElementById('panel-name').textContent=state.character.name;
  document.getElementById('panel-class').textContent=CLASSES[state.character.class]?.name||state.character.class;
  document.getElementById('panel-faction').textContent=state.factionName;
  document.getElementById('panel-loc').textContent=LOCATIONS[state.currentLocation]?.shortName||'TCNJ';
  updateHp(state.hp); updateRes(); renderAPRow();
  _el['turn-counter'].textContent='> TURN '+String(state.turn).padStart(3,'0');
  if(save.lastStoryHTML) _el['story-text'].innerHTML=save.lastStoryHTML;
  if(state.currentChoices.length) renderChoices(state.currentChoices);
  _el['open-wrap'].style.display='flex';
  document.getElementById('setup-screen').style.display='none';
  document.getElementById('story-select').style.display='none';
  document.getElementById('title-block').style.display='none';
  showScreen('game-screen');
  hideContinue();
  switchTab('story');
}

function showContinue(save){
  const ex=document.getElementById('cont-dlg'); if(ex)ex.remove();
  const el=document.createElement('div'); el.id='cont-dlg'; el.className='cont-dlg';
  const d=new Date(save.savedAt);
  const t=d.toLocaleDateString(undefined,{month:'short',day:'numeric'})+' - TURN '+String(save.turn).padStart(3,'0');
  const savedCode=localStorage.getItem('jw2999_logincode');
  const savedUser=localStorage.getItem('jw2999_username')||save.username||'';
  const needsCode=!!savedCode;
  const codeHtml=needsCode?`<div style="margin:8px 0"><div style="font-size:.55rem;color:var(--gd);letter-spacing:1px;margin-bottom:4px;">ENTER 4-DIGIT CODE TO CONTINUE</div><input type="text" id="continue-code-input" class="dos-input" placeholder="####" maxlength="4" pattern="[0-9]*" inputmode="numeric" style="width:80px;text-align:center;font-size:1rem;"/><div id="code-error" style="color:#ff4444;font-size:.5rem;display:none;margin-top:4px;">WRONG CODE.</div></div>`:'';
  el.innerHTML=`<div class="wtb"><div class="wtt"><span>&#128190;</span> SAVE_STATE.DAT</div><div class="wbs"><div class="wbtn">?</div></div></div><div class="dlg-body-save"><div class="dlg-icon">&#128190;</div><div class="dlg-content"><div class="dlg-title">SAVE FILE DETECTED</div><div class="dlg-sub">SURVIVOR: ${save.character.name}${savedUser?' ('+savedUser+')':''}<br>FACTION: ${save.factionName||'Old Jersey'}<br>${t} | HP: ${save.hp}% | DAY ${save.days||0}</div>${codeHtml}<div class="dlg-btns"><button class="w95btn" onclick="verifyContinue()">Continue</button><button class="w95btn" onclick="discardSave()">New Game</button></div></div></div>`;
  const target=document.getElementById('story-select');
  target.insertBefore(el,target.firstChild);
}
function verifyContinue(){
  const savedCode=localStorage.getItem('jw2999_logincode');
  if(savedCode){
    const input=document.getElementById('continue-code-input');
    const errEl=document.getElementById('code-error');
    if(!input||input.value.trim()!==savedCode){if(errEl)errEl.style.display='block';return;}
  }
  resumeGame(window._ps);
}
function hideContinue(){const b=document.getElementById('cont-dlg');if(b)b.remove();}
function discardSave(){if(!confirm('DELETE SAVE FILE?'))return;clearSave();hideContinue();}
function restartGame(){
  if(!confirm('REBOOT CAMPAIGN?\nAll progress erased.'))return;
  clearSave();
  state.history=[]; state.turn=1; state.hp=100;
  state.days=0; state.supplies=50; state.troops=10; state.currentLocation='tcnj';
  state.factionName='Old Jersey'; state.boostedSkill=null; state.originFaction=null; state.classPerk=''; state.garrison={}; state.ownFaction=false; state.gold=0; state.gameOver=false; state.metFactions=[];
  state.travelMethod='foot'; state.amishContactMade=false; state.amishDealMade=false; state.visitedLocations=['tcnj']; state.factionQuests={};
  // Reset locations to correct initial control states
  Object.keys(LOCATIONS).forEach(k=>{
    if(k==='tcnj') LOCATIONS[k].ctrl='unclaimed';
    else if(k==='newark'||k==='mcguire') LOCATIONS[k].ctrl='hostile';
    else LOCATIONS[k].ctrl='neutral';
  });
  Object.values(FACTIONS).forEach(f=>{
    f.relationScore=f.id==='iron_syndicate'?10:f.id==='rust_eagles'?15:f.id==='the_hollowed'?0:f.id==='subnet'?35:f.id==='mountain_covenant'?30:f.id==='trenton_collective'?25:55;
  });
  Object.values(SKILLS).forEach(s=>{s.xp=0;s.ap=0;s.forkChoice=null;});
  document.getElementById('game-screen').style.display='none';
  document.getElementById('setup-screen').style.display='none';
  document.getElementById('story-select').style.display='block';
  document.getElementById('title-block').style.display='block';
  document.getElementById('setup-error').style.display='none';
  hideContinue(); window.scrollTo(0,0);
}

// ── STORY SELECT NAVIGATION ──
const STORIES={
  jersey:{
    id:'jersey',
    name:'2999',
    tag:'Post-Apoc NJ // Political Gore Comedy',
    setupHint:'TCNJ IS EMPTY. YOU ARE BUILDING SOMETHING FROM NOTHING.',
    factionPlaceholder:'e.g. The New Jersey Accord',
    namePlaceholder:'e.g. Governor Skeez Malvetti',
  },
  space:{
    id:'space',
    name:'GLITTERGOLD FRONTIER',
    tag:'Sci-Fi Uprising // Star Cruiser Mutiny',
    setupHint:'THE GLITTERGOLD AWAITS. THE OVERSEERS WON\'T STEP DOWN QUIETLY.',
    factionPlaceholder:'e.g. The Passenger Revolt',
    namePlaceholder:'e.g. Captain Dez Morrow',
    dev:true,
  },
  locked2:{
    id:'locked2',
    name:'BLOCK .45',
    tag:'Modern Day Chicago // Gritty Hood Thriller',
    setupHint:'THIS IS YOUR BLOCK. TAKE IT BACK.',
    factionPlaceholder:'e.g. The Old Guard',
    namePlaceholder:'e.g. Marcus "Ghost" Turner',
    dev:true,
  }
};
let selectedStoryId=null;

function showScreen(name){
  // Hide everything
  ['title-block','story-select','setup-screen','game-screen','dialogue-screen'].forEach(id=>{
    const el=document.getElementById(id);
    if(el) el.style.display='none';
  });
  // Show requested
  if(name==='home'){
    document.getElementById('title-block').style.display='block';
    document.getElementById('story-select').style.display='block';
  } else {
    const el=document.getElementById(name);
    if(el) el.style.display='block';
  }
  window.scrollTo(0,0);
}

function selectStory(id){
  if(!STORIES[id]) return;
  selectedStoryId=id;
  const story=STORIES[id];
  // Highlight selected card
  document.querySelectorAll('.story-card:not(.locked)').forEach(c=>c.classList.remove('selected-story'));
  document.getElementById('sc-'+id)?.classList.add('selected-story');
  // Update setup badge
  document.getElementById('setup-story-name').textContent=story.name;
  // Update hints
  const hint=document.querySelector('#setup-screen .dos-hint');
  if(hint) hint.textContent='> '+story.setupHint;
  // Prefill username if returning
  const unInput=document.getElementById('username-input');
  const savedUser=localStorage.getItem('jw2999_username');
  if(unInput&&savedUser) unInput.value=savedUser;
  const cnInput=document.getElementById('char-name');
  if(cnInput) cnInput.placeholder=story.namePlaceholder;
  // Show setup screen
  showScreen('setup-screen');
}

function backToStories(){
  // Reset skill allocation so returning to setup screen starts fresh
  Object.keys(skillAlloc).forEach(k=>skillAlloc[k]=0);
  skillAllocRemaining=10;
  Object.keys(skillAlloc).forEach(k=>{const e=document.getElementById('alloc-'+k);if(e)e.textContent='0';});
  const ptsEl=document.getElementById('skill-pts-left');if(ptsEl)ptsEl.textContent='10';
  showScreen('home');
}

// ── SETTINGS / TUTORIAL / LORE MODAL ──
function openSettings(){
  document.getElementById('settings-modal').style.display='flex';
  settingsTab('settings');
}
function closeSettings(){document.getElementById('settings-modal').style.display='none';}
function settingsTab(tab){
  ['settings','tutorial','lore'].forEach(t=>{
    document.getElementById('stab-'+t).style.display=t===tab?'block':'none';
    document.getElementById('stabtn-'+t).classList.toggle('active',t===tab);
  });
  if(tab==='settings') renderSettingsTab();
  if(tab==='lore') renderLoreTab();
}

// ── DEV LOGGING ──
const LOG_KEY='wc_devlog_v1';
const LOG_MAX=800;
const LOG_REMOTE_URL='https://projectleroy-logger.billybuteau.workers.dev';

function logEvent(type,data){
  try{
    const entry={ts:Date.now(),sid:state.sessionId||'nosession',cn:PLAYER_CODENAME,turn:state.turn||0,type,...data};
    // Local cache
    const raw=localStorage.getItem(LOG_KEY);
    const log=raw?JSON.parse(raw):[];
    log.push(entry);
    if(log.length>LOG_MAX)log.splice(0,log.length-LOG_MAX);
    localStorage.setItem(LOG_KEY,JSON.stringify(log));
    // Remote — fire and forget, zero performance impact
    if(LOG_REMOTE_URL){
      fetch(LOG_REMOTE_URL+'/log',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(entry)}).catch(()=>{});
    }
  }catch(e){}
}

function getDevLog(){try{return JSON.parse(localStorage.getItem(LOG_KEY))||[];}catch(e){return[];}}
function clearDevLog(){
  localStorage.removeItem(LOG_KEY);
  if(LOG_REMOTE_URL){fetch(LOG_REMOTE_URL+'/logs',{method:'DELETE'}).catch(()=>{});}
  updateDevPanel();
  showNotif('DEV LOG CLEARED');
}

async function updateDevPanel(){
  let log=getDevLog();
  const cntEl=document.getElementById('dev-event-count');
  // Fetch all-device log from remote if configured
  if(LOG_REMOTE_URL){
    if(cntEl)cntEl.textContent='Loading...';
    try{
      const r=await fetch(LOG_REMOTE_URL+'/logs');
      if(r.ok)log=await r.json();
    }catch(e){}
  }
  const bytes=new Blob([JSON.stringify(log)]).size;
  const kb=(bytes/1024).toFixed(1);
  const label=LOG_REMOTE_URL?' [all devices]':' [this device]';
  if(cntEl)cntEl.textContent=log.length+' events ('+kb+' KB)'+label+' | YOU: '+PLAYER_CODENAME;

  // Quick stats
  const qsEl=document.getElementById('dev-quick-stats');
  if(qsEl&&log.length){
    const sessions={};log.forEach(e=>{if(!sessions[e.sid])sessions[e.sid]=[];sessions[e.sid].push(e);});
    const sCount=Object.keys(sessions).length;
    const turns=log.filter(e=>e.type==='turn_end').length;
    const wins=log.filter(e=>e.type==='game_over'&&e.outcome==='win').length;
    const losses=log.filter(e=>e.type==='game_over'&&e.outcome==='loss').length;
    const players=new Set(log.map(e=>e.cn||'Unknown')).size;
    const errs=log.filter(e=>e.type==='api_error').length;
    const customs=log.filter(e=>e.type==='custom_action').length;
    const wr=wins+losses>0?Math.round(wins/(wins+losses)*100)+'%':'N/A';
    qsEl.innerHTML=`
      <div class="dev-qs purple"><div class="dev-qs-val">${players}</div><div class="dev-qs-lbl">Players</div></div>
      <div class="dev-qs"><div class="dev-qs-val">${sCount}</div><div class="dev-qs-lbl">Sessions</div></div>
      <div class="dev-qs"><div class="dev-qs-val">${turns}</div><div class="dev-qs-lbl">Turns</div></div>
      <div class="dev-qs amber"><div class="dev-qs-val">${wins}</div><div class="dev-qs-lbl">Wins</div></div>
      <div class="dev-qs red"><div class="dev-qs-val">${losses}</div><div class="dev-qs-lbl">Losses</div></div>
      <div class="dev-qs amber"><div class="dev-qs-val">${wr}</div><div class="dev-qs-lbl">Win Rate</div></div>
      <div class="dev-qs"><div class="dev-qs-val">${customs}</div><div class="dev-qs-lbl">Custom</div></div>
      <div class="dev-qs red"><div class="dev-qs-val">${errs}</div><div class="dev-qs-lbl">Errors</div></div>`;
  }

  // Mini leaderboard
  const lbEl=document.getElementById('dev-leaderboard');
  if(lbEl&&log.length){
    const pMap={};
    log.forEach(e=>{
      const cn=e.cn||'Unknown';
      if(!pMap[cn])pMap[cn]={cn,turns:0,sessions:new Set(),wins:0};
      if(e.sid)pMap[cn].sessions.add(e.sid);
      if(e.type==='turn_end')pMap[cn].turns++;
      if(e.type==='game_over'&&e.outcome==='win')pMap[cn].wins++;
    });
    const pList=Object.values(pMap);
    const byTurns=[...pList].sort((a,b)=>b.turns-a.turns).slice(0,5);
    const medals=['\u{1F947}','\u{1F948}','\u{1F949}','#4','#5'];
    const rows=byTurns.map((p,i)=>`<div class="dev-lb-row"><div class="dev-lb-rank">${i<3?medals[i]:'<span style="color:#333">'+medals[i]+'</span>'}</div><div class="dev-lb-name">${p.cn}</div><div class="dev-lb-val">${p.turns} turns</div></div>`).join('');
    lbEl.innerHTML=rows?`<div class="dev-lb-hdr">\u{1F525} TOP PLAYERS BY TURNS</div>${rows}`:'';
  }

  const table=document.getElementById('dev-recent');
  if(!table)return;
  const recent=log.slice(-20).reverse();
  table.innerHTML='<tr><th>Time</th><th>Player</th><th>Trn</th><th>Type</th><th>Data</th></tr>';
  recent.forEach(e=>{
    const time=new Date(e.ts).toLocaleTimeString();
    const {ts,sid,cn,turn,type,...rest}=e;
    const shortType=type.replace(/_/g,' ');
    const tr=document.createElement('tr');
    tr.innerHTML=`<td>${time}</td><td style="color:#00ff41">${(cn||'?').split(' ').slice(0,2).join(' ')}</td><td>${turn}</td><td class="dev-type-${type.split('_')[0]}">${shortType}</td><td>${JSON.stringify(rest).slice(0,80)}</td>`;
    table.appendChild(tr);
  });
}

let devUnlocked=false;
function openDevPanel(){
  if(!devUnlocked){
    const pw=prompt('DEV ACCESS CODE:');
    if(pw!=='55')return;
    devUnlocked=true;
  }
  const m=document.getElementById('dev-modal');
  if(m){m.style.display='flex';updateDevPanel();}
}
function closeDevPanel(){
  const m=document.getElementById('dev-modal');
  if(m)m.style.display='none';
}

async function exportDevLog(){
  let log=getDevLog();
  if(LOG_REMOTE_URL){
    try{
      const r=await fetch(LOG_REMOTE_URL+'/logs');
      if(r.ok)log=await r.json();
    }catch(e){}
  }
  if(!log.length){showNotif('LOG IS EMPTY');return;}
  const html=buildLogHTML(log);
  const blob=new Blob([html],{type:'text/html;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download='wc-devlog-'+new Date().toISOString().slice(0,10)+'.html';
  document.body.appendChild(a);a.click();document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showNotif('LOG EXPORTED');
}

function buildLogHTML(log){
  // Group events by session ID
  const sessions={};
  log.forEach(e=>{if(!sessions[e.sid])sessions[e.sid]=[];sessions[e.sid].push(e);});
  const sKeys=Object.keys(sessions);

  // Aggregates
  const totalTurns=log.filter(e=>e.type==='turn_end').length;
  const wins=log.filter(e=>e.type==='game_over'&&e.outcome==='win').length;
  const losses=log.filter(e=>e.type==='game_over'&&e.outcome==='loss').length;
  const avgTurns=sKeys.length?Math.round(totalTurns/sKeys.length):0;
  const totalPlay=log.length>1?log[log.length-1].ts-log[0].ts:0;
  const playDays=Math.max(1,Math.ceil(totalPlay/(1000*60*60*24)));

  // Choice frequency
  const choiceByLabel={A:0,B:0,C:0,STAR:0};
  const choiceBySkill={};
  log.filter(e=>e.type==='choice_made').forEach(e=>{
    if(e.label)choiceByLabel[e.label]=(choiceByLabel[e.label]||0)+1;
    if(e.skill)choiceBySkill[e.skill]=(choiceBySkill[e.skill]||0)+1;
  });
  const customCount=log.filter(e=>e.type==='custom_action').length;

  // Faction/class popularity
  const factionPop={};const classPop={};
  log.filter(e=>e.type==='session_start').forEach(e=>{
    if(e.faction)factionPop[e.faction]=(factionPop[e.faction]||0)+1;
    if(e.cls)classPop[e.cls]=(classPop[e.cls]||0)+1;
  });

  // Campaign usage breakdown
  const campaignPop={};
  log.filter(e=>e.type==='session_start').forEach(e=>{
    const c=e.campaign||'jersey';
    campaignPop[c]=(campaignPop[c]||0)+1;
  });
  // Also count turns and events per campaign
  const campaignStats={};
  sKeys.forEach(sid=>{
    const evts=sessions[sid];
    const start=evts.find(e=>e.type==='session_start');
    const c=(start&&start.campaign)||'jersey';
    if(!campaignStats[c])campaignStats[c]={sessions:0,turns:0,events:0,wins:0,losses:0};
    const cs=campaignStats[c];
    cs.sessions++;
    cs.turns+=evts.filter(e=>e.type==='turn_end').length;
    cs.events+=evts.length;
    const end=evts.find(e=>e.type==='game_over');
    if(end){if(end.outcome==='win')cs.wins++;else cs.losses++;}
  });
  const campaignNames={jersey:'2999',space:'GLITTERGOLD FRONTIER',locked2:'BLOCK .45'};
  const campaignColors={jersey:'#00ff41',space:'#bb44ff',locked2:'#cc4422'};

  // Custom action samples
  const customActions=log.filter(e=>e.type==='custom_action').map(e=>e.text||'').filter(Boolean);

  // Errors
  const errors=log.filter(e=>e.type==='api_error');

  // Avg resources by turn (first 20 turns)
  const turnSnaps={};
  log.filter(e=>e.type==='turn_end').forEach(e=>{
    if(!turnSnaps[e.turn])turnSnaps[e.turn]=[];
    turnSnaps[e.turn].push({hp:e.hp||0,sup:e.sup||0,trp:e.trp||0,gold:e.gold||0});
  });
  const avgByTurn=Object.keys(turnSnaps).map(Number).sort((a,b)=>a-b).slice(0,20).map(t=>{
    const s=turnSnaps[t];const n=s.length;
    return{turn:t,hp:Math.round(s.reduce((a,x)=>a+x.hp,0)/n),sup:Math.round(s.reduce((a,x)=>a+x.sup,0)/n),trp:Math.round(s.reduce((a,x)=>a+x.trp,0)/n),gold:Math.round(s.reduce((a,x)=>a+x.gold,0)/n)};
  });

  // Hourly activity heatmap (0-23)
  const hourly=new Array(24).fill(0);
  log.forEach(e=>{hourly[new Date(e.ts).getHours()]++;});
  const maxHour=Math.max(...hourly,1);

  // Helpers
  function bar(v,max){const p=max>0?Math.round(v/max*24):0;return'\u2588'.repeat(p)+'\u2591'.repeat(24-p);}
  function pctBar(v,max,w=20){const p=max>0?Math.round(v/max*w):0;return'\u2588'.repeat(p)+'\u2591'.repeat(w-p);}
  const maxChoice=Math.max(...Object.values(choiceByLabel),customCount,1);
  const maxSkill=Math.max(...Object.values(choiceBySkill),1);
  const maxFaction=Math.max(...Object.values(factionPop),1);

  // Player codename aggregation (enhanced for leaderboard)
  const playerMap={};
  log.forEach(e=>{
    const cn=e.cn||'Unknown';
    if(!playerMap[cn])playerMap[cn]={codename:cn,sessions:new Set(),turns:0,apiCalls:0,wins:0,losses:0,maxTurns:0,firstSeen:e.ts,lastSeen:e.ts,factions:new Set(),classes:new Set()};
    const p=playerMap[cn];
    if(e.sid)p.sessions.add(e.sid);
    if(e.type==='turn_end')p.turns++;
    if(e.type==='game_over'){if(e.outcome==='win')p.wins++;else p.losses++;}
    if(e.type==='session_start'){if(e.faction)p.factions.add(e.faction);if(e.cls)p.classes.add(e.cls);}
    p.apiCalls++;
    if(e.ts<p.firstSeen)p.firstSeen=e.ts;
    if(e.ts>p.lastSeen)p.lastSeen=e.ts;
  });
  // Calculate max turns per session per player
  Object.values(playerMap).forEach(p=>{
    p.sessions.forEach(sid=>{
      if(sessions[sid]){
        const t=sessions[sid].filter(e=>e.type==='turn_end').length;
        if(t>p.maxTurns)p.maxTurns=t;
      }
    });
  });
  const playerList=Object.values(playerMap).sort((a,b)=>b.lastSeen-a.lastSeen);

  // Leaderboard rankings
  const byTurns=[...playerList].sort((a,b)=>b.turns-a.turns);
  const bySessions=[...playerList].sort((a,b)=>b.sessions.size-a.sessions.size);
  const byLongest=[...playerList].sort((a,b)=>b.maxTurns-a.maxTurns);
  const byWins=[...playerList].filter(p=>p.wins>0).sort((a,b)=>b.wins-a.wins);
  const medals=['&#129351;','&#129352;','&#129353;']; // gold, silver, bronze

  function leaderRows(list,valFn,labelFn){
    return list.slice(0,10).map((p,i)=>{
      const medal=i<3?medals[i]:'<span style="color:#333">#'+(i+1)+'</span>';
      return`<tr><td style="text-align:center">${medal}</td><td style="color:#00ff41;font-weight:bold">${p.codename}</td><td style="color:#ffb000;font-weight:bold">${valFn(p)}</td><td style="color:#444">${labelFn(p)}</td></tr>`;
    }).join('');
  }

  const playerRows=playerList.map(p=>`<tr><td style="color:#00ff41;font-weight:bold">${p.codename}</td><td>${p.sessions.size}</td><td>${p.turns}</td><td>${p.wins}</td><td>${p.losses}</td><td>${p.apiCalls}</td><td style="color:#444">${[...p.factions].join(', ')||'-'}</td><td>${new Date(p.lastSeen).toLocaleString()}</td></tr>`).join('');

  // Session summary rows
  const sessionRows=sKeys.map(sid=>{
    const evts=sessions[sid];
    const start=evts.find(e=>e.type==='session_start');
    const end=evts.find(e=>e.type==='game_over');
    const turns=evts.filter(e=>e.type==='turn_end').length;
    const ts=new Date(evts[0].ts).toLocaleString();
    const outcome=end?(end.outcome==='win'?`<span class="win">WIN (${end.vtype||''})</span>`:'<span class="loss">LOSS</span>'):'<span class="ongoing">IN PROGRESS</span>';
    const cn=evts[0].cn||'Unknown';
    const camp=(start&&start.campaign)||'jersey';
    const campColor=campaignColors[camp]||'#666';
    return`<tr><td>${sid.slice(-6)}</td><td style="color:#00ff41">${cn}</td><td style="color:${campColor}">${campaignNames[camp]||camp}</td><td>${ts}</td><td>${start?start.faction||'?':'?'}</td><td>${start?start.cls||'?':'?'}</td><td>${turns}</td><td>${outcome}</td></tr>`;
  }).join('');

  // Session timelines
  const sessionDetails=sKeys.map(sid=>{
    const evts=sessions[sid];
    const rows=evts.map(e=>{
      const{ts,sid:_,turn,type,...rest}=e;
      return`<tr><td>${new Date(ts).toLocaleTimeString()}</td><td>T${turn}</td><td class="et-${type.split('_')[0]}">${type}</td><td>${JSON.stringify(rest).replace(/['"{}]/g,'').slice(0,120)}</td></tr>`;
    }).join('');
    return`<details><summary><b>Session ${sid.slice(-6)}</b> — ${evts.length} events</summary><table class="evt-tbl"><tr><th>Time</th><th>Turn</th><th>Type</th><th>Data</th></tr>${rows}</table></details>`;
  }).join('\n');

  // Resource trend table
  const resRows=avgByTurn.map(r=>`<tr><td>${r.turn}</td><td>${r.hp}</td><td>${r.sup}</td><td>${r.trp}</td><td>${r.gold}</td></tr>`).join('');

  // Error rows
  const errRows=errors.map(e=>`<tr><td>${new Date(e.ts).toLocaleString()}</td><td>T${e.turn}</td><td>${e.model||'?'}</td><td>${e.src||''}</td><td class="err">${e.msg||''}</td></tr>`).join('');

  // Campaign stats section
  const campaignSection=Object.entries(campaignStats).map(([id,cs])=>{
    const color=campaignColors[id]||'#666';
    const name=campaignNames[id]||id;
    const wr=cs.wins+cs.losses>0?Math.round(cs.wins/(cs.wins+cs.losses)*100):0;
    return`<div class="campaign-card" style="border-left:3px solid ${color};">
      <div class="campaign-name" style="color:${color}">${name}</div>
      <div class="campaign-stats">${cs.sessions} sessions &nbsp;|&nbsp; ${cs.turns} turns &nbsp;|&nbsp; ${cs.events} events &nbsp;|&nbsp; ${cs.wins}W/${cs.losses}L &nbsp;|&nbsp; ${wr}% win rate</div>
    </div>`;
  }).join('');

  // Heatmap visualization
  const heatCells=hourly.map((v,h)=>{
    const intensity=v/maxHour;
    const r=Math.round(intensity*0);const g=Math.round(intensity*255);const b=Math.round(intensity*65);
    const bg=v>0?`rgba(${r},${g},${b},${Math.max(0.15,intensity)})`:'#0d0d0d';
    return`<div class="heat-cell" style="background:${bg}" title="${h}:00 — ${v} events"><div class="heat-val">${v||''}</div><div class="heat-hr">${h}</div></div>`;
  }).join('');

  // Class popularity
  const maxClass=Math.max(...Object.values(classPop),1);

  return`<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Project Leroy — Dev Log</title><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:monospace;background:#0a0a0a;color:#b8b8b8;padding:24px;font-size:13px;line-height:1.6;}
h1{color:#00ff41;font-size:1.5rem;letter-spacing:3px;margin-bottom:4px;}
.sub{color:#444;font-size:.72rem;letter-spacing:2px;margin-bottom:28px;}
h2{color:#ffb000;font-size:.85rem;letter-spacing:2px;margin:32px 0 12px;border-bottom:1px solid #1e1e1e;padding-bottom:6px;text-transform:uppercase;}
h3{color:#888;font-size:.72rem;letter-spacing:1px;margin:18px 0 8px;text-transform:uppercase;}
.stats-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;margin-bottom:8px;}
.stat-box{background:#111;border:1px solid #1e1e1e;border-left:3px solid #00ff41;padding:12px 14px;}
.stat-box.amber{border-left-color:#ffb000;}.stat-box.amber .stat-val{color:#ffb000;}
.stat-box.red{border-left-color:#cc0000;}.stat-box.red .stat-val{color:#cc0000;}
.stat-box.purple{border-left-color:#bb44ff;}.stat-box.purple .stat-val{color:#bb44ff;}
.stat-box.cyan{border-left-color:#00d4ff;}.stat-box.cyan .stat-val{color:#00d4ff;}
.stat-val{font-size:1.8rem;color:#00ff41;font-weight:bold;line-height:1;}
.stat-lbl{font-size:.6rem;color:#444;letter-spacing:1px;margin-top:4px;text-transform:uppercase;}
table{width:100%;border-collapse:collapse;margin-bottom:16px;font-size:.78rem;}
th{background:#111;color:#ffb000;text-align:left;padding:6px 8px;font-weight:normal;letter-spacing:1px;font-size:.68rem;border-bottom:1px solid #1e1e1e;}
td{padding:4px 8px;border-bottom:1px solid #141414;vertical-align:top;max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
tr:hover td{background:#111;}
.win{color:#00ff41;}.loss{color:#cc0000;}.ongoing{color:#ffb000;}.err{color:#ff4444;white-space:normal;}
details{margin-bottom:6px;border:1px solid #1e1e1e;}
summary{cursor:pointer;color:#888;padding:7px 10px;background:#111;font-size:.78rem;list-style:none;}
summary:hover{color:#ffb000;}details[open]summary{border-bottom:1px solid #1e1e1e;}
.evt-tbl td{font-size:.72rem;color:#666;white-space:nowrap;max-width:240px;}
.et-choice{color:#00ff41!important;}.et-custom{color:#00bbff!important;}.et-session{color:#ffb000!important;}
.et-game{color:#ff44aa!important;}.et-api{color:#cc0000!important;}.et-turn{color:#2a2a2a!important;}
.et-faction{color:#bb44ff!important;}.et-travel{color:#ffaa00!important;}
.bar-row{display:flex;align-items:center;gap:10px;margin-bottom:5px;font-size:.75rem;}
.bar-lbl{width:130px;color:#666;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex-shrink:0;}
.bar{color:#00ff41;letter-spacing:-2px;font-size:.7rem;}.bar-n{color:#333;font-size:.68rem;}
ul{padding-left:16px;font-size:.78rem;color:#666;column-count:2;column-gap:20px;}
li{margin-bottom:3px;break-inside:avoid;}
.campaign-card{background:#111;padding:10px 14px;margin-bottom:8px;border:1px solid #1e1e1e;}
.campaign-name{font-size:1rem;font-weight:bold;letter-spacing:2px;margin-bottom:2px;}
.campaign-stats{font-size:.68rem;color:#555;letter-spacing:1px;}
.heat-grid{display:grid;grid-template-columns:repeat(24,1fr);gap:2px;margin:8px 0 16px;}
.heat-cell{text-align:center;padding:6px 0;border:1px solid #1a1a1a;min-height:44px;}
.heat-val{font-size:.72rem;color:#00ff41;font-weight:bold;}
.heat-hr{font-size:.5rem;color:#333;margin-top:2px;}
.leaderboard-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:8px;}
@media(max-width:700px){.leaderboard-grid{grid-template-columns:1fr;}}
.lb-section{background:#0d0d0d;border:1px solid #1e1e1e;padding:12px;}
.lb-title{font-size:.68rem;color:#ffb000;letter-spacing:2px;margin-bottom:8px;text-transform:uppercase;}
.lb-table{width:100%;font-size:.72rem;}
.lb-table td{padding:3px 6px;border-bottom:1px solid #111;}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
@media(max-width:700px){.two-col{grid-template-columns:1fr;}}
.footer{color:#1a1a1a;font-size:.6rem;text-align:center;margin-top:40px;letter-spacing:2px;}
</style></head><body>
<h1>\u2694 PROJECT LEROY \u2014 DEV LOG</h1>
<div class="sub">EXPORTED ${new Date().toLocaleString()} &nbsp;|&nbsp; ${log.length} EVENTS &nbsp;|&nbsp; ${sKeys.length} SESSIONS &nbsp;|&nbsp; ${playerList.length} PLAYERS &nbsp;|&nbsp; ${playDays} DAYS TRACKED</div>

<h2>Summary</h2>
<div class="stats-grid">
  <div class="stat-box"><div class="stat-val">${playerList.length}</div><div class="stat-lbl">Unique Players</div></div>
  <div class="stat-box"><div class="stat-val">${sKeys.length}</div><div class="stat-lbl">Sessions</div></div>
  <div class="stat-box"><div class="stat-val">${totalTurns}</div><div class="stat-lbl">Total Turns</div></div>
  <div class="stat-box amber"><div class="stat-val">${avgTurns}</div><div class="stat-lbl">Avg Turns / Session</div></div>
  <div class="stat-box"><div class="stat-val">${wins}</div><div class="stat-lbl">Campaign Wins</div></div>
  <div class="stat-box red"><div class="stat-val">${losses}</div><div class="stat-lbl">Campaign Losses</div></div>
  <div class="stat-box amber"><div class="stat-val">${wins+losses>0?Math.round(wins/(wins+losses)*100):0}%</div><div class="stat-lbl">Win Rate</div></div>
  <div class="stat-box cyan"><div class="stat-val">${customCount}</div><div class="stat-lbl">Custom Actions</div></div>
  <div class="stat-box red"><div class="stat-val">${errors.length}</div><div class="stat-lbl">API Errors</div></div>
  <div class="stat-box purple"><div class="stat-val">${log.length}</div><div class="stat-lbl">Total Events</div></div>
</div>

<h2>\u{1F3C6} Leaderboard</h2>
<div class="leaderboard-grid">
  <div class="lb-section">
    <div class="lb-title">\u{1F525} Most Turns Survived</div>
    <table class="lb-table"><tr><th></th><th>Player</th><th>Turns</th><th>Sessions</th></tr>
    ${leaderRows(byTurns,p=>p.turns,p=>p.sessions.size+' sessions')||'<tr><td colspan="4" style="color:#222">No data</td></tr>'}
    </table>
  </div>
  <div class="lb-section">
    <div class="lb-title">\u{1F3AF} Most Sessions</div>
    <table class="lb-table"><tr><th></th><th>Player</th><th>Sessions</th><th>Turns</th></tr>
    ${leaderRows(bySessions,p=>p.sessions.size,p=>p.turns+' turns')||'<tr><td colspan="4" style="color:#222">No data</td></tr>'}
    </table>
  </div>
  <div class="lb-section">
    <div class="lb-title">\u26A1 Longest Single Run</div>
    <table class="lb-table"><tr><th></th><th>Player</th><th>Turns</th><th>Games</th></tr>
    ${leaderRows(byLongest,p=>p.maxTurns,p=>(p.wins+p.losses)+' finished')||'<tr><td colspan="4" style="color:#222">No data</td></tr>'}
    </table>
  </div>
  <div class="lb-section">
    <div class="lb-title">\u{1F451} Most Wins</div>
    <table class="lb-table"><tr><th></th><th>Player</th><th>Wins</th><th>Win Rate</th></tr>
    ${leaderRows(byWins,p=>p.wins,p=>{const t=p.wins+p.losses;return t?Math.round(p.wins/t*100)+'%':'N/A';})||'<tr><td colspan="4" style="color:#222">No wins yet</td></tr>'}
    </table>
  </div>
</div>

<h2>\u{1F3AE} Campaign Usage</h2>
${campaignSection||'<span style="color:#222">No campaign data yet.</span>'}

<h2>\u{1F464} Players (${playerList.length})</h2>
<table><tr><th>Codename</th><th>Sessions</th><th>Turns</th><th>Wins</th><th>Losses</th><th>API Calls</th><th>Factions Used</th><th>Last Seen</th></tr>
${playerRows||'<tr><td colspan="8" style="color:#333">No players tracked yet.</td></tr>'}</table>

<h2>\u{1F4CB} Sessions</h2>
<table><tr><th>ID</th><th>Player</th><th>Campaign</th><th>Started</th><th>Faction</th><th>Class</th><th>Turns</th><th>Outcome</th></tr>
${sessionRows||'<tr><td colspan="8" style="color:#333">No sessions yet.</td></tr>'}</table>

<h2>\u{1F552} Activity Heatmap (hour of day)</h2>
<div class="heat-grid">${heatCells}</div>

<h2>Choice Analysis</h2>
<div class="two-col"><div>
<h3>Option Distribution</h3>
${['A','B','C','STAR'].map(l=>`<div class="bar-row"><div class="bar-lbl">Option ${l}</div><div class="bar">${bar(choiceByLabel[l]||0,maxChoice)}</div><div class="bar-n">${choiceByLabel[l]||0}</div></div>`).join('')}
<div class="bar-row"><div class="bar-lbl">Custom (typed)</div><div class="bar">${bar(customCount,maxChoice)}</div><div class="bar-n">${customCount}</div></div>
</div><div>
<h3>Skill Distribution</h3>
${Object.entries(choiceBySkill).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`<div class="bar-row"><div class="bar-lbl">${k.toUpperCase()}</div><div class="bar">${bar(v,maxSkill)}</div><div class="bar-n">${v}</div></div>`).join('')||'<span style="color:#222">No data</span>'}
</div></div>

<h2>Popularity</h2>
<div class="two-col"><div>
<h3>Origin Factions</h3>
${Object.entries(factionPop).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`<div class="bar-row"><div class="bar-lbl">${k.replace(/_/g,' ')}</div><div class="bar">${bar(v,maxFaction)}</div><div class="bar-n">${v}</div></div>`).join('')||'<span style="color:#222">No data</span>'}
</div><div>
<h3>Classes</h3>
${Object.entries(classPop).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`<div class="bar-row"><div class="bar-lbl">${k.toUpperCase()}</div><div class="bar">${bar(v,maxClass)}</div><div class="bar-n">${v}</div></div>`).join('')||'<span style="color:#222">No data</span>'}
</div></div>

<h2>Resource Trends (avg by turn, first 20 turns)</h2>
${avgByTurn.length?`<table><tr><th>Turn</th><th>Avg HP</th><th>Avg Supplies</th><th>Avg Troops</th><th>Avg Gold</th></tr>${resRows}</table>`:'<span style="color:#222">No turn data yet.</span>'}

<h2>Recent Custom Actions (last ${Math.min(customActions.length,50)})</h2>
${customActions.length?`<ul>${customActions.slice(-50).map(a=>`<li>${a.replace(/</g,'&lt;')}</li>`).join('')}</ul>`:'<span style="color:#222">None logged.</span>'}

<h2>API Errors (${errors.length})</h2>
${errRows?`<table><tr><th>Time</th><th>Turn</th><th>Model</th><th>Source</th><th>Error</th></tr>${errRows}</table>`:'<span style="color:#00ff41">\u2713 No errors logged.</span>'}

<h2>Session Timelines</h2>
${sessionDetails||'<span style="color:#222">No sessions.</span>'}

<div class="footer">PROJECT LEROY DEV LOG \u2014 CONFIDENTIAL \u2014 ${new Date().toLocaleDateString()}</div>
</body></html>`;
}

// ── SPLASH / BOOT SCREEN ──
function initSplash() {
  const statuses = [
    'Initializing system...',
    'Loading narrative engine...',
    'Establishing API connection...',
    'Reading New Jersey database...',
    'Loading faction data...',
    'Please wait...',
  ];
  const statusEl = document.getElementById('splash-boot-status');
  const bar = document.getElementById('splash-bar-fill');
  let i = 0;
  const step = () => {
    if (i < statuses.length) {
      statusEl.textContent = statuses[i++];
      setTimeout(step, 80 + Math.random() * 45);
    } else {
      setTimeout(() => { bar.style.width = '100%'; }, 50);
      setTimeout(() => {
        document.getElementById('splash-boot').style.display = 'none';
        document.getElementById('splash-dialog').style.display = 'block';
      }, 550);
    }
  };
  step();
}

function dismissSplash() {
  const el = document.getElementById('splash-screen');
  el.style.opacity = '0';
  setTimeout(() => { el.style.display = 'none'; }, 500);
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', function() {
  // Cache frequently-used DOM elements (avoids repeated lookups in hot paths)
  _initElCache();
  // Load and apply user settings immediately
  loadSettings();
  applySettings();
  // ASCII BG
  (function(){
    const ch='abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let t='';
    for(let l=0;l<55;l++){for(let c=0;c<130;c++)t+=Math.random()>.94?ch[Math.floor(Math.random()*ch.length)]:'';t+='\n';}
    document.getElementById('bg-ascii').textContent=t;
  })();

  document.getElementById('api-key').addEventListener('input',function(){localStorage.setItem(API_KEY,this.value);});
  const sk=localStorage.getItem(API_KEY); if(sk) document.getElementById('api-key').value=sk;
  // STARTUP — always show home screen
  showScreen('home');
  // Validate save — only show continue if save has required fields
  const es=loadSave();
  if(es && es.character && es.character.name && es.turn){
    window._ps=es;
    const row=document.getElementById('home-continue-row');
    if(row) row.style.display='flex';
  } else if(es){
    // Corrupt/incomplete save — clear it silently
    clearSave();
  }
  document.getElementById('open-input').addEventListener('keydown',e=>{if(e.key==='Enter')submitOpen();});
  document.getElementById('dlg-open').addEventListener('keydown',e=>{if(e.key==='Enter')submitDlgOpen();});
  // Dev mode — show DEV button if ?dev=1 in URL
  if(new URLSearchParams(window.location.search).get('dev')==='1'){
    const fab=document.getElementById('dev-fab');
    if(fab){fab.style.display='block';}
    // Unlock dev-only campaigns
    document.querySelectorAll('.story-card').forEach(card=>{
      const id=card.id.replace('sc-','');
      if(STORIES[id]&&STORIES[id].dev){
        const btn=card.querySelector('.sc-select-btn');
        if(btn){
          btn.disabled=false;
          btn.textContent='[ DEV ACCESS >> ]';
          btn.style.cssText='cursor:pointer;opacity:1;';
          btn.onclick=function(e){e.stopPropagation();selectStory(id);};
        }
        card.onclick=function(){selectStory(id);};
        card.style.cursor='pointer';
        // Add DEV badge
        const badges=card.querySelector('.sc-badges');
        if(badges){
          const stat=badges.querySelector('.sc-status');
          if(stat){stat.textContent='⚙ DEV ACCESS';stat.style.cssText='color:#00ff41;border-color:#00ff41;background:rgba(0,255,65,.07);';}
        }
      }
    });
  }
  // Boot splash (sits on top until acknowledged)
  initSplash();
});
