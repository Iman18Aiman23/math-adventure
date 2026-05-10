import React, { useState, useEffect } from 'react';
import { getGameData, saveGameData } from '../utils/gameStatsManager';
import { playSound } from '../utils/soundManager';

export default function HeartShopModal({ isOpen, onClose, onPurchase, language }) {
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
    if (onPurchase) onPurchase(newData);
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
    if (onPurchase) onPurchase(newData);
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
        padding: '12px'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '420px',
          background: 'white',
          borderRadius: '24px',
          padding: '16px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.25), inset 0 0 0 4px rgba(255,255,255,0.6)',
          position: 'relative',
          overflow: 'hidden',
          animation: 'popUp 0.35s ease',
          maxHeight: '95vh',
          overflowY: 'auto'
        }}
      >
        {/* Decorative Top Gradient */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '80px',
          background: 'linear-gradient(135deg, #58CC02, #1CB0F6)',
          borderRadius: '0 0 30px 30px',
          zIndex: 0
        }} />

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '36px',
            height: '36px',
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
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'white',
            textShadow: '0 2px 6px rgba(0,0,0,0.2)',
            margin: 0,
            padding: '6px 0'
          }}>
            🛍️ {language === 'bm' ? 'Kedai Nyawa' : 'Heart Shop'}
          </h1>

          {/* Current Hearts */}
          <div style={{
            background: 'linear-gradient(135deg, #F0FBE7, #E0F7FF)',
            borderRadius: '16px',
            padding: '10px',
            color: '#333',
            textAlign: 'center',
            marginBottom: '12px',
            boxShadow: '0 4px 12px rgba(88, 204, 2, 0.15)',
            border: '2px solid #C7E9A0'
          }}>
            <div style={{ fontSize: '28px', marginBottom: '2px' }}>❤️</div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#555', fontWeight: 600 }}>
              {language === 'bm' ? 'Nyawa Semasa' : 'Current Hearts'}
            </p>
            <h2 style={{ margin: 0, fontSize: '22px', marginTop: '2px', color: '#58CC02', fontWeight: 900 }}>
              {gameData.hearts} / {gameData.maxHearts}
            </h2>
          </div>

          {/* Buy with Stars */}
          <div style={{
            background: 'linear-gradient(135deg, #ffffff, #f5f7ff)',
            borderRadius: '16px',
            padding: '12px',
            marginBottom: '10px',
            border: '2px dashed #d7dfff',
            transition: '0.25s ease',
            boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
            cursor: canBuyWithStars ? 'pointer' : 'default',
            opacity: canBuyWithStars ? 1 : 0.6
          }}
          onMouseEnter={e => {
            if (canBuyWithStars) {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)';
              e.currentTarget.style.boxShadow = '0 8px 18px rgba(0,0,0,0.1)';
            }
          }}
          onMouseLeave={e => {
            if (canBuyWithStars) {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.06)';
            }
          }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#444' }}>
                ❤️ 1 = ⭐ 3
              </div>
            </div>
            <button
              onClick={handlePurchaseWithStars}
              disabled={!canBuyWithStars}
              style={{
                width: '100%',
                border: 'none',
                borderRadius: '14px',
                padding: '10px',
                fontSize: '15px',
                fontWeight: 'bold',
                color: 'white',
                background: 'linear-gradient(135deg, #f6d365, #fda085)',
                boxShadow: '0 4px 10px rgba(253,160,133,0.3)',
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
            borderRadius: '16px',
            padding: '12px',
            marginBottom: '10px',
            border: '2px dashed #d7dfff',
            transition: '0.25s ease',
            boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
            cursor: canBuyWithGems ? 'pointer' : 'default',
            opacity: canBuyWithGems ? 1 : 0.6
          }}
          onMouseEnter={e => {
            if (canBuyWithGems) {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)';
              e.currentTarget.style.boxShadow = '0 8px 18px rgba(0,0,0,0.1)';
            }
          }}
          onMouseLeave={e => {
            if (canBuyWithGems) {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.06)';
            }
          }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#444' }}>
                ❤️ 1 = 💎 30
              </div>
            </div>
            <button
              onClick={handlePurchaseWithGems}
              disabled={!canBuyWithGems}
              style={{
                width: '100%',
                border: 'none',
                borderRadius: '14px',
                padding: '10px',
                fontSize: '15px',
                fontWeight: 'bold',
                color: 'white',
                background: 'linear-gradient(135deg, #43e97b, #38f9d7)',
                boxShadow: '0 4px 10px rgba(56,249,215,0.3)',
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
            gap: '10px',
            marginTop: '12px'
          }}>
            {/* Stars Box */}
            <div style={{
              flex: 1,
              padding: '10px',
              borderRadius: '14px',
              textAlign: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.85rem',
              background: 'linear-gradient(135deg, #fbc2eb, #a18cd1)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '22px', marginBottom: '2px' }}>⭐</div>
              <div>{language === 'bm' ? 'Bintang' : 'Stars'}</div>
              <div style={{ fontSize: '20px', marginTop: '2px' }}>{gameData.stars}</div>
            </div>

            {/* Gems Box */}
            <div style={{
              flex: 1,
              padding: '10px',
              borderRadius: '14px',
              textAlign: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.85rem',
              background: 'linear-gradient(135deg, #84fab0, #8fd3f4)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '22px', marginBottom: '2px' }}>💎</div>
              <div>{language === 'bm' ? 'Permata' : 'Gems'}</div>
              <div style={{ fontSize: '20px', marginTop: '2px' }}>{gameData.gems}</div>
            </div>
          </div>

          {/* Feedback Message */}
          {purchaseMessage && (
            <div style={{
              marginTop: '10px',
              background: messageType === 'success' ? 'linear-gradient(135deg, #6BCB77, #4AA85B)' : 'linear-gradient(135deg, #FF6B6B, #EE5A6F)',
              color: 'white',
              padding: '8px',
              borderRadius: '10px',
              textAlign: 'center',
              fontWeight: '600',
              fontSize: '0.85rem',
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
