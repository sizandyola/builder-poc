import React from 'react';
import { useNode } from '@craftjs/core';
import { useData } from '../context/DataContext';

export const Logo = ({ imageUrl, width, height, altText, usePageInfoLogo }) => {
  const { connectors: { connect, drag } } = useNode();
  const dataContext = useData();
  const pageInfo = dataContext?.pageInfo;

  const displayImageUrl = usePageInfoLogo && pageInfo?.logo_url ? pageInfo.logo_url : imageUrl;

  return (
    <div ref={ref => connect(drag(ref))} style={{ padding: '10px' }}>
      {displayImageUrl ? (
        <img
          src={displayImageUrl}
          alt={altText}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            objectFit: 'contain',
          }}
        />
      ) : (
        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
            background: '#e0e0e0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            color: '#666',
          }}
        >
          Logo Placeholder
        </div>
      )}
    </div>
  );
};

Logo.craft = {
  displayName: 'Logo',
  props: {
    imageUrl: '',
    width: 150,
    height: 60,
    altText: 'Company Logo',
    usePageInfoLogo: true,
  },
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: LogoSettings,
  },
};

function LogoSettings() {
  const { actions: { setProp }, imageUrl, width, height, altText, usePageInfoLogo } = useNode((node) => ({
    imageUrl: node.data.props.imageUrl,
    width: node.data.props.width,
    height: node.data.props.height,
    altText: node.data.props.altText,
    usePageInfoLogo: node.data.props.usePageInfoLogo,
  }));

  return (
    <div style={{ padding: '10px' }}>
      <h3 style={{ marginBottom: '10px' }}>Logo Settings</h3>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <input
            type="checkbox"
            checked={usePageInfoLogo}
            onChange={(e) => setProp((props) => (props.usePageInfoLogo = e.target.checked))}
          />
          <span>Use Page Info Logo URL</span>
        </label>
      </div>

      {!usePageInfoLogo && (
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setProp((props) => (props.imageUrl = e.target.value))}
            style={{ width: '100%', padding: '5px' }}
            placeholder="https://example.com/logo.png"
          />
        </div>
      )}

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Width (px)</label>
        <input
          type="number"
          value={width}
          onChange={(e) => setProp((props) => (props.width = parseInt(e.target.value)))}
          style={{ width: '100%', padding: '5px' }}
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
        <label style={{ display: 'block', marginBottom: '5px' }}>Alt Text</label>
        <input
          type="text"
          value={altText}
          onChange={(e) => setProp((props) => (props.altText = e.target.value))}
          style={{ width: '100%', padding: '5px' }}
        />
      </div>
    </div>
  );
}
