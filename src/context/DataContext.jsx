import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [btnResources, setBtnResources] = useState({ buttons: [] });
  const [pageInfo, setPageInfo] = useState(null);
  const [resources, setResources] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Load all three JSON files in parallel
        const [btnRes, pageRes, resourcesRes] = await Promise.all([
          fetch('/btn_resources.json').then(res => res.json()),
          fetch('/page_info.json').then(res => res.json()),
          fetch('/resources.json').then(res => res.json())
        ]);

        setBtnResources(btnRes);
        setPageInfo(pageRes);
        setResources(resourcesRes);
        setLoading(false);
      } catch (err) {
        console.error('Error loading data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const value = {
    btnResources,
    pageInfo,
    resources,
    loading,
    error
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
