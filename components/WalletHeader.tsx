import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { AppContext } from '../context/appContext';
import AppText from './AppText';

const Container = styled(View)`
  height: 240px;
  justify-content: center;
  align-items: center;
`;
const WalletHeader = () => {
  const { coinData, wallet } = useContext(AppContext);
  const todaysData =
    wallet.coins &&
    coinData &&
    wallet.coins.map((a) => {
      const arg = coinData.filter((b) => b.name === a.id);
      const currentPrice = arg.map((j) => {
        return j.values.usd;
      });
      return { ...a, currentPrice: currentPrice[0] * a.coinAmount };
    });

  const sum = todaysData.reduce((a, b) => a + b.currentPrice, 0);

  return (
    <Container>
      <AppText text={wallet.name} size="large" />
      <AppText currency={sum} size="xLarge" bold />
    </Container>
  );
};

export default WalletHeader;
