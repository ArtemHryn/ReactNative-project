import { Image, StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import userPhoto from "../../images/userPhoto.png";
import { useCallback } from "react";

SplashScreen.preventAutoHideAsync();

const fonts = ["Roboto", "RobotoRegular", 'RobotoBold'];

export const PostsScreen = () => {
  const [fontsLoaded] = useFonts({
    [fonts[0]]: require("../../assets/fonts/Roboto-Medium.ttf"),
    [fonts[1]]: require("../../assets/fonts/Roboto-Regular.ttf"),
    [fonts[2]]: require("../../assets/fonts/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

    if (!fontsLoaded) {
      return null;
    }
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.userContainer}>
        <Image source={userPhoto} style={styles.image} />
        <View>
          <Text style={{ ...styles.name, fontFamily: fonts[2] }}>
            Natali Romanova
          </Text>
          <Text style={{ ...styles.email, fontFamily: fonts[1] }}>
            email@example.com
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 8,
  },
  name: {
    fontWeight: 700,
    fontSize: 13,
    lineHeight: 15,
    color: '#212121',
  },
  email: {
    fontWeight: 400,
    fontSize: 11,
    lineHeight: 13,
    color: 'rgba(33, 33, 33, 0.8)',
  },
});
