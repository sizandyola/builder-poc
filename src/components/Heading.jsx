import React from 'react';
import { useNode } from '@craftjs/core';
import { useData } from '../context/DataContext';

export const Heading = ({ text, level, color, textAlign, marginTop, marginBottom, usePageInfoTitle }) => {
  const {
    connectors: { connect, drag },
    selected,
    hovered
  } = useNode((state) => ({
    selected: state.events.selected,
    hovered: state.events.hovered
  }));
  const dataContext = useData();
  const pageInfo = dataContext?.pageInfo;

  const Tag = `h${level}`;
  const defaultSizes = { 1: 48, 2: 40, 3: 32, 4: 24, 5: 20, 6: 16 };

  const displayText = usePageInfoTitle && pageInfo?.title ? pageInfo.title : text;

  // Determine border style based on selection/hover state
  let borderStyle = 'none';
  if (selected) {
    borderStyle = '2px solid #3b82f6';
  } else if (hovered) {
    borderStyle = '2px dashed #3b82f6';
  }

  return (
    <Tag
      ref={ref => connect(drag(ref))}
      style={{
        fontSize: `${defaultSizes[level]}px`,
        fontWeight: 'bold',
        color: color,
        textAlign: textAlign,
        marginTop: `${marginTop}px`,
        marginBottom: `${marginBottom}px`,
        border: borderStyle,
        outline: selected ? '2px solid rgba(59, 130, 246, 0.3)' : 'none',
        outlineOffset: selected ? '2px' : '0',
        transition: 'all 0.15s ease',
      }}
    >
      {displayText}
    </Tag>
  );
};

Heading.craft = {
  displayName: 'Heading',
  props: {
    text: 'Heading Text',
    level: 2,
    color: '#000000',
    textAlign: 'left',
    marginTop: 0,
    marginBottom: 10,
    usePageInfoTitle: false,
  },
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: HeadingSettings,
  },
};

function HeadingSettings() {
  const { actions: { setProp }, text, level, color, textAlign, marginTop, marginBottom, usePageInfoTitle } = useNode((node) => ({
    text: node.data.props.text,
    level: node.data.props.level,
    color: node.data.props.color,
    textAlign: node.data.props.textAlign,
    marginTop: node.data.props.marginTop,
    marginBottom: node.data.props.marginBottom,
    usePageInfoTitle: node.data.props.usePageInfoTitle,
  }));

  return (
    <div style={{ padding: '10px' }}>
      <h3 style={{ marginBottom: '10px' }}>Heading Settings</h3>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <input
            type="checkbox"
            checked={usePageInfoTitle}
            onChange={(e) => setProp((props) => (props.usePageInfoTitle = e.target.checked))}
          />
          <span>Use Page Info Title</span>
        </label>
      </div>

      {!usePageInfoTitle && (
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setProp((props) => (props.text = e.target.value))}
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
      )}

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Level (H1-H6)</label>
        <select
          value={level}
          onChange={(e) => setProp((props) => (props.level = parseInt(e.target.value)))}
          style={{ width: '100%', padding: '5px' }}
        >
          <option value="1">H1</option>
          <option value="2">H2</option>
          <option value="3">H3</option>
          <option value="4">H4</option>
          <option value="5">H5</option>
          <option value="6">H6</option>
        </select>
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
