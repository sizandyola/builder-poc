import React from 'react';
import { useEditor } from '@craftjs/core';

export const SettingsPanel = () => {
  const { selected, actions } = useEditor((state, query) => {
    const currentNodeId = query.getEvent('selected').last();
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.displayName,
        settings: state.nodes[currentNodeId].related?.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected,
    };
  });

  return (
    <div
      style={{
        width: '300px',
        background: '#f5f5f5',
        padding: '20px',
        borderLeft: '1px solid #ddd',
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      <h2 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: 'bold' }}>Settings</h2>

      {selected ? (
        <div>
          <div
            style={{
              marginBottom: '20px',
              paddingBottom: '15px',
              borderBottom: '1px solid #ddd',
            }}
          >
            <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>{selected.name}</h3>
            {selected.isDeletable && (
              <button
                onClick={() => actions.delete(selected.id)}
                style={{
                  padding: '8px 16px',
                  background: '#ef4444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
              >
                Delete
              </button>
            )}
          </div>

          {selected.settings && React.createElement(selected.settings)}
        </div>
      ) : (
        <p style={{ color: '#666' }}>Select a component to edit its settings</p>
      )}
    </div>
  );
};
