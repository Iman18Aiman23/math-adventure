import Tahun1ModuleHubLayout from '../Tahun1ModuleHubLayout';

const THEME = {
  pageGradient: 'linear-gradient(180deg, #FAF5FF 0%, #F3E8FF 40%, #FAFAFF 100%)',
  dark: '#4C1D95',
  accent: '#8B5CF6',
  stageGradient: 'linear-gradient(145deg, #5B21B6, #7A55E0, #A78BFA)',
  pillGradient: 'linear-gradient(135deg, #7A55E0, #A78BFA)',
};

const NasabSvg = () => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="20" r="10" fill="#8B5CF6" stroke="#4C1D95" strokeWidth="2" />
    <circle cx="60" cy="55" r="10" fill="#A78BFA" stroke="#4C1D95" strokeWidth="2" />
    <circle cx="60" cy="90" r="10" fill="#C4B5FD" stroke="#4C1D95" strokeWidth="2" />
    <line x1="60" y1="30" x2="60" y2="45" stroke="#4C1D95" strokeWidth="2" />
    <line x1="60" y1="65" x2="60" y2="80" stroke="#4C1D95" strokeWidth="2" />
    <line x1="60" y1="55" x2="35" y2="38" stroke="#7C3AED" strokeWidth="1.5" />
    <line x1="60" y1="55" x2="85" y2="38" stroke="#7C3AED" strokeWidth="1.5" />
    <circle cx="35" cy="38" r="7" fill="#DDD6FE" stroke="#7C3AED" strokeWidth="1.5" />
    <circle cx="85" cy="38" r="7" fill="#DDD6FE" stroke="#7C3AED" strokeWidth="1.5" />
    <line x1="60" y1="20" x2="40" y2="10" stroke="#7C3AED" strokeWidth="1.5" />
    <line x1="60" y1="20" x2="80" y2="10" stroke="#7C3AED" strokeWidth="1.5" />
    <circle cx="40" cy="10" r="5" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1" />
    <circle cx="80" cy="10" r="5" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1" />
  </svg>
);

const KelahiranSvg = () => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="70" rx="25" ry="30" fill="#E0F2FE" stroke="#06B6D4" strokeWidth="2" />
    <circle cx="60" cy="55" r="12" fill="#FDF4FF" stroke="#F472B6" strokeWidth="2" />
    <path d="M54 65 Q60 72 66 65" stroke="#F472B6" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <circle cx="55" cy="52" r="1.5" fill="#333" />
    <circle cx="65" cy="52" r="1.5" fill="#333" />
    <path d="M60 115 L60 98" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" />
    <path d="M48 102 Q60 95 72 102" stroke="#A78BFA" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M60 15 L60 28" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
    <path d="M48 20 L52 24" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
    <path d="M72 20 L68 24" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
    <polygon points="60,5 62,11 68,12 63,16 65,22 60,18 55,22 57,16 52,12 58,11" fill="#FBBF24" />
  </svg>
);

const AlAminSvg = () => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="60,5 67,22 85,25 72,37 75,55 60,46 45,55 48,37 35,25 53,22" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2" />
    <line x1="60" y1="46" x2="60" y2="75" stroke="#FCD34D" strokeWidth="3" strokeLinecap="round" />
    <line x1="40" y1="65" x2="52" y2="56" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />
    <line x1="80" y1="65" x2="68" y2="56" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />
    <line x1="35" y1="80" x2="52" y2="73" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />
    <line x1="85" y1="80" x2="68" y2="73" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />
    <line x1="60" y1="75" x2="72" y2="88" stroke="#FCD34D" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="60" y1="75" x2="48" y2="88" stroke="#FCD34D" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="60" cy="46" r="6" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
    <circle cx="60" cy="90" r="18" fill="none" stroke="#FDE68A" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
    <circle cx="60" cy="90" r="26" fill="none" stroke="#FEF3C7" strokeWidth="1.5" strokeDasharray="3 5" opacity="0.4" />
  </svg>
);

const topics = [
  {
    id: 'nasab-keturunan',
    title: "Nasab & Keturunan Nabi SAW",
    desc: 'Mengenal salasilah keturunan Nabi Muhammad SAW yang mulia',
    num: '4.1',
    visual: <NasabSvg />,
  },
  {
    id: 'kelahiran-penyusuan',
    title: 'Kelahiran & Penyusuan',
    desc: "Kisah kelahiran Nabi dan penyusuan di perkampungan Bani Sa'ad",
    num: '4.2',
    visual: <KelahiranSvg />,
  },
  {
    id: 'sifat-al-amin',
    title: 'Sifat Terpuji: Al-Amin',
    desc: 'Nabi Muhammad digelar Al-Amin kerana sifat amanah dan jujur',
    num: '4.3',
    visual: <AlAminSvg />,
  },
];

export default function SirahModule({ onBack, onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout
      theme={THEME}
      moduleNum={4}
      moduleName="Sirah"
      moduleNameEn="Biography"
      topics={topics}
      onBack={onBack}
      onSelectTopic={onSelectTopic}
      language={language}
    />
  );
}
