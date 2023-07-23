import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { login, register } from "../slicers/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleRegister = () => {
    if (fullName && email && gender && dateOfBirth && phoneNumber && password) {
      console.log("Register complete!");
    } else {
      console.log("All fields required");
    }
    dispatch(register({ fullName, email, password, gender, dateOfBirth, phoneNumber }));
    dispatch(login({ email, password }))
    navigateToHome();
  };

  const navigateToHome = () => {
    navigation.navigate("Dashboard");
  }

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(false);
    setDateOfBirth(currentDate);
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const navigateToLogin = () => {
    navigation.navigate("Login"); // Replace "Login" with the screen name for your login screen
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          value={fullName}
          style={styles.input}
          onChangeText={setFullName}
          placeholder="Full Name"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => {
            emailInput.focus();
          }}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          style={styles.input}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          returnKeyType="next"
          blurOnSubmit={false}
          ref={(input) => {
            emailInput = input;
          }}
          onSubmitEditing={() => {
            passwordInput.focus();
          }}
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            value={password}
            style={styles.inputPassword}
            onChangeText={setPassword}
            secureTextEntry={passwordVisible}
            placeholder="Password"
            returnKeyType="next"
            ref={(input) => {
              passwordInput = input;
            }}
            onSubmitEditing={() => {
              genderPicker.focus();
            }}
          />
          <TouchableOpacity
            style={styles.passwordVisibilityButton}
            onPress={togglePasswordVisibility}
          >
            <Text style={styles.passwordVisibilityButtonText}>
              {passwordVisible ? (
                <Ionicons name="eye-off-outline" size={24} color="black" />
              ) : (
                <Ionicons name="eye-outline" size={24} color="black" />
              )}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Gender</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            ref={(input) => {
              genderPicker = input;
            }}
            onSubmitEditing={() => {
              birthDateInput.focus();
            }}
          >
            <Picker.Item label="Select your gender" value="" enabled={false} />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>

        <View>
          <Text style={styles.label}>Date of Birth</Text>
          {dateOfBirth && (
            <Text style={styles.input} onPress={showDatePickerModal}>
              {dateOfBirth.toLocaleDateString()}
            </Text>
          )}
          {/* <Button title="Select Date" onPress={showDatePickerModal} /> */}
          {showDatePicker && (
            <DateTimePicker
              value={dateOfBirth}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          value={phoneNumber}
          style={styles.input}
          onChangeText={setPhoneNumber}
          keyboardType="numeric"
          placeholder="Phone Number"
          returnKeyType="done"
          ref={(input) => {
            phoneNumberInput = input;
          }}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <View style={styles.registerLinkContainer}>
          <Text style={styles.registerText}>Already have an account?</Text>
          <TouchableOpacity onPress={navigateToLogin}>
            <Text style={styles.registerLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
  input: {
    padding: 10,
    margin: 5,
    borderRadius: 8,
    backgroundColor: "white",
    height: 41,
    borderWidth: 0.5,
    borderColor: "black",
  },
  button: {
    backgroundColor: "#20D2FA",
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  registerLinkContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  registerText: {
    fontSize: 16,
    marginRight: 5,
    fontWeight: "bold",
  },
  registerLink: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1483FB",
    fontStyle: "italic",
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    backgroundColor: "white",
    margin: 5,
    paddingRight: 10,
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
  inputPassword: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "white",
    height: 40,
  },
  pickerContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    height: 40,
    margin: 5,
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "black",
  },
});

export default Register;
