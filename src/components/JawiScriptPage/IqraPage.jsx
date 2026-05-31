import React, { useState } from 'react';
import BackButton from '../BackButton';
import Iqra1Page from './Iqra1Page';

const IQRA_BOOKS = [
    {
        num: 1,
        color: '#E53935',
        bg: '#FFEBEE',
        border: '#EF9A9A',
        title: 'Iqra 1',
        subtitle: 'Huruf Tunggal',
        subtitleEn: 'Single Letters',
        description: 'Mengenal 29 huruf hijaiyah dalam bentuk tunggal.',
        descriptionEn: 'Learn 29 Arabic letters in isolated form.',
        lessons: [
            { ar: 'أ', name: 'Alif', sound: 'a' },
            { ar: 'ب', name: 'Ba', sound: 'b' },
            { ar: 'ت', name: 'Ta', sound: 't' },
            { ar: 'ث', name: 'Tha', sound: 'th' },
            { ar: 'ج', name: 'Jim', sound: 'j' },
            { ar: 'ح', name: 'Ha', sound: 'h' },
            { ar: 'خ', name: 'Kha', sound: 'kh' },
            { ar: 'د', name: 'Dal', sound: 'd' },
            { ar: 'ذ', name: 'Zal', sound: 'dz' },
            { ar: 'ر', name: 'Ra', sound: 'r' },
            { ar: 'ز', name: 'Zay', sound: 'z' },
            { ar: 'س', name: 'Sin', sound: 's' },
            { ar: 'ش', name: 'Shin', sound: 'sy' },
            { ar: 'ص', name: 'Sad', sound: 's' },
            { ar: 'ض', name: 'Dad', sound: 'd' },
            { ar: 'ط', name: 'Ta', sound: 't' },
            { ar: 'ظ', name: 'Za', sound: 'z' },
            { ar: 'ع', name: 'Ain', sound: '\'' },
            { ar: 'غ', name: 'Ghain', sound: 'gh' },
            { ar: 'ف', name: 'Fa', sound: 'f' },
            { ar: 'ق', name: 'Qaf', sound: 'q' },
            { ar: 'ك', name: 'Kaf', sound: 'k' },
            { ar: 'ل', name: 'Lam', sound: 'l' },
            { ar: 'م', name: 'Mim', sound: 'm' },
            { ar: 'ن', name: 'Nun', sound: 'n' },
            { ar: 'ه', name: 'Ha', sound: 'h' },
            { ar: 'و', name: 'Wau', sound: 'w' },
            { ar: 'لا', name: 'Lam Alif', sound: 'la' },
            { ar: 'ي', name: 'Ya', sound: 'y' },
        ],
    },
    {
        num: 2,
        color: '#1E88E5',
        bg: '#E3F2FD',
        border: '#90CAF9',
        title: 'Iqra 2',
        subtitle: 'Baris Atas, Bawah & Depan',
        subtitleEn: 'Short Vowels (Harakat)',
        description: 'Belajar huruf dengan baris fathah, kasrah dan dhammah.',
        descriptionEn: 'Letters with fathah (a), kasrah (i) and dhammah (u).',
        lessons: [
            { ar: 'بَ', name: 'Ba fathah', sound: 'ba' },
            { ar: 'بِ', name: 'Ba kasrah', sound: 'bi' },
            { ar: 'بُ', name: 'Ba dhammah', sound: 'bu' },
            { ar: 'تَ', name: 'Ta fathah', sound: 'ta' },
            { ar: 'تِ', name: 'Ta kasrah', sound: 'ti' },
            { ar: 'تُ', name: 'Ta dhammah', sound: 'tu' },
            { ar: 'ثَ', name: 'Tha fathah', sound: 'tsa' },
            { ar: 'ثِ', name: 'Tha kasrah', sound: 'tsi' },
            { ar: 'ثُ', name: 'Tha dhammah', sound: 'tsu' },
            { ar: 'جَ', name: 'Jim fathah', sound: 'ja' },
            { ar: 'جِ', name: 'Jim kasrah', sound: 'ji' },
            { ar: 'جُ', name: 'Jim dhammah', sound: 'ju' },
            { ar: 'حَ', name: 'Ha fathah', sound: 'ha' },
            { ar: 'حِ', name: 'Ha kasrah', sound: 'hi' },
            { ar: 'حُ', name: 'Ha dhammah', sound: 'hu' },
            { ar: 'خَ', name: 'Kha fathah', sound: 'kha' },
            { ar: 'خِ', name: 'Kha kasrah', sound: 'khi' },
            { ar: 'خُ', name: 'Kha dhammah', sound: 'khu' },
        ],
    },
    {
        num: 3,
        color: '#43A047',
        bg: '#E8F5E9',
        border: '#A5D6A7',
        title: 'Iqra 3',
        subtitle: 'Tanwin',
        subtitleEn: 'Nunation (Tanwin)',
        description: 'Belajar huruf dengan tanwin (dua baris) di hujung kata.',
        descriptionEn: 'Letters with tanwin — double harakat at word end.',
        lessons: [
            { ar: 'بً', name: 'Ba tanwin fathah', sound: 'ban' },
            { ar: 'بٍ', name: 'Ba tanwin kasrah', sound: 'bin' },
            { ar: 'بٌ', name: 'Ba tanwin dhammah', sound: 'bun' },
            { ar: 'تً', name: 'Ta tanwin fathah', sound: 'tan' },
            { ar: 'تٍ', name: 'Ta tanwin kasrah', sound: 'tin' },
            { ar: 'تٌ', name: 'Ta tanwin dhammah', sound: 'tun' },
            { ar: 'جً', name: 'Jim tanwin fathah', sound: 'jan' },
            { ar: 'جٍ', name: 'Jim tanwin kasrah', sound: 'jin' },
            { ar: 'جٌ', name: 'Jim tanwin dhammah', sound: 'jun' },
            { ar: 'دً', name: 'Dal tanwin fathah', sound: 'dan' },
            { ar: 'دٍ', name: 'Dal tanwin kasrah', sound: 'din' },
            { ar: 'دٌ', name: 'Dal tanwin dhammah', sound: 'dun' },
        ],
    },
    {
        num: 4,
        color: '#8E24AA',
        bg: '#F3E5F5',
        border: '#CE93D8',
        title: 'Iqra 4',
        subtitle: 'Mad (Huruf Panjang)',
        subtitleEn: 'Long Vowels (Mad)',
        description: 'Belajar bacaan panjang dengan alif, ya dan wau.',
        descriptionEn: 'Long vowel sounds using alif, ya and wau.',
        lessons: [
            { ar: 'بَا', name: 'Ba + Alif (fathah panjang)', sound: 'baa' },
            { ar: 'بِي', name: 'Ba + Ya (kasrah panjang)', sound: 'bii' },
            { ar: 'بُو', name: 'Ba + Wau (dhammah panjang)', sound: 'buu' },
            { ar: 'تَا', name: 'Ta + Alif', sound: 'taa' },
            { ar: 'تِي', name: 'Ta + Ya', sound: 'tii' },
            { ar: 'تُو', name: 'Ta + Wau', sound: 'tuu' },
            { ar: 'كَا', name: 'Ka + Alif', sound: 'kaa' },
            { ar: 'كِي', name: 'Ka + Ya', sound: 'kii' },
            { ar: 'كُو', name: 'Ka + Wau', sound: 'kuu' },
            { ar: 'نَا', name: 'Na + Alif', sound: 'naa' },
            { ar: 'نِي', name: 'Na + Ya', sound: 'nii' },
            { ar: 'نُو', name: 'Na + Wau', sound: 'nuu' },
        ],
    },
    {
        num: 5,
        color: '#00897B',
        bg: '#E0F2F1',
        border: '#80CBC4',
        title: 'Iqra 5',
        subtitle: 'Sukun & Sabdu',
        subtitleEn: 'Sukun & Shaddah',
        description: 'Belajar huruf bersukun (mati) dan bersabdu (berganda).',
        descriptionEn: 'Learn consonant stops (sukun) and doubled letters (shaddah).',
        lessons: [
            { ar: 'بَبْ', name: 'Ba-ba sukun', sound: 'bab' },
            { ar: 'بِتْ', name: 'Ba-ta sukun', sound: 'bit' },
            { ar: 'بُنْ', name: 'Ba-nun sukun', sound: 'bun' },
            { ar: 'كَتْ', name: 'Ka-ta sukun', sound: 'kat' },
            { ar: 'مَنْ', name: 'Ma-nun sukun', sound: 'man' },
            { ar: 'بَبَّ', name: 'Ba + sabdu', sound: 'babba' },
            { ar: 'تَتَّ', name: 'Ta + sabdu', sound: 'tatta' },
            { ar: 'كَكَّ', name: 'Ka + sabdu', sound: 'kakka' },
            { ar: 'مَمَّ', name: 'Ma + sabdu', sound: 'mamma' },
            { ar: 'نَنَّ', name: 'Na + sabdu', sound: 'nanna' },
        ],
    },
    {
        num: 6,
        color: '#F57C00',
        bg: '#FFF3E0',
        border: '#FFCC80',
        title: 'Iqra 6',
        subtitle: 'Surah Pendek',
        subtitleEn: 'Short Surahs',
        description: 'Membaca surah-surah pendek dari Al-Quran.',
        descriptionEn: 'Read short surahs from the Quran.',
        lessons: [
            { ar: 'بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ', name: 'Bismillah', sound: 'Bismillahirrahmanirrahim' },
            { ar: 'قُلۡ هُوَ ٱللَّهُ أَحَدٌ', name: 'Al-Ikhlas: 1', sound: 'Qul huwallahu ahad' },
            { ar: 'ٱللَّهُ ٱلصَّمَدُ', name: 'Al-Ikhlas: 2', sound: 'Allahussamad' },
            { ar: 'لَمۡ يَلِدۡ وَلَمۡ يُولَدۡ', name: 'Al-Ikhlas: 3', sound: 'Lam yalid walam yulad' },
            { ar: 'وَلَمۡ يَكُن لَّهُۥ كُفُوًا أَحَدُۢ', name: 'Al-Ikhlas: 4', sound: 'Walam yakun lahu kufuwan ahad' },
            { ar: 'قُلۡ أَعُوذُ بِرَبِّ ٱلۡفَلَقِ', name: 'Al-Falaq: 1', sound: 'Qul a\'udzu birobbil falaq' },
            { ar: 'مِن شَرِّ مَا خَلَقَ', name: 'Al-Falaq: 2', sound: 'Min syarri ma kholaq' },
            { ar: 'قُلۡ أَعُوذُ بِرَبِّ ٱلنَّاسِ', name: 'An-Nas: 1', sound: 'Qul a\'udzu birobbin nas' },
            { ar: 'مَلِكِ ٱلنَّاسِ', name: 'An-Nas: 2', sound: 'Malikin nas' },
            { ar: 'إِلَٰهِ ٱلنَّاسِ', name: 'An-Nas: 3', sound: 'Ilaahin nas' },
        ],
    },
];

const COLORS_CYCLE = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#FF8C42', '#9D4EDD', '#6BCB77', '#A06CD5', '#EF476F', '#4361EE'];

function speak(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'ar-SA';
    window.speechSynthesis.speak(utt);
}

function IqraLessonView({ book, language, onBack }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', background: book.bg }}>
            <BackButton onClick={onBack} />
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <div style={{
                        display: 'inline-block',
                        background: book.color,
                        color: '#fff',
                        borderRadius: '50px',
                        padding: '0.4rem 1.4rem',
                        fontWeight: 800,
                        fontSize: '1.1rem',
                        letterSpacing: 1,
                        marginBottom: '0.3rem',
                    }}>
                        {book.title}
                    </div>
                    <p style={{ margin: '0.3rem 0 0', fontWeight: 700, color: book.color, fontSize: '1rem' }}>
                        {language === 'bm' ? book.subtitle : book.subtitleEn}
                    </p>
                    <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: '#666' }}>
                        {language === 'bm' ? book.description : book.descriptionEn}
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: book.num === 6
                        ? '1fr'
                        : 'repeat(auto-fill, minmax(90px, 1fr))',
                    gap: '0.75rem',
                    paddingBottom: '1.5rem',
                }}>
                    {book.lessons.map((lesson, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => speak(lesson.ar)}
                            style={{
                                background: '#fff',
                                border: `2px solid ${book.border}`,
                                borderRadius: '14px',
                                padding: book.num === 6 ? '0.9rem 1rem' : '0.75rem 0.5rem',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: book.num === 6 ? 'row' : 'column',
                                alignItems: 'center',
                                gap: book.num === 6 ? '0.75rem' : '0.3rem',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                                transition: 'transform 0.15s',
                                textAlign: book.num === 6 ? 'right' : 'center',
                            }}
                        >
                            <span style={{
                                fontFamily: "'Amiri Quran', serif",
                                fontSize: book.num === 6 ? '1.3rem' : '2rem',
                                color: book.color,
                                fontWeight: 700,
                                flex: book.num === 6 ? 1 : undefined,
                                direction: 'rtl',
                            }}>
                                {lesson.ar}
                            </span>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: book.num === 6 ? 'flex-start' : 'center', flex: book.num === 6 ? 1 : undefined }}>
                                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#444', lineHeight: 1.3 }}>
                                    {lesson.name}
                                </span>
                                <span style={{ fontSize: '0.68rem', color: '#888' }}>
                                    {lesson.sound}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function IqraPage({ onBack, language }) {
    const [selectedBook, setSelectedBook] = useState(null);

    if (selectedBook === 0) {
        return <Iqra1Page onBack={() => setSelectedBook(null)} language={language} />;
    }

    if (selectedBook !== null) {
        return (
            <IqraLessonView
                book={IQRA_BOOKS[selectedBook]}
                language={language}
                onBack={() => setSelectedBook(null)}
            />
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', background: '#FFFDE7' }}>
            <BackButton onClick={onBack} />
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                    <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#AFAFAF', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>
                        {language === 'bm' ? 'Pilih Buku Iqra' : 'Choose Iqra Book'}
                    </p>
                    <p style={{ fontSize: '0.78rem', color: '#888', margin: '0.3rem 0 0' }}>
                        {language === 'bm' ? 'Ketik huruf untuk mendengar bunyinya' : 'Tap any letter to hear its sound'}
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', paddingBottom: '1.5rem' }}>
                    {IQRA_BOOKS.map((book, idx) => (
                        <button
                            key={book.num}
                            type="button"
                            onClick={() => setSelectedBook(idx)}
                            style={{
                                background: '#fff',
                                border: `3px solid ${book.border}`,
                                borderRadius: '18px',
                                padding: '1.1rem 0.75rem',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.5rem',
                                boxShadow: `0 4px 16px ${book.color}30`,
                                transition: 'transform 0.15s',
                            }}
                        >
                            <div style={{
                                width: 56,
                                height: 56,
                                borderRadius: '50%',
                                background: book.color,
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                                fontWeight: 900,
                                boxShadow: `0 4px 12px ${book.color}60`,
                            }}>
                                {book.num}
                            </div>
                            <span style={{ fontWeight: 800, fontSize: '1rem', color: book.color }}>
                                {book.title}
                            </span>
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#555', textAlign: 'center', lineHeight: 1.3 }}>
                                {language === 'bm' ? book.subtitle : book.subtitleEn}
                            </span>
                            <span style={{ fontSize: '0.68rem', color: '#888', textAlign: 'center', lineHeight: 1.4 }}>
                                {language === 'bm' ? book.description : book.descriptionEn}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
