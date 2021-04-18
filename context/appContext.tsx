import React, { createContext, useState } from 'react';

type AppContextState = {
  history: string[];
};

const initialState: AppContextState = {
  history: ['yksi', 'kaksi'],
};
export const AppContext = createContext<AppContextState>(initialState);

const AppProvider: React.FC = ({ children }) => {
  const [history, setHistory] = useState<string[]>(initialState.history);
  return (
    <AppContext.Provider value={{ history }}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
