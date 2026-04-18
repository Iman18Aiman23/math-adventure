import { JAWI_TOPICS } from '../../utils/jawiWordsData';

const en_long_vowels = JAWI_TOPICS.flatMap((topic, topicIndex) => 
  topic.words.map((w, i) => {
    // We provide a fallback lowercased version to improve match flexibility
    const rumiLower = w.rumi.toLowerCase();
    const engLower = w.eng.toLowerCase();
    
    return {
      id: `en_words_${topicIndex}_${i}`,
      icon: w.emoji,
      group: topic.titleEng,
      ms: { 
        word: w.eng, 
        prompt: `Sebut: ${w.eng}`, 
        matches: [w.rumi, rumiLower, w.eng, engLower] 
      },
      en: { 
        word: w.eng, 
        prompt: `Say: ${w.eng}`, 
        matches: [w.eng, engLower] 
      },
    };
  })
);

export default en_long_vowels;
