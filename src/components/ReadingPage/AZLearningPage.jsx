import React, { useCallback, useMemo } from 'react';
import BMModuleHubLayout from '../BahasaMelayuPage/_shared/BMModuleHubLayout';
import { getModuleByNum } from '../BahasaMelayuPage/_shared/ModuleData';
import { M1SukuKata } from '../BahasaMelayuPage/_shared/BMJourneySvgs';
import { PageHeader } from '../_shared/PageHeaderHero';
import { playHoverSound } from '../../utils/soundManager';

const TOPIC_NUMS = ['1.1', '1.2', '1.3', '1.4'];
const KV_BG_TOPIC = {
  id: '1-1-10-kv-b-g',
  num: '1.10',
  label: 'Huruf KV B-G',
  icon: M1SukuKata,
  disabled: false,
  afterGoal: true,
};

export default function AZLearningPage({ onBack, language = 'bm', onSelectTopic, ...accountProps }) {
  const bm = language === 'bm';

  const topics = useMemo(() => {
    const module = getModuleByNum(1, 1);
    return [
      ...TOPIC_NUMS
        .map(num => module?.topics.find(topic => topic.num === num))
        .filter(Boolean),
      KV_BG_TOPIC,
    ];
  }, []);

  const handleSelectTopic = useCallback((topicId) => {
    playHoverSound();
    onSelectTopic?.(topicId);
  }, [onSelectTopic]);

  return (
    <main
      className="mh-screen page-layout-root az-hub-root iman-layout"
      aria-label={bm ? 'Belajar Huruf' : 'Learn Alphabet'}
    >
      <div className="mh-wrap page-container az-hub-wrap">
        <PageHeader
          {...accountProps}
          language={bm ? 'bm' : 'en'}
          showProgress={false}
        />
        <BMModuleHubLayout
          year={1}
          activeModule="mendengar"
          topics={topics}
          hideTopicPill
          mulaBelowLabel
          onBack={onBack}
          language={language}
          onSelectTopic={handleSelectTopic}
        />
      </div>
      <style>{`
        .az-hub-root {
          --az-blue: #3B82F6;
          --az-orange: #F97316;
          --az-light-blue: #EFF6FF;
          --az-grey: #9CA3AF;
          --az-grey-line: #D1D5DB;
          width: 100%;
          min-height: 0;
          display: flex;
          flex-direction: column;
          background: var(--az-light-blue);
        }
        .az-hub-wrap {
          display: flex;
          flex: 1 1 auto;
          flex-direction: column;
          min-height: 0;
          background: var(--az-light-blue);
        }
        .az-hub-root .bm-hub-layout {
          flex: 1 1 auto;
          min-height: 0;
        }
        .az-hub-root .bm-hub-layout .module {
          --c: var(--az-blue);
          --cd: var(--az-blue);
          min-height: 0;
          padding: 18px 12px 90px;
          background: var(--az-light-blue);
        }
        .az-hub-root .bm-hub-layout .journey-inner {
          max-width: 600px;
        }
        .az-hub-root .bm-hub-layout .unit-banner {
          max-width: 420px;
          gap: 12px;
          padding: 16px 20px;
          margin-top: 0;
          justify-content: center;
          background: var(--az-blue);
          border: 2px solid var(--az-blue);
          box-shadow: none;
        }
        .az-hub-root .bm-hub-layout .unit-text {
          text-align: center;
        }
        .az-hub-root .bm-hub-layout .unit-kicker {
          font-size: 12px;
          text-shadow: none;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        .az-hub-root .bm-hub-layout .unit-name {
          font-size: 23px;
          text-shadow: none;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        .az-hub-root .bm-hub-layout .unit-back {
          width: 46px;
          box-shadow: none;
        }
        .az-hub-root .bm-hub-layout .unit-badge svg rect:first-of-type {
          fill: var(--az-light-blue);
        }
        .az-hub-root .bm-hub-layout .unit-badge svg path:nth-of-type(1) {
          fill: var(--az-blue);
        }
        .az-hub-root .bm-hub-layout .unit-badge svg path:nth-of-type(2),
        .az-hub-root .bm-hub-layout .unit-badge svg path:nth-of-type(3) {
          stroke: var(--az-blue);
        }
        .az-hub-root .bm-hub-layout .trail {
          --amp: clamp(72px, 12vw, 150px);
        }
        .az-hub-root .bm-hub-layout .step {
          padding: 16px 0;
        }
        .az-hub-root .bm-hub-layout .trail-path-under {
          stroke-width: 12;
        }
        .az-hub-root .bm-hub-layout .trail-path-seg {
          stroke: var(--az-grey-line);
          stroke-width: 6;
          stroke-dasharray: 8 18;
          opacity: 1;
        }
        .az-hub-root .bm-hub-layout .trail-path-seg.done-path {
          stroke: var(--c);
          stroke-width: 7;
          stroke-dasharray: none;
          opacity: 1;
          filter: none;
        }
        .az-hub-root .bm-hub-layout .trail-path-seg.active-path {
          stroke: var(--c);
          stroke-width: 7;
          stroke-dasharray: none;
          opacity: 1;
          filter: none;
        }
        .az-hub-root .bm-hub-layout .node-btn {
          width: 110px;
          height: 110px;
        }
        .az-hub-root .bm-hub-layout .node-lock {
          width: 42px;
          height: 42px;
        }
        .az-hub-root .bm-hub-layout .node-lock svg {
          width: 24px;
          height: 24px;
        }
        .az-hub-root .bm-hub-layout .node-check {
          width: 40px;
          height: 40px;
          font-size: 21px;
        }
        .az-hub-root .bm-hub-layout .node-goal .node-ico svg {
          width: 84px;
          height: 84px;
        }
        .az-hub-root .bm-hub-layout .trophy-count {
          font-size: 15px;
        }
        .az-hub-root .bm-hub-layout .node-meta {
          max-width: 240px;
          margin-top: 4px;
        }
        .az-hub-root .bm-hub-layout .node-label {
          font-size: 18px;
          padding: 7px 20px;
        }
        .az-hub-root .bm-hub-layout .start-bubble {
          font-size: 13px;
          padding: 5px 16px;
          margin: 5px 0 0;
        }
        .az-hub-root .bm-hub-layout .step-button:not([disabled]):hover {
          filter: none;
        }
        .az-hub-root .bm-hub-layout .node-btn,
        .az-hub-root .bm-hub-layout .node-btn:hover,
        .az-hub-root .bm-hub-layout .node-btn:active,
        .az-hub-root .bm-hub-layout .step-button.node-disabled .node-btn,
        .az-hub-root .bm-hub-layout .step-button.node-disabled .node-btn:hover,
        .az-hub-root .bm-hub-layout .node-goal,
        .az-hub-root .bm-hub-layout .node-goal:active {
          box-shadow: none;
        }
        .az-hub-root .bm-hub-layout .node-goal {
          background: var(--az-blue);
          border-color: var(--az-blue);
        }
        .az-hub-root .bm-hub-layout .trophy-count {
          color: var(--az-blue);
          border-color: var(--az-blue);
        }
        .az-hub-root .bm-hub-layout .trophy-all-done .trophy-count {
          background: var(--az-blue);
          color: #fff;
          border-color: var(--az-blue);
        }
        .az-hub-root .bm-hub-layout .node-lock,
        .az-hub-root .bm-hub-layout .node-check {
          box-shadow: none;
        }
        .az-hub-root .bm-hub-layout .node-lock {
          background: var(--az-grey);
        }
        .az-hub-root .bm-hub-layout .node-check {
          background: var(--az-blue);
        }
        .az-hub-root .bm-hub-layout .step-button .node-label,
        .az-hub-root .bm-hub-layout .node-label-goal {
          color: var(--az-blue);
          background: #fff;
          border-color: var(--az-blue);
          box-shadow: none;
        }
        .az-hub-root .bm-hub-layout .step-button.node-locked .node-label {
          color: var(--az-grey);
          border-color: var(--az-grey);
          box-shadow: none;
        }
        .az-hub-root .bm-hub-layout .start-bubble {
          border-color: var(--az-orange);
          background: var(--az-orange);
          color: #fff;
          box-shadow: none;
        }
        @media (min-width: 768px) {
          .az-hub-root .bm-hub-layout .module {
            padding-top: 24px;
          }
          .az-hub-root .bm-hub-layout .journey-inner {
            max-width: 960px;
          }
          .az-hub-root .bm-hub-layout .unit-banner {
            max-width: 860px;
          }
          .az-hub-root .bm-hub-layout .unit-kicker,
          .az-hub-root .bm-hub-layout .unit-name {
            display: block;
            white-space: nowrap;
            overflow: visible;
          }
          .az-hub-root .bm-hub-layout .unit-kicker {
            font-size: 14px;
          }
          .az-hub-root .bm-hub-layout .unit-name {
            font-size: 30px;
          }
        }
        @media (max-width: 840px) {
          .az-hub-root .bm-hub-layout .trail {
            --amp: clamp(38px, 13vw, 72px);
          }
        }
        @media (max-width: 560px) {
          .az-hub-root .bm-hub-layout .node-meta {
            max-width: 210px;
            margin-top: 2px;
          }
          .az-hub-root .bm-hub-layout .node-label {
            font-size: 16px;
            padding: 6px 16px;
          }
          .az-hub-root .bm-hub-layout .trail-path-under {
            stroke-width: 10;
          }
          .az-hub-root .bm-hub-layout .trail-path-seg {
            stroke-width: 5;
          }
        }
      `}</style>
    </main>
  );
}
