import React from 'react';
import { useNode } from '@craftjs/core';

export const Grid = ({ children, columns, gap, padding, background, templateMode = 'auto', customTemplate }) => {
  const {
    connectors: { connect, drag },
    selected,
    hovered
  } = useNode((state) => ({
    selected: state.events.selected,
    hovered: state.events.hovered
  }));

  // Determine grid template based on mode
  const gridTemplateColumns = templateMode === 'custom' && customTemplate
    ? customTemplate
    : `repeat(${columns}, 1fr)`;

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
        display: 'grid',
        gridTemplateColumns: gridTemplateColumns,
        gap: `${gap}px`,
        padding: `${padding}px`,
        background: background,
        width: '100%',
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

Grid.craft = {
  displayName: 'Grid',
  props: {
    columns: 3,
    gap: 20,
    padding: 20,
    background: '#ffffff',
    templateMode: 'auto',
    customTemplate: '1fr 1fr 1fr',
  },
  rules: {
    canDrag: () => true,
    canDrop: () => true,
  },
  related: {
    settings: GridSettings,
  },
};

function GridSettings() {
  const { actions: { setProp }, columns, gap, padding, background, templateMode, customTemplate } = useNode((node) => ({
    columns: node.data.props.columns,
    gap: node.data.props.gap,
    padding: node.data.props.padding,
    background: node.data.props.background,
    templateMode: node.data.props.templateMode,
    customTemplate: node.data.props.customTemplate,
  }));

  return (
    <div style={{ padding: '10px' }}>
      <h3 style={{ marginBottom: '10px' }}>Grid Settings</h3>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Template Mode</label>
        <select
          value={templateMode}
          onChange={(e) => setProp((props) => (props.templateMode = e.target.value))}
          style={{ width: '100%', padding: '5px' }}
        >
          <option value="auto">Auto (Equal Columns)</option>
          <option value="custom">Custom Template</option>
        </select>
      </div>

      {templateMode === 'auto' ? (
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Columns</label>
          <input
            type="number"
            min="1"
            max="12"
            value={columns}
            onChange={(e) => setProp((props) => (props.columns = parseInt(e.target.value)))}
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
      ) : (
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Custom Grid Template</label>
          <input
            type="text"
            value={customTemplate}
            onChange={(e) => setProp((props) => (props.customTemplate = e.target.value))}
            placeholder="e.g., 1fr 2fr 1fr or 200px auto 1fr"
            style={{ width: '100%', padding: '5px' }}
          />
          <small style={{ color: '#666', fontSize: '11px' }}>
            Examples: 1fr 2fr 1fr, 200px auto 1fr, repeat(3, 1fr)
          </small>
        </div>
      )}

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
