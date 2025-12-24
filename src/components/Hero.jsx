import React from 'react';
import { useNode } from '@craftjs/core';
import ContentEditable from 'react-contenteditable';

export const Hero = ({ backgroundImage, backgroundColor, height, overlay, overlayOpacity, title, subtitle, titleColor, subtitleColor, contentAlign }) => {
  const { connectors: { connect, drag }, actions: { setProp } } = useNode();

  return (
    <div
      ref={ref => connect(drag(ref))}
      style={{
        width: '100%',
        height: `${height}px`,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundColor: backgroundColor,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: contentAlign === 'left' ? 'flex-start' : contentAlign === 'right' ? 'flex-end' : 'center',
        justifyContent: 'center',
        padding: '60px 40px',
      }}
    >
      {overlay && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#000000',
            opacity: overlayOpacity,
          }}
        />
      )}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', width: '100%' }}>
        <ContentEditable
          html={title}
          onChange={(e) => setProp((props) => (props.title = e.target.value))}
          tagName="h1"
          style={{
            fontSize: '56px',
            fontWeight: 'bold',
            color: titleColor,
            marginBottom: '20px',
            textAlign: contentAlign,
            cursor: 'text',
            outline: 'none',
          }}
        />
        <ContentEditable
          html={subtitle}
          onChange={(e) => setProp((props) => (props.subtitle = e.target.value))}
          tagName="p"
          style={{
            fontSize: '20px',
            color: subtitleColor,
            textAlign: contentAlign,
            cursor: 'text',
            outline: 'none',
          }}
        />
      </div>
    </div>
  );
};

Hero.craft = {
  displayName: 'Hero',
  props: {
    backgroundImage: '',
    backgroundColor: '#3b82f6',
    height: 500,
    overlay: false,
    overlayOpacity: 0.5,
    title: 'Your Hero Title',
    subtitle: 'A compelling subtitle that describes your product or service',
    titleColor: '#ffffff',
    subtitleColor: '#e0e0e0',
    contentAlign: 'center',
  },
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: HeroSettings,
  },
};

function HeroSettings() {
  const { actions: { setProp }, backgroundImage, backgroundColor, height, overlay, overlayOpacity, titleColor, subtitleColor, contentAlign } = useNode((node) => ({
    backgroundImage: node.data.props.backgroundImage,
    backgroundColor: node.data.props.backgroundColor,
    height: node.data.props.height,
    overlay: node.data.props.overlay,
    overlayOpacity: node.data.props.overlayOpacity,
    titleColor: node.data.props.titleColor,
    subtitleColor: node.data.props.subtitleColor,
    contentAlign: node.data.props.contentAlign,
  }));

  return (
    <div style={{ padding: '10px' }}>
      <h3 style={{ marginBottom: '10px' }}>Hero Settings</h3>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Background Image URL</label>
        <input
          type="text"
          value={backgroundImage}
          onChange={(e) => setProp((props) => (props.backgroundImage = e.target.value))}
          style={{ width: '100%', padding: '5px' }}
          placeholder="https://example.com/hero.jpg"
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Background Color</label>
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => setProp((props) => (props.backgroundColor = e.target.value))}
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
        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <input
            type="checkbox"
            checked={overlay}
            onChange={(e) => setProp((props) => (props.overlay = e.target.checked))}
          />
          Dark Overlay
        </label>
      </div>

      {overlay && (
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Overlay Opacity</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="1"
            value={overlayOpacity}
            onChange={(e) => setProp((props) => (props.overlayOpacity = parseFloat(e.target.value)))}
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
      )}

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Content Alignment</label>
        <select
          value={contentAlign}
          onChange={(e) => setProp((props) => (props.contentAlign = e.target.value))}
          style={{ width: '100%', padding: '5px' }}
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Title Color</label>
        <input
          type="color"
          value={titleColor}
          onChange={(e) => setProp((props) => (props.titleColor = e.target.value))}
          style={{ width: '100%', height: '40px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Subtitle Color</label>
        <input
          type="color"
          value={subtitleColor}
          onChange={(e) => setProp((props) => (props.subtitleColor = e.target.value))}
          style={{ width: '100%', height: '40px' }}
        />
      </div>
    </div>
  );
}
