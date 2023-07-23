import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotel } from "../slicers/hotelSlice";
import { addBookmark } from "../slicers/bookmarkSlice";
import Loading from "../components/Loading";


const screenWidth = Dimensions.get("window").width;

const Pill = ({ children }) => (
  <View style={styles.pill}>
    <Button labelStyle={styles.pillText}>{children}</Button>
  </View>
);

const DetailBlock = ({ title, description, children }) => (
  <View style={styles.detailBlock}>
    <Text style={styles.detailTitle}>{title}</Text>
    <Text style={styles.detailDescription}>{description}</Text>
    {children}
  </View>
);

export default function DetailScreen({ route }) {
  const { hotelId } = route.params;
  console.log(hotelId, 'hotelId line 39');
  const [isTapped, setIsTapped] = useState(false);
  const scaleValue = useRef(new Animated.Value(1)).current;
  const { hotel, loading } = useSelector((state) => state.hotel)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHotel(hotelId));
  }, [hotelId]);

  const handleTap = () => {
    setIsTapped(!isTapped);
    animateHeart();
    dispatch(addBookmark(hotelId));
  };

  const animateHeart = () => {
    Animated.spring(scaleValue, {
      toValue: 1.5,
      friction: 3,
      useNativeDriver: true,
    }).start(() => {
      scaleValue.setValue(1);
    });
  };

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
  };

  return (
    <View style={{ flex: 1 }}>
    {loading ? (
        <Loading />
      ) : ( <>
      <ScrollView horizontal>
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ width: screenWidth }}
          >
            <View style={{ width: screenWidth }}>
              <Image
                source={{
                  uri: `${hotel?.mainImage}`,
                }}
                style={styles.image}
              />
            </View>
          </ScrollView> 
          <View style={styles.overlay} />
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleTap}>
              <View style={styles.circle}>
                <Animated.View style={[animatedStyle]}>
                  <Ionicons
                    name={isTapped ? "heart" : "heart-outline"}
                    size={24}
                    color={isTapped ? "red" : "white"}
                  />
                </Animated.View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{hotel?.name}</Text>
        </View>
        <View style={styles.pillContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Pill>Shower</Pill>
            <Pill>AC</Pill>
            <Pill>Double Bed</Pill>
            <Pill>King Bed</Pill>
            <Pill>Queen Bed</Pill>
            <Pill>TV</Pill>
            <Pill>Wi-Fi</Pill>
          </ScrollView>
        </View>
        <View style={styles.detailsContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            horizontal
            pagingEnabled={true}
          >
            <DetailBlock title="Details" description="">
              <Text style={styles.detailText}>
                {hotel?.description}
              </Text>
            </DetailBlock>
            <DetailBlock title="Location" description="">
              <MapView
                style={styles.map}
                scrollEnabled={false}
                initialRegion={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                  }}
                  title="Marker Title"
                  description="Marker Description"
                />
              </MapView>
            </DetailBlock>
            <DetailBlock title="Room Types">
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                <TouchableOpacity onPress={() => { }}>
                  <View
                    style={{ backgroundColor: "transparent", borderRadius: 25 }}
                  >
                    <Text style={{ fontSize: 30 }}>Presidential Suite</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }}>
                  <View
                    style={{ backgroundColor: "transparent", borderRadius: 25 }}
                  >
                    <Text style={{ fontSize: 30 }}>Deluxe Suite</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }}>
                  <View
                    style={{ backgroundColor: "transparent", borderRadius: 25 }}
                  >
                    <Text style={{ fontSize: 30 }}>Standard Suite</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }}>
                  <View
                    style={{ backgroundColor: "transparent", borderRadius: 25 }}
                  >
                    <Text style={{ fontSize: 30 }}>Book</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </DetailBlock>
          </ScrollView>
        </View>
      </View> 
      </> )} 
    </View> 
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    height: "100%",
    position: "relative",
  },
  image: {
    flex: 1,
    height: "100%",
    width: screenWidth,
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
    paddingTop: 10,
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
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 40,
    color: "black",
    textAlign: "center",
  },
  pillContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginHorizontal: 15,
  },
  pill: {
    backgroundColor: "#674ea7",
    borderRadius: 25,
    marginRight: 10,
  },
  pillText: {
    fontSize: 16,
    color: "black",
  },
  detailsContainer: {
    flex: 1,
    marginTop: 10,
    marginLeft: 15,
  },
  scrollViewContent: {
    flexDirection: "row",
  },
  detailBlock: {
    backgroundColor: "rgba(255, 255, 255, 0)",
    marginRight: 10,
    width: screenWidth - 30,
    maxWidth: screenWidth,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "black",
  },
  detailDescription: {
    fontSize: 14,
    color: "black",
  },
  detailText: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 20,
  },
  map: {
    flex: 0.85,
    borderRadius: 10,
    overflow: "hidden",
    height: 50,
    width: "95%",
  },
});
