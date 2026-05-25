import { ArrowLeft } from 'lucide-react';

const DESIGN_SYSTEM = {
  colors: {
    hair: '#E5E7EB',
    muted: '#6B7280',
  }
};

export default function BackButton({ onClick, style = {} }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        position: 'fixed',
        top: '12px',
        left: '12px',
        background: '#fff',
        border: `2px solid ${DESIGN_SYSTEM.colors.hair}`,
        borderRadius: '50%',
        width: 44,
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: DESIGN_SYSTEM.colors.muted,
        cursor: 'pointer',
        boxShadow: `0 3px 0 ${DESIGN_SYSTEM.colors.hair}`,
        transition: 'transform 0.12s',
        zIndex: 1000,
        flexShrink: 0,
        padding: 0,
        ...style,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      <ArrowLeft size={24} />
    </button>
  );
}
