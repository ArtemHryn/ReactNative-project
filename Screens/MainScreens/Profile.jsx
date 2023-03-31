import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import UserScreen from "./UserScreen";
import MapScreen from "../posts/MapScreen";
import CommentsPostsScreen from '../nestedScreens/CommentsPostsScreen'
import MapPostsScreen from "../nestedScreens/MapPostsScreen";

const UserStack = createStackNavigator();

function DefaultUserScreen({ navigation }) {

  return (
    <UserStack.Navigator
      initialRouteName="User"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 80,
        },
      }}
    >
      <UserStack.Screen
        name="User"
        component={UserScreen}
        options={{
          headerShown: false,
        }}
      />
      <UserStack.Screen
        name="Comments"
        component={CommentsPostsScreen}
        options={{
          title: "Коментарі",
          headerTitleStyle: {
            fontFamily: "RobotoRegular",
            fontSize: 17,
            lineHeight: 22,
            alignItems: "center",
            textAlign: "center",
            color: "#212121",
          },
          headerLeft: () => {
            return (
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Feather
                  name="arrow-left"
                  size={24}
                  color="rgba(33, 33, 33, 0.8)"
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <UserStack.Screen
        name="Map"
        component={MapPostsScreen}
        options={{
          title: "Мапа",
          headerTitleStyle: {
            fontFamily: "Roboto_500Medium",
            fontSize: 17,
            lineHeight: 22,
            alignItems: "center",
            textAlign: "center",
            color: "#212121",
          },
          headerLeft: () => {
            return (
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => {
                  handleGoBack();
                }}
              >
                <Feather
                  name="arrow-left"
                  size={24}
                  color="rgba(33, 33, 33, 0.8)"
                />
              </TouchableOpacity>
            );
          },
        }}
      />
    </UserStack.Navigator>
  );
}

export default DefaultUserScreen;
