import React from 'react';
import { CompareExplore, KenaliNomborExplore, KombinasiExplore, Kenali21Hingga100Explore, NilaiTempatExplore, SusunanNomborExplore, PolaNomborExplore, AnggarBundarExplore, SelesaikanExplore, LatihDiriExplore, CabarMindaExplore, KenaliTambahExplore, LatihanTambahExplore, KenaliTolakExplore, LatihanTolakExplore, CeritaTambahTolakExplore, TambahBerulangExplore, SelesaikanM2Explore, LatihDiriM2Explore, CabarMindaM2Explore, SelesaikanCeritaM1Explore, CabarMindaM1Explore, KenaliPecahanExplore } from './explorePrimitives';
import useMtTts from './useMtTts';

/**
 * Data-driven interactive explore engine for the Belajar phase.
 * Takes a config object that specifies the primitive type and data.
 * In Slice 0 this is a scaffold — primitives are added per-topic in later slices.
 */
export default function MatematikExplore({ config, language, theme, onExit }) {
  const { speak, stop } = useMtTts();

  if (!config) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', fontFamily: "'Fredoka', sans-serif", color: '#5B6B7B' }}>
        <p style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 8px' }}>
          {language === 'bm' ? 'Kandungan pembelajaran akan datang' : 'Learning content coming soon'}
        </p>
        <p style={{ fontSize: '14px', margin: 0 }}>
          {language === 'bm' ? 'Sila tunggu kemas kini akan datang.' : 'Please wait for future updates.'}
        </p>
      </div>
    );
  }

  const { primitive, data, scoreId, scoreStorageKey = 'mt_ld_m1_scores' } = config;
  const dataWithScore = scoreId ? { ...data, scoreId, scoreStorageKey } : data;

  switch (primitive) {
    case 'compare':
      return (
        <CompareExplore
          data={dataWithScore}
          language={language}
          theme={theme}
          onExit={onExit}
          onSpeak={speak}
          onStop={stop}
        />
      );
    case 'kenali-nombor':
      return (
        <KenaliNomborExplore
          data={dataWithScore}
          language={language}
          theme={theme}
          onExit={onExit}
        />
      );
    case 'kombinasi':
      return (
        <KombinasiExplore
          data={dataWithScore}
          language={language}
          theme={theme}
          onExit={onExit}
        />
      );
    case 'kenali-21-100':
      return (
        <Kenali21Hingga100Explore
          data={dataWithScore}
          language={language}
          theme={theme}
          onExit={onExit}
        />
      );
    case 'nilai-tempat':
      return (
        <NilaiTempatExplore
          data={dataWithScore}
          language={language}
          theme={theme}
          onExit={onExit}
        />
      );
    case 'susunan-nombor':
      return (
        <SusunanNomborExplore
          data={dataWithScore}
          language={language}
          theme={theme}
          onExit={onExit}
        />
      );
    case 'pola-nombor':
      return (
        <PolaNomborExplore
          data={dataWithScore}
          language={language}
          theme={theme}
          onExit={onExit}
        />
      );
    case 'anggar-bundar':
      return (
        <AnggarBundarExplore
          data={dataWithScore}
          language={language}
          theme={theme}
          onExit={onExit}
        />
      );
    case 'selesaikan':
      return (
        <SelesaikanExplore
          data={dataWithScore}
          language={language}
          theme={theme}
          onExit={onExit}
        />
      );
    case 'latih-diri':
      return (
        <LatihDiriExplore
          data={dataWithScore}
          language={language}
          theme={theme}
          onExit={onExit}
        />
      );
    case 'cabar-minda':
      return (
        <CabarMindaExplore
          data={dataWithScore}
          language={language}
          theme={theme}
          onExit={onExit}
        />
      );
    case 'kenali-tambah':
      return (
        <KenaliTambahExplore
          data={dataWithScore}
          language={language}
          theme={theme}
          onExit={onExit}
        />
      );
    case 'latihan-tambah':
      return (
        <LatihanTambahExplore
          data={dataWithScore}
          language={language}
          theme={theme}
          onExit={onExit}
        />
      );
    case 'kenali-tolak':
      return (
        <KenaliTolakExplore
          data={dataWithScore}
          language={language}
          theme={theme}
          onExit={onExit}
        />
      );
    case 'latihan-tolak':
      return (
        <LatihanTolakExplore
          data={dataWithScore}
          language={language}
          theme={theme}
          onExit={onExit}
        />
      );
    case 'cerita-tambah-tolak':
      return (
        <CeritaTambahTolakExplore
          data={dataWithScore}
          language={language}
          theme={theme}
          onExit={onExit}
        />
      );
    case 'tambah-berulang':
      return (
        <TambahBerulangExplore
          data={dataWithScore}
          language={language}
          theme={theme}
          onExit={onExit}
        />
      );
    case 'selesaikan-m2':
      return (
        <SelesaikanM2Explore
          data={dataWithScore}
          language={language}
          theme={theme}
          onExit={onExit}
        />
      );
    case 'latih-diri-m2':
      return (
        <LatihDiriM2Explore
          data={dataWithScore}
          language={language}
          theme={theme}
          onExit={onExit}
        />
      );
    case 'cabar-minda-m2':
      return (
        <CabarMindaM2Explore
          data={dataWithScore}
          language={language}
          theme={theme}
          onExit={onExit}
        />
      );
    case 'selesaikan-cerita-m1':
      return (
        <SelesaikanCeritaM1Explore
          data={dataWithScore}
          language={language}
          theme={theme}
          onExit={onExit}
        />
      );
    case 'cabar-minda-m1':
      return (
        <CabarMindaM1Explore
          data={dataWithScore}
          language={language}
          theme={theme}
          onExit={onExit}
        />
      );
    case 'kenali-pecahan':
      return (
        <KenaliPecahanExplore
          data={dataWithScore}
          language={language}
          theme={theme}
          onExit={onExit}
        />
      );
    default:
      return (
        <div style={{ textAlign: 'center', padding: '40px 20px', fontFamily: "'Fredoka', sans-serif", color: '#5B6B7B' }}>
          <p style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>
            {language === 'bm' ? 'Sedia untuk belajar' : 'Ready to learn'}
          </p>
        </div>
      );
  }
}
