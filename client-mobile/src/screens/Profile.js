import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux"
export default function Profile() {
  // const [user, setUser] = useState(null)
  const {user} = useSelector((state) => state.user);
  const navigation = useNavigation();

  const logout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(user, 'user line 28');
  
  const navigateToHotelPage = () => {
    // navigation.navigate("Detail") // ini nanti ke id hotel by id nya
    console.log("KE HOTEL DETAIL");
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>Welcome, {user?.fullName}</Text>

      <View style={styles.pseudoCode}>
        <View style={{ margin: 8 }}>
          <Text style={{ fontWeight: "500" }}>Profile Name:</Text>
          <Text>{user?.fullName}</Text>
        </View>

        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />

        <View style={{ margin: 8 }}>
          <Text style={{ fontWeight: "500" }}>Email:</Text>
          <Text>{user?.email}</Text>
        </View>

          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />

          <View style={{ margin: 8 }}>
            <Text style={{ fontWeight: "500" }}>Phone Number:</Text>
            <Text>{user?.phoneNumber}</Text>
          </View>
        </View>

        <View style={styles.buttonContainerSection}>
          <TouchableOpacity style={styles.buttonSection}>
            <Text style={styles.buttonTextSection}>
              INI TOMBOL BUAT PINDAH NYA
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSection}>
            <Text style={styles.buttonTextSection}>INI TOMBOL JUGA</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginTop: 15,
          }}
        />

        <Text
          style={{
            justifyContent: "center",
            alignSelf: "center",
            fontSize: 20,
            fontWeight: "500",
            //   position: "absolute",
            margin: 10,
          }}
        >
          Ongoing Order
        </Text>

        {/* NANTI DIBIKIN KALAU TIDAK ADA ORDER DIMASUKIN NO ACTIVE ORDER */}
        <View style={styles.pseudoCard}>
          <Text style={{ margin: 2, padding: 5, alignSelf: "center" }}>
            No active order
          </Text>
        </View>

        <View style={styles.pseudoCardOrder}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.imageButton}
              onPress={navigateToHotelPage}
            >
              <Image
                style={styles.image}
                // nanti ini di sesuaikan gambar dari gambar hotel
                source={{ uri: "https://rb.gy/criy2" }}
              />
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: "grey",
                opacity: 0.5,
                marginLeft: 6,
                padding: 1,
                height: "100%",
              }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text>DETAIL</Text>
              <Text>NAMA HOTEL</Text>
              <Text>CHECK IN AT</Text>
              <Text>TOTAL BERAPA MALAM</Text>
              <Text>TOTAL HARGA</Text>
            </View>
          </View>
        </View>

        <Text
          style={{
            justifyContent: "center",
            alignSelf: "center",
            fontSize: 20,
            fontWeight: "500",
            //   position: "absolute",
            margin: 10,
          }}
        >
          Bookmarked
        </Text>

        {/* BOOKMARK SECTION */}
        <ScrollView horizontal>
          <View>
            <View style={styles.bookmarkedContainer}>
              <View style={styles.bookmarkPseudoCard}>
                <TouchableOpacity onPress={navigateToHotelPage}>
                  <Image
                    style={styles.bookmarkImage}
                    source={{ uri: "https://rb.gy/2566n" }}
                  />
                  <View
                    style={{
                      borderBottomColor: "black",
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      marginTop: 10,
                    }}
                  />
                  <View style={styles.bookmarkTextContainer}>
                    <Text style={styles.bookmarkText}>NAMA HOTELNYA</Text>
                    <Text style={styles.bookmarkText}>HARGA HOTELNYA</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.bookmarkPseudoCard}>
                <TouchableOpacity onPress={navigateToHotelPage}>
                  <Image
                    style={styles.bookmarkImage}
                    source={{ uri: "https://rb.gy/criy2" }}
                  />
                  <View
                    style={{
                      borderBottomColor: "black",
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      marginTop: 10,
                    }}
                  />
                  <View style={styles.bookmarkTextContainer}>
                    <Text style={styles.bookmarkText}>NAMA HOTELNYA</Text>
                    <Text style={styles.bookmarkText}>HARGA HOTELNYA</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.bookmarkPseudoCard}>
                <TouchableOpacity onPress={navigateToHotelPage}>
                  <Image
                    style={styles.bookmarkImage}
                    source={{ uri: "https://rb.gy/criy2" }}
                  />
                  <View
                    style={{
                      borderBottomColor: "black",
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      marginTop: 10,
                    }}
                  />
                  <View style={styles.bookmarkTextContainer}>
                    <Text style={styles.bookmarkText}>NAMA HOTELNYA</Text>
                    <Text style={styles.bookmarkText}>HARGA HOTELNYA</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.bookmarkPseudoCard}>
                <TouchableOpacity onPress={navigateToHotelPage}>
                  <Image
                    style={styles.bookmarkImage}
                    source={{ uri: "https://rb.gy/criy2" }}
                  />
                  <View
                    style={{
                      borderBottomColor: "black",
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      marginTop: 10,
                    }}
                  />
                  <View style={styles.bookmarkTextContainer}>
                    <Text style={styles.bookmarkText}>NAMA HOTELNYA</Text>
                    <Text style={styles.bookmarkText}>HARGA HOTELNYA</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.button} onPress={logout}>
          {/*  */}
          <Text style={styles.logout}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    padding: 20,
    borderRadius: 13,
    // backgroundColor: "#20D2FA",
    opacity: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: "500",
    alignSelf: "center",
  },
  pseudoCard: {
    marginVertical: 5,
    // marginLeft: 10,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
  },
  pseudoCardOrder: {
    marginVertical: 5,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
  },
  image: {
    minHeight: 200,
    maxHeight: 200,
    resizeMode: "cover",
    borderRadius: 2,
  },
  imageButton: {
    minHeight: 200,
    width: "50%",
    resizeMode: "cover",
    borderRadius: 2,
  },
  bookmarkedContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
    // padding: 50,
  },
  bookmarkPseudoCard: {
    marginVertical: 5,
    marginLeft: 10,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
  },
  bookmarkImage: {
    height: 160,
    maxHeight: 150,
    width: 150,
    resizeMode: "cover",
    borderRadius: 2,
  },
  bookmarkTextContainer: {
    margin: 5,
    borderRadius: 2,
  },
  bookmarkText: {
    opacity: 1,
    // marginHorizontal: 5,
    padding: 3,
    // backgroundColor: "red"
  },
  button: {
    backgroundColor: "#EB7A5E",
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  logout: {
    fontSize: 16,
    fontWeight: "600",
  },
  buttonContainerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  buttonSection: {
    flex: 1,
    backgroundColor: "#2F80ED",
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 5,
  },
  buttonTextSection: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
