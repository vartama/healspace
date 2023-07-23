import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, Text, View } from "react-native";
import Login from "../screens/Login";
import Register from "../screens/Register";

const Stack = createNativeStackNavigator();

export default function NavigationStack() {
  const LogoTitle = () => (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        // source={require("../assets/award.png")}
        style={{ width: 40, height: 40, marginRight: 10 }}
        resizeMode="contain"
      />
    </View>
  );

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: "#20D2FA" },
        headerTintColor: "#fff",
        headerTitleStyle: "bold",
        headerTitleAlign: "left",
        // headerTitle: route.name === "Home" ? LogoTitle : "Movie Detail",
      })}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Login", headerTintColor: "black" }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: "Register", headerTintColor: "black" }}
      />
    </Stack.Navigator>
  );
}
