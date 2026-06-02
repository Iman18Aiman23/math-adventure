import React from 'react';
import Tahun1ModuleLayout, { TopicCard } from '../Tahun1ModuleLayout';

const TOPICS = [
  {
    id: 'huruf-jawi-tunggal',
    num: '6.1',
    emoji: '✍️',
    title: 'Huruf Jawi Tunggal',
    desc: 'Mengenal, menyebut dan menulis 37 huruf Jawi tunggal',
    total: 37,
    unit: 'huruf',
    gradient: 'linear-gradient(135deg, #D0F7FA 0%, #67D6E8 55%, #0891B2 100%)',
    border: 'rgba(8,145,178,0.45)',
    glow:   'rgba(8,145,178,0.3)',
    dark:   '#0C4A6E',
    available: true,
  },
  {
    id: 'suku-kata-terbuka-jawi',
    num: '6.2',
    emoji: '📝',
    title: 'Suku Kata Terbuka',
    desc: 'Membaca suku kata terbuka Jawi dengan vokal Alif, Wau dan Ya',
    total: 3,
    unit: 'vokal',
    gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    border: 'rgba(42,154,108,0.45)',
    glow:   'rgba(42,154,108,0.3)',
    dark:   '#065F46',
    available: true,
  },
];

export default function JawiModule({ onBack, onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleLayout
      heroIcon="✍️"
      heroTitle={language === 'bm' ? 'Modul 6: Celik Jawi' : 'Module 6: Celik Jawi'}
      heroSubtitle={language === 'bm' ? '2 topik · Tap topik untuk mula belajar' : '2 topics · Tap a topic to start learning'}
      sectionLabel={language === 'bm' ? 'PILIH TOPIK' : 'SELECT TOPIC'}
      onBack={onBack}
    >
      {TOPICS.map(topic => (
        <TopicCard key={topic.id} topic={topic} onClick={() => onSelectTopic?.(topic.id)} language={language} />
      ))}
    </Tahun1ModuleLayout>
  );
}
