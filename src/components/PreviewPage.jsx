import React from 'react';
import { Editor, Frame } from '@craftjs/core';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from './Container';
import { Text } from './Text';
import { Button } from './Button';
import { Banner } from './Banner';
import { Logo } from './Logo';
import { usePages } from '../context/PagesContext';

export const PreviewPage = () => {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const { getPageById, pages } = usePages();

  const page = pageId ? getPageById(pageId) : pages[0];

  if (!page) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Page not found</h1>
        <button onClick={() => navigate('/editor')} style={{ marginTop: '20px', padding: '10px 20px' }}>
          Back to Editor
        </button>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#fff', position: 'relative' }}>
      <button
        onClick={() => navigate('/editor')}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '10px 20px',
          background: '#2563eb',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: '500',
          zIndex: 1000,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        }}
      >
        Back to Editor
      </button>

      <Editor
        resolver={{
          Container,
          Text,
          Button,
          Banner,
          Logo,
        }}
        enabled={false}
      >
        {page.content ? (
          <Frame data={page.content}>
            <div>Loading...</div>
          </Frame>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <h2>This page is empty</h2>
            <button onClick={() => navigate('/editor')} style={{ marginTop: '20px', padding: '10px 20px' }}>
              Edit this page
            </button>
          </div>
        )}
      </Editor>
    </div>
  );
};
