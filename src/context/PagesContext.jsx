import React, { createContext, useContext, useState, useEffect } from 'react';

const PagesContext = createContext();

const API_BASE_URL = 'http://localhost:3001/api';

export const usePages = () => {
  const context = useContext(PagesContext);
  if (!context) {
    throw new Error('usePages must be used within PagesProvider');
  }
  return context;
};

export const PagesProvider = ({ children }) => {
  const [pages, setPages] = useState({ home: { id: 'home', name: 'Home', content: null } });
  const [currentPageId, setCurrentPageId] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [saveTimeout, setSaveTimeout] = useState(null);

  // Load pages from server on mount
  useEffect(() => {
    const loadPages = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/pages`);
        if (response.ok) {
          const data = await response.json();
          setPages(data);
        }
      } catch (error) {
        console.error('Failed to load pages from server:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadPages();
  }, []);

  // Save pages to server with debounce (500ms)
  useEffect(() => {
    if (!isLoading && pages) {
      // Clear existing timeout
      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }

      // Set new timeout to save after 500ms of inactivity
      const timeout = setTimeout(async () => {
        try {
          await fetch(`${API_BASE_URL}/pages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pages),
          });
          console.log('Pages auto-saved to server');
        } catch (error) {
          console.error('Failed to save pages to server:', error);
        }
      }, 500);

      setSaveTimeout(timeout);

      return () => clearTimeout(timeout);
    }
  }, [pages, isLoading]);

  const ensurePageExists = (pageId) => {
    if (!pages[pageId]) {
      setPages(prev => ({
        ...prev,
        [pageId]: {
          id: pageId,
          name: pageId,
          content: null,
        }
      }));
    }
  };

  const updatePageContent = (pageId, content) => {
    setPages(prev => ({
      ...prev,
      [pageId]: {
        ...prev[pageId],
        id: pageId,
        content,
      }
    }));
  };

  const getCurrentPage = () => {
    return pages[currentPageId] || null;
  };

  const getPageById = (pageId) => {
    return pages[pageId] || null;
  };

  const exportPages = () => {
    return JSON.stringify(pages, null, 2);
  };

  const importPages = (jsonString) => {
    try {
      const importedPages = JSON.parse(jsonString);
      setPages(importedPages);
      setCurrentPageId(Object.keys(importedPages)[0] || 'home');
    } catch (error) {
      alert('Failed to import pages: Invalid JSON');
    }
  };

  const getAllPageIds = () => {
    return Object.keys(pages);
  };

  const saveAllPagesAsDefault = async () => {
    if (pages) {
      try {
        const response = await fetch(`${API_BASE_URL}/default-home`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pages),
        });

        if (response.ok) {
          const pageCount = Object.keys(pages).length;
          alert(`✅ All pages have been saved as default!\n\n${pageCount} page(s) saved to data/default-home.json\nThese pages will be restored when you reset.`);
        } else {
          throw new Error('Server error');
        }
      } catch (error) {
        console.error('Failed to save default pages:', error);
        alert('❌ Failed to save default pages. Please try again.');
      }
    }
  };

  const resetToDefault = async () => {
    const confirmed = window.confirm(
      '⚠️ Reset to Default Pages?\n\nThis will:\n- Clear all current pages\n- Restore all saved default pages from data/default-home.json\n\nAre you sure you want to continue?'
    );

    if (confirmed) {
      try {
        const response = await fetch(`${API_BASE_URL}/reset-to-default`, {
          method: 'POST',
        });

        if (response.ok) {
          const result = await response.json();
          setPages(result.data);
          setCurrentPageId('home');
          const pageCount = Object.keys(result.data).length;
          alert(`✅ All pages restored from default!\n\n${pageCount} page(s) restored successfully.`);
        } else {
          throw new Error('Server error');
        }
      } catch (error) {
        console.error('Failed to reset to default:', error);
        alert('❌ Failed to reset. Please try again.');
      }
    }
  };

  return (
    <PagesContext.Provider
      value={{
        pages,
        currentPageId,
        setCurrentPageId,
        ensurePageExists,
        updatePageContent,
        getCurrentPage,
        getPageById,
        exportPages,
        importPages,
        getAllPageIds,
        saveAllPagesAsDefault,
        resetToDefault,
      }}
    >
      {children}
    </PagesContext.Provider>
  );
};
