import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Dimensions } from "react-native";
import { PieChart } from 'react-native-svg-charts';
import styled from 'styled-components/native';

import BasicLayout from '../components/BasicLayout';
import { AppContext, CoinData } from '../context/appContext';
import { theme } from '../styles/theme';

const SumText = styled(Text)`
  position: absolute;
  left: 100px;
  top: 120px;
  textAlign: center;
  font-family: regular;
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 38px;
  color: ${theme.mainLightest};
`;

const DailyChangeContainer = styled(View)`
  flex-direction: row;
  position: absolute;
  left: 120px;
  top: 170px;
`;

const DailyChangeTitle = styled(Text)`
  font-family: regular;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: ${theme.mainLight};
`;

const DailyChangeText = styled(Text)`
  padding-left: 6px;
  font-family: regular;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: ${theme.valueGreen};
`;

const ListContainer = styled(View)`
  padding-top: 44px;
`;

const ListRow = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 16px;
`;

const Data = styled(Text)`
  padding-left: 12px;
  font-family: regular;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  color: ${theme.mainLightest};
`;

const ProgressBar = styled(View)`
  position: relative;
  margin-left: 22px;
  width: 225px;
  height: 6px;
  border-radius: 3px;
  background: ${theme.mainLightest};
  z-index: 1;
`;


const Point = styled(View)<{color: string}>`
  border-radius: 10px;
  width: 8px;
  height: 8px;
  background: ${props => props.color};
`;

const ProgressFill = styled(View)<{color: string; amount: number}>`
  position: absolute;
  left: 0px;
  top: 0px;
  width: ${props => props.amount * 2.25}px;
  height: 6px;
  background: ${props => props.color};
  z-index: 2;
`;

const GRAPH_COLORS = ['#383874', '#70DDFF', '#AFFF70', '#FC70FF'];

export const PortfolioScreen = () => {
  const { fetchCoinData, coinData, wallet } = useContext(AppContext);

  useEffect(() => {
    fetchCoinData();
  }, []);

  const deviceWidth = Dimensions.get('window').width;
  const todaysData =
    wallet.coins &&
    coinData &&
    wallet.coins.map((a) => {
      const coin = coinData.find((b) => b.name === a.id) as CoinData;
      const currentPrice = coin?.values.usd * a.coinAmount;
      const yesterdayPrice = coin?.values.usd * (1 - (coin?.values.usd_24h_change / 100)) * a.coinAmount;
      return { ...a, currentPrice, yesterdayPrice };
    });
  const todaySum = parseFloat(todaysData.reduce((a, b) => a + b.currentPrice, 0).toFixed(2));
  const yesterdaySum = parseFloat(todaysData.reduce((a, b) => a + b.yesterdayPrice, 0).toFixed(2));

  const graphData = wallet.coins.map(coin => {
    const currentCoinData = coinData.find(d => d.name.toLowerCase() === coin.name.toLowerCase());
    const currentValue = currentCoinData?.values.usd || 0;

    return coin.coinAmount * currentValue;
  });

  console.log('AAAA', todaysData);

  const pieData = graphData
      .filter((value) => value > 0)
      .map((value, index) => ({
          value,
          svg: {
              fill: GRAPH_COLORS[index],
              onPress: () => console.log('press', index),
          },
          key: `pie-${index}`,
      }))
  
  return (
    <BasicLayout>
      <PieChart style={{ height: deviceWidth - 100, marginTop: 12 }} data={pieData} innerRadius="90%" />
      <SumText>
          ${todaySum}
      </SumText>
      <DailyChangeContainer>
        <DailyChangeTitle>24h</DailyChangeTitle>
        <DailyChangeText>+{((todaySum - yesterdaySum) / todaySum * 100).toFixed(2)}%</DailyChangeText>
        <DailyChangeText>${(todaySum - yesterdaySum).toFixed(0)}</DailyChangeText>
      </DailyChangeContainer>
      <ListContainer>
      {todaysData.map((d, i) => {
        const percentage = parseFloat((d.currentPrice / todaySum * 100).toFixed(2));
        return (
          <ListRow>
            <Point color={GRAPH_COLORS[i]} />
            <Data>{d.symbol.toUpperCase()}</Data>
            <ProgressBar><ProgressFill color={GRAPH_COLORS[i]} amount={percentage} /></ProgressBar>
            <Data>{percentage}%</Data>
          </ListRow>
        )
      })}
      </ListContainer>
    </BasicLayout>
  );
};

export default PortfolioScreen;
