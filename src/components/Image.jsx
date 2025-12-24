import React from 'react';
import { useNode } from '@craftjs/core';

export const Image = ({ src, alt, width, height, objectFit, borderRadius }) => {
  const {
    connectors: { connect, drag },
    selected,
    hovered
  } = useNode((state) => ({
    selected: state.events.selected,
    hovered: state.events.hovered
  }));

  // Handle different width/height values: auto, 100%, or pixel values
  const getSize = (value) => {
    if (value === 'auto') return 'auto';
    if (value === '100%') return '100%';
    return `${value}px`;
  };

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
        display: 'inline-block',
        width: width === '100%' ? '100%' : 'auto',
        border: borderStyle,
        outline: selected ? '2px solid rgba(59, 130, 246, 0.3)' : 'none',
        outlineOffset: selected ? '2px' : '0',
        transition: 'all 0.15s ease',
      }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          style={{
            width: getSize(width),
            height: getSize(height),
            maxWidth: width !== '100%' ? '100%' : undefined,
            objectFit: objectFit,
            borderRadius: `${borderRadius}px`,
            display: 'block',
          }}
        />
      ) : (
        <div
          style={{
            width: width === 'auto' ? '300px' : getSize(width),
            height: height === 'auto' ? '200px' : getSize(height),
            background: '#e0e0e0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: `${borderRadius}px`,
            fontSize: '14px',
            color: '#666',
          }}
        >
          Image Placeholder
        </div>
      )}
    </div>
  );
};

Image.craft = {
  displayName: 'Image',
  props: {
    src: '',
    alt: 'Image',
    width: 'auto',
    height: 'auto',
    objectFit: 'cover',
    borderRadius: 0,
  },
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: ImageSettings,
  },
};

function ImageSettings() {
  const { actions: { setProp }, src, alt, width, height, objectFit, borderRadius } = useNode((node) => ({
    src: node.data.props.src,
    alt: node.data.props.alt,
    width: node.data.props.width,
    height: node.data.props.height,
    objectFit: node.data.props.objectFit,
    borderRadius: node.data.props.borderRadius,
  }));

  return (
    <div style={{ padding: '10px' }}>
      <h3 style={{ marginBottom: '10px' }}>Image Settings</h3>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Image URL</label>
        <input
          type="text"
          value={src}
          onChange={(e) => setProp((props) => (props.src = e.target.value))}
          style={{ width: '100%', padding: '5px' }}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Alt Text</label>
        <input
          type="text"
          value={alt}
          onChange={(e) => setProp((props) => (props.alt = e.target.value))}
          style={{ width: '100%', padding: '5px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Width</label>
        <div style={{ display: 'flex', gap: '5px', marginBottom: '5px' }}>
          <button
            onClick={() => setProp((props) => (props.width = 'auto'))}
            style={{
              flex: 1,
              padding: '5px',
              background: width === 'auto' ? '#3b82f6' : '#e5e7eb',
              color: width === 'auto' ? '#fff' : '#000',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            Auto
          </button>
          <button
            onClick={() => setProp((props) => (props.width = '100%'))}
            style={{
              flex: 1,
              padding: '5px',
              background: width === '100%' ? '#3b82f6' : '#e5e7eb',
              color: width === '100%' ? '#fff' : '#000',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            100%
          </button>
        </div>
        <input
          type="text"
          value={width}
          onChange={(e) => setProp((props) => (props.width = e.target.value))}
          placeholder="e.g., 300, auto, 100%"
          style={{ width: '100%', padding: '5px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Height</label>
        <div style={{ display: 'flex', gap: '5px', marginBottom: '5px' }}>
          <button
            onClick={() => setProp((props) => (props.height = 'auto'))}
            style={{
              flex: 1,
              padding: '5px',
              background: height === 'auto' ? '#3b82f6' : '#e5e7eb',
              color: height === 'auto' ? '#fff' : '#000',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            Auto
          </button>
          <button
            onClick={() => setProp((props) => (props.height = '100%'))}
            style={{
              flex: 1,
              padding: '5px',
              background: height === '100%' ? '#3b82f6' : '#e5e7eb',
              color: height === '100%' ? '#fff' : '#000',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            100%
          </button>
        </div>
        <input
          type="text"
          value={height}
          onChange={(e) => setProp((props) => (props.height = e.target.value))}
          placeholder="e.g., 200, auto, 100%"
          style={{ width: '100%', padding: '5px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Object Fit</label>
        <select
          value={objectFit}
          onChange={(e) => setProp((props) => (props.objectFit = e.target.value))}
          style={{ width: '100%', padding: '5px' }}
        >
          <option value="cover">Cover</option>
          <option value="contain">Contain</option>
          <option value="fill">Fill</option>
          <option value="none">None</option>
        </select>
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
    </div>
  );
}
