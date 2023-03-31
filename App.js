import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { useDispatch } from "react-redux";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { useRoute } from "./src/helper/router";
import { getStateChange } from "./src/redux/auth/selectors";
import { logout } from "./src/redux/auth/operations";

const loadFonts = async () => {
  await Font.loadAsync({
    Roboto: require("./assets/fonts/Roboto-Medium.ttf"),
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
  });
};

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsIsLoaded, setFontsIsLoaded] = useState(false);
  const isAuth = useSelector(getStateChange);
  const navigation = useNavigationContainerRef();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout())
  }

  useEffect(() => {
    const authStateCheck = async () => {
      await onAuthStateChanged(auth, async (user) => {
        dispatch(checkaAuthState(user));
      });
    };
    authStateCheck();
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

  const routing = useRoute(isAuth, onLogout);

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer ref={navigation}>{routing}</NavigationContainer>
    </View>
  );
}
