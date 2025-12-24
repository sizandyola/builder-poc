import React from 'react';
import { useNode } from '@craftjs/core';

export const Divider = ({ thickness, color, marginTop, marginBottom, style }) => {
  const { connectors: { connect, drag } } = useNode();

  const styles = {
    solid: 'solid',
    dashed: 'dashed',
    dotted: 'dotted',
  };

  return (
    <div
      ref={ref => connect(drag(ref))}
      style={{
        width: '100%',
        borderTop: `${thickness}px ${styles[style]} ${color}`,
        marginTop: `${marginTop}px`,
        marginBottom: `${marginBottom}px`,
      }}
    />
  );
};

Divider.craft = {
  displayName: 'Divider',
  props: {
    thickness: 1,
    color: '#e0e0e0',
    marginTop: 20,
    marginBottom: 20,
    style: 'solid',
  },
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: DividerSettings,
  },
};

function DividerSettings() {
  const { actions: { setProp }, thickness, color, marginTop, marginBottom, style } = useNode((node) => ({
    thickness: node.data.props.thickness,
    color: node.data.props.color,
    marginTop: node.data.props.marginTop,
    marginBottom: node.data.props.marginBottom,
    style: node.data.props.style,
  }));

  return (
    <div style={{ padding: '10px' }}>
      <h3 style={{ marginBottom: '10px' }}>Divider Settings</h3>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Thickness (px)</label>
        <input
          type="number"
          value={thickness}
          onChange={(e) => setProp((props) => (props.thickness = parseInt(e.target.value)))}
          style={{ width: '100%', padding: '5px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Color</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setProp((props) => (props.color = e.target.value))}
          style={{ width: '100%', height: '40px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Style</label>
        <select
          value={style}
          onChange={(e) => setProp((props) => (props.style = e.target.value))}
          style={{ width: '100%', padding: '5px' }}
        >
          <option value="solid">Solid</option>
          <option value="dashed">Dashed</option>
          <option value="dotted">Dotted</option>
        </select>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Margin Top (px)</label>
        <input
          type="number"
          value={marginTop}
          onChange={(e) => setProp((props) => (props.marginTop = parseInt(e.target.value)))}
          style={{ width: '100%', padding: '5px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Margin Bottom (px)</label>
        <input
          type="number"
          value={marginBottom}
          onChange={(e) => setProp((props) => (props.marginBottom = parseInt(e.target.value)))}
          style={{ width: '100%', padding: '5px' }}
        />
      </div>
    </div>
  );
}
