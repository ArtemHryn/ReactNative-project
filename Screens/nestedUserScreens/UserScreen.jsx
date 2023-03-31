import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Image,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "../../styles/auths.styles";
import { db } from "../../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import Post from "../../components/Post";
import { getUser } from "../../src/redux/auth/selectors";
import { logout } from "../../src/redux/auth/operations";

export default function UserScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const { userId, nickname, avatar } = useSelector(getUser);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    const postsRef = await collection(db, "posts");
    const q = await query(postsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setPosts([{ id: doc.id, ...doc.data() }]);
    });
  };

  return (
    <ImageBackground
      source={require("../../images/Photo_BG.jpg")}
      style={styles.bckImage}
    >
      <ScrollView
        contentContainerStyle={{
          ...styles.container,
          marginTop: 100,
          height: "100%",
        }}
      >
        <View
          style={{
            ...styles.postsContainer,
            paddingVertical: 0,
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginBottom: 32,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={styles.avatar}>
              <Image
                style={{
                  height: 120,
                  width: 120,
                  borderRadius: 16,
                  position: "absolute",
                }}
                source={avatar && { uri: avatar }}
              />
              <TouchableOpacity style={styles.addAvatarBtn}>
                <Text style={{ color: "#BDBDBD" }}>+</Text>
              </TouchableOpacity>
            </View>

            <MaterialIcons
              name="logout"
              size={24}
              color="#BDBDBD"
              onPress={() => dispatch(logout())}
              style={{ position: "absolute", right: 0 }}
            />
          </View>
          <Text style={styles.title}>{nickname}</Text>
          <SafeAreaView>
            <FlatList
              data={posts}
              keyExtractor={(item) => {
                item.id;
              }}
              renderItem={({ item }) => (
                <Post post={item} key={item.id} navigation={navigation} />
              )}
            />
          </SafeAreaView>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bckImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  container: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  postsContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  avatar: {
    height: 120,
    width: 120,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: 32,
    position: "relative",
  },
  addAvatarBtn: {
    width: 25,
    height: 25,
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginRight: -13,
    marginBottom: 14,
    transform: [{ rotate: "45deg" }],
    borderColor: "#BDBDBD",
  },
  title: {
    fontFamily: "RobotoRegular",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
  },
});
