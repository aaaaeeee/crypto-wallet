import React, { createContext, useState } from 'react';

type coinData = {
  bitcoin: {
    usd: number;
  };
};

type AppContextState = {
  history: string[];
  fetchCoinData: () => Promise<void>;
  coinData: coinData;
};

const initialState: AppContextState = {
  history: ['yksi', 'kaksi'],
  fetchCoinData: async () => {},
  coinData: { bitcoin: { usd: 0 } },
};
export const AppContext = createContext<AppContextState>(initialState);

const AppProvider: React.FC = ({ children }) => {
  const [history, setHistory] = useState<string[]>(initialState.history);
  const [coinData, setCoinData] = useState<coinData>(initialState.coinData);
  const fetchCoinData = async () => {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
    );
    const json = await response.json();
    setCoinData(json);
  };
  return (
    <AppContext.Provider value={{ history, fetchCoinData, coinData }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
