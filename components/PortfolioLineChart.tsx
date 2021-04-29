import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from "react-native";
import styled from 'styled-components/native';
import { theme } from '../styles/theme';

const Container = styled(TouchableOpacity)<{ isOpen: boolean }>`
  background-color: ${props => props.isOpen ? theme.mainDark : 'transparent'};
`;

const ListRow = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 40px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 6px;
`;

const Symbol = styled(Text)`
  margin-left: 12px;
  font-family: regular;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  width: 42px;
  color: ${theme.mainLightest};
`;

const Percentage = styled(Symbol)`
  width: 50px;
  text-align: right;
`

const ProgressBar = styled(View)`
  position: relative;
  margin-left: 12px;
  width: 220px;
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
  width: ${props => props.amount * 2.2}px;
  height: 6px;
  background: ${props => props.color};
  z-index: 2;
`;

const OpenContainer = styled(View)`
`;

const DataRow = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  padding-left: 24px;
  padding-right: 12px;
  height: 30px;
`;

const DataTitle = styled(Text)`
    font-family: regular;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 18px;
    color: ${theme.mainLightest};
`;

const DataValue = styled(DataTitle)`
    color: ${theme.valueGreen};
`;

type Props = {
    currentColor: string
    data: {
        coinAmount: number
        coinPriceOnPurchace: number
        currentPrice: number
        id: string
        name: string
        purchaseAmount: number
        purchaseDate: string
        symbol: string
        yesterdayPrice: number
    }
    todaySum: number
};

export const PortfolioLineChart = ({ currentColor, data, todaySum }: Props) => {
    const [open, setOpen] = React.useState(false);
  
    const totalValue = Math.floor(Math.random() * 100000) + 10000
    const pvlValue = Math.floor(Math.random() * 100000) + 1000
    const pvlPercentage = Math.floor(Math.random() * 100) + 1
    const percentage = parseFloat((data.currentPrice / todaySum * 100).toFixed(2));
    return (
        <Container isOpen={open}>
            <ListRow onPress={() => setOpen(!open)}>
                <Point color={currentColor} />
                <Symbol>{data.symbol.toUpperCase()}</Symbol>
                <ProgressBar><ProgressFill color={currentColor} amount={percentage} /></ProgressBar>
                <Percentage>{percentage}%</Percentage>
            </ListRow>
            {open && (
                <OpenContainer>
                    <DataRow>
                        <DataTitle>Total</DataTitle>
                        <DataTitle>${totalValue}</DataTitle>
                    </DataRow>
                    <DataRow>
                        <DataTitle>PVL, $</DataTitle>
                        <DataValue>+ ${pvlValue}</DataValue>
                    </DataRow>
                    <DataRow>
                        <DataTitle>PVL, %</DataTitle>
                        <DataValue>+{pvlPercentage}%</DataValue>
                    </DataRow>
                </OpenContainer>
            )}
        </Container>
    );
};

export default PortfolioLineChart;
