import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { getModulesForYear } from './ModuleData';
import { TrophyIcon } from './BMJourneySvgs';
import { isTopicCompleted } from './useModuleProgress';
import useGamification from '../../../hooks/useGamification';
import BMUnifiedRobotM2 from './BMUnifiedRobotM2';
import BMGalaxyRobot from './BMGalaxyRobot';
import BMVoyagerRobotM3 from './BMVoyagerRobotM3';

function stripPrefix(id) {
  return id ? id.replace(/^\d-/, '') : '';
}

// Small padlock badge for topics still locked behind earlier ones.
function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="10" width="16" height="11" rx="2.5" fill="#fff" />
      <path d="M8 10V7.5a4 4 0 0 1 8 0V10" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="12" cy="15" r="1.7" fill="#64748B" />
      <rect x="11.2" y="15.5" width="1.6" height="3.4" rx=".8" fill="#64748B" />
    </svg>
  );
}

// Serpentine path: centre → right → centre → left, so every consecutive
// pair of nodes is the same horizontal distance apart.
const SERPENTINE = [0, 1, 0, -1];

export default function BMModuleHubLayout({ year, activeModule, onSelectTopic, onBack, language, topics, hideTopicPill = false, mulaBelowLabel = false }) {
  const modules = useMemo(() => getModulesForYear(year), [year]);
  const { loading, getTopicLevel } = useGamification('bm');

  const activeIdx = useMemo(() => {
    const stripped = stripPrefix(activeModule);
    return modules.findIndex(m => m.id === stripped);
  }, [modules, activeModule]);

  const displayTopics = topics?.length ? topics : (modules[activeIdx]?.topics || []);

  const trailRef = useRef(null);
  const nodeRefs = useRef([]);
  const [pathPoints, setPathPoints] = useState([]);
  const [trailSize, setTrailSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const measure = () => {
      const trail = trailRef.current;
      if (!trail) return;
      const trailRect = trail.getBoundingClientRect();
      const count = displayTopics.length + 1;
      const points = nodeRefs.current.slice(0, count).filter(Boolean).map((node) => {
        const rect = node.getBoundingClientRect();
        return {
          x: rect.left - trailRect.left + rect.width / 2,
          y: rect.top - trailRect.top + rect.height / 2,
        };
      });
      setTrailSize({ width: trailRect.width, height: trailRect.height });
      setPathPoints(points);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [displayTopics, loading]);

  const firstIncomplete = loading ? -1 : displayTopics.findIndex((topic) => (getTopicLevel(topic.id) || 0) < 1);
  const currentIndex = firstIncomplete;

  const handleTopicClick = useCallback((topicId) => {
    if (onSelectTopic) onSelectTopic(topicId);
  }, [onSelectTopic]);

  const renderTopic = (topic, index, prevDone) => {
    const isFirst = index === 0;
    const IconComp = topic.icon;
    const useStandaloneRobot = year === 1 || year === 2 || year === 3;
    const level = loading ? 0 : getTopicLevel(topic.id);
    const hasCrown = level >= 1;
    const lockEnabled = false;
    const locked = lockEnabled && !loading && !isFirst && !prevDone;
    const blocked = topic.disabled || locked;
    const isCurrent = loading ? isFirst : index === currentIndex;
    const showCheck = hasCrown && !blocked && !isCurrent;

    return (
      <div key={topic.id} className="step" style={{ '--dir': SERPENTINE[index % 4] }}>
        <button
          type="button"
          ref={(el) => { nodeRefs.current[index] = el; }}
          className={[
            'step-button',
            useStandaloneRobot ? 'node-unified-wrap' : '',
            isCurrent ? 'node-current' : '',
            blocked ? 'node-disabled' : '',
            locked ? 'node-locked' : '',
            showCheck ? 'node-done' : '',
          ].filter(Boolean).join(' ')}
          aria-label={locked
            ? `${hideTopicPill ? topic.label : `TOPIK ${topic.num}`} — terkunci`
            : (hideTopicPill ? topic.label : `TOPIK ${topic.num}`)}
          onClick={() => !blocked && handleTopicClick(topic.id)}
          disabled={blocked}
        >
          <span className={`node-btn${useStandaloneRobot ? ' node-unified' : ''}`}>
            <span className="node-ico">
              {useStandaloneRobot
                ? (year === 1
                    ? <BMGalaxyRobot />
                    : year === 2
                      ? <BMUnifiedRobotM2 />
                      : <BMVoyagerRobotM3 />)
                : (IconComp ? <IconComp /> : null)}
            </span>
            {locked && <span className="node-lock"><LockIcon /></span>}
            {showCheck && <span className="node-check" aria-hidden="true">✓</span>}
          </span>
          <span className="node-meta">
            {!hideTopicPill && <span className="node-topic">TOPIK {topic.num}</span>}
            {mulaBelowLabel && <span className="node-label">{topic.label}</span>}
            {isCurrent && <span className="start-bubble">MULA</span>}
            {!mulaBelowLabel && <span className="node-label">{topic.label}</span>}
          </span>
        </button>
      </div>
    );
  };

  const renderModule = (mod, isActive) => {
    const BadgeComp = mod.badge;
    const totalTopics = displayTopics.length;
    const doneCount = displayTopics.filter(t => isTopicCompleted(t.id)).length;

    return (
      <section
        key={mod.num}
        className={`module mod-${mod.num}`}
        data-module={mod.num}
        hidden={!isActive}
      >
        <div className="journey-inner">
          <div className="unit-banner">
            {onBack && <button type="button" className="unit-back" onClick={onBack} aria-label={language === 'bm' ? 'Kembali' : 'Back'}><ArrowLeft aria-hidden="true" /></button>}
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

          <div className="trail" ref={trailRef}>
            {pathPoints.length === displayTopics.length + 1 && trailSize.width > 0 && (
              <svg
                className="trail-path"
                width={trailSize.width}
                height={trailSize.height}
                viewBox={`0 0 ${trailSize.width} ${trailSize.height}`}
                aria-hidden="true"
              >
                {pathPoints.slice(0, -1).map((point, i) => {
                  const next = pathPoints[i + 1];
                  const srcTopic = displayTopics[i];
                  const srcDone = !loading && i !== currentIndex && (getTopicLevel(srcTopic.id) || 0) >= 1;
                  const nextTopic = displayTopics[i + 1];
                  const nextDone = nextTopic
                    ? !loading && i + 1 !== currentIndex && (getTopicLevel(nextTopic.id) || 0) >= 1
                    : doneCount === totalTopics && currentIndex === -1;
                  const segmentClass = srcDone && nextDone
                    ? ' done-path'
                    : srcDone
                      ? ' active-path'
                      : '';
                  const d = `M ${point.x} ${point.y} C ${point.x} ${(point.y + next.y) / 2}, ${next.x} ${(point.y + next.y) / 2}, ${next.x} ${next.y}`;
                  return (
                    <g key={displayTopics[i].id}>
                      <path className="trail-path-under" d={d} />
                      <path className={`trail-path-seg${segmentClass}`} d={d} />
                    </g>
                  );
                })}
              </svg>
            )}
            {displayTopics.map((topic, i) =>
              renderTopic(topic, i, i === 0 ? true : !loading && getTopicLevel(displayTopics[i - 1].id) >= 1)
            )}

            <div className="step is-goal">
              <div className={`trophy-wrap${doneCount === totalTopics && totalTopics > 0 ? ' trophy-all-done' : ''}`}>
                <button
                  type="button"
                  ref={(el) => { nodeRefs.current[displayTopics.length] = el; }}
                  className="node-btn node-goal"
                  aria-label={language === 'bm' ? 'Tamat Modul' : 'End Module'}
                >
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
      {/* Render ONLY the active module (not all 5 hidden) — fewer robot SVGs in
         the DOM, lower memory, faster paint. Switching tabs remounts the new
         module (distinct key), which is cheap at this node count. */}
      {modules[activeIdx] && renderModule(modules[activeIdx], true)}

      <style>{`
        .module[hidden]{display:none}
        .module{min-height:100vh;padding:34px 16px 120px}
        .mod-1{--c:#FF8F3D;--cd:#FF6F00;}
        .mod-2{--c:#36A9F0;--cd:#1A78C7;}
        .mod-3{--c:#A368F0;--cd:#7038D6;}
        .mod-4{--c:#FF6FA8;--cd:#DB3E7F;}
        .mod-5{--c:#1EC9B7;--cd:#0E9488;}
        /* Single flat page background — matches .bm-module-page so the nav bar
           and the hub content read as one uniform color (no gradient seam).
           Per-module color identity lives in the banner / nodes / tabs accents. */
        .bm-hub-layout .module{background:#F7F8FA}

        .journey-inner{max-width:460px;margin:0 auto}

         .unit-banner{display:flex;align-items:center;gap:14px;color:#fff;max-width:360px;
            background:linear-gradient(135deg,#FFC46B 0%,var(--c) 100%);

           border:5px solid var(--cd);
            border-radius:28px;padding:18px 22px;margin:6px auto 14px;

           box-shadow:0 15px 25px rgba(0,0,0,.1)}
        .unit-text{flex:1;min-width:0}
        .unit-kicker{font-family:'Fredoka',sans-serif;font-weight:700;font-size:11px;letter-spacing:.14em;
          text-transform:uppercase;color:#fff;text-shadow:2px 3px 0 var(--cd);margin-bottom:4px}
        .unit-name{font-family:'Fredoka',sans-serif;font-weight:700;font-size:21px;line-height:1.1;letter-spacing:-.01em;
          text-shadow:2px 3px 0 var(--cd)}
        .unit-badge{width:46px;height:46px;flex:0 0 auto;border-radius:14px;background:rgba(255,255,255,.18);
          display:flex;align-items:center;justify-content:center}
        .unit-badge svg{width:26px;height:26px}
        .unit-back{width:38px;height:38px;flex:0 0 auto;border-radius:12px;
          border:2px solid rgba(255,255,255,.5);background:rgba(255,255,255,.18);color:#fff;
          display:flex;align-items:center;justify-content:center;cursor:pointer;
          box-shadow:0 3px 0 rgba(0,0,0,.08)}
        .unit-back svg{width:20px;height:20px;display:block}
        @media (hover:hover){ .unit-back:hover{background:rgba(255,255,255,.3)} }

         .trail{--amp:clamp(48px,24vw,118px);display:flex;flex-direction:column;align-items:center;position:relative}
         .step{display:flex;flex-direction:column;align-items:center;padding:9px 0;position:relative;z-index:1;
           transform:translateX(calc(var(--dir,0) * var(--amp)));
           transition:transform .3s cubic-bezier(.34,1.56,.64,1)}
         .trail-path{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none;z-index:0}
         .trail-path-under{fill:none;stroke:#fff;stroke-width:14;stroke-linecap:round;opacity:.95}
           .trail-path-seg{fill:none;stroke:#94A3B8;stroke-width:8;stroke-linecap:round;stroke-dasharray:12 12;opacity:.9}

           .trail-path-seg.done-path{stroke:#A7F3D0;stroke-width:10;stroke-dasharray:none;opacity:1}
           .trail-path-seg.active-path{stroke:var(--c);stroke-width:12;stroke-dasharray:none;opacity:1;filter:drop-shadow(0 2px 0 var(--cd))}


         .step-button{display:flex;flex-direction:column;align-items:center;border:0;padding:0;background:transparent;
           cursor:pointer;-webkit-tap-highlight-color:transparent;
           transition:transform .18s cubic-bezier(.34,1.56,.64,1),filter .18s ease}
         .step-button[disabled]{cursor:default}
         @media (hover:hover){
           .step-button:not([disabled]):hover{transform:scale(1.02);filter:drop-shadow(0 9px 12px rgba(15,23,42,.16))}
         }
         .step-button:not([disabled]):active{transform:scale(.99)}


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
          .step-button.node-disabled .node-btn:hover{transform:none;box-shadow:0 8px 0 rgba(0,0,0,.14),0 15px 20px -8px rgba(0,0,0,.22)}
          .node-goal:hover{transform:translateY(-4px) scale(1.04);
            box-shadow:0 20px 25px -6px rgba(120,80,4,.4)}
        }
        .node-btn:active{transform:translateY(8px) scale(.97);box-shadow:0 0 0 rgba(0,0,0,.16),0 4px 10px -6px rgba(0,0,0,.25)}
        /* unified robot stands alone — no card box/ledge (the SVG carries its own
           drop shadow), so strip the base node-btn background + box-shadow */
        .node-btn.node-unified,
        .node-btn.node-unified:active{background:transparent;border-radius:0;box-shadow:none}
        @media (hover:hover){
          .node-btn.node-unified:hover{box-shadow:none}
        }
          .step-button.node-disabled .node-btn{cursor:default;filter:grayscale(1);
            box-shadow:0 8px 0 rgba(0,0,0,.14),0 15px 20px -8px rgba(0,0,0,.22)}
          .step-button.node-locked .node-btn{filter:none}
          .step-button.node-locked .node-ico{filter:grayscale(1) opacity(.55)}
          .step-button.node-current .node-ico{animation:mulaRobotPulse 1.8s ease-in-out infinite;transform-origin:center}
          .step-button.node-current .node-label{border-color:#FF8F3D;box-shadow:0 4px 0 #FF8F3D}
          .step-button.node-unified.node-disabled .node-btn,
          .step-button.node-unified.node-disabled .node-btn:active{box-shadow:none}
          @media (hover:hover){
            .step-button.node-unified.node-disabled .node-btn:hover{box-shadow:none;transform:none}
          }
          .node-lock,.node-check{position:absolute;right:-2px;bottom:-2px;border-radius:50%;
            border:3px solid #fff;display:flex;align-items:center;justify-content:center;
            box-shadow:0 3px 6px rgba(0,0,0,.28);z-index:3}
          .node-lock{width:34px;height:34px;background:#64748B}
          .node-lock svg{width:20px;height:20px;display:block}
          .node-check{width:30px;height:30px;background:#16A34A;color:#fff;font-family:'Fredoka',sans-serif;font-weight:700;font-size:17px;line-height:1}
          .step-button.node-locked .node-topic{background:#94A3B8}
          .step-button.node-locked .node-label{color:#94A3B8;border-color:#CBD5E1;box-shadow:0 4px 0 #CBD5E1}

        .node-ico{width:100%;height:100%;display:flex;align-items:center;justify-content:center}
        .node-ico svg{width:100%;height:100%;display:block}

        /* The "End Module" trophy is a flat node (not an illustration), so it keeps
           a solid gold fill + matching ledge + a glossy spot. */
        .node-goal{background:radial-gradient(circle at 42% 32%,#FFFBEB 0%,#FBBF24 75%,#D97706 100%);
          border:5px solid #B45309;box-shadow:0 15px 20px -4px rgba(120,80,4,.4)}
        .node-goal::before{content:"";position:absolute;top:9px;left:14px;width:28px;height:14px;
          border-radius:50%;transform:rotate(-15deg);background:rgba(255,255,255,.42);pointer-events:none;z-index:2}
        .node-goal:active{transform:translateY(2px);box-shadow:0 4px 12px -8px rgba(120,80,4,.25)}
         .node-goal .node-ico svg{width:62px;height:62px}
         .trophy-wrap{position:relative;display:flex;flex-direction:column;align-items:center}

        .trophy-count{font-family:'Fredoka',sans-serif;font-weight:700;font-size:13px;
          color:#A9740A;margin-top:-4px;background:rgba(255,255,255,.7);
          padding:2px 12px;border-radius:99px;border:1px solid #E0A01244;position:relative;z-index:1}
        .trophy-all-done .trophy-count{background:#16A34A;color:#fff;border-color:#16A34A44}

        /* stack each child on its own line (badge / label / crown) — flex column
           so a short label like "Pesanan" never floats inline beside the badge */
        .node-meta{margin-top:12px;text-align:center;max-width:180px;
          display:flex;flex-direction:column;align-items:center}
        /* "TOPIK n" → solid module-color badge with white text (echoes the robot head) */
        .node-topic{display:inline-block;font-family:'Fredoka',sans-serif;font-weight:700;font-size:10px;letter-spacing:.1em;
          text-transform:uppercase;color:#fff;background:var(--cd);
          padding:3px 11px;border-radius:99px;margin-bottom:6px}
        /* topic label → white pill framed in the module deep color + matching 3D ledge */
        .node-label{display:inline-block;font-family:'Fredoka',sans-serif;font-weight:700;font-size:14px;line-height:1.2;
          color:#5C3D2E;background:#fff;padding:5px 16px;border-radius:20px;
          border:3px solid var(--cd);box-shadow:0 4px 0 var(--cd);text-wrap:balance}
         .node-label-goal{color:#A9740A;border-color:#A9740A;box-shadow:0 4px 0 #A9740A}

          .node-unified-wrap .node-meta{margin-top:-2px}

           .start-bubble{display:inline-block;margin:0 0 6px;
             font-family:'Fredoka',sans-serif;font-weight:700;font-size:10px;letter-spacing:.1em;
              padding:3px 11px;border-radius:99px;border:2px solid #FF6F00;background:#FF8F3D;color:#7C2D12;

             box-shadow:0 3px 0 #B45309;animation:mulaBadgePulse 1.8s ease-in-out infinite}

          @keyframes mulaBadgePulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
          @keyframes mulaRobotPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}


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
           .floatA,.pulse,.bob,.wave,.beat,.start-bubble,.step-button.node-current .node-ico{animation:none}

        }
        @media (max-width:380px){
          .node-btn{width:86px;height:86px}
        }
      `}</style>
    </div>
  );
}
