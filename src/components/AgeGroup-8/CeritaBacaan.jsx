import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { playSound, playHoverSound } from '../../utils/soundManager';
import BackButton from '../BackButton';

// KSSR BM Tahun 2 — Simple stories for reading practice
const STORIES = [
  {
    id: 1,
    title: { bm: 'Ani dan Kucing Kecil', eng: 'Ani and the Little Cat' },
    emoji: '🐱',
    text_bm: `Malam itu, Ani mendengar bunyi "miu miu" di luar rumah.

Ani keluar dan melihat seekor kucing kecil yang basah dan kedinginan.

"Oh tidak! Kucing ini memerlukan bantuan," kata Ani.

Ani membawa kucing itu masuk ke rumah. Dia memberikan selimut hangat dan makanan untuk kucing.

Ibu Ani senyum. "Ani baik hati," kata ibu.

Keesokan harinya, kucing itu sudah sihat. Kucing itu menjadi teman Ani.`,
    value: { bm: 'Belas Kasihan', eng: 'Compassion' },
  },
  {
    id: 2,
    title: { bm: 'Reza Minta Maaf', eng: 'Reza Says Sorry' },
    emoji: '🤝',
    text_bm: `Reza mengambil mainan Tuti tanpa izin.

"Reza! Itu mainanku!" kata Tuti.

Reza merasa sedih. Dia tahu dia buat salah.

Reza pergi kepada Tuti dan berkata, "Maaf ya Tuti. Boleh saya bermain sama-sama?"

Tuti tersenyum. "Ya, mari kita bermain bersama."

Mereka bermain dengan gembira. Reza dan Tuti tetap kawan baik.`,
    value: { bm: 'Jujur & Minta Maaf', eng: 'Honesty & Apology' },
  },
  {
    id: 3,
    title: { bm: 'Budi Membantu Ayah', eng: 'Budi Helps Dad' },
    emoji: '🌱',
    text_bm: `Ayah Budi menanam pokok di halaman.

"Boleh saya bantu, Ayah?" tanya Budi.

"Baik, Budi. Mari kita tanam bersama," kata ayah.

Budi dan ayah menggali tanah. Mereka meletakkan benih dalam tanah.

"Ini kerja keras, Ayah," kata Budi.

"Ya, Budi. Kita harus bekerja keras. Nanti pokok ini akan tumbuh besar dan hijau," kata ayah.

Budi senang membantu ayah. Dia bangga dengan dirinya.`,
    value: { bm: 'Rajin & Membantu', eng: 'Hardworking & Helpful' },
  },
  {
    id: 4,
    title: { bm: 'Siti Berkongsi Makanan', eng: 'Siti Shares Her Food' },
    emoji: '🍎',
    text_bm: `Ibu Siti memberi bekal nasi dan buah-buahan untuk sekolah.

Siti makan separuh makanannya.

Dia lihat kawannya, Amir, tidak membawa bekal.

"Amir, kenapa tidak ada makanan?" tanya Siti.

"Ibu saya terlupa," kata Amir dengan sedih.

Siti berkongsi makanannya dengan Amir. "Ambil, Amir. Kita makan bersama-sama."

Amir tersenyum lebar. "Terima kasih, Siti!"

Mereka makan dan ketawa bersama. Mereka teman yang baik.`,
    value: { bm: 'Berkongsi & Prihatin', eng: 'Sharing & Care' },
  },
];

export default function CeritaBacaan({ onBack, language = 'bm' }) {
  const [storyIdx, setStoryIdx] = useState(0);

  const story = STORIES[storyIdx];

  const handlePrev = useCallback(() => {
    if (storyIdx > 0) {
      playHoverSound();
      setStoryIdx(storyIdx - 1);
    }
  }, [storyIdx]);

  const handleNext = useCallback(() => {
    if (storyIdx < STORIES.length - 1) {
      playHoverSound();
      setStoryIdx(storyIdx + 1);
    }
  }, [storyIdx]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#D0F0FF', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      {/* Header */}
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: '#1CB0F6', marginBottom: '0.25rem', fontSize: '1.6rem' }}>
            {language === 'bm' ? 'Cerita Bacaan' : 'Story Reading'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Baca cerita-cerita yang menarik' : 'Read interesting stories'}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(28,176,246,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            {language === 'bm' ? `Cerita ${storyIdx + 1}/${STORIES.length}` : `Story ${storyIdx + 1}/${STORIES.length}`}
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>

        {/* Story card */}
        <div style={{ background: '#FFF', borderRadius: '12px', border: '2px solid #1CB0F6', padding: '1.1rem 1.25rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '2rem' }}>{story.emoji}</span>
            <div>
              <span style={{ fontWeight: 800, color: '#1CB0F6', fontSize: '1.1rem', display: 'block' }}>
                {language === 'bm' ? story.title.bm : story.title.eng}
              </span>
              <span style={{ fontSize: '0.8rem', background: 'rgba(28,176,246,0.12)', color: '#1CB0F6', padding: '0.15rem 0.5rem', borderRadius: '6px', fontWeight: 700, display: 'inline-block', marginTop: '0.3rem' }}>
                {language === 'bm' ? story.value.bm : story.value.eng}
              </span>
            </div>
          </div>
          <p style={{ fontSize: '1rem', color: '#333', lineHeight: 1.8, margin: '1rem 0 0', whiteSpace: 'pre-line' }}>
            {story.text_bm}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div style={{ flexShrink: 0, background: '#D0F0FF', borderTop: '2px solid rgba(28,176,246,0.25)', padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem' }}>
        <button onClick={handlePrev} disabled={storyIdx === 0}
          style={{ flex: 1, padding: '0.75rem', background: storyIdx > 0 ? '#1CB0F6' : '#BDBDBD', color: 'white', border: 'none', borderRadius: '10px', cursor: storyIdx > 0 ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '1rem', boxShadow: storyIdx > 0 ? '0 4px 0 #0B8DC0' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', transition: 'background 0.2s' }}>
          <ChevronLeft size={18} />
          {language === 'bm' ? 'Sebelum' : 'Back'}
        </button>
        <button onClick={handleNext} disabled={storyIdx === STORIES.length - 1}
          style={{ flex: 1, padding: '0.75rem', background: storyIdx < STORIES.length - 1 ? '#1CB0F6' : '#BDBDBD', color: 'white', border: 'none', borderRadius: '10px', cursor: storyIdx < STORIES.length - 1 ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '1rem', boxShadow: storyIdx < STORIES.length - 1 ? '0 4px 0 #0B8DC0' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', transition: 'background 0.2s' }}>
          {language === 'bm' ? 'Seterus' : 'Next'}
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
