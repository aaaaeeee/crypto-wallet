import React, { useContext, useEffect } from 'react';
import { View, TouchableOpacity, Text, Dimensions, ScrollView } from "react-native";
import { PieChart } from 'react-native-svg-charts';
import styled from 'styled-components/native';

import BasicLayout from '../components/BasicLayout';
import PortfolioLineChart from '../components/PortfolioLineChart';
import { AppContext, CoinData } from '../context/appContext';
import { theme } from '../styles/theme';

const SumText = styled(Text)`
  position: absolute;
  left: 100px;
  top: 156px;
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
  top: 206px;
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

const ListContainer = styled(ScrollView)`
  margin-top: 44px;
`;

const GRAPH_COLORS = ['#8678FF', '#FF708B','#FFBA69', '#0CBABA', '#383874', '#70DDFF', '#AFFF70', '#FC70FF'];

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
      <PieChart style={{ height: deviceWidth - 100, marginTop: 48 }} data={pieData} innerRadius="90%" />
      <SumText>
          ${todaySum}
      </SumText>
      <DailyChangeContainer>
        <DailyChangeTitle>24h</DailyChangeTitle>
        <DailyChangeText>+{((todaySum - yesterdaySum) / todaySum * 100).toFixed(2)}%</DailyChangeText>
        <DailyChangeText>${(todaySum - yesterdaySum).toFixed(0)}</DailyChangeText>
      </DailyChangeContainer>

      <ListContainer>
        {todaysData.map((d, i) => (
          <PortfolioLineChart data={d} currentColor={GRAPH_COLORS[i]} todaySum={todaySum} />
        ))}
      </ListContainer>
    </BasicLayout>
  );
};

export default PortfolioScreen;
