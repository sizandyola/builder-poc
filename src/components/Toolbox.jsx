import React, { useState } from 'react';
import { Element, useEditor } from '@craftjs/core';
import { Container } from './Container';
import { Grid } from './Grid';
import { Columns, Column } from './Columns';
import { Spacer } from './Spacer';
import { Divider } from './Divider';
import { Text } from './Text';
import { Heading } from './Heading';
import { Image } from './Image';
import { Button } from './Button';
import { Logo } from './Logo';
import { LinksCard } from './LinksCard';
import { ResourceCard } from './ResourceCard';
import { SplitHero } from './SplitHero';

const ToolboxButton = ({ children, onRef, style = {} }) => (
  <button
    ref={onRef}
    style={{
      padding: '10px',
      background: '#fff',
      border: '1px solid #ddd',
      borderRadius: '5px',
      cursor: 'move',
      fontWeight: '500',
      fontSize: '13px',
      textAlign: 'left',
      transition: 'all 0.2s',
      ...style,
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.background = '#f0f9ff';
      e.currentTarget.style.borderColor = '#3b82f6';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.background = '#fff';
      e.currentTarget.style.borderColor = '#ddd';
    }}
  >
    {children}
  </button>
);

const ToolboxSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div style={{ marginBottom: '20px' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '8px 12px',
          background: '#e5e7eb',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '14px',
          textAlign: 'left',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px',
        }}
      >
        {title}
        <span>{isOpen ? '▼' : '▶'}</span>
      </button>
      {isOpen && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {children}
        </div>
      )}
    </div>
  );
};

export const Toolbox = () => {
  const { connectors } = useEditor();

  return (
    <div
      style={{
        width: '300px',
        background: '#f9fafb',
        padding: '20px',
        borderRight: '1px solid #e5e7eb',
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      <h2 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>
        Components
      </h2>

      {/* Layout Components */}
      <ToolboxSection title="Layout">
        <ToolboxButton
          onRef={(ref) =>
            connectors.create(
              ref,
              <Element is={Container} canvas>
                <Text text="Container" />
              </Element>
            )
          }
        >
          📦 Container
        </ToolboxButton>

        <ToolboxButton
          onRef={(ref) =>
            connectors.create(
              ref,
              <Element is={Grid} canvas />
            )
          }
        >
          ⊞ Grid
        </ToolboxButton>

        <ToolboxButton
          onRef={(ref) =>
            connectors.create(
              ref,
              <Element is={Columns} canvas>
                <Element is={Column} canvas>
                  <Text text="Column 1" />
                </Element>
                <Element is={Column} canvas>
                  <Text text="Column 2" />
                </Element>
              </Element>
            )
          }
        >
          ⫴ Columns
        </ToolboxButton>

        <ToolboxButton onRef={(ref) => connectors.create(ref, <Spacer />)}>
          ↕ Spacer
        </ToolboxButton>

        <ToolboxButton onRef={(ref) => connectors.create(ref, <Divider />)}>
          ─ Divider
        </ToolboxButton>
      </ToolboxSection>

      {/* Content Components */}
      <ToolboxSection title="Content">
        <ToolboxButton onRef={(ref) => connectors.create(ref, <Heading />)}>
          H Heading
        </ToolboxButton>

        <ToolboxButton onRef={(ref) => connectors.create(ref, <Text />)}>
          T Text
        </ToolboxButton>

        <ToolboxButton onRef={(ref) => connectors.create(ref, <Image />)}>
          🖼 Image
        </ToolboxButton>

        <ToolboxButton onRef={(ref) => connectors.create(ref, <Logo />)}>
          🎨 Logo
        </ToolboxButton>
      </ToolboxSection>

      {/* UI Components */}
      <ToolboxSection title="UI Components">
        <ToolboxButton onRef={(ref) => connectors.create(ref, <Button />)}>
          🔘 Button
        </ToolboxButton>

        <ToolboxButton onRef={(ref) => connectors.create(ref, <SplitHero />)}>
          🎭 Split Hero
        </ToolboxButton>

        <ToolboxButton onRef={(ref) => connectors.create(ref, <LinksCard />)}>
          🔗 Links Card
        </ToolboxButton>

        <ToolboxButton onRef={(ref) => connectors.create(ref, <ResourceCard />)}>
          📚 Resource Card
        </ToolboxButton>
      </ToolboxSection>
    </div>
  );
};
