import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from "react-native";
import { Registration } from "./Screens/RegistrationScreen/RegistrationScreen";
import photoBG from "./images/Photo_BG.jpg";
import { LoginScreen } from "./Screens/LoginScreen";

export default function App() {
  const [focus, setFocus] = useState();

  const onTouchOutOfForm = () => {
    Keyboard.dismiss();
    setFocus(false);
  };

  return (
    <TouchableWithoutFeedback onPress={onTouchOutOfForm}>
      <View style={styles.container}>
        <ImageBackground source={photoBG} style={styles.image}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            {/* <Registration focus={focus} setFocus={setFocus} /> */}
            <LoginScreen focus={focus} setFocus={setFocus} />
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

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
});
