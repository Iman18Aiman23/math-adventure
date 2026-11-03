import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, BookOpen, Check, ChevronDown, ChevronRight, Eye, LockKeyhole, Mail, Star, Trophy, UserRound, X } from 'lucide-react';
import ImanAILogo from './_shared/ImanAILogo';
import './WelcomeModal.css';

function GoogleMark() {
  return <svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#4285f4" d="M44 24.5c0-1.5-.1-2.9-.4-4.3H24v8.2h11.2a9.6 9.6 0 0 1-4.2 6.3v5.2h6.8C41.8 36.3 44 30.9 44 24.5Z"/><path fill="#34a853" d="M24 45c5.6 0 10.3-1.9 13.8-5.1L31 34.7c-1.9 1.3-4.3 2-7 2-5.4 0-10-3.7-11.7-8.6h-7v5.4A20.8 20.8 0 0 0 24 45Z"/><path fill="#fbbc05" d="M12.3 28.1a12.5 12.5 0 0 1 0-8.2v-5.4h-7a21 21 0 0 0 0 19l7-5.4Z"/><path fill="#ea4335" d="M24 11.3c3.1 0 5.9 1.1 8.1 3.2l6.1-6.1A20.3 20.3 0 0 0 24 3 20.8 20.8 0 0 0 5.3 14.5l7 5.4c1.7-4.9 6.3-8.6 11.7-8.6Z"/></svg>;
}

function LanguageFlag({ malay }) {
  return malay ? <svg className="wl-flag" viewBox="0 0 36 36" aria-hidden="true"><defs><clipPath id="wl-flag-circle"><circle cx="18" cy="18" r="18"/></clipPath></defs><g clipPath="url(#wl-flag-circle)"><path fill="#fff" d="M0 0h36v36H0z"/>{Array.from({ length: 7 }, (_, i) => <path key={i} fill="#ef3340" d={'M0 ' + i * 5.14 + 'h36v2.57H0z'}/>)}<path fill="#07358a" d="M0 0h21v21H0z"/><path fill="#ffda21" d="M12 4a7 7 0 1 0 0 13 6 6 0 1 1 0-13Z"/><path fill="#ffda21" d="m15 5 .7 3.6 2.8-2.3-1.7 3.2 3.6.5-3.6.8 1.7 3.2-2.8-2.2L15 15l-.7-3.7-2.8 2.2 1.7-3.2-3.6-.8 3.6-.5-1.7-3.2 2.8 2.3Z"/></g></svg> : <svg className="wl-flag" viewBox="0 0 36 36" aria-hidden="true"><rect width="36" height="36" rx="18" fill="#17366d"/><path d="m7 7 22 22M7 29 29 7" stroke="white" strokeWidth="6"/><path d="M18 0v36M0 18h36" stroke="white" strokeWidth="10"/><path d="M18 0v36M0 18h36" stroke="#e33c50" strokeWidth="6"/></svg>;
}

export default function WelcomeModal({ onSave, language = 'bm' }) {
  const [guest, setGuest] = useState(false);
  const [name, setName] = useState('');
  const rootRef = useRef(null);
  const guestInputRef = useRef(null);
  const guestDialogRef = useRef(null);
  const guestButtonRef = useRef(null);
  const bm = language === 'bm';
  const t = (ms, en) => bm ? ms : en;
  useEffect(() => {
    const app = document.getElementById('root');
    const wasInert = app?.inert;
    if (app) app.inert = true;
    rootRef.current?.focus({ preventScroll: true });
    return () => { if (app) app.inert = wasInert; };
  }, []);
  useEffect(() => {
    const dialog = guestDialogRef.current;
    if (guest) {
      if (!dialog.open) dialog.showModal();
      guestInputRef.current?.focus({ preventScroll: true });
    } else if (dialog.open) {
      dialog.close();
      guestButtonRef.current?.focus({ preventScroll: true });
    }
  }, [guest]);
  const trapFocus = event => {
    if (event.key !== 'Tab') return;
    const scope = guest ? guestDialogRef.current : rootRef.current;
    const controls = [...scope.querySelectorAll('button, input, select')].filter(el => !el.disabled && el.getClientRects().length);
    const first = controls[0], last = controls.at(-1);
    if (event.shiftKey && (document.activeElement === first || document.activeElement === scope)) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  };
  const assetBase = import.meta.env.BASE_URL + 'images/welcome/';
  return createPortal(
    <div className="wl-page" role="dialog" aria-modal="true" aria-labelledby="wl-title" ref={rootRef} tabIndex={-1} onKeyDown={trapFocus}>
      <div className="wl-decoration" aria-hidden="true"><i/><i/><i/><svg viewBox="0 0 1536 330" preserveAspectRatio="none"><path d="M0 110C120 95 165 300 430 290S1000 100 1200 175 1410 100 1536 80V330H0Z" fill="#e2f6ff"/><path d="M0 330C180 230 205 160 380 225S720 345 1010 335 1350 90 1536 75V330Z" fill="#d5f9ed"/></svg></div>
      <div className="wl-wrap" inert={guest}>
        <header className="wl-header">
          <div className="wl-brand"><ImanAILogo language={language}/><p>{t('Belajar • Bermain • Maju Bersama', 'Learn • Play • Grow Together')}</p></div>
          <nav aria-label={t('Kenali ImanAI', 'Discover ImanAI')}>{['learn', 'play', 'achievements', 'about'].map((id, index) => <button type="button" key={id} disabled>{(bm ? ['Belajar', 'Permainan', 'Pencapaian', 'Tentang Kami'] : ['Learn', 'Games', 'Achievements', 'About Us'])[index]}</button>)}</nav>
          <label className="wl-language"><LanguageFlag malay={bm}/><select aria-label={t('Bahasa', 'Language')} value={language} disabled><option value="bm">BM</option><option value="en">EN</option></select><ChevronDown aria-hidden="true"/></label>
        </header>
        <main className="wl-main">
          <section className="wl-hero" aria-labelledby="wl-title">
            <div className="wl-hero-copy">
              <p className="wl-tagline">{t('Belajar • Bermain • Maju Bersama', 'Learn • Play • Grow Together')}</p>
              <h1 id="wl-title">{t('Selamat Datang!', 'Welcome!')}</h1>
              <p className="wl-lead">{t('Log masuk untuk teruskan pembelajaran dan simpan kemajuan anda.', 'Log in to continue learning and save your progress.')}</p>
              <ul className="wl-benefits">
                <li><span className="wl-benefit-icon wl-green"><BookOpen/></span><span><strong>{t('Belajar', 'Learn')}</strong><small>{t('Topik yang menarik', 'Discover exciting topics')}</small></span></li>
                <li><span className="wl-benefit-icon wl-yellow"><Star/></span><span><strong>{t('Bermain', 'Play')}</strong><small>{t('Kumpul bintang', 'Collect stars')}</small></span></li>
                <li><span className="wl-benefit-icon wl-red"><Trophy/></span><span><strong>{t('Maju Bersama', 'Grow Together')}</strong><small>{t('Capai kejayaan', 'Celebrate your progress')}</small></span></li>
              </ul>
            </div>
            <div className="wl-art" aria-hidden="true"><picture><source media="(max-width: 900px), (max-width: 1100px) and (orientation: portrait)" srcSet={assetBase + 'graduate-mobile.png'}/><img src={assetBase + 'graduate-desktop.png'} alt="" width="1168" height="1376" fetchPriority="high"/></picture><p>{t('Matematik', 'Math is')}<br/>{t('Lebih Seronok!', 'more fun!')}</p></div>
          </section>
          <div className="wl-login-column">
            <section className="wl-card" aria-label={t('Log Masuk', 'Log In')}>
              <div className="wl-card-heading"><h2>{t('Log Masuk', 'Log In')}</h2><p>{t('Masuk ke akaun anda untuk meneruskan pembelajaran.', 'Sign in to your account to continue learning.')}</p></div>
              <form className="wl-form" onSubmit={event => { event.preventDefault(); }}>
                <label className="wl-field"><Mail aria-hidden="true"/><input aria-label={t('Emel atau Nama Pengguna', 'Email or Username')} placeholder={t('Emel atau Nama Pengguna', 'Email or Username')} autoComplete="username" disabled/></label>
                <label className="wl-field"><LockKeyhole aria-hidden="true"/><input type="password" aria-label={t('Kata Laluan', 'Password')} placeholder={t('Kata Laluan', 'Password')} autoComplete="current-password" disabled/><button type="button" className="wl-eye" aria-label={t('Tunjukkan kata laluan', 'Show password')} disabled><Eye/></button></label>
                <div className="wl-form-options"><label className="wl-remember"><input type="checkbox" checked disabled/><span aria-hidden="true"><Check/></span>{t('Ingat saya', 'Remember me')}</label><button type="button" className="wl-link" disabled>{t('Lupa kata laluan?', 'Forgot password?')}</button></div>
                <button type="submit" className="wl-primary" disabled>{t('Log Masuk', 'Log In')}<ArrowRight aria-hidden="true"/></button>
              </form>
              <div className="wl-divider"><span>{t('atau', 'or')}</span></div>
              <div className="wl-socials">
                <button type="button" className="wl-social wl-google" disabled><GoogleMark/><span>{t('Log masuk dengan Google', 'Log in with Google')}</span><ChevronRight aria-hidden="true"/></button>
                <button type="button" className="wl-social wl-facebook" disabled><span className="wl-facebook-mark" aria-hidden="true">f</span><span>{t('Log masuk dengan Facebook', 'Log in with Facebook')}</span><ChevronRight aria-hidden="true"/></button>
                <div className="wl-register"><span>{t('Belum mempunyai akaun?', 'Don’t have an account?')}</span><button type="button" disabled>{t('Daftar sekarang', 'Register now')}<ChevronRight aria-hidden="true"/></button></div>
                <button type="button" className="wl-social wl-guest" ref={guestButtonRef} aria-haspopup="dialog" aria-expanded={guest} aria-controls="wl-guest-dialog" onClick={() => setGuest(true)}><UserRound aria-hidden="true"/><span>{t('Log masuk sebagai Tetamu', 'Continue as Guest')}</span><ChevronRight aria-hidden="true"/></button>
              </div>
            </section>
            <footer className="wl-legal">{t('Dengan log masuk, anda bersetuju dengan', 'By signing in, you agree to our')}<br/><button type="button" disabled>{t('Terma Perkhidmatan', 'Terms of Service')}</button> {t('dan', 'and')} <button type="button" disabled>{t('Dasar Privasi', 'Privacy Policy')}</button> {t('kami.', '')}</footer>
          </div>
        </main>
      </div>
      <dialog id="wl-guest-dialog" className="wl-guest-dialog" ref={guestDialogRef} aria-labelledby="wl-guest-title" aria-describedby="wl-guest-description" onCancel={() => setGuest(false)} onClose={() => setGuest(false)} onClick={event => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) setGuest(false);
      }}>
        <button type="button" className="wl-guest-close" aria-label={t('Tutup', 'Close')} onClick={() => setGuest(false)}><X aria-hidden="true"/></button>
        <h2 id="wl-guest-title">{t('Log masuk sebagai Tetamu', 'Continue as Guest')}</h2>
        <p id="wl-guest-description">{t('Kemajuan tetamu disimpan pada peranti ini.', 'Guest progress is saved on this device.')}</p>
        <form id="wl-guest-form" className="wl-guest-form" onSubmit={event => { event.preventDefault(); if (name.trim()) onSave(name.trim()); }}>
          <label htmlFor="wl-guest-name">{t('Siapa nama anda?', 'What is your name?')}</label>
          <input id="wl-guest-name" ref={guestInputRef} value={name} onChange={event => setName(event.target.value)} placeholder={t('Nama anda', 'Your name')} maxLength={24} autoComplete="nickname" required/>
          <button type="submit" className="wl-primary" disabled={!name.trim()}>{t('Mula Belajar', 'Start Learning')}<ArrowRight aria-hidden="true"/></button>
        </form>
      </dialog>
    </div>, document.body
  );
}
