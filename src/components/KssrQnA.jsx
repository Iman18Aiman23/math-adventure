import React, { useState } from 'react';

/**
 * Shared KSSR curriculum Q&A accordion (used by the age-group home pages).
 *
 * Clean, professional accordion: question on the left, chevron on the RIGHT,
 * no pills. One panel open at a time. Theme via the `gradient` prop.
 *
 * Props:
 *   qna       — [{ q:{bm,eng}, intro:{bm,eng}, items:[{bm,eng}] }]
 *   language  — 'bm' | 'eng'
 *   gradient  — CSS background for the card
 *   badges    — string[] shown under the title (already language-resolved)
 *   title     — optional heading override (default: "Berdasarkan Kurikulum KSSR")
 */
export default function KssrQnA({ qna, language = 'bm', gradient, badges = [], title }) {
  const [openIndex, setOpenIndex] = useState(null);
  const t = (o) => (language === 'bm' ? o.bm : o.eng);

  return (
    <div style={{ background: gradient, borderRadius: '16px', padding: '1.1rem 1.25rem', marginBottom: '1rem', color: '#fff' }}>
      <div style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '0.01em' }}>
        {title || (language === 'bm' ? 'Berdasarkan Kurikulum KSSR' : 'Based on KSSR Curriculum')}
      </div>

      {badges.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.55rem' }}>
          {badges.map((b) => (
            <span key={b} style={{ background: 'rgba(255,255,255,0.18)', borderRadius: '999px', padding: '0.16rem 0.6rem', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.02em' }}>
              {b}
            </span>
          ))}
        </div>
      )}

      <div style={{ marginTop: '0.85rem' }}>
        {qna.map((block, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  padding: '0.8rem 0', textAlign: 'left', color: '#fff', font: 'inherit',
                }}
              >
                <span style={{ flex: 1, fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.35 }}>
                  {t(block.q)}
                </span>
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  style={{ flexShrink: 0, opacity: 0.85, transition: 'transform 0.25s ease', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {isOpen && (
                <div style={{ animation: 'kssrFade 0.2s ease', padding: '0 0 0.85rem' }}>
                  <p style={{ margin: '0 0 0.55rem', fontSize: '0.88rem', lineHeight: 1.5, opacity: 0.88 }}>
                    {t(block.intro)}
                  </p>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {block.items.map((it, j) => (
                      <li key={j} style={{ position: 'relative', paddingLeft: '0.9rem', fontSize: '0.85rem', lineHeight: 1.5, opacity: 0.92 }}>
                        <span style={{ position: 'absolute', left: 0, top: '0.5em', width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(255,255,255,0.65)' }} />
                        {t(it)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style>{`@keyframes kssrFade { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}
