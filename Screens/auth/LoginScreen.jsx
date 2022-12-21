import { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import photoBG from "../../images/Photo_BG.jpg";

SplashScreen.preventAutoHideAsync();

const fonts = ["Roboto", "RobotoRegular"];
const initialState = { email: "", password: "" };

export const LoginScreen = ({ navigation }) => {
  const [focus, setFocus] = useState();
  const [credentiasl, setCredentials] = useState(initialState);
  const [showPass, setShowPass] = useState(true);
  const [fontsLoaded] = useFonts({
    [fonts[0]]: require("../../assets/fonts/Roboto-Medium.ttf"),
    [fonts[1]]: require("../../assets/fonts/Roboto-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const onLogin = () => {
    console.log(credentiasl);
    setCredentials(initialState);
    navigation.navigate("Home");
  };
  const onTouchOutOfForm = () => {
    Keyboard.dismiss();
    setFocus(false);
  };
  if (!fontsLoaded) {
    return null;
  }
  return (
    <TouchableWithoutFeedback onPress={onTouchOutOfForm}>
      <View style={styles.container}>
        <ImageBackground source={photoBG} style={styles.image}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.loginContainer} onLayout={onLayoutRootView}>
              <Text style={{ ...styles.header, fontFamily: fonts[0] }}>
                Войти
              </Text>
              <View>
                <TextInput
                  style={{ ...styles.input, fontFamily: fonts[1] }}
                  placeholder="Адрес электронной почты"
                  onFocus={() => setFocus(true)}
                  onChangeText={(value) => {
                    setCredentials((prev) => ({ ...prev, email: value }));
                  }}
                  value={credentiasl.email}
                />
              </View>
              <View style={{ position: "relative" }}>
                <TextInput
                  style={{
                    ...styles.input,
                    fontFamily: fonts[1],
                    marginBottom: focus ? 32 : 43,
                  }}
                  placeholder="Пароль"
                  secureTextEntry={showPass}
                  onFocus={() => setFocus(true)}
                  onChangeText={(value) => {
                    setCredentials((prev) => ({ ...prev, password: value }));
                  }}
                  value={credentiasl.password}
                />
                <TouchableOpacity
                  style={styles.showPasswordBtn}
                  activeOpacity={0.7}
                  onPressIn={() => setShowPass(false)}
                  onPressOut={() => setShowPass(true)}
                >
                  <Text
                    style={{ ...styles.showPasswordText, fontFamily: fonts[1] }}
                  >
                    Показать
                  </Text>
                </TouchableOpacity>
              </View>
              {!focus && (
                <>
                  <TouchableOpacity
                    style={styles.btn}
                    activeOpacity={0.7}
                    onPress={onLogin}
                  >
                    <Text style={{ ...styles.btnText, fontFamily: fonts[1] }}>
                      Войти
                    </Text>
                  </TouchableOpacity>

                  <Text style={{ ...styles.loginText, fontFamily: fonts[1] }}>
                    Нет аккаунта?{" "}
                    <Text onPress={() => navigation.navigate("Registration")}>
                      Зарегистрироваться
                    </Text>
                  </Text>
                </>
              )}
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
  },
  loginContainer: {
    backgroundColor: "#FFFFFF",
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 32,
    position: "relative",
  },
  header: {
    color: "#212121",
    textAlign: "center",
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: "0.01em",
    marginBottom: 33,
  },
  input: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",

    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  showPasswordBtn: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  showPasswordText: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,

    color: "#1B4371",
  },
  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    paddingHorizontal: 93,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 19,

    color: "#FFFFFF",
  },
  loginText: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    marginBottom: 144,
    color: "#1B4371",
  },
  linkToReg: {
    paddingVertical: 16,
  },
});
