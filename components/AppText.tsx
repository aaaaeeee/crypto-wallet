import React from 'react';
import { Text as DefaultText } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../styles/theme';

type Props = {
  text?: string;
  size?: 'small' | 'large' | 'base' | 'xLarge';
  bold?: boolean;
  fontColor?: string;
  currency?: number;
};

type StyleProps = {
  fontSize: number;
  bold: boolean;
  fontCol: string;
};
const StyledText = styled(DefaultText)<StyleProps>`
  color: ${({ fontCol }) => theme[fontCol]};
  font-family: ${({ bold }) => (bold ? 'bold' : 'regular')};
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: 600;
`;

const AppText = ({
  text,
  currency,
  size = 'base',
  bold = false,
  fontColor = 'mainLightest',
}: Props) => {
  let fontSize = 15;
  if (size === 'large') {
    fontSize = 18;
  }
  if (size === 'small') {
    fontSize = 13;
  }
  if (size === 'xLarge') {
    fontSize = 32;
  }
  let fontCol = fontColor;
  if (fontColor !== 'mainLightest') {
    fontCol = fontColor;
  }
  let cur;
  if (currency) {
    cur = new Intl.NumberFormat('en-EN', {
      style: 'currency',
      currency: 'USD',
    }).format(currency);
  }

  return (
    <StyledText fontSize={fontSize} bold={bold} fontCol={fontCol}>
      {cur ? cur : text}
    </StyledText>
  );
};

export default AppText;
