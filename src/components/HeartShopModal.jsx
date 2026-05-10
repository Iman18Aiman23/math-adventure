import React, { useState, useEffect } from 'react';
import { getGameData, saveGameData } from '../utils/gameStatsManager';
import { playSound } from '../utils/soundManager';

export default function HeartShopModal({ isOpen, onClose, language }) {
  const [gameData, setGameData] = useState(getGameData());
  const [purchaseMessage, setPurchaseMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  useEffect(() => {
    setGameData(getGameData());
  }, [isOpen]);

  const handlePurchaseWithStars = () => {
    if (gameData.hearts >= gameData.maxHearts) {
      setMessageType('error');
      setPurchaseMessage(language === 'bm' ? 'Nyawa sudah penuh!' : 'Hearts already full!');
      setTimeout(() => setPurchaseMessage(''), 2000);
      return;
    }

    if (gameData.stars < 3) {
      setMessageType('error');
      setPurchaseMessage(language === 'bm' ? 'Bintang tidak cukup!' : 'Not enough stars!');
      setTimeout(() => setPurchaseMessage(''), 2000);
      return;
    }

    const newData = {
      ...gameData,
      stars: gameData.stars - 3,
      hearts: Math.min(gameData.hearts + 1, gameData.maxHearts),
    };
    saveGameData(newData);
    setGameData(newData);
    playSound('correct');
    setMessageType('success');
    setPurchaseMessage(language === 'bm' ? 'Pembelian berjaya!' : 'Purchase successful!');
    setTimeout(() => setPurchaseMessage(''), 2000);
  };

  const handlePurchaseWithGems = () => {
    if (gameData.hearts >= gameData.maxHearts) {
      setMessageType('error');
      setPurchaseMessage(language === 'bm' ? 'Nyawa sudah penuh!' : 'Hearts already full!');
      setTimeout(() => setPurchaseMessage(''), 2000);
      return;
    }

    if (gameData.gems < 30) {
      setMessageType('error');
      setPurchaseMessage(language === 'bm' ? 'Permata tidak cukup!' : 'Not enough gems!');
      setTimeout(() => setPurchaseMessage(''), 2000);
      return;
    }

    const newData = {
      ...gameData,
      gems: gameData.gems - 30,
      hearts: Math.min(gameData.hearts + 1, gameData.maxHearts),
    };
    saveGameData(newData);
    setGameData(newData);
    playSound('correct');
    setMessageType('success');
    setPurchaseMessage(language === 'bm' ? 'Pembelian berjaya!' : 'Purchase successful!');
    setTimeout(() => setPurchaseMessage(''), 2000);
  };

  if (!isOpen) return null;

  const canBuyWithStars = gameData.stars >= 3 && gameData.hearts < gameData.maxHearts;
  const canBuyWithGems = gameData.gems >= 30 && gameData.hearts < gameData.maxHearts;
  const isHeartsFull = gameData.hearts >= gameData.maxHearts;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn 0.3s ease',
        zIndex: 9999,
        padding: '20px'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '420px',
          background: 'white',
          borderRadius: '32px',
          padding: '24px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.25), inset 0 0 0 4px rgba(255,255,255,0.6)',
          position: 'relative',
          overflow: 'hidden',
          animation: 'popUp 0.35s ease',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Decorative Top Gradient */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '120px',
          background: 'linear-gradient(135deg, #58CC02, #1CB0F6)',
          borderRadius: '0 0 40px 40px',
          zIndex: 0
        }} />

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            width: '42px',
            height: '42px',
            border: 'none',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.25)',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            transition: '0.25s ease',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={e => {
            e.target.style.transform = 'rotate(90deg) scale(1.1)';
            e.target.style.background = 'rgba(255,255,255,0.4)';
          }}
          onMouseLeave={e => {
            e.target.style.transform = 'rotate(0deg) scale(1)';
            e.target.style.background = 'rgba(255,255,255,0.25)';
          }}
        >
          ✖
        </button>

        {/* Dialog Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Title */}
          <h1 style={{
            textAlign: 'center',
            fontSize: '32px',
            fontWeight: 'bold',
            color: 'white',
            marginTop: '10px',
            marginBottom: '30px',
            textShadow: '0 2px 6px rgba(0,0,0,0.2)',
            margin: 0,
            paddingTop: '10px'
          }}>
            🛍️ {language === 'bm' ? 'Kedai Nyawa' : 'Heart Shop'}
          </h1>

          {/* Current Hearts */}
          <div style={{
            background: 'linear-gradient(135deg, #F0FBE7, #E0F7FF)',
            borderRadius: '24px',
            padding: '18px',
            color: '#333',
            textAlign: 'center',
            marginBottom: '22px',
            boxShadow: '0 4px 12px rgba(88, 204, 2, 0.15)',
            border: '2px solid #C7E9A0'
          }}>
            <div style={{ fontSize: '42px', marginBottom: '8px' }}>❤️</div>
            <p style={{ margin: 0, marginBottom: '8px', fontSize: '0.95rem', color: '#555', fontWeight: 600 }}>
              {language === 'bm' ? 'Nyawa Semasa' : 'Current Hearts'}
            </p>
            <h2 style={{ margin: 0, fontSize: '30px', marginTop: '8px', color: '#58CC02', fontWeight: 900 }}>
              {gameData.hearts} / {gameData.maxHearts}
            </h2>
          </div>

          {/* Buy with Stars */}
          <div style={{
            background: 'linear-gradient(135deg, #ffffff, #f5f7ff)',
            borderRadius: '24px',
            padding: '18px',
            marginBottom: '18px',
            border: '3px dashed #d7dfff',
            transition: '0.25s ease',
            boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
            cursor: canBuyWithStars ? 'pointer' : 'default',
            opacity: canBuyWithStars ? 1 : 0.6
          }}
          onMouseEnter={e => {
            if (canBuyWithStars) {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 10px 24px rgba(0,0,0,0.12)';
            }
          }}
          onMouseLeave={e => {
            if (canBuyWithStars) {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.08)';
            }
          }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#444' }}>
                ❤️ 1 = ⭐ 3
              </div>
            </div>
            <button
              onClick={handlePurchaseWithStars}
              disabled={!canBuyWithStars}
              style={{
                width: '100%',
                border: 'none',
                borderRadius: '18px',
                padding: '14px',
                fontSize: '18px',
                fontWeight: 'bold',
                color: 'white',
                background: 'linear-gradient(135deg, #f6d365, #fda085)',
                boxShadow: '0 6px 14px rgba(253,160,133,0.35)',
                cursor: canBuyWithStars ? 'pointer' : 'not-allowed',
                transition: '0.25s ease',
                opacity: canBuyWithStars ? 1 : 0.5
              }}
              onMouseEnter={e => {
                if (canBuyWithStars) e.target.style.transform = 'scale(1.03)';
              }}
              onMouseLeave={e => {
                if (canBuyWithStars) e.target.style.transform = 'scale(1)';
              }}
              onMouseDown={e => {
                if (canBuyWithStars) e.target.style.transform = 'scale(0.98)';
              }}
              onMouseUp={e => {
                if (canBuyWithStars) e.target.style.transform = 'scale(1)';
              }}
            >
              ⭐ {language === 'bm' ? 'Beli Guna Bintang' : 'Buy with Stars'}
            </button>
          </div>

          {/* Buy with Gems */}
          <div style={{
            background: 'linear-gradient(135deg, #ffffff, #f5f7ff)',
            borderRadius: '24px',
            padding: '18px',
            marginBottom: '18px',
            border: '3px dashed #d7dfff',
            transition: '0.25s ease',
            boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
            cursor: canBuyWithGems ? 'pointer' : 'default',
            opacity: canBuyWithGems ? 1 : 0.6
          }}
          onMouseEnter={e => {
            if (canBuyWithGems) {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 10px 24px rgba(0,0,0,0.12)';
            }
          }}
          onMouseLeave={e => {
            if (canBuyWithGems) {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.08)';
            }
          }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#444' }}>
                ❤️ 1 = 💎 30
              </div>
            </div>
            <button
              onClick={handlePurchaseWithGems}
              disabled={!canBuyWithGems}
              style={{
                width: '100%',
                border: 'none',
                borderRadius: '18px',
                padding: '14px',
                fontSize: '18px',
                fontWeight: 'bold',
                color: 'white',
                background: 'linear-gradient(135deg, #43e97b, #38f9d7)',
                boxShadow: '0 6px 14px rgba(56,249,215,0.35)',
                cursor: canBuyWithGems ? 'pointer' : 'not-allowed',
                transition: '0.25s ease',
                opacity: canBuyWithGems ? 1 : 0.5
              }}
              onMouseEnter={e => {
                if (canBuyWithGems) e.target.style.transform = 'scale(1.03)';
              }}
              onMouseLeave={e => {
                if (canBuyWithGems) e.target.style.transform = 'scale(1)';
              }}
              onMouseDown={e => {
                if (canBuyWithGems) e.target.style.transform = 'scale(0.98)';
              }}
              onMouseUp={e => {
                if (canBuyWithGems) e.target.style.transform = 'scale(1)';
              }}
            >
              💎 {language === 'bm' ? 'Beli Guna Permata' : 'Buy with Gems'}
            </button>
          </div>

          {/* Resources */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '12px',
            marginTop: '24px'
          }}>
            {/* Stars Box */}
            <div style={{
              flex: 1,
              padding: '16px',
              borderRadius: '20px',
              textAlign: 'center',
              color: 'white',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #fbc2eb, #a18cd1)',
              boxShadow: '0 6px 18px rgba(0,0,0,0.12)'
            }}>
              <div style={{ fontSize: '28px', marginBottom: '6px' }}>⭐</div>
              <div>{language === 'bm' ? 'Bintang' : 'Stars'}</div>
              <div style={{ fontSize: '24px', marginTop: '4px' }}>{gameData.stars}</div>
            </div>

            {/* Gems Box */}
            <div style={{
              flex: 1,
              padding: '16px',
              borderRadius: '20px',
              textAlign: 'center',
              color: 'white',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #84fab0, #8fd3f4)',
              boxShadow: '0 6px 18px rgba(0,0,0,0.12)'
            }}>
              <div style={{ fontSize: '28px', marginBottom: '6px' }}>💎</div>
              <div>{language === 'bm' ? 'Permata' : 'Gems'}</div>
              <div style={{ fontSize: '24px', marginTop: '4px' }}>{gameData.gems}</div>
            </div>
          </div>

          {/* Feedback Message */}
          {purchaseMessage && (
            <div style={{
              marginTop: '16px',
              background: messageType === 'success' ? 'linear-gradient(135deg, #6BCB77, #4AA85B)' : 'linear-gradient(135deg, #FF6B6B, #EE5A6F)',
              color: 'white',
              padding: '12px',
              borderRadius: '12px',
              textAlign: 'center',
              fontWeight: '600',
              fontSize: '0.95rem',
              animation: 'slideDown 0.3s ease-out'
            }}>
              {purchaseMessage}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes popUp {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 480px) {
          .shop-dialog {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}
