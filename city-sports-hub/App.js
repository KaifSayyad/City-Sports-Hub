import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './components/HomePage.js'; // Rename LandingPage to HomePage
import LoginPage from './components/LoginPage.js';
import SignupPage from './components/SignupPage.js';
import SportsNews from './components/SportsNews.js';
import HomeLoggedIn from './components/HomeLoggedIn.js'; // Add HomeLoggedIn import

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
        <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="SignupPage" component={SignupPage} options={{ headerShown: false }} />
        <Stack.Screen name="SportsNews" component={SportsNews} options={{ headerShown: false }} />
        <Stack.Screen name="HomeLoggedIn" component={HomeLoggedIn} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
