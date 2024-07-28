// StackNavigator.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DailyScreen from './screens/DailyScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import LevelsScreen from './screens/LevelsScreen';
import QuestionsScreen from './screens/QuestionsScreen';
import QuestionsListScreen from './screens/QuestionsListScreen';
import SettingsScreen from './screens/SettingsScreen';
import LanguageScreen from './screens/LanguageScreen';

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="DailyScreen" component={DailyScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="LevelsScreen" component={LevelsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="QuestionsListScreen" component={QuestionsListScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="QuestionsScreen" component={QuestionsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="LanguageScreen" component={LanguageScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;
