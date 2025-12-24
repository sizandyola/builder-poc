import React from 'react';
import { useEditorMode } from '../context/EditorContext';

export const FloatingEditButton = () => {
  const { isEditMode, toggleEditMode } = useEditorMode();

  return (
    <button
      onClick={toggleEditMode}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999,
        padding: '12px 24px',
        background: isEditMode ? '#10b981' : '#2563eb',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '14px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      }}
    >
      {isEditMode ? (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          View Mode
        </>
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          Edit Mode
        </>
      )}
    </button>
  );
};
