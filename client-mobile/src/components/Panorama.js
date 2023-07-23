import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
// import PanoramaView from "@lightbase/react-native-panorama-view";

const PanoramaDetails = () => (
  <View style={styles.container}>
    <PanoramaView
      style={styles.viewer}
      dimensions={{ height: 230, width: Dimensions.get("window").width }}
      inputType="mono"
      imageUrl="https://raw.githubusercontent.com/googlevr/gvr-android-sdk/master/assets/panoramas/testRoom1_2kMono.jpg"
    />
  </View>
);

const FullScreenPanorama = () => (
  <PanoramaView
    style={{ flex: 1 }}
    dimensions={{
      height: Dimensions.get("window").height,
      width: Dimensions.get("window").width,
    }}
    enableTouchTracking="true"
    inputType="mono"
    imageUrl="https://raw.githubusercontent.com/googlevr/gvr-android-sdk/master/assets/panoramas/testRoom1_2kMono.jpg"
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewer: {
    height: 230,
  },
});

export { PanoramaDetails, FullScreenPanorama };
