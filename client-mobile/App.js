
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import DrawerStyle from "./src/navigators/DrawerStyle";
import { StatusBar } from "react-native";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import store from "./src/stores/store";
import Splash from "./src/screens/Splash";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an asynchronous operation (e.g., API call)
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <NavigationContainer>
          <Splash />
        </NavigationContainer>
      </View>
    );
  }

  return (
    <>
      <Provider store={store}>
        <StatusBar hidden />
        <NavigationContainer>
          <DrawerStyle />
        </NavigationContainer>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#1795E6",
    // alignItems: "center",
    // justifyContent: "center",
  },
});