import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NavigationStack from "./NavigationStack";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Dashboard") {
              iconName = focused ? "home" : "home-outline";
            }
            return <Ionicons name={iconName} size={size} color={"darkblue"} />;
          },
          tabBarActiveTintColor: "darkblue",
          tabBarInactiveTintColor: "grey",
        };
      }}
    >
      <Tab.Screen name="Dashboard" component={NavigationStack} />
    </Tab.Navigator>
  );
}
