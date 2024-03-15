import React, { useEffect } from 'react';
import { StyleSheet, Text, TextInput, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './src/screens/WelcomeScreen.js'; // Rename LandingPage to WelcomeScreen
import HomeScreen from './src/screens/HomeScreen.js';
import LoginScreen from './src/screens/LoginScreen.js';
import SignupScreen from './src/screens/SignupScreen.js';
import NewsScreen from './src/screens/NewsScreen.js';
import CreateEventScreen from './src/screens/CreateEventScreen.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from './firebase.js';

const App = () => {
  const Stack = createStackNavigator();
  const auth = getAuth(app);
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState(null);

  // Handle user state changes
  const onAuthStateChangedHandler = (user) => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, onAuthStateChangedHandler);

    return unsubscribe;
  }, []);

  if (initializing) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        {
          (user && user.emailVerified) ? (
            <>
              <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="CreateEventScreen" component={CreateEventScreen} options={{ headerShown: false , user:user}} />
              <Stack.Screen name="NewsScreen" component={NewsScreen} options={{ headerShown: false }} />
            </>
            
          ) : (
            <>
              <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
            </>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});