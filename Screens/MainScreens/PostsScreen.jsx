import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Posts } from "../nestedScreens/MainPostScreen";
import MapPostsScreen from "../nestedScreens/MapPostsScreen";
import CommentsPostsScreen from "../nestedScreens/CommentsPostsScreen";
import { TouchableOpacity } from "react-native";

//icons
import { Ionicons } from "@expo/vector-icons";

const PostNav = createStackNavigator();

const PostsScreen = ({navigation}) => {
  return (
    <PostNav.Navigator>
      <PostNav.Screen
        name="MainPost"
        component={Posts}
        options={{
          title: "Публікації",
          headerLeft: false,
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.7}
              style={{ marginRight: 10 }}
              onPress={() => navigation.navigate("Login")}
            >
              <Ionicons name="exit-outline" size={28} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <PostNav.Screen
        name="Map"
        component={MapPostsScreen}
        options={{
          title: "Карта",
        }}
      />
      <PostNav.Screen
        name="Comments"
        component={CommentsPostsScreen}
        options={{
          title: "Коментарі",
        }}
      />
    </PostNav.Navigator>
  );
};

export default PostsScreen;
