import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Check, Crown, Sparkles, X } from 'lucide-react';
import './UpgradePlanModal.css';

export default function UpgradePlanModal({ language = 'en', onClose }) {
  const bm = language === 'bm';
  const t = (ms, en) => (bm ? ms : en);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
        return;
      }
      if (event.key !== 'Tab') return;
      const controls = [...dialogRef.current.querySelectorAll('button:not([disabled])')].filter((el) => el.getClientRects().length);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const freeBenefits = [
    t('Empat subjek teras', 'Four core subjects'),
    t('Streak harian & ganjaran asas', 'Daily streak & basic rewards'),
    t('Laporan kemajuan asas', 'Basic progress reports'),
  ];

  const premiumBenefits = [
    t('Semua subjek dibuka', 'Every subject unlocked'),
    t('Ganjaran premium & lencana eksklusif', 'Premium rewards & exclusive badges'),
    t('Sijil pencapaian', 'Achievement certificates'),
    t('Kandungan baharu didahulukan', 'Early access to new content'),
  ];

  return createPortal(
    <div
      className="upgrade-overlay"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <div
        className="upgrade-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="upgrade-title"
        aria-describedby="upgrade-description"
        ref={dialogRef}
      >
        <button type="button" className="upgrade-close" aria-label={t('Tutup', 'Close')} onClick={onClose} ref={closeRef}>
          <X aria-hidden="true" />
        </button>

        <header className="upgrade-header">
          <span className="upgrade-header-icon" aria-hidden="true"><Crown /></span>
          <h2 id="upgrade-title">{t('Naik Taraf Pelan', 'Upgrade Plan')}</h2>
          <p id="upgrade-description">
            {t('Buka semua subjek dan ganjaran premium untuk pengalaman belajar yang lengkap.', 'Unlock every subject and premium rewards for the complete learning experience.')}
          </p>
        </header>

        <div className="upgrade-plans">
          <section className="upgrade-plan" aria-label={t('Pelan Percuma', 'Free Plan')}>
            <div className="upgrade-plan-head">
              <h3>{t('Pelan Percuma', 'Free Plan')}</h3>
              <span className="upgrade-plan-badge">{t('Semasa', 'Current')}</span>
            </div>
            <p className="upgrade-plan-price">{t('Kekal percuma', 'Always free')}</p>
            <ul className="upgrade-benefits">
              {freeBenefits.map((benefit) => (
                <li key={benefit}><span className="upgrade-check" aria-hidden="true"><Check /></span>{benefit}</li>
              ))}
            </ul>
            <button type="button" className="upgrade-secondary-btn" onClick={onClose}>
              {t('Teruskan Percuma', 'Continue with Free')}
            </button>
          </section>

          <section className="upgrade-plan upgrade-plan-premium" aria-label={t('Pelan Premium', 'Premium Plan')}>
            <div className="upgrade-plan-head">
              <h3>{t('Pelan Premium', 'Premium Plan')}</h3>
              <span className="upgrade-plan-badge upgrade-plan-badge-soon">{t('Akan Datang', 'Coming soon')}</span>
            </div>
            <p className="upgrade-plan-price"><Sparkles aria-hidden="true" />{t('Semua akses', 'Everything included')}</p>
            <ul className="upgrade-benefits">
              {premiumBenefits.map((benefit) => (
                <li key={benefit}><span className="upgrade-check" aria-hidden="true"><Check /></span>{benefit}</li>
              ))}
            </ul>
            <button type="button" className="upgrade-primary-btn" disabled>
              <Crown aria-hidden="true" />
              {t('Akan Dilancarkan', 'Launching soon')}
            </button>
          </section>
        </div>

        <p className="upgrade-note">
          {t('Pembayaran belum tersedia. Premium akan dilancarkan tidak lama lagi.', 'Payments are not available yet. Premium is launching soon.')}
        </p>
      </div>
    </div>,
    document.body,
  );
}
