import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, Home, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { MONTHS } from '../../utils/timeData';
import { LOCALIZATION } from '../../utils/localization';
import useBrowserBack, { useBrowserBackHandler } from '../../hooks/useBrowserBack';
import './MonthLearning.css';

// Opening or paging through a flashcard does not re-render the twelve month cards.
const MonthGrid = memo(function MonthGrid({ bm, onChoose }) {
  return (
    <div className="ml-grid" aria-labelledby="ml-grid-title">
      {MONTHS.map((month, index) => (
        <button key={month.id} type="button" className="ml-month" onClick={() => onChoose(index)} aria-haspopup="dialog">
          <span className="ml-month-number" aria-hidden="true">{String(month.id).padStart(2, '0')}</span>
          <span className="ml-month-name">{bm ? month.malay : month.name}</span>
          <span className="ml-month-order">{bm ? 'Bulan' : 'Month'} {month.id}</span>
        </button>
      ))}
    </div>
  );
});

function MonthDetails({ index, bm, onChange, onClose }) {
  const dialogRef = useRef(null);
  const month = MONTHS[index];
  useBrowserBackHandler(onClose);
  useEffect(() => {
    const dialog = dialogRef.current;
    const trigger = document.activeElement;
    dialog.showModal();
    return () => {
      dialog.close();
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus();
    };
  }, []);

  return (
    <dialog ref={dialogRef} className="ml-dialog" aria-labelledby="ml-detail-title" onCancel={event => { event.preventDefault(); onClose(); }}
      onKeyDown={event => {
        if (event.key !== 'Tab') return;
        const buttons = event.currentTarget.querySelectorAll('button');
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }}
      onClick={event => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
      }}>
      <div className="ml-dialog-heading">
        <div><p className="ml-eyebrow">{bm ? 'KENALI BULAN' : 'EXPLORE THE MONTHS'}</p><h2 id="ml-detail-title">{bm ? 'Bulan' : 'Month'} {month.id}</h2></div>
        <button type="button" className="ml-icon-button" onClick={onClose} aria-label={bm ? 'Tutup' : 'Close'}><X size={21} aria-hidden="true" /></button>
      </div>
      <dl className="ml-translations" aria-live="polite" aria-atomic="true">
        <div><dt>Bahasa Melayu</dt><dd>{month.malay}</dd></div>
        <div><dt>English</dt><dd>{month.name}</dd></div>
        <div><dt>{bm ? 'Kalendar Hijrah · bulan' : 'Hijri calendar · month'} {month.id}</dt><dd>{month.islamic}</dd></div>
      </dl>
      <p className="ml-calendar-note">{bm ? 'Nama bulan mengikut urutan dalam setiap kalendar, bukan padanan tarikh.' : 'Month names follow each calendar’s order; they are not equivalent dates.'}</p>
      <div className="ml-dialog-actions">
        <button type="button" onClick={() => onChange(-1)}><ChevronLeft size={18} aria-hidden="true" />{bm ? 'Sebelumnya' : 'Previous'}</button>
        <span className="ml-page-count">{month.id} / {MONTHS.length}</span>
        <button type="button" onClick={() => onChange(1)}>{bm ? 'Seterusnya' : 'Next'}<ChevronRight size={18} aria-hidden="true" /></button>
      </div>
    </dialog>
  );
}

export default function MonthLearning({ onBack, onHome, language = 'bm' }) {
  const bm = language === 'bm';
  const t = LOCALIZATION[bm ? 'bm' : 'eng'].monthLearningDetail;
  const handleBack = useBrowserBack(onBack);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const closeMonth = useCallback(() => setSelectedIndex(null), []);
  const chooseMonth = useCallback(index => setSelectedIndex(index), []);
  const changeMonth = useCallback(step => setSelectedIndex(index => (index + step + MONTHS.length) % MONTHS.length), []);

  return (
    <main className="month-learning-shell" aria-label={t.title}>
      <div className="ml-wrap">
        <header className="ml-header">
          <button type="button" className="ml-icon-button" onClick={handleBack} aria-label={bm ? 'Kembali' : 'Back'}><ArrowLeft size={22} aria-hidden="true" /></button>
          <h1>{bm ? 'Kenali Bulan' : 'Learn the Months'}</h1>
          {onHome ? <button type="button" className="ml-icon-button" onClick={onHome} aria-label={bm ? 'Utama' : 'Home'}><Home size={21} aria-hidden="true" /></button> : <span />}
        </header>
        <section className="ml-intro" aria-labelledby="ml-title">
          <div><p className="ml-eyebrow">{bm ? 'BULAN & MASA' : 'CLOCK & TIME'}</p><h2 id="ml-title">{bm ? '12 bulan, satu tahun.' : '12 months, one year.'}</h2><p className="ml-lead">{bm ? 'Kenali nama dan urutan bulan, satu demi satu.' : 'Discover the names and order of the months, one by one.'}</p></div>
          <div className="ml-calendar" aria-hidden="true"><span>12</span><i /><i /><i /></div>
        </section>
        <div className="ml-section-heading"><h2 id="ml-grid-title">{bm ? 'Pilih Bulan' : 'Choose a month'}</h2><p>{bm ? 'Tekan untuk lihat nama bulan.' : 'Tap to explore month names.'}</p></div>
        <MonthGrid bm={bm} onChoose={chooseMonth} />
      </div>
      {selectedIndex !== null && <MonthDetails index={selectedIndex} bm={bm} onChange={changeMonth} onClose={closeMonth} />}
    </main>
  );
}
