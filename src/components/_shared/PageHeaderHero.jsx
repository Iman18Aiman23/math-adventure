import { useId } from 'react';
import { ArrowLeft } from 'lucide-react';
import ImanAILogo from './ImanAILogo';
import HomeHeaderActions from './HomeHeaderActions';

export function PageHeader({ title, onBack, language = 'bm', ...accountProps }) {
  return <header className={`ip-header ${title ? 'mh-header' : 'ih-header'}`}>
    <style>{`
      .iman-layout .ip-header { display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); align-items: center; min-height: 44px; gap: 8px; }
      .iman-layout .ip-header .ih-top-actions-cluster { display: flex; grid-column: 3; justify-self: end; position: relative; gap: 10px; flex-shrink: 0; }
      .iman-layout .ip-header button { font-family: 'Inter', sans-serif; }
      .iman-layout .ip-header .ih-points { display: inline-flex; height: 40px; min-height: 40px; min-width: 76px; max-width: 120px; padding: 7px 14px; gap: 8px; font-size: 19px; background: #edfff3; border: 1px solid white; }
      .iman-layout .ip-header .ih-points svg { width: 24px; height: 24px; }
      .iman-layout .ip-header .ih-account { display: flex; height: 44px; min-height: 44px; padding: 3px 12px 3px 5px; gap: 8px; }
      .iman-layout .ip-header .ih-account .ih-avatar { width: 34px; height: 34px; border-width: 2px; }
      .iman-layout .ip-header .ih-account .ih-avatar svg { width: 27px; height: 27px; }
      .iman-layout .ip-header .ih-account > svg { width: 19px; height: 19px; }
      .iman-layout .ip-header > h1 { position: static; transform: none; max-width: none; margin: 0; font: 800 clamp(18px, 2vw, 26px)/1.2 'Outfit', sans-serif; text-align: center; }
      .iman-layout .ip-header .ih-mobile-settings { display: none; }
      .iman-layout .ip-hero { height: 260px; min-height: 260px; flex-shrink: 0; }
      @container iman-page (max-width: 559px) {
        .iman-layout .ip-hero { height: 320px; min-height: 320px; }
        .iman-layout .ip-header { min-height: 76px; align-items: end; grid-template-columns: minmax(0, 1fr) auto; }
        .iman-layout .ip-header > h1 { position: absolute; left: 50%; top: 0; transform: translateX(-50%); }
        .iman-layout .ip-header .ih-top-actions-cluster { grid-column: 2; gap: 6px; }
        .iman-layout .ip-header .ih-points { min-width: 60px; max-width: 84px; padding-inline: 8px; }
        .iman-layout .ip-header .ih-mobile-logo { display: block; width: 100%; max-width: 110px; min-width: 0; padding: 0; background: transparent; }
        .iman-layout .ip-header .ih-mobile-settings { display: grid; place-items: center; width: 32px; height: 44px; padding: 0; border: 1px solid #e6effa; border-radius: 22px; background: #f8fcff; color: #6b88ae; }
      }
    `}</style>
    {title ? <>
      <button type="button" className="mh-back" onClick={onBack} aria-label={language === 'bm' ? 'Kembali' : 'Back'}><ArrowLeft aria-hidden="true" /></button>
      <h1>{title}</h1>
    </> : <button type="button" className="ih-mobile-logo" onClick={accountProps.onHome} aria-label="ImanAI — Home"><ImanAILogo language={language} /></button>}
    <HomeHeaderActions {...accountProps} language={language} showMobileSettings={!title} />
  </header>;
}

export function PageHero({ home = false, titleId, eyebrow, heroTitle, titleText, description, encouragement, mascot, decoration, heroBackground }) {
  const id = useId();
  const headingId = titleId || `${id}-hero`;
  const Heading = home ? 'h1' : 'h2';
  return <section className={`ip-hero ${home ? 'ih-hero' : 'mh-hero'}`} aria-labelledby={headingId} style={heroBackground ? { background: heroBackground } : undefined}>
    <div className={home ? 'ih-hero-copy' : 'mh-hero-copy'}>
      <p className={home ? 'ih-eyebrow' : 'mh-eyebrow'}>{eyebrow}</p>
      <Heading id={headingId} title={titleText}>{heroTitle}</Heading>
      <p className={home ? 'ih-hero-lead' : 'mh-description'}>{description}</p>
      {home ? encouragement : <p className="mh-encouragement">{encouragement}</p>}
    </div>
    <div className={home ? 'ih-hero-art' : 'mh-mascot'} aria-hidden="true">{mascot}</div>
    {decoration}
  </section>;
}
