import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import HomeCard from "../components/HomeCard";
import { useDispatch, useSelector } from "react-redux"
import Loading from "../components/Loading";
import { fetchHotels } from "../slicers/hotelSlice";

export default function Home({ navigation }) {
  const { hotels, loading } = useSelector((state) => state.hotel);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHotels());
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <Loading />
      ) : ( <>
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
                {hotels?.map((hotel) => (
                  <HomeCard hotel={hotel} key={hotel.id} />
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </> )}
    </View>
  );
}
