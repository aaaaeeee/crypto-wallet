import React, { useEffect, useContext } from 'react';
import { Text } from 'react-native';
import AppText from '../components/AppText';
import BasicLayout from '../components/BasicLayout';
import { AppContext } from '../context/appContext';

export const WalletScreen = () => {
  const { fetchCoinData, coinData } = useContext(AppContext);

  useEffect(() => {
    fetchCoinData();
  }, []);

  return (
    <BasicLayout>
      <AppText text="Wallet" />
      {coinData.map((coin) => (
        <>
          <Text style={{ color: 'white' }}>{coin.name.toUpperCase()}</Text>
          <Text style={{ color: 'white' }}>{coin.values.usd}</Text>
        </>
      ))}
    </BasicLayout>
  );
};

export default WalletScreen;
