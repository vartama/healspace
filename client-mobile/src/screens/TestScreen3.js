import React from "react";
import {
  View,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";
import { Button } from "react-native-paper";
import MapView, { Marker } from "react-native-maps";

const screenWidth = Dimensions.get("window").width;

const DetailBlock = ({ title, description, children }) => (
  <View style={styles.detailBlock}>
    <Text style={styles.detailTitle}>{title}</Text>
    <Text style={styles.detailDescription}>{description}</Text>
    {children}
  </View>
);

export default function TestScreen3() {
  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView horizontal>
        <View style={styles.container}>
          <ImageBackground
            source={{
              uri: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/408695568.jpg?k=553018465ffa5c45e8d8a8e39fc5b9061427b571d84aa5062eda5e7963ee10d0&o=&hp=1",
            }}
            style={styles.image}
          />
          <ImageBackground
            source={{
              uri: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/408695568.jpg?k=553018465ffa5c45e8d8a8e39fc5b9061427b571d84aa5062eda5e7963ee10d0&o=&hp=1",
            }}
            style={styles.image}
          />
          <ImageBackground
            source={{
              uri: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/408695568.jpg?k=553018465ffa5c45e8d8a8e39fc5b9061427b571d84aa5062eda5e7963ee10d0&o=&hp=1",
            }}
            style={styles.image}
          />
        </View>
      </ScrollView>

      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            flex: 0.1,
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 40 }}>this is for hotel names</Text>
        </View>
        <View
          style={{
            marginVertical: 10,
            flex: 0.1,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Button
                style={{ backgroundColor: "#98ff98", marginHorizontal: 5 }}
                labelStyle={{ fontSize: 15 }}
              >
                Shower
              </Button>
              <Button
                style={{ backgroundColor: "#98ff98", marginHorizontal: 5 }}
                labelStyle={{ fontSize: 15 }}
              >
                Shower
              </Button>
              <Button
                style={{ backgroundColor: "#98ff98", marginHorizontal: 5 }}
                labelStyle={{ fontSize: 15 }}
              >
                Shower
              </Button>
              <Button
                style={{ backgroundColor: "#98ff98", marginHorizontal: 5 }}
                labelStyle={{ fontSize: 15 }}
              >
                Shower
              </Button>
              <Button
                style={{ backgroundColor: "#98ff98", marginHorizontal: 5 }}
                labelStyle={{ fontSize: 15 }}
              >
                Shower
              </Button>
              <Button
                style={{ backgroundColor: "#98ff98", marginHorizontal: 5 }}
                labelStyle={{ fontSize: 15 }}
              >
                Shower
              </Button>
            </View>
          </ScrollView>
        </View>
        <View style={{ height: "40%", marginBottom: 10 }}>
          <ScrollView
            contentContainerStyle={styles.detailsContainer}
            horizontal
          >
            <DetailBlock
              title="Block 1"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            >
              <Text style={styles.detailText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
            </DetailBlock>
            <DetailBlock title="Location" description="">
              <MapView style={{ flex: 1 }} initialRegion={initialRegion}>
                <Marker
                  coordinate={initialRegion}
                  title="Marker Title"
                  description="Marker Description"
                />
              </MapView>
            </DetailBlock>
            <DetailBlock title="Room Types">
              <Text style={styles.detailText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
            </DetailBlock>
          </ScrollView>
        </View>
      </View>
      <View style={{ flex: 0.175, backgroundColor: "grey" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    width: screenWidth,
    height: "100%",
    borderRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: 20,
  },
  iconContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 40,
    color: "white",
    textAlign: "center",
  },
  pillContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginHorizontal: 15,
  },
  pill: {
    backgroundColor: "#674ea7",
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  pillText: {
    fontSize: 16,
    color: "white",
  },
  detailsContainer: {
    marginTop: 10,
    marginHorizontal: 15,
  },
  detailBlock: {
    backgroundColor: "rgba(255, 255, 255, 0)",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: screenWidth,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
  },
  detailDescription: {
    fontSize: 14,
    color: "white",
  },
  detailText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});
