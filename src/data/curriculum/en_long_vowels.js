/**
 * English Long Vowels / Silent E — 100 items grouped by a-e, i-e, o-e, u-e
 * Compact data + builder pattern for token efficiency
 */

// [enWord, msWord, icon, enMatches(csv), msMatches(csv)]
const A_E = [
  ['cake','kek','apple','cakes,cape,bake,kate','kek,cek,kak'],
  ['lake','tasik','wave','lakes,lace,late,lay','tasik,taksi,lasik'],
  ['make','buat','hand','makes,may,mate,mike','buat,bwat,bua'],
  ['bake','bakar','apple','bakes,back,bay,bike','bakar,baka,bakal'],
  ['cave','gua','mountain','caves,cove,gave,save','gua,gue,gu'],
  ['face','muka','moon','faces,lace,pace,race','muka,muke,muk'],
  ['game','permainan','dice','games,came,fame,name','game,gem,gam'],
  ['gate','pagar','house','gates,late,fate,great','pagar,pagas,gat'],
  ['grape','anggur','apple','grapes,gray,great,drape','anggur,anggul,angur'],
  ['lace','renda','ring','laces,race,face,ace','renda,rende,rend'],
  ['lane','lorong','car','lanes,cane,main,lain','lorong,loron,loran'],
  ['late','lewat','clock','latest,lay,latte,laid','lewat,lewak,lewas'],
  ['maze','labirin','star','maize,mace,may,mays','labirin,maze,maz'],
  ['name','nama','book','names,same,came,aim','nama,name,nam'],
  ['race','lumba','car','races,lace,pace,grace','lumba,lumbe,lumbak'],
  ['safe','selamat','house','save,say,safes,sage','selamat,selamet,safe'],
  ['shade','teduh','umbrella','shades,shape,aid,shed','teduh,tedoh,tedu'],
  ['shake','gegar','hand','shakes,shape,fake,sake','gegar,gege,gegak'],
  ['shape','bentuk','star','shapes,shake,shade,shave','bentuk,bentok,bentu'],
  ['snake','ular','fish','snakes,snack,sake,sank','ular,ulak,ulas'],
  ['space','angkasa','star','spade,pace,face,lace','angkasa,angkase,angkas'],
  ['vase','pasu','flower','vases,base,case,face','pasu,pase,pas'],
  ['wade','redah','wave','wades,made,fade,aide','redah,rede,reda'],
  ['wake','bangun','sun','wakes,bake,lake,sake','bangun,bangu,bangon'],
  ['wave','ombak','wave','waves,gave,cave,save','ombak,ombek,omba'],
];

const I_E = [
  ['bike','basikal','car','bikes,hike,mike,like','basikal,basikel,basike'],
  ['bite','gigit','tooth','bites,bit,byte,kite','gigit,gigik,gigi'],
  ['dice','dadu','dice','dies,ice,nice,twice','dadu,dade,dad'],
  ['dime','syiling','coin','dimes,time,lime,mime','syiling,syilin,syilen'],
  ['dive','selam','wave','dives,drive,five,live','selam,selem,sela'],
  ['file','fail','book','files,mile,pile,vile','fail,fai,fael'],
  ['fine','baik','star','fines,mine,vine,wine','baik,bae,baek'],
  ['fire','api','sun','fires,hire,wire,tire','api,ape,apis'],
  ['five','lima','hand','fives,hive,live,dive','lima,lime,lim'],
  ['hide','sembunyi','tree','hides,ride,side,wide','sembunyi,sembuni,sembun'],
  ['hike','mendaki','mountain','hikes,bike,mike,like','mendaki,mendake,mendak'],
  ['kite','layang','star','kites,bite,site,knight','layang,layan,layen'],
  ['knife','pisau','knife','knives,nice,life,wife','pisau,pisao,pisa'],
  ['life','hidup','heart','lives,wife,rife,knife','hidup,hidop,hidu'],
  ['like','suka','heart','likes,bike,hike,mike','suka,suke,suk'],
  ['lime','limau','apple','limes,time,dime,mime','limau,limao,lima'],
  ['line','garis','book','lines,mine,vine,wine','garis,gares,gari'],
  ['mice','tikus','cat','nice,ice,dice,rice','tikus,tikos,tiku'],
  ['mile','batu','car','miles,smile,file,pile','batu,bato,bat'],
  ['mine','lombong','mountain','mines,nine,wine,vine','lombong,lombon,lompong'],
  ['nice','bagus','star','mice,ice,dice,rice','bagus,bagos,bagu'],
  ['nine','sembilan','star','nines,mine,vine,wine','sembilan,sembilen,sembila'],
  ['pine','pokok','tree','pines,mine,line,vine','pokok,poko,pokoh'],
  ['ride','tunggang','car','rides,hide,side,wide','tunggang,tunggan,tungang'],
  ['time','masa','clock','times,lime,dime,mime','masa,mase,mas'],
];

const O_E = [
  ['bone','tulang','tooth','bones,tone,cone,zone','tulang,tulan,tuleng'],
  ['close','tutup','house','clothes,chose,dose,nose','tutup,tutop,tutu'],
  ['code','kod','book','codes,mode,rode,node','kod,code,kode'],
  ['cone','kon','apple','cones,bone,tone,zone','kon,cone,kone'],
  ['dome','kubah','house','domes,home,rome,tome','kubah,kube,kubeh'],
  ['globe','glob','ball','globes,robe,lobe,probe','glob,globe,glop'],
  ['hole','lubang','ball','holes,role,mole,pole','lubang,luban,lubeng'],
  ['home','rumah','house','homes,dome,foam,rome','rumah,ruma,rumeh'],
  ['hope','harapan','star','hopes,rope,cope,dope','harapan,harapn,harapa'],
  ['hose','hos','rain','hoses,nose,rose,those','hos,hose,hoze'],
  ['joke','jenaka','star','jokes,poke,woke,coke','jenaka,jenak,jenake'],
  ['mole','cencurut','cat','moles,hole,role,pole','cencurut,cencuru,cencuruh'],
  ['nose','hidung','hand','noses,hose,rose,those','hidung,hidun,hidong'],
  ['note','nota','music','notes,vote,tone,bone','nota,note,noto'],
  ['pole','tiang','tree','poles,hole,role,mole','tiang,tian,tieng'],
  ['rope','tali','wave','ropes,hope,cope,dope','tali,tale,tal'],
  ['rose','mawar','flower','roses,nose,hose,those','mawar,mawal,mawer'],
  ['score','skor','star','scores,store,core,more','skor,score,skol'],
  ['smoke','asap','cloud','smokes,spoke,joke,woke','asap,asa,asep'],
  ['stone','batu','mountain','stones,tone,bone,zone','batu,bato,bat'],
  ['stove','dapur','sun','stoves,drove,grove,cove','dapur,dapor,dapu'],
  ['tone','nada','music','tones,bone,cone,zone','nada,nade,nad'],
  ['vote','undi','hand','votes,note,boat,goat','undi,unde,undik'],
  ['woke','bangun','sun','woke,joke,poke,coke','bangun,bangu,bangon'],
  ['zone','zon','star','zones,bone,cone,tone','zon,zone,zong'],
];

const U_E = [
  ['brute','garang','star','brutes,boot,fruit,cute','garang,garan,garen'],
  ['cube','kiub','dice','cubes,tube,cute,cue','kiub,cube,kiup'],
  ['cure','ubat','heart','cures,pure,sure,lure','ubat,ubak,ubet'],
  ['cute','comel','cat','cuter,suit,shoot,mute','comel,come,comek'],
  ['duke','duke','crown','dukes,luke,fluke,juke','duke,duk,dyuk'],
  ['dune','bukit','mountain','dunes,tune,june,moon','bukit,buke,buket'],
  ['flute','seruling','music','flutes,fruit,lute,mute','seruling,serulin,seruleng'],
  ['fume','wasap','cloud','fumes,boom,room,plume','wasap,wasa,wasep'],
  ['fuse','fius','sun','fuses,muse,use,abuse','fius,fuse,fiuz'],
  ['huge','besar','mountain','huger,hug,juice,rouge','besar,besa,besal'],
  ['june','jun','sun','junes,tune,dune,moon','jun,june,jum'],
  ['lure','umpan','fish','lures,cure,pure,sure','umpan,umpa,umpen'],
  ['lute','kecapi','music','lutes,cute,flute,mute','kecapi,kecap,kecape'],
  ['mule','keldai','cat','mules,rule,cool,tool','keldai,kelde,keldae'],
  ['muse','ilham','book','muses,fuse,use,abuse','ilham,ilhem,ilhm'],
  ['mute','senyap','hand','mutes,cute,lute,brute','senyap,senya,senyep'],
  ['prune','prun','apple','prunes,tune,june,moon','prun,prune,pron'],
  ['pure','tulen','rain','purer,cure,sure,lure','tulen,tule,tulin'],
  ['rude','kasar','star','ruder,crude,dude,mood','kasar,kasa,kasel'],
  ['rule','peraturan','crown','rules,cool,tool,pool','peraturan,peratura,peraturen'],
  ['rune','rune','book','runes,tune,june,moon','rune,run,runi'],
  ['sure','pasti','star','surely,shore,cure,pure','pasti,paste,pas'],
  ['tube','tiub','dice','tubes,cube,lube,tuba','tiub,tube,tiup'],
  ['tune','lagu','music','tunes,dune,june,moon','lagu,lage,lag'],
  ['use','guna','star','used,useful,abuse,fuse','guna,gune,gun'],
];

// ── Builder ────────────────────────────────────────────────────────────────────
function build(data, group, offset = 0) {
  return data.map(([en, ms, icon, enM, msM], i) => ({
    id: `en_lv_${String(offset + i + 1).padStart(3, '0')}`,
    icon,
    group,
    ms: { word: ms, prompt: `Sebut: ${en}`, matches: [en, ...msM.split(',')] },
    en: { word: en, prompt: `Say: ${en}`, matches: [en, ...enM.split(',')] },
  }));
}

const en_long_vowels = [
  ...build(A_E, 'a_e', 0),
  ...build(I_E, 'i_e', 25),
  ...build(O_E, 'o_e', 50),
  ...build(U_E, 'u_e', 75),
];

export default en_long_vowels;
