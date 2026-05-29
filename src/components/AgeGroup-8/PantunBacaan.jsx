import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { playHoverSound } from '../../utils/soundManager';
import BackButton from '../BackButton';

// KSSR BM Tahun 2 — Authentic Pantun 2 kerat and 4 kerat
const PANTUN_LIST = [
  // PANTUN 2 KERAT
  {
    id: 1,
    type: '2 kerat',
    title: { bm: 'Kepentingan Menuntut Ilmu', eng: 'Importance of Seeking Knowledge' },
    emoji: '📚',
    line1: 'Banyak udang banyak garam,',
    line2: 'Banyak orang banyak ragam.',
    tema: 'Ragam manusia dan masyarakat',
    huraian: 'Setiap individu di dunia ini mempunyai reka bentuk sahsiah, sikap, dan pendapat yang berbeza-beza. Kita perlulah bijak menyesuaikan diri dan bertoleransi dalam masyarakat.',
  },
  {
    id: 2,
    type: '2 kerat',
    title: { bm: 'Kerajinan', eng: 'Diligence' },
    emoji: '💪',
    line1: 'Gendang gendut tali kecapi,',
    line2: 'Kenyang perut suka hati.',
    tema: 'Kesyukuran dan kepuasan hidup',
    huraian: 'Menggambarkan perasaan gembira, tenang, dan puas apabila keperluan asas (seperti makanan) telah dipenuhi. Ia juga sering digunakan untuk menggambarkan suasana yang santai selepas makan.',
  },
  {
    id: 3,
    type: '2 kerat',
    title: { bm: 'Keberanian', eng: 'Courage' },
    emoji: '⭐',
    line1: 'Emas, perak, tembaga, suasa,',
    line2: 'Malas bergerak tidak merasa.',
    tema: 'Usaha dan kejayaan',
    huraian: 'Sesiapa yang bersikap malas dan tidak mahu berusaha atau bekerja keras, mereka tidak akan mendapat hasil, kesenangan, atau mencapai kejayaan yang diimpikan dalam hidup.',
  },
  {
    id: 4,
    type: '2 kerat',
    title: { bm: 'Menjaga Lisan', eng: 'Guard Your Tongue' },
    emoji: '🤐',
    line1: 'Pucuk paku pucuk miding,',
    line2: 'Jangan suka menjadi gundingan.',
    tema: 'Menjaga maruah dan lisan',
    huraian: 'Mengingatkan kita agar sentiasa menjaga tingkah laku dan tutur kata supaya tidak menjadi bahan bualan, umpatan, atau fitnah negatif dalam kalangan masyarakat.',
  },

  // PANTUN 4 KERAT
  {
    id: 5,
    type: '4 kerat',
    title: { bm: 'Mengenai Budi', eng: 'About Character' },
    emoji: '💎',
    sampiran_1: 'Pisang emas dibawa belayar,',
    sampiran_2: 'Masak sebiji di atas peti;',
    maksud_1: 'Hutang emas boleh dibayar,',
    maksud_2: 'Hutang budi dibawa mati.',
    tema: 'Nilai mengenang jasa',
    huraian: 'Segala bentuk hutang material atau wang ringgit boleh diganti semula. Sifatnya berbeza dengan hutang budi (jasa dan kebaikan) yang tiada nilai nilainya, malah akan sentiasa diingati dan dibawa sehingga akhir hayat seseorang.',
  },
  {
    id: 6,
    type: '4 kerat',
    title: { bm: 'Keperibadian', eng: 'Personality' },
    emoji: '✨',
    sampiran_1: 'Tingkap papan kayu bersegi,',
    sampiran_2: 'Sampan sakat di Pulau Angsa;',
    maksud_1: 'Indah tampan kerana budi,',
    maksud_2: 'Tinggi bangsa kerana bahasa.',
    tema: 'Berakhlak mulia dan bersopan santun',
    huraian: 'Kekuatan peribadi seseorang tidak dinilai pada rupa paras yang fizikal, melainkan pada kemurnian budi pekertinya. Begitu juga dengan martabat sesebuah bangsa yang ditentukan oleh kehalusan tata susila dan kesantunan bahasa anggotanya.',
  },
  {
    id: 7,
    type: '4 kerat',
    title: { bm: 'Kewajipan Agama', eng: 'Religious Duty' },
    emoji: '🕌',
    sampiran_1: 'Asam kandis asam gelugur,',
    sampiran_2: 'Ketiga asam si riang-riang;',
    maksud_1: 'Menangis mayat di pintu kubur,',
    maksud_2: 'Teringat badan tidak sembahyang.',
    tema: 'Kepentingan melaksanakan ibadah wajib',
    huraian: 'Pantun ini membawa mesej berbentuk didaktik tentang penyesalan manusia selepas kematian akibat melalaikan ibadah wajib (solat) sewaktu hidup. Ia mendidik pembaca agar sentiasa mengutamakan tuntutan agama.',
  },
  {
    id: 8,
    type: '4 kerat',
    title: { bm: 'Persaudaraan & Harapan', eng: 'Brotherhood & Hope' },
    emoji: '🤝',
    sampiran_1: 'Kalau ada sumur di ladang,',
    sampiran_2: 'Boleh saya menumpang mandi;',
    maksud_1: 'Kalau ada umur yang panjang,',
    maksud_2: 'Boleh kita berjumpa lagi.',
    tema: 'Ukhuwah (persaudaraan) dan harapan masa hadapan',
    huraian: 'Dituturkan sebagai ungkapan perpisahan yang sopan. Ia mengandungi doa dan harapan yang murni agar kedua-dua belah pihak dikurniakan kesihatan serta usia yang panjang untuk bertemu semula pada masa akan datang.',
  },
];

export default function PantunBacaan({ onBack, language = 'bm' }) {
  const [pantunIdx, setPantunIdx] = useState(0);

  const pantun = PANTUN_LIST[pantunIdx];
  const isTwoLine = pantun.type === '2 kerat';

  const handlePrev = useCallback(() => {
    if (pantunIdx > 0) {
      playHoverSound();
      setPantunIdx(pantunIdx - 1);
    }
  }, [pantunIdx]);

  const handleNext = useCallback(() => {
    if (pantunIdx < PANTUN_LIST.length - 1) {
      playHoverSound();
      setPantunIdx(pantunIdx + 1);
    }
  }, [pantunIdx]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#D0F0FF', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      {/* Header */}
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: '#1CB0F6', marginBottom: '0.25rem', fontSize: '1.6rem' }}>
            {language === 'bm' ? 'Pantun Bacaan' : 'Pantun Reading'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Pantun Tradisional Melayu' : 'Traditional Malay Pantun'}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(28,176,246,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            {language === 'bm' ? `Pantun ${pantunIdx + 1}/${PANTUN_LIST.length}` : `Pantun ${pantunIdx + 1}/${PANTUN_LIST.length}`}
          </span>
          <span style={{ background: isTwoLine ? '#FFB74D' : '#FF7043', color: 'white', padding: '0.3rem 0.7rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
            {pantun.type}
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>

        {/* Pantun card */}
        <div style={{ background: '#FFF', borderRadius: '12px', border: '2px solid #1CB0F6', padding: '1.1rem 1.25rem', marginBottom: '1rem' }}>
          {/* Tema */}
          <div style={{ background: '#E3F2FD', borderLeft: '4px solid #1CB0F6', padding: '0.8rem 1rem', marginBottom: '1rem', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1565C0', marginBottom: '0.3rem', textTransform: 'uppercase' }}>
              Tema
            </div>
            <p style={{ fontSize: '0.95rem', color: '#333', margin: '0', fontWeight: 600 }}>
              {pantun.tema}
            </p>
          </div>

          {/* Pantun text */}
          {isTwoLine ? (
            // Pantun 2 Kerat
            <div style={{ background: '#FFF9C4', borderLeft: '4px solid #FBC02D', padding: '1rem', marginBottom: '1rem', borderRadius: '6px' }}>
              <p style={{ fontSize: '1rem', color: '#333', lineHeight: 1.8, margin: '0', fontWeight: 600 }}>
                {pantun.line1}
                <br />
                {pantun.line2}
              </p>
            </div>
          ) : (
            // Pantun 4 Kerat
            <>
              <div style={{ background: '#FFF9C4', borderLeft: '4px solid #FBC02D', padding: '1rem', marginBottom: '1rem', borderRadius: '6px' }}>
                <p style={{ fontSize: '1rem', color: '#333', lineHeight: 1.8, margin: '0', fontWeight: 600 }}>
                  {pantun.sampiran_1}
                  <br />
                  {pantun.sampiran_2}
                  <br />
                  {pantun.maksud_1}
                  <br />
                  {pantun.maksud_2}
                </p>
              </div>
            </>
          )}

          {/* Huraian */}
          <div style={{ background: '#F3E5F5', borderLeft: '4px solid #9C27B0', padding: '0.8rem 1rem', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6A1B9A', marginBottom: '0.3rem', textTransform: 'uppercase' }}>
              Huraian
            </div>
            <p style={{ fontSize: '0.9rem', color: '#333', lineHeight: 1.5, margin: '0' }}>
              {pantun.huraian}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ flexShrink: 0, background: '#D0F0FF', borderTop: '2px solid rgba(28,176,246,0.25)', padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem' }}>
        <button onClick={handlePrev} disabled={pantunIdx === 0}
          style={{ flex: 1, padding: '0.75rem', background: pantunIdx > 0 ? '#1CB0F6' : '#BDBDBD', color: 'white', border: 'none', borderRadius: '10px', cursor: pantunIdx > 0 ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '1rem', boxShadow: pantunIdx > 0 ? '0 4px 0 #0B8DC0' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', transition: 'background 0.2s' }}>
          <ChevronLeft size={18} />
          {language === 'bm' ? 'Sebelum' : 'Back'}
        </button>
        <button onClick={handleNext} disabled={pantunIdx === PANTUN_LIST.length - 1}
          style={{ flex: 1, padding: '0.75rem', background: pantunIdx < PANTUN_LIST.length - 1 ? '#1CB0F6' : '#BDBDBD', color: 'white', border: 'none', borderRadius: '10px', cursor: pantunIdx < PANTUN_LIST.length - 1 ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '1rem', boxShadow: pantunIdx < PANTUN_LIST.length - 1 ? '0 4px 0 #0B8DC0' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', transition: 'background 0.2s' }}>
          {language === 'bm' ? 'Seterus' : 'Next'}
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
