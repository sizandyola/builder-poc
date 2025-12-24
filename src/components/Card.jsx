import React from 'react';
import { useNode } from '@craftjs/core';

export const Card = ({ children, padding, background, borderRadius, boxShadow, borderWidth, borderColor }) => {
  const { connectors: { connect, drag } } = useNode();

  return (
    <div
      ref={ref => connect(drag(ref))}
      style={{
        padding: `${padding}px`,
        background: background,
        borderRadius: `${borderRadius}px`,
        boxShadow: boxShadow ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
        border: `${borderWidth}px solid ${borderColor}`,
        minHeight: '100px',
      }}
    >
      {children}
    </div>
  );
};

Card.craft = {
  displayName: 'Card',
  props: {
    padding: 20,
    background: '#ffffff',
    borderRadius: 8,
    boxShadow: true,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  rules: {
    canDrag: () => true,
    canDrop: () => true,
  },
  related: {
    settings: CardSettings,
  },
};

function CardSettings() {
  const { actions: { setProp }, padding, background, borderRadius, boxShadow, borderWidth, borderColor } = useNode((node) => ({
    padding: node.data.props.padding,
    background: node.data.props.background,
    borderRadius: node.data.props.borderRadius,
    boxShadow: node.data.props.boxShadow,
    borderWidth: node.data.props.borderWidth,
    borderColor: node.data.props.borderColor,
  }));

  return (
    <div style={{ padding: '10px' }}>
      <h3 style={{ marginBottom: '10px' }}>Card Settings</h3>

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
        <label style={{ display: 'block', marginBottom: '5px' }}>Background Color</label>
        <input
          type="color"
          value={background}
          onChange={(e) => setProp((props) => (props.background = e.target.value))}
          style={{ width: '100%', height: '40px' }}
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

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <input
            type="checkbox"
            checked={boxShadow}
            onChange={(e) => setProp((props) => (props.boxShadow = e.target.checked))}
          />
          Box Shadow
        </label>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Border Width (px)</label>
        <input
          type="number"
          value={borderWidth}
          onChange={(e) => setProp((props) => (props.borderWidth = parseInt(e.target.value)))}
          style={{ width: '100%', padding: '5px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Border Color</label>
        <input
          type="color"
          value={borderColor}
          onChange={(e) => setProp((props) => (props.borderColor = e.target.value))}
          style={{ width: '100%', height: '40px' }}
        />
      </div>
    </div>
  );
}
