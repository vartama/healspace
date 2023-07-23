import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { View, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const HomeCard = ({hotel}) => {
  const navigation = useNavigation();

  const handleButtonPress = (hotelId) => {
    navigation.navigate("Detail", {hotelId}); // Replace "Detail" with the appropriate screen name for your Detail screen
  };

  // console.log(hotel, 'line 16');

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={() => handleButtonPress(hotel?.id)}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1.25 }}>
          <Image
            source={{
              uri: `${hotel?.mainImage}`,
            }}
            style={styles.image}
          />
        </View>
        <View style={{ flex: 2, flexDirection: "column" }}>
          <View
            style={{
              flex: 0.2,
              backgroundColor: "white",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 33 }}>{hotel?.name}</Text>
          </View>

          <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "transparent",
                  padding: 10,
                  justifyContent: "flex-end",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignContent: "flex-end",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                  }}
                >
                  <Text style={{ fontSize: 14 }}>start off </Text>
                  <Text style={{ fontSize: 25 }}>100$</Text>
                  <Text
                    style={{
                      fontSize: 14,
                    }}
                  >
                    /night
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "transparent",
                  justifyContent: "flex-end",
                  padding: 10,
                }}
              >
                {/* <TouchableOpacity>
                  <Button style={{ backgroundColor: "lightgrey" }}>
                    See More
                  </Button>
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 4,
  },
  image: {
    width: 180,
    height: 200,
    resizeMode: "cover",
  },
});

export default HomeCard;
