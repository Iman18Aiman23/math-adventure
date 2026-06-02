import React from 'react';
import Tahun1ModuleLayout, { TopicCard } from '../Tahun1ModuleLayout';

const TOPICS = [
  {
    id: 'adab-makan-minum',
    num: '5.1',
    emoji: '🍽️',
    title: 'Adab Makan & Minum',
    desc: 'Belajar adab sebelum, semasa dan selepas makan serta minum',
    total: 4,
    unit: 'adab',
    gradient: 'linear-gradient(135deg, #FFE9F3 0%, #FFBFDD 55%, #FF8CBF 100%)',
    border: 'rgba(255,128,187,0.45)',
    glow:   'rgba(255,128,187,0.3)',
    dark:   '#9F1239',
    available: true,
  },
  {
    id: 'adab-tidur',
    num: '5.2',
    emoji: '🌙',
    title: 'Adab Tidur & Bangun',
    desc: 'Amalan dan doa sebelum tidur serta selepas bangun tidur',
    total: 4,
    unit: 'adab',
    gradient: 'linear-gradient(135deg, #D0F7FA 0%, #67D6E8 55%, #0891B2 100%)',
    border: 'rgba(8,145,178,0.45)',
    glow:   'rgba(8,145,178,0.3)',
    dark:   '#0C4A6E',
    available: true,
  },
  {
    id: 'adab-tandas',
    num: '5.3',
    emoji: '🚻',
    title: 'Adab Masuk & Keluar Tandas',
    desc: 'Tata cara masuk dan keluar tandas mengikut sunnah Nabi',
    total: 4,
    unit: 'adab',
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    border: 'rgba(37,99,235,0.45)',
    glow:   'rgba(37,99,235,0.3)',
    dark:   '#1E40AF',
    available: true,
  },
];

export default function AdabModule({ onBack, onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleLayout
      heroIcon="🌸"
      heroTitle={language === 'bm' ? 'Modul 5: Adab & Akhlak' : 'Module 5: Adab & Akhlak'}
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
