import React from 'react';
import Tahun1ModuleLayout, { TopicCard } from '../Tahun1ModuleLayout';

const TOPICS = [
  {
    id: 'nasab-keturunan',
    num: '4.1',
    emoji: '🌳',
    title: 'Nasab & Keturunan Nabi SAW',
    desc: 'Mengenal salasilah keturunan Nabi Muhammad SAW yang mulia',
    total: 4,
    unit: 'peringkat',
    gradient: 'linear-gradient(135deg, #E7D9FF 0%, #B79CFF 55%, #7A55E0 100%)',
    border: 'rgba(122,85,224,0.45)',
    glow:   'rgba(122,85,224,0.3)',
    dark:   '#4C1D95',
    available: true,
  },
  {
    id: 'kelahiran-penyusuan',
    num: '4.2',
    emoji: '👶',
    title: 'Kelahiran & Penyusuan',
    desc: 'Kisah kelahiran Nabi dan penyusuan di perkampungan Bani Sa\'ad',
    total: 4,
    unit: 'peristiwa',
    gradient: 'linear-gradient(135deg, #D0F7FA 0%, #67D6E8 55%, #0891B2 100%)',
    border: 'rgba(8,145,178,0.45)',
    glow:   'rgba(8,145,178,0.3)',
    dark:   '#0C4A6E',
    available: true,
  },
  {
    id: 'sifat-al-amin',
    num: '4.3',
    emoji: '🌟',
    title: 'Sifat Terpuji: Al-Amin',
    desc: 'Nabi Muhammad digelar Al-Amin kerana sifat amanah dan jujur',
    total: 4,
    unit: 'sifat',
    gradient: 'linear-gradient(135deg, #FFE9F3 0%, #FFBFDD 55%, #FF8CBF 100%)',
    border: 'rgba(255,128,187,0.45)',
    glow:   'rgba(255,128,187,0.3)',
    dark:   '#9F1239',
    available: true,
  },
];

export default function SirahModule({ onBack, onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleLayout
      heroIcon="🕋"
      heroTitle={language === 'bm' ? 'Modul 4: Sirah' : 'Module 4: Sirah'}
      heroSubtitle={language === 'bm' ? '3 topik · Tap topik untuk mula belajar' : '3 topics · Tap a topic to start learning'}
      sectionLabel={language === 'bm' ? 'PILIH TOPIK' : 'SELECT TOPIC'}
      onBack={onBack}
    >
      {TOPICS.map(topic => (
        <TopicCard key={topic.id} topic={topic} onClick={() => onSelectTopic?.(topic.id)} language={language} />
      ))}
    </Tahun1ModuleLayout>
  );
}
