import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import AllScreen from '../screens/AllScreen';
import CompleteScreen from '../screens/CompleteScreen';
import ActiveScreen from '../screens/ActiveScreen';
import SingleToDoScreen from '../screens/SingleToDoScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const AllStack = createStackNavigator(
  {
    Home: AllScreen,
    SingleTodo: SingleToDoScreen,
  },
  config
);

AllStack.navigationOptions = {
  tabBarLabel: 'All',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
         'ios-list'
      }
    />
  ),
};

AllStack.path = '';

const CompleteStack = createStackNavigator(
  {
    Complete: CompleteScreen,
    SingleTodo: SingleToDoScreen,
  },
  config
);

CompleteStack.navigationOptions = {
  tabBarLabel: 'Complete',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon 
        focused={focused} 
        name={
          'ios-done-all'
        } />
  ),
};

CompleteStack.path = '';

const ActiveStack = createStackNavigator(
  {
    Active: ActiveScreen,
    SingleTodo: SingleToDoScreen,
  },
  config
);

ActiveStack.navigationOptions = {
  tabBarLabel: 'Active',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon 
        focused={focused} 
        name={
           'ios-color-wand'
          } />
  ),
};

ActiveStack.path = '';

const tabNavigator = createBottomTabNavigator({
  AllStack,
  CompleteStack,
  ActiveStack,
});

tabNavigator.path = '';

export default tabNavigator;