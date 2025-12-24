import React from 'react';
import { useNode } from '@craftjs/core';

export const Spacer = ({ height }) => {
  const { connectors: { connect, drag } } = useNode();

  return (
    <div
      ref={ref => connect(drag(ref))}
      style={{
        height: `${height}px`,
        width: '100%',
        background: 'transparent',
      }}
    />
  );
};

Spacer.craft = {
  displayName: 'Spacer',
  props: {
    height: 40,
  },
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: SpacerSettings,
  },
};

function SpacerSettings() {
  const { actions: { setProp }, height } = useNode((node) => ({
    height: node.data.props.height,
  }));

  return (
    <div style={{ padding: '10px' }}>
      <h3 style={{ marginBottom: '10px' }}>Spacer Settings</h3>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Height (px)</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setProp((props) => (props.height = parseInt(e.target.value)))}
          style={{ width: '100%', padding: '5px' }}
        />
      </div>
    </div>
  );
}
