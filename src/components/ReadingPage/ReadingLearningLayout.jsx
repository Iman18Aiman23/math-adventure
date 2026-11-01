import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PageHeader } from '../_shared/PageHeaderHero';
import { HomePageLayoutStyles } from '../HomePage';
import './KVLearningPage.css';
import './ReadingLearningLayout.css';

export default function ReadingLearningLayout({
  children,
  onBack,
  onPrevious,
  onNext,
  previousDisabled = false,
  nextDisabled = false,
  language = 'en',
  accountProps = {},
  pageClassName = '',
  backLabel,
  backLabelLang,
  backLabelDir,
  previousLabel,
  nextLabel,
}) {
  const isMalay = language === 'bm';

  return (
    <div className="rp-layout">
      <HomePageLayoutStyles />
      <div className={`iman-layout kv-learning kv-syllable-learning kv-learning--unified ${pageClassName}`.trim()}>
        <PageHeader
          {...accountProps}
          backOnly
          onBack={onBack}
          language={language}
          showProgress={false}
          backLabel={backLabel}
          backLabelLang={backLabelLang}
          backLabelDir={backLabelDir}
        />
        <div className="kv-learning-stage">
          <main className="kv-learning-body">{children}</main>
        </div>
        <footer className="kv-learning-footer">
          <div className="kv-learning-nav">
            <button type="button" className="kv-previous" onClick={onPrevious} disabled={previousDisabled}>
              <ChevronLeft size={20} aria-hidden="true" />
              {previousLabel ?? (isMalay ? 'Sebelumnya' : 'Previous')}
            </button>
            <button type="button" className="kv-next" onClick={onNext} disabled={nextDisabled}>
              {nextLabel ?? (isMalay ? 'Seterusnya' : 'Next')}
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
