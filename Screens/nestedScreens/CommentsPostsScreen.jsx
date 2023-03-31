import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
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
import { getUser } from "../../src/redux/auth/selectors";

const CommentsPostsScreen = ({ route }) => {
  const [focus, setFocus] = useState();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState([]);
  const { params } = route;
  const { nickname } = useSelector(getUser);

  const onTouchOutOfForm = () => {
    Keyboard.dismiss();
    setFocus(false);
  };

  const addComment = async () => {
    if (!comment.trim()) {
      await setDoc(doc(db, "posts", "comments"), {
        comment,
        nickname,
      });
    }
  };

  useEffect(() => {
    if (params.post) {
      setPost(params.post);
    }
  }, []);

  return (
    <TouchableWithoutFeedback onPress={onTouchOutOfForm}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView>
            {post && (
              <Image source={{ uri: post.image }} style={styles.postImage} />
            )}
            {post &&
              post.comments.map((com, i) => (
                <View
                  style={{
                    display: "flex",
                    flexDirection:
                      com.author === nickname ? "row" : "row-reverse",
                  }}
                  key={i}
                >
                  <Image
                    source={
                      com.author === nickname
                        ? require("../../images/userPhoto.jpg")
                        : { uri: com.avatar }
                    }
                    style={styles.commentAvatar}
                  />
                  <View
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.03)",
                      flexShrink: 1,
                      padding: 16,
                      borderBottomLeftRadius: 6,
                      borderBottomRightRadius: 6,
                      borderTopLeftRadius: com.author === nickname ? 0 : 6,
                      borderTopRightRadius: com.author === nickname ? 6 : 0,
                      marginLeft: com.author === nickname ? 8 : 0,
                      marginRight: com.author === nickname ? 0 : 8,
                      marginBottom: i === post.comments.length - 1 ? 31 : 24,
                    }}
                  >
                    <Text style={styles.commentText}>{c.comment}</Text>
                    <Text
                      style={{
                        ...styles.commentDate,
                        textAlign: com.author === nickname ? "left" : "right",
                      }}
                    >
                      {com.date}
                    </Text>
                  </View>
                </View>
              ))}
            <View style={styles.commentButtonWrapper}>
              <TextInput
                value={comment}
                onChangeText={(comment) => setComment(comment)}
                placeholder="Коментувати"
                style={styles.commentInput}
              />
              <AntDesign
                name="arrowup"
                size={24}
                color="#ffffff"
                style={styles.commentAddButton}
                onPress={() => {
                  addComment();
                }}
              />
            </View>
          </ScrollView>
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
  postImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 32,
  },
  commentAvatar: {
    height: 28,
    width: 28,
    borderRadius: 28 / 2,
  },
  commentText: {
    fontFamily: "RobotoRegular",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
    marginBottom: 8,
  },
  commentDate: {
    fontFamily: "RobotoRegular",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
  },
  commentButtonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    borderColor: "#E8E8E8",
    borderWidth: 1,
  },
  commentInput: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    width: "100%",
    paddingVertical: 15,
    paddingLeft: 15,
    flex: 1,
  },
  commentAddButton: {
    padding: 10,
    marginRight: 8,
    backgroundColor: "#FF6C00",
    borderRadius: 34 / 2,
  },
});

export default CommentsPostsScreen;
