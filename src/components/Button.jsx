import React from 'react';
import { useNode } from '@craftjs/core';
import { useNavigate } from 'react-router-dom';
import { usePages } from '../context/PagesContext';
import { useData } from '../context/DataContext';

export const Button = ({ text, background, color, fontSize, padding, borderRadius, linkType, targetPageId, btnResourceId }) => {
  const {
    connectors: { connect, drag },
    selected,
    hovered
  } = useNode((state) => ({
    selected: state.events.selected,
    hovered: state.events.hovered
  }));
  const navigate = useNavigate();
  const { getPageById } = usePages();
  const dataContext = useData();
  const btnResources = dataContext?.btnResources || {};

  // Flatten all button resources from different placements
  const allButtons = [
    ...(btnResources.header || []),
    ...(btnResources.navbar || []),
  ];

  const btnResource = btnResourceId ? allButtons.find(btn => btn.id === parseInt(btnResourceId)) : null;

  const displayText = btnResource?.title || text;
  const displayBackground = btnResource?.background_color || background;
  const displayColor = btnResource?.text_color || color;
  const displayFontSize = fontSize;
  const displayPadding = padding;
  const displayBorderRadius = borderRadius;

  const handleClick = (e) => {
    if (linkType === 'page' && targetPageId) {
      e.preventDefault();
      const targetPage = getPageById(targetPageId);
      if (targetPage) {
        navigate(targetPage.path);
      }
    }
  };

  // Determine outline style based on selection/hover state
  let outlineStyle = 'none';
  if (selected) {
    outlineStyle = '2px solid #3b82f6';
  } else if (hovered) {
    outlineStyle = '2px dashed #3b82f6';
  }

  return (
    <button
      ref={ref => connect(drag(ref))}
      onClick={handleClick}
      style={{
        background: displayBackground,
        color: displayColor,
        fontSize: `${displayFontSize}px`,
        padding: `${displayPadding}px`,
        borderRadius: `${displayBorderRadius}px`,
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        outline: outlineStyle,
        outlineOffset: (selected || hovered) ? '2px' : '0',
        transition: 'all 0.15s ease',
        boxShadow: selected ? '0 0 0 4px rgba(59, 130, 246, 0.2)' : 'none',
      }}
    >
      {displayText}
    </button>
  );
};

Button.craft = {
  displayName: 'Button',
  props: {
    text: 'Click me',
    background: '#3b82f6',
    color: '#ffffff',
    fontSize: 16,
    padding: 12,
    borderRadius: 5,
    linkType: 'none',
    targetPageId: '',
    btnResourceId: '',
  },
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: ButtonSettings,
  },
};

function ButtonSettings() {
  const { actions: { setProp }, text, background, color, fontSize, padding, borderRadius, linkType, targetPageId, btnResourceId } = useNode((node) => ({
    text: node.data.props.text,
    background: node.data.props.background,
    color: node.data.props.color,
    fontSize: node.data.props.fontSize,
    padding: node.data.props.padding,
    borderRadius: node.data.props.borderRadius,
    linkType: node.data.props.linkType,
    targetPageId: node.data.props.targetPageId,
    btnResourceId: node.data.props.btnResourceId,
  }));

  const { pages } = usePages();
  const dataContext = useData();
  const btnResources = dataContext?.btnResources || {};

  // Flatten all button resources from different placements
  const allButtons = [
    ...(btnResources.header || []),
    ...(btnResources.navbar || []),
  ];

  return (
    <div style={{ padding: '10px' }}>
      <h3 style={{ marginBottom: '10px' }}>Button Settings</h3>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Button Resource</label>
        <select
          value={btnResourceId}
          onChange={(e) => setProp((props) => (props.btnResourceId = e.target.value))}
          style={{ width: '100%', padding: '5px' }}
        >
          <option value="">Custom Button (No Resource)</option>
          {allButtons.map((btn) => (
            <option key={btn.id} value={btn.id}>
              {btn.title} ({btn.placement})
            </option>
          ))}
        </select>
      </div>

      {!btnResourceId && (
        <>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setProp((props) => (props.text = e.target.value))}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Background Color</label>
            <input
              type="color"
              value={background}
              onChange={(e) => setProp((props) => (props.background = e.target.value))}
              style={{ width: '100%', height: '40px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Text Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setProp((props) => (props.color = e.target.value))}
              style={{ width: '100%', height: '40px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Font Size (px)</label>
            <input
              type="number"
              value={fontSize}
              onChange={(e) => setProp((props) => (props.fontSize = parseInt(e.target.value)))}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Padding (px)</label>
            <input
              type="number"
              value={padding}
              onChange={(e) => setProp((props) => (props.padding = parseInt(e.target.value)))}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Border Radius (px)</label>
            <input
              type="number"
              value={borderRadius}
              onChange={(e) => setProp((props) => (props.borderRadius = parseInt(e.target.value)))}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
        </>
      )}

      <div style={{ marginBottom: '10px', paddingTop: '10px', borderTop: '1px solid #ddd' }}>
        <h4 style={{ marginBottom: '10px', fontSize: '14px', fontWeight: 'bold' }}>Navigation</h4>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Link Type</label>
          <select
            value={linkType}
            onChange={(e) => setProp((props) => (props.linkType = e.target.value))}
            style={{ width: '100%', padding: '5px' }}
          >
            <option value="none">No Link</option>
            <option value="page">Link to Page</option>
          </select>
        </div>

        {linkType === 'page' && (
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Target Page</label>
            <select
              value={targetPageId}
              onChange={(e) => setProp((props) => (props.targetPageId = e.target.value))}
              style={{ width: '100%', padding: '5px' }}
            >
              <option value="">Select a page</option>
              {pages.map((page) => (
                <option key={page.id} value={page.id}>
                  {page.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
