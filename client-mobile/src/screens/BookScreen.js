import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Feather } from "@expo/vector-icons";
import DatePicker from "react-native-date-ranges";
import { useDispatch, useSelector } from "react-redux";
import { payment } from "../slicers/orderSlice";
import { useNavigation } from "@react-navigation/native";


export default function BookScreen() {
  console.log(selectedDates, "isi dari selecter=dDates nih");
  const { dataPaypal } = useSelector((state) => state.order)
  const dispatch = useDispatch();
  const navigation = useNavigation();
  

  const [selectedDates, setSelectedDates] = useState();
  const [rooms, setRooms] = useState(1);
  const [adult, setAdult] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleRoomChange = (itemValue) => {
    console.log(itemValue, "<<< item value");
    setSelectedRoom(itemValue);
  };
  const customButton = (onConfirm) => {
    return (
      <Button
        onPress={onConfirm}
        style={{
          container: { width: "80%", marginHorizontal: "3%" },
          text: { fontSize: 20 },
        }}
        primary
        title="submit"
      />
    );
  };
  const handleBook = async () => {
    if (fullName && email && phoneNumber && selectedDates && selectedRoom) {
      console.log("Book complete!");
    } else {
      console.log("All fields required");
    }
     await dispatch(payment({
      hotelRoomId:"63bc5dbb-c4a8-41e0-949d-84be02389d65",
      totalPrice:2000,
      checkInAt:"2023-06-25T11:35:19.872Z",
      checkOutAt:"2023-06-29T11:35:19.872Z",
      customerName:"Budi",
      customerEmail:"budi@gmail.com",
      customerPhoneNumber:"082121212"}))

      navigateToPayment()
  };


  const navigateToPayment = () => {
    console.log(dataPaypal, 'data paypal line 73');
    navigation.navigate("Payment", {paymentUrl: dataPaypal?.order?.paypalPaymentUrl});
  };

  return (
    <>
      <View
        style={{
          marginTop: 20,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "black",
            fontSize: 20,
          }}
        >
          Booking Room
        </Text>
      </View>
      <View>
        <View style={{ margin: 20 }}>
          <Text style={styles.label}>Full Name</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              returnKeyType="next"
              placeholder="Enter your fullname"
              style={styles.input}
              blurOnSubmit={false}
              onSubmitEditing={() => {
                emailInput.focus();
              }}
            />
            <View style={styles.passwordVisibilityButton}>
              <Text style={styles.passwordVisibilityButtonText}>
                <Feather name="user" size={24} color={"black"} />
              </Text>
            </View>
          </View>

          <View>
            <Text style={styles.label}>Email</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter Your Email"
                keyboardType="email-address"
                returnKeyType="next"
                style={styles.input}
                ref={(input) => {
                  emailInput = input;
                }}
                onSubmitEditing={() => {
                  phoneNumberInput.focus();
                }}
              />
              <View style={styles.passwordVisibilityButton}>
                <Text style={styles.passwordVisibilityButtonText}>
                  <Feather name="mail" size={24} color={"black"} />
                </Text>
              </View>
            </View>
          </View>

          <View>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Enter Your Phone Number"
                keyboardType="numeric" // Menampilkan keyboard dengan opsi angka
                style={styles.input}
                returnKeyType="done"
                ref={(input) => {
                  phoneNumberInput = input;
                }}
              />
              <View style={styles.passwordVisibilityButton}>
                <Text style={styles.passwordVisibilityButtonText}>
                  <Feather name="phone" size={24} color={"black"} />
                </Text>
              </View>
            </View>
          </View>

          <View>
            <Text style={styles.label}>Book Date</Text>
            <DatePicker
              markText="Pick your date"
              ButtonText={(title = "Submit")}
              style={styles.inputDate}
              customStyles={{
                placeholderText: {
                  fontSize: 15,
                },
                headerStyle: {
                  backgroundColor: "#52CAEB",
                  borderRadius: 10,
                },
                headerMarkTitle: {
                  textAlign: "center",
                  fontSize: 22,
                },
                headerDateTitle: {
                  color: "black",
                },
              }}
              customButton={(onConfirm) => (
                <Button title="SUBMIT" onPress={onConfirm} />
              )}
              onConfirm={(startDate, endDate) =>
                setSelectedDates(startDate, endDate)
              }
              placeholder={new Date().toLocaleDateString()}
              mode={"range"}
            />
          </View>

          <View>
            <Text style={styles.label}>Pick your room</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={selectedRoom}
                onValueChange={handleRoomChange}
                style={styles.pickerInput}
              >
                <Picker.Item label="Select a room" value="" enabled={false} />
                <Picker.Item label="Room 1" value="room1" />
                <Picker.Item label="Room 2" value="room2" />
                <Picker.Item label="Room 3" value="room3" />
              </Picker>
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleBook}>
            <Text style={styles.buttonText}>Book</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#003580",
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  headerItem: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 20,
    padding: 8,
  },
  headerText: {
    marginLeft: 8,
    fontWeight: "bold",
    color: "white",
    fontSize: 15,
  },
  container: {
    flex: 1,
    margin: 20,
    padding: 20,
    borderRadius: 13,
  },
  label: {
    paddingTop: 8,
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "400",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderColor: "#FFC72C",
    borderWidth: 2,
    paddingVertical: 15,
  },
  inputCalender: {
    padding: 10,
    margin: 5,
    borderRadius: 8,
    backgroundColor: "white",
    height: 41,
    borderWidth: 0.5,
    borderColor: "black",
    width: 361,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    padding: 10,
  },
  pickerWrapper: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "black",
    justifyContent: "center",
  },
  picker: {
    // flex: 1,
    color: "black",
    // backgroundColor: "yellow",
  },
  pickerInput: {
    height: 41,
  },
  datePicker: {
    width: 350,
    height: 30,
    borderRadius: 0,
    borderWidth: 0,
    borderColor: "transparent",
  },
  button: {
    backgroundColor: "#20D2FA",
    padding: 10,
    borderRadius: 8,
    marginTop: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  submitButton: {
    paddingHorizontal: 10,
    borderColor: "#FFC72C",
    borderWidth: 2,
    paddingVertical: 15,
    backgroundColor: "#2a52be",
  },
  submitButtonText: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
    color: "white",
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
  passwordInputContainer: {
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
    borderRadius: 8,
    backgroundColor: "white",
    marginVertical: 5,
    paddingRight: 10,
    borderWidth: 0.5,
    borderColor: "black",
  },
  input: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "white",
    height: 40,
    padding: 10,
  },
  inputDate: {
    padding: 5,
    borderRadius: 8,
    backgroundColor: "white",
    height: 40,
    borderWidth: 0.5,
    borderColor: "black",
  },
  passwordVisibilityButton: {
    marginLeft: 5,
    paddingVertical: 8,
    backgroundColor: "white",
  },
  passwordVisibilityButtonText: {
    color: "blue",
    fontSize: 16,
  },
});
