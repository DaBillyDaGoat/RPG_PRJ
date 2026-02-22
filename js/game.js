'use strict';

// FACTION DATA
const FACTIONS={
  iron_syndicate:{id:'iron_syndicate',name:'Iron Syndicate',territory:'Newark',icon:'&#129967;',
    relationScore:10,
    leader:'Commissioner Vera Stahl',leaderTitle:'Commissioner of Industrial Operations, Newark',
    leaderPortrait:'+--------+\n| /\\__/\\ |\n| (o  o) |\n| =====  |\n| [CORP] |\n+--------+',
    voice:'Cold, corporate, condescending. Speaks in quarterly reports. Three husbands. None survived.',
    desc:"Pre-collapse corporate descendants who turned Newark's factories into a militarized production state. They believe capitalism never died -- it just got more honest.",
    wants:'Tribute, trade exclusivity, and for everyone to stop touching their equipment.',
    fears:'Labor organizing. Democracy. Running out of ammunition.'},
  rust_eagles:{id:'rust_eagles',name:'Rust Eagles',territory:'McGuire AFB',icon:'&#9992;',
    relationScore:15,
    leader:'General "Tombstone" Rusk',leaderTitle:'Commanding General, McGuire Combat Theater',
    leaderPortrait:'+--------+\n| [HELM] |\n| (>_<)  |\n| XXXXXX |\n| [RANK] |\n+--------+',
    voice:'Loud, military, theatrical. Calls everything a theater of operations. Genuinely believes he rules NJ.',
    desc:"Descendants of pre-collapse Air Force personnel who never left McGuire AFB. They still have aircraft. The fuel situation is classified.",
    wants:'Expansion, tribute, and for the fuel situation to resolve itself.',
    fears:'Running out of fuel. Anyone finding out about the fuel.'},
  mountain_covenant:{id:'mountain_covenant',name:'Mountain Covenant',territory:'Mountainside',icon:'&#9968;',
    relationScore:45,
    leader:'High Keeper Aldous Finn',leaderTitle:'High Keeper of the Springs, Mountainside Sanctuary',
    leaderPortrait:'+--------+\n|  /\\    |\n| /  \\   |\n|(o..o)  |\n| ~water~|\n+--------+',
    voice:'Serene, cryptic, mentions prophecy often. Controls the only clean water. Very aware of this.',
    desc:'Isolationist religious community built around the natural springs of the Watchung Mountains. They worship water and consider the collapse divine punishment for pollution.',
    wants:'To be left alone. Clean water kept clean. Pilgrims who pay tribute.',
    fears:'Contamination. Outsiders. Industrial runoff.'},
  trenton_collective:{id:'trenton_collective',name:'Trenton Collective',territory:'Trenton',icon:'&#127807;',
    relationScore:50,
    leader:'Chair Marta Osei',leaderTitle:'Elected Chair, Trenton Agricultural Collective',
    leaderPortrait:'+--------+\n| [BERET]|\n| (^_^)  |\n| ~~~~~  |\n|COMRADE |\n+--------+',
    voice:'Direct, warm but firm. Uses "comrade" un-ironically. Elected 8 times. Suspects the last 3 were rigged. By herself.',
    desc:"Agrarian communist collective controlling NJ's remaining farmland. They feed half the wasteland and are aggressively neutral.",
    wants:'Food security, fair trade, no wars near the crops.',
    fears:'Famine, exploitation, anyone claiming the land.'},
  coastal_brotherhood:{id:'coastal_brotherhood',name:'Coastal Brotherhood',territory:'LBI/Seaside',icon:'&#9875;',
    relationScore:55,
    leader:'Captain Dez Salieri',leaderTitle:'Captain of the Brotherhood, LBI Harbor Authority',
    leaderPortrait:'+--------+\n|~ (^) ~ |\n| (o_o)  |\n| ~~~~   |\n|CAPTAIN |\n+--------+',
    voice:'Charming, amoral, always negotiating. Treats everything as a transaction. Probably has your wallet.',
    desc:'Organized crime family turned maritime trade network. Control the coast and most smuggling routes. Cheerfully non-ideological.',
    wants:'Profit. Safe trade routes. A cut of everything that moves.',
    fears:'Nothing. They work with everyone. Except the Hollowed.'},
  the_hollowed:{id:'the_hollowed',name:'The Hollowed',territory:'Roaming/Pine Barrens',icon:'&#128128;',
    relationScore:0,
    leader:'"The Mouth"',leaderTitle:'Speaker of the Hollowed, Voice of the Herd',
    leaderPortrait:'+--------+\n| XXXXXX |\n| X(_)X  |\n| XXXXXX |\n|  HERD  |\n+--------+',
    voice:'Speaks in royal "we." Refers to eating people as "communion." Surprisingly articulate for a cannibal warlord.',
    desc:"Roaming cannibal raiders from the Pine Barrens. They don't hold territory -- they consume it. Negotiation is technically possible but inadvisable.",
    wants:'Meat. Expansion. To not be called zombies.',
    fears:'Fire. Organized resistance. Being called zombies (they hate that).'},
  subnet:{id:'subnet',name:'Subnet',territory:'Underground',icon:'&#128190;',
    relationScore:40,
    leader:'Architect 7',leaderTitle:'Node Architect, Subnet Infrastructure Division',
    leaderPortrait:'+--------+\n|01010101|\n|1(o_o)01|\n|01010101|\n| SUBNET |\n+--------+',
    voice:'Speaks in system metaphors. Refers to humans as wetware. Has not been above ground in 11 years.',
    desc:"Underground network of engineers and hackers who maintain pre-collapse infrastructure. They know where every pipe and cable runs.",
    wants:'Information. Power grid access. Payment in hardware.',
    fears:'Being found. Losing the network. Running out of parts.'},
};

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
  force:{name:'FORCE',icon:'&#9876;',
    desc:'Fighting, intimidation, troop command. Brutality made useful.',
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

  wit:{name:'WIT',icon:'&#128161;',
    desc:'Cunning, trade, engineering. Outsmarting opponents, running deals, building things.',
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

  influence:{name:'INFLUENCE',icon:'&#127931;',
    desc:'Charisma, diplomacy, leadership. Make people follow you, trust you, or not shoot first.',
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

  shadow:{name:'SHADOW',icon:'&#128373;',
    desc:'Stealth, subterfuge, information warfare. Operating between what people know and what is actually happening.',
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

  grit:{name:'GRIT',icon:'&#9935;',
    desc:'Survival, endurance, scavenging. The stubborn Jersey refusal to die.',
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
        skillBonus:{wit:4,wit:2},
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
        flavor:'You enforced the High Keeper\'s will in the valleys below Mountainside. Armed, faithful, and very good at making people understand consequences.',
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
        flavor:'You sat on every committee. Drafted policy that nobody read. You understand the Collective\'s internal politics better than Marta Osei herself.',
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
    startLocation:'tcnj',
    lore:'Underground network of engineers maintaining pre-collapse infrastructure. Architect 7 has not been above ground in 11 years.',
    classes:[
      { id:'rogue_node', name:'Rogue Node', tier:'basic',
        icon:'&#128257;',
        flavor:'Architect 7 built you into the network and tried to remove you. The removal didn\'t take. You\'re still logged in. No troops — just access.',
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

// Build flat class lookup
const CLASSES={};
Object.values(FACTION_CLASSES).forEach(f=>{
  f.classes.forEach(c=>{ CLASSES[c.id]={...c, factionId: Object.keys(FACTION_CLASSES).find(k=>FACTION_CLASSES[k]===f)}; });
});

// STATE
const state={
  apiKey:'',turn:1,hp:100,maxHp:100,
  character:{name:'',class:'',brutality:3,cunning:3,charisma:3,depravity:3},
  factionName:'',ownFaction:false,
  history:[],currentChoices:[],isLoading:false,
  stats:{brutality:3,cunning:3,charisma:3,depravity:3},
  currentLocation:'tcnj',
  days:0,supplies:50,troops:0,
  garrison:{},           // locId -> troop count stationed there
  selectedLocation:null,activeTab:'story',
  activeFactionDlg:null,dlgHistory:[],
  boostedSkill:null,
  originFaction:null,classPerk:'',
};
let pointsRemaining=5;

// TABS
function switchTab(tab){
  state.activeTab=tab;
  ['story','map','factions','skills'].forEach(t=>{
    const v=document.getElementById(t+'-view');
    if(v) v.style.display=t===tab?'block':'none';
    const tb=document.getElementById('tab-'+t);
    if(tb) tb.className='tab'+(t===tab?' active':'');
  });
  document.getElementById('dialogue-screen').style.display='none';
  if(tab==='map'){refreshMap();}
  if(tab==='factions'){renderFactions();}
  if(tab==='skills'){renderSkills();}
}

// SETUP
function adjustStat(s,e){
  const r=e.currentTarget.getBoundingClientRect();
  const v=Math.max(1,Math.min(10,Math.round(Math.max(0,Math.min(1,(e.clientX-r.left)/r.width))*10)));
  const d=v-state.stats[s];
  if(d>0&&d>pointsRemaining)return;
  pointsRemaining-=d; state.stats[s]=v;
  document.getElementById('bar-'+s).style.width=(v/10*100)+'%';
  document.getElementById('val-'+s).textContent=v;
  document.getElementById('points-left').textContent=pointsRemaining;
}

function selectClass(el){
  document.querySelectorAll('.class-card').forEach(c=>c.classList.remove('selected'));
  el.classList.add('selected');
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
  const fName=document.getElementById('faction-name-input').value.trim();
  const cc=document.querySelector('.class-card.selected');
  const err=document.getElementById('setup-error');
  if(!apiKey){showErr(err,'API KEY REQUIRED.');return;}
  if(!name){showErr(err,'SURVIVOR DESIGNATION REQUIRED.');return;}
  if(!fName){showErr(err,'FACTION NAME REQUIRED.');return;}
  if(!cc){showErr(err,'SELECT CLASS.');return;}
  err.style.display='none';
  state.apiKey=apiKey; state.factionName=fName;
  state.character={name,class:cc.dataset.class,...state.stats};
  state.hp=100; state.maxHp=100; state.turn=1; state.history=[];
  state.days=0; state.supplies=50; state.troops=0; state.garrison={};
  state.ownFaction=false; state.originFaction=null; state.classPerk='';
  // Apply class bonuses from CLASSES data
  const cls=CLASSES[cc.dataset.class];
  // Starting location based on origin faction
  const originFdata=cls?FACTION_CLASSES[cls.factionId]:null;
  state.currentLocation=originFdata?.startLocation||'tcnj';
  if(cls){
    // Stat bonuses
    Object.entries(cls.statBonus).forEach(([s,v])=>{
      state.character[s]=Math.max(1,Math.min(10,(state.character[s]||3)+v));
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
  localStorage.setItem(API_KEY,apiKey);
  document.getElementById('panel-name').textContent=name;
  document.getElementById('panel-class').textContent=CLASSES[cc.dataset.class]?.name||cc.dataset.class;
  document.getElementById('panel-faction').textContent=fName;
  document.getElementById('panel-loc').textContent='TCNJ';
  updateStatDisplay(); updateHp(100); updateRes(); renderAPRow();
  showScreen('game-screen');
  switchTab('story');
  startStory();
}

function updateStatDisplay(){['brutality','cunning','charisma','depravity'].forEach(s=>document.getElementById('g-'+s).textContent=state.character[s]);}
function updateHp(v){state.hp=Math.max(0,Math.min(state.maxHp,v));document.getElementById('hp-bar').style.width=(state.hp/state.maxHp*100)+'%';document.getElementById('hp-text').textContent=state.hp+'/'+state.maxHp;}
function updateRes(){
  document.getElementById('res-days').textContent=state.days;
  document.getElementById('res-supplies').textContent=state.supplies;
  document.getElementById('res-troops').textContent=state.troops;
  document.getElementById('res-territories').textContent=Object.values(LOCATIONS).filter(l=>l.ctrl==='player').length;
  document.getElementById('map-day').textContent=state.days;
  document.getElementById('map-sup').textContent=state.supplies;
  document.getElementById('map-trp').textContent=state.troops;
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
  if(t.includes('fight')||t.includes('attack')||t.includes('kill')||t.includes('shoot')||t.includes('stab')) return 'combat';
  if(t.includes('talk')||t.includes('negotiate')||t.includes('persuade')||t.includes('diplomacy')||t.includes('propose')) return 'diplomacy';
  if(t.includes('lead')||t.includes('command')||t.includes('rally')||t.includes('troops')||t.includes('army')) return 'leadership';
  if(t.includes('sneak')||t.includes('stealth')||t.includes('ambush')||t.includes('infiltrate')||t.includes('escape')) return 'stealth';
  if(t.includes('trade')||t.includes('buy')||t.includes('sell')||t.includes('supply')||t.includes('deal')||t.includes('barter')) return 'trade';
  if(t.includes('build')||t.includes('repair')||t.includes('fortif')||t.includes('engineer')||t.includes('sabotage')) return 'engineering';
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
    const card=document.createElement('div'); card.className='faction-card';
    card.innerHTML=`
      <div class="fc-hdr">
        <div class="fc-name">${f.icon} ${f.name}</div>
        <div class="fc-badge" style="color:${rel.color};border-color:${rel.color}">${rel.label}</div>
      </div>
      <div class="fc-leader">${f.leader} &bull; ${f.territory}</div>
      <div class="fc-desc">${f.desc}</div>
      <div class="fc-rel-wrap">
        <div class="fc-rel-lbl"><span>RELATION</span><span>${f.relationScore}/100</span></div>
        <div class="fc-rel-track"><div class="fc-rel-fill" style="width:${f.relationScore}%;background:${rel.color}"></div></div>
      </div>
      <button class="fc-talk-btn" onclick="openDialogue('${f.id}')">[ OPEN CHANNEL WITH ${f.leader.toUpperCase()} ]</button>`;
    list.appendChild(card);
  });
}

// DIALOGUE
function openDialogue(fid){
  const f=FACTIONS[fid]; if(!f)return;
  state.activeFactionDlg=fid; state.dlgHistory=[];
  const rel=getRelState(f);
  document.getElementById('dlg-win-title').textContent='DIALOGUE.EXE -- '+f.name.toUpperCase();
  document.getElementById('port-ascii').textContent=f.leaderPortrait;
  document.getElementById('port-name').textContent=f.leader;
  document.getElementById('port-title').textContent=f.leaderTitle;
  const relEl=document.getElementById('port-rel');
  relEl.textContent=rel.label; relEl.style.color=rel.color; relEl.style.borderColor=rel.color;
  ['story','map','factions','skills'].forEach(t=>{const v=document.getElementById(t+'-view');if(v)v.style.display='none';});
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

You ARE ${f.leader} of ${f.name}. Relation to player: ${rel.label}.
Voice: ${f.voice}
Player: ${state.character.name} / "${state.factionName}" — ${state.troops} troops, ${state.supplies} supplies, ${loc} territories.

Format speech as: "${f.leader}: [words]"
Use *asterisks* for physical actions inline: *slams table* *lights a cigarette*
2-3 sentences. Dark humor. Match the ${rel.label} tone exactly — hostile means hostile.

{"speech":"${f.leader}: ...","choices":[{"label":"A","text":"player line","skill":"diplomacy|combat|trade|stealth|leadership|engineering","rel_change":0},{"label":"B","text":"player line","skill":"...","rel_change":0},{"label":"C","text":"player line","skill":"...","rel_change":0}]}

One diplomatic, one aggressive, one transactional choice. rel_change realistic (-20 to +20).`;
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

async function callDlg(sys,msg){
  const r=await fetch('https://airpg-api-proxi.billybuteau.workers.dev/',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:700,system:sys,messages:[...state.dlgHistory,{role:'user',content:msg}]})
  });
  if(!r.ok){const e=await r.json().catch(()=>({}));throw new Error(e.error?.message||'HTTP '+r.status);}
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
  // "Name: quote" -> styled
  s = s.replace(/"([A-Z][^:"]{1,30}):\s*([^"]+)"/g,
    '<span class="npc-quote"><span class="npc-name">$1:</span> "$2"</span>');
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
  const msg=`Player said (custom): "${text}". React in character and provide 3 new choices.`;
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
  const lSum=Object.entries(LOCATIONS).map(([k,l])=>l.name+':'+l.ctrl).join(' | ');
  const skSum=Object.entries(SKILLS).map(([k,s])=>s.name+' LV'+Math.floor(s.xp/100)+' AP'+s.ap).join(', ');
  const boost=state.boostedSkill?'BOOSTED SKILL THIS TURN: '+state.boostedSkill.toUpperCase():'';
  const sys=`{JSON ONLY. START WITH {. END WITH }. NOTHING OUTSIDE.}

JERSEY WASTELAND 2999. NJ year 2999. Rich fled off-world 2669. Warring city-states. Irradiated Pine Barrens. Jersey slang + 330yr drift. Dark comedy, political gore.

PLAYER: ${state.character.name} (${CLASSES[state.character.class]?.name||state.character.class}${state.originFaction?', ex-'+FACTIONS[state.originFaction]?.name:''}) / "${state.factionName}"
BRU${state.character.brutality} CUN${state.character.cunning} CHA${state.character.charisma} DEP${state.character.depravity} | HP:${state.hp} Day:${state.days} Sup:${state.supplies} Troops(mobile):${state.troops} | @${LOCATIONS[state.currentLocation]?.name||state.currentLocation}
Garrisons: ${Object.entries(state.garrison).filter(([k,v])=>v>0).map(([k,v])=>LOCATIONS[k]?.shortName+':'+v).join(', ')||'none'} | OwnFaction:${state.ownFaction}
Perk: ${state.classPerk||'—'} | Skills: ${skSum}
Map: ${lSum} | Factions: ${fSum}
${boost}

TROOP CONTEXT: ${state.troops} mobile troops with player. More troops = brutal combat options viable. 0-2 troops = stealth/diplomacy forced.
WRITING FORMAT:
- *italics* for actions: *smoke pours from the factory stack.* *He doesn't look up.*
- Named quotes for speech: "Vera Stahl: That's not how Newark works."
- 2-3 tight paragraphs. Earned gore. No fluff.
- NPCs stay in voice: Vera=cold. Tombstone=loud bluster. Finn=cryptic. Marta=direct warmth. Salieri=charming criminal. The Mouth=eloquent cannibal. Architect 7=systems metaphors.
${boost?'- BOOSTED: 4th [STAR] choice using '+state.boostedSkill+' with extra impact.':''}

{"story":"narrative","choices":[{"label":"A","text":"action","flavor":"hint","skill":"force|wit|influence|shadow|grit","ap_reward":1},{"label":"B","text":"action","flavor":"hint","skill":"...","ap_reward":1},{"label":"C","text":"action","flavor":"hint","skill":"...","ap_reward":1}${boost?',{"label":"STAR","text":"boosted action","flavor":"BOOSTED '+state.boostedSkill+'","skill":"'+state.boostedSkill+'","ap_reward":0}':''}],"hp_change":0,"stat_change":{"stat":"none","delta":0},"location_change":{"location":"none","ctrl":"player"},"resource_change":{"supplies":0,"troops":0},"faction_rel_change":{"faction":"none","delta":0},"event_title":"Title"}`;  const r=await fetch('https://airpg-api-proxi.billybuteau.workers.dev/',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1400,system:sys,messages:[...state.history,{role:'user',content:msg}]})
  });
  if(!r.ok){const e=await r.json().catch(()=>({}));throw new Error(e.error?.message||'HTTP '+r.status);}
  const d=await r.json();
  return extractJSON(d.content[0].text);
}

async function startStory(){
  setLoad(true); clearChoices();
  const p=`BEGIN. ${state.character.name} is a ${state.character.class} who just founded "${state.factionName}" at the empty TCNJ campus. Open with a vivid scene establishing the world: Iron Syndicate threatens from Newark to the north, Rust Eagles loom from McGuire to the south, the Hollowed roam the Pine Barrens to the east. Set the stakes of the campaign to unite or dominate the New Jersey wasteland. Put the player in immediate political danger.`;
  try{
    const res=await callClaude(p);
    state.history.push({role:'user',content:p},{role:'assistant',content:JSON.stringify(res)});
    displayResult(res,true);
  }catch(e){showErr(document.getElementById('game-error'),e.message);}
  finally{setLoad(false);}
}

async function makeChoice(idx){
  if(state.isLoading)return;
  const ch=state.currentChoices[idx]; if(!ch)return;
  setLoad(true); disableChoices(true); clearStory();
  document.getElementById('open-wrap').style.display='none';
  const p=`Player chose: "${ch.text}". Show vivid, brutal, funny consequences.`;
  try{
    const res=await callClaude(p);
    state.history.push({role:'user',content:p},{role:'assistant',content:JSON.stringify(res)});
    applyAll(res,ch);
    state.turn++;
    document.getElementById('turn-counter').textContent='> TURN '+String(state.turn).padStart(3,'0');
    if(state.hp<=0){displayDeath();return;}
    displayResult(res,true);
    onTurnEnd();
    state.boostedSkill=null;
  }catch(e){showErr(document.getElementById('game-error'),e.message);disableChoices(false);}
  finally{setLoad(false);}
}

async function submitOpen(){
  const input=document.getElementById('open-input');
  const text=input.value.trim(); if(!text||state.isLoading)return;
  input.value='';
  setLoad(true); disableChoices(true); clearStory();
  document.getElementById('open-wrap').style.display='none';
  const sk=detectSkill(text);
  if(sk) earnAP(sk,2);
  const p=`Player chose a CUSTOM action (typed themselves): "${text}". This bypasses the given options. React honestly -- if clever let it work, if insane let it be equally insane. Continue the story.`;
  try{
    const res=await callClaude(p);
    state.history.push({role:'user',content:p},{role:'assistant',content:JSON.stringify(res)});
    applyAll(res,{skill:sk});
    state.turn++;
    document.getElementById('turn-counter').textContent='> TURN '+String(state.turn).padStart(3,'0');
    if(state.hp<=0){displayDeath();return;}
    displayResult(res,true);
    onTurnEnd();
    state.boostedSkill=null;
  }catch(e){showErr(document.getElementById('game-error'),e.message);disableChoices(false);}
  finally{setLoad(false);}
}

function applyAll(res,ch){
  if(res.hp_change){updateHp(state.hp+res.hp_change);showNotif(res.hp_change<0?'INFLUENCE '+res.hp_change:'INFLUENCE +'+res.hp_change);}
  if(res.stat_change&&res.stat_change.stat!=='none'&&res.stat_change.delta){
    const s=res.stat_change.stat;
    if(state.character[s]!==undefined){
      state.character[s]=Math.max(1,Math.min(10,state.character[s]+res.stat_change.delta));
      const el=document.getElementById('g-'+s);
      el.textContent=state.character[s];
      el.classList.add('stat-flash'); setTimeout(()=>el.classList.remove('stat-flash'),600);
    }
  }
  if(res.resource_change){
    if(res.resource_change.supplies){state.supplies=Math.max(0,state.supplies+res.resource_change.supplies);showNotif('SUPPLIES '+(res.resource_change.supplies>0?'+':'')+res.resource_change.supplies);}
    if(res.resource_change.troops){state.troops=Math.max(0,state.troops+res.resource_change.troops);showNotif('TROOPS '+(res.resource_change.troops>0?'+':'')+res.resource_change.troops);}
  }
  if(res.location_change&&res.location_change.location!=='none'&&LOCATIONS[res.location_change.location]){
    LOCATIONS[res.location_change.location].ctrl=res.location_change.ctrl;
    showNotif(LOCATIONS[res.location_change.location].name+' -> '+res.location_change.ctrl.toUpperCase());
    if(document.getElementById('map-view').style.display!=='none') refreshMap();
  }
  if(res.faction_rel_change&&res.faction_rel_change.faction!=='none'&&FACTIONS[res.faction_rel_change.faction]){
    FACTIONS[res.faction_rel_change.faction].relationScore=Math.max(0,Math.min(100,FACTIONS[res.faction_rel_change.faction].relationScore+(res.faction_rel_change.delta||0)));
    showNotif(FACTIONS[res.faction_rel_change.faction].name+' REL: '+(res.faction_rel_change.delta>0?'+':'')+res.faction_rel_change.delta);
  }
  if(ch&&ch.skill&&SKILLS[ch.skill]) earnAP(ch.skill,ch.ap_reward||1);
  updateRes();
}

// DISPLAY
function displayResult(res,doSave){
  clearChoices();
  document.getElementById('game-error').style.display='none';
  if(res.event_title) document.getElementById('story-win-title').textContent='NARRATIVE_ENGINE.EXE -- '+res.event_title.toUpperCase();
  const el=document.getElementById('story-text');
  typeText(el,res.story||'',()=>{
    state.currentChoices=res.choices||[];
    renderChoices(res.choices);
    document.getElementById('open-wrap').style.display='flex';
    if(doSave) saveGame(el.innerHTML);
  });
}

function typeText(el,text,cb){
  el.innerHTML='';
  const formatted=formatText(text);
  const cur=document.createElement('span'); cur.className='cursor'; el.appendChild(cur);
  if(text.length>900){el.innerHTML=formatted;cb&&cb();return;}
  let i=0;
  // Type plain text char by char, then swap to formatted HTML at end
  function t(){
    if(i<text.length){cur.insertAdjacentText('beforebegin',text[i++]);setTimeout(t,12);}
    else{el.innerHTML=formatted;cb&&cb();}
  }
  t();
}

function renderChoices(choices){
  const c=document.getElementById('choices-container'); c.innerHTML='';
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
  clearSave();
  document.getElementById('story-win-title').textContent='GAME OVER -- INFLUENCE: 0%';
  const el=document.getElementById('story-text');
  typeText(el,`INFLUENCE RATING: 0%\nCRITICAL FAILURE\n\n"${state.factionName}" is no more.\n\nYour allies sold you out for canned soup. Your name is spray-painted on Turnpike barriers as a warning to the ambitious. Children in NJ 2999 will be told your story to frighten them into compliance.\n\nYou lasted ${state.turn} turns before the wasteland's politics devoured you completely.\n\nSomewhere in the ruins, a new fool is already raising a flag.`,()=>{
    document.getElementById('choices-container').innerHTML='<button class="begin-btn" onclick="restartGame()" style="margin-top:10px">[ REBOOT -- TRY AGAIN ]</button>';
    document.getElementById('open-wrap').style.display='none';
  });
}

function clearStory(){document.getElementById('story-text').innerHTML='';}
function clearChoices(){document.getElementById('choices-container').innerHTML='';}
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
function startLoad(msgs, label){
  clearTimeout(_loadTmr);
  _loadStep=0;
  document.getElementById('load-turn-lbl').textContent=label||'';
  document.getElementById('load-overlay').classList.add('active');
  function tick(){
    const m=msgs[Math.min(_loadStep,msgs.length-1)];
    document.getElementById('load-status-txt').innerHTML=m[0]+'<span class="load-dots"></span>';
    document.getElementById('load-sub-txt').textContent=m[1];
    document.getElementById('pip-label').textContent=m[2];
    document.getElementById('load-bar-fill').style.width=m[3]+'%';
    _loadStep++;
    if(_loadStep<msgs.length) _loadTmr=setTimeout(tick,800+Math.random()*500);
  }
  tick();
}
function stopLoad(){
  clearTimeout(_loadTmr);
  document.getElementById('load-bar-fill').style.width='100%';
  setTimeout(()=>{
    document.getElementById('load-overlay').classList.remove('active');
    document.getElementById('load-bar-fill').style.width='0%';
  },280);
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
function refreshMap(){
  Object.entries(LOCATIONS).forEach(([id,loc])=>{
    const node=document.getElementById('node-'+id); if(!node)return;
    let cls='loc-node ctrl-'+loc.ctrl;
    if(id===state.currentLocation) cls+=' current-loc';
    node.setAttribute('class',cls);
  });
  PATROL_ROUTES.forEach(r=>{
    const road=document.getElementById('road-'+r.from+'-'+r.to)||document.getElementById('road-'+r.to+'-'+r.from);
    if(road) road.classList.add('patrolled');
  });
  document.getElementById('map-cur-loc').textContent=LOCATIONS[state.currentLocation]?.shortName||state.currentLocation;
  updateRes();
  animatePatrols();
}

let patrolAnimating=false;
function animatePatrols(){
  if(!patrolAnimating){patrolAnimating=true;}
  const p1=document.getElementById('patrol1');
  if(p1){const t=(Date.now()/4500)%1;p1.setAttribute('cx',(332+(187-332)*t).toFixed(1));p1.setAttribute('cy',(149+(259-149)*t).toFixed(1));}
  const p2=document.getElementById('patrol2');
  if(p2){const t=(Date.now()/5500)%1;p2.setAttribute('cx',(231+(196-231)*t).toFixed(1));p2.setAttribute('cy',(321+(273-321)*t).toFixed(1));}
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
  let px=(loc.svgX*scaleX)+svgRect.left-mapRect.left;
  let py=(loc.svgY*scaleY)+svgRect.top-mapRect.top+20;
  if(px+190>mapRect.width-5) px=mapRect.width-195;
  if(px<5) px=5;
  if(py+250>mapRect.height) py=Math.max(5,(loc.svgY*scaleY)-260);
  const fd=loc.faction&&loc.faction!=='player'?FACTIONS[loc.faction]:null;
  const rel=fd?getRelState(fd):null;
  document.getElementById('lpop-tb').textContent=loc.name;
  document.getElementById('lpop-name').textContent=loc.name;
  const leaderTxt=fd?'Leader: '+fd.leader:loc.ctrl==='player'?'Controlled by '+state.factionName:'Unclaimed';
  document.getElementById('lpop-leader').textContent=leaderTxt;
  const ctrlEl=document.getElementById('lpop-ctrl');
  const ctrlLabel=loc.ctrl==='player'?(state.factionName?'CONTROLLED BY '+state.factionName.toUpperCase():'YOUR TERRITORY'):
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
  } else {
    const hasPatrol=PATROL_ROUTES.some(r=>(r.from===locId||r.to===locId)&&(r.from===state.currentLocation||r.to===state.currentLocation));
    document.getElementById('lpop-cost').innerHTML=
      `TRAVEL: <span>${loc.travelDays}d / ${loc.travelSupplies} supplies</span>`+
      (hasPatrol?'<br><span style="color:var(--blood)">PATROL ROUTE - TROOP RISK</span>':'')+
      (rel?'<br>REL: <span style="color:'+rel.color+'">'+rel.label+'</span>':'');
    tBtn.textContent='[ TRAVEL ]';
    tBtn.disabled=state.supplies<loc.travelSupplies;
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
    gBtn.onclick=()=>{ closePopup(); claimTCNJ(); };
    gBtn.disabled=false;
  } else {
    gBtn.style.display='none';
  }
  popup.style.left=px+'px'; popup.style.top=py+'px'; popup.style.display='block';
}

function closePopup(){document.getElementById('loc-popup').style.display='none';state.selectedLocation=null;}

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
  // Keep available troops display fresh
  const orig_garrisonAdd=garrisonAdd, orig_garrisonRemove=garrisonRemove;
  function refreshAvail(){ const el=document.getElementById('avail-troops-g');if(el)el.textContent=state.troops; }
  modal.querySelector('button:nth-child(1)').addEventListener('click',refreshAvail);
  modal.querySelector('button:nth-child(3)').addEventListener('click',refreshAvail);
}

async function travelToSelected(){
  const locId=state.selectedLocation;
  if(!locId||locId===state.currentLocation)return;
  const loc=LOCATIONS[locId];
  if(state.supplies<loc.travelSupplies){showNotif('NOT ENOUGH SUPPLIES');return;}
  closePopup();
  state.supplies-=loc.travelSupplies; state.days+=loc.travelDays;
  let troopLost=0;
  const hasPatrol=PATROL_ROUTES.some(r=>(r.from===locId||r.to===locId)&&(r.from===state.currentLocation||r.to===state.currentLocation));
  if(hasPatrol&&loc.travelTroopRisk){troopLost=Math.floor(Math.random()*3)+1;state.troops=Math.max(0,state.troops-troopLost);}
  const prevLoc=state.currentLocation;
  state.currentLocation=locId;
  updateRes();
  document.getElementById('panel-loc').textContent=loc.shortName;
  refreshMap(); switchTab('story');
  showNotif('TRAVELING TO '+loc.name+'...');
  const fd=loc.faction&&loc.faction!=='player'?FACTIONS[loc.faction]:null;
  const rel=fd?getRelState(fd):null;
  const msg=`Player traveled from ${LOCATIONS[prevLoc].name} to ${loc.name}. Cost: ${loc.travelDays} days, ${loc.travelSupplies} supplies.${troopLost>0?' Lost '+troopLost+' troops to patrol ambush.':''} Generate a vivid travel/arrival scene. Location status: ${loc.ctrl==='hostile'?'HOSTILE territory of '+(fd?.name||'unknown faction'):loc.ctrl==='neutral'?'NEUTRAL territory, '+(fd?.name||''):'player-controlled'}. ${fd?'The faction leader is '+fd.leader+' -- '+fd.voice:'Nobody runs this place yet.'} Features: ${loc.features.join(', ')}. ${loc.flavor}`;
  setLoad(true); clearChoices(); clearStory();
  document.getElementById('open-wrap').style.display='none';
  try{
    const res=await callClaude(msg);
    state.history.push({role:'user',content:msg},{role:'assistant',content:JSON.stringify(res)});
    applyAll(res,{});
    state.turn++;
    document.getElementById('turn-counter').textContent='> TURN '+String(state.turn).padStart(3,'0');
    displayResult(res,true);
  }catch(e){showErr(document.getElementById('game-error'),e.message);}
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
}

// ══ CLAIM TCNJ ══
function claimTCNJ(){
  if(LOCATIONS.tcnj.ctrl!=='unclaimed'){showNotif('ALREADY CLAIMED');return;}
  LOCATIONS.tcnj.ctrl='player';
  LOCATIONS.tcnj.faction='player';
  state.ownFaction=true;
  showNotif('TCNJ CLAIMED — YOUR FACTION BEGINS HERE');
  refreshMap();
  // Trigger a narrative beat
  const msg='The player has just claimed TCNJ as their own faction headquarters. Generate a vivid scene: the player standing in the empty campus, declaring it theirs. Make it feel significant — the beginning of something. Other factions will hear about this.';
  switchTab('story');
  setLoad(true); clearChoices(); clearStory();
  callClaude(msg).then(res=>{
    state.history.push({role:'user',content:msg},{role:'assistant',content:JSON.stringify(res)});
    state.turn++;
    displayResult(res,true);
  }).catch(e=>showErr(document.getElementById('game-error'),e.message))
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
    }).catch(e=>showErr(document.getElementById('game-error'),e.message))
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
  const msg=`RAID BATTLE: ${raider.name} (${raider.leader}) attacking ${loc.name} with ~${raiderForce} fighters. Player joins the defense with ${state.troops} personal troops + ${garrison} garrison = ${playerForce} total defenders. Player stats: Brutality ${state.character.brutality}, Combat skills: ${Math.floor(SKILLS.combat.xp/100)} level. Generate a detailed gritty battle scene. Outcome: ${playerForce >= raiderForce ? 'player wins but takes losses' : 'brutal fight, player barely holds or loses'}. Show real consequences — troop losses, territory damage, what the raider leader does when beaten/victorious.`;
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
  }).catch(e=>showErr(document.getElementById('game-error'),e.message))
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
  let gained=0;
  Object.entries(LOCATIONS).forEach(([k,loc])=>{
    if(loc.ctrl==='player'){
      gained+=loc.supplyPerTurn||0;
    }
  });
  if(gained>0){
    state.supplies+=gained;
    updateRes();
    showNotif('TERRITORY INCOME: +'+gained+' SUPPLIES');
  }
}

// ══ TURN HOOK — runs after each narrative turn ══
function onTurnEnd(){
  state.days++;
  collectPassiveIncome();
  // Check raids every 3 turns
  if(state.turn%3===0) checkForRaids();
}

// PERSISTENCE
const SAVE_KEY='jw2999_v4_save', API_KEY='jw2999_apikey';
function saveGame(html){
  try{
    const locStates={};Object.entries(LOCATIONS).forEach(([k,v])=>locStates[k]=v.ctrl);
    const fRels={};Object.entries(FACTIONS).forEach(([k,v])=>fRels[k]=v.relationScore);
    const skData={};Object.entries(SKILLS).forEach(([k,v])=>skData[k]={xp:v.xp,ap:v.ap});
    localStorage.setItem(SAVE_KEY,JSON.stringify({
      character:state.character,factionName:state.factionName,
      hp:state.hp,maxHp:state.maxHp,turn:state.turn,
      history:state.history,currentChoices:state.currentChoices,lastStoryHTML:html,
      days:state.days,supplies:state.supplies,troops:state.troops,
      currentLocation:state.currentLocation,locStates,fRels,skData,savedAt:Date.now()
    }));
  }catch(e){}
}
function loadSave(){try{const r=localStorage.getItem(SAVE_KEY);return r?JSON.parse(r):null;}catch(e){return null;}}
function clearSave(){localStorage.removeItem(SAVE_KEY);}

function resumeGame(save){
  state.character=save.character; state.factionName=save.factionName||'Unknown Faction';
  state.hp=save.hp; state.maxHp=save.maxHp; state.turn=save.turn;
  state.history=save.history||[]; state.currentChoices=save.currentChoices||[];
  state.days=save.days||0; state.supplies=save.supplies||50; state.troops=save.troops||10;
  state.currentLocation=save.currentLocation||'tcnj';
  state.apiKey=localStorage.getItem(API_KEY)||'';
  if(save.locStates) Object.entries(save.locStates).forEach(([k,v])=>{if(LOCATIONS[k])LOCATIONS[k].ctrl=v;});
  if(save.fRels) Object.entries(save.fRels).forEach(([k,v])=>{if(FACTIONS[k])FACTIONS[k].relationScore=v;});
  if(save.skData) Object.entries(save.skData).forEach(([k,v])=>{if(SKILLS[k]){SKILLS[k].xp=v.xp;SKILLS[k].ap=v.ap;}});
  document.getElementById('panel-name').textContent=state.character.name;
  document.getElementById('panel-class').textContent=state.character.class;
  document.getElementById('panel-faction').textContent=state.factionName;
  document.getElementById('panel-loc').textContent=LOCATIONS[state.currentLocation]?.shortName||'TCNJ';
  updateStatDisplay(); updateHp(state.hp); updateRes(); renderAPRow();
  document.getElementById('turn-counter').textContent='> TURN '+String(state.turn).padStart(3,'0');
  if(save.lastStoryHTML) document.getElementById('story-text').innerHTML=save.lastStoryHTML;
  if(state.currentChoices.length) renderChoices(state.currentChoices);
  document.getElementById('open-wrap').style.display='flex';
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
  el.innerHTML=`<div class="wtb"><div class="wtt"><span>&#128190;</span> SAVE_STATE.DAT</div><div class="wbs"><div class="wbtn">?</div></div></div><div class="dlg-body-save"><div class="dlg-icon">&#128190;</div><div class="dlg-content"><div class="dlg-title">SAVE FILE DETECTED</div><div class="dlg-sub">SURVIVOR: ${save.character.name}<br>FACTION: ${save.factionName||'-'}<br>${t} | INFLUENCE: ${save.hp}% | DAY ${save.days||0}</div><div class="dlg-btns"><button class="w95btn" onclick="resumeGame(window._ps)">Continue</button><button class="w95btn" onclick="discardSave()">New Game</button></div></div></div>`;
  const target=document.getElementById('story-select');
  target.insertBefore(el,target.firstChild);
}
function hideContinue(){const b=document.getElementById('cont-dlg');if(b)b.remove();}
function discardSave(){if(!confirm('DELETE SAVE FILE?'))return;clearSave();hideContinue();}
function restartGame(){
  if(!confirm('REBOOT CAMPAIGN?\nAll progress erased.'))return;
  clearSave();
  state.history=[]; state.turn=1; state.hp=100;
  state.days=0; state.supplies=50; state.troops=10; state.currentLocation='tcnj';
  state.factionName=''; state.boostedSkill=null; state.originFaction=null; state.classPerk=''; state.garrison={}; state.ownFaction=false; state.troops=0;
  Object.keys(LOCATIONS).forEach(k=>{LOCATIONS[k].ctrl=k==='tcnj'?'unclaimed':k==='newark'||k==='mcguire'?'faction':'faction';});
  Object.values(FACTIONS).forEach(f=>{
    f.relationScore=f.id==='iron_syndicate'?10:f.id==='rust_eagles'?15:f.id==='the_hollowed'?0:f.id==='subnet'?40:f.id==='mountain_covenant'?45:50;
  });
  Object.values(SKILLS).forEach(s=>{s.xp=0;s.ap=0;});
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
    name:'JERSEY WASTELAND 2999',
    tag:'Post-Apoc NJ // Political Gore Comedy',
    setupHint:'TCNJ IS EMPTY. YOU ARE BUILDING SOMETHING FROM NOTHING.',
    factionPlaceholder:'e.g. The New Jersey Accord',
    namePlaceholder:'e.g. Governor Skeez Malvetti',
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
  const fnInput=document.getElementById('faction-name-input');
  if(fnInput) fnInput.placeholder=story.factionPlaceholder;
  const cnInput=document.getElementById('char-name');
  if(cnInput) cnInput.placeholder=story.namePlaceholder;
  // Show setup screen
  showScreen('setup-screen');
}

function backToStories(){
  showScreen('home');
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', function() {
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
});
