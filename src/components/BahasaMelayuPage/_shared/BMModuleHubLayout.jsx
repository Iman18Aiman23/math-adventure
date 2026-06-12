import React, { useCallback, useMemo } from 'react';
import { getModulesForYear } from './ModuleData';
import { TrophyIcon } from './BMJourneySvgs';
import { isTopicCompleted } from './useModuleProgress';
import useGamification from '../../../hooks/useGamification';
import CrownDisplay from '../../_shared/CrownDisplay';

function stripPrefix(id) {
  return id ? id.replace(/^\d-/, '') : '';
}

// Serpentine path: centre → right → centre → left, so every consecutive
// pair of nodes is the same horizontal distance apart.
const SERPENTINE = [0, 1, 0, -1];

export default function BMModuleHubLayout({ year, activeModule, onSelectTopic, language }) {
  const modules = useMemo(() => getModulesForYear(year), [year]);
  const { loading, getTopicLevel } = useGamification('bm');

  const activeIdx = useMemo(() => {
    const stripped = stripPrefix(activeModule);
    return modules.findIndex(m => m.id === stripped);
  }, [modules, activeModule]);

  const handleTopicClick = useCallback((topicId) => {
    if (onSelectTopic) onSelectTopic(topicId);
  }, [onSelectTopic]);

  const renderTopic = (topic, index) => {
    const isFirst = index === 0;
    const IconComp = topic.icon;
    const level = loading ? 0 : getTopicLevel(topic.id);
    const hasCrown = level >= 1;

    return (
      <div key={topic.id} className="step" style={{ '--dir': SERPENTINE[index % 4] }}>
        {isFirst && <div className="start-bubble">MULA<i></i></div>}
        <button
          type="button"
          className={`node-btn${topic.disabled ? ' node-disabled' : ''}${hasCrown && !topic.disabled ? ' node-done' : ''}`}
          aria-label={`TOPIK ${topic.num}`}
          onClick={() => !topic.disabled && handleTopicClick(topic.id)}
          disabled={topic.disabled}
        >
          <span className="node-ico">
            {IconComp ? <IconComp /> : null}
          </span>
        </button>
        <div className="node-meta">
          <div className="node-topic">TOPIK {topic.num}</div>
          <div className="node-label">{topic.label}</div>
          <div className="node-crown">
            <CrownDisplay level={level} size="sm" loading={loading} />
          </div>
        </div>
      </div>
    );
  };

  const renderModule = (mod, isActive) => {
    const BadgeComp = mod.badge;
    const totalTopics = mod.topics.length;
    const doneCount = mod.topics.filter(t => isTopicCompleted(t.id)).length;

    return (
      <section
        key={mod.num}
        className={`module mod-${mod.num}`}
        data-module={mod.num}
        hidden={!isActive}
      >
        <div className="journey-inner">
          <div className="unit-banner">
            <div className="unit-text">
              <div className="unit-kicker">
                {language === 'bm'
                  ? `Modul ${mod.num} · Unit Pembelajaran`
                  : `Module ${mod.num} · Learning Unit`}
              </div>
              <div className="unit-name">
                {language === 'bm' ? mod.name : mod.nameEn}
              </div>
            </div>
            <div className="unit-badge">
              {BadgeComp ? <BadgeComp /> : null}
            </div>
          </div>

          <div className="trail">
            {mod.topics.map((topic, i) => renderTopic(topic, i))}

            <div className="step is-goal">
              <div className={`trophy-wrap${doneCount === totalTopics && totalTopics > 0 ? ' trophy-all-done' : ''}`}>
                <button type="button" className="node-btn node-goal" aria-label={language === 'bm' ? 'Tamat Modul' : 'End Module'}>
                  <span className="node-ico"><TrophyIcon /></span>
                </button>
                <span className="trophy-count">{doneCount}/{totalTopics}</span>
              </div>
              <div className="node-meta">
                <div className="node-label node-label-goal">
                  {doneCount === totalTopics && totalTopics > 0
                    ? (language === 'bm' ? 'Semua Lengkap! 🎉' : 'All Complete! 🎉')
                    : (language === 'bm' ? 'Tamat Modul' : 'End Module')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="bm-hub-layout">
      {modules.map((mod, idx) => renderModule(mod, idx === activeIdx))}

      <style>{`
        .module[hidden]{display:none}
        .module{min-height:100vh;padding:34px 16px 120px}
        .mod-1{--c:#E8821A;--cd:#A34F0A;--stage:radial-gradient(ellipse at 50% 34%,#FEE9C8 0%,#F5B76A 55%,#E8821A 100%);background:radial-gradient(ellipse at top,#FEF4E6,#FAE0BB);}
        .mod-2{--c:#1E7AC9;--cd:#0E4A7E;--stage:radial-gradient(ellipse at 50% 34%,#D5E9FA 0%,#7DB8ED 55%,#1E7AC9 100%);background:radial-gradient(ellipse at top,#E6F1FB,#C8DCF6);}
        .mod-3{--c:#7A4FD0;--cd:#3F2A86;--stage:radial-gradient(ellipse at 50% 34%,#EBE2FB 0%,#B49EEE 55%,#7A4FD0 100%);background:radial-gradient(ellipse at top,#F0EBFB,#DCD2F4);}
        .mod-4{--c:#E8568A;--cd:#A81E59;--stage:radial-gradient(ellipse at 50% 34%,#FCDCEA 0%,#F39BC0 55%,#E8568A 100%);background:radial-gradient(ellipse at top,#FDEBF3,#F8D4E4);}
        .mod-5{--c:#159E96;--cd:#0B5E5A;--stage:radial-gradient(ellipse at 50% 32%,#D6F4F0 0%,#7CD6CE 55%,#159E96 100%);background:radial-gradient(ellipse at top,#E6F6F4,#C6E9E5);}

        .journey-inner{max-width:460px;margin:0 auto}

        .unit-banner{display:flex;align-items:center;gap:14px;background:var(--c);color:#fff;
          border-radius:22px;padding:18px 20px;margin:6px 0 34px;
          box-shadow:0 7px 0 0 var(--cd),0 18px 30px -12px rgba(0,0,0,.3)}
        .unit-text{flex:1;min-width:0}
        .unit-kicker{font-family:'Baloo 2',sans-serif;font-weight:700;font-size:11px;letter-spacing:.14em;
          text-transform:uppercase;opacity:.85;margin-bottom:3px}
        .unit-name{font-family:'Baloo 2',sans-serif;font-weight:800;font-size:21px;line-height:1.1;letter-spacing:-.01em}
        .unit-badge{width:46px;height:46px;flex:0 0 auto;border-radius:14px;background:rgba(255,255,255,.18);
          display:flex;align-items:center;justify-content:center}
        .unit-badge svg{width:26px;height:26px}

        .trail{--amp:clamp(48px,24vw,118px);display:flex;flex-direction:column;align-items:center}
        .step{display:flex;flex-direction:column;align-items:center;padding:9px 0;
          transform:translateX(calc(var(--dir,0) * var(--amp)));
          transition:transform .3s cubic-bezier(.34,1.56,.64,1)}

        .node-btn{position:relative;width:96px;height:96px;border-radius:50%;padding:0;border:none;cursor:pointer;
          background:transparent;-webkit-tap-highlight-color:transparent;
          box-shadow:0 9px 20px -8px rgba(0,0,0,.38);
          display:flex;align-items:center;justify-content:center;
          transition:transform .16s cubic-bezier(.34,1.56,.64,1),box-shadow .16s ease}
        @media (hover:hover){
          .node-btn:hover{transform:translateY(-4px) scale(1.06);
            box-shadow:0 0 0 5px rgba(255,255,255,.65),0 18px 30px -10px rgba(0,0,0,.42)}
          .node-btn.node-disabled:hover{transform:none;box-shadow:0 9px 20px -8px rgba(0,0,0,.38)}
          .node-goal:hover{transform:translateY(-4px) scale(1.04);
            box-shadow:0 8px 0 #B45309,0 16px 30px -10px rgba(120,80,4,.45)}
        }
        .node-btn:active{transform:translateY(2px) scale(.96);box-shadow:0 4px 10px -6px rgba(0,0,0,.3)}
        .node-btn.node-disabled{opacity:.5;cursor:default;filter:grayscale(.6)}
        .node-ico{width:100%;height:100%;display:flex;align-items:center;justify-content:center}
        .node-ico svg{width:100%;height:100%;display:block}

        .node-goal{background:radial-gradient(circle at 42% 32%,#FFFBEB 0%,#FBBF24 75%,#D97706 100%);
          border:3px solid rgba(255,255,255,.45);box-shadow:0 5px 0 #B45309,0 10px 24px -10px rgba(120,80,4,.4)}
        .node-goal:active{transform:translateY(2px);box-shadow:0 2px 0 #B45309,0 4px 12px -8px rgba(120,80,4,.25)}
        .node-goal .node-ico svg{width:62px;height:62px}
        .node-done .node-ico svg{opacity:.7}
        .trophy-wrap{position:relative;display:flex;flex-direction:column;align-items:center}
        .trophy-count{font-family:'Baloo 2',sans-serif;font-weight:800;font-size:13px;
          color:#A9740A;margin-top:-4px;background:rgba(255,255,255,.7);
          padding:2px 12px;border-radius:99px;border:1px solid #E0A01244;position:relative;z-index:1}
        .trophy-all-done .trophy-count{background:#16A34A;color:#fff;border-color:#16A34A44}

        .node-meta{margin-top:8px;text-align:center;max-width:160px}
        .node-topic{font-family:'Baloo 2',sans-serif;font-weight:700;font-size:10px;letter-spacing:.13em;
          text-transform:uppercase;color:var(--c)}
        .node-label{font-family:'Baloo 2',sans-serif;font-weight:800;font-size:15px;line-height:1.15;
          color:var(--cd);margin-top:2px;text-wrap:balance}
        .node-label-goal{color:#A9740A}

        .node-crown{margin-top:4px;min-height:14px;display:flex;align-items:center;justify-content:center}
        /* crown sits in .node-meta, the sibling AFTER the disabled button — not inside it */
        .node-disabled + .node-meta .node-crown{opacity:.45}

        .start-bubble{position:relative;margin-bottom:14px;background:#fff;color:var(--cd);
          font-family:'Baloo 2',sans-serif;font-weight:800;font-size:12px;letter-spacing:.12em;
          padding:7px 16px;border-radius:13px;box-shadow:0 5px 0 rgba(0,0,0,.08),0 10px 16px -8px rgba(0,0,0,.25);
          animation:bounceY 1.5s ease-in-out infinite}
        .start-bubble i{position:absolute;left:50%;bottom:-5px;width:12px;height:12px;background:#fff;
          transform:translateX(-50%) rotate(45deg)}
        @keyframes bounceY{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}

        .floatA{animation:floatA 3.5s ease-in-out infinite;transform-origin:center}
        .floatA.d1{animation-delay:.35s}.floatA.d2{animation-delay:.7s}
        @keyframes floatA{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
        .pulse{animation:pulse 2.2s ease-in-out infinite}
        @keyframes pulse{0%,100%{opacity:.55}50%{opacity:1}}
        .bob{animation:bob 2.6s ease-in-out infinite;transform-origin:center}
        @keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
        .wave{animation:wave 1.8s ease-in-out infinite}
        .wave.w2{animation-delay:.3s}.wave.w3{animation-delay:.6s}
        @keyframes wave{0%,100%{opacity:.35;transform:scale(.9)}50%{opacity:1;transform:scale(1.05)}}
        .beat{animation:beat 1.6s ease-in-out infinite;transform-origin:center}
        @keyframes beat{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}

        @media (prefers-reduced-motion:reduce){
          .floatA,.pulse,.bob,.wave,.beat,.start-bubble{animation:none}
        }
        @media (max-width:380px){
          .node-btn{width:86px;height:86px}
        }
      `}</style>
    </div>
  );
}
