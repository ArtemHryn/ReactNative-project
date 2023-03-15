import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const CommentsPostsScreen = ({ route }) => {
  const {
    params: { photo },
  } = route;
  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.img} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  img: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
});

export default CommentsPostsScreen;
