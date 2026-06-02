import Tahun1ModuleHubLayout from '../Tahun1ModuleHubLayout';

const THEME = {
  pageGradient: 'linear-gradient(180deg, #FFF1F2 0%, #FFE4E6 40%, #FFF5F6 100%)',
  dark: '#9F1239',
  accent: '#F43F5E',
  stageGradient: 'linear-gradient(145deg, #BE185D, #FF8CBF, #FBCFE8)',
  pillGradient: 'linear-gradient(135deg, #FF8CBF, #FDA4AF)',
};

const TOPICS = [
  {
    id: 'adab-makan-minum',
    title: 'Adab Makan & Minum',
    desc: 'Belajar adab sebelum, semasa dan selepas makan serta minum',
    num: '5.1',
    visual: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="50" fill="#FDF2F8" stroke="#F43F5E" strokeWidth="3" />
        <ellipse cx="60" cy="55" rx="32" ry="18" fill="#FFF1F2" stroke="#BE185D" strokeWidth="2.5" />
        <path d="M28 55 Q60 38 92 55" stroke="#F43F5E" strokeWidth="2" fill="none" />
        <rect x="52" y="24" width="4" height="14" rx="2" fill="#FDA4AF" />
        <rect x="64" y="24" width="4" height="14" rx="2" fill="#FDA4AF" />
        <ellipse cx="46" cy="62" rx="6" ry="3" fill="#F43F5E" opacity="0.3" />
        <ellipse cx="74" cy="62" rx="6" ry="3" fill="#F43F5E" opacity="0.3" />
        <circle cx="60" cy="78" r="3" fill="#BE185D" />
        <path d="M50 48 L60 44 L70 48" stroke="#BE185D" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    id: 'adab-tidur',
    title: 'Adab Tidur & Bangun',
    desc: 'Amalan dan doa sebelum tidur serta selepas bangun tidur',
    num: '5.2',
    visual: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="50" fill="#F0FDFA" stroke="#14B8A6" strokeWidth="3" />
        <path d="M70 38 Q88 50 82 68 Q74 82 56 82 Q38 82 34 66 Q40 48 56 42 Q62 38 70 38Z" fill="#CCFBF1" stroke="#0D9488" strokeWidth="2.5" />
        <circle cx="52" cy="58" r="4" fill="#FBBF24" />
        <circle cx="60" cy="50" r="2.5" fill="#FBBF24" />
        <circle cx="68" cy="60" r="3" fill="#FBBF24" />
        <circle cx="48" cy="66" r="2" fill="#FBBF24" />
        <circle cx="72" cy="48" r="1.8" fill="#FBBF24" />
        <path d="M48 74 Q56 72 64 74" stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <circle cx="54" cy="68" r="1.2" fill="#FBBF24" />
      </svg>
    ),
  },
  {
    id: 'adab-tandas',
    title: 'Adab Masuk & Keluar Tandas',
    desc: 'Tata cara masuk dan keluar tandas mengikut sunnah Nabi',
    num: '5.3',
    visual: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="50" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="3" />
        <rect x="40" y="36" width="40" height="48" rx="4" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2.5" />
        <circle cx="60" cy="50" r="12" fill="#BFDBFE" stroke="#2563EB" strokeWidth="2" />
        <path d="M48 68 Q60 78 72 68" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" fill="none" />
        <rect x="66" y="36" width="14" height="6" rx="2" fill="#3B82F6" />
        <path d="M76 64 L88 64 L88 72 L76 72Z" fill="#93C5FD" stroke="#2563EB" strokeWidth="1.5" />
        <line x1="82" y1="64" x2="82" y2="72" stroke="#2563EB" strokeWidth="1.5" />
        <rect x="48" y="28" width="4" height="10" rx="1.5" fill="#3B82F6" />
        <rect x="68" y="28" width="4" height="10" rx="1.5" fill="#3B82F6" />
      </svg>
    ),
  },
];

export default function AdabModule({ onBack, onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout
      theme={THEME}
      moduleNum={5}
      moduleName="Adab"
      moduleNameEn="Manners"
      topics={TOPICS}
      onBack={onBack}
      onSelectTopic={onSelectTopic}
      language={language}
    />
  );
}
