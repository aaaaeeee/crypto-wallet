import React from 'react';
import { Text as DefaultText } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../styles/theme';
type Props = {
  text: string;
};
const StyledText = styled(DefaultText)`
  color: ${theme.mainLightest};
  font-family: 'regular';
  font-size: 24px;
`;

const Text = ({ text }: Props) => {
  return <StyledText>{text}</StyledText>;
};

export default Text;
