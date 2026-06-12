import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { playHoverSound } from '../../../../utils/soundManager';
import BMHeader from '../../_shared/BMHeader';

const PANTUN_LIST = [
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

const ACCENT = '#1CB0F6';
const DARK = '#0B8DC0';
const TOTAL = PANTUN_LIST.length;

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
    if (pantunIdx < TOTAL - 1) {
      playHoverSound();
      setPantunIdx(pantunIdx + 1);
    }
  }, [pantunIdx]);

  const progressPct = ((pantunIdx + 1) / TOTAL) * 100;

  return (
    <div className="as-root">
      <style>{`
        .as-root { height: 100%; display: flex; flex-direction: column; background: radial-gradient(ellipse at 50% 0%,#E1F5FE 0%,#D0F0FF 40%,#B3E5FC 75%,#81D4FA 100%); overflow: hidden; }
        .as-body { flex: 1; overflow-y: auto; padding: 0 1rem 1rem; max-width: 600px; width: 100%; align-self: center; box-sizing: border-box; display: flex; flex-direction: column; }
        .as-progress-wrap { padding: 0 1rem; max-width: 600px; width: 100%; align-self: center; box-sizing: border-box; flex-shrink: 0; }
        .as-progress-track { height: 8px; background: rgba(255,255,255,0.5); border-radius: 999px; overflow: hidden; margin-bottom: 0.5rem; }
        .as-progress-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg,#4FC3F7,#1CB0F6,#0B8DC0); transition: width 0.4s ease; }
        .as-stats-row { display: flex; justify-content: space-between; align-items: center; padding: 0.35rem 0.85rem; background: rgba(255,255,255,0.35); backdrop-filter: blur(4px); border-radius: 999px; margin-bottom: 0.75rem; font-family: 'Fredoka',sans-serif; font-size: 0.82rem; }
        .as-stat { display: flex; align-items: center; gap: 0.3rem; color: #666; }
        .as-stat strong { color: ${DARK}; }
        .as-badge { background: ${isTwoLine ? '#FFB74D' : '#FF7043'}; color: white; padding: 0.3rem 0.7rem; border-radius: 6px; font-size: 0.75rem; font-weight: 700; font-family: 'Fredoka',sans-serif; }
        .as-card { background: rgba(255,255,255,0.92); backdrop-filter: blur(6px); border-radius: 16px; border: 2px solid rgba(28,176,246,0.25); padding: 1.1rem 1.25rem; margin-bottom: 1rem; box-shadow: 0 4px 20px rgba(28,176,246,0.12); }
        .as-emoji { font-size: 2.5rem; text-align: center; margin-bottom: 0.6rem; }
        .as-title { font-family: 'Baloo 2',sans-serif; font-size: 1.15rem; font-weight: 700; color: ${DARK}; text-align: center; margin-bottom: 0.85rem; }
        .as-section { padding: 0.75rem 1rem; margin-bottom: 0.75rem; border-radius: 8px; }
        .as-section-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; margin-bottom: 0.25rem; font-family: 'Fredoka',sans-serif; letter-spacing: 0.04em; }
        .as-tema { background: #E3F2FD; border-left: 4px solid ${ACCENT}; }
        .as-tema-label { color: #1565C0; }
        .as-tema-text { font-family: 'Fredoka',sans-serif; font-size: 0.95rem; color: #333; margin: 0; font-weight: 600; }
        .as-pantun-box { background: #FFF9C4; border-left: 4px solid #FBC02D; padding: 1rem; border-radius: 8px; margin-bottom: 0.75rem; }
        .as-pantun-text { font-family: 'Fredoka',sans-serif; font-size: 1rem; color: #333; line-height: 1.9; margin: 0; font-weight: 600; }
        .as-huraian { background: #F3E5F5; border-left: 4px solid #9C27B0; }
        .as-huraian-label { color: #6A1B9A; }
        .as-huraian-text { font-family: 'Fredoka',sans-serif; font-size: 0.9rem; color: #333; line-height: 1.5; margin: 0; }
        .as-footer { flex-shrink: 0; background: rgba(255,255,255,0.3); backdrop-filter: blur(4px); border-top: 1.5px solid rgba(28,176,246,0.2); padding: 0.65rem 1rem; display: flex; gap: 0.75rem; }
        .as-footer-inner { max-width: 600px; width: 100%; margin: 0 auto; display: flex; gap: 0.75rem; }
        .as-btn-foot { flex: 1; padding: 0.7rem; border: none; border-radius: 10px; font-family: 'Fredoka',sans-serif; font-size: 0.95rem; cursor: pointer; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 0.4rem; transition: background 0.2s; }
        .as-btn-disabled { background: #BDBDBD; color: white; cursor: not-allowed; }
        .as-btn-enabled { background: ${ACCENT}; color: white; box-shadow: 0 4px 0 ${DARK}; cursor: pointer; }
        .as-btn-enabled:active { transform: translateY(3px); box-shadow: 0 1px 0 ${DARK}; }
      `}</style>

      <BMHeader onBack={onBack} language={language} title={language === 'bm' ? 'Pantun Bacaan' : 'Pantun Reading'} />

      <div className="as-progress-wrap">
        <div className="as-progress-track">
          <div className="as-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <div className="as-stats-row">
          <span className="as-stat">{language === 'bm' ? 'Pantun' : 'Pantun'} <strong>{pantunIdx + 1}/{TOTAL}</strong></span>
          <span className="as-badge">{pantun.type}</span>
        </div>
      </div>

      <div className="as-body">
        <div className="as-card">
          <div className="as-emoji">{pantun.emoji}</div>
          <div className="as-title">
            {language === 'bm' ? pantun.title.bm : pantun.title.eng}
          </div>

          <div className={`as-section as-tema`}>
            <div className={`as-section-label as-tema-label`}>
              {language === 'bm' ? 'Tema' : 'Theme'}
            </div>
            <p className="as-tema-text">{pantun.tema}</p>
          </div>

          {isTwoLine ? (
            <div className="as-pantun-box">
              <p className="as-pantun-text">
                {pantun.line1}<br />{pantun.line2}
              </p>
            </div>
          ) : (
            <div className="as-pantun-box">
              <p className="as-pantun-text">
                {pantun.sampiran_1}<br />{pantun.sampiran_2}<br />
                {pantun.maksud_1}<br />{pantun.maksud_2}
              </p>
            </div>
          )}

          <div className={`as-section as-huraian`}>
            <div className={`as-section-label as-huraian-label`}>
              {language === 'bm' ? 'Huraian' : 'Explanation'}
            </div>
            <p className="as-huraian-text">{pantun.huraian}</p>
          </div>
        </div>
      </div>

      <div className="as-footer">
        <div className="as-footer-inner">
          <button
            onClick={handlePrev}
            disabled={pantunIdx === 0}
            className={`as-btn-foot ${pantunIdx > 0 ? 'as-btn-enabled' : 'as-btn-disabled'}`}
          >
            <ChevronLeft size={18} />
            {language === 'bm' ? 'Sebelum' : 'Back'}
          </button>
          <button
            onClick={handleNext}
            disabled={pantunIdx === TOTAL - 1}
            className={`as-btn-foot ${pantunIdx < TOTAL - 1 ? 'as-btn-enabled' : 'as-btn-disabled'}`}
          >
            {language === 'bm' ? 'Seterus' : 'Next'}
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
