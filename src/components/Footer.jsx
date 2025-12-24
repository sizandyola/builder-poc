import React from 'react';
import { useNode } from '@craftjs/core';

export const Footer = ({ children, background, color, padding, textAlign }) => {
  const { connectors: { connect, drag } } = useNode();

  return (
    <footer
      ref={ref => connect(drag(ref))}
      style={{
        width: '100%',
        background: background,
        color: color,
        padding: `${padding}px`,
        textAlign: textAlign,
        minHeight: '100px',
      }}
    >
      {children}
    </footer>
  );
};

Footer.craft = {
  displayName: 'Footer',
  props: {
    background: '#1f2937',
    color: '#ffffff',
    padding: 40,
    textAlign: 'center',
  },
  rules: {
    canDrag: () => true,
    canDrop: () => true,
  },
  related: {
    settings: FooterSettings,
  },
};

function FooterSettings() {
  const { actions: { setProp }, background, color, padding, textAlign } = useNode((node) => ({
    background: node.data.props.background,
    color: node.data.props.color,
    padding: node.data.props.padding,
    textAlign: node.data.props.textAlign,
  }));

  return (
    <div style={{ padding: '10px' }}>
      <h3 style={{ marginBottom: '10px' }}>Footer Settings</h3>

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
        <label style={{ display: 'block', marginBottom: '5px' }}>Padding (px)</label>
        <input
          type="number"
          value={padding}
          onChange={(e) => setProp((props) => (props.padding = parseInt(e.target.value)))}
          style={{ width: '100%', padding: '5px' }}
        />
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
        </select>
      </div>
    </div>
  );
}
