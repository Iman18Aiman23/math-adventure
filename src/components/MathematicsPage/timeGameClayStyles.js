export const getTimeGameClayStyles = () => `
  .time-ref-game {
    width: 100% !important;
    height: 100vh !important;
    height: 100dvh !important;
    min-height: 100dvh !important;
    max-width: 100vw !important;
    min-width: 0 !important;
    overflow: hidden !important;
    display: flex !important;
    flex-direction: column !important;
    box-sizing: border-box !important;
    background: linear-gradient(180deg, #ECFAF5 0%, #F7FCF9 100%) !important;
    font-family: "Nunito", "Poppins", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .time-ref-game *,
  .time-ref-game *::before,
  .time-ref-game *::after {
    box-sizing: border-box;
  }

  .time-ref-game .duo-home-header {
    width: min(100%, 1100px) !important;
    margin-inline: auto !important;
    min-height: clamp(54px, 8.5dvh, 68px) !important;
    padding: max(clamp(6px, 1dvh, 12px), env(safe-area-inset-top)) clamp(12px, 3vw, 28px) clamp(6px, 1dvh, 12px) !important;
    flex-wrap: nowrap !important;
    border-bottom: 0 !important;
    background: transparent !important;
    box-shadow: none !important;
    position: relative;
    z-index: 20;
  }

  .time-ref-game .duo-home-header > button {
    width: clamp(44px, 10vw, 64px) !important;
    height: clamp(44px, 10vw, 64px) !important;
    border: 1px solid #E2ECE8 !important;
    background: #FFFFFF !important;
    color: var(--text-primary) !important;
    box-shadow: 0 3px 10px rgba(25, 65, 50, 0.08) !important;
  }

  .time-ref-game .duo-home-stats {
    gap: clamp(6px, 1.3vw, 14px) !important;
    white-space: nowrap !important;
  }

  .time-ref-game .duo-home-stats button {
    min-height: clamp(36px, 5.5dvh, 42px) !important;
    padding: clamp(6px, 1vw, 10px) clamp(8px, 2vw, 14px) !important;
    border: 1px solid #E6EEEB !important;
    border-radius: 999px !important;
    background: #FFFFFF !important;
    box-shadow: 0 2px 8px rgba(31, 78, 60, 0.07) !important;
    font-size: clamp(16px, 3vw, 24px) !important;
    font-weight: 900 !important;
  }

  .time-ref-game .ops-game-board {
    width: min(100%, 1100px) !important;
    height: 100% !important;
    flex: 1 1 auto !important;
    min-height: 0 !important;
    margin-inline: auto !important;
    display: flex !important;
    flex-direction: column !important;
    gap: clamp(8px, 1.2dvh, 14px) !important;
    padding: 0 clamp(12px, 3vw, 28px) max(clamp(6px, 1dvh, 14px), env(safe-area-inset-bottom)) !important;
    overflow: hidden !important;
  }

  .time-game-mode-row {
    display: flex !important;
    flex-wrap: wrap;
    justify-content: center !important;
    gap: clamp(8px, 1.6vw, 12px) !important;
    padding: 0 !important;
    margin: 0 !important;
    flex: 0 0 auto;
    min-height: 0;
  }

  .time-ref-game .ops-mode-pill {
    min-height: clamp(34px, 5.5dvh, 42px);
    display: inline-flex !important;
    align-items: center !important;
    gap: 7px !important;
    padding: clamp(6px, 1.1dvh, 9px) clamp(10px, 2.4vw, 14px) !important;
    border: 1px solid #DDEBE5 !important;
    border-radius: 999px !important;
    background: #FFFFFF !important;
    box-shadow: 0 3px 10px rgba(31, 78, 60, 0.06) !important;
    transition: transform 0.16s cubic-bezier(.34,1.56,.64,1), box-shadow 0.16s ease !important;
  }

  .time-ref-game .ops-mode-pill:active {
    transform: translateY(2px);
  }

  .time-dropdown-menu {
    border: 1px solid #DDEBE5 !important;
    border-radius: 16px !important;
    box-shadow: 0 14px 32px rgba(31, 78, 60, 0.14) !important;
  }

  .time-ref-game .ops-question-zone {
    width: 100% !important;
    flex: 1 1 auto !important;
    min-height: 0 !important;
    margin: 0 !important;
    padding: clamp(14px, 2.5dvh, 28px) clamp(16px, 4vw, 40px) !important;
    border: 1px solid rgba(210, 230, 221, 0.9) !important;
    border-radius: clamp(22px, 5vw, 36px) !important;
    background: rgba(255, 255, 255, 0.96) !important;
    box-shadow: 0 6px 20px rgba(31, 78, 60, 0.08) !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    overflow: hidden !important;
  }

  .time-ref-game .ops-question-label {
    max-width: 100%;
    margin: 0 0 clamp(10px, 1.8dvh, 18px) !important;
    color: var(--text-primary) !important;
    font-family: inherit !important;
    font-size: clamp(19px, min(4vw, 5.3dvh), 34px) !important;
    font-weight: 900 !important;
    line-height: 1.08 !important;
    letter-spacing: 0 !important;
    text-align: center !important;
    text-transform: none !important;
    text-wrap: balance;
  }

  .time-ref-game .ops-question-subtitle,
  .time-question-kicker {
    margin: 0 !important;
    color: var(--text-secondary) !important;
    font-size: clamp(12px, min(2.4vw, 2.7dvh), 18px) !important;
    font-weight: 800 !important;
    line-height: 1.2 !important;
    letter-spacing: 0 !important;
    text-align: center !important;
    text-transform: none !important;
  }

  .time-ref-game .ops-question-expr {
    max-width: 100%;
    color: var(--text-primary) !important;
    font-family: inherit !important;
    font-size: clamp(42px, min(11vw, 13dvh), 92px) !important;
    font-weight: 900 !important;
    line-height: 0.95 !important;
    letter-spacing: 0 !important;
    text-align: center !important;
    overflow-wrap: anywhere;
    text-shadow: none !important;
  }

  .time-clock-stage {
    width: min(100%, clamp(150px, 34dvh, 250px));
    aspect-ratio: 1;
    display: grid;
    place-items: center;
    margin: clamp(4px, 1dvh, 10px) 0 0;
  }

  .time-ref-help {
    position: absolute;
    top: clamp(10px, 1.8dvh, 16px);
    left: clamp(10px, 2vw, 16px);
    right: auto;
    width: clamp(36px, 5.8dvh, 44px);
    height: clamp(36px, 5.8dvh, 44px);
    display: grid;
    place-items: center;
    border: 1px solid #DDEBE5 !important;
    border-radius: 50% !important;
    background: #FFFFFF !important;
    box-shadow: 0 3px 10px rgba(31, 78, 60, 0.08) !important;
  }

  .time-ref-game .ops-settings-puck {
    position: absolute;
    top: clamp(10px, 1.8dvh, 16px);
    right: clamp(10px, 2vw, 16px);
    z-index: 12;
    width: clamp(36px, 5.8dvh, 44px);
    height: clamp(36px, 5.8dvh, 44px);
    display: grid;
    place-items: center;
    border: 1px solid rgba(227, 236, 224, 0.95);
    border-radius: 50%;
    background: linear-gradient(145deg, #FFFFFF, #F4F8F2);
    color: #677064;
    cursor: pointer;
    box-shadow:
      0 8px 16px rgba(55, 110, 30, 0.13),
      0 4px 0 #DDE8DA,
      inset 0 2px 0 rgba(255,255,255,0.9),
      inset 0 -5px 10px rgba(55,110,30,0.06);
    transition: transform 0.16s cubic-bezier(.34,1.56,.64,1), box-shadow 0.16s ease;
  }

  .time-ref-game .ops-settings-puck:hover {
    transform: translateY(-2px);
  }

  .time-ref-game .ops-settings-puck:active {
    transform: translateY(2px);
    box-shadow:
      0 4px 10px rgba(55, 110, 30, 0.1),
      0 2px 0 #DDE8DA,
      inset 0 5px 10px rgba(55,110,30,0.1);
  }

  .time-ref-game .ops-settings-overlay {
    position: fixed;
    inset: 0;
    z-index: 180;
    display: grid;
    place-items: center;
    padding: clamp(14px, 3vw, 28px);
    background: rgba(236, 250, 245, 0.72);
    backdrop-filter: blur(14px);
  }

  .time-ref-game .ops-settings-panel {
    width: min(760px, calc(100vw - 28px));
    max-height: calc(100dvh - 28px);
    overflow-y: auto;
    box-sizing: border-box;
    border-radius: clamp(24px, 4vw, 32px);
    background: #FFFFFF;
    border: 1px solid #DDEBE5;
    box-shadow: 0 28px 70px rgba(31, 78, 60, 0.16);
    padding: clamp(20px, 4vw, 34px);
  }

  .time-ref-game .ops-settings-panel-head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: clamp(18px, 3vh, 24px);
  }

  .time-ref-game .ops-settings-title {
    margin: 0;
    color: #102D53;
    font-size: clamp(28px, 4vw, 36px);
    font-weight: 900;
    line-height: 1.02;
  }

  .time-ref-game .ops-settings-subtitle,
  .time-ref-game .ops-settings-help {
    margin: 0;
    color: #7B8EA8;
    font-weight: 700;
    line-height: 1.25;
  }

  .time-ref-game .ops-settings-subtitle {
    margin-top: 4px;
    font-size: clamp(14px, 2.1vw, 17px);
  }

  .time-ref-game .ops-settings-help {
    font-size: clamp(12px, 1.7vw, 15px);
  }

  .time-ref-game .ops-settings-close {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    border-radius: 50%;
    border: 1px solid #DDEBE5;
    background: #FFFFFF;
    color: #102D53;
    display: grid;
    place-items: center;
    cursor: pointer;
    box-shadow: 0 6px 14px rgba(31, 78, 60, 0.06);
  }

  .time-ref-game .ops-settings-group {
    display: grid;
    gap: 10px;
    margin-top: clamp(16px, 2.8vh, 24px);
  }

  .time-ref-game .ops-settings-label {
    color: #102D53;
    font-size: clamp(18px, 2.7vw, 22px);
    font-weight: 900;
    letter-spacing: 0;
    line-height: 1.05;
  }

  .time-ref-game .ops-settings-section-head {
    display: grid;
    gap: 3px;
  }

  .time-ref-game .ops-settings-options {
    display: flex;
    flex-wrap: wrap;
    gap: clamp(8px, 1.4vw, 12px);
  }

  .time-ref-game .ops-settings-option {
    min-height: clamp(42px, 6.2vh, 54px);
    padding: 9px clamp(14px, 2.5vw, 24px);
    border-radius: 15px;
    border: 1px solid #DDEBE5;
    background: #F8FCFA;
    color: #102D53;
    font-size: clamp(14px, 1.8vw, 16px);
    font-weight: 900;
    cursor: pointer;
    box-shadow: 0 2px 0 rgba(221, 235, 229, 0.8);
    transition: transform 120ms ease, background-color 120ms ease, border-color 120ms ease, box-shadow 120ms ease;
  }

  .time-ref-game .ops-settings-option.is-active {
    background: #23B76B;
    border-color: #23B76B;
    color: #FFFFFF;
    box-shadow: 0 4px 10px rgba(35, 183, 107, 0.18);
  }

  .time-ref-game .ops-settings-option:active {
    transform: translateY(1px);
  }

  .time-ref-game .ops-settings-footer {
    display: grid;
    grid-template-columns: minmax(116px, 0.34fr) minmax(180px, 1fr);
    gap: clamp(12px, 2vw, 18px);
    margin-top: clamp(18px, 3vh, 28px);
    padding-top: clamp(14px, 2vh, 18px);
    border-top: 1px solid #DDEBE5;
  }

  .time-ref-game .ops-settings-cancel,
  .time-ref-game .ops-settings-start {
    min-height: clamp(46px, 6.8vh, 56px);
    border-radius: 16px;
    font-size: clamp(14px, 1.8vw, 17px);
    font-weight: 900;
  }

  .time-ref-game .ops-settings-cancel {
    border: 0;
    background: #F3F7F6;
    color: #64748B;
    cursor: pointer;
  }

  .time-ref-game .ops-settings-start {
    width: 100%;
    margin-top: 0;
    border: 0;
    justify-self: end;
  }

  @media (max-width: 600px) {
    .time-ref-game .ops-settings-overlay {
      padding: 12px;
    }

    .time-ref-game .ops-settings-panel {
      width: min(100%, calc(100vw - 24px));
      padding: 18px;
    }

    .time-ref-game .ops-settings-title {
      font-size: 26px;
    }

    .time-ref-game .ops-settings-close {
      width: 42px;
      height: 42px;
    }

    .time-ref-game .ops-settings-footer {
      grid-template-columns: 1fr;
    }
  }

  .time-ref-game .ops-answer-zone {
    flex: 0 0 auto !important;
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
  }

  .time-ref-game .ops-choices-grid {
    width: 100%;
    display: grid !important;
    grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
    gap: clamp(8px, 1.5vw, 14px) !important;
  }

  .time-ref-game .ops-choice-btn {
    min-width: 0;
    min-height: clamp(58px, 8dvh, 82px) !important;
    border-radius: clamp(18px, 3vw, 26px) !important;
    border: 1px solid #DCE7E3 !important;
    border-bottom: 4px solid #CAD7D2 !important;
    background: #FFFFFF !important;
    box-shadow: 0 3px 12px rgba(31, 78, 60, 0.06) !important;
    overflow: hidden;
  }

  .time-ref-game .ops-choice-label {
    top: 8px !important;
    left: 10px !important;
    width: 26px !important;
    height: 26px !important;
    border: 0 !important;
    border-radius: 9px !important;
    background: rgba(255,255,255,0.62) !important;
    color: var(--text-secondary) !important;
    font-weight: 900 !important;
  }

  .time-ref-game .ops-choice-value {
    color: var(--text-primary) !important;
    font-family: inherit !important;
    font-size: clamp(1.1rem, min(3vw, 4.6dvh), 1.75rem) !important;
    font-weight: 900 !important;
    line-height: 1.05 !important;
    text-shadow: none !important;
    overflow-wrap: anywhere;
  }

  .time-ref-game .ops-choice-correct {
    background: linear-gradient(145deg, #93F0AD, #22C55E) !important;
    border-bottom-color: #15803D !important;
  }

  .time-ref-game .ops-choice-wrong {
    background: linear-gradient(145deg, #FFACB8, #F43F5E) !important;
    border-bottom-color: #BE123C !important;
  }

  .time-ref-game .ops-typing-form {
    display: flex !important;
    flex-direction: column !important;
    gap: clamp(8px, 1.5vw, 14px) !important;
  }

  .time-ref-game .ops-typing-input-shell {
    width: 100% !important;
    min-height: clamp(62px, 9dvh, 94px) !important;
    background: #FFFFFF !important;
    border: 2px solid #DCE5E3 !important;
    border-radius: clamp(20px, 4vw, 30px) !important;
    box-shadow: 0 3px 12px rgba(31, 78, 60, 0.06) !important;
    padding-inline: clamp(18px, 4vw, 34px) !important;
    display: flex !important;
    align-items: center !important;
    gap: clamp(12px, 3vw, 20px) !important;
    flex: 0 0 auto !important;
  }

  .time-ref-game .ops-typing-input-shell:focus-within {
    border-color: var(--primary) !important;
    box-shadow: 0 0 0 3px rgba(39, 182, 104, 0.12) !important;
  }

  .time-ref-game .ops-pencil-icon {
    color: #96A6B8 !important;
    flex: 0 0 auto !important;
  }

  .time-ref-game .ops-typing-input {
    flex: 1 1 auto !important;
    min-width: 0 !important;
    width: auto !important;
    height: 100% !important;
    padding: 0 !important;
    border: 0 !important;
    outline: 0 !important;
    background: transparent !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    color: var(--text-primary) !important;
    font-family: inherit !important;
    font-size: clamp(20px, 5vw, 34px) !important;
    font-weight: 800 !important;
    text-align: left !important;
  }

  .time-ref-game .ops-typing-input::placeholder {
    color: #93A0B1 !important;
    opacity: 1 !important;
  }

  .time-ref-game .ops-submit-btn {
    width: 100% !important;
    min-height: clamp(58px, 8dvh, 82px) !important;
    padding: 0 !important;
    border: 0 !important;
    border-radius: clamp(20px, 4vw, 30px) !important;
    background: linear-gradient(180deg, #36C875, #22AA60) !important;
    color: #FFFFFF !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: clamp(8px, 2vw, 14px) !important;
    font-family: inherit !important;
    font-size: clamp(20px, 4.5vw, 32px) !important;
    font-weight: 900 !important;
    box-shadow: 0 5px 0 #168D4D, 0 8px 14px rgba(25, 120, 70, 0.12) !important;
    flex: 0 0 auto !important;
    transition: transform 160ms ease, filter 160ms ease, box-shadow 160ms ease !important;
  }

  .time-ref-game .ops-submit-btn:active:not(:disabled) {
    transform: translateY(2px) !important;
    box-shadow: 0 3px 0 #168D4D, 0 5px 10px rgba(25, 120, 70, 0.10) !important;
  }

  @media (hover: hover) {
    .time-ref-game .ops-submit-btn:hover:not(:disabled) {
      filter: brightness(1.02) !important;
    }
  }

  .time-ref-game .ops-submit-btn:disabled {
    background: #B9DEC9 !important;
    color: rgba(255, 255, 255, 0.8) !important;
    box-shadow: 0 4px 0 #9BC7AD !important;
    cursor: not-allowed !important;
  }

  .time-ref-game .ops-continue-wrong {
    width: 100% !important;
    min-height: clamp(58px, 8dvh, 82px) !important;
    border-radius: clamp(20px, 4vw, 30px) !important;
  }

  .time-ref-game .ops-footer-stats {
    width: 100% !important;
    max-width: none !important;
    align-self: stretch !important;
    margin: 0 !important;
    padding: clamp(8px, 1.2dvh, 14px) clamp(12px, 3vw, 22px) !important;
    background: rgba(255, 255, 255, 0.94) !important;
    border: 1px solid #DDEBE5 !important;
    border-radius: clamp(20px, 4vw, 30px) !important;
    box-shadow: 0 3px 12px rgba(31, 78, 60, 0.06) !important;
    flex: 0 0 auto !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: stretch !important;
    justify-content: flex-start !important;
    gap: clamp(6px, 1dvh, 10px) !important;
  }

  .time-answer-record {
    width: 100% !important;
    min-height: 32px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: flex-start !important;
    gap: clamp(6px, 1.5vw, 12px) !important;
    padding: 0 !important;
    background: transparent !important;
    box-shadow: none !important;
    border: 0 !important;
    border-radius: 0 !important;
    color: var(--text-secondary) !important;
    white-space: nowrap !important;
  }

  .time-answer-title {
    color: var(--text-primary) !important;
    font-size: clamp(12px, 2.5vw, 17px) !important;
    font-weight: 900 !important;
  }

  .time-answer-stats {
    display: inline-flex;
    align-items: center;
    gap: clamp(7px, 1.5vw, 14px);
    min-width: 0;
  }

  .time-answer-stat {
    display: inline-flex;
    align-items: center;
    gap: clamp(3px, 0.8vw, 6px);
    color: var(--text-primary);
    font-size: clamp(12px, 2.5vw, 17px);
    font-weight: 900;
    line-height: 1;
  }

  .time-answer-stat.is-correct {
    color: #159653;
  }

  .time-answer-stat.is-wrong {
    color: #E93E46;
  }

  .time-answer-muted {
    color: var(--text-secondary);
    font-weight: 800;
  }

  .time-answer-icon {
    width: clamp(26px, 6vw, 34px);
    height: clamp(26px, 6vw, 34px);
    display: grid;
    place-items: center;
    border-radius: 8px;
    color: #FFFFFF;
    font-size: clamp(15px, 3vw, 20px);
    font-weight: 900;
    line-height: 1;
  }

  .time-answer-icon.is-correct {
    background: #27B668;
  }

  .time-answer-icon.is-wrong {
    background: #FF4D55;
  }

  .time-progress-wrap {
    width: 100% !important;
    max-width: none !important;
    display: grid !important;
    grid-template-columns: auto minmax(0, 1fr) auto !important;
    align-items: center !important;
    gap: clamp(10px, 2vw, 16px) !important;
    padding: 0 !important;
    background: transparent !important;
    border: 0 !important;
    box-shadow: none !important;
  }

  .time-progress-icon {
    width: clamp(40px, 9vw, 58px);
    height: clamp(40px, 9vw, 58px);
    border-radius: 50%;
    color: #9A6A00;
    background: linear-gradient(180deg, #FFD84D, #FFB515);
    box-shadow: 0 2px 6px rgba(180, 120, 0, 0.12);
    font-size: clamp(22px, 5vw, 30px);
  }

  .time-progress-wrap > span:first-child {
    width: clamp(40px, 9vw, 58px);
    height: clamp(40px, 9vw, 58px);
    display: grid;
    place-items: center;
    border-radius: 50%;
    color: #9A6A00;
    background: linear-gradient(180deg, #FFD84D, #FFB515);
    box-shadow: 0 2px 6px rgba(180, 120, 0, 0.12);
    font-size: clamp(22px, 5vw, 30px);
    line-height: 1;
  }

  .time-progress-track {
    width: 100%;
    height: clamp(12px, 2dvh, 18px);
    background: #E5EBE8;
    border-radius: 999px;
    overflow: hidden;
  }

  .time-progress-fill {
    height: 100%;
    background: var(--primary);
    border-radius: inherit;
    transition: width 300ms ease;
  }

  .time-progress-count {
    color: var(--text-primary);
    font-size: clamp(16px, 3vw, 22px);
    font-weight: 900;
    white-space: nowrap;
  }

  .time-ref-game .ops-feedback-bar {
    position: fixed !important;
    top: max(8px, env(safe-area-inset-top)) !important;
    left: 50% !important;
    right: auto !important;
    transform: translateX(-50%) !important;
    width: min(92vw, 420px) !important;
    border-radius: 999px !important;
    padding: 10px 16px !important;
    box-shadow: 0 8px 20px rgba(31, 78, 60, 0.14) !important;
    z-index: 70 !important;
  }

  .time-reference-popup {
    background: #FFFFFF !important;
    border: 1px solid #DDEBE5 !important;
    border-radius: 26px !important;
    box-shadow: 0 20px 50px rgba(31, 78, 60, 0.18) !important;
  }

  @media (max-height: 700px) {
    .time-ref-game .duo-home-header {
      padding-block: 4px !important;
    }

    .time-ref-game .ops-question-zone {
      padding: 10px clamp(14px, 3vw, 24px) !important;
    }

    .time-ref-game .ops-question-label {
      font-size: clamp(17px, min(3.6vw, 4.6dvh), 28px) !important;
      margin-bottom: 8px !important;
    }

    .time-ref-game .ops-question-expr {
      font-size: clamp(38px, min(9vw, 9.5dvh), 68px) !important;
    }

    .time-clock-stage {
      width: min(100%, clamp(125px, 30dvh, 200px));
    }

    .time-ref-game .ops-footer-stats {
      padding: 6px clamp(10px, 2vw, 18px) !important;
    }
  }

  @media (max-height: 600px) {
    .time-ref-game .ops-game-board {
      gap: 6px !important;
    }

    .time-ref-game .ops-question-zone {
      padding-block: 8px !important;
    }

    .time-ref-game .ops-choice-btn {
      min-height: 50px !important;
    }

    .time-ref-game .ops-typing-input-shell,
    .time-ref-game .ops-submit-btn,
    .time-ref-game .ops-continue-wrong {
      min-height: 50px !important;
    }

    .time-ref-game .ops-footer-stats {
      gap: 4px !important;
    }
  }

  @media (max-width: 720px) {
    .time-ref-game .ops-choices-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    }

    .time-ref-game .ops-typing-form {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 430px) {
    .time-ref-game .duo-home-stats {
      gap: 5px !important;
    }

    .time-ref-game .duo-home-stats button {
      padding-inline: 8px !important;
      font-size: 16px !important;
    }
  }

  @media (max-width: 360px) {
    .time-ref-game .ops-game-board,
    .time-ref-game .duo-home-header {
      padding-inline: 10px !important;
    }
  }
`;
