const BASE = `${import.meta.env.BASE_URL}images/`;

const ARTWORK = {
  robot: `speaking/HeroRobotSpeaking.webp`,
  bm_kv: `reading/SukuKata KV.webp`,
  bm_kvk: `reading/SukuKata KVK.webp`,
  en_long_vowels: `speaking/Bunyi Huruf Bahasa Inggeris.webp`,
  numbers: `speaking/Nombor 1 – 100.webp`,
  common_objects: `speaking/Objek.webp`,
};

export default function BMMenuArtwork({ topic }) {
  const className = topic === 'robot' ? 'bm-menu-robot-art' : 'bm-menu-category-art';
  return <img className={className} src={`${BASE}${encodeURI(ARTWORK[topic])}`} alt="" />;
}
