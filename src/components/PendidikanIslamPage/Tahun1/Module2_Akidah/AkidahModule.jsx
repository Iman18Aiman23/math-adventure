import React from 'react';
import Tahun1ModuleLayout, { TopicCard } from '../Tahun1ModuleLayout';

const TOPICS = [
  {
    id: 'rukun-iman',
    num: '2.1',
    emoji: '🕌',
    title: 'Rukun Iman',
    desc: 'Enam perkara yang wajib diimani oleh setiap Muslim',
    total: 6,
    unit: 'rukun',
    gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    border: 'rgba(42,154,108,0.45)',
    glow:   'rgba(42,154,108,0.3)',
    dark:   '#065F46',
    available: true,
  },
  {
    id: 'rukun-islam',
    num: '2.2',
    emoji: '🌙',
    title: 'Rukun Islam',
    desc: 'Lima amalan asas yang menjadi tiang agama Islam',
    total: 5,
    unit: 'rukun',
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    border: 'rgba(37,99,235,0.45)',
    glow:   'rgba(37,99,235,0.3)',
    dark:   '#1E40AF',
    available: true,
  },
  {
    id: 'syahadah',
    num: '2.3',
    emoji: '✨',
    title: 'Dua Kalimah Syahadah',
    desc: 'Lafaz, makna dan kepentingan mengucap syahadah',
    total: 2,
    unit: 'kalimah',
    gradient: 'linear-gradient(135deg, #E7D9FF 0%, #B79CFF 55%, #7A55E0 100%)',
    border: 'rgba(122,85,224,0.45)',
    glow:   'rgba(122,85,224,0.3)',
    dark:   '#4C1D95',
    available: true,
  },
  {
    id: 'asmaul-husna-khaliq',
    num: '2.4',
    emoji: '🌟',
    title: 'Asmaul Husna: Al-Khaliq',
    desc: 'Mengenal Allah sebagai Pencipta segala-galanya',
    total: 1,
    unit: 'nama',
    gradient: 'linear-gradient(135deg, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
    border: 'rgba(212,150,10,0.45)',
    glow:   'rgba(212,150,10,0.3)',
    dark:   '#92400E',
    available: true,
  },
];

export default function AkidahModule({ onBack, onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleLayout
      heroIcon="🕌"
      heroTitle={language === 'bm' ? 'Modul 2: Akidah' : 'Module 2: Akidah'}
      heroSubtitle={language === 'bm' ? '4 topik · Tap topik untuk mula belajar' : '4 topics · Tap a topic to start learning'}
      sectionLabel={language === 'bm' ? 'PILIH TOPIK' : 'SELECT TOPIC'}
      onBack={onBack}
    >
      {TOPICS.map(topic => (
        <TopicCard key={topic.id} topic={topic} onClick={() => onSelectTopic?.(topic.id)} language={language} />
      ))}
    </Tahun1ModuleLayout>
  );
}
