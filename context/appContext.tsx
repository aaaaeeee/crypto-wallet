import React, { createContext, useState } from 'react';
import { myCoins } from './mockData';

export type CoinData = {
  name: string;
  values: {
    usd: number;
    usd_24h_change: number;
    usd_24h_vol: number;
  };
};

type Coins = {
  id: string;
  name: string;
  purchaseDate: string;
  purchaseAmount: number;
  symbol: string;
  coinPriceOnPurchace: number;
  coinAmount: number;
};

type Wallet = {
  name: string;
  coins: Coins[];
};

type AppContextState = {
  fetchCoinData: () => Promise<void>;
  coinData: CoinData[];
  wallet: Wallet;
};

const initialState: AppContextState = {
  fetchCoinData: async () => {},
  coinData: [],
  wallet: { name: 'MyWallet', coins: myCoins },
};
export const AppContext = createContext<AppContextState>(initialState);

const AppProvider: React.FC = ({ children }) => {
  const [coinData, setCoinData] = useState<any>(initialState.coinData);
  const [wallet, setWallet] = useState<Wallet>(initialState.wallet);
  const fetchCoinData = async () => {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano,dec,tether,nexo,vechain,binancecoin&vs_currencies=usd&include_24hr_vol=true&include_24hr_change=true'
    );
    const json = await response.json();
    const temp = [];
    for (const [key, value] of Object.entries(json)) {
      temp.push({ name: key, values: value });
    }
    setCoinData(temp);
  };

  return (
    <AppContext.Provider value={{ fetchCoinData, coinData, wallet }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
