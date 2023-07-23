import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
// import { login } from "../actions/userAction";
import { login } from "../slicers/userSlice"
// import Loading from "../components/Loading";

export default function Login({ }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const user = useSelector((state) => state.user.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);

  const handleLogin = async () => {
    if (email) {
      console.log("Login pressed");
      console.log("Email:", email);
      console.log("Password:", password);
    } else {
      console.log("Please enter a valid email and password");
    }
    await dispatch(login({ email, password }))
    navigateToHome();
  };

  const navigateToHome = () => {
    navigation.navigate("Dashboard");
  };

  const navigateToRegister = () => {
    navigation.navigate("Register");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/Logo.png")}
        style={{
          maxHeight: 210,
          maxWidth: 210,
          alignSelf: "center",
          resizeMode: "contain",
        }}
      />
      <Text style={styles.tagline}>A space to heal your soul</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email} // ini nanti kalo server udah nyala dinyalain ini
        onChangeText={(email) => setEmail(email)}
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="next"
        style={styles.input}
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
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={passwordVisible}
          placeholder="Password"
          returnKeyType="done"
          ref={(input) => {
            passwordInput = input;
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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.loginLinkContainer}>
        <Text style={styles.loginText}>Not yet have an account?</Text>
        <TouchableOpacity onPress={navigateToRegister}>
          <Text style={styles.loginLink}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
  tagline: {
    fontSize: 26,
    marginBottom: 12,
    fontWeight: "500",
    marginBottom: 10,
    alignSelf: "center",
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
  loginLinkContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  loginText: {
    fontSize: 16,
    marginRight: 5,
    fontWeight: "bold",
  },
  loginLink: {
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
});
