import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import WalletScreen from '../screens/WalletScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { theme } from '../styles/theme';
const Navigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            if (route.name === 'Wallet') {
              return (
                <FontAwesome5
                  name="wallet"
                  size={20}
                  color={focused ? theme.mainLightest : theme.deactiveGrey}
                />
              );
            } else if (route.name === 'Portfolio') {
              return (
                <FontAwesome5
                  name="chart-pie"
                  size={20}
                  color={focused ? theme.mainLightest : theme.deactiveGrey}
                />
              );
            } else if (route.name === 'Buy/Sell') {
              return (
                <FontAwesome5
                  name="tag"
                  size={20}
                  color={focused ? theme.mainLightest : theme.deactiveGrey}
                />
              );
            } else if (route.name === 'Settings') {
              return (
                <FontAwesome5
                  name="cog"
                  size={20}
                  color={focused ? theme.mainLightest : theme.deactiveGrey}
                />
              );
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: theme.mainLightest,
          inactiveTintColor: theme.deactiveGrey,
          style: {
            backgroundColor: '#0D1B2A',
          },
          labelStyle: {
            fontSize: 12,
            fontFamily: 'reqular',
          },
        }}
      >
        <Tab.Screen name="Wallet" component={WalletScreen} />
        <Tab.Screen name="Portfolio" component={WalletScreen} />
        <Tab.Screen name="Buy/Sell" component={WalletScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
