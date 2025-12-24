import React from 'react';
import { useNode } from '@craftjs/core';
import ContentEditable from 'react-contenteditable';

export const RichText = ({ html, fontSize, color, lineHeight, padding }) => {
  const { connectors: { connect, drag }, actions: { setProp } } = useNode();

  return (
    <ContentEditable
      innerRef={ref => connect(drag(ref))}
      html={html}
      onChange={(e) => setProp((props) => (props.html = e.target.value))}
      tagName="div"
      style={{
        fontSize: `${fontSize}px`,
        color: color,
        lineHeight: lineHeight,
        padding: `${padding}px`,
        cursor: 'text',
        outline: 'none',
        minHeight: '50px',
      }}
    />
  );
};

RichText.craft = {
  displayName: 'RichText',
  props: {
    html: '<p>Edit this rich text content. You can use <strong>bold</strong>, <em>italic</em>, and other HTML formatting.</p>',
    fontSize: 16,
    color: '#000000',
    lineHeight: 1.6,
    padding: 10,
  },
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: RichTextSettings,
  },
};

function RichTextSettings() {
  const { actions: { setProp }, fontSize, color, lineHeight, padding } = useNode((node) => ({
    fontSize: node.data.props.fontSize,
    color: node.data.props.color,
    lineHeight: node.data.props.lineHeight,
    padding: node.data.props.padding,
  }));

  return (
    <div style={{ padding: '10px' }}>
      <h3 style={{ marginBottom: '10px' }}>RichText Settings</h3>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Font Size (px)</label>
        <input
          type="number"
          value={fontSize}
          onChange={(e) => setProp((props) => (props.fontSize = parseInt(e.target.value)))}
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
        <label style={{ display: 'block', marginBottom: '5px' }}>Line Height</label>
        <input
          type="number"
          step="0.1"
          value={lineHeight}
          onChange={(e) => setProp((props) => (props.lineHeight = parseFloat(e.target.value)))}
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
