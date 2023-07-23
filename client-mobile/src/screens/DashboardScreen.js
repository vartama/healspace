import React, { useEffect } from "react";
import { Button, View, Text, ScrollView } from "react-native";
import { SearchBar } from "react-native-screens";
// import HomeCard from "../components/HomeCard";
import { useDispatch, useSelector } from "react-redux"
import { fetchHotels } from "../slicers/hotelSlice"

export default function TestScreen2() {
  const { hotel, loading } = useSelector((state) => state.hotel)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchHotels())
  }, [])

  return (
    <View>
      <View>
        <SearchBar />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "95%",
            }}
          >
            <View style={{ flex: 1, marginTop: 10 }}>
              {/* <HomeCard hotel={hotel}/> */}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
