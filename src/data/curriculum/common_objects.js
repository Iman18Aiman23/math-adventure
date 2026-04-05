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
  ['cat','kucing','cat','cats,cap,cut,kit','kucing,kucin,kuchen'],
  ['dog','anjing','cat','dogs,dock,dug,dark','anjing,anjin,anjeng'],
  ['fish','ikan','fish','fishes,dish,wish,fin','ikan,ikang,iken'],
  ['bird','burung','bird','birds,word,herd,burn','burung,burun,burong'],
  ['frog','katak','tree','frogs,fog,log,frock','katak,katek,katok'],
  ['ant','semut','star','ants,and,aunt,can','semut,semot,semu'],
  ['bee','lebah','flower','bees,be,pea,see','lebah,leba,lebeh'],
  ['cow','lembu','cat','cows,how,now,call','lembu,lembo,lemba'],
  ['hen','ayam','bird','hens,ten,pen,when','ayam,ayem,ayan'],
  ['duck','itik','bird','ducks,luck,truck,dark','itik,itit,itek'],
  ['goat','kambing','cat','goats,coat,boat,got','kambing,kambin,kambeng'],
  ['lamb','anak biri','cat','lambs,lamp,lam,lab','biri,bibi,bire'],
  ['bear','beruang','cat','bears,bare,beer,pier','beruang,beruan,berueng'],
  ['deer','rusa','cat','deers,dear,here,ear','rusa,ruse,rus'],
  ['owl','burung hantu','bird','owls,out,our,howl','hantu,hantoo,hanto'],
];

const NATURE_PLANTS = [
  ['tree','pokok','tree','trees,three,free,tea','pokok,poko,pokoh'],
  ['flower','bunga','flower','flowers,flour,tower,power','bunga,bunge,bung'],
  ['leaf','daun','tree','leaves,leave,left,beef','daun,daon,dawn'],
  ['seed','biji','apple','seeds,see,seat,speed','biji,bije,bij'],
  ['root','akar','tree','roots,route,roof,room','akar,akal,aker'],
  ['bush','semak','tree','bushes,push,gush,brush','semak,semek,sema'],
  ['vine','sulur','tree','vines,wine,fine,line','sulur,sulor,sulu'],
  ['moss','lumut','tree','mosses,boss,toss,lost','lumut,lumot,lumo'],
  ['fern','paku','tree','ferns,burn,turn,firm','paku,pakoo,pak'],
  ['palm','kelapa','tree','palms,calm,bomb,arm','kelapa,kelape,kelap'],
];

const NATURE_WEATHER = [
  ['sun','matahari','sun','sunny,son,some,fun','matahari,matahare,mathari'],
  ['rain','hujan','rain','rains,train,brain,lane','hujan,hujang,hujen'],
  ['cloud','awan','cloud','clouds,loud,crowd,proud','awan,awang,awen'],
  ['wind','angin','wave','winds,win,wink,wing','angin,angeng,angi'],
  ['snow','salji','cloud','snows,know,show,slow','salji,salje,salj'],
];

const NATURE_LANDSCAPE = [
  ['mountain','gunung','mountain','mountains,fountain,mount,counting','gunung,gunong,gunun'],
  ['river','sungai','wave','rivers,liver,silver,shiver','sungai,sunge,sunga'],
  ['lake','tasik','wave','lakes,lace,late,lay','tasik,taksi,tasek'],
  ['rock','batu','mountain','rocks,lock,knock,block','batu,bato,bat'],
  ['sand','pasir','sun','sands,hand,land,band','pasir,pasel,paser'],
];

const SCHOOL_STATIONERY = [
  ['pen','pen','book','pens,pin,pan,ten','pen,peng,pein'],
  ['pencil','pensel','book','pencils,cancel,tinsel,council','pensel,pensil,pensal'],
  ['book','buku','book','books,cook,look,hook','buku,bukoo,buk'],
  ['ruler','pembaris','book','rulers,cooler,fooler,drooler','pembaris,pembares,pembari'],
  ['eraser','pemadam','hand','erasers,racer,chaser,laser','pemadam,pemadem,pemada'],
  ['glue','gam','star','glues,blue,clue,flew','gam,gem,gum'],
  ['tape','pita','ring','tapes,cape,drape,scrape','pita,pite,pit'],
  ['paper','kertas','book','papers,caper,taper,vapor','kertas,kertes,kerta'],
  ['chalk','kapur','star','chalks,walk,talk,hawk','kapur,kapor,kapu'],
  ['crayon','krayon','star','crayons,rayon,craze,crazy','krayon,kreyon,krayo'],
  ['marker','penanda','star','markers,darker,parker,barker','penanda,penande,penand'],
  ['scissors','gunting','star','scissor,sister,whisper,mister','gunting,guntin,gunteng'],
  ['clip','klip','ring','clips,lip,slip,flip','klip,kelip,klep'],
  ['stapler','stapler','star','staplers,staple,stable,table','stapler,stepler,staple'],
  ['folder','folder','book','folders,older,holder,shoulder','folder,folde,foldel'],
];

const SCHOOL_CLASSROOM = [
  ['desk','meja','house','desks,dust,dusk,disk','meja,meje,mej'],
  ['chair','kerusi','house','chairs,share,hair,care','kerusi,keruse,kerus'],
  ['board','papan','book','boards,bored,broad,lord','papan,papang,papan'],
  ['clock','jam','clock','clocks,lock,block,knock','jam,jem,jm'],
  ['bell','loceng','music','bells,tell,fell,sell','loceng,locen,loseng'],
  ['bag','beg','house','bags,back,bad,bat','beg,bag,bek'],
  ['map','peta','book','maps,cap,gap,nap','peta,pete,pet'],
  ['flag','bendera','star','flags,bag,lag,drag','bendera,bendere,bender'],
  ['globe','glob','ball','globes,lobe,robe,probe','glob,globe,glop'],
  ['lamp','lampu','candle','lamps,clamp,damp,camp','lampu,lampoo,lamp'],
];

const SCHOOL_SUBJECTS = [
  ['math','matematik','dice','maths,mass,bath,path','matematik,matemati,matek'],
  ['art','seni','star','arts,heart,cart,dart','seni,sene,sen'],
  ['music','muzik','music','musics,muse,amuse,views','muzik,muzek,muzi'],
  ['science','sains','star','sciences,signs,silence,license','sains,saens,sain'],
  ['reading','bacaan','book','readings,leading,feeding,needing','bacaan,bacaen,baca'],
  ['writing','penulisan','book','writings,riding,biting,lighting','penulisan,penulisn,penulise'],
  ['sports','sukan','ball','sport,short,sort,court','sukan,suken,suka'],
  ['english','inggeris','book','englishes,angles,singles,mingles','inggeris,inggeres,inggeri'],
  ['game','permainan','dice','games,came,fame,name','permainan,permaine,permain'],
  ['quiz','kuiz','star','quizzes,whiz,fizz,his','kuiz,kuez,kuis'],
];

const HOME_KITCHEN = [
  ['cup','cawan','cup','cups,pup,cut,cap','cawan,cawang,cawen'],
  ['plate','pinggan','cup','plates,late,gate,state','pinggan,pinggen,pingga'],
  ['bowl','mangkuk','cup','bowls,toll,soul,pole','mangkuk,mangkok,mangku'],
  ['spoon','sudu','fork','spoons,moon,soon,noon','sudu,sudoo,sud'],
  ['fork','garpu','fork','forks,four,work,cork','garpu,garpoo,garpo'],
  ['knife','pisau','knife','knives,nice,wife,life','pisau,pisao,pisa'],
  ['pot','periuk','cup','pots,hot,lot,not','periuk,periok,periu'],
  ['pan','kuali','cup','pans,can,fan,man','kuali,kuale,kual'],
  ['stove','dapur','sun','stoves,drove,grove,dove','dapur,dapor,dapu'],
  ['sink','sinki','wave','sinks,think,drink,link','sinki,sinkee,sink'],
];

const HOME_FURNITURE = [
  ['bed','katil','house','beds,red,fed,head','katil,katel,kate'],
  ['door','pintu','house','doors,floor,more,four','pintu,pintoo,pint'],
  ['table','meja','house','tables,cable,able,label','meja,meje,mej'],
  ['sofa','sofa','house','sofas,solar,so far,suffer','sofa,sofe,sof'],
  ['mirror','cermin','moon','mirrors,nearer,clearer,mirror','cermin,cerming,cerme'],
  ['window','tingkap','house','windows,wind,widow,willow','tingkap,tingkep,tingka'],
  ['rug','permaidani','house','rugs,bug,mug,hug','permaidani,dani,permaide'],
  ['shelf','rak','house','shelves,self,else,twelve','rak,rek,rahk'],
  ['key','kunci','ring','keys,ease,please,freeze','kunci,kunce,kunc'],
  ['wardrobe','almari','house','wardrobes,robe,globe,probe','almari,almare,almar'],
];

const HOME_HOUSEHOLD = [
  ['broom','penyapu','tree','brooms,room,bloom,doom','penyapu,penyapoo,penyap'],
  ['soap','sabun','rain','soaps,hope,rope,scope','sabun,sabong,saboon'],
  ['towel','tuala','hand','towels,tower,vowel,trowel','tuala,tuale,tual'],
  ['fan','kipas','cloud','fans,can,man,van','kipas,kipes,kipa'],
  ['iron','seterika','star','irons,lion,try on,buy on','seterika,seterike,seterik'],
  ['mop','mop','hand','mops,hop,pop,stop','mop,mope,mup'],
  ['bucket','baldi','cup','buckets,basket,socket,ticket','baldi,balde,bald'],
  ['box','kotak','dice','boxes,fox,socks,locks','kotak,kotek,kota'],
  ['lock','kunci','ring','locks,clock,knock,block','kunci,kunce,kunc'],
  ['candle','lilin','candle','candles,handle,sandal,cancel','lilin,lileng,lili'],
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
