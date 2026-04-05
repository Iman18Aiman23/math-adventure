/**
 * Common Objects — 100 items grouped by theme
 * Themes: Nature (35), School (35), Home (30)
 * Prompts reflect the object type (e.g. 'What animal is this?' / 'Haiwan apa ini?')
 */

const PROMPTS = {
  animal:    { en: 'What animal is this?',  ms: 'Haiwan apa ini?' },
  plant:     { en: 'What plant is this?',   ms: 'Tumbuhan apa ini?' },
  weather:   { en: 'What weather is this?', ms: 'Cuaca apa ini?' },
  landscape: { en: 'What is this?',         ms: 'Apa ini?' },
  stationery:{ en: 'What is this?',         ms: 'Apa ini?' },
  classroom: { en: 'What is this?',         ms: 'Apa ini?' },
  subject:   { en: 'What subject is this?', ms: 'Subjek apa ini?' },
  kitchen:   { en: 'What is this?',         ms: 'Apa ini?' },
  furniture: { en: 'What is this?',         ms: 'Apa ini?' },
  household: { en: 'What is this?',         ms: 'Apa ini?' },
};

// [enWord, msWord, icon, enMatches(csv), msMatches(csv)]
const NATURE_ANIMALS = [
  ['cat','kucing','🐱','cats,cap,cut,kit','kucing,kucin,kuchen'],
  ['dog','anjing','🐶','dogs,dock,dug,dark','anjing,anjin,anjeng'],
  ['fish','ikan','🐟','fishes,dish,wish,fin','ikan,ikang,iken'],
  ['bird','burung','🐦','birds,word,herd,burn','burung,burun,burong'],
  ['frog','katak','🐸','frogs,fog,log,frock','katak,katek,katok'],
  ['ant','semut','🐜','ants,and,aunt,can','semut,semot,semu'],
  ['bee','lebah','🐝','bees,be,pea,see','lebah,leba,lebeh'],
  ['cow','lembu','🐄','cows,how,now,call','lembu,lembo,lemba'],
  ['hen','ayam','🐔','hens,ten,pen,when','ayam,ayem,ayan'],
  ['duck','itik','🦆','ducks,luck,truck,dark','itik,itit,itek'],
  ['goat','kambing','🐐','goats,coat,boat,got','kambing,kambin,kambeng'],
  ['lamb','anak biri','🐑','lambs,lamp,lam,lab','biri,bibi,bire'],
  ['bear','beruang','🐻','bears,bare,beer,pier','beruang,beruan,berueng'],
  ['deer','rusa','🦌','deers,dear,here,ear','rusa,ruse,rus'],
  ['owl','burung hantu','🦉','owls,out,our,howl','hantu,hantoo,hanto'],
];

const NATURE_PLANTS = [
  ['tree','pokok','🌳','trees,three,free,tea','pokok,poko,pokoh'],
  ['flower','bunga','🌸','flowers,flour,tower,power','bunga,bunge,bung'],
  ['leaf','daun','🍃','leaves,leave,left,beef','daun,daon,dawn'],
  ['seed','biji','🌱','seeds,see,seat,speed','biji,bije,bij'],
  ['root','akar','🪹','roots,route,roof,room','akar,akal,aker'],
  ['bush','semak','🌿','bushes,push,gush,brush','semak,semek,sema'],
  ['vine','sulur','🥀','vines,wine,fine,line','sulur,sulor,sulu'],
  ['moss','lumut','🌲','mosses,boss,toss,lost','lumut,lumot,lumo'],
  ['fern','paku','🪴','ferns,burn,turn,firm','paku,pakoo,pak'],
  ['palm','kelapa','🌴','palms,calm,bomb,arm','kelapa,kelape,kelap'],
];

const NATURE_WEATHER = [
  ['sun','matahari','☀️','sunny,son,some,fun','matahari,matahare,mathari'],
  ['rain','hujan','🌧️','rains,train,brain,lane','hujan,hujang,hujen'],
  ['cloud','awan','☁️','clouds,loud,crowd,proud','awan,awang,awen'],
  ['wind','angin','🌬️','winds,win,wink,wing','angin,angeng,angi'],
  ['snow','salji','❄️','snows,know,show,slow','salji,salje,salj'],
];

const NATURE_LANDSCAPE = [
  ['mountain','gunung','⛰️','mountains,fountain,mount,counting','gunung,gunong,gunun'],
  ['river','sungai','🏞️','rivers,liver,silver,shiver','sungai,sunge,sunga'],
  ['lake','tasik','🌊','lakes,lace,late,lay','tasik,taksi,tasek'],
  ['rock','batu','🪨','rocks,lock,knock,block','batu,bato,bat'],
  ['sand','pasir','🏖️','sands,hand,land,band','pasir,pasel,paser'],
];

const SCHOOL_STATIONERY = [
  ['pen','pen','🖊️','pens,pin,pan,ten','pen,peng,pein'],
  ['pencil','pensel','✏️','pencils,cancel,tinsel,council','pensel,pensil,pensal'],
  ['book','buku','📖','books,cook,look,hook','buku,bukoo,buk'],
  ['ruler','pembaris','📏','rulers,cooler,fooler,drooler','pembaris,pembares,pembari'],
  ['eraser','pemadam','🧽','erasers,racer,chaser,laser','pemadam,pemadem,pemada'],
  ['glue','gam','🧴','glues,blue,clue,flew','gam,gem,gum'],
  ['tape','pita','🩹','tapes,cape,drape,scrape','pita,pite,pit'],
  ['paper','kertas','📄','papers,caper,taper,vapor','kertas,kertes,kerta'],
  ['chalk','kapur','🖊️','chalks,walk,talk,hawk','kapur,kapor,kapu'],
  ['crayon','krayon','🖍️','crayons,rayon,craze,crazy','krayon,kreyon,krayo'],
  ['marker','penanda','🖍️','markers,darker,parker,barker','penanda,penande,penand'],
  ['scissors','gunting','✂️','scissor,sister,whisper,mister','gunting,guntin,gunteng'],
  ['clip','klip','📎','clips,lip,slip,flip','klip,kelip,klep'],
  ['stapler','stapler','🗜️','staplers,staple,stable,table','stapler,stepler,staple'],
  ['folder','folder','📁','folders,older,holder,shoulder','folder,folde,foldel'],
];

const SCHOOL_CLASSROOM = [
  ['desk','meja','🪑','desks,dust,dusk,disk','meja,meje,mej'],
  ['chair','kerusi','🪑','chairs,share,hair,care','kerusi,keruse,kerus'],
  ['board','papan','🏫','boards,bored,broad,lord','papan,papang,papan'],
  ['clock','jam','🕰️','clocks,lock,block,knock','jam,jem,jm'],
  ['bell','loceng','🔔','bells,tell,fell,sell','loceng,locen,loseng'],
  ['bag','beg','🎒','bags,back,bad,bat','beg,bag,bek'],
  ['map','peta','🗺️','maps,cap,gap,nap','peta,pete,pet'],
  ['flag','bendera','🚩','flags,bag,lag,drag','bendera,bendere,bender'],
  ['globe','glob','🌍','globes,lobe,robe,probe','glob,globe,glop'],
  ['lamp','lampu','💡','lamps,clamp,damp,camp','lampu,lampoo,lamp'],
];

const SCHOOL_SUBJECTS = [
  ['math','matematik','🧮','maths,mass,bath,path','matematik,matemati,matek'],
  ['art','seni','🎨','arts,heart,cart,dart','seni,sene,sen'],
  ['music','muzik','🎵','musics,muse,amuse,views','muzik,muzek,muzi'],
  ['science','sains','🔬','sciences,signs,silence,license','sains,saens,sain'],
  ['reading','bacaan','📖','readings,leading,feeding,needing','bacaan,bacaen,baca'],
  ['writing','penulisan','✍️','writings,riding,biting,lighting','penulisan,penulisn,penulise'],
  ['sports','sukan','⚽','sport,short,sort,court','sukan,suken,suka'],
  ['english','inggeris','🇬🇧','englishes,angles,singles,mingles','inggeris,inggeres,inggeri'],
  ['game','permainan','🎮','games,came,fame,name','permainan,permaine,permain'],
  ['quiz','kuiz','📝','quizzes,whiz,fizz,his','kuiz,kuez,kuis'],
];

const HOME_KITCHEN = [
  ['cup','cawan','☕','cups,pup,cut,cap','cawan,cawang,cawen'],
  ['plate','pinggan','🍽️','plates,late,gate,state','pinggan,pinggen,pingga'],
  ['bowl','mangkuk','🥣','bowls,toll,soul,pole','mangkuk,mangkok,mangku'],
  ['spoon','sudu','🥄','spoons,moon,soon,noon','sudu,sudoo,sud'],
  ['fork','garpu','🍴','forks,four,work,cork','garpu,garpoo,garpo'],
  ['knife','pisau','🔪','knives,nice,wife,life','pisau,pisao,pisa'],
  ['pot','periuk','🍲','pots,hot,lot,not','periuk,periok,periu'],
  ['pan','kuali','🍳','pans,can,fan,man','kuali,kuale,kual'],
  ['stove','dapur','🎛️','stoves,drove,grove,dove','dapur,dapor,dapu'],
  ['sink','sinki','🚰','sinks,think,drink,link','sinki,sinkee,sink'],
];

const HOME_FURNITURE = [
  ['bed','katil','🛏️','beds,red,fed,head','katil,katel,kate'],
  ['door','pintu','🚪','doors,floor,more,four','pintu,pintoo,pint'],
  ['table','meja','🪑','tables,cable,able,label','meja,meje,mej'],
  ['sofa','sofa','🛋️','sofas,solar,so far,suffer','sofa,sofe,sof'],
  ['mirror','cermin','🪞','mirrors,nearer,clearer,mirror','cermin,cerming,cerme'],
  ['window','tingkap','🪟','windows,wind,widow,willow','tingkap,tingkep,tingka'],
  ['rug','permaidani','🧺','rugs,bug,mug,hug','permaidani,dani,permaide'],
  ['shelf','rak','📚','shelves,self,else,twelve','rak,rek,rahk'],
  ['key','kunci','🔑','keys,ease,please,freeze','kunci,kunce,kunc'],
  ['wardrobe','almari','🚪','wardrobes,robe,globe,probe','almari,almare,almar'],
];

const HOME_HOUSEHOLD = [
  ['broom','penyapu','🧹','brooms,room,bloom,doom','penyapu,penyapoo,penyap'],
  ['soap','sabun','🧼','soaps,hope,rope,scope','sabun,sabong,saboon'],
  ['towel','tuala','🧻','towels,tower,vowel,trowel','tuala,tuale,tual'],
  ['fan','kipas','🪭','fans,can,man,van','kipas,kipes,kipa'],
  ['iron','seterika','👕','irons,lion,try on,buy on','seterika,seterike,seterik'],
  ['mop','mop','🧹','mops,hop,pop,stop','mop,mope,mup'],
  ['bucket','baldi','🪣','buckets,basket,socket,ticket','baldi,balde,bald'],
  ['box','kotak','📦','boxes,fox,socks,locks','kotak,kotek,kota'],
  ['lock','kunci','🔒','locks,clock,knock,block','kunci,kunce,kunc'],
  ['candle','lilin','🕯️','candles,handle,sandal,cancel','lilin,lileng,lili'],
];

// ── Builder ────────────────────────────────────────────────────────────────────
function build(data, theme, subtheme, promptKey, offset) {
  const p = PROMPTS[promptKey];
  return data.map(([en, ms, icon, enM, msM], i) => ({
    id: `obj_${String(offset + i + 1).padStart(3, '0')}`,
    icon,
    theme,
    subtheme,
    ms: { word: ms, prompt: p.ms, matches: [ms, en, ...msM.split(',')] },
    en: { word: en, prompt: p.en, matches: [en, ...enM.split(',')] },
  }));
}

const common_objects = [
  // ── Nature (35) ──
  ...build(NATURE_ANIMALS,    'nature', 'animals',   'animal',    0),
  ...build(NATURE_PLANTS,     'nature', 'plants',    'plant',     15),
  ...build(NATURE_WEATHER,    'nature', 'weather',   'weather',   25),
  ...build(NATURE_LANDSCAPE,  'nature', 'landscape', 'landscape', 30),
  // ── School (35) ──
  ...build(SCHOOL_STATIONERY, 'school', 'stationery','stationery',35),
  ...build(SCHOOL_CLASSROOM,  'school', 'classroom', 'classroom', 50),
  ...build(SCHOOL_SUBJECTS,   'school', 'subjects',  'subject',   60),
  // ── Home (30) ──
  ...build(HOME_KITCHEN,      'home',   'kitchen',   'kitchen',   70),
  ...build(HOME_FURNITURE,    'home',   'furniture', 'furniture', 80),
  ...build(HOME_HOUSEHOLD,    'home',   'household', 'household', 90),
];

export default common_objects;
