import React, { useEffect, useContext } from 'react';
import BasicLayout from '../components/BasicLayout';
import CoinAccordion from '../components/CoinAccordion';
import { AppContext } from '../context/appContext';
import { ScrollView, TextInput, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../styles/theme';
import AppText from '../components/AppText';

const Container = styled(View)`
  background: transparent;
  padding: 20px;
`;
const Input = styled(TextInput)`
  margin-top: 21px;
  color: ${theme.white};
  font-size: 15px;
  font-family: 'bold';
`;
const Buttons = styled(View)`
  margin-top: 21px;
  flex-direction: row;
  justify-content: space-between;
`;

const Button = styled(TouchableOpacity)`
  padding: 10px 13px;
  background-color: ${({ active }: { active?: boolean }) =>
    active ? theme.accentBlue : theme.mainDark};
  border-radius: 10px;
`;

export const WalletScreen = () => {
  const { fetchCoinData, coinData } = useContext(AppContext);

  useEffect(() => {
    fetchCoinData();
  }, []);

  return (
    <BasicLayout>
      <Container>
        <Input placeholder="Search...." placeholderTextColor="#FFFFFF" />
        <Buttons>
          <Button active={true}>
            <AppText text="Recent" bold />
          </Button>
          <Button>
            <AppText text="Market Cap" bold />
          </Button>
          <Button>
            <AppText text="Gainers" bold />
          </Button>
          <Button>
            <AppText text="Losers" bold />
          </Button>
        </Buttons>
      </Container>
      <ScrollView>
        {coinData.map((coin) => (
          <CoinAccordion coin={coin} key={coin.name} screen="buysell" />
        ))}
      </ScrollView>
    </BasicLayout>
  );
};

export default WalletScreen;
