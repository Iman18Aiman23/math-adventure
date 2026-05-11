import React from 'react';
import MultipleChoice from './Formats/MultipleChoice';
import TextInput from './Formats/TextInput';
import LongMethod from './Formats/LongMethod';

const QuestionRenderer = ({
  question,
  answer,
  onChange,
  onSubmit,
  disabled,
  autoFocus
}) => {
  // Log for debugging
  if (!question.questionType) {
    console.warn('Question missing questionType:', question);
  }

  // Render based on question type
  const qType = question.questionType || 'multiple-choice';
  console.log('Rendering question type:', qType);

  switch (qType) {
    case 'multiple-choice':
      return (
        <MultipleChoice
          question={question}
          answer={answer}
          onChange={onChange}
          disabled={disabled}
        />
      );

    case 'text-input':
      return (
        <TextInput
          question={question}
          answer={answer}
          onChange={onChange}
          onSubmit={onSubmit}
          disabled={disabled}
          autoFocus={autoFocus}
        />
      );

    case 'long-method':
      return (
        <LongMethod
          question={question}
          answer={answer}
          onChange={onChange}
          onSubmit={onSubmit}
          disabled={disabled}
          autoFocus={autoFocus}
        />
      );

    default:
      return (
        <MultipleChoice
          question={question}
          answer={answer}
          onChange={onChange}
          disabled={disabled}
        />
      );
  }
};

export default QuestionRenderer;
