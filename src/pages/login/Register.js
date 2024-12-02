import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { registerUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
const Register = ({ navigation }) => {
    const [info, setInfo]= useState({
        email: "",
        name: "",
        phoneNumber: "",
        address: "",
        password: "",
      });
      const dispatch = useDispatch();
    const handleRegister = ()=>{
        registerUser(info,dispatch, navigation )
    }
  return (
    <View>
      <View style={styles.logo}>
        <View style={styles.boxLogo}>
          <Text style={styles.chuLogo}>Create Account</Text>
        </View>

        <View style={styles.boxWelcome}>
          <Text style={styles.chuWelcome}>
            Create an account so you can explore all the existing jobs
          </Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Email" value={info.email} onChangeText={(e)=> setInfo({...info, email: e})} />
        <TextInput style={styles.input} placeholder="Name"  value={info.name} onChangeText={(e)=> setInfo({...info, name: e})}/>
        <TextInput style={styles.input} placeholder="Phone"  value={info.phoneNumber} onChangeText={(e)=> setInfo({...info, phoneNumber: e})}/>
        <TextInput style={styles.input} placeholder="Address"  value={info.address} onChangeText={(e)=> setInfo({...info, address: e})}/>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={info.password} onChangeText={(e)=> setInfo({...info, password: e})}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
        />
      </View>
      <TouchableOpacity
        style={styles.signUp}
        onPress={() => handleRegister()}
      >
        <Text style={styles.chuSignUp}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.boxCreate}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.chuCreate}>Already have an account</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  logo: {
    height: 131,
    width: 228,
    marginTop: 40,
    marginLeft: 96,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  chuLogo: {
    color: "#1F41BB",
    fontWeight: "bold",
    fontSize: 30,
    marginLeft: -30,
  },
  chuWelcome: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 30,
  },
  boxLogo: {
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
    marginTop: 10,
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

  signUp: {
    width: 357,
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1F41BB",
    borderRadius: 10,
  },
  chuSignUp: {
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
export default Register;
