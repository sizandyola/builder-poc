import React, { useEffect } from 'react';
import { Editor, Frame, Element, useEditor } from '@craftjs/core';
import { Container } from './Container';
import { Text } from './Text';
import { Button } from './Button';
import { Banner } from './Banner';
import { Logo } from './Logo';
import { Toolbox } from './Toolbox';
import { SettingsPanel } from './SettingsPanel';
import { Topbar } from './Topbar';
import { PagesPanel } from './PagesPanel';
import { usePages } from '../context/PagesContext';

function EditorCanvas() {
  const { currentPageId, getCurrentPage, updatePageContent } = usePages();
  const { actions, query } = useEditor();

  const currentPage = getCurrentPage();

  useEffect(() => {
    if (currentPage && currentPage.content) {
      actions.deserialize(currentPage.content);
    } else {
      actions.deserialize(JSON.stringify({
        ROOT: {
          type: { resolvedName: 'Container' },
          isCanvas: true,
          props: { background: '#f9fafb', padding: 40 },
          displayName: 'Container',
          custom: {},
          hidden: false,
          nodes: [],
          linkedNodes: {},
        },
      }));
    }
  }, [currentPageId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const json = query.serialize();
      updatePageContent(currentPageId, json);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, currentPageId]);

  return (
    <div
      style={{
        flex: 1,
        background: '#fff',
        overflowY: 'auto',
        padding: '20px',
      }}
    >
      <Frame>
        <Element
          is={Container}
          canvas
          background="#f9fafb"
          padding={40}
          style={{ minHeight: '100%' }}
        >
          <Banner />
          <Container background="#ffffff" padding={30}>
            <Text text="<h2>Welcome to Your Page Builder</h2>" fontSize={32} fontWeight="bold" />
            <Text text="Drag and drop components from the left panel to build your marketing page. Click on any component to edit its properties in the right panel." fontSize={16} />
            <Button text="Get Started" />
          </Container>
        </Element>
      </Frame>
    </div>
  );
}

export const EditorPage = () => {
  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Editor
        resolver={{
          Container,
          Text,
          Button,
          Banner,
          Logo,
        }}
      >
        <Topbar />
        <PagesPanel />
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <Toolbox />
          <EditorCanvas />
          <SettingsPanel />
        </div>
      </Editor>
    </div>
  );
};
