import { ArrowLeft } from 'lucide-react';

export default function BackButton({ onClick, style = {} }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        color: '#6B7280',
        display: 'flex',
        alignItems: 'center',
        padding: '4px',
        borderRadius: '8px',
        alignSelf: 'flex-start',
        ...style,
      }}
    >
      <ArrowLeft size={24} />
    </button>
  );
}
