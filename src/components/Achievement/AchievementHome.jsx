import React, { useState, useCallback, useMemo } from 'react';
import { HomePageLayoutStyles } from '../HomePage';
import { PageHeader } from '../_shared/PageHeaderHero';
import { loadPlayerName } from '../../services/storageService';
import AchievementArt from './AchievementArt';
import { AchievementCard, BadgeCard, CompletedAchievementCard } from './AchievementCards';
import './AchievementHome.css';
import { getGameData } from '../../utils/gameStatsManager';
import useGamification from '../../hooks/useGamification';
import { baseAssessments } from '../../data/curriculum/assessment';
import MascotIcon from '../icons/MascotIcon';
// html2canvas + jsPDF are heavy (~350 kB combined) and only needed when a
// certificate/badge is actually downloaded. They're dynamically imported inside
// the download handlers below, so the Achievement page itself stays lightweight.

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

// Using baseAssessments from assessment.js instead of ACHIEVEMENT_CONFIG

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
  const isGold = achievement.difficulty === 'Intermediate';
  const isDiamond = achievement.difficulty === 'Advanced';

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        background: '#FAFAF8',
        borderRadius: '12px',
        padding: '2.5rem 2rem',
        fontFamily: '"Segoe UI", "Trebuchet MS", sans-serif',
        position: 'relative',
        border: isGold ? '4px solid #DAA520' : isDiamond ? '4px solid #00CED1' : '4px solid #D4AF37',
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

      {/* Legendary / Elite Badge */}
      {(isGold || isDiamond) && (
        <div style={{
          position: 'absolute',
          top: '-15px',
          right: '20px',
          background: isDiamond ? 'linear-gradient(135deg, #00FFFF, #00CED1)' : 'linear-gradient(135deg, #FFD700, #DAA520)',
          color: isDiamond ? '#0D7A8C' : 'white',
          padding: '0.5rem 1.2rem',
          borderRadius: '20px',
          fontSize: '0.85rem',
          fontWeight: 900,
          letterSpacing: '1px',
          boxShadow: isDiamond ? '0 4px 12px rgba(0, 206, 209, 0.4)' : '0 4px 12px rgba(218, 165, 32, 0.4)'
        }}>
          {isDiamond ? '💎 LEGENDARY' : '⭐ ELITE'}
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
            color: '#2D4059',
            fontFamily: "var(--font-heading)",
            margin: '0',
            letterSpacing: '1px',
            lineHeight: 1.1
          }}>
            ImanCore
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: '#F4C430',
            fontFamily: "var(--font-heading)",
            letterSpacing: '2px',
            textTransform: 'uppercase',
            margin: '0'
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

const BadgeIDCard = ({ badge, playerName, gameState, language, ref }) => {
  const tierStyle = getTierGradient(badge.tier);

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
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

const CertificateModal = ({ achievement, playerName, gameState, language, onClose, onDownload, isDownloading }) => {
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
            disabled={isDownloading}
            style={{
              background: 'linear-gradient(135deg, #58CC02, #46A302)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem 1.5rem',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: isDownloading ? 'not-allowed' : 'pointer',
              opacity: isDownloading ? 0.7 : 1
            }}
          >
            📥 PNG
          </button>
          <button
            onClick={() => onDownload(achievement, certRef, 'pdf')}
            disabled={isDownloading}
            style={{
              background: 'linear-gradient(135deg, #FF6B6B, #EE5A6F)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem 1.5rem',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: isDownloading ? 'not-allowed' : 'pointer',
              opacity: isDownloading ? 0.7 : 1
            }}
          >
            📥 PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AchievementHome({ language = 'bm', gameState, onTakeAssessment, ...accountProps }) {
  const [currentTab, setCurrentTab] = useState('assessments');
  const legacyData = useMemo(() => getGameData(), []);
  const rewards = useGamification('mt');
  const gameData = {
    gems: Math.max(legacyData.gems || 0, rewards.gems),
    streak: Math.max(legacyData.streak || 0, rewards.streak),
  };
  const [downloadingBadge, setDownloadingBadge] = useState(null);
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const handleDownloadBadge = useCallback((badge, format = 'png') => {
    setDownloadingBadge(badge.id);
    
    // Defer the heavy html2canvas task so the browser can render the loading spinner
    setTimeout(async () => {
      try {
        const element = document.getElementById(`badge-id-${badge.id}`);

      if (!element) {
        console.error(`Element not found: badge-id-${badge.id}`);
        alert('Error: Badge element not found. Please try again.');
        setDownloadingBadge(null);
        return;
      }

      const { default: html2canvas } = await import('html2canvas');
      const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#fff', logging: false });

      if (format === 'pdf') {
        const { jsPDF } = await import('jspdf');
        const imgData = canvas.toDataURL('image/png');
        const pdfWidth = 210;
        const pdfHeight = pdfWidth * (canvas.height / canvas.width);
        const pdf = new jsPDF({
          orientation: pdfHeight > pdfWidth ? 'portrait' : 'landscape',
          unit: 'mm',
          format: [pdfWidth, pdfHeight]
        });
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${badge.name}-Badge.pdf`);
      } else {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `${badge.name}-Badge.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

        console.log('Badge download completed successfully');
      } catch (error) {
        console.error('Download failed:', error);
        alert('Download failed: ' + error.message);
      } finally {
        setDownloadingBadge(null);
      }
    }, 50);
  }, []);

  const handleDownloadAchievement = useCallback((achievement, certRefOrFormat, format) => {
    setDownloadingBadge(achievement.id);
    
    setTimeout(async () => {
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
      const { default: html2canvas } = await import('html2canvas');
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#FBF7F3',
        logging: false,
        allowTaint: true,
        useCORS: true
      });

      const achievementName = typeof achievement.name === 'object' ? (language === 'bm' ? achievement.name.bm : achievement.name.eng) : achievement.name;

      if (downloadFormat === 'pdf') {
        const { jsPDF } = await import('jspdf');
        const imgData = canvas.toDataURL('image/png');
        const pdfWidth = 210;
        const pdfHeight = pdfWidth * (canvas.height / canvas.width);
        const pdf = new jsPDF({
          orientation: pdfHeight > pdfWidth ? 'portrait' : 'landscape',
          unit: 'mm',
          format: [pdfWidth, pdfHeight]
        });
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${achievementName}-Certificate.pdf`);
      } else {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `${achievementName}-Certificate.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

        console.log('Download completed successfully');
      } catch (error) {
        console.error('Download failed:', error);
        alert('Download failed: ' + error.message);
      } finally {
        setDownloadingBadge(null);
      }
    }, 50);
  }, [language]);

  const playerName = accountProps.playerName || loadPlayerName() || 'Player';
  const bm = language === 'bm';
  const pending = baseAssessments.filter(a => a.status === 'Pending');
  const completed = baseAssessments.filter(a => a.status === 'Completed');
  const planned = [
    ['Brilliant Mind', 'Gold', 'easy', 'scholar'], ['Master Scholar', 'Diamond', 'medium', 'scholar'],
    ['Gem Collector', 'Bronze', 'easy', 'gems'], ['Rich Explorer', 'Silver', 'medium', 'gems'], ['Treasure Guardian', 'Gold', 'medium', 'gems'],
  ].map(([name, description, level, art], i) => ({ id: 'planned-' + i, name, description, level, art, comingSoon: true }));
  const tabs = [['assessments', '📋', bm ? 'Penilaian' : 'Assessments'], ['badges', '🎯', bm ? 'Lencana' : 'Badges'], ['achievements', '🧾', bm ? 'Pencapaian' : 'Achievements']];
  const assessmentTab = currentTab === 'assessments';
  const title = assessmentTab ? (bm ? 'Penilaian' : 'Assessments') : currentTab === 'badges' ? (bm ? 'Lencana' : 'Badges') : (bm ? 'Pencapaian Saya' : 'My Achievements');
  const description = assessmentTab ? (bm ? 'Uji pengetahuan anda dan capai tahap lebih tinggi!' : 'Test your knowledge and reach a higher level!') : currentTab === 'achievements' ? (bm ? 'Kumpul laporan pencapaian anda dan lihat perkembangan pembelajaran!' : 'Collect your achievement reports and see your learning progress!') : (bm ? 'Kumpul lencana, capai matlamat dan jadilah lebih hebat!' : 'Collect badges, reach your goals and keep growing!');
  const onTabKeyDown = event => {
    const index = tabs.findIndex(tab => tab[0] === currentTab);
    const next = event.key === 'ArrowRight' ? (index + 1) % 3 : event.key === 'ArrowLeft' ? (index + 2) % 3 : event.key === 'Home' ? 0 : event.key === 'End' ? 2 : null;
    if (next === null) return;
    event.preventDefault(); setCurrentTab(tabs[next][0]);
    event.currentTarget.parentElement.children[next].focus();
  };
  return (
    <main className="ac-root iman-layout">
      <HomePageLayoutStyles />
      <div className="ac-wrap">
        <PageHeader {...accountProps} language={language} gameState={gameState} />
        <section className={'ac-hero ac-hero-' + currentTab} aria-labelledby="ac-title">
          <AchievementArt name={assessmentTab ? 'clipboard' : currentTab === 'achievements' ? 'trophy' : 'medal'} className="ac-hero-icon ac-mobile-art" />
          <AchievementArt name={assessmentTab ? 'clipboard' : 'trophy'} className="ac-hero-icon ac-desktop-art" />
          <div className="ac-hero-copy"><h1 id="ac-title"><span className="ac-mobile-title">{title}</span><span className="ac-desktop-title">{assessmentTab ? title : (bm ? 'Pencapaian Saya' : 'My Achievements')}</span></h1><p>{description}</p></div>
          <AchievementArt name={assessmentTab ? 'assessmentRobot' : currentTab === 'achievements' ? 'trophyRobot' : 'badgeRobot'} className="ac-hero-robot ac-mobile-art" />
          <AchievementArt name={assessmentTab ? 'assessmentRobot' : 'trophyRobot'} className="ac-hero-robot ac-desktop-art" />
        </section>
        <div className="ac-tabs" role="tablist" aria-label={bm ? 'Pencapaian Saya' : 'My Achievements'}>
          {tabs.map(([id, icon, label]) => <button key={id} type="button" role="tab" id={'ac-tab-' + id} aria-controls="ac-panel" aria-selected={currentTab === id} tabIndex={currentTab === id ? 0 : -1} onKeyDown={onTabKeyDown} onClick={() => setCurrentTab(id)}><span aria-hidden="true">{icon}</span>{label}</button>)}
        </div>
        <section id="ac-panel" role="tabpanel" aria-labelledby={'ac-tab-' + currentTab} tabIndex={0}>
          {currentTab === 'badges' ? <div className="ac-grid ac-badge-grid">{BADGE_CONFIG.map((badge, index) => <BadgeCard key={badge.id} badge={badge} index={index} progress={(badge.type === 'streak' ? gameData.streak : gameData.gems) || 0} onDownload={handleDownloadBadge} language={language} isDownloading={downloadingBadge === badge.id} />)}</div>
            : assessmentTab ? <div className="ac-grid ac-assessment-grid">{[...pending, ...planned].map((achievement, index) => <AchievementCard key={achievement.id} achievement={achievement} index={index} isUnlocked={false} onDownload={handleDownloadAchievement} onView={setSelectedAchievement} language={language} isDownloading={downloadingBadge === achievement.id} onTakeAssessment={onTakeAssessment} />)}</div>
            : <div className="ac-completed-grid">{completed.map(achievement => <CompletedAchievementCard key={achievement.id} achievement={achievement} onDownload={handleDownloadAchievement} onView={setSelectedAchievement} language={language} isDownloading={downloadingBadge === achievement.id} />)}</div>}
        </section>
      </div>
      {downloadingBadge && <div className="ac-loading" role="status" aria-live="polite"><MascotIcon size={70} /><p>{bm ? 'Menjana dokumen…' : 'Generating document…'}</p></div>}

      {/* Hidden ID Cards for Download — rendered only when a download is in progress */}
      {downloadingBadge && (
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', pointerEvents: 'none' }}>
          {BADGE_CONFIG.filter(badge => badge.id === downloadingBadge).map(badge => (
            <div key={badge.id} id={`badge-id-${badge.id}`} style={{ width: '794px', padding: '38px', boxSizing: 'border-box', background: '#fff' }}>
              <BadgeIDCard
                badge={badge}
                playerName={playerName}
                gameState={gameState}
                language={language}
              />
            </div>
          ))}
          {baseAssessments.filter(a => a.id === downloadingBadge).map(achievement => (
            <div key={achievement.id} id={`achievement-cert-${achievement.id}`} style={{ width: '794px', padding: '38px', boxSizing: 'border-box', background: '#FAFAF8' }}>
              <AchievementCertificate
                achievement={achievement}
                playerName={playerName}
                gameState={gameState}
                language={language}
              />
            </div>
          ))}
        </div>
      )}

      {/* Certificate Modal */}
      {selectedAchievement && (
        <CertificateModal
          achievement={selectedAchievement}
          playerName={playerName}
          gameState={gameState}
          language={language}
          onClose={() => setSelectedAchievement(null)}
          onDownload={handleDownloadAchievement}
          isDownloading={downloadingBadge === selectedAchievement.id}
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
    </main>
  );
}
