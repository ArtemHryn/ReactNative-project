import { useCallback, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import photoBG from "../../images/Photo_BG.jpg";

const loadFonts = async () => {
  await Font.loadAsync({
    RobotoMedium: require("../../assets/fonts/Roboto-Medium.ttf"),
  });
};

export const Registration = () => {
  const [focus, setFocus] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const onTouchOutOfForm = () => {
    Keyboard.dismiss();
    setFocus(false);
  };

    if (!isReady) {
      return (
        <AppLoading startAsync={loadFonts} onFinish={() => setIsReady(true)} />
      );
    }
  return (
    <TouchableWithoutFeedback onPress={onTouchOutOfForm}>
      <View style={styles.container}>
        <ImageBackground source={photoBG} style={styles.image}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.registerContainer}>
              <Text style={styles.header}>Регистрация</Text>
              <View>
                <TextInput style={styles.input} placeholder="Логин" />
              </View>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Адрес электронной почты"
                />
              </View>
              <View>
                <TextInput style={styles.input} placeholder="Пароль" />
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
    // alignItems: "center",
  },
  registerContainer: {
    // flex: 3 / 4,
    backgroundColor: "#FFFFFF",
    borderRadius: "25px 25px 0 0",
    paddingHorizontal: 16,
  },
  header: {
    color: "#212121",
  },
  input: {
    padding: 10,
    marginBottom: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
  },
});
