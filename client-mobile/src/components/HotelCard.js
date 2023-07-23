import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { ImageBackground, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const HotelCard = () => {
  const navigation = useNavigation();
  const [isImageEnlarged, setImageEnlarged] = useState(false);

  const handleLongPress = () => {
    setImageEnlarged(true);
  };

  const handleRelease = () => {
    setImageEnlarged(false);
  };

  const handleTap = () => {
    if (isImageEnlarged) {
      handleRelease();
    } else {
      navigation.navigate("Detail");
    }
  };

  const imageStyles = isImageEnlarged
    ? styles.enlargedImage
    : styles.normalImage;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={handleTap}
      onLongPress={handleLongPress}
    >
      <Card style={{ marginVertical: 10, borderRadius: 20 }}>
        <ImageBackground
          source={{
            uri: "https://q-xx.bstatic.com/xdata/images/hotel/max500/99887256.jpg?k=0b3fba7666f0a22208ff3c9150d05a2eafc10bc37c0b6a5ef5e002cee65c95f1&o=",
          }}
          style={[styles.imageBackground, imageStyles]}
        >
          <View
            style={{
              flex: 1,
              alignContent: "center",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                backgroundColor: "rgba(255,255,255,0.275)",
                height: 50,
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <View
                style={{
                  marginVertical: 5,
                  justifyContent: "flex-start",
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    color: "black",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  HotelName
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    height: 250,
    resizeMode: "cover",
  },
  normalImage: {},
  enlargedImage: {
    flex: 1,
    alignSelf: "stretch",
  },
});

export default HotelCard;
