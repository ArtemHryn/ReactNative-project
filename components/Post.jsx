import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

const Post = ({ post: { photo, location, place, name }, navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.photo} />
      <Text style={styles.name}>{name}</Text>
      <View style={styles.postNav}>
        <TouchableOpacity
          style={styles.commentContainer}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Comments", {photo})}
        >
          <EvilIcons
            name="comment"
            size={24}
            color="black"
            style={{ transform: [{ rotateY: "180deg" }] }}
          />
          <Text>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.commentContainer}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Map", { location, name })}
        >
          <EvilIcons name="location" size={24} color="black" />
          <Text>{place}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    marginHorizontal: 16,
    marginBottom: 32,
  },
  photo: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 8,
  },
  commentContainer: {
    flexDirection: "row",
  },
  postNav: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  placeText: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
});

export default Post;
