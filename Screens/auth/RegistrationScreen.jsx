import { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import addPhotoImg from "../../images/Union.png";
import deletePhotoImg from "../../images/greyCross.png";
import userPhoto from "../../images/userPhoto.png";
import photoBG from "../../images/Photo_BG.jpg";

SplashScreen.preventAutoHideAsync();

const fonts = ["Roboto", "RobotoRegular"];
const initialState = { login: "", email: "", password: "" };

export const Registration = ({ navigation }) => {
  const [focus, setFocus] = useState(false);
  const [isPhoto, setIsPhoto] = useState(false);
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

  const onRegister = () => {
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
            <View style={styles.registerContainer} onLayout={onLayoutRootView}>
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
              <Text style={{ ...styles.header, fontFamily: fonts[0] }}>
                Регистрация
              </Text>
              <View>
                <TextInput
                  style={{ ...styles.input, fontFamily: fonts[1] }}
                  placeholder="Логин"
                  onFocus={() => setFocus(true)}
                  onChangeText={(value) => {
                    setCredentials((prev) => ({ ...prev, login: value }));
                  }}
                  value={credentiasl.login}
                />
              </View>
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
                    onPress={onRegister}
                  >
                    <Text style={{ ...styles.btnText, fontFamily: fonts[1] }}>
                      Зарегистрироваться
                    </Text>
                  </TouchableOpacity>
                  <Text style={{ ...styles.loginText, fontFamily: fonts[1] }}>
                    Уже есть аккаунт?{" "}
                    <Text onPress={() => navigation.navigate("Login")}>
                      Войти
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
    // alignItems: "center",
  },
  registerContainer: {
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
  header: {
    color: "#212121",
    textAlign: "center",
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: "0.01em",
    marginBottom: 33,
    marginBottom: 34,
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
    marginBottom: 78,
    color: "#1B4371",
  },
});
