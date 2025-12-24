import React from 'react';
import { useNode } from '@craftjs/core';
import { useData } from '../context/DataContext';

export const ResourceCard = ({ resourceType, cardStyle, gap, columns, showImage }) => {
  const { connectors: { connect, drag } } = useNode();
  const dataContext = useData();
  const resources = dataContext?.resources;

  const resourceData = resources?.[resourceType] || [];

  const renderCard = (item) => {
    return (
      <div
        key={item.id}
        style={{
          border: cardStyle === 'bordered' ? '1px solid #ddd' : 'none',
          borderRadius: '8px',
          padding: '20px',
          backgroundColor: cardStyle === 'elevated' ? '#fff' : 'transparent',
          boxShadow: cardStyle === 'elevated' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
          cursor: 'pointer',
          transition: 'transform 0.2s',
        }}
        onMouseOver={(e) => {
          if (cardStyle === 'elevated') {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
          }
        }}
        onMouseOut={(e) => {
          if (cardStyle === 'elevated') {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
          }
        }}
      >
        {showImage && (item.thumbnail_url || item.image) && (
          <img
            src={item.thumbnail_url || item.image}
            alt={item.title}
            style={{
              width: '100%',
              height: '150px',
              objectFit: 'cover',
              borderRadius: '4px',
              marginBottom: '12px',
            }}
          />
        )}

        {item.icon && (
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>
            <i className={item.icon}></i>
          </div>
        )}

        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
          {item.title}
        </h3>

        {item.description && (
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
            {item.description}
          </p>
        )}

        {item.excerpt && (
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
            {item.excerpt}
          </p>
        )}

        {resourceType === 'documents' && (
          <div style={{ fontSize: '12px', color: '#888' }}>
            <span>{item.type}</span>
          </div>
        )}

        {resourceType === 'links' && item.url && (
          <a
            href={item.url}
            target={item.open_in_external ? '_blank' : '_self'}
            rel="noopener noreferrer"
            style={{ fontSize: '12px', color: '#3b82f6' }}
          >
            Visit Link →
          </a>
        )}

        {resourceType === 'contacts' && (
          <div style={{ fontSize: '14px', color: '#444', marginTop: '8px' }}>
            <strong>{item.value}</strong>
            {item.type === 1 && <span style={{ marginLeft: '8px' }}>📧</span>}
            {item.type === 2 && <span style={{ marginLeft: '8px' }}>📞</span>}
            {item.type === 4 && <span style={{ marginLeft: '8px' }}>📍</span>}
          </div>
        )}

        {resourceType === 'calculators' && item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              marginTop: '8px',
              padding: '8px 16px',
              background: '#3b82f6',
              color: '#fff',
              borderRadius: '4px',
              textDecoration: 'none',
              fontSize: '14px',
            }}
          >
            Open Calculator
          </a>
        )}

        {resourceType === 'calculator_v2' && (
          <div style={{ fontSize: '12px', color: '#888', marginTop: '8px' }}>
            Type: {item.calculator_type}
          </div>
        )}
      </div>
    );
  };

  return (
    <div ref={ref => connect(drag(ref))} style={{ padding: '20px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: `${gap}px`,
        }}
      >
        {resourceData.map(renderCard)}
      </div>
      {resourceData.length === 0 && (
        <div
          style={{
            padding: '40px',
            textAlign: 'center',
            color: '#999',
            border: '2px dashed #ddd',
            borderRadius: '8px',
          }}
        >
          {resourceType
            ? `No ${resourceType} found in resources`
            : 'Select a resource type from settings'}
        </div>
      )}
    </div>
  );
};

ResourceCard.craft = {
  displayName: 'ResourceCard',
  props: {
    resourceType: 'documents',
    cardStyle: 'elevated',
    gap: 20,
    columns: 3,
    showImage: true,
  },
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: ResourceCardSettings,
  },
};

function ResourceCardSettings() {
  const { actions: { setProp }, resourceType, cardStyle, gap, columns, showImage } = useNode((node) => ({
    resourceType: node.data.props.resourceType,
    cardStyle: node.data.props.cardStyle,
    gap: node.data.props.gap,
    columns: node.data.props.columns,
    showImage: node.data.props.showImage,
  }));

  return (
    <div style={{ padding: '10px' }}>
      <h3 style={{ marginBottom: '10px' }}>Resource Card Settings</h3>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Resource Type</label>
        <select
          value={resourceType}
          onChange={(e) => setProp((props) => (props.resourceType = e.target.value))}
          style={{ width: '100%', padding: '5px' }}
        >
          <option value="documents">Documents</option>
          <option value="links">Links</option>
          <option value="contacts">Contacts</option>
          <option value="calculators">Calculators</option>
          <option value="calculator_v2">Calculator V2</option>
        </select>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <input
            type="checkbox"
            checked={showImage}
            onChange={(e) => setProp((props) => (props.showImage = e.target.checked))}
          />
          <span>Show Images/Thumbnails</span>
        </label>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Card Style</label>
        <select
          value={cardStyle}
          onChange={(e) => setProp((props) => (props.cardStyle = e.target.value))}
          style={{ width: '100%', padding: '5px' }}
        >
          <option value="elevated">Elevated (with shadow)</option>
          <option value="bordered">Bordered</option>
          <option value="flat">Flat</option>
        </select>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Columns</label>
        <input
          type="number"
          min="1"
          max="6"
          value={columns}
          onChange={(e) => setProp((props) => (props.columns = parseInt(e.target.value)))}
          style={{ width: '100%', padding: '5px' }}
        />
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
