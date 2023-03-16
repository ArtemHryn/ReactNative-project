import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const CommentsPostsScreen = ({ route }) => {
  const [focus, setFocus] = useState();
  const [comments, setComments] = useState([]);
  const {
    params: { photo },
  } = route;

  const onTouchOutOfForm = () => {
    Keyboard.dismiss();
    setFocus(false);
  };

  return (
    <TouchableWithoutFeedback onPress={onTouchOutOfForm}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View
            style={{
              ...styles.commentsContainer,
              paddingBottom: focus ? 100 : 16,
            }}
          >
            <View>
              <Image source={{ uri: photo }} style={styles.img} />
            </View>
            <View style={{ position: "relative" }}>
              <TextInput
                placeholder="Коментувати"
                style={styles.commentInput}
                onFocus={() => setFocus(true)}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  commentsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  img: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  commentInput: {
    fontStyle: "Inter-Medium",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    fontSize: 16,
    lineHeight: 19,
    borderRadius: 100,
    paddingVertical: 16,
    paddingLeft: 16,
  },
});

export default CommentsPostsScreen;
