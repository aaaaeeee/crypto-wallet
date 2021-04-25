import React from 'react';
import styled from 'styled-components/native';
import { View, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
  children: React.ReactNode;
};

const MainWrapper = styled(View)`
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
`;

const BasicLayout = ({ children }: Props) => {
  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: '#0D1B2A' }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#0D1B2A' }}>
        <MainWrapper>
          <LinearGradient
            // Background Linear Gradient
            colors={['#12243c', 'transparent']}
            shouldRasterizeIOS
            start={{ x: 0.4, y: 0.0 }}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: 600,
            }}
          />
          {children}
        </MainWrapper>
      </SafeAreaView>
    </>
  );
};

export default BasicLayout;
