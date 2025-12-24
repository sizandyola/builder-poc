import React from 'react';
import { useNode } from '@craftjs/core';

export const Badge = ({ text, background, color, fontSize, padding, borderRadius }) => {
  const { connectors: { connect, drag }, actions: { setProp } } = useNode();

  return (
    <span
      ref={ref => connect(drag(ref))}
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => setProp((props) => (props.text = e.target.textContent))}
      style={{
        display: 'inline-block',
        background: background,
        color: color,
        fontSize: `${fontSize}px`,
        padding: `${padding}px`,
        borderRadius: `${borderRadius}px`,
        fontWeight: '600',
        cursor: 'text',
        outline: 'none',
      }}
    >
      {text}
    </span>
  );
};

Badge.craft = {
  displayName: 'Badge',
  props: {
    text: 'Badge',
    background: '#3b82f6',
    color: '#ffffff',
    fontSize: 12,
    padding: 6,
    borderRadius: 4,
  },
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: BadgeSettings,
  },
};

function BadgeSettings() {
  const { actions: { setProp }, background, color, fontSize, padding, borderRadius } = useNode((node) => ({
    background: node.data.props.background,
    color: node.data.props.color,
    fontSize: node.data.props.fontSize,
    padding: node.data.props.padding,
    borderRadius: node.data.props.borderRadius,
  }));

  return (
    <div style={{ padding: '10px' }}>
      <h3 style={{ marginBottom: '10px' }}>Badge Settings</h3>

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
    </div>
  );
}
