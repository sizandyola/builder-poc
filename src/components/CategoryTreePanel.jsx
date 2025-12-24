import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePages } from '../context/PagesContext';
import { useData } from '../context/DataContext';

const CategoryTreeItem = ({ category, level = 0, currentPageId, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = category.children && category.children.length > 0;
  const isActive = currentPageId === category.id.toString();

  return (
    <div style={{ marginLeft: `${level * 16}px` }}>
      <div
        onClick={() => onSelect(category)}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '8px 12px',
          cursor: 'pointer',
          background: isActive ? '#3b82f6' : 'transparent',
          color: isActive ? '#fff' : '#000',
          borderRadius: '4px',
          marginBottom: '2px',
          transition: 'background 0.2s',
        }}
        onMouseOver={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = '#f3f4f6';
          }
        }}
        onMouseOut={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = 'transparent';
          }
        }}
      >
        {hasChildren && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            style={{
              marginRight: '8px',
              fontSize: '12px',
              userSelect: 'none',
            }}
          >
            {isExpanded ? '▼' : '▶'}
          </span>
        )}
        {!hasChildren && <span style={{ marginRight: '8px', width: '12px' }} />}
        <span style={{ flex: 1, fontSize: '14px' }}>{category.title}</span>
        {hasChildren && (
          <span
            style={{
              fontSize: '11px',
              opacity: 0.7,
              marginLeft: '8px',
            }}
          >
            ({category.children.length})
          </span>
        )}
      </div>
      {hasChildren && isExpanded && (
        <div>
          {category.children.map((child) => (
            <CategoryTreeItem
              key={child.id}
              category={child}
              level={level + 1}
              currentPageId={currentPageId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const CategoryTreePanel = () => {
  const navigate = useNavigate();
  const { currentPageId, setCurrentPageId, ensurePageExists, saveAllPagesAsDefault, resetToDefault } = usePages();
  const { pageInfo, loading } = useData();

  // Flatten categories into a list for dropdown
  const flattenCategories = (categories, level = 0) => {
    let result = [];
    categories?.forEach((category) => {
      result.push({ ...category, level });
      if (category.children && category.children.length > 0) {
        result = result.concat(flattenCategories(category.children, level + 1));
      }
    });
    return result;
  };

  const allCategories = flattenCategories(pageInfo?.categories || []);

  const handlePageChange = (e) => {
    const selectedId = e.target.value;
    if (selectedId === 'home') {
      setCurrentPageId('home');
      navigate('/');
    } else {
      ensurePageExists(selectedId);
      setCurrentPageId(selectedId);
      navigate(`/${selectedId}`);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          background: '#f5f5f5',
          borderBottom: '1px solid #ddd',
          padding: '10px 20px',
          textAlign: 'center',
        }}
      >
        Loading categories...
      </div>
    );
  }

  return (
    <div
      style={{
        background: '#f5f5f5',
        borderBottom: '1px solid #ddd',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <label style={{ fontWeight: 'bold', fontSize: '14px', whiteSpace: 'nowrap' }}>
        Current Page:
      </label>
      <select
        value={currentPageId}
        onChange={handlePageChange}
        style={{
          flex: 1,
          padding: '8px 12px',
          fontSize: '14px',
          borderRadius: '4px',
          border: '1px solid #ddd',
          background: '#fff',
          cursor: 'pointer',
        }}
      >
        <option value="home">🏠 {pageInfo?.title || 'Home'}</option>
        {allCategories.map((category) => (
          <option key={category.id} value={category.id.toString()}>
            {'└─'.repeat(category.level)} {category.title}
          </option>
        ))}
      </select>
      <>
        <button
          onClick={saveAllPagesAsDefault}
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            background: '#10b981',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            fontWeight: '500',
          }}
          title="Save all current pages as default"
        >
          💾 Save All as Default
        </button>
        <button
          onClick={resetToDefault}
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            background: '#ef4444',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            fontWeight: '500',
          }}
          title="Reset all pages to saved default"
        >
          🔄 Reset to Default
        </button>
      </>
    </div>
  );
};
