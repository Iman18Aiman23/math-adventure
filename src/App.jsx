import React, { useState, useEffect, useRef, createContext, useContext, Suspense, useTransition } from 'react';
import HomePage from './components/HomePage';
import LoadingSpinner from './components/LoadingSpinner';
const BMPage = React.lazy(() => import('./components/SpeakingPage/BMPage'));
const MathHome = React.lazy(() => import('./components/MathematicsPage/MathHome'));
const OpsLandingPage = React.lazy(() => import('./components/MathematicsPage/OpsLandingPage'));
const TimeGameMenu = React.lazy(() => import('./components/MathematicsPage/TimeGameMenu'));
const MonthsGame = React.lazy(() => import('./components/MathematicsPage/MonthsGame'));
const ClockGame = React.lazy(() => import('./components/MathematicsPage/ClockGame'));
const MonthLearning = React.lazy(() => import('./components/MathematicsPage/MonthLearning'));
const MathOperationsGame = React.lazy(() => import('./components/MathematicsPage/MathOperationsGame'));
const ColumnMathGame = React.lazy(() => import('./components/MathematicsPage/ColumnMathGame'));
const LevelUpToast = React.lazy(() => import('./components/LevelUpToast'));
const WelcomeModal = React.lazy(() => import('./components/WelcomeModal'));
import DesktopSidebar from './components/DesktopSidebar';
import CosmicMobileNav from './components/CosmicMobileNav';
const ReadingPage = React.lazy(() => import('./components/ReadingPage/ReadingPage'));
const EarlyExplorersHome = React.lazy(() => import('./components/AgeGroup-4-6/EarlyExplorersHome'));
const Grade1AdventurersHome = React.lazy(() => import('./components/AgeGroup-7/Grade1AdventurersHome'));
const Grade2DiscoverersHome = React.lazy(() => import('./components/AgeGroup-8/Grade2DiscoverersHome'));
const Grade3AchieversHome = React.lazy(() => import('./components/AgeGroup-9/Grade3AchieversHome'));
import './components/AgeGroup-4-6/age46-ui.css';
// Game leaf components are code-split (React.lazy) so they stay out of the main
// bundle. This keeps the initial chunk small — the homepage and age-group menus
// load/parse fast, so the first click isn't blocked by a giant bundle compile.
const KVLearningPage46 = React.lazy(() => import('./components/ReadingPage/KVLearningPage'));
const NumberCards = React.lazy(() => import('./components/AgeGroup-4-6/NumberCards'));
const AlphabetSafari = React.lazy(() => import('./components/AgeGroup-4-6/AlphabetSafari'));
const BelajarMengira = React.lazy(() => import('./components/AgeGroup-4-6/BelajarMengira'));
const ShapeSorter = React.lazy(() => import('./components/AgeGroup-4-6/ShapeSorter'));
const NumberMatch = React.lazy(() => import('./components/AgeGroup-4-6/NumberMatch'));
const AppleAddition = React.lazy(() => import('./components/AgeGroup-4-6/AppleAddition'));
const MissingNumber = React.lazy(() => import('./components/AgeGroup-4-6/MissingNumber'));
const SpeakingGame4to6 = React.lazy(() => import('./components/AgeGroup-4-6/SpeakingGame4to6'));
const JawiLetterCards = React.lazy(() => import('./components/AgeGroup-4-6/JawiLetterCards'));
const JawiLetterMatch = React.lazy(() => import('./components/AgeGroup-4-6/JawiLetterMatch'));
const LetterTrace = React.lazy(() => import('./components/AgeGroup-4-6/LetterTrace'));
const PhoneticsPop = React.lazy(() => import('./components/AgeGroup-4-6/PhoneticsPop'));
const SoundMatching = React.lazy(() => import('./components/AgeGroup-4-6/SoundMatching'));
const LetterSoundPuzzle = React.lazy(() => import('./components/AgeGroup-4-6/LetterSoundPuzzle'));
const SentenceBuilder = React.lazy(() => import('./components/AgeGroup-7/SentenceBuilder'));
const SukuKataBinaPerkataan = React.lazy(() => import('./components/AgeGroup-7/SukuKataBinaPerkataan'));
const JenisKata = React.lazy(() => import('./components/AgeGroup-7/JenisKata'));
const KataTanya = React.lazy(() => import('./components/AgeGroup-7/KataTanya'));
const KataHubungSendi = React.lazy(() => import('./components/AgeGroup-7/KataHubungSendi'));
const KataImbuhan = React.lazy(() => import('./components/AgeGroup-7/KataImbuhan'));
const EjaanTandaBaca = React.lazy(() => import('./components/AgeGroup-7/EjaanTandaBaca'));
const KataGanda = React.lazy(() => import('./components/AgeGroup-7/KataGanda'));
const KefahamanBacaan = React.lazy(() => import('./components/AgeGroup-7/KefahamanBacaan'));
const BacaSukuKataJawi = React.lazy(() => import('./components/AgeGroup-7/BacaSukuKataJawi'));
const BinaPerkataanJawi = React.lazy(() => import('./components/AgeGroup-7/BinaPerkataanJawi'));
const PadanPerkataanJawi = React.lazy(() => import('./components/AgeGroup-7/PadanPerkataanJawi'));
const BacaAyatJawi = React.lazy(() => import('./components/AgeGroup-7/BacaAyatJawi'));
const TulisJawi = React.lazy(() => import('./components/AgeGroup-7/TulisJawi'));
const JawiMatchGame = React.lazy(() => import('./components/AgeGroup-7/JawiMatchGame'));
const IqraPage = React.lazy(() => import('./components/AgeGroup-7/IqraPage'));
const TimeTeller = React.lazy(() => import('./components/MatematikPage/Tahun1/Module2_Sukatan/TimeTeller'));
const CountingMoney = React.lazy(() => import('./components/MatematikPage/Tahun1/Module1_Nombor/CountingMoney'));
const SubtractionStory = React.lazy(() => import('./components/MatematikPage/Tahun1/Module1_Nombor/SubtractionStory'));
const BacaAyatKuat = React.lazy(() => import('./components/AgeGroup-7/BacaAyatKuat'));
const BertuturBertatasusila = React.lazy(() => import('./components/AgeGroup-7/BertuturBertatasusila'));
const JawabSoalan = React.lazy(() => import('./components/AgeGroup-7/JawabSoalan'));
const SebutLawanKata = React.lazy(() => import('./components/AgeGroup-7/SebutLawanKata'));
const SebutFrasaBergambar = React.lazy(() => import('./components/AgeGroup-7/SebutFrasaBergambar'));
const Nombor100 = React.lazy(() => import('./components/MatematikPage/Tahun1/Module1_Nombor/Nombor100'));
const Tambah100 = React.lazy(() => import('./components/MatematikPage/Tahun1/Module1_Nombor/Tambah100'));
const Bentuk3D = React.lazy(() => import('./components/MatematikPage/Tahun1/Module2_Sukatan/Bentuk3D'));
const UkurPanjang = React.lazy(() => import('./components/MatematikPage/Tahun1/Module2_Sukatan/UkurPanjang'));
const BacaPictograph = React.lazy(() => import('./components/MatematikPage/Tahun1/Module3_Statistik/BacaPictograph'));
const Jisim = React.lazy(() => import('./components/MatematikPage/Tahun1/Module2_Sukatan/Jisim'));
const IsiPaduCecair = React.lazy(() => import('./components/MatematikPage/Tahun1/Module2_Sukatan/IsiPaduCecair'));
const KosaKataKontekstual = React.lazy(() => import('./components/AgeGroup-8/KosaKataKontekstual'));
const BacaanPemahaman = React.lazy(() => import('./components/AgeGroup-8/BacaanPemahaman'));
const CeritaBacaan = React.lazy(() => import('./components/AgeGroup-8/CeritaBacaan'));
const PengenalanNilai = React.lazy(() => import('./components/AgeGroup-8/PengenalanNilai'));
const PantunBacaan = React.lazy(() => import('./components/AgeGroup-8/PantunBacaan'));
const DarabMudah = React.lazy(() => import('./components/MatematikPage/Tahun2/Module1_Nombor/DarabMudah'));
const Wang = React.lazy(() => import('./components/MatematikPage/Tahun2/Module1_Nombor/Wang'));
const Masa = React.lazy(() => import('./components/MatematikPage/Tahun2/Module2_Sukatan/Masa'));
const Pecahan = React.lazy(() => import('./components/MatematikPage/Tahun2/Module1_Nombor/Pecahan'));
const Nombor1000 = React.lazy(() => import('./components/MatematikPage/Tahun2/Module1_Nombor/Nombor1000'));
const TambahTahun2 = React.lazy(() => import('./components/MatematikPage/Tahun2/Module1_Nombor/TambahTahun2'));
const TolakTahun2 = React.lazy(() => import('./components/MatematikPage/Tahun2/Module1_Nombor/TolakTahun2'));
const UkuranPanjangTahun2 = React.lazy(() => import('./components/MatematikPage/Tahun2/Module2_Sukatan/UkuranPanjangTahun2'));
const PerpuluhanT2 = React.lazy(() => import('./components/MatematikPage/Tahun2/Module1_Nombor/PerpuluhanT2'));
const BahagiT2 = React.lazy(() => import('./components/MatematikPage/Tahun2/Module1_Nombor/BahagiT2'));
const JisimCecairT2 = React.lazy(() => import('./components/MatematikPage/Tahun2/Module2_Sukatan/JisimCecairT2'));
const GeometriT2 = React.lazy(() => import('./components/MatematikPage/Tahun2/Module2_Sukatan/GeometriT2'));
const DataT2 = React.lazy(() => import('./components/MatematikPage/Tahun2/Module3_Statistik/DataT2'));
const BacaPetikanJawi = React.lazy(() => import('./components/AgeGroup-8/BacaPetikanJawi'));
const PadanKataKerjaJawi = React.lazy(() => import('./components/AgeGroup-8/PadanKataKerjaJawi'));
const SusunAyatJawi = React.lazy(() => import('./components/AgeGroup-8/SusunAyatJawi'));
const LafazPantun = React.lazy(() => import('./components/AgeGroup-8/LafazPantun'));
const JenisAyat = React.lazy(() => import('./components/AgeGroup-9/JenisAyat'));
const PenjodohBilangan = React.lazy(() => import('./components/AgeGroup-9/PenjodohBilangan'));
const ImbuhanLanjutan = React.lazy(() => import('./components/AgeGroup-9/ImbuhanLanjutan'));
const SimpulanBahasa = React.lazy(() => import('./components/AgeGroup-9/SimpulanBahasa'));
const BacaanPemahamanLanjutan = React.lazy(() => import('./components/AgeGroup-9/BacaanPemahamanLanjutan'));
const Nombor10000    = React.lazy(() => import('./components/MatematikPage/Tahun3/Module1_Nombor/Nombor10000'));
const DarabLanjutan  = React.lazy(() => import('./components/MatematikPage/Tahun3/Module1_Nombor/DarabLanjutan'));
const BahagiTahun3    = React.lazy(() => import('./components/MatematikPage/Tahun3/Module1_Nombor/BahagiTahun3'));
const PecahanLanjutan = React.lazy(() => import('./components/MatematikPage/Tahun3/Module1_Nombor/PecahanLanjutan'));
const Perpuluhan      = React.lazy(() => import('./components/MatematikPage/Tahun3/Module1_Nombor/Perpuluhan'));
const WangTahun3      = React.lazy(() => import('./components/MatematikPage/Tahun3/Module1_Nombor/WangTahun3'));
const MasaTahun3      = React.lazy(() => import('./components/MatematikPage/Tahun3/Module2_Sukatan/MasaTahun3'));
const PerimeterLuas   = React.lazy(() => import('./components/MatematikPage/Tahun3/Module2_Sukatan/PerimeterLuas'));
const OperasiBergabungT3 = React.lazy(() => import('./components/MatematikPage/Tahun3/Module1_Nombor/OperasiBergabungT3'));
const PeratusT3       = React.lazy(() => import('./components/MatematikPage/Tahun3/Module1_Nombor/PeratusT3'));
const UkuranT3        = React.lazy(() => import('./components/MatematikPage/Tahun3/Module2_Sukatan/UkuranT3'));
const DataT3          = React.lazy(() => import('./components/MatematikPage/Tahun3/Module3_StatistikKebarangkalian/DataT3'));
const KebarangkalianT3 = React.lazy(() => import('./components/MatematikPage/Tahun3/Module3_StatistikKebarangkalian/KebarangkalianT3'));
const PecahanAsasT1 = React.lazy(() => import('./components/MatematikPage/Tahun1/Module1_Nombor/PecahanAsasT1'));
const ProfileHome = React.lazy(() => import('./components/Profile/ProfileHome'));
const PendidikanIslamHomePage = React.lazy(() => import('./components/PendidikanIslamPage/PendidikanIslamHomePage'));
const MatematikHomePage = React.lazy(() => import('./components/MatematikPage/MatematikHomePage'));
const BahasaMelayuHomePage = React.lazy(() => import('./components/BahasaMelayuPage/BahasaMelayuHomePage'));
const BahasaMelayuModulePage = React.lazy(() => import('./components/BahasaMelayuPage/BahasaMelayuModulePage'));
const BMModuleHubLayout = React.lazy(() => import('./components/BahasaMelayuPage/Tahun1/BMModuleHubLayout'));
const MatematikModulePage = React.lazy(() => import('./components/MatematikPage/MatematikModulePage'));
const NomborModule = React.lazy(() => import('./components/MatematikPage/Tahun1/Module1_Nombor/NomborModule'));
const SukatanModule = React.lazy(() => import('./components/MatematikPage/Tahun1/Module2_Sukatan/SukatanModule'));
const StatistikModule = React.lazy(() => import('./components/MatematikPage/Tahun1/Module3_Statistik/StatistikModule'));
const NomborModuleT2 = React.lazy(() => import('./components/MatematikPage/Tahun2/Module1_Nombor/NomborModule'));
const SukatanModuleT2 = React.lazy(() => import('./components/MatematikPage/Tahun2/Module2_Sukatan/SukatanModule'));
const StatistikModuleT2 = React.lazy(() => import('./components/MatematikPage/Tahun2/Module3_Statistik/StatistikModule'));
const NomborModuleT3 = React.lazy(() => import('./components/MatematikPage/Tahun3/Module1_Nombor/NomborModule'));
const SukatanModuleT3 = React.lazy(() => import('./components/MatematikPage/Tahun3/Module2_Sukatan/SukatanModule'));
const StatistikModuleT3 = React.lazy(() => import('./components/MatematikPage/Tahun3/Module3_StatistikKebarangkalian/StatistikModule'));
const AlQuranTajwidModule = React.lazy(() => import('./components/PendidikanIslamPage/Tahun1/Module1_AlQuran/AlQuranTajwidModule'));
const HurufHijaiyah       = React.lazy(() => import('./components/PendidikanIslamPage/Tahun1/Module1_AlQuran/HurufHijaiyah'));
const TandaBacaan         = React.lazy(() => import('./components/PendidikanIslamPage/Tahun1/Module1_AlQuran/TandaBacaan'));
const Tanwin              = React.lazy(() => import('./components/PendidikanIslamPage/Tahun1/Module1_AlQuran/Tanwin'));
const Hafazan             = React.lazy(() => import('./components/PendidikanIslamPage/Tahun1/Module1_AlQuran/Hafazan'));
const AkidahModule        = React.lazy(() => import('./components/PendidikanIslamPage/Tahun1/Module2_Akidah/AkidahModule'));
const RukunIman           = React.lazy(() => import('./components/PendidikanIslamPage/Tahun1/Module2_Akidah/RukunIman'));
const RukunIslam          = React.lazy(() => import('./components/PendidikanIslamPage/Tahun1/Module2_Akidah/RukunIslam'));
const Syahadah            = React.lazy(() => import('./components/PendidikanIslamPage/Tahun1/Module2_Akidah/Syahadah'));
const AsmaulHusnaKhaliq   = React.lazy(() => import('./components/PendidikanIslamPage/Tahun1/Module2_Akidah/AsmaulHusnaKhaliq'));
const IbadahModule        = React.lazy(() => import('./components/PendidikanIslamPage/Tahun1/Module3_Ibadah/IbadahModule'));
const Istinja             = React.lazy(() => import('./components/PendidikanIslamPage/Tahun1/Module3_Ibadah/Istinja'));
const AirMutlak           = React.lazy(() => import('./components/PendidikanIslamPage/Tahun1/Module3_Ibadah/AirMutlak'));
const AmaliWuduk          = React.lazy(() => import('./components/PendidikanIslamPage/Tahun1/Module3_Ibadah/AmaliWuduk'));
const SirahModule          = React.lazy(() => import('./components/PendidikanIslamPage/Tahun1/Module4_Sirah/SirahModule'));
const NasabKeturunan       = React.lazy(() => import('./components/PendidikanIslamPage/Tahun1/Module4_Sirah/NasabKeturunan'));
const KelahiranPenyusuan   = React.lazy(() => import('./components/PendidikanIslamPage/Tahun1/Module4_Sirah/KelahiranPenyusuan'));
const SifatAlAmin          = React.lazy(() => import('./components/PendidikanIslamPage/Tahun1/Module4_Sirah/SifatAlAmin'));
const AdabModule           = React.lazy(() => import('./components/PendidikanIslamPage/Tahun1/Module5_Adab/AdabModule'));
const AdabMakanMinum       = React.lazy(() => import('./components/PendidikanIslamPage/Tahun1/Module5_Adab/AdabMakanMinum'));
const AdabTidur            = React.lazy(() => import('./components/PendidikanIslamPage/Tahun1/Module5_Adab/AdabTidur'));
const AdabTandas           = React.lazy(() => import('./components/PendidikanIslamPage/Tahun1/Module5_Adab/AdabTandas'));
const JawiModule           = React.lazy(() => import('./components/PendidikanIslamPage/Tahun1/Module6_Jawi/JawiModule'));
const JawiKVLearningPage   = React.lazy(() => import('./components/PendidikanIslamPage/Tahun1/Module6_Jawi/JawiKVLearningPage'));
const JawiKVKLearningPage  = React.lazy(() => import('./components/PendidikanIslamPage/Tahun1/Module6_Jawi/JawiKVKLearningPage'));
const JawiAlphabetPage     = React.lazy(() => import('./components/PendidikanIslamPage/Tahun1/Module6_Jawi/JawiAlphabetPage'));
const JawiWordsPage        = React.lazy(() => import('./components/PendidikanIslamPage/Tahun1/Module6_Jawi/JawiWordsPage'));
const JawiSyllablesGame    = React.lazy(() => import('./components/PendidikanIslamPage/Tahun1/Module6_Jawi/JawiSyllablesGame'));

// Tahun 2
const AlQuranTajwidHadisModule = React.lazy(() => import('./components/PendidikanIslamPage/Tahun2/Module1_AlQuranTajwidHadis/AlQuranTajwidHadisModule'));
const SukunSyaddah             = React.lazy(() => import('./components/PendidikanIslamPage/Tahun2/Module1_AlQuranTajwidHadis/SukunSyaddah'));
const Idgham                   = React.lazy(() => import('./components/PendidikanIslamPage/Tahun2/Module1_AlQuranTajwidHadis/Idgham'));
const TilawahTahun2            = React.lazy(() => import('./components/PendidikanIslamPage/Tahun2/Module1_AlQuranTajwidHadis/TilawahTahun2'));
const Hadis                    = React.lazy(() => import('./components/PendidikanIslamPage/Tahun2/Module1_AlQuranTajwidHadis/Hadis'));
// Tahun 2 Modules 2-6
const AkidahModuleT2      = React.lazy(() => import('./components/PendidikanIslamPage/Tahun2/Module2_Akidah/AkidahModule'));
const Malaikat            = React.lazy(() => import('./components/PendidikanIslamPage/Tahun2/Module2_Akidah/Malaikat'));
const AsmaulHusnaTahun2   = React.lazy(() => import('./components/PendidikanIslamPage/Tahun2/Module2_Akidah/AsmaulHusnaTahun2'));
const Syirik              = React.lazy(() => import('./components/PendidikanIslamPage/Tahun2/Module2_Akidah/Syirik'));
const IbadahModuleT2      = React.lazy(() => import('./components/PendidikanIslamPage/Tahun2/Module3_Ibadah/IbadahModule'));
const SyaratSolat         = React.lazy(() => import('./components/PendidikanIslamPage/Tahun2/Module3_Ibadah/SyaratSolat'));
const RukunSolat          = React.lazy(() => import('./components/PendidikanIslamPage/Tahun2/Module3_Ibadah/RukunSolat'));
const AzanIqamah          = React.lazy(() => import('./components/PendidikanIslamPage/Tahun2/Module3_Ibadah/AzanIqamah'));
const SirahModuleT2       = React.lazy(() => import('./components/PendidikanIslamPage/Tahun2/Module4_Sirah/SirahModule'));
const TandaKerasulan      = React.lazy(() => import('./components/PendidikanIslamPage/Tahun2/Module4_Sirah/TandaKerasulan'));
const WahyuPertama        = React.lazy(() => import('./components/PendidikanIslamPage/Tahun2/Module4_Sirah/WahyuPertama'));
const DakwahAwal          = React.lazy(() => import('./components/PendidikanIslamPage/Tahun2/Module4_Sirah/DakwahAwal'));
const AdabModuleT2        = React.lazy(() => import('./components/PendidikanIslamPage/Tahun2/Module5_Adab/AdabModule'));
const AdabBerpakaian      = React.lazy(() => import('./components/PendidikanIslamPage/Tahun2/Module5_Adab/AdabBerpakaian'));
const AdabKasihSayang     = React.lazy(() => import('./components/PendidikanIslamPage/Tahun2/Module5_Adab/AdabKasihSayang'));
const AdabBerkawan        = React.lazy(() => import('./components/PendidikanIslamPage/Tahun2/Module5_Adab/AdabBerkawan'));
const JawiModuleT2        = React.lazy(() => import('./components/PendidikanIslamPage/Tahun2/Module6_Jawi/JawiModule'));
const SukuKataTertutup    = React.lazy(() => import('./components/PendidikanIslamPage/Tahun2/Module6_Jawi/SukuKataTertutup'));
const RangkaiKataJawi     = React.lazy(() => import('./components/PendidikanIslamPage/Tahun2/Module6_Jawi/RangkaiKataJawi'));
const AyatPendekJawi      = React.lazy(() => import('./components/PendidikanIslamPage/Tahun2/Module6_Jawi/AyatPendekJawi'));

// Tahun 3
const AlQuranTajwidHadisModuleT3 = React.lazy(() => import('./components/PendidikanIslamPage/Tahun3/Module1_AlQuranTajwidHadis/AlQuranTajwidHadisModuleT3'));
const MimSakinah                 = React.lazy(() => import('./components/PendidikanIslamPage/Tahun3/Module1_AlQuranTajwidHadis/MimSakinah'));
const TilawahTahun3              = React.lazy(() => import('./components/PendidikanIslamPage/Tahun3/Module1_AlQuranTajwidHadis/TilawahTahun3'));
const KefahamanAlAsr             = React.lazy(() => import('./components/PendidikanIslamPage/Tahun3/Module1_AlQuranTajwidHadis/KefahamanAlAsr'));
const HadisTahun3                = React.lazy(() => import('./components/PendidikanIslamPage/Tahun3/Module1_AlQuranTajwidHadis/HadisTahun3'));
const AkidahModuleT3             = React.lazy(() => import('./components/PendidikanIslamPage/Tahun3/Module2_Akidah/AkidahModuleT3'));
const KitabAllah                 = React.lazy(() => import('./components/PendidikanIslamPage/Tahun3/Module2_Akidah/KitabAllah'));
const AlQuranPanduan             = React.lazy(() => import('./components/PendidikanIslamPage/Tahun3/Module2_Akidah/AlQuranPanduan'));
const AsmaulHusnaTahun3          = React.lazy(() => import('./components/PendidikanIslamPage/Tahun3/Module2_Akidah/AsmaulHusnaTahun3'));
const IbadahModuleT3             = React.lazy(() => import('./components/PendidikanIslamPage/Tahun3/Module3_Ibadah/IbadahModuleT3'));
const PembatalSolat              = React.lazy(() => import('./components/PendidikanIslamPage/Tahun3/Module3_Ibadah/PembatalSolat'));
const KhusyukSolat               = React.lazy(() => import('./components/PendidikanIslamPage/Tahun3/Module3_Ibadah/KhusyukSolat'));
const FarduAinKifayah            = React.lazy(() => import('./components/PendidikanIslamPage/Tahun3/Module3_Ibadah/FarduAinKifayah'));
const SirahModuleT3              = React.lazy(() => import('./components/PendidikanIslamPage/Tahun3/Module4_Sirah/SirahModuleT3'));
const HijrahMadinah              = React.lazy(() => import('./components/PendidikanIslamPage/Tahun3/Module4_Sirah/HijrahMadinah'));
const PiagamMadinah              = React.lazy(() => import('./components/PendidikanIslamPage/Tahun3/Module4_Sirah/PiagamMadinah'));
const KepimpinanNabi             = React.lazy(() => import('./components/PendidikanIslamPage/Tahun3/Module4_Sirah/KepimpinanNabi'));
const AdabModuleT3               = React.lazy(() => import('./components/PendidikanIslamPage/Tahun3/Module5_Adab/AdabModuleT3'));
const AdabMenuntutIlmu           = React.lazy(() => import('./components/PendidikanIslamPage/Tahun3/Module5_Adab/AdabMenuntutIlmu'));
const AdabHormatGuru             = React.lazy(() => import('./components/PendidikanIslamPage/Tahun3/Module5_Adab/AdabHormatGuru'));
const AdabKemudahanAwam          = React.lazy(() => import('./components/PendidikanIslamPage/Tahun3/Module5_Adab/AdabKemudahanAwam'));
const JawiModuleT3               = React.lazy(() => import('./components/PendidikanIslamPage/Tahun3/Module6_Jawi/JawiModuleT3'));
const ImbuhanJawi                = React.lazy(() => import('./components/PendidikanIslamPage/Tahun3/Module6_Jawi/ImbuhanJawi'));
const PetikanJawi                = React.lazy(() => import('./components/PendidikanIslamPage/Tahun3/Module6_Jawi/PetikanJawi'));
const TandaBacaJawi              = React.lazy(() => import('./components/PendidikanIslamPage/Tahun3/Module6_Jawi/TandaBacaJawi'));
const JawiReadingPage4           = React.lazy(() => import('./components/PendidikanIslamPage/Tahun3/Module6_Jawi/JawiReadingPage4'));
const JawiShortStoriesPage       = React.lazy(() => import('./components/PendidikanIslamPage/Tahun3/Module6_Jawi/JawiShortStoriesPage'));
import TahunModulePage from './components/PendidikanIslamPage/TahunModulePage';
const AchievementHome  = React.lazy(() => import('./components/Achievement/AchievementHome'));
const LeaderboardHome  = React.lazy(() => import('./components/Leaderboard/LeaderboardHome'));
const AssessmentSelector = React.lazy(() => import('./pages/AssessmentSelector'));
const AssessmentPage = React.lazy(() => import('./pages/AssessmentPage'));
import { getMuted, setMuted, preloadSounds, unlockAudio, playHoverSound } from './utils/soundManager';
import { useGameState } from './hooks/useGameState';
import { loadPlayerName, savePlayerName, recordLogin, calcStreak } from './services/storageService';
import { getGameData } from './utils/gameStatsManager';
import { baseAssessments } from './data/curriculum/assessment';

// ── Themes ───────────────────────────────────────────────────────────────────
export const THEMES = {
  // Soft & warm — rose. (key kept as 'cosmic' for saved-selection compatibility)
  cosmic: {
    key: 'cosmic', label: 'Blush', swatch: '#E58AA8',
    sidebarBg: 'linear-gradient(180deg, #C76A8C 0%, #E18AA8 45%, #F4B6C8 80%, #C76A8C 100%)',
    appBg: '#3A1E2A',
    contentBg: 'linear-gradient(175deg, #4E2937 0%, #7A4459 40%, #B06E84 70%, #4E2937 100%)',
    heroBg: 'linear-gradient(135deg, #9C546F 0%, #E18AA8 50%, #F8C9D6 100%)',
    heroBorder: '#FAD6E0',
    planetBody: 'radial-gradient(circle at 30% 30%, #F4B6C8, #E18AA8)',
    planetRing: '#FAD6E0',
  },
  ocean: {
    key: 'ocean', label: 'Ocean', swatch: '#1565c0',
    sidebarBg: 'linear-gradient(180deg, #0d3b66 0%, #1565c0 50%, #0a2d4d 100%)',
    appBg: '#071929',
    contentBg: 'linear-gradient(175deg, #0a2d4d 0%, #0d3b66 40%, #1565c0 70%, #0a2d4d 100%)',
    heroBg: 'linear-gradient(135deg, #0d3b66 0%, #1565c0 50%, #42a5f5 100%)',
    heroBorder: '#80cbc4',
    planetBody: 'radial-gradient(circle at 30% 30%, #42a5f5, #1565c0)',
    planetRing: '#80cbc4',
  },
  // Soft & warm — peach/coral. (key kept as 'sunny')
  sunny: {
    key: 'sunny', label: 'Peach', swatch: '#FB9A77',
    sidebarBg: 'linear-gradient(180deg, #E27A57 0%, #FB9A77 45%, #FFC2A6 80%, #E27A57 100%)',
    appBg: '#3A2218',
    contentBg: 'linear-gradient(175deg, #51301F 0%, #834B33 40%, #BE7150 70%, #51301F 100%)',
    heroBg: 'linear-gradient(135deg, #B25C3C 0%, #FB9A77 50%, #FFCDB6 100%)',
    heroBorder: '#FFDCCB',
    planetBody: 'radial-gradient(circle at 30% 30%, #FFC2A6, #FB9A77)',
    planetRing: '#FFDCCB',
  },
  // Soft & warm — sand/caramel. (key kept as 'forest')
  forest: {
    key: 'forest', label: 'Sand', swatch: '#E0AC72',
    sidebarBg: 'linear-gradient(180deg, #C0904F 0%, #E0AC72 45%, #F1D2A4 80%, #C0904F 100%)',
    appBg: '#332515',
    contentBg: 'linear-gradient(175deg, #46341C 0%, #6E5230 40%, #A07C4A 70%, #46341C 100%)',
    heroBg: 'linear-gradient(135deg, #8A6438 0%, #E0AC72 50%, #F3DAB3 100%)',
    heroBorder: '#F6E3C6',
    planetBody: 'radial-gradient(circle at 30% 30%, #F1D2A4, #E0AC72)',
    planetRing: '#F6E3C6',
  },
};

// ── Context ──────────────────────────────────────────────────────────────────
export const GameStateContext = createContext(null);
export const useGameStateContext = () => useContext(GameStateContext);

// ── Desktop detection hook ───────────────────────────────────────────────────
function useIsDesktop(breakpoint = 768) {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= breakpoint : false
  );
  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const handler = (e) => setIsDesktop(e.matches);
    mql.addEventListener('change', handler);
    setIsDesktop(mql.matches);
    return () => mql.removeEventListener('change', handler);
  }, [breakpoint]);
  return isDesktop;
}

// ── Game ID mapping ───────────────────────────────────────────────────────────
function getActiveGameId(currentSubject, mathSubGame) {
  if (currentSubject === 'jawi') return 'jawi';
  if (currentSubject === 'bm')   return 'bm';
  if (currentSubject === 'bm-kssr') return 'bm-kssr';
  if (currentSubject === 'math') {
    if (mathSubGame === 'operations') return 'math-operations';
    if (mathSubGame === 'datetime')   return 'math-datetime';
    if (mathSubGame === 'faq')        return 'math-faq';
    return 'math';
  }
  return 'home';
}

// ── Find matching assessment for achievement ───────────────────────────────────
function findMatchingAssessment(achievement) {
  if (!achievement) return null;

  // Try to find assessment that matches the achievement's topic and level
  return baseAssessments.find(assessment => {
    const topicMatch = assessment.topic === achievement.topic;
    const levelMatch = assessment.level === achievement.level;
    const questionTypeMatch = assessment.questionType === achievement.questionType;

    // Return if all three match, or at least topic and level match
    return topicMatch && levelMatch && (questionTypeMatch || true);
  }) || baseAssessments.find(a => a.topic === achievement.topic);
}


export default function App() {
  const isDesktop = useIsDesktop();
  const [playerName,     setPlayerName]     = useState(() => loadPlayerName());
  const [currentSubject, setCurrentSubject] = useState(null);
  const [mathSubGame,    setMathSubGame]    = useState(null);
  const [dateTimeSubGame,setDateTimeSubGame]= useState(null);
  const [isPlaying,      setIsPlaying]      = useState(false);
  const [gameConfig,     setGameConfig]     = useState({ operation: 'add', difficulty: 'easy', nums: [], quizType: 'multiple' });
  const [isMuted,        setIsMuted]        = useState(getMuted());
  const [language,       setLanguage]       = useState('bm');
  const [activeTab,      setActiveTab]      = useState('learn');
  const [streak,         setStreak]         = useState(0);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [currentAgeGroup, setCurrentAgeGroup] = useState(null);
  const [currentAgeGame, setCurrentAgeGame] = useState(null);
  const [currentTheme, setCurrentTheme] = useState('cosmic');
  const [islamModule, setIslamModule] = useState(null);
  const [islamTopic,  setIslamTopic]  = useState(null);
  const [islamYear,   setIslamYear]   = useState(1);
  const [matematikModule, setMatematikModule] = useState(null);
  const [matematikTopic,  setMatematikTopic]  = useState(null);
  const [matematikYear,   setMatematikYear]   = useState(1);
  const [bmModule, setBmModule] = useState(null);
  const [bmTopic,  setBmTopic]  = useState(null);
  const [bmYear,   setBmYear]   = useState(1);

  const viewContainerRef = useRef(null);
  useEffect(() => {
    if (viewContainerRef.current) viewContainerRef.current.scrollTop = 0;
  }, [islamModule, islamTopic, islamYear, matematikModule, matematikTopic, matematikYear, bmModule, bmTopic, bmYear]);

  // useTransition keeps the current screen visible while a lazy game chunk
  // loads, so navigation never blanks to a fallback for fast loads. isPending
  // drives a slim top progress bar for feedback.
  const [isPending, startTransition] = useTransition();
  const navigate = (fn) => startTransition(fn);
  // Tab switches load lazy chunks (Profile/Achievement/Leaderboard) — route them
  // through a transition too, so the current page stays visible while loading.
  const handleTabChange = (tab) => navigate(() => setActiveTab(tab));

  const activeGameId = getActiveGameId(currentSubject, mathSubGame);
  const { gameState, levelUpInfo, clearLevelUp } = useGameState(activeGameId);

  const handleSaveName = (name) => { savePlayerName(name); setPlayerName(name); };

  useEffect(() => {
    preloadSounds();
    // Record today's login and compute streak
    const dates = recordLogin();
    setStreak(calcStreak(dates));
    const handleFirstClick = () => { unlockAudio(); document.removeEventListener('click', handleFirstClick); };
    document.addEventListener('click', handleFirstClick);
    // Preload lazy tab bundles after initial paint so first-click is instant
    const t = setTimeout(() => {
      import('./components/Achievement/AchievementHome');
      import('./components/Leaderboard/LeaderboardHome');
    }, 2000);
    return () => {
      document.removeEventListener('click', handleFirstClick);
      clearTimeout(t);
    };
  }, []);

  const handleStartGame    = (op, diff, _nums = [], qType = 'multiple') => { setGameConfig({ operation: op, difficulty: diff, nums: _nums, quizType: qType }); setIsPlaying(true); };
  const handleBackToMenu   = () => setIsPlaying(false);
  const handleStartTimeGame= (gameId) => { setDateTimeSubGame(gameId); setIsPlaying(true); };
  const handleBackToHome   = () => { setIsPlaying(false); setMathSubGame(null); setDateTimeSubGame(null); setCurrentSubject(null); setCurrentAgeGroup(null); setCurrentAgeGame(null); setIslamModule(null); setIslamTopic(null); setMatematikModule(null); setMatematikTopic(null); setMatematikYear(1); setBmModule(null); setBmTopic(null); setBmYear(1); setActiveTab('learn'); };
  const handleToggleMute   = () => { const m = !isMuted; setIsMuted(m); setMuted(m); };
  const handleToggleLang   = () => setLanguage(l => l === 'bm' ? 'eng' : 'bm');

  const inActiveQuiz = isPlaying;
  const viewKey = `${activeTab}-${currentSubject}-${mathSubGame}-${dateTimeSubGame}-${isPlaying}-${selectedAssessment?.id}`;

  // Hide sidebar during game play or assessment
  const shouldHideSidebar = isPlaying || (currentSubject === 'math' && mathSubGame === 'faq') || selectedAssessment || !!currentAgeGame;

  // ── Content renderer ──────────────────────────────────────────────────────
  const renderContent = () => {
    if (activeTab === 'leaderboard') return (
      <Suspense fallback={<LoadingSpinner />}>
        <LeaderboardHome language={language} gameState={gameState} theme={THEMES[currentTheme]} />
      </Suspense>
    );
    if (activeTab === 'profile') {
      return <ProfileHome playerName={playerName} gameState={gameState} language={language} streak={streak} />;
    }
    if (activeTab === 'achievement') {
      // If an assessment is selected, show AssessmentPage
      if (selectedAssessment) {
        return <AssessmentPage assessment={selectedAssessment} onBack={() => setSelectedAssessment(null)} language={language} gameState={gameState} />;
      }
      // Otherwise show achievement home
      return <Suspense fallback={<LoadingSpinner />}>
        <AchievementHome
          onBack={handleBackToHome}
          onHome={handleBackToHome}
          language={language}
          gameState={gameState}
          onTakeAssessment={(achievement) => {
          console.log('Taking assessment:', achievement);
          // The achievement from baseAssessments can be used directly as an assessment
          // if it has all required properties (totalQuestions, duration, topic, level, questionType)
          if (achievement && achievement.totalQuestions && achievement.duration) {
            console.log('✓ Assessment has required fields, using directly:', achievement);
            setSelectedAssessment(achievement);
          } else {
            // Otherwise try to find a matching one
            console.log('Assessment missing fields, finding match...', achievement);
            const matchingAssessment = findMatchingAssessment(achievement);
            if (matchingAssessment) {
              console.log('✓ Found matching assessment:', matchingAssessment);
              setSelectedAssessment(matchingAssessment);
            } else {
              console.error('✗ No matching assessment found for:', achievement);
              alert('Could not find matching assessment');
            }
          }
        }}
        />
      </Suspense>;
    }

    switch (currentSubject) {
      case 'math':
        if (!mathSubGame) return <MathHome onSelectSubGame={setMathSubGame} onBack={handleBackToHome} onHome={handleBackToHome} language={language} />;
        if (mathSubGame === 'operations') {
          return !isPlaying
            ? <OpsLandingPage onStart={handleStartGame} onBack={() => setMathSubGame(null)} onHome={handleBackToHome} language={language} />
            : <MathOperationsGame operation={gameConfig.operation} difficulty={gameConfig.difficulty} nums={gameConfig.nums} quizType={gameConfig.quizType} onBack={handleBackToMenu} onHome={handleBackToHome} language={language} />;
        }
        if (mathSubGame === 'datetime') {
          if (!isPlaying) return <TimeGameMenu onBack={() => setMathSubGame(null)} onStart={handleStartTimeGame} onHome={handleBackToHome} language={language} />;
          if (dateTimeSubGame === 'months')          return <MonthsGame    onBack={handleBackToMenu} onHome={handleBackToHome} language={language} />;
          if (dateTimeSubGame === 'clock')           return <ClockGame     onBack={handleBackToMenu} onHome={handleBackToHome} language={language} />;
          if (dateTimeSubGame === 'month-learning')  return <MonthLearning onBack={handleBackToMenu} onHome={handleBackToHome} language={language} />;
        }
        if (mathSubGame === 'faq') {
          return <ColumnMathGame onBack={() => setMathSubGame(null)} language={language} />;
        }
        return <MathHome onSelectSubGame={setMathSubGame} onBack={handleBackToHome} onHome={handleBackToHome} language={language} />;
      case 'bm':
        return <BMPage onBack={handleBackToHome} onHome={handleBackToHome} language={language} />;
      case 'matematik-kssr':
        // ── Topic games ──
        if (matematikTopic === 'nombor-100')        return <Nombor100       onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === 'tambah-tolak')      return <Tambah100       onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === 'tambah-cerita')     return <SubtractionStory onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === 'wang-t1')           return <CountingMoney   onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === 'masa-t1')           return <TimeTeller      onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === 'ukuran-t1-panjang') return <UkurPanjang     onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === 'ukuran-t1-jisim')   return <Jisim           onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === 'ukuran-t1-cecair')  return <IsiPaduCecair  onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === 'ruang-t1')          return <Bentuk3D        onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === 'data-t1')           return <BacaPictograph  onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === '2-nombor-1000')     return <Nombor1000         onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === '2-tambah')          return <TambahTahun2       onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === '2-tolak')           return <TolakTahun2        onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === '2-darab')           return <DarabMudah         onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === '2-pecahan')         return <Pecahan            onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === '2-perpuluhan')      return <PerpuluhanT2       onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === '2-wang')            return <Wang              onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === '2-masa')            return <Masa              onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === '2-ukuran-panjang')  return <UkuranPanjangTahun2 onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === '3-nombor-10000')    return <Nombor10000        onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === '3-darab')           return <DarabLanjutan      onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === '3-bahagi')          return <BahagiTahun3       onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === '3-pecahan')         return <PecahanLanjutan    onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === '3-perpuluhan')      return <Perpuluhan         onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === '3-wang')            return <WangTahun3         onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === '3-masa')            return <MasaTahun3         onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === '3-perimeter')       return <PerimeterLuas      onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === '3-operasi-bergabung') return <OperasiBergabungT3 onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === '3-peratus')          return <PeratusT3          onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === '3-ukuran')           return <UkuranT3           onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === '3-data')             return <DataT3             onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === '3-kebarangkalian')   return <KebarangkalianT3   onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === 'pecahan-asas')       return <PecahanAsasT1      onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === '2-bahagi')           return <BahagiT2           onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === '2-ukuran-jisim-cecair') return <JisimCecairT2   onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === '2-geometri')         return <GeometriT2         onBack={() => setMatematikTopic(null)} language={language} />;
        if (matematikTopic === '2-data')             return <DataT2             onBack={() => setMatematikTopic(null)} language={language} />;

        // ── Module hub (matematikModule set, no topic) ──
        if (matematikModule) {
          const hubOnBack = () => { setMatematikModule(null); setMatematikTopic(null); };
          let hubComponent;
          const strip = (id) => id.replace(/^\d-/, '');
          const mod = strip(matematikModule);
          if (mod === 'nombor')    hubComponent = matematikYear === 1 ? <NomborModule /> : matematikYear === 2 ? <NomborModuleT2 /> : <NomborModuleT3 />;
          if (mod === 'sukatan')   hubComponent = matematikYear === 1 ? <SukatanModule /> : matematikYear === 2 ? <SukatanModuleT2 /> : <SukatanModuleT3 />;
          if (mod === 'statistik') hubComponent = matematikYear === 1 ? <StatistikModule /> : matematikYear === 2 ? <StatistikModuleT2 /> : <StatistikModuleT3 />;
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <MatematikModulePage year={matematikYear} activeModule={matematikModule} language={language}
                onBack={hubOnBack}
                onModuleChange={(id) => navigate(() => { setMatematikModule(id); setMatematikTopic(null); })}
                onSelectTopic={(id) => navigate(() => setMatematikTopic(id))}>
                {hubComponent}
              </MatematikModulePage>
            </Suspense>
          );
        }

        // ── Year selector ──
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <MatematikHomePage onBack={handleBackToHome} language={language}
              onSelectYear={(y) => navigate(() => { setMatematikYear(y); setMatematikModule(y === 1 ? 'nombor' : y === 2 ? '2-nombor' : '3-nombor'); })} />
          </Suspense>
        );
      case 'pendidikan-islam-v1':
        // ── Lessons (islamTopic set) ──
        if (islamModule === '2-al-quran' && islamTopic === 'sukun-syaddah')     { return <SukunSyaddah     onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '2-al-quran' && islamTopic === 'idgham')            { return <Idgham           onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '2-al-quran' && islamTopic === 'tilawah-tahun2')    { return <TilawahTahun2    onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '2-al-quran' && islamTopic === 'hadis-tahun2')      { return <Hadis            onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '2-akidah'   && islamTopic === 'malaikat')          { return <Malaikat          onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '2-akidah'   && islamTopic === 'asmaul-husna-tahun2'){return <AsmaulHusnaTahun2 onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '2-akidah'   && islamTopic === 'syirik')            { return <Syirik            onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '2-ibadah'   && islamTopic === 'syarat-solat')      { return <SyaratSolat       onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '2-ibadah'   && islamTopic === 'rukun-solat')       { return <RukunSolat        onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '2-ibadah'   && islamTopic === 'azan-iqamah')       { return <AzanIqamah        onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '2-sirah'    && islamTopic === 'tanda-kerasulan')   { return <TandaKerasulan    onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '2-sirah'    && islamTopic === 'wahyu-pertama')     { return <WahyuPertama      onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '2-sirah'    && islamTopic === 'dakwah-awal')       { return <DakwahAwal        onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '2-adab'     && islamTopic === 'adab-berpakaian')    { return <AdabBerpakaian   onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '2-adab'     && islamTopic === 'adab-kasih-sayang')  { return <AdabKasihSayang  onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '2-adab'     && islamTopic === 'adab-berkawan')     { return <AdabBerkawan     onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '2-jawi'     && islamTopic === 'suku-kata-tertutup'){ return <SukuKataTertutup  onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '2-jawi'     && islamTopic === 'rangkai-kata-jawi') { return <RangkaiKataJawi  onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === 'al-quran'   && islamTopic === 'huruf-hijaiyah')    { return <HurufHijaiyah    onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === 'al-quran'   && islamTopic === 'tanda-bacaan')      { return <TandaBacaan      onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === 'al-quran'   && islamTopic === 'tanwin')            { return <Tanwin           onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === 'al-quran'   && islamTopic === 'hafazan')           { return <Hafazan          onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === 'akidah'     && islamTopic === 'rukun-iman')        { return <RukunIman        onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === 'akidah'     && islamTopic === 'rukun-islam')       { return <RukunIslam       onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === 'akidah'     && islamTopic === 'syahadah')          { return <Syahadah         onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === 'akidah'     && islamTopic === 'asmaul-husna-khaliq'){return <AsmaulHusnaKhaliq onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === 'ibadah'     && islamTopic === 'istinja')           { return <Istinja          onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === 'ibadah'     && islamTopic === 'air-mutlak')        { return <AirMutlak        onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === 'ibadah'     && islamTopic === 'amali-wuduk')       { return <AmaliWuduk       onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === 'sirah'      && islamTopic === 'nasab-keturunan')   { return <NasabKeturunan   onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === 'sirah'      && islamTopic === 'kelahiran-penyusuan'){return <KelahiranPenyusuan onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === 'sirah'      && islamTopic === 'sifat-al-amin')     { return <SifatAlAmin      onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === 'adab'       && islamTopic === 'adab-makan-minum')  { return <AdabMakanMinum   onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === 'adab'       && islamTopic === 'adab-tidur')        { return <AdabTidur        onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === 'adab'       && islamTopic === 'adab-tandas')       { return <AdabTandas       onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === 'jawi'       && islamTopic === 'huruf-jawi-tunggal'){ return <JawiKVLearningPage  onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === 'jawi'       && islamTopic === 'suku-kata-terbuka-jawi'){return <JawiKVKLearningPage onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === 'jawi'       && islamTopic === 'jawi-alphabet')     { return <JawiAlphabetPage onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === 'jawi'       && islamTopic === 'jawi-100-words')    { return <JawiWordsPage    onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === 'jawi'       && islamTopic === 'jawi-suku-kata-game'){return <JawiSyllablesGame onBack={() => setIslamTopic(null)} onHome={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '2-jawi'     && islamTopic === 'jawi-ayat-pendek')  { return <AyatPendekJawi   onBack={() => setIslamTopic(null)} language={language} />; }

        // ── Tahun 3 Lessons ──
        if (islamModule === '3-al-quran' && islamTopic === 'mim-sakinah')        { return <MimSakinah       onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '3-al-quran' && islamTopic === 'tilawah-tahun3')     { return <TilawahTahun3    onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '3-al-quran' && islamTopic === 'kefahaman-al-asr')   { return <KefahamanAlAsr   onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '3-al-quran' && islamTopic === 'hadis-tahun3')       { return <HadisTahun3      onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '3-akidah'   && islamTopic === 'kitab-allah')        { return <KitabAllah        onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '3-akidah'   && islamTopic === 'al-quran-panduan')   { return <AlQuranPanduan    onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '3-akidah'   && islamTopic === 'asmaul-husna-tahun3'){ return <AsmaulHusnaTahun3 onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '3-ibadah'   && islamTopic === 'pembatal-solat')     { return <PembatalSolat    onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '3-ibadah'   && islamTopic === 'khusyuk-solat')      { return <KhusyukSolat     onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '3-ibadah'   && islamTopic === 'fardu-ain-kifayah')  { return <FarduAinKifayah  onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '3-sirah'    && islamTopic === 'hijrah-madinah')     { return <HijrahMadinah    onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '3-sirah'    && islamTopic === 'piagam-madinah')     { return <PiagamMadinah    onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '3-sirah'    && islamTopic === 'kepimpinan-nabi')    { return <KepimpinanNabi   onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '3-adab'     && islamTopic === 'adab-menuntut-ilmu')  { return <AdabMenuntutIlmu onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '3-adab'     && islamTopic === 'adab-hormat-guru')    { return <AdabHormatGuru  onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '3-adab'     && islamTopic === 'adab-kemudahan-awam') { return <AdabKemudahanAwam onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '3-jawi'     && islamTopic === 'imbuhan-jawi')       { return <ImbuhanJawi      onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '3-jawi'     && islamTopic === 'petikan-jawi')       { return <PetikanJawi      onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '3-jawi'     && islamTopic === 'tanda-baca-jawi')    { return <TandaBacaJawi    onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '3-jawi'     && islamTopic === 'ayat-panjang')       { return <JawiReadingPage4 onBack={() => setIslamTopic(null)} language={language} />; }
        if (islamModule === '3-jawi'     && islamTopic === 'short_stories')      { return <JawiShortStoriesPage onBack={() => setIslamTopic(null)} language={language} />; }

        // ── Hub + Nav page (islamModule set, no topic) ──
        if (islamModule) {
          const hubOnBack = () => { setIslamModule(null); setIslamTopic(null); };
          const onModuleChange = (id) => navigate(() => { setIslamYear(id.startsWith('2-') ? 2 : id.startsWith('3-') ? 3 : 1); setIslamModule(id); setIslamTopic(null); });
          const hubProps = { onBack: hubOnBack, language, onSelectTopic: (id) => navigate(() => setIslamTopic(id)) };
          let hub;
          switch (islamModule) {
            case '2-al-quran': hub = <AlQuranTajwidHadisModule {...hubProps} />; break;
            case '2-akidah':   hub = <AkidahModuleT2           {...hubProps} />; break;
            case '2-ibadah':   hub = <IbadahModuleT2           {...hubProps} />; break;
            case '2-sirah':    hub = <SirahModuleT2            {...hubProps} />; break;
            case '2-adab':     hub = <AdabModuleT2             {...hubProps} />; break;
            case '2-jawi':     hub = <JawiModuleT2             {...hubProps} />; break;
            case '3-al-quran': hub = <AlQuranTajwidHadisModuleT3 {...hubProps} />; break;
            case '3-akidah':   hub = <AkidahModuleT3             {...hubProps} />; break;
            case '3-ibadah':   hub = <IbadahModuleT3             {...hubProps} />; break;
            case '3-sirah':    hub = <SirahModuleT3              {...hubProps} />; break;
            case '3-adab':     hub = <AdabModuleT3               {...hubProps} />; break;
            case '3-jawi':     hub = <JawiModuleT3               {...hubProps} />; break;
            case 'al-quran':   hub = <AlQuranTajwidModule      {...hubProps} />; break;
            case 'akidah':     hub = <AkidahModule             {...hubProps} />; break;
            case 'ibadah':     hub = <IbadahModule             {...hubProps} />; break;
            case 'sirah':      hub = <SirahModule              {...hubProps} />; break;
            case 'adab':       hub = <AdabModule               {...hubProps} />; break;
            case 'jawi':       hub = <JawiModule               {...hubProps} />; break;
          }
          return (
            <TahunModulePage
              year={islamYear}
              activeModule={islamModule}
              language={language}
              onModuleChange={onModuleChange}
              onBack={hubOnBack}
              onSelectTopic={(id) => navigate(() => setIslamTopic(id))}
            >
              {hub}
            </TahunModulePage>
          );
        }

        return <PendidikanIslamHomePage initialYear={islamYear} onBack={handleBackToHome} language={language} onSelectModule={(id) => navigate(() => { const y = id.startsWith('2-') ? 2 : id.startsWith('3-') ? 3 : 1; setIslamYear(y); setIslamModule(id); })} />;
      case 'bm-kssr':
        // ── Module hub (bmModule set, no topic) ──
        if (bmModule) {
          const hubOnBack = () => { setBmModule(null); setBmTopic(null); };
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <BahasaMelayuModulePage year={bmYear} activeModule={bmModule} language={language}
                onBack={hubOnBack}
                onModuleChange={(id) => navigate(() => { setBmModule(id); setBmTopic(null); })}
                onSelectTopic={(id) => navigate(() => setBmTopic(id))}>
                <BMModuleHubLayout year={bmYear} activeModule={bmModule} language={language}
                  onModuleChange={(id) => navigate(() => { setBmModule(id); setBmTopic(null); })}
                  onSelectTopic={(id) => navigate(() => setBmTopic(id))} />
              </BahasaMelayuModulePage>
            </Suspense>
          );
        }

        // ── Year selector ──
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <BahasaMelayuHomePage onBack={handleBackToHome} language={language}
              onSelectYear={(y) => navigate(() => { setBmYear(y); setBmModule(y === 1 ? 'mendengar' : y === 2 ? '2-mendengar' : '3-mendengar'); })} />
          </Suspense>
        );
      case 'reading':
        return <ReadingPage onBack={handleBackToHome} language={language} />;
      default:
        // Age-group routing takes precedence over the default home screen.
        if (currentAgeGame === 'alphabet-safari') {
          return <AlphabetSafari onBack={() => setCurrentAgeGame(null)} language={language} theme={THEMES[currentTheme]} />;
        }
        if (currentAgeGame === 'letter-trace') {
          return <LetterTrace onBack={() => setCurrentAgeGame(null)} language={language} theme={THEMES[currentTheme]} />;
        }
        if (currentAgeGame === 'phonics-pop') {
          return <PhoneticsPop onBack={() => setCurrentAgeGame(null)} language={language} theme={THEMES[currentTheme]} />;
        }
        if (currentAgeGame === 'sound-matching') {
          return <SoundMatching onBack={() => setCurrentAgeGame(null)} language={language} theme={THEMES[currentTheme]} />;
        }
        if (currentAgeGame === 'letter-sound-puzzle') {
          return <LetterSoundPuzzle onBack={() => setCurrentAgeGame(null)} language={language} theme={THEMES[currentTheme]} />;
        }
        if (currentAgeGame === 'alphabet-cards') {
          return <KVLearningPage46 onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'number-cards') {
          return <NumberCards onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'counting-stars') {
          return <BelajarMengira onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'shape-sorter') {
          return <ShapeSorter onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'number-match') {
          return <NumberMatch onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'apple-addition') {
          return <AppleAddition onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'missing-number') {
          return <MissingNumber onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'sebut-huruf') {
          return <SpeakingGame4to6 category="huruf" onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'sebut-perkataan') {
          return <SpeakingGame4to6 category="perkataan" onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'sebut-nombor') {
          return <SpeakingGame4to6 category="nombor" onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'jawi-letter-cards') {
          return <JawiLetterCards onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'jawi-letter-match') {
          return <JawiLetterMatch onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'sentence-builder') {
          return <SentenceBuilder onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'suku-kata-bina-perkataan') {
          return <SukuKataBinaPerkataan onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'jenis-kata') {
          return <JenisKata onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'kata-tanya') {
          return <KataTanya onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'kata-hubung-sendi') {
          return <KataHubungSendi onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'kata-imbuhan') {
          return <KataImbuhan onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'ejaan-tanda-baca') {
          return <EjaanTandaBaca onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'kata-ganda') {
          return <KataGanda onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'kefahaman-bacaan') {
          return <KefahamanBacaan onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'baca-suku-kata-jawi') {
          return <BacaSukuKataJawi onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'bina-perkataan-jawi') {
          return <BinaPerkataanJawi onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'padan-perkataan-jawi') {
          return <PadanPerkataanJawi onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'baca-ayat-jawi') {
          return <BacaAyatJawi onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'tulis-jawi') {
          return <TulisJawi onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'padanan-huruf-jawi') {
          return <JawiMatchGame onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'iqra-buku') {
          return <IqraPage onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'time-teller') {
          return <TimeTeller onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'counting-money') {
          return <CountingMoney onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'subtraction-story') {
          return <SubtractionStory onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'baca-ayat-kuat') {
          return <BacaAyatKuat onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'bertutur-bertatasusila') {
          return <BertuturBertatasusila onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'jawab-soalan') {
          return <JawabSoalan onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'sebut-lawan-kata') {
          return <SebutLawanKata onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'sebut-frasa-bergambar') {
          return <SebutFrasaBergambar onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'nombor-100') {
          return <Nombor100 onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'tambah-100') {
          return <Tambah100 onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'bentuk-3d') {
          return <Bentuk3D onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'ukur-panjang') {
          return <UkurPanjang onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'baca-pictograph') {
          return <BacaPictograph onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'jisim') {
          return <Jisim onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'isi-padu-cecair') {
          return <IsiPaduCecair onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'kosa-kata-kontekstual') {
          return <KosaKataKontekstual onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'bacaan-pemahaman') {
          return <BacaanPemahaman onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'cerita-bacaan') {
          return <CeritaBacaan onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'pengenalan-nilai') {
          return <PengenalanNilai onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'pantun-bacaan') {
          return <PantunBacaan onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'darab-mudah') {
          return <DarabMudah onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'wang-tahun2') {
          return <Wang onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'masa-tahun2') {
          return <Masa onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'pecahan-tahun2') {
          return <Pecahan onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'nombor-1000') {
          return <Nombor1000 onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'tambah-tahun2') {
          return <TambahTahun2 onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'tolak-tahun2') {
          return <TolakTahun2 onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'ukuran-panjang-tahun2') {
          return <UkuranPanjangTahun2 onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'baca-petikan-jawi') {
          return <BacaPetikanJawi onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'padan-kata-kerja-jawi') {
          return <PadanKataKerjaJawi onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'susun-ayat-jawi') {
          return <SusunAyatJawi onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'lafaz-pantun') {
          return <LafazPantun onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'jenis-ayat') {
          return <JenisAyat onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'penjodoh-bilangan') {
          return <PenjodohBilangan onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'imbuhan-lanjutan') {
          return <ImbuhanLanjutan onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'simpulan-bahasa') {
          return <SimpulanBahasa onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'bacaan-pemahaman-lanjutan') {
          return <BacaanPemahamanLanjutan onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'nombor-10000') {
          return <Nombor10000 onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'darab-lanjutan') {
          return <DarabLanjutan onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'bahagi-tahun3') {
          return <BahagiTahun3 onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'pecahan-lanjutan') {
          return <PecahanLanjutan onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'perpuluhan') {
          return <Perpuluhan onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'wang-tahun3') {
          return <WangTahun3 onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'masa-tahun3') {
          return <MasaTahun3 onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGame === 'perimeter-luas') {
          return <PerimeterLuas onBack={() => setCurrentAgeGame(null)} language={language} />;
        }
        if (currentAgeGroup) {
          const ageGroupComponents = {
            'age-4-6': EarlyExplorersHome,
            'age-7': Grade1AdventurersHome,
            'age-8': Grade2DiscoverersHome,
            'age-9': Grade3AchieversHome,
          };
          const AgeGroupComponent = ageGroupComponents[currentAgeGroup];
          if (AgeGroupComponent) {
            return (
              <AgeGroupComponent
                onBack={() => setCurrentAgeGroup(null)}
                onPlayGame={(gameId) => navigate(() => setCurrentAgeGame(gameId))}
                language={language}
              />
            );
          }
        }
        return <HomePage
          onSelectSubject={(s) => navigate(() => setCurrentSubject(s))}
          onSelectAgeGroup={(g) => navigate(() => setCurrentAgeGroup(g))}
          language={language}
          playerName={playerName}
          gameState={gameState}
          streak={streak}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onHome={handleBackToHome}
          onToggleLang={handleToggleLang}
          theme={THEMES[currentTheme]}
        />;
    }
  };

  return (
    <GameStateContext.Provider value={gameState}>
      {/* Desktop Sidebar — rendered outside .app-container, inside #root row */}
      {isDesktop && !shouldHideSidebar && (
        <DesktopSidebar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          language={language}
          onToggleLanguage={handleToggleLang}
          playerName={playerName}
          gameState={gameState}
          onHome={handleBackToHome}
          theme={THEMES[currentTheme]}
          onThemeChange={setCurrentTheme}
          themes={THEMES}
        />
      )}

      <div
        className={`app-container${activeTab === 'leaderboard' ? ' app-leaderboard' : ''}${activeTab === 'learn' && !currentSubject && !currentAgeGroup ? ' app-home' : ''}`}
        style={{
          '--theme-hero-bg':     THEMES[currentTheme].heroBg,
          '--theme-hero-border': THEMES[currentTheme].heroBorder,
          '--theme-planet-body': THEMES[currentTheme].planetBody,
          '--theme-planet-ring': THEMES[currentTheme].planetRing,
        }}
      >
        {!playerName && <Suspense fallback={null}><WelcomeModal onSave={handleSaveName} /></Suspense>}
        <Suspense fallback={null}><LevelUpToast level={levelUpInfo?.newLevel} onDismiss={clearLevelUp} /></Suspense>

        {/* Loading veil — sits on top of the current page (kept visible by the
            useTransition above) while the next page's lazy chunk loads. */}
        {isPending && <LoadingSpinner overlay />}

        {/* Page Content.
            Suspense sits OUTSIDE the keyed view-container so the boundary keeps a
            stable identity across navigations. That lets useTransition keep the
            current page visible (with the overlay spinner on top) while the next
            page's chunk loads, instead of blanking to the fallback. The fallback
            now only shows on a true cold mount, when there's nothing to keep. */}
        <div className="app-content">
          <Suspense fallback={<LoadingSpinner />}>
            <div key={viewKey} ref={viewContainerRef} className="view-container">
              {renderContent()}
            </div>
          </Suspense>
        </div>

        {/* CosmicMobileNav — rendered outside view-container so position:fixed works correctly */}
        {!inActiveQuiz && !selectedAssessment && !currentAgeGame && !currentAgeGroup && !currentSubject && (
          <CosmicMobileNav
            activeTab={activeTab}
            language={language}
            onTabChange={handleTabChange}
            onHome={handleBackToHome}
            onToggleLang={handleToggleLang}
            theme={THEMES[currentTheme]}
            themes={THEMES}
            onThemeChange={setCurrentTheme}
          />
        )}
      </div>
    </GameStateContext.Provider>
  );
}
