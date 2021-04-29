import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AppText from './AppText';
import styled from 'styled-components/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { AppContext, CoinData } from '../context/appContext';
import { theme as themecolors } from '../styles/theme';
import { Line, SvgXml } from 'react-native-svg';
import { bitcoin, ethereum } from './icons';
import {
  Chart,
  VerticalAxis,
  HorizontalAxis,
  Area,
} from 'react-native-responsive-linechart';
type Props = {
  coin: CoinData;
};

type StyleProps = {
  open?: boolean;
};
const Container = styled(View)`
  margin-bottom: 10px;
  padding: 16px;
  background-color: ${themecolors.mainDarkest};
`;
const Header = styled(TouchableOpacity)`
  flex-direction: row;
`;
const IconContainer = styled(View)`
  justify-content: center;
  align-items: center;
  width: 40px;
`;
const LeftContainer = styled(View)`
  flex: 1;
`;
const RightContainer = styled(View)`
  flex: 1;
  align-items: flex-end;
`;

const Body = styled(View)<StyleProps>`
  display: ${({ open }) => (open ? 'flex' : 'none')};
`;
const DateContainer = styled(View)`
  flex-direction: row;
  justify-content: space-around;
`;

const DateButton = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  padding: 15px;
`;
const CoinAccordion = ({ coin }: Props) => {
  const { wallet } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const currentCoin = wallet.coins.find((c) => c.id === coin.name);

  const currentValue = currentCoin
    ? currentCoin.coinAmount * coin.values.usd
    : 0;
  useEffect(() => {
    fetchHistoryData(currentCoin ? currentCoin?.id : 'bitcoin', 7);
  }, []);
  const fetchHistoryData = async (id: string, days: number) => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
    );
    const json = await response.json();

    const historyData = json.prices.map((h) => {
      const data = { x: h[0], y: h[1] };
      return data;
    });
    setHistory(historyData);
  };
  return (
    <Container>
      <Header onPress={() => setOpen(!open)}>
        <IconContainer>
          {coin.name === 'ethereum' && (
            <SvgXml
              height="30"
              width="30"
              xml={ethereum}
              style={{ marginRight: 12 }}
            />
          )}
          {coin.name === 'bitcoin' && (
            <SvgXml
              height="30"
              width="30"
              xml={bitcoin}
              style={{ marginRight: 12 }}
            />
          )}
        </IconContainer>
        <LeftContainer>
          <AppText text={currentCoin?.name} bold />
          <View style={{ flexDirection: 'row' }}>
            <AppText currency={coin.values.usd} fontColor="mainLight" />
            <AppText
              text={`   ${coin.values.usd_24h_change.toFixed(2)}%`}
              fontColor="valueGreen"
            />
          </View>
        </LeftContainer>
        <RightContainer>
          <AppText
            bold
            text={`${currentCoin?.coinAmount.toFixed(
              2
            )} ${currentCoin?.symbol.toUpperCase()}`}
          />
          <AppText currency={currentValue} fontColor="mainLight" />
        </RightContainer>
        <IconContainer>
          <FontAwesome5
            name="caret-down"
            size={20}
            color={themecolors.mainLightest}
          />
        </IconContainer>
      </Header>
      <Body open={open}>
        <Chart
          style={{ height: 200, width: 360 }}
          data={history}
          padding={{ left: 0, bottom: 0, right: 0, top: 20 }}
        >
          <Area
            smoothing="bezier"
            theme={{
              gradient: {
                from: { color: '#0099FF' },
                to: { color: '#0099FF', opacity: 0.2 },
              },
            }}
          />
        </Chart>
        <DateContainer>
          <DateButton
            onPress={() =>
              fetchHistoryData(currentCoin ? currentCoin?.id : 'bitcoin', 7)
            }
          >
            <AppText text="7d" />
          </DateButton>
          <DateButton
            onPress={() =>
              fetchHistoryData(currentCoin ? currentCoin?.id : 'bitcoin', 14)
            }
          >
            <AppText text="14d" />
          </DateButton>
          <DateButton
            onPress={() =>
              fetchHistoryData(currentCoin ? currentCoin?.id : 'bitcoin', 30)
            }
          >
            <AppText text="30d" />
          </DateButton>
          <DateButton
            onPress={() =>
              fetchHistoryData(currentCoin ? currentCoin?.id : 'bitcoin', 365)
            }
          >
            <AppText text="1y" />
          </DateButton>
        </DateContainer>
      </Body>
    </Container>
  );
};

export default CoinAccordion;
