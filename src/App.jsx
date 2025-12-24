import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PagesProvider } from './context/PagesContext';
import { EditorProvider } from './context/EditorContext';
import { DataProvider } from './context/DataContext';
import { MainPage } from './components/MainPage';

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <EditorProvider>
          <PagesProvider>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/:pageId" element={<MainPage />} />
            </Routes>
          </PagesProvider>
        </EditorProvider>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
