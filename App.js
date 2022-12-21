import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "./Screens/auth/LoginScreen";
import { Registration } from "./Screens/auth/RegistrationScreen";
import { Home } from "./Screens/MainScreens/Home";

const Auth = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Auth.Navigator>
        <Auth.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Auth.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={Registration}
        />
        <Auth.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
      </Auth.Navigator>
    </NavigationContainer>
  );
}
