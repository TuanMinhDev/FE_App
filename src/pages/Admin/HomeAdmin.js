import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const HomeAdmin = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate("AllUser")}
      >
        <Text style={styles.buttonText}>Xem người dùng</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate("AddProduct")}
      >
        <Text style={styles.buttonText}>Thêm sản phẩm</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate("AddProduct")}
      >
        <Text style={styles.buttonText}>Xem sản phẩm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f7f7f7", // Light background color
  },
  button: {
    backgroundColor: "#4CAF50", // Green button
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
    width: "80%", // Button width
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff", // White text
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeAdmin;
