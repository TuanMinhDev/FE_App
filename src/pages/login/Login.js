import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
  } from "react-native";
  import React, { useState } from "react";
  import { useDispatch } from "react-redux";
  import { loginUser } from "../../redux/apiRequest";
  
  const Login = ({ navigation }) => {
    const [info, setInfo] = useState({
      email: "",
      password: "",
    });
    const dispatch = useDispatch();
  
    return (
      <View>
        <View style={styles.logo}>
          <View style={styles.boxLogin}>
            <Text style={styles.chuLogo}>Login Here</Text>
          </View>
  
          <View style={styles.boxWelcome}>
            <Text style={styles.chuWelcome}>Welcome back you’ve</Text>
            <Text style={styles.chuWelcome}> been missed!</Text>
          </View>
        </View>
  
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={info.email}
            onChangeText={(e) => setInfo({ ...info, email: e })}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={info.password}
            onChangeText={(e) => setInfo({ ...info, password: e })}
          />
        </View>
        <View style={styles.boxQuenMk}>
          <Text style={styles.chuQuenMK}>Forgot your password?</Text>
        </View>
  
        <TouchableOpacity
          style={styles.signin}
          onPress={() => loginUser(info, dispatch, navigation)} // gọi loginUser khi nhấn SignIn
        >
          <Text style={styles.chuSignIn}>Sign in</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={styles.boxCreate}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.chuCreate}>Create new account</Text>
        </TouchableOpacity>
      </View>
    );
  };
const styles = StyleSheet.create({
  logo: {
    height: 131,
    width: 228,
    marginTop: 97,
    marginLeft: 96,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  chuLogo: {
    color: "#1F41BB",
    fontWeight: "bold",
    fontSize: 30,
  },
  chuWelcome: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 20,
  },
  boxLogin: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  boxWelcome: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -80,
  },
  inputContainer: {
    marginTop: 30,
    marginBottom: 20,
    padding: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#1F41BB",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: "#F1F4FF",
  },
  boxQuenMk: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: 20,
    paddingRight: 10,
    marginTop: -30,
  },
  chuQuenMK: {
    color: "#1F41BB",
    fontWeight: "bold",
    fontSize: 14,
  },

  signin: {
    width: 357,
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1F41BB",
    borderRadius: 10,
  },
  chuSignIn: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
  },
  boxCreate: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  chuCreate: {
    color: "black",
    fontWeight: "bold",
    fontSize: 14,
  },
});
export default Login;
