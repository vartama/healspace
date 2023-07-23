import * as React from "react";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { ImageBackground, View } from "react-native";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const DetailCard = () => (
  <Card>
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <ImageBackground
        source={{
          uri: "https://picsum.photos/700",
        }}
      />
    </View>
    <View style={{ flex: 1, backgroundColor: "lightGrey" }}>
      <Text>this is mid</Text>
    </View>
    <View style={{ flex: 1, backgroundColor: "darkgrey" }}>
      <Text>this is bot</Text>
    </View>
  </Card>
);

export default DetailCard;
