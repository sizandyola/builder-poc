import React, { createContext, useContext, useState, useEffect } from 'react';

const EditorContext = createContext();

const EDITOR_MODE_KEY = 'craftjs-editor-mode';

export const useEditorMode = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditorMode must be used within EditorProvider');
  }
  return context;
};

export const EditorProvider = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(() => {
    try {
      const saved = localStorage.getItem(EDITOR_MODE_KEY);
      return saved === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(EDITOR_MODE_KEY, String(isEditMode));
    } catch (error) {
      console.error('Failed to save editor mode:', error);
    }
  }, [isEditMode]);

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  return (
    <EditorContext.Provider value={{ isEditMode, setIsEditMode, toggleEditMode }}>
      {children}
    </EditorContext.Provider>
  );
};
