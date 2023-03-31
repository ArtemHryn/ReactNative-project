import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { Feather, Ionicons, FontAwesome5 } from "@expo/vector-icons";


import { LoginScreen } from "../../Screens/auth/LoginScreen";
import { Registration } from "../../Screens/auth/RegistrationScreen";
import { CreatePostScreen } from "../../Screens/MainScreens/CreatePostScreen";
import { ProfileScreen } from "../../Screens/MainScreens/Profile";
import PostsScreen from "../../Screens/MainScreens/PostsScreen";

const Auth = createStackNavigator();
const BottomMenu = createBottomTabNavigator();


export const useRoute = (isAuth, onLogout) => {
  if (!isAuth) {
    return (
      <Auth.Navigator initialRouteName="Login">
        <Auth.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Auth.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={Registration}
        />
      </Auth.Navigator>
    );
  }
  return (
    <BottomMenu.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: "#FF6C00",
        tabBarItemStyle: {
          borderRadius: 20,
          width: 10,
          position: "relative",
        },
        tabBarStyle: { paddingHorizontal: 84, paddingVertical: 9 },
      }}
    >
      <BottomMenu.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size }) => (
            <Feather
              name="grid"
              size={size}
              color={focused ? "white" : "rgba(33, 33, 33, 0.8)"}
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.7}
              style={{ marginRight: 10 }}
              onPress={onLogout}
            >
              <Ionicons name="exit-outline" size={28} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <BottomMenu.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{
          title: "Создать публикацию",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name="add"
              size={size}
              color={focused ? "white" : "rgba(33, 33, 33, 0.8)"}
            />
          ),
          tabBarStyle: { display: "none" },

          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => navigation.navigate("Posts")}
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color="rgba(33, 33, 33, 0.8)"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <BottomMenu.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size }) => (
            <FontAwesome5
              name="user"
              size={size}
              color={focused ? "white" : "rgba(33, 33, 33, 0.8)"}
            />
          ),
        }}
      />
    </BottomMenu.Navigator>
  );
};