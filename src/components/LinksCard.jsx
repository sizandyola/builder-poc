import React from 'react';
import { useNode, useEditor } from '@craftjs/core';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { usePages } from '../context/PagesContext';

export const LinksCard = ({ autoDetect, selectedCategoryId, cardStyle, gap, columns }) => {
  const { connectors: { connect, drag } } = useNode();
  const { enabled } = useEditor((state) => ({ enabled: state.options.enabled }));
  const navigate = useNavigate();
  const dataContext = useData();
  const pageInfo = dataContext?.pageInfo;
  const { currentPageId, setCurrentPageId } = usePages();

  const getAllCategories = (categories, result = []) => {
    categories?.forEach((category) => {
      result.push(category);
      if (category.children && category.children.length > 0) {
        getAllCategories(category.children, result);
      }
    });
    return result;
  };

  const allCategories = getAllCategories(pageInfo?.categories || []);

  // Auto-detect category based on current page
  let children = [];
  let effectiveCategoryId = selectedCategoryId;

  if (autoDetect) {
    if (currentPageId === 'home' || !currentPageId) {
      // On home page, show top-level categories
      children = pageInfo?.categories || [];
    } else {
      // Find current category by ID and show its children
      const currentCategory = allCategories.find(cat => cat.id.toString() === currentPageId);
      children = currentCategory?.children || [];
      effectiveCategoryId = currentCategory?.id;
    }
  } else {
    // Manual selection mode
    const selectedCategory = allCategories.find(cat => cat.id === selectedCategoryId);
    children = selectedCategory?.children || [];
  }

  const handleCardClick = (child) => {
    // Only navigate in view mode (when editor is disabled)
    if (!enabled) {
      const categoryId = child.id.toString();
      setCurrentPageId(categoryId);
      navigate(`/${categoryId}`);
    }
  };

  return (
    <div ref={ref => connect(drag(ref))} style={{ padding: '20px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: `${gap}px`,
        }}
      >
        {children.map((child) => (
          <div
            key={child.id}
            onClick={() => handleCardClick(child)}
            style={{
              border: cardStyle === 'bordered' ? '1px solid #ddd' : 'none',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: cardStyle === 'elevated' ? '#fff' : 'transparent',
              boxShadow: cardStyle === 'elevated' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
              cursor: enabled ? 'default' : 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseOver={(e) => {
              if (cardStyle === 'elevated' && !enabled) {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }
            }}
            onMouseOut={(e) => {
              if (cardStyle === 'elevated' && !enabled) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }
            }}
          >
            {child.thumbnail_url && (
              <img
                src={child.thumbnail_url}
                alt={child.title}
                style={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  marginBottom: '12px',
                }}
              />
            )}
            {child.icon && (
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>
                {child.icon}
              </div>
            )}
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
              {child.title}
            </h3>
            {child.description && (
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
                {child.description}
              </p>
            )}
            {child.header && (
              <div
                style={{ fontSize: '14px', marginBottom: '12px' }}
                dangerouslySetInnerHTML={{ __html: child.header }}
              />
            )}
          </div>
        ))}
      </div>
      {children.length === 0 && (
        <div
          style={{
            padding: '40px',
            textAlign: 'center',
            color: '#999',
            border: '2px dashed #ddd',
            borderRadius: '8px',
          }}
        >
          {autoDetect
            ? 'No sub-pages found for current page'
            : (selectedCategoryId
                ? 'No children found for selected category'
                : 'Select a category from settings or enable auto-detect')}
        </div>
      )}
    </div>
  );
};

LinksCard.craft = {
  displayName: 'LinksCard',
  props: {
    autoDetect: true,
    selectedCategoryId: null,
    cardStyle: 'elevated',
    gap: 20,
    columns: 3,
  },
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: LinksCardSettings,
  },
};

function LinksCardSettings() {
  const { actions: { setProp }, autoDetect, selectedCategoryId, cardStyle, gap, columns } = useNode((node) => ({
    autoDetect: node.data.props.autoDetect,
    selectedCategoryId: node.data.props.selectedCategoryId,
    cardStyle: node.data.props.cardStyle,
    gap: node.data.props.gap,
    columns: node.data.props.columns,
  }));

  const dataContext = useData();
  const pageInfo = dataContext?.pageInfo;

  const getAllCategories = (categories, result = []) => {
    categories?.forEach((category) => {
      result.push(category);
      if (category.children && category.children.length > 0) {
        getAllCategories(category.children, result);
      }
    });
    return result;
  };

  const allCategories = getAllCategories(pageInfo?.categories || []);
  const categoriesWithChildren = allCategories.filter(
    cat => cat.children && cat.children.length > 0
  );

  return (
    <div style={{ padding: '10px' }}>
      <h3 style={{ marginBottom: '10px' }}>Links Card Settings</h3>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={autoDetect}
            onChange={(e) => setProp((props) => (props.autoDetect = e.target.checked))}
          />
          <span style={{ fontWeight: '500' }}>Auto-detect current page</span>
        </label>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '4px', marginLeft: '24px' }}>
          Automatically show sub-pages based on current page context
        </p>
      </div>

      {!autoDetect && (
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Select Category</label>
          <select
            value={selectedCategoryId || ''}
            onChange={(e) =>
              setProp((props) => (props.selectedCategoryId = parseInt(e.target.value)))
            }
            style={{ width: '100%', padding: '5px' }}
          >
            <option value="">-- Select a category --</option>
            {categoriesWithChildren.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title} ({category.children?.length} children)
              </option>
            ))}
          </select>
        </div>
      )}

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Card Style</label>
        <select
          value={cardStyle}
          onChange={(e) => setProp((props) => (props.cardStyle = e.target.value))}
          style={{ width: '100%', padding: '5px' }}
        >
          <option value="elevated">Elevated (with shadow)</option>
          <option value="bordered">Bordered</option>
          <option value="flat">Flat</option>
        </select>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Columns</label>
        <input
          type="number"
          min="1"
          max="6"
          value={columns}
          onChange={(e) => setProp((props) => (props.columns = parseInt(e.target.value)))}
          style={{ width: '100%', padding: '5px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Gap (px)</label>
        <input
          type="number"
          value={gap}
          onChange={(e) => setProp((props) => (props.gap = parseInt(e.target.value)))}
          style={{ width: '100%', padding: '5px' }}
        />
      </div>
    </div>
  );
}
