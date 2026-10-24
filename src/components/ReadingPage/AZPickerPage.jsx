import React from 'react';
import { Target } from 'lucide-react';
import { PageHeader } from '../_shared/PageHeaderHero';
import AZPickerGrid from './AZPickerGrid';
import './KVLearningPage.css';

export default function AZPickerPage({
  letters,
  getCardCount,
  onBack,
  onSelectLetter,
  language = 'en',
  title,
  onStartQuiz,
  ...accountProps
}) {
  const isMalay = language === 'bm';

  return (
    <main className="mh-screen page-layout-root kv-picker kv-picker--master iman-layout">
      <div className="mh-wrap page-container kv-picker-wrap">
        <PageHeader
          {...accountProps}
          onBack={onBack}
          language={isMalay ? 'bm' : 'en'}
          title={title}
          showProgress={false}
        />
        <div className="kv-picker-body">
          <AZPickerGrid
            letters={letters}
            getCardCount={getCardCount}
            onSelectLetter={onSelectLetter}
            language={isMalay ? 'bm' : 'en'}
            variant="master"
          />
          {onStartQuiz && (
            <button type="button" className="kv-start-quiz" onClick={onStartQuiz}>
              <Target size={20} aria-hidden="true" />
              {isMalay ? 'Sedia untuk Kuiz?' : 'Ready for Quiz?'}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
