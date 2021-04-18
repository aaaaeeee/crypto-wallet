import React from 'react';

import styled from 'styled-components/native';
import { View, SafeAreaView } from 'react-native';

type Props = {
  children: React.ReactNode;
};

const MainWrapper = styled(View)`
  height: 100%;
`;

const BasicLayout = ({ children }: Props) => {
  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: '#0D1B2A' }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#0D1B2A' }}>
        <MainWrapper>{children}</MainWrapper>
      </SafeAreaView>
    </>
  );
};

export default BasicLayout;
