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
      <Text style={{ color: 'white' }}>
        Bitcoin value: {coinData.bitcoin.usd} USD
      </Text>
    </BasicLayout>
  );
};

export default WalletScreen;
