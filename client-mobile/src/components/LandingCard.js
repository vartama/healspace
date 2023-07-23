import * as React from "react";
import { Avatar, Button, Card, Text } from "react-native-paper";
import {
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  View,
} from "react-native";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const screenWidth = Dimensions.get("window").width;
const screenheight = Dimensions.get("window").height;

const toDashboard = () => {
  navigate;
};

const LandingCard = () => (
  <Card style={{ marginVertical: 10 }}>
    <TouchableOpacity onPress={() => toDashboard}>
      <ImageBackground
        source={{
          uri: "https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/18/2016/05/03103018/Swimming-Pool_Novotel-Bogor_3523-341-1200x400.jpg",
        }}
        style={{ width: screenWidth, height: 200 }}
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
              backgroundColor: "rgba(0,0,0,0.25)",
              height: 50,
              width: "100%",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 40,
                color: "white",
              }}
            >
              Category
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  </Card>
);

export default LandingCard;
