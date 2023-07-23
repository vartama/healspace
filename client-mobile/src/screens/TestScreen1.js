import React from "react";
import { Button, View, Text, ScrollView, TouchableOpacity } from "react-native";
import LandingCard from "../components/LandingCard";

export default function TestScreen1({ navigation }) {
  return (
    <ScrollView>
      <TouchableOpacity>
        <View
          style={{
            flex: 1,
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 30,
            }}
          >
            Hello! Username
          </Text>
        </View>
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        {/* <View
        style={{
          flex: 0.1,
          backgroundColor: "grey",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>this is flex top</Text>
      </View> */}
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LandingCard />
          <LandingCard />
          <LandingCard />
          <LandingCard />
          <LandingCard />
        </View>
        {/* <View
        style={{
          flex: 0.1,
          backgroundColor: "darkgrey",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>this is Bottom top</Text>
      </View> */}
      </View>
    </ScrollView>
  );
}
