import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePages } from '../context/PagesContext';

export const Topbar = () => {
  const navigate = useNavigate();
  const { exportPages, importPages, currentPageId } = usePages();

  const handleExport = () => {
    const json = exportPages();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'multi-page-design.json';
    link.click();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const json = event.target.result;
        importPages(json);
      };
      reader.readAsText(file);
    }
  };

  const handlePreview = () => {
    navigate(`/preview/${currentPageId}`);
  };

  return (
    <div
      style={{
        height: '60px',
        background: '#2563eb',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        borderBottom: '1px solid #1e40af',
      }}
    >
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Marketing Page Builder</h1>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={handlePreview}
          style={{
            padding: '8px 16px',
            background: '#10b981',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          Preview
        </button>

        <button
          onClick={handleExport}
          style={{
            padding: '8px 16px',
            background: '#fff',
            color: '#2563eb',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          Export All Pages
        </button>

        <label
          style={{
            padding: '8px 16px',
            background: '#fff',
            color: '#2563eb',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          Import Pages
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            style={{ display: 'none' }}
          />
        </label>
      </div>
    </div>
  );
};
