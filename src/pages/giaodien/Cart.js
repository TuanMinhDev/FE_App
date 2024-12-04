import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, getCart, postBill, putCart } from "../../redux/apiRequest";
import Icon from "react-native-vector-icons/AntDesign";
import { current } from "@reduxjs/toolkit";

const Cart = ({ navigation }) => {
  const currentUser = useSelector((state) => state.login.login.currentUser);
  const dataCart = useSelector((state) => state.carts.carts.listCarts);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (!currentUser?.accessToken) return;
    getCart(dispatch, currentUser.accessToken);
  }, [currentUser?.accessToken, dataCart.quantity]);

  useEffect(() => {
    if (dataCart?.products?.length) {
      const total = dataCart.products.reduce(
        (total, item) => total + item.productId.price * item.quantity,
        0
      );
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  }, [dataCart]);

  if (!dataCart?.products?.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyCartText}>Your cart is empty!</Text>
      </View>
    );
  }

  const handleNewQuantity = async (action, productId, size) => {
    const updatedProduct = dataCart.products.find(
      (item) => item.productId._id === productId && item.size === size
    );

    if (!updatedProduct) return;

    const updatedQuantity =
      action === "increase"
        ? updatedProduct.quantity + 1
        : Math.max(updatedProduct.quantity - 1, 1);

    putCart(
      dispatch,
      updatedQuantity,
      size,
      productId,
      currentUser.accessToken
    );
  };
  const handleDeleteCart = (size, id) => {
    if (!size || !id || !currentUser?.accessToken) {
      console.error("Thiếu dữ liệu cần thiết để xóa giỏ hàng");
      return;
    }
    deleteCart(dispatch, size, id, currentUser.accessToken);
  };
  

  const handleBuyCart = async () => {
    if (!dataCart?.products?.length) {
      Alert.alert("Error", "Your cart is empty!");
      return;
    }
    postBill(dispatch, dataCart._id, totalPrice, currentUser.accessToken, navigation);

  
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.lui} onPress={() => navigation.goBack()}>
        <Icon name="arrowleft" size={30} color="#000" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {dataCart.products.map((item) => (
          <View
            key={item.productId._id + item.size}
            style={styles.productContainer}
          >
            <View>
              <Image
                source={{ uri: item.productId.linkImg1 }}
                style={styles.productCartImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.productDetails}>
              <Text style={styles.productName}>
                {item.productId.nameProduct}
              </Text>
              <Text style={styles.productSize}>Size: {item.size}</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.boxTangGiam}
                  onPress={() =>
                    handleNewQuantity("decrease", item.productId._id, item.size)
                  }
                >
                  <Text>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.boxTangGiam}
                  onPress={() =>
                    handleNewQuantity("increase", item.productId._id, item.size)
                  }
                >
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.productPrice}>
                Price: {item.productId.price}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => handleDeleteCart(item.size, item.productId._id)}
              >
                <Icon name="delete" size={30} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.ThanhToan}>
        <Text style={styles.totalPrice}>Total: {totalPrice}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleBuyCart}>
          <Text style={styles.buttonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
    paddingTop: 50,
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  emptyCartText: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    marginTop: 50,
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  productSize: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  quantityText: {
    fontSize: 14,
    color: "#555",
    marginHorizontal: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007BFF",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  checkoutButton: {
    position: "absolute",
    bottom: 15,
    left: 15,
    right: 15,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  ThanhToan: {
    paddingLeft: 20,
    height: 110,
  },
  lui: {
    marginBottom: 10,
  },
  productCartImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
    marginLeft: 10,
    backgroundColor: "#ddd",
    borderColor: "#ccc",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    resizeMode: "contain",
  },
  boxTangGiam: {
    width: 30,
    height: 30,
    backgroundColor: "#ddd",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    marginLeft: 10,
  },
});

export default Cart;
