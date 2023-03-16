import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "./Screens/auth/LoginScreen";
import { Registration } from "./Screens/auth/RegistrationScreen";
import { Home } from "./Screens/MainScreens/Home";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";

const loadFonts = async () => {
  await Font.loadAsync({
    Roboto: require("./assets/fonts/Roboto-Medium.ttf"),
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
  });
};

SplashScreen.preventAutoHideAsync();

const Auth = createStackNavigator();

export default function App() {
  const [fontsIsLoaded, setFontsIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await loadFonts();
        setFontsIsLoaded(true);
      } catch (e) {
        console.warn(e);
      }
    })();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsIsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsIsLoaded]);

  if (!fontsIsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Auth.Navigator initialRouteName="Login">
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
    </View>
  );
}
