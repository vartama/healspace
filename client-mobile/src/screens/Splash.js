import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image, useWindowDimensions } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";

export default function Splash() {

  return (
    <View style={styles.container}>
      <Image
       source={require("../../assets/Splash.jpg")}
       style={{flex:1, resizeMode:"contain"}}
       />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
