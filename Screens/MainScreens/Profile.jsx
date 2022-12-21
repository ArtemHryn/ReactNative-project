import { useCallback, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

//fonts
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

//icons
import { Ionicons } from "@expo/vector-icons";

//images
import photoBG from "../../images/Photo_BG.jpg";
import addPhotoImg from "../../images/Union.png";
import deletePhotoImg from "../../images/greyCross.png";
import userPhoto from "../../images/userPhoto.png";

SplashScreen.preventAutoHideAsync();

const fonts = ["Roboto", "RobotoRegular"];

export const ProfileScreen = ({navigation}) => {
  const [isPhoto, setIsPhoto] = useState(false);
  const [fontsLoaded] = useFonts({
    [fonts[0]]: require("../../assets/fonts/Roboto-Medium.ttf"),
    // [fonts[1]]: require("../../assets/fonts/Roboto-Regular.ttf"),
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
    <View style={styles.container}>
      <ImageBackground source={photoBG} style={styles.image}>
        <View style={styles.profileContainer} onLayout={onLayoutRootView}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.backBtn}
            onPress={() => navigation.navigate("Login")}
          >
            <Ionicons name="exit-outline" size={28} color="#BDBDBD" />
          </TouchableOpacity>
          <View style={styles.photoContainer}>
            {isPhoto && <Image source={userPhoto} />}
            {isPhoto ? (
              <TouchableOpacity
                style={{ ...styles.addPhotoBtn, borderColor: "#BDBDBD" }}
                activeOpacity={0.7}
                onPress={() => setIsPhoto(false)}
              >
                <Image source={deletePhotoImg} style={styles.addPhotoImg} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.addPhotoBtn}
                activeOpacity={0.7}
                onPress={() => setIsPhoto(true)}
              >
                <Image source={addPhotoImg} style={styles.addPhotoImg} />
              </TouchableOpacity>
            )}
          </View>
          <Text style={{ ...styles.name, fontFamily: fonts[0] }}>
            Natali Romanova
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
  profileContainer: {
    backgroundColor: "#FFFFFF",
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 93,
    position: "relative",
  },
  photoContainer: {
    position: "absolute",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    left: "50%",
    transform: [{ translateY: -50 }, { translateX: -50 }],
  },
  addPhotoBtn: {
    position: "absolute",
    right: 0,
    bottom: 14,
    width: 25,
    height: 25,
    transform: [{ translateX: 12.5 }],

    alignItems: "center",
    justifyContent: "center",

    borderColor: "#FF6C00",
    borderWidth: 1,
    borderRadius: "50%",
  },
  addPhotoImg: {
    resizeMode: "cover",
    width: 15,
    height: 15,
  },
  name: {
    paddingTop: 92,
    marginBottom: 33,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: "0.01em",
    color: "#212121",
  },
  backBtn: {
      position: 'absolute',
      top: 22,
      right: 16,
  },
});
