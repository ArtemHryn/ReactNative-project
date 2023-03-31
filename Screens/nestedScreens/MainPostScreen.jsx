import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import userPhoto from "../../images/userPhoto.png";
import { useEffect, useState } from "react";
import Post from "../../components/Post";

const fonts = ["Roboto", "RobotoRegular", "RobotoBold"];

export const Posts = ({ route, navigation }) => {
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    (async () => {
      await onSnapshot(query(collection(db, "posts")), (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setMyPosts((posts) => [...posts, { id: doc.id, ...doc.data() }]);
        });
      });
    })();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.userContainer}>
        <Image source={userPhoto} style={styles.image} />
        <View>
          <Text style={{ ...styles.name, fontFamily: fonts[2] }}>
            Natali Romanova
          </Text>
          <Text style={{ ...styles.email, fontFamily: fonts[1] }}>
            email@example.com
          </Text>
        </View>
      </View>
      <SafeAreaView>
        <FlatList
          data={myPosts}
          keyExtractor={(item) => {
            index.toString();
          }}
          renderItem={({ item }) => (
            <Post post={item} key={item.id} navigation={navigation} />
          )}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 8,
  },
  name: {
    fontWeight: 700,
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  email: {
    fontWeight: 400,
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
});
