import React, { useEffect, useState } from 'react';
import useMtTts from './useMtTts';

const PRIMITIVE_ENTRIES = {
  compare: { exportName: 'CompareExplore', load: () => import('./explore_T1_1_core') },
  'kenali-nombor': { exportName: 'KenaliNomborExplore', load: () => import('./explore_T1_1_core') },
  kombinasi: { exportName: 'KombinasiExplore', load: () => import('./explore_T1_1_core') },
  'kenali-21-100': { exportName: 'Kenali21Hingga100Explore', load: () => import('./explore_T1_1_core') },
  'nilai-tempat': { exportName: 'NilaiTempatExplore', load: () => import('./explore_T1_1_core') },
  'susunan-nombor': { exportName: 'SusunanNomborExplore', load: () => import('./explore_T1_1_core') },
  'pola-nombor': { exportName: 'PolaNomborExplore', load: () => import('./explore_T1_1_core') },
  'anggar-bundar': { exportName: 'AnggarBundarExplore', load: () => import('./explore_T1_1_core') },
  selesaikan: { exportName: 'SelesaikanExplore', load: () => import('./explore_T1_1_assessment') },
  'latih-diri': { exportName: 'LatihDiriExplore', load: () => import('./explore_T1_1_assessment') },
  'cabar-minda': { exportName: 'CabarMindaExplore', load: () => import('./explore_T1_1_assessment') },
  'selesaikan-cerita-m1': { exportName: 'SelesaikanCeritaM1Explore', load: () => import('./explore_T1_1_assessment') },
  'cabar-minda-m1': { exportName: 'CabarMindaM1Explore', load: () => import('./explore_T1_1_assessment') },
  'kenali-tambah': { exportName: 'KenaliTambahExplore', load: () => import('./explore_T1_2_core') },
  'latihan-tambah': { exportName: 'LatihanTambahExplore', load: () => import('./explore_T1_2_core') },
  'kenali-tolak': { exportName: 'KenaliTolakExplore', load: () => import('./explore_T1_2_core') },
  'latihan-tolak': { exportName: 'LatihanTolakExplore', load: () => import('./explore_T1_2_core') },
  'cerita-tambah-tolak': { exportName: 'CeritaTambahTolakExplore', load: () => import('./explore_T1_2_core') },
  'tambah-berulang': { exportName: 'TambahBerulangExplore', load: () => import('./explore_T1_2_core') },
  'selesaikan-m2': { exportName: 'SelesaikanM2Explore', load: () => import('./explore_T1_2_assessment') },
  'latih-diri-m2': { exportName: 'LatihDiriM2Explore', load: () => import('./explore_T1_2_assessment') },
  'cabar-minda-m2': { exportName: 'CabarMindaM2Explore', load: () => import('./explore_T1_2_assessment') },
  'kenali-pecahan': { exportName: 'KenaliPecahanExplore', load: () => import('./explore_T1_3') },
  'selesaikan-pecahan': { exportName: 'SelesaikanPecahanExplore', load: () => import('./explore_T1_3') },
  'latih-diri-pecahan': { exportName: 'LatihDiriPecahanExplore', load: () => import('./explore_T1_3') },
  'cabar-minda-pecahan': { exportName: 'CabarMindaPecahanExplore', load: () => import('./explore_T1_3') },
  'kenali-nilai-wang': { exportName: 'KenaliNilaiWangExplore', load: () => import('./explore_T1_4') },
  'tukar-wang': { exportName: 'TukarWangExplore', load: () => import('./explore_T1_4') },
  'dapat-catat-wang': { exportName: 'DapatCatatWangExplore', load: () => import('./explore_T1_4') },
  'selesaikan-wang': { exportName: 'SelesaikanWangExplore', load: () => import('./explore_T1_4') },
  'latih-diri-wang': { exportName: 'LatihDiriWangExplore', load: () => import('./explore_T1_4') },
  'cabar-minda-wang': { exportName: 'CabarMindaWangExplore', load: () => import('./explore_T1_4') },
  'mengenali-bulan': { exportName: 'MengenaliBulanExplore', load: () => import('./explore_T1_5') },
  'mengenali-hari': { exportName: 'MengenaliHariExplore', load: () => import('./explore_T1_5') },
  'mengenali-masa': { exportName: 'MengenaliMasaExplore', load: () => import('./explore_T1_5') },
  'selesaikan-masa': { exportName: 'SelesaikanMasaExplore', load: () => import('./explore_T1_5') },
  'latih-diri-masa': { exportName: 'LatihDiriMasaExplore', load: () => import('./explore_T1_5') },
  'cabar-minda-masa': { exportName: 'CabarMindaMasaExplore', load: () => import('./explore_T1_5') },
};

const primitiveCache = new Map();

function getMessageStyles() {
  return {
    wrap: {
      textAlign: 'center',
      padding: '40px 20px',
      fontFamily: "'Fredoka', sans-serif",
      color: '#5B6B7B',
    },
    title: {
      fontSize: '18px',
      fontWeight: 600,
      margin: '0 0 8px',
    },
    body: {
      fontSize: '14px',
      margin: 0,
    },
  };
}

function ExploreMessage({ title, body }) {
  const styles = getMessageStyles();
  return (
    <div style={styles.wrap}>
      <p style={styles.title}>{title}</p>
      {body ? <p style={styles.body}>{body}</p> : null}
    </div>
  );
}

class ExploreErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

async function loadPrimitiveComponent(primitive) {
  const entry = PRIMITIVE_ENTRIES[primitive];
  if (!entry) return null;
  if (!primitiveCache.has(primitive)) {
    primitiveCache.set(
      primitive,
      entry.load().then((module) => module[entry.exportName] || null),
    );
  }
  return primitiveCache.get(primitive);
}

/**
 * Data-driven interactive explore engine for the Belajar phase.
 * Loads the selected primitive on demand so each topic group can become its own chunk.
 */
export default function MatematikExplore({ config, language, theme, onExit }) {
  const { speak, stop } = useMtTts();
  const primitive = config?.primitive;
  const [LoadedExplore, setLoadedExplore] = useState(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (!primitive) {
      setLoadedExplore(null);
      setLoadFailed(false);
      return undefined;
    }

    setLoadedExplore(null);
    setLoadFailed(false);

    loadPrimitiveComponent(primitive)
      .then((component) => {
        if (!cancelled) {
          setLoadedExplore(() => component);
          setLoadFailed(!component);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLoadedExplore(null);
          setLoadFailed(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [primitive]);

  if (!config) {
    return (
      <ExploreMessage
        title={language === 'bm' ? 'Kandungan pembelajaran akan datang' : 'Learning content coming soon'}
        body={language === 'bm' ? 'Sila tunggu kemas kini akan datang.' : 'Please wait for future updates.'}
      />
    );
  }

  if (loadFailed) {
    return (
      <ExploreMessage
        title={language === 'bm' ? 'Aktiviti belum tersedia' : 'Activity not available yet'}
        body={language === 'bm' ? 'Komponen pembelajaran ini gagal dimuatkan.' : 'This learning component failed to load.'}
      />
    );
  }

  if (!LoadedExplore) {
    return (
      <ExploreMessage
        title={language === 'bm' ? 'Memuatkan aktiviti...' : 'Loading activity...'}
      />
    );
  }

  const { data, scoreId, scoreStorageKey = 'mt_ld_m1_scores' } = config;
  const dataWithScore = scoreId ? { ...data, scoreId, scoreStorageKey } : data;

  return (
    <ExploreErrorBoundary
      resetKey={primitive}
      fallback={(
        <ExploreMessage
          title={language === 'bm' ? 'Aktiviti belum tersedia' : 'Activity not available yet'}
          body={language === 'bm' ? 'Komponen pembelajaran ini gagal dimuatkan.' : 'This learning component failed to load.'}
        />
      )}
    >
      <LoadedExplore
        data={dataWithScore}
        language={language}
        theme={theme}
        onExit={onExit}
        onSpeak={speak}
        onStop={stop}
      />
    </ExploreErrorBoundary>
  );
}
