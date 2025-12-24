import React from 'react';
import { useNode } from '@craftjs/core';
import { useData } from '../context/DataContext';

export const Text = ({ text, fontSize, fontWeight, color, textAlign, background, usePageInfoMessage }) => {
  const {
    connectors: { connect, drag },
    selected,
    hovered
  } = useNode((state) => ({
    selected: state.events.selected,
    hovered: state.events.hovered
  }));
  const dataContext = useData();
  const pageInfo = dataContext?.pageInfo;

  const displayText = usePageInfoMessage && pageInfo?.message ? pageInfo.message : text;

  // Determine border style based on selection/hover state
  let borderStyle = 'none';
  if (selected) {
    borderStyle = '2px solid #3b82f6';
  } else if (hovered) {
    borderStyle = '2px dashed #3b82f6';
  }

  return (
    <div
      ref={ref => connect(drag(ref))}
      style={{
        fontSize: `${fontSize}px`,
        fontWeight: fontWeight,
        color: color,
        textAlign: textAlign,
        background: background,
        padding: '10px',
        border: borderStyle,
        outline: selected ? '2px solid rgba(59, 130, 246, 0.3)' : 'none',
        outlineOffset: selected ? '2px' : '0',
        transition: 'all 0.15s ease',
      }}
      dangerouslySetInnerHTML={{ __html: displayText }}
    />
  );
};

Text.craft = {
  displayName: 'Text',
  props: {
    text: 'Edit this text',
    fontSize: 16,
    fontWeight: 'normal',
    color: '#000000',
    textAlign: 'left',
    background: 'transparent',
    usePageInfoMessage: false,
  },
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: TextSettings,
  },
};

function TextSettings() {
  const { actions: { setProp }, text, fontSize, fontWeight, color, textAlign, background, usePageInfoMessage } = useNode((node) => ({
    text: node.data.props.text,
    fontSize: node.data.props.fontSize,
    fontWeight: node.data.props.fontWeight,
    color: node.data.props.color,
    textAlign: node.data.props.textAlign,
    background: node.data.props.background,
    usePageInfoMessage: node.data.props.usePageInfoMessage,
  }));

  return (
    <div style={{ padding: '10px' }}>
      <h3 style={{ marginBottom: '10px' }}>Text Settings</h3>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <input
            type="checkbox"
            checked={usePageInfoMessage}
            onChange={(e) => setProp((props) => (props.usePageInfoMessage = e.target.checked))}
          />
          <span>Use Page Info Message</span>
        </label>
      </div>

      {!usePageInfoMessage && (
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Text (HTML supported)</label>
          <textarea
            value={text}
            onChange={(e) => setProp((props) => (props.text = e.target.value))}
            style={{ width: '100%', padding: '5px', minHeight: '80px' }}
          />
        </div>
      )}

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
        <label style={{ display: 'block', marginBottom: '5px' }}>Font Weight</label>
        <select
          value={fontWeight}
          onChange={(e) => setProp((props) => (props.fontWeight = e.target.value))}
          style={{ width: '100%', padding: '5px' }}
        >
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
          <option value="lighter">Light</option>
        </select>
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
        <label style={{ display: 'block', marginBottom: '5px' }}>Background</label>
        <div style={{ display: 'flex', gap: '5px', marginBottom: '5px' }}>
          <button
            onClick={() => setProp((props) => (props.background = 'transparent'))}
            style={{
              flex: 1,
              padding: '5px',
              background: background === 'transparent' ? '#3b82f6' : '#e5e7eb',
              color: background === 'transparent' ? '#fff' : '#000',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            Transparent
          </button>
        </div>
        <input
          type="text"
          value={background}
          onChange={(e) => setProp((props) => (props.background = e.target.value))}
          placeholder="e.g., #ffffff, rgba(255,255,255,0.5), transparent"
          style={{ width: '100%', padding: '5px', marginBottom: '5px' }}
        />
        {background !== 'transparent' && (
          <input
            type="color"
            value={background.startsWith('#') ? background : '#ffffff'}
            onChange={(e) => setProp((props) => (props.background = e.target.value))}
            style={{ width: '100%', height: '40px' }}
          />
        )}
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Text Align</label>
        <select
          value={textAlign}
          onChange={(e) => setProp((props) => (props.textAlign = e.target.value))}
          style={{ width: '100%', padding: '5px' }}
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
          <option value="justify">Justify</option>
        </select>
      </div>
    </div>
  );
}
