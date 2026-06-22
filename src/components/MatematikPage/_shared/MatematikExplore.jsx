import React from 'react';
import { CompareExplore, KenaliNomborExplore, KombinasiExplore, Kenali21Hingga100Explore, NilaiTempatExplore, SusunanNomborExplore, PolaNomborExplore, AnggarBundarExplore, SelesaikanExplore, LatihDiriExplore, CabarMindaExplore, KenaliTambahExplore, LatihanTambahExplore } from './explorePrimitives';
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

  const { primitive, data } = config;

  switch (primitive) {
    case 'compare':
      return (
        <CompareExplore
          data={data}
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
          data={data}
          language={language}
          theme={theme}
          onExit={onExit}
        />
      );
    case 'kombinasi':
      return (
        <KombinasiExplore
          data={data}
          language={language}
          theme={theme}
          onExit={onExit}
        />
      );
    case 'kenali-21-100':
      return (
        <Kenali21Hingga100Explore
          data={data}
          language={language}
          theme={theme}
          onExit={onExit}
        />
      );
    case 'nilai-tempat':
      return (
        <NilaiTempatExplore
          data={data}
          language={language}
          theme={theme}
          onExit={onExit}
        />
      );
    case 'susunan-nombor':
      return (
        <SusunanNomborExplore
          data={data}
          language={language}
          theme={theme}
          onExit={onExit}
        />
      );
    case 'pola-nombor':
      return (
        <PolaNomborExplore
          data={data}
          language={language}
          theme={theme}
          onExit={onExit}
        />
      );
    case 'anggar-bundar':
      return (
        <AnggarBundarExplore
          data={data}
          language={language}
          theme={theme}
          onExit={onExit}
        />
      );
    case 'selesaikan':
      return (
        <SelesaikanExplore
          data={data}
          language={language}
          theme={theme}
          onExit={onExit}
        />
      );
    case 'latih-diri':
      return (
        <LatihDiriExplore
          data={data}
          language={language}
          theme={theme}
          onExit={onExit}
        />
      );
    case 'cabar-minda':
      return (
        <CabarMindaExplore
          data={data}
          language={language}
          theme={theme}
          onExit={onExit}
        />
      );
    case 'kenali-tambah':
      return (
        <KenaliTambahExplore
          data={data}
          language={language}
          theme={theme}
          onExit={onExit}
        />
      );
    case 'latihan-tambah':
      return (
        <LatihanTambahExplore
          data={data}
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
