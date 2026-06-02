import React from 'react';
import Tahun1ModuleLayout, { TopicCard } from '../Tahun1ModuleLayout';

const TOPICS = [
  {
    id: 'istinja',
    num: '3.1',
    emoji: '💧',
    title: "Konsep Istinja'",
    desc: "Cara membersihkan diri selepas buang air besar atau kecil",
    total: 4,
    unit: 'konsep',
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    border: 'rgba(37,99,235,0.45)',
    glow:   'rgba(37,99,235,0.3)',
    dark:   '#1E40AF',
    available: true,
  },
  {
    id: 'air-mutlak',
    num: '3.2',
    emoji: '🌊',
    title: 'Air Mutlak',
    desc: 'Mengenal air suci yang boleh digunakan untuk bersuci',
    total: 3,
    unit: 'jenis',
    gradient: 'linear-gradient(135deg, #D0F7FA 0%, #67D6E8 55%, #0891B2 100%)',
    border: 'rgba(8,145,178,0.45)',
    glow:   'rgba(8,145,178,0.3)',
    dark:   '#0C4A6E',
    available: true,
  },
  {
    id: 'amali-wuduk',
    num: '3.3',
    emoji: '🤲',
    title: 'Amali Wuduk',
    desc: 'Rukun, sunat dan perkara yang membatalkan wuduk',
    total: 6,
    unit: 'rukun',
    gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    border: 'rgba(42,154,108,0.45)',
    glow:   'rgba(42,154,108,0.3)',
    dark:   '#065F46',
    available: true,
  },
];

export default function IbadahModule({ onBack, onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleLayout
      heroIcon="🕋"
      heroTitle={language === 'bm' ? 'Modul 3: Ibadah' : 'Module 3: Ibadah'}
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
