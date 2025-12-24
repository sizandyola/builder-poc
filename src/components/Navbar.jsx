import React from 'react';
import { useNode } from '@craftjs/core';

export const Navbar = ({ children, background, height, padding, boxShadow, position }) => {
  const { connectors: { connect, drag } } = useNode();

  return (
    <nav
      ref={ref => connect(drag(ref))}
      style={{
        width: '100%',
        height: `${height}px`,
        background: background,
        padding: `0 ${padding}px`,
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        boxShadow: boxShadow ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
        position: position,
        top: position === 'sticky' || position === 'fixed' ? 0 : 'auto',
        zIndex: position === 'sticky' || position === 'fixed' ? 100 : 'auto',
      }}
    >
      {children}
    </nav>
  );
};

Navbar.craft = {
  displayName: 'Navbar',
  props: {
    background: '#ffffff',
    height: 70,
    padding: 40,
    boxShadow: true,
    position: 'static',
  },
  rules: {
    canDrag: () => true,
    canDrop: () => true,
  },
  related: {
    settings: NavbarSettings,
  },
};

function NavbarSettings() {
  const { actions: { setProp }, background, height, padding, boxShadow, position } = useNode((node) => ({
    background: node.data.props.background,
    height: node.data.props.height,
    padding: node.data.props.padding,
    boxShadow: node.data.props.boxShadow,
    position: node.data.props.position,
  }));

  return (
    <div style={{ padding: '10px' }}>
      <h3 style={{ marginBottom: '10px' }}>Navbar Settings</h3>

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
        <label style={{ display: 'block', marginBottom: '5px' }}>Height (px)</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setProp((props) => (props.height = parseInt(e.target.value)))}
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
        <label style={{ display: 'block', marginBottom: '5px' }}>Position</label>
        <select
          value={position}
          onChange={(e) => setProp((props) => (props.position = e.target.value))}
          style={{ width: '100%', padding: '5px' }}
        >
          <option value="static">Static</option>
          <option value="sticky">Sticky</option>
          <option value="fixed">Fixed</option>
        </select>
      </div>
    </div>
  );
}
