import TestScreen5 from "../screens/TestScreen5";
import TestScreen6 from "../screens/TestScreen6";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Login from "../screens/Login";
import Register from "../screens/Register";
import BookScreen from "../screens/BookScreen";
import ThankYouScreen from "../screens/ThankYouScreen";
import DetailScreen from "../screens/DetailScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Payment from "../screens/Payment";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function DrawerStyle() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{ drawerActiveTintColor: "red" }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerTitle: "" }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerTitle: "" }}
      />
      <Stack.Screen name="Dashboard" component={Home} options={{}} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{}} />
      <Stack.Screen name="Panorama" component={TestScreen5} options={{}} />
      <Stack.Screen name="Maps" component={TestScreen6} options={{}} />
      <Stack.Screen name="ThankYou" component={ThankYouScreen} options={{}} />
      <Stack.Screen name="Book Screen" component={BookScreen} options={{}} />
      <Stack.Screen name="Profile" component={Profile} options={{}} />
      <Stack.Screen name="Payment" component={Payment} options={{}} />

    </Drawer.Navigator>
  );
}
