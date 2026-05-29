import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { playHoverSound } from '../../utils/soundManager';
import BackButton from '../BackButton';

// KSSR BM Tahun 2 — Simple stories to learn values
const STORIES = [
  {
    id: 1,
    title: { bm: 'Ahmad Jujur', eng: 'Ahmad is Honest' },
    emoji: '✨',
    text_bm: `Ahmad memecahkan cawan ibu ketika bermain.

Dia takut. Ibu akan marah.

Tetapi Ahmad tahu dia harus jujur.

Ahmad pergi kepada ibu dan berkata, "Ibu, saya pecahkan cawan anda. Saya minta maaf."

Ibu tidak marah. Ibu peluk Ahmad. "Ibu senang Ahmad jujur."

"Jujur itu baik, Ahmad. Ibu sayang Ahmad."

Hari itu, Ahmad belajar bahawa jujur lebih penting.`,
    value: { bm: 'Jujur - Berkata Benar', eng: 'Honesty - Tell the Truth' },
  },
  {
    id: 2,
    title: { bm: 'Lia Berani', eng: 'Lia is Brave' },
    emoji: '💪',
    text_bm: `Lia takut untuk naik basikal baru.

Basikal itu besar. Lia takut jatuh.

Tapi Lia ingin belajar naik basikal.

"Aku boleh buat ini," kata Lia kepada diri sendiri.

Lia mencuba perlahan-lahan. Ayah membantu dia.

Pertama kali, Lia jatuh. Tapi dia tidak menyerah.

Lia mencuba lagi. Dan lagi. Dan lagi.

Akhirnya, Lia boleh naik basikal! Dia sangat gembira.

"Keberanian itu bermakna kita takut, tetapi kita cuba," kata ayah.`,
    value: { bm: 'Berani - Tidak Menyerah', eng: 'Courage - Never Give Up' },
  },
  {
    id: 3,
    title: { bm: 'Ibu Sabar', eng: 'Mother is Patient' },
    emoji: '❤️',
    text_bm: `Ibu sedang memasak. Dia sibuk.

Zain mahu ibu bermain dengannya.

"Ibu, main dengan saya!" kata Zain.

"Nanti, Zain. Ibu memasak dulu," kata ibu.

Zain tidak sabar. Dia menangis.

Ibu berhenti memasak. Ibu duduk dengan Zain.

"Sayang, kita tunggu. Kalau kita sabar, semua akan baik," kata ibu.

Mereka menunggu bersama. Ibu dan Zain bermain selepas makan.

Zain belajar bahawa sabar itu bagus.`,
    value: { bm: 'Sabar - Menunggu Giliran', eng: 'Patience - Wait Your Turn' },
  },
  {
    id: 4,
    title: { bm: 'Rini Tolong Orang Tua', eng: 'Rini Helps Grandma' },
    emoji: '🤗',
    text_bm: `Nenek Rini sudah tua. Dia lambat bergerak.

Nenek ingin pergi ke pasar.

"Nenek, saya boleh pergi dengan nenek," kata Rini.

Rini membantu nenek membawa beg. Rini pegang tangan nenek.

Di pasar, Rini membantu nenek cari sayur.

"Rini budak baik," kata nenek sambil senyum.

Nenek memberi Rini gula-gula manis.

Rini merasa senang di hati. Membantu orang tua itu bagus.`,
    value: { bm: 'Baik Hati - Tolong Orang', eng: 'Kindness - Help Others' },
  },
  {
    id: 5,
    title: { bm: 'Farah Rajin Belajar', eng: 'Farah Studies Hard' },
    emoji: '📚',
    text_bm: `Farah ada ujian esok hari.

Kawan-kawan ingin bermain.

"Farah, main dengan kami!" kata mereka.

"Tidak. Saya harus belajar," kata Farah.

Farah duduk dan baca buku. Dia tulis nota. Dia hafal perkara baru.

Farah bekerja keras malam itu.

Esok harinya, Farah dapat markah bagus!

"Rajin itu penting," kata guru Farah.

Farah senang. Dia tahu bahawa kerja keras memberi hasil bagus.`,
    value: { bm: 'Rajin - Bekerja Keras', eng: 'Diligence - Work Hard' },
  },
  {
    id: 6,
    title: { bm: 'Titi Percaya Diri', eng: 'Titi is Confident' },
    emoji: '⭐',
    text_bm: `Ada pertandingan menyanyi di sekolah.

Titi ingin sertai, tetapi dia takut.

"Suara saya tidak bagus," pikir Titi.

Tapi guru kata, "Titi, kamu boleh buat ini!"

Titi mencuba. Dia bernyanyi di hadapan ramai orang.

Titi gugup. Tapi dia terus bernyanyi.

Selepas itu, semua orang tepuk tangan!

"Titi bagus!" kata guru.

Titi belajar bahawa percaya kepada diri sendiri adalah penting.`,
    value: { bm: 'Percaya Diri - Percaya Diri', eng: 'Confidence - Believe in Yourself' },
  },
];

export default function PengenalanNilai({ onBack, language = 'bm' }) {
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
            {language === 'bm' ? 'Pengenalan Nilai' : 'Values Recognition'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Pelajari nilai-nilai baik' : 'Learn good values'}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(28,176,246,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            {language === 'bm' ? `Nilai ${storyIdx + 1}/${STORIES.length}` : `Value ${storyIdx + 1}/${STORIES.length}`}
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
              <span style={{ fontSize: '0.85rem', background: '#E3F2FD', color: '#1565C0', padding: '0.2rem 0.6rem', borderRadius: '6px', fontWeight: 700, display: 'inline-block', marginTop: '0.3rem' }}>
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
