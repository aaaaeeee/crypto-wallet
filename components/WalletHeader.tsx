import React, { useContext } from 'react';
import { View, TouchableOpacity, ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import { AppContext } from '../context/appContext';
import { theme } from '../styles/theme';
import AppText from './AppText';
import { FontAwesome5 } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import { mainGraph } from './icons';
import { Asset } from 'expo-asset';
const Container = styled(View)`
  height: 240px;
  margin-bottom: 16px;
`;

const Texts = styled(View)`
  width: 200px;
  margin-top: 21px;
  flex-direction: row;
  justify-content: space-between;
`;
const Buttons = styled(View)`
  margin-top: 21px;
  flex-direction: row;
  justify-content: center;
`;

const Button = styled(TouchableOpacity)`
  padding: 10px 13px;
  background-color: ${theme.mainDarkest};
  border-radius: 10px;
  margin-right: 10px;
`;

const Background = styled(ImageBackground)`
  width: 100%;
  height: 100%;
  flex: 1;
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
      <Background
        resizeMode="cover"
        source={require('./images/main-chart.png')}
      >
        <AppText text={wallet.name} size="large" />
        <AppText currency={sum} size="xLarge" bold />
        <Texts>
          <AppText text="24h" bold />
          <AppText text="+12.15%" bold fontColor="valueGreen" />
          <AppText text="$23.800" bold fontColor="valueGreen" />
        </Texts>
        <Buttons>
          <Button>
            <AppText text="Send" bold />
          </Button>
          <Button>
            <AppText text="Receive" bold />
          </Button>
          <Button>
            <FontAwesome5 name="qrcode" size={20} color={theme.mainLightest} />
          </Button>
        </Buttons>
      </Background>
    </Container>
    // <Container>
    //   <ImageBackground
    //     source={{
    //       uri: Asset.fromModule(require('../images/main-chart.png')).uri,
    //     }}
    //     style={{ flex: 1, width: 200, height: 200 }}
    //   ></ImageBackground>
    //   <AppText text={wallet.name} size="large" />
    //   <AppText currency={sum} size="xLarge" bold />
    //   <Buttons>
    //     <Button>
    //       <AppText text="Send" bold />
    //     </Button>
    //     <Button>
    //       <AppText text="Receive" bold />
    //     </Button>
    //     <Button>
    //       <FontAwesome5 name="qrcode" size={20} color={theme.mainLightest} />
    //     </Button>
    //   </Buttons>
    // </Container>
  );
};

export default WalletHeader;
