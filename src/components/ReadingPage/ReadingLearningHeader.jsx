import React from 'react';
import BMHeader from '../BahasaMelayuPage/_shared/BMHeader';
import HomeHeaderActions from '../_shared/HomeHeaderActions';

export default function ReadingLearningHeader({ onBack, language, title, accountProps }) {
  return (
    <BMHeader
      onBack={onBack}
      language={language}
      title={title}
      actions={<HomeHeaderActions {...accountProps} language={language} showProgress={false} />}
    />
  );
}
