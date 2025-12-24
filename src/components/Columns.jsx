import React from 'react';
import { useNode, Element } from '@craftjs/core';

export const Column = ({ children, flex, padding, background }) => {
  const {
    connectors: { connect, drag },
    selected,
    hovered
  } = useNode((state) => ({
    selected: state.events.selected,
    hovered: state.events.hovered
  }));

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
        flex: flex,
        padding: `${padding}px`,
        background: background,
        minHeight: '100px',
        border: borderStyle,
        outline: selected ? '2px solid rgba(59, 130, 246, 0.3)' : 'none',
        outlineOffset: selected ? '2px' : '0',
        transition: 'all 0.15s ease',
      }}
    >
      {children}
    </div>
  );
};

Column.craft = {
  displayName: 'Column',
  props: {
    flex: 1,
    padding: 10,
    background: 'transparent',
  },
  rules: {
    canDrag: () => true,
    canDrop: () => true,
  },
  related: {
    settings: ColumnSettings,
  },
};

function ColumnSettings() {
  const { actions: { setProp }, flex, padding, background } = useNode((node) => ({
    flex: node.data.props.flex,
    padding: node.data.props.padding,
    background: node.data.props.background,
  }));

  return (
    <div style={{ padding: '10px' }}>
      <h3 style={{ marginBottom: '10px' }}>Column Settings</h3>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Flex Ratio</label>
        <input
          type="number"
          min="1"
          value={flex}
          onChange={(e) => setProp((props) => (props.flex = parseInt(e.target.value)))}
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
        <label style={{ display: 'block', marginBottom: '5px' }}>Background Color</label>
        <input
          type="color"
          value={background}
          onChange={(e) => setProp((props) => (props.background = e.target.value))}
          style={{ width: '100%', height: '40px' }}
        />
      </div>
    </div>
  );
}

export const Columns = ({ children, gap, padding }) => {
  const { connectors: { connect, drag } } = useNode();

  return (
    <div
      ref={ref => connect(drag(ref))}
      style={{
        display: 'flex',
        gap: `${gap}px`,
        padding: `${padding}px`,
        width: '100%',
      }}
    >
      {children}
    </div>
  );
};

Columns.craft = {
  displayName: 'Columns',
  props: {
    gap: 20,
    padding: 0,
  },
  rules: {
    canDrag: () => true,
    canDrop: () => true,
  },
  related: {
    settings: ColumnsSettings,
  },
};

function ColumnsSettings() {
  const { actions: { setProp }, gap, padding } = useNode((node) => ({
    gap: node.data.props.gap,
    padding: node.data.props.padding,
  }));

  return (
    <div style={{ padding: '10px' }}>
      <h3 style={{ marginBottom: '10px' }}>Columns Settings</h3>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Gap (px)</label>
        <input
          type="number"
          value={gap}
          onChange={(e) => setProp((props) => (props.gap = parseInt(e.target.value)))}
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
    </div>
  );
}
