import { useEffect, useRef, useId } from 'react';
import { ArrowRight } from 'lucide-react';
import { playSound } from '../../utils/soundManager';
import './KVLearningPage.css';

export default function KVCompletion({ language, onReturn }) {
  const dialogRef = useRef(null);
  const titleId = useId();
  const isMalay = language === 'bm';

  useEffect(() => {
    const previousFocus = document.activeElement;
    const dialog = dialogRef.current;
    dialog.showModal();
    playSound('streak');
    return () => {
      dialog.close();
      previousFocus?.focus();
    };
  }, []);

  return (
    <dialog ref={dialogRef} className="kv-completion" aria-labelledby={titleId} onCancel={onReturn}
      onKeyDown={event => {
        if (event.key === 'Tab') {
          event.preventDefault();
          event.currentTarget.querySelector('button').focus();
        }
      }}>
      <div className="kv-completion-art" aria-hidden="true">
        <img src={import.meta.env.BASE_URL + 'images/reading/kv-completion-robot-light.png'} alt="" className="kv-happy-robot" />
      </div>
      <div className="kv-completion-copy">
        <h2 id={titleId}>{isMalay ? <>Semua Siri <span>Selesai!</span></> : <>All Series <span>Complete!</span></>}</h2>
        <p>{isMalay ? 'Tahniah! Semua huruf selesai!' : 'Well done! You finished all the letters!'}</p>
        <button type="button" className="kv-completion-return" onClick={onReturn}>
          {isMalay ? 'Teruskan belajar' : 'Keep learning'}<ArrowRight size={19} aria-hidden="true" />
        </button>
      </div>
    </dialog>
  );
}
