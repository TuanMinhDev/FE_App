import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";



const AddProduct = ({navigation}) => {
  const [info, setInfo] = useState({
    nameProduct: "",
    price: "",
    linkImg1: "",
    linkImg2: "",
    linkImg3: "",
  });

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://10.0.2.2:4000/api/product/create", info);
      console.log(res);
      Alert.alert("Thêm sản phẩm thành công!");
      navigation.navigate("ProductAdmin");
    } catch (error) {
      Alert.alert("Thêm sản phẩm thất bại!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Product</Text>

      <Text>Name of Product:</Text>
      <TextInput
        style={styles.input}
        value={info.nameProduct}
        onChangeText={(e) => setInfo({ ...info, nameProduct: e })}
      />

      <Text>Price:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={info.price}
        onChangeText={(e) => setInfo({ ...info, price: e })}
      />

      <Text>Image Link 1:</Text>
      <TextInput
        style={styles.input}
        value={info.linkImg1}
        onChangeText={(e) => setInfo({ ...info, linkImg1: e })}
      />

      <Text>Image Link 2 (Optional):</Text>
      <TextInput
        style={styles.input}
        value={info.linkImg2}
        onChangeText={(e) => setInfo({ ...info, linkImg2: e })}
      />

      <Text>Image Link 3 (Optional):</Text>
      <TextInput
        style={styles.input}
        value={info.linkImg3}
        onChangeText={(e) => setInfo({ ...info, linkImg3: e })}
      />

      <Button title="Add Product" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});

export default AddProduct;
