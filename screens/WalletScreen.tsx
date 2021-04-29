import React, { useEffect, useContext } from 'react';
import BasicLayout from '../components/BasicLayout';
import CoinAccordion from '../components/CoinAccordion';
import WalletHeader from '../components/WalletHeader';
import { AppContext } from '../context/appContext';
import { ScrollView } from 'react-native';
export const WalletScreen = () => {
  const { fetchCoinData, coinData, wallet } = useContext(AppContext);

  useEffect(() => {
    fetchCoinData();
  }, []);

  return (
    <BasicLayout>
      <ScrollView>
        <WalletHeader />
        {coinData.map((coin) => (
          <CoinAccordion coin={coin} key={coin.name} />
        ))}
      </ScrollView>
    </BasicLayout>
  );
};

export default WalletScreen;
