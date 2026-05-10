import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { getGameData } from '../utils/gameStatsManager';
import AppHeader from './AppHeader';
import MascotIcon from './icons/MascotIcon';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import confetti from 'canvas-confetti';

const BADGE_CONFIG = [
  // Streak Badges
  { id: 'streak-30', type: 'streak', tier: 'Bronze', name: 'Fire Starter', target: 30, emoji: '🔥', color: '#CD7F32', darkColor: '#8B4513', description: '30 Answer Streak'},
  { id: 'streak-50', type: 'streak', tier: 'Silver', name: 'Flame Master', target: 50, emoji: '🔥', color: '#C0C0C0', darkColor: '#808080', description: '50 Day Streak' },
  { id: 'streak-100', type: 'streak', tier: 'Gold', name: 'Eternal Flame', target: 100, emoji: '🔥', color: '#FFD700', darkColor: '#DAA520', description: '100 Day Streak' },

  // Accuracy Badges
  { id: 'acc-100', type: 'accuracy', tier: 'Bronze', name: 'Quick Learner', target: 100, emoji: '🎯', color: '#CD7F32', darkColor: '#8B4513', description: '100 Correct Answers' },
  { id: 'acc-250', type: 'accuracy', tier: 'Silver', name: 'Expert Solver', target: 250, emoji: '🎯', color: '#C0C0C0', darkColor: '#808080', description: '250 Correct Answers' },
  { id: 'acc-400', type: 'accuracy', tier: 'Gold', name: 'Brilliant Mind', target: 400, emoji: '🎯', color: '#FFD700', darkColor: '#DAA520', description: '400 Correct Answers' },
  { id: 'acc-500', type: 'accuracy', tier: 'Diamond', name: 'Master Scholar', target: 600, emoji: '🎯', color: '#00FFFF', darkColor: '#00CED1', description: '600 Correct Answers' },

  // Gems Badges
  { id: 'gems-100', type: 'gems', tier: 'Bronze', name: 'Gem Collector', target: 100, emoji: '💎', color: '#CD7F32', darkColor: '#8B4513', description: '100 Gems Collected' },
  { id: 'gems-250', type: 'gems', tier: 'Silver', name: 'Rich Explorer', target: 250, emoji: '💎', color: '#C0C0C0', darkColor: '#808080', description: '250 Gems Collected' },
  { id: 'gems-400', type: 'gems', tier: 'Gold', name: 'Treasure Guardian', target: 400, emoji: '💎', color: '#FFD700', darkColor: '#DAA520', description: '400 Gems Collected' },
  { id: 'gems-500', type: 'gems', tier: 'Diamond', name: 'Infinite Wealth', target: 500, emoji: '💎', color: '#00FFFF', darkColor: '#00CED1', description: '500 Gems Collected' },
];

const ACHIEVEMENT_CONFIG = [
  { id: 'early-bird', name: { bm: 'Langkah Pertama', eng: 'First Steps' }, emoji: '🐦', description: { bm: 'Menyelesaikan sesi pertama anda', eng: 'Complete your first session' }, condition: 'earlyBird', seal: '✓' },
  { id: 'night-owl', name: { bm: 'Menguasai Topik', eng: 'Topic Master' }, emoji: '🦉', description: { bm: 'Mencapai 100% ketepatan dalam satu topik', eng: 'Achieve 100% accuracy in one topic' }, condition: 'nightOwl', seal: '✓' },
  { id: 'perfect-score', name: { bm: 'Pemecah Kelajuan', eng: 'Speed Solver' }, emoji: '💯', description: { bm: 'Jawab 10 soalan berturut-turut dalam masa < 60 saat', eng: 'Answer 10 questions consecutively in less than 60 seconds' }, condition: 'perfectScore', seal: '⭐' },
  { id: 'power-user', name: { bm: 'Ahli Strategi', eng: 'The Strategist' }, emoji: '⚡', description: { bm: 'Menggunakan item bantuan (hints) 5 kali', eng: 'Use hints (help items) 5 times' }, condition: 'powerUser', seal: '✓' },
  { id: 'explorer', name: { bm: 'Suara Komuniti', eng: 'Community Voice' }, emoji: '🗺️', description: { bm: 'Berkongsi ID Badge pertama anda di media sosial', eng: 'Share your first badge ID on social media' }, condition: 'explorer', seal: '🎖️' },
];

const getTierGradient = (tier) => {
  switch (tier) {
    case 'Bronze': return 'linear-gradient(135deg, #CD7F32, #8B4513)';
    case 'Silver': return 'linear-gradient(135deg, #C0C0C0, #808080)';
    case 'Gold': return 'linear-gradient(135deg, #FFD700, #DAA520)';
    case 'Diamond': return 'linear-gradient(135deg, #00FFFF, #00CED1)';
    default: return 'linear-gradient(135deg, #E0E0E0, #B0B0B0)';
  }
};

const AchievementCertificate = ({ achievement, playerName, gameState, language, ref }) => {
  const achievementName = typeof achievement.name === 'object' ? achievement.name.eng : achievement.name;
  const isGold = achievementName === 'Eternal Flame';
  const isDiamond = achievementName === 'Master Scholar';

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        maxWidth: '560px',
        background: '#FAFAF8',
        borderRadius: '12px',
        padding: '2.5rem 2rem',
        fontFamily: '"Segoe UI", "Trebuchet MS", sans-serif',
        position: 'relative',
        border: isGold ? '6px solid #DAA520' : isDiamond ? '6px solid #00CED1' : '4px solid #D4AF37',
        boxShadow: isGold
          ? '0 0 30px rgba(218, 165, 32, 0.4), 0 20px 60px rgba(0, 0, 0, 0.2)'
          : isDiamond
          ? '0 0 30px rgba(0, 206, 209, 0.3), 0 20px 60px rgba(0, 0, 0, 0.2)'
          : '0 20px 60px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        animation: isGold ? 'goldenGlow 3s ease-in-out infinite' : 'none',
        boxSizing: 'border-box'
      }}
    >
      {/* Ornate corners */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        fontSize: '1.5rem',
        opacity: 0.6
      }}>✦</div>
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        fontSize: '1.5rem',
        opacity: 0.6
      }}>✦</div>
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        fontSize: '1.5rem',
        opacity: 0.6
      }}>✦</div>
      <div style={{
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        fontSize: '1.5rem',
        opacity: 0.6
      }}>✦</div>

      {/* Legendary Badge for Gold */}
      {isGold && (
        <div style={{
          position: 'absolute',
          top: '-15px',
          right: '20px',
          background: 'linear-gradient(135deg, #FFD700, #DAA520)',
          color: 'white',
          padding: '0.5rem 1.2rem',
          borderRadius: '20px',
          fontSize: '0.85rem',
          fontWeight: 900,
          letterSpacing: '1px',
          boxShadow: '0 4px 12px rgba(218, 165, 32, 0.4)'
        }}>
          ⭐ LEGENDARY
        </div>
      )}

      {/* ImanCore Logo Header */}
      <div style={{
        marginBottom: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <div style={{
          width: '70px',
          height: '70px'
        }}>
          <MascotIcon size={70} />
        </div>
        <div style={{
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '1.2rem',
            fontWeight: 900,
            background: isGold ? 'linear-gradient(135deg, #FFD700, #DAA520)' : isDiamond ? 'linear-gradient(135deg, #00CED1, #0D7A8C)' : 'linear-gradient(135deg, #58CC02, #46A302)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: '0',
            letterSpacing: '0.5px'
          }}>
            ImanCore
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: isDiamond ? '#00BCD4' : isGold ? '#DAA520' : '#58CC02',
            fontWeight: 700,
            letterSpacing: '1.2px',
            textTransform: 'uppercase'
          }}>
            Learning Hub
          </div>
        </div>
      </div>

      {/* Certificate Header */}
      <div style={{
        fontSize: '0.85rem',
        color: isDiamond ? '#00BCD4' : isGold ? '#DAA520' : '#8B7355',
        fontWeight: 700,
        letterSpacing: '2.5px',
        marginBottom: '1.5rem',
        textTransform: 'uppercase'
      }}>
        ✦ {language === 'bm' ? 'Sijil Penghargaan' : 'Certificate of Achievement'} ✦
      </div>

      {/* Achievement Title */}
      <h2 style={{
        fontSize: '2.2rem',
        color: isDiamond ? '#0D7A8C' : isGold ? '#DAA520' : '#1A1A1A',
        fontWeight: 900,
        margin: '0.5rem 0 1.2rem 0',
        fontFamily: '"Segoe UI", sans-serif',
        letterSpacing: '0.5px'
      }}>
        {typeof achievement.name === 'object' ? (language === 'bm' ? achievement.name.bm : achievement.name.eng) : achievement.name}
      </h2>

      {/* Divider */}
      <div style={{
        height: '2px',
        background: `linear-gradient(90deg, transparent, ${isDiamond ? '#00CED1' : isGold ? '#DAA520' : '#D4AF37'}, transparent)`,
        margin: '1.5rem 0'
      }} />

      {/* This is to certify */}
      <div style={{ fontSize: '0.95rem', color: '#555', margin: '1.5rem 0', lineHeight: 1.7, fontWeight: 500 }}>
        <p style={{ margin: '0.2rem 0' }}>{language === 'bm' ? 'Dengan ini disahkan bahawa' : 'This is to certify that'}</p>
        <p style={{
          fontSize: '1.25rem',
          fontWeight: 900,
          color: isDiamond ? '#0D7A8C' : isGold ? '#DAA520' : '#1A1A1A',
          margin: '0.5rem 0',
          letterSpacing: '0.5px'
        }}>
          {playerName || 'Player'}
        </p>
        <p style={{ margin: '0.2rem 0' }}>{language === 'bm' ? 'telah berjaya mencapai' : 'has successfully achieved'}</p>
      </div>

      {/* Achievement Description */}
      <div style={{
        fontSize: '1rem',
        color: '#555',
        fontWeight: 600,
        margin: '1.8rem 0',
        lineHeight: 1.5,
        background: isDiamond
          ? 'linear-gradient(135deg, rgba(0, 206, 209, 0.1), rgba(0, 206, 209, 0.05))'
          : isGold
          ? 'linear-gradient(135deg, rgba(218, 165, 32, 0.1), rgba(218, 165, 32, 0.05))'
          : 'transparent',
        padding: '1.2rem',
        borderRadius: '8px',
        border: isDiamond ? '2px solid rgba(0, 206, 209, 0.2)' : isGold ? '2px solid rgba(218, 165, 32, 0.2)' : 'none'
      }}>
        {typeof achievement.description === 'object' ? (language === 'bm' ? achievement.description.bm : achievement.description.eng) : achievement.description}
      </div>

      {/* Date and Level */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1.5rem',
        margin: '1.8rem 0',
        fontSize: '0.9rem',
        color: '#555'
      }}>
        <div>
          <div style={{
            fontSize: '0.7rem',
            color: isDiamond ? '#00BCD4' : isGold ? '#DAA520' : '#999',
            marginBottom: '0.4rem',
            fontWeight: 700,
            letterSpacing: '0.8px',
            textTransform: 'uppercase'
          }}>
            {language === 'bm' ? 'Tahap' : 'Level'}
          </div>
          <div style={{
            fontSize: '1.2rem',
            fontWeight: 900,
            color: isDiamond ? '#0D7A8C' : isGold ? '#DAA520' : '#1A1A1A'
          }}>
            {gameState?.level ?? 1}
          </div>
        </div>
        <div>
          <div style={{
            fontSize: '0.7rem',
            color: isDiamond ? '#00BCD4' : isGold ? '#DAA520' : '#999',
            marginBottom: '0.4rem',
            fontWeight: 700,
            letterSpacing: '0.8px',
            textTransform: 'uppercase'
          }}>
            {language === 'bm' ? 'Tarikh Diberikan' : 'Date Awarded'}
          </div>
          <div style={{
            fontSize: '1.2rem',
            fontWeight: 900,
            color: isDiamond ? '#0D7A8C' : isGold ? '#DAA520' : '#1A1A1A'
          }}>
            {language === 'bm' ? new Date().toLocaleDateString('ms-MY') : new Date().toLocaleDateString('en-GB')}
          </div>
        </div>
      </div>

      {/* Seal */}
      <div style={{
        width: '85px',
        height: '85px',
        margin: '1.5rem auto',
        background: isDiamond
          ? 'linear-gradient(135deg, #00CED1, #00BCD4, #0097A7)'
          : isGold
          ? 'linear-gradient(135deg, #FFD700, #DAA520, #B8860B)'
          : 'linear-gradient(135deg, #FFD700, #DAA520)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2.5rem',
        boxShadow: isDiamond
          ? '0 0 20px rgba(0, 206, 209, 0.5), 0 8px 16px rgba(0, 0, 0, 0.15)'
          : '0 0 20px rgba(218, 165, 32, 0.5), 0 8px 16px rgba(0, 0, 0, 0.15)',
        border: `3px solid ${isDiamond ? '#00CED1' : '#DAA520'}`,
        animation: isDiamond ? 'diamondShimmer 3s ease-in-out infinite' : isGold ? 'goldenGlow 3s ease-in-out infinite' : 'none'
      }}>
        {achievement.seal}
      </div>

      {/* Footer */}
      <div style={{
        fontSize: '0.8rem',
        color: '#999',
        marginTop: '1.5rem',
        borderTop: `2px solid ${isDiamond ? 'rgba(0, 206, 209, 0.2)' : isGold ? 'rgba(218, 165, 32, 0.2)' : '#E0D5C8'}`,
        paddingTop: '1.2rem',
        fontWeight: 600,
        letterSpacing: '0.5px'
      }}>
        ✦ {language === 'bm' ? 'Pusat Pembelajaran ImanCore' : 'ImanCore Learning Hub'} ✦<br />
        <span style={{ fontSize: '0.75rem' }}>{language === 'bm' ? 'Sertifikat Pencapaian Rasmi' : 'Official Achievement Certificate'}</span>
      </div>
    </div>
  );
};

const AchievementCard = React.memo(({ achievement, isUnlocked, onDownload, onView, language }) => {
  const isGold = useMemo(() => typeof achievement.name === 'object' ? achievement.name.eng === 'Eternal Flame' : achievement.name === 'Eternal Flame', [achievement.name]);
  const isDiamond = useMemo(() => typeof achievement.name === 'object' ? achievement.name.eng === 'Master Scholar' : achievement.name === 'Master Scholar', [achievement.name]);

  return (
    <div
      onClick={(e) => {
        if (isUnlocked) {
          e.stopPropagation();
          onView(achievement);
        }
      }}
      style={{
        background: isUnlocked ? '#FAFAF8' : '#F5F5F5',
        borderRadius: '16px',
        padding: '1.5rem',
        border: isUnlocked
          ? isDiamond
            ? '3px solid #00CED1'
            : isGold
            ? '3px solid #DAA520'
            : '3px solid #8B7355'
          : '2px dashed #DDD',
        transition: 'all 0.3s ease',
        opacity: isUnlocked ? 1 : 0.5,
        cursor: isUnlocked ? 'pointer' : 'default',
        position: 'relative',
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        boxShadow: isUnlocked
          ? isDiamond
            ? '0 0 25px rgba(0, 206, 209, 0.3), 0 8px 16px rgba(0, 0, 0, 0.1)'
            : isGold
            ? '0 0 25px rgba(218, 165, 32, 0.4), 0 8px 16px rgba(0, 0, 0, 0.1)'
            : '0 4px 12px rgba(0, 0, 0, 0.08)'
          : '0 2px 8px rgba(0, 0, 0, 0.05)',
        animation: isUnlocked && isGold ? 'cardGoldenGlow 3s ease-in-out infinite' : 'none'
      }}
      onMouseEnter={e => {
        if (isUnlocked) {
          e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
          e.currentTarget.style.boxShadow = '0 12px 24px rgba(139, 69, 19, 0.2)';
        }
      }}
      onMouseLeave={e => {
        if (isUnlocked) {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
    >
      {/* Lock Icon for Locked Achievements */}
      {!isUnlocked && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          fontSize: '1.5rem',
          opacity: 0.6
        }}>
          🔒
        </div>
      )}

      {/* Ornate corners for unlocked */}
      {isUnlocked && (
        <>
          <div style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            fontSize: '1rem',
            opacity: 0.6,
            color: '#8B7355'
          }}>✦</div>
          <div style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            fontSize: '1rem',
            opacity: 0.6,
            color: '#8B7355'
          }}>✦</div>
        </>
      )}

      {/* Achievement Icon */}
      <div style={{
        marginBottom: '1rem',
        opacity: isUnlocked ? 1 : 0.6,
        filter: isUnlocked
          ? isDiamond
            ? 'drop-shadow(0 0 15px rgba(0, 206, 209, 0.5))'
            : isGold
            ? 'drop-shadow(0 0 15px rgba(218, 165, 32, 0.5))'
            : 'none'
          : 'grayscale(1)',
        animation: isUnlocked && isDiamond ? 'cardDiamondShimmer 3s ease-in-out infinite' : 'none',
        width: '80px',
        height: '80px',
        pointerEvents: 'none'
      }}>
        <MascotIcon size={80} />
      </div>

      {/* Achievement Name */}
      <div style={{
        fontSize: '1.3rem',
        fontWeight: 900,
        color: isUnlocked
          ? isDiamond
            ? '#0D7A8C'
            : isGold
            ? '#DAA520'
            : '#1A1A1A'
          : '#999',
        marginBottom: '0.75rem',
        fontFamily: '"Segoe UI", sans-serif',
        letterSpacing: '0.3px',
        pointerEvents: 'none'
      }}>
        {typeof achievement.name === 'object' ? (language === 'bm' ? achievement.name.bm : achievement.name.eng) : achievement.name}
      </div>

      {/* Tier Badge */}
      {isUnlocked && (isDiamond || isGold) && (
        <div style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          color: isDiamond ? '#00CED1' : '#DAA520',
          marginBottom: '0.75rem',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          pointerEvents: 'none'
        }}>
          {isDiamond ? '💎 LEGENDARY' : '⭐ ELITE'}
        </div>
      )}

      {/* Achievement Description */}
      <div style={{
        fontSize: '0.9rem',
        color: isUnlocked ? '#555' : '#BBB',
        marginBottom: '1rem',
        lineHeight: 1.5,
        fontWeight: 500,
        pointerEvents: 'none'
      }}>
        {typeof achievement.description === 'object' ? (language === 'bm' ? achievement.description.bm : achievement.description.eng) : achievement.description}
      </div>

      {/* Secret Achievement Label for Locked */}
      {!isUnlocked && (
        <div style={{
          fontSize: '0.75rem',
          color: '#999',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          🔐 {language === 'bm' ? 'Rahsia' : 'Secret'}
        </div>
      )}

      {/* Download Button for Unlocked */}
      {isUnlocked && (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDownload(achievement, 'png');
            }}
            style={{
              background: 'linear-gradient(135deg, #58CC02, #46A302)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '0.5rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => {
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={e => {
              e.target.style.transform = 'scale(1)';
            }}
          >
            📥 PNG
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDownload(achievement, 'pdf');
            }}
            style={{
              background: 'linear-gradient(135deg, #FF6B6B, #EE5A6F)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '0.5rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => {
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={e => {
              e.target.style.transform = 'scale(1)';
            }}
          >
            📥 PDF
          </button>
        </div>
      )}
    </div>
  );
});

const BadgeCard = React.memo(({ badge, progress, isUnlocked, onDownload, language }) => {
  const progressPercent = useMemo(() => Math.min((progress / badge.target) * 100, 100), [progress, badge.target]);

  return (
    <div style={{
      background: isUnlocked ? 'white' : '#F5F5F5',
      borderRadius: '16px',
      padding: '1.5rem',
      border: isUnlocked ? `2px solid ${badge.color}` : '2px solid #E0E0E0',
      transition: 'all 0.3s ease',
      opacity: isUnlocked ? 1 : 0.6,
      cursor: isUnlocked ? 'pointer' : 'default'
    }}
    onMouseEnter={e => {
      if (isUnlocked) {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = `0 12px 24px ${badge.color}40`;
      }
    }}
    onMouseLeave={e => {
      if (isUnlocked) {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }
    }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
        <div>
          <div style={{ fontSize: isUnlocked ? '3rem' : '2.5rem', marginBottom: '0.5rem', opacity: isUnlocked ? 1 : 0.5 }}>
            {badge.emoji}
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: badge.color, marginBottom: '0.25rem' }}>
            {badge.name}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#999', fontWeight: 600 }}>
            {badge.tier}
          </div>
        </div>
        {isUnlocked && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button
              onClick={() => onDownload(badge, 'png')}
              style={{
                background: getTierGradient(badge.tier),
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.4rem 0.8rem',
                fontSize: '0.7rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => {
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={e => {
                e.target.style.transform = 'scale(1)';
              }}
            >
              📥 PNG
            </button>
            <button
              onClick={() => onDownload(badge, 'pdf')}
              style={{
                background: getTierGradient(badge.tier),
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.4rem 0.8rem',
                fontSize: '0.7rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                opacity: 0.85
              }}
              onMouseEnter={e => {
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={e => {
                e.target.style.transform = 'scale(1)';
              }}
            >
              📥 PDF
            </button>
          </div>
        )}
      </div>

      <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1rem', fontWeight: 500 }}>
        {badge.description}
      </div>

      {!isUnlocked && (
        <>
          <div style={{ fontSize: '0.8rem', color: '#999', marginBottom: '0.5rem', fontWeight: 600 }}>
            {progress} / {badge.target}
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            background: '#E0E0E0',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: badge.color,
              transition: 'width 0.3s ease'
            }} />
          </div>
        </>
      )}
    </div>
  );
});

const BadgeIDCard = ({ badge, playerName, gameState, language, ref }) => {
  const tierStyle = getTierGradient(badge.tier);

  return (
    <div
      ref={ref}
      style={{
        width: '600px',
        background: 'white',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        fontFamily: 'Poppins, sans-serif'
      }}
    >
      {/* Header with Gradient */}
      <div style={{
        background: tierStyle,
        padding: '2rem',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{badge.emoji}</div>
        <h2 style={{ margin: '0.5rem 0', fontSize: '1.8rem', fontWeight: 900 }}>
          {badge.name}
        </h2>
        <div style={{ fontSize: '0.95rem', opacity: 0.9, fontWeight: 600 }}>
          {badge.tier} {language === 'bm' ? 'Lencana' : 'Badge'}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#999', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
            {language === 'bm' ? 'Penerima' : 'Awarded To'}
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#3C3C3C' }}>
            {playerName || 'Player'}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#999', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
              {language === 'bm' ? 'Tahap' : 'Level'}
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#3C3C3C' }}>
              {gameState?.level ?? 1}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#999', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
              {language === 'bm' ? 'Tarikh' : 'Date'}
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#3C3C3C' }}>
              {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>

        <div style={{
          background: '#F5F5F5',
          borderRadius: '12px',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem', fontWeight: 500 }}>
            {badge.description}
          </div>
          <div style={{ fontSize: '2rem', marginTop: '0.5rem' }}>
            ⭐
          </div>
        </div>

        <div style={{
          marginTop: '2rem',
          fontSize: '0.8rem',
          color: '#999',
          textAlign: 'center',
          fontWeight: 500,
          borderTop: '1px solid #E5E5E5',
          paddingTop: '1rem'
        }}>
          ImanCore Learning Hub
        </div>
      </div>
    </div>
  );
};

const CertificateModal = ({ achievement, playerName, gameState, language, onClose, onDownload }) => {
  const certRef = React.useRef(null);
  const [canClose, setCanClose] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setCanClose(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      onClick={() => canClose && onClose()}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '1rem'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'white',
          borderRadius: '20px',
          padding: '2rem',
          maxWidth: '700px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
        }}
      >
        <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#999'
            }}
          >
            ✕
          </button>
        </div>

        <div ref={certRef}>
          <AchievementCertificate
            achievement={achievement}
            playerName={playerName}
            gameState={gameState}
            language={language}
          />
        </div>

        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          marginTop: '2rem',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={onClose}
            style={{
              background: '#F0F0F0',
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem 1.5rem',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {language === 'bm' ? 'Tutup' : 'Close'}
          </button>
          <button
            onClick={() => onDownload(achievement, certRef, 'png')}
            style={{
              background: 'linear-gradient(135deg, #58CC02, #46A302)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem 1.5rem',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            📥 PNG
          </button>
          <button
            onClick={() => onDownload(achievement, certRef, 'pdf')}
            style={{
              background: 'linear-gradient(135deg, #FF6B6B, #EE5A6F)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem 1.5rem',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            📥 PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AchievementPage({ onBack, onHome, language, gameState }) {
  const [currentTab, setCurrentTab] = useState('badges');
  const gameData = getGameData();
  const [downloadingBadge, setDownloadingBadge] = useState(null);
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const unlockedBadges = BADGE_CONFIG.filter(badge => {
    let currentValue = 0;
    if (badge.type === 'streak') currentValue = gameData.streak || 0;
    if (badge.type === 'accuracy') currentValue = gameData.gems || 0; // Using gems as proxy for correct answers
    if (badge.type === 'gems') currentValue = gameData.gems || 0;
    return currentValue >= badge.target;
  });

  const handleDownloadBadge = useCallback(async (badge, format = 'png') => {
    try {
      setDownloadingBadge(badge.id);
      const element = document.getElementById(`badge-id-${badge.id}`);

      if (!element) {
        console.error(`Element not found: badge-id-${badge.id}`);
        alert('Error: Badge element not found. Please try again.');
        setDownloadingBadge(null);
        return;
      }

      const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#fff', logging: false });

      if (format === 'pdf') {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save(`${badge.name}-Badge.pdf`);
      } else {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `${badge.name}-Badge.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      console.log('Badge download completed successfully');
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed: ' + error.message);
    } finally {
      setDownloadingBadge(null);
    }
  }, [language]);

  const handleDownloadAchievement = useCallback(async (achievement, certRefOrFormat, format) => {
    try {
      // Handle both calling patterns:
      // 1. From CertificateModal: (achievement, certRef, format)
      // 2. From AchievementCard: (achievement, format)
      let element;
      let downloadFormat = format || 'png';

      if (typeof certRefOrFormat === 'string') {
        // Called from AchievementCard with format string
        downloadFormat = certRefOrFormat;
        element = document.getElementById(`achievement-cert-${achievement.id}`);
      } else {
        // Called from CertificateModal with ref object
        element = certRefOrFormat?.current;
        if (!element) {
          element = document.getElementById(`achievement-cert-${achievement.id}`);
        }
      }

      if (!element) {
        console.error(`Element not found for achievement: ${achievement.id}`);
        alert('Error: Certificate element not found. Please try again.');
        return;
      }

      console.log('Starting download for:', achievement.id, 'format:', downloadFormat);
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#FBF7F3',
        logging: false,
        allowTaint: true,
        useCORS: true
      });

      const achievementName = typeof achievement.name === 'object' ? (language === 'bm' ? achievement.name.bm : achievement.name.eng) : achievement.name;

      if (downloadFormat === 'pdf') {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save(`${achievementName}-Certificate.pdf`);
      } else {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `${achievementName}-Certificate.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
      console.log('Download completed successfully');
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed: ' + error.message);
    }
  }, [language]);

  const getUnlockedAchievements = useCallback(() => {
    return ACHIEVEMENT_CONFIG.filter(ach => {
      if (ach.id === 'early-bird' || ach.id === 'night-owl') return Math.random() > 0.5;
      if (ach.id === 'perfect-score') return gameData.streak > 5;
      if (ach.id === 'power-user') return gameData.streak >= 7;
      if (ach.id === 'explorer') return true;
      return false;
    });
  }, [gameData.streak]);

  const unlockedAchievements = useMemo(() => getUnlockedAchievements(), [getUnlockedAchievements]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', background: '#fff' }}>
      <AppHeader onBack={onBack} gameState={gameState} language={language} />

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        padding: '1.5rem 1.25rem',
        borderBottom: '2px solid #E5E5E5',
        background: '#fff'
      }}>
        <button
          onClick={() => setCurrentTab('badges')}
          style={{
            background: currentTab === 'badges' ? '#58CC02' : 'transparent',
            color: currentTab === 'badges' ? 'white' : '#999',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={e => {
            if (currentTab !== 'badges') e.target.style.background = '#F0F0F0';
          }}
          onMouseLeave={e => {
            if (currentTab !== 'badges') e.target.style.background = 'transparent';
          }}
        >
          {language === 'bm' ? '🎯 Lencana' : '🎯 Badges'}
        </button>
        <button
          onClick={() => setCurrentTab('achievements')}
          style={{
            background: currentTab === 'achievements' ? '#58CC02' : 'transparent',
            color: currentTab === 'achievements' ? 'white' : '#999',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={e => {
            if (currentTab !== 'achievements') e.target.style.background = '#F0F0F0';
          }}
          onMouseLeave={e => {
            if (currentTab !== 'achievements') e.target.style.background = 'transparent';
          }}
        >
          {language === 'bm' ? '🧾 Pencapaian' : '🧾 Achievement'}
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {currentTab === 'achievements' ? (
            ACHIEVEMENT_CONFIG.map(achievement => {
              const isUnlocked = unlockedAchievements.some(a => a.id === achievement.id);
              return (
                <div key={achievement.id}>
                  <AchievementCard
                    achievement={achievement}
                    isUnlocked={isUnlocked}
                    onDownload={handleDownloadAchievement}
                    onView={setSelectedAchievement}
                    language={language}
                  />
                </div>
              );
            })
          ) : (
            BADGE_CONFIG.map(badge => {
              let progress = 0;
              if (badge.type === 'streak') progress = gameData.streak || 0;
              if (badge.type === 'accuracy') progress = gameData.gems || 0;
              if (badge.type === 'gems') progress = gameData.gems || 0;
              const isUnlocked = progress >= badge.target;

              return (
                <div key={badge.id}>
                  <BadgeCard
                    badge={badge}
                    progress={progress}
                    isUnlocked={isUnlocked}
                    onDownload={handleDownloadBadge}
                    language={language}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Hidden ID Cards for Download */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', width: '100%', visibility: 'hidden', pointerEvents: 'none' }}>
        {BADGE_CONFIG.map(badge => {
          const idCardRef = React.createRef();
          return (
            <div key={badge.id} id={`badge-id-${badge.id}`}>
              <BadgeIDCard
                ref={idCardRef}
                badge={badge}
                playerName={localStorage.getItem('playerName') || 'Player'}
                gameState={gameState}
                language={language}
              />
            </div>
          );
        })}
        {ACHIEVEMENT_CONFIG.map(achievement => {
          const certRef = React.createRef();
          return (
            <div key={achievement.id} id={`achievement-cert-${achievement.id}`}>
              <AchievementCertificate
                ref={certRef}
                achievement={achievement}
                playerName={localStorage.getItem('playerName') || 'Player'}
                gameState={gameState}
                language={language}
              />
            </div>
          );
        })}
      </div>

      {/* Certificate Modal */}
      {selectedAchievement && (
        <CertificateModal
          achievement={selectedAchievement}
          playerName={localStorage.getItem('playerName') || 'Player'}
          gameState={gameState}
          language={language}
          onClose={() => setSelectedAchievement(null)}
          onDownload={handleDownloadAchievement}
        />
      )}

      {/* Animations */}
      <style>{`
        @keyframes goldenGlow {
          0%, 100% {
            box-shadow: 0 0 30px rgba(218, 165, 32, 0.4), 0 20px 60px rgba(0, 0, 0, 0.2);
          }
          50% {
            box-shadow: 0 0 50px rgba(218, 165, 32, 0.6), 0 20px 60px rgba(0, 0, 0, 0.2);
          }
        }

        @keyframes goldPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes diamondShimmer {
          0%, 100% {
            filter: drop-shadow(0 0 20px rgba(0, 206, 209, 0.6));
            opacity: 1;
          }
          50% {
            filter: drop-shadow(0 0 30px rgba(0, 206, 209, 0.8));
            opacity: 0.95;
          }
        }

        @keyframes cardGoldenGlow {
          0%, 100% {
            box-shadow: 0 0 25px rgba(218, 165, 32, 0.4), 0 8px 16px rgba(0, 0, 0, 0.1);
          }
          50% {
            box-shadow: 0 0 40px rgba(218, 165, 32, 0.6), 0 8px 16px rgba(0, 0, 0, 0.1);
          }
        }

        @keyframes cardDiamondShimmer {
          0%, 100% {
            filter: drop-shadow(0 0 15px rgba(0, 206, 209, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 25px rgba(0, 206, 209, 0.7));
          }
        }
      `}</style>
    </div>
  );
}
