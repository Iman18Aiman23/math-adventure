const BASE = `${import.meta.env.BASE_URL}images/`;

const ARTWORK = {
  robot: 'speaking/HeroRobotSpeaking.webp',
  bm_kv: 'speaking/Suku Kata (KV).webp',
  bm_kvk: 'speaking/Suku_Kata__KVK.webp',
  en_long_vowels: 'speaking/Bunyi Huruf Bahasa Inggeris.webp',
  numbers: 'speaking/Nombor 1 – 100.webp',
  common_objects: 'speaking/Objek.webp',
};

export function getBMMenuArtworkSrc(topic) {
  const path = ARTWORK[topic];
  return path ? `${BASE}${encodeURI(path)}` : '';
}

export default function BMMenuArtwork({ topic }) {
  return <img src={getBMMenuArtworkSrc(topic)} alt="" />;
}
