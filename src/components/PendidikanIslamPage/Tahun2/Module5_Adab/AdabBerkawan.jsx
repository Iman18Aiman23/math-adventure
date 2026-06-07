import React from 'react';
import Tahun1LessonScrollLayout from '../../Tahun1/Tahun1LessonScrollLayout';
import { shuffle } from '../../_shared/utils';

const THEME = {
  pageGradient: 'linear-gradient(180deg, #FFE9F3 0%, #FFBFDD 40%, #FFF5F6 100%)',
  dark: '#9F1239',
  accent: '#EC4899',
  stageGradient: 'linear-gradient(145deg, #BE185D, #FF8CBF, #FFE9F3)',
  pillGradient: 'linear-gradient(135deg, #FF8CBF, #EC4899)',
};

const EMOJI = [
  { emoji: '👥', sublabel: 'Baik akhlaknya', title: 'Pilih Kawan Baik', desc: 'Pilihlah kawan yang baik akhlaknya. Kawan yang baik akan membawa kita ke arah kebaikan. Kawan yang buruk akan membawa kita kepada keburukan.' },
  { emoji: '🤝', sublabel: 'Hormat-menghormati', title: 'Saling Menghormati', desc: 'Hormatilah sesama kawan. Jangan mengejek, menghina atau merendah-rendahkan kawan. Setiap orang ada kelebihan dan kekurangan masing-masing.' },
  { emoji: '🤲', sublabel: 'Dalam kebaikan', title: 'Tolong-menolong', desc: 'Tolong-menolonglah sesama kawan dalam perkara kebaikan. Bantu kawan yang memerlukan pertolongan seperti membantu belajar atau berkongsi makanan.' },
  { emoji: '🤫', sublabel: 'Jangan sebarkan', title: 'Menjaga Rahsia Kawan', desc: 'Jika kawan memberitahu sesuatu rahsia, jangan sebarkannya kepada orang lain. Menjaga rahsia kawan adalah tanda kita boleh dipercayai.' },
  { emoji: '🚪', sublabel: 'Sebelum masuk', title: 'Memohon Izin Masuk Rumah', desc: 'Sebelum masuk rumah kawan, mohon izin dahulu. Ketuk pintu dan beri salam. Tunggu sehingga dijemput masuk. Jangan masuk tanpa kebenaran.' },
  { emoji: '🏥', sublabel: 'Adab menziarah', title: 'Menziarahi Kawan Sakit', desc: 'Apabila kawan sakit, ziarahlah dengan memberi salam, bertanya khabar, mendoakan kesembuhan dan memberi semangat. Jangan terlalu lama melawat.' },
];

const QUESTIONS = shuffle([
  { question: 'Kita hendaklah pilih kawan yang?', answer: 'Baik akhlaknya', options: ['Baik akhlaknya', 'Kaya', 'Popular', 'Berani'] },
  { question: 'Sesama kawan kita perlu?', answer: 'Saling menghormati', options: ['Saling menghormati', 'Bermusuh', 'Bergaduh', 'Bersaing'] },
  { question: 'Kita perlu tolong kawan dalam perkara?', answer: 'Kebaikan', options: ['Kebaikan', 'Kejahatan', 'Pertengkaran', 'Permainan'] },
  { question: 'Jika kawan beri rahsia, kita perlu?', answer: 'Jaganya', options: ['Jaganya', 'Sebarkannya', 'Ceritakan', 'Tulis di media sosial'] },
  { question: 'Sebelum masuk rumah kawan, kita perlu?', answer: 'Memberi salam dan minta izin', options: ['Memberi salam dan minta izin', 'Terus masuk', 'Panggil nama', 'Ketuk tingkap'] },
  { question: 'Antara adab menziarahi orang sakit?', answer: 'Mendoakan kesembuhan', options: ['Mendoakan kesembuhan', 'Bercerita lawak', 'Makan minum', 'Bermain'] },
  { question: 'Apa yang diucapkan ketika melawat orang sakit?', answer: 'Salam dan bertanya khabar', options: ['Salam dan bertanya khabar', 'Selamat tinggal', 'Apa khabar', 'Terima kasih'] },
  { question: 'Kawan yang baik akan membawa kita ke arah?', answer: 'Kebaikan', options: ['Kebaikan', 'Keburukan', 'Kemewahan', 'Keseronokan'] },
]);

export default function AdabBerkawan({ onBack, language = 'bm' }) {
  return (
    <Tahun1LessonScrollLayout
      onBack={onBack}
      language={language}
      breadcrumb="Modul 5 · Adab › "
      breadcrumbActive={language === 'bm' ? 'Adab Berkawan dan Menziarahi Sakit' : 'Friendship & Visiting the Sick'}
      title={language === 'bm' ? 'Adab Berkawan &amp; Menziarahi Sakit' : 'Friendship &amp; Visiting the Sick'}
      lead={language === 'bm'
        ? 'Mari belajar adab berkawan dan menziarahi orang sakit mengikut ajaran Islam untuk mengeratkan ukhuwah.'
        : 'Let\'s learn the etiquette of friendship and visiting the sick according to Islamic teachings to strengthen brotherhood.'}
      icon="🤝"
      theme={THEME}
      topics={EMOJI.map((e) => ({ visual: <span style={{ fontSize: '3.2rem', lineHeight: 1 }}>{e.emoji}</span>, ...e }))}
      questions={QUESTIONS}
      totalRounds={8}
      accentColor="#EC4899"
    />
  );
}
