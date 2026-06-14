import React, { useCallback, useMemo } from 'react';
import { getModulesForYear } from './ModuleData';
import { TrophyIcon } from './BMJourneySvgs';
import { isTopicCompleted } from './useModuleProgress';
import useGamification from '../../../hooks/useGamification';
import CrownDisplay from '../../_shared/CrownDisplay';
import BMTopicRobot from './BMTopicRobot';
import { BM_TOPIC_SCREENS } from './BMTopicScreens';

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

  const renderTopic = (topic, index, modNum) => {
    const isFirst = index === 0;
    const IconComp = topic.icon;
    const screen = BM_TOPIC_SCREENS[topic.id];
    const level = loading ? 0 : getTopicLevel(topic.id);
    const hasCrown = level >= 1;

    return (
      <div key={topic.id} className="step" style={{ '--dir': SERPENTINE[index % 4] }}>
        {isFirst && <div className="start-bubble">MULA<i></i></div>}
        <button
          type="button"
          className={`node-btn${screen ? ' node-robot' : ''}${topic.disabled ? ' node-disabled' : ''}${hasCrown && !topic.disabled ? ' node-done' : ''}`}
          aria-label={`TOPIK ${topic.num}`}
          onClick={() => !topic.disabled && handleTopicClick(topic.id)}
          disabled={topic.disabled}
        >
          <span className="node-ico">
            {screen ? <BMTopicRobot mod={modNum}>{screen}</BMTopicRobot> : (IconComp ? <IconComp /> : null)}
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
            {mod.topics.map((topic, i) => renderTopic(topic, i, mod.num))}

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
        .mod-1{--c:#FF8F3D;--cd:#FF6F00;}
        .mod-2{--c:#36A9F0;--cd:#1A78C7;}
        .mod-3{--c:#A368F0;--cd:#7038D6;}
        .mod-4{--c:#FF6FA8;--cd:#DB3E7F;}
        .mod-5{--c:#1EC9B7;--cd:#0E9488;}
        /* Warm yellow "sunburst" page background (palette) — unifies every module;
           per-module color identity lives in the banner / nodes / tabs accents. */
        .bm-hub-layout .module{background:linear-gradient(135deg,#FFF9E6 0%,#FFEAA7 100%)}

        .journey-inner{max-width:460px;margin:0 auto}

        .unit-banner{display:flex;align-items:center;gap:14px;color:#fff;
          background:linear-gradient(135deg,color-mix(in srgb,var(--c) 86%,white),var(--c));
          border:5px solid var(--cd);
          border-radius:28px;padding:18px 22px;margin:6px 0 34px;
          box-shadow:0 12px 0 var(--cd),0 15px 25px rgba(0,0,0,.1)}
        .unit-text{flex:1;min-width:0}
        .unit-kicker{font-family:'Fredoka',sans-serif;font-weight:600;font-size:11px;letter-spacing:.14em;
          text-transform:uppercase;color:#FFD25A;text-shadow:1px 1px 0 var(--cd);margin-bottom:4px}
        .unit-name{font-family:'Fredoka',sans-serif;font-weight:700;font-size:21px;line-height:1.1;letter-spacing:-.01em;
          text-shadow:2px 3px 0 var(--cd)}
        .unit-badge{width:46px;height:46px;flex:0 0 auto;border-radius:14px;background:rgba(255,255,255,.18);
          display:flex;align-items:center;justify-content:center}
        .unit-badge svg{width:26px;height:26px}

        .trail{--amp:clamp(48px,24vw,118px);display:flex;flex-direction:column;align-items:center}
        .step{display:flex;flex-direction:column;align-items:center;padding:9px 0;
          transform:translateX(calc(var(--dir,0) * var(--amp)));
          transition:transform .3s cubic-bezier(.34,1.56,.64,1)}

        /* 3D "squishy" candy node: solid colored ledge below (var(--cd)) reads as
           depth; pressing translates the button down by the ledge height so it
           "sinks" into the page for tactile feedback. */
        /* Topic nodes are self-contained illustrations (own circle, color & rim),
           so no colored ring/fill here — just a neutral 3D base + squishy press
           that works under every per-topic color. */
        .node-btn{position:relative;width:96px;height:96px;border-radius:50%;padding:0;border:none;cursor:pointer;
          background:transparent;-webkit-tap-highlight-color:transparent;
          box-shadow:0 8px 0 rgba(0,0,0,.16),0 15px 20px -8px rgba(0,0,0,.32);
          display:flex;align-items:center;justify-content:center;
          transition:transform .12s ease,box-shadow .12s ease}
        @media (hover:hover){
          .node-btn:hover{transform:translateY(-4px) scale(1.06);
            box-shadow:0 12px 0 rgba(0,0,0,.16),0 22px 26px -8px rgba(0,0,0,.34)}
          .node-btn.node-disabled:hover{transform:none;box-shadow:0 8px 0 rgba(0,0,0,.14),0 15px 20px -8px rgba(0,0,0,.22)}
          .node-goal:hover{transform:translateY(-4px) scale(1.04);
            box-shadow:0 12px 0 #B45309,0 20px 25px -6px rgba(120,80,4,.4)}
        }
        .node-btn:active{transform:translateY(8px) scale(.97);box-shadow:0 0 0 rgba(0,0,0,.16),0 4px 10px -6px rgba(0,0,0,.25)}
        /* robot-head nodes are rounded-squares, so the 3D ledge follows that shape */
        .node-btn.node-robot{border-radius:26px}
        .node-btn.node-disabled{cursor:default;filter:grayscale(1);
          box-shadow:0 8px 0 rgba(0,0,0,.14),0 15px 20px -8px rgba(0,0,0,.22)}
        /* locked node → padlock badge so the gated state is unmistakable */
        .node-disabled::after{content:"🔒";position:absolute;right:-4px;bottom:-4px;
          width:34px;height:34px;border-radius:50%;background:#fff;border:2px solid #7A7A7A;
          display:flex;align-items:center;justify-content:center;font-size:16px;
          box-shadow:0 2px 0 #b9b9b9,0 4px 8px rgba(0,0,0,.25);z-index:3}
        .node-ico{width:100%;height:100%;display:flex;align-items:center;justify-content:center}
        .node-ico svg{width:100%;height:100%;display:block}

        /* The "End Module" trophy is a flat node (not an illustration), so it keeps
           a solid gold fill + matching ledge + a glossy spot. */
        .node-goal{background:radial-gradient(circle at 42% 32%,#FFFBEB 0%,#FBBF24 75%,#D97706 100%);
          border:5px solid #B45309;box-shadow:0 8px 0 #B45309,0 15px 20px -4px rgba(120,80,4,.4)}
        .node-goal::before{content:"";position:absolute;top:9px;left:14px;width:28px;height:14px;
          border-radius:50%;transform:rotate(-15deg);background:rgba(255,255,255,.42);pointer-events:none;z-index:2}
        .node-goal:active{transform:translateY(8px);box-shadow:0 0 0 #B45309,0 4px 12px -8px rgba(120,80,4,.25)}
        .node-goal .node-ico svg{width:62px;height:62px}
        .node-done .node-ico svg{opacity:.7}
        .trophy-wrap{position:relative;display:flex;flex-direction:column;align-items:center}
        .trophy-count{font-family:'Fredoka',sans-serif;font-weight:700;font-size:13px;
          color:#A9740A;margin-top:-4px;background:rgba(255,255,255,.7);
          padding:2px 12px;border-radius:99px;border:1px solid #E0A01244;position:relative;z-index:1}
        .trophy-all-done .trophy-count{background:#16A34A;color:#fff;border-color:#16A34A44}

        .node-meta{margin-top:12px;text-align:center;max-width:180px}
        /* "TOPIK n" → solid module-color badge with white text (echoes the robot head) */
        .node-topic{display:inline-block;font-family:'Fredoka',sans-serif;font-weight:700;font-size:10px;letter-spacing:.1em;
          text-transform:uppercase;color:#fff;background:var(--cd);
          padding:3px 11px;border-radius:99px;margin-bottom:6px}
        /* topic label → white pill framed in the module deep color + matching 3D ledge */
        .node-label{display:inline-block;font-family:'Fredoka',sans-serif;font-weight:700;font-size:14px;line-height:1.2;
          color:#5C3D2E;background:#fff;padding:5px 16px;border-radius:20px;
          border:3px solid var(--cd);box-shadow:0 4px 0 var(--cd);text-wrap:balance}
        .node-label-goal{color:#A9740A;border-color:#A9740A;box-shadow:0 4px 0 #A9740A}

        .node-crown{margin-top:4px;min-height:14px;display:flex;align-items:center;justify-content:center}
        /* crown sits in .node-meta, the sibling AFTER the disabled button — not inside it */
        .node-disabled + .node-meta .node-crown{opacity:.45}

        .start-bubble{position:relative;margin-bottom:18px;
          background:#FF4A6B;color:#fff;
          font-family:'Fredoka',sans-serif;font-weight:600;font-size:13px;letter-spacing:.08em;
          padding:6px 16px;border-radius:12px;border:3px solid #D63031;
          box-shadow:0 4px 0 #D63031;
          animation:bounceY 1.5s ease-in-out infinite}
        .start-bubble i{position:absolute;left:50%;bottom:-8px;width:12px;height:12px;background:#FF4A6B;
          border-right:3px solid #D63031;border-bottom:3px solid #D63031;
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
