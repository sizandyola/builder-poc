import React from 'react';
import { useNode } from '@craftjs/core';
import { useData } from '../context/DataContext';

export const Container = ({
  children,
  background,
  backgroundType = 'custom',
  paddingTop = 20,
  paddingRight = 20,
  paddingBottom = 20,
  paddingLeft = 20,
  marginTop = 0,
  marginRight = 0,
  marginBottom = 0,
  marginLeft = 0,
  flexDirection,
  alignItems,
  justifyContent,
  gap,
  height,
  minHeight
}) => {
  const {
    connectors: { connect, drag },
    selected,
    hovered
  } = useNode((state) => ({
    selected: state.events.selected,
    hovered: state.events.hovered
  }));
  const { pageInfo } = useData();

  // Determine background color based on type
  let bgColor = background || '#ffffff';
  if (backgroundType === 'primary' && pageInfo?.primary_color) {
    bgColor = pageInfo.primary_color;
  } else if (backgroundType === 'secondary' && pageInfo?.secondary_color) {
    bgColor = pageInfo.secondary_color;
  }

  // Determine border style based on selection/hover state
  let borderStyle = 'none';
  if (selected) {
    borderStyle = '2px solid #3b82f6'; // Blue solid border when selected
  } else if (hovered) {
    borderStyle = '2px dashed #3b82f6'; // Blue dashed border when hovered
  }

  return (
    <div
      ref={ref => connect(drag(ref))}
      style={{
        background: bgColor,
        paddingTop: `${paddingTop}px`,
        paddingRight: `${paddingRight}px`,
        paddingBottom: `${paddingBottom}px`,
        paddingLeft: `${paddingLeft}px`,
        marginTop: `${marginTop}px`,
        marginRight: `${marginRight}px`,
        marginBottom: `${marginBottom}px`,
        marginLeft: `${marginLeft}px`,
        display: 'flex',
        flexDirection: flexDirection || 'column',
        alignItems: alignItems || 'flex-start',
        justifyContent: justifyContent || 'flex-start',
        gap: `${gap || 10}px`,
        height: height ? `${height}px` : 'auto',
        minHeight: minHeight ? `${minHeight}px` : '100px',
        width: '100%',
        border: borderStyle,
        outline: selected ? '2px solid rgba(59, 130, 246, 0.3)' : 'none',
        outlineOffset: selected ? '2px' : '0',
        transition: 'all 0.15s ease',
        position: 'relative',
      }}
    >
      {children}
    </div>
  );
};

Container.craft = {
  displayName: 'Container',
  props: {
    background: '#ffffff',
    backgroundType: 'custom',
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 10,
    height: null,
    minHeight: 100,
  },
  rules: {
    canDrag: () => true,
    canDrop: () => true,
  },
  related: {
    settings: ContainerSettings,
  },
};

function ContainerSettings() {
  const {
    actions: { setProp },
    background,
    backgroundType,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    flexDirection,
    alignItems,
    justifyContent,
    gap,
    height,
    minHeight
  } = useNode((node) => ({
    background: node.data.props.background,
    backgroundType: node.data.props.backgroundType,
    paddingTop: node.data.props.paddingTop,
    paddingRight: node.data.props.paddingRight,
    paddingBottom: node.data.props.paddingBottom,
    paddingLeft: node.data.props.paddingLeft,
    marginTop: node.data.props.marginTop,
    marginRight: node.data.props.marginRight,
    marginBottom: node.data.props.marginBottom,
    marginLeft: node.data.props.marginLeft,
    flexDirection: node.data.props.flexDirection,
    alignItems: node.data.props.alignItems,
    justifyContent: node.data.props.justifyContent,
    gap: node.data.props.gap,
    height: node.data.props.height,
    minHeight: node.data.props.minHeight,
  }));

  return (
    <div style={{ padding: '10px' }}>
      <h3 style={{ marginBottom: '10px' }}>Container Settings</h3>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Background Type</label>
        <select
          value={backgroundType}
          onChange={(e) => setProp((props) => (props.backgroundType = e.target.value))}
          style={{ width: '100%', padding: '5px' }}
        >
          <option value="custom">Custom Color</option>
          <option value="primary">Primary Color</option>
          <option value="secondary">Secondary Color</option>
        </select>
      </div>

      {backgroundType === 'custom' && (
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Background Color</label>
          <input
            type="color"
            value={background}
            onChange={(e) => setProp((props) => (props.background = e.target.value))}
            style={{ width: '100%', height: '40px' }}
          />
        </div>
      )}

      <div style={{ marginBottom: '15px', borderTop: '1px solid #ddd', paddingTop: '10px' }}>
        <h4 style={{ marginBottom: '10px', fontSize: '14px', fontWeight: 'bold' }}>Padding (px)</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '3px', fontSize: '12px' }}>Top</label>
            <input
              type="number"
              value={paddingTop}
              onChange={(e) => setProp((props) => (props.paddingTop = parseInt(e.target.value) || 0))}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '3px', fontSize: '12px' }}>Right</label>
            <input
              type="number"
              value={paddingRight}
              onChange={(e) => setProp((props) => (props.paddingRight = parseInt(e.target.value) || 0))}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '3px', fontSize: '12px' }}>Bottom</label>
            <input
              type="number"
              value={paddingBottom}
              onChange={(e) => setProp((props) => (props.paddingBottom = parseInt(e.target.value) || 0))}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '3px', fontSize: '12px' }}>Left</label>
            <input
              type="number"
              value={paddingLeft}
              onChange={(e) => setProp((props) => (props.paddingLeft = parseInt(e.target.value) || 0))}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '15px', borderTop: '1px solid #ddd', paddingTop: '10px' }}>
        <h4 style={{ marginBottom: '10px', fontSize: '14px', fontWeight: 'bold' }}>Margin (px)</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '3px', fontSize: '12px' }}>Top</label>
            <input
              type="number"
              value={marginTop}
              onChange={(e) => setProp((props) => (props.marginTop = parseInt(e.target.value) || 0))}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '3px', fontSize: '12px' }}>Right</label>
            <input
              type="number"
              value={marginRight}
              onChange={(e) => setProp((props) => (props.marginRight = parseInt(e.target.value) || 0))}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '3px', fontSize: '12px' }}>Bottom</label>
            <input
              type="number"
              value={marginBottom}
              onChange={(e) => setProp((props) => (props.marginBottom = parseInt(e.target.value) || 0))}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '3px', fontSize: '12px' }}>Left</label>
            <input
              type="number"
              value={marginLeft}
              onChange={(e) => setProp((props) => (props.marginLeft = parseInt(e.target.value) || 0))}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Height (px) - Leave 0 for auto</label>
        <input
          type="number"
          value={height || 0}
          onChange={(e) => setProp((props) => (props.height = parseInt(e.target.value) || null))}
          style={{ width: '100%', padding: '5px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Min Height (px)</label>
        <input
          type="number"
          value={minHeight}
          onChange={(e) => setProp((props) => (props.minHeight = parseInt(e.target.value)))}
          style={{ width: '100%', padding: '5px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Direction</label>
        <select
          value={flexDirection}
          onChange={(e) => setProp((props) => (props.flexDirection = e.target.value))}
          style={{ width: '100%', padding: '5px' }}
        >
          <option value="column">Column</option>
          <option value="row">Row</option>
        </select>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Align Items</label>
        <select
          value={alignItems}
          onChange={(e) => setProp((props) => (props.alignItems = e.target.value))}
          style={{ width: '100%', padding: '5px' }}
        >
          <option value="flex-start">Start</option>
          <option value="center">Center</option>
          <option value="flex-end">End</option>
          <option value="stretch">Stretch</option>
        </select>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Justify Content</label>
        <select
          value={justifyContent}
          onChange={(e) => setProp((props) => (props.justifyContent = e.target.value))}
          style={{ width: '100%', padding: '5px' }}
        >
          <option value="flex-start">Start</option>
          <option value="center">Center</option>
          <option value="flex-end">End</option>
          <option value="space-between">Space Between</option>
          <option value="space-around">Space Around</option>
        </select>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Gap (px)</label>
        <input
          type="number"
          value={gap}
          onChange={(e) => setProp((props) => (props.gap = parseInt(e.target.value)))}
          style={{ width: '100%', padding: '5px' }}
        />
      </div>
    </div>
  );
}
