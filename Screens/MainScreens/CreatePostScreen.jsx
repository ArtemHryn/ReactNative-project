import { useCallback, useState } from "react";
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
//Fonts
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

//icons
import { FontAwesome5 } from "@expo/vector-icons";

SplashScreen.preventAutoHideAsync();

const fonts = ["RobotoRegular"];

export const CreatePostScreen = () => {
  const [focus, setFocus] = useState(false);
  const [dimensions, setDimensions] = useState(
    () => Dimensions.get("window").width - 16 * 2
  );
  const [fontsLoaded] = useFonts({
    [fonts[0]]: require("../../assets/fonts/Roboto-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const onTouchOutOfInput = () => {
    Keyboard.dismiss();
    setFocus(false);
  };

  return (
    <TouchableWithoutFeedback onPress={onTouchOutOfInput}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <View style={{ marginBottom: 32 }}>
          <View style={{ ...styles.loadImgBox, width: dimensions }}></View>
          <Text style={{ ...styles.loadImgText, fontFamily: fonts[0] }}>
            Загрузите фото
          </Text>
          <TouchableOpacity style={styles.loadImgButton}>
            <FontAwesome5 name="camera" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            placeholder="Название..."
            style={{ ...styles.input, fontFamily: fonts[0] }}
            onFocus={() => setFocus(true)}
          />
        </View>
        <View>
          <TextInput
            placeholder="Местность..."
            style={{ ...styles.input, fontFamily: fonts[0], marginTop: 16 }}
            onFocus={() => setFocus(true)}
          />
        </View>
        {!focus && (
          <TouchableOpacity disabled={true} style={styles.btn}>
            <Text style={{ ...styles.btnText, fontFamily: fonts[0] }}>
              Опубликовать
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  loadImgBox: {
    position: "relative",
    height: 240,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  loadImgText: {
    paddingTop: 8,
    color: "#BDBDBD",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: 400,
  },
  loadImgButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -30 }],
    backgroundColor: "#FFFFFF",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
  },
  input: {
    fontSize: 16,
    lineHeight: 19,
    paddingVertical: 16,
    borderBottomWidth: 1,
    color: "#212121",
    borderBottomColor: "#E8E8E8",
  },
  btn: {
    alignItems: "center",
    marginTop: 32,
    paddingVertical: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
});
