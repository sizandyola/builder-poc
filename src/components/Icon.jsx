import React from 'react';
import { useNode } from '@craftjs/core';

export const Icon = ({ icon, size, color }) => {
  const { connectors: { connect, drag } } = useNode();

  const icons = {
    heart: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    ),
    star: (
      <svg viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    ),
    check: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    ),
    x: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    ),
    info: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
    ),
    arrow: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    ),
    menu: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    ),
    user: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    ),
  };

  return (
    <div
      ref={ref => connect(drag(ref))}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {icons[icon] || icons.heart}
    </div>
  );
};

Icon.craft = {
  displayName: 'Icon',
  props: {
    icon: 'heart',
    size: 32,
    color: '#000000',
  },
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: IconSettings,
  },
};

function IconSettings() {
  const { actions: { setProp }, icon, size, color } = useNode((node) => ({
    icon: node.data.props.icon,
    size: node.data.props.size,
    color: node.data.props.color,
  }));

  return (
    <div style={{ padding: '10px' }}>
      <h3 style={{ marginBottom: '10px' }}>Icon Settings</h3>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Icon</label>
        <select
          value={icon}
          onChange={(e) => setProp((props) => (props.icon = e.target.value))}
          style={{ width: '100%', padding: '5px' }}
        >
          <option value="heart">Heart</option>
          <option value="star">Star</option>
          <option value="check">Check</option>
          <option value="x">X</option>
          <option value="info">Info</option>
          <option value="arrow">Arrow</option>
          <option value="menu">Menu</option>
          <option value="user">User</option>
        </select>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Size (px)</label>
        <input
          type="number"
          value={size}
          onChange={(e) => setProp((props) => (props.size = parseInt(e.target.value)))}
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
    </div>
  );
}
