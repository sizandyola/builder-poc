import React from 'react';
import { useNode } from '@craftjs/core';
import ContentEditable from 'react-contenteditable';

export const Banner = ({ backgroundImage, backgroundColor, height, title, subtitle, titleColor, subtitleColor }) => {
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        position: 'relative',
      }}
    >
      <ContentEditable
        html={title}
        onChange={(e) => setProp((props) => (props.title = e.target.value))}
        tagName="h1"
        style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: titleColor,
          marginBottom: '10px',
          textAlign: 'center',
          cursor: 'text',
          outline: 'none',
        }}
      />
      <ContentEditable
        html={subtitle}
        onChange={(e) => setProp((props) => (props.subtitle = e.target.value))}
        tagName="p"
        style={{
          fontSize: '24px',
          color: subtitleColor,
          textAlign: 'center',
          cursor: 'text',
          outline: 'none',
        }}
      />
    </div>
  );
};

Banner.craft = {
  displayName: 'Banner',
  props: {
    backgroundImage: '',
    backgroundColor: '#3b82f6',
    height: 400,
    title: 'Welcome to Our Site',
    subtitle: 'Your success starts here',
    titleColor: '#ffffff',
    subtitleColor: '#e0e0e0',
  },
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: BannerSettings,
  },
};

function BannerSettings() {
  const { actions: { setProp }, backgroundImage, backgroundColor, height, titleColor, subtitleColor } = useNode((node) => ({
    backgroundImage: node.data.props.backgroundImage,
    backgroundColor: node.data.props.backgroundColor,
    height: node.data.props.height,
    titleColor: node.data.props.titleColor,
    subtitleColor: node.data.props.subtitleColor,
  }));

  return (
    <div style={{ padding: '10px' }}>
      <h3 style={{ marginBottom: '10px' }}>Banner Settings</h3>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Background Image URL</label>
        <input
          type="text"
          value={backgroundImage}
          onChange={(e) => setProp((props) => (props.backgroundImage = e.target.value))}
          style={{ width: '100%', padding: '5px' }}
          placeholder="https://example.com/image.jpg"
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
