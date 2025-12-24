import React, { useState } from 'react';
import { usePages } from '../context/PagesContext';

export const PagesPanel = () => {
  const { pages, currentPageId, setCurrentPageId, addPage, deletePage, updatePageName } = usePages();
  const [newPageName, setNewPageName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddPage = () => {
    if (newPageName.trim()) {
      addPage(newPageName);
      setNewPageName('');
      setShowAddForm(false);
    }
  };

  return (
    <div
      style={{
        background: '#f5f5f5',
        borderBottom: '1px solid #ddd',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        flexWrap: 'wrap',
      }}
    >
      <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Pages:</span>

      {pages.map((page) => (
        <div
          key={page.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            background: currentPageId === page.id ? '#3b82f6' : '#fff',
            color: currentPageId === page.id ? '#fff' : '#000',
            padding: '5px 10px',
            borderRadius: '5px',
            cursor: 'pointer',
            border: '1px solid #ddd',
          }}
        >
          <span onClick={() => setCurrentPageId(page.id)} style={{ flex: 1 }}>
            {page.name}
          </span>
          {page.id !== 'home' && (
            <button
              onClick={() => deletePage(page.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: currentPageId === page.id ? '#fff' : '#ef4444',
                cursor: 'pointer',
                fontSize: '16px',
                padding: '0 5px',
              }}
            >
              ×
            </button>
          )}
        </div>
      ))}

      {!showAddForm && (
        <button
          onClick={() => setShowAddForm(true)}
          style={{
            background: '#10b981',
            color: '#fff',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          + Add Page
        </button>
      )}

      {showAddForm && (
        <div style={{ display: 'flex', gap: '5px' }}>
          <input
            type="text"
            value={newPageName}
            onChange={(e) => setNewPageName(e.target.value)}
            placeholder="Page name"
            onKeyPress={(e) => e.key === 'Enter' && handleAddPage()}
            style={{
              padding: '5px 10px',
              borderRadius: '5px',
              border: '1px solid #ddd',
            }}
            autoFocus
          />
          <button
            onClick={handleAddPage}
            style={{
              background: '#10b981',
              color: '#fff',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Add
          </button>
          <button
            onClick={() => {
              setShowAddForm(false);
              setNewPageName('');
            }}
            style={{
              background: '#ef4444',
              color: '#fff',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};
