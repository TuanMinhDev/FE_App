import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";

const Cart = ({ navigation }) => {
  const [dataCart, setDataCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // Thêm state cho totalPrice
  const currentUser = useSelector((state) => state.login.login.currentUser);
  console.log(dataCart);

  // Lấy dữ liệu giỏ hàng từ API khi component mount
  useEffect(() => {
    const handleGetCart = async () => {
      try {
        const res = await axios.get("http://10.0.2.2:4000/api/cart", {
          headers: { token: `Bearer ${currentUser.accessToken}` },
        });
        setDataCart(res.data);
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to fetch cart data");
      }
    };
    handleGetCart();
  }, [currentUser.accessToken]);

  
  useEffect(() => {
    if (dataCart?.products?.length) {
      const total = dataCart.products.reduce(
        (total, item) => total + item.products.productId.price * item.products.quantity,
        0
      );
      setTotalPrice(total);
    }
  }, [dataCart]);

  
  if (!dataCart?.products?.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyCartText}>Your cart is empty!</Text>
      </View>
    );
  }

  // Hàm xử lý thay đổi số lượng sản phẩm trong giỏ
  const handleNewQuantity = async (action, productId) => {
    const updatedProducts = dataCart.products.map((item) => {
      if (item.products.productId._id === productId) {
        const updatedQuantity =
          action === "tang"
            ? item.products.quantity + 1
            : Math.max(item.products.quantity - 1, 1);
        return { ...item, quantity: updatedQuantity };
      }
      return item;
    });

    setDataCart({ ...dataCart, products: updatedProducts });

    try {
      await axios.put(
        `http://10.0.2.2:4000/api/cart/${productId}`,
        {
          newQuantity: updatedProducts.find((item) => item.products.productId._id === productId).quantity,
        },
        {
          headers: { token: `Bearer ${currentUser.accessToken}` },
        }
      );
    } catch (error) {
      Alert.alert("Error", "Failed to update quantity");
      console.error(error);
    }
  };

  
  const handleBuyCart = async () => {
    if (!dataCart?.products?.length) {
      Alert.alert("Error", "Your cart is empty!");
      return;
    }
  
    // Lấy cartId từ giỏ hàng (giả sử rằng mỗi sản phẩm trong giỏ đều có cartId, bạn cần thay đổi logic tùy thuộc vào dữ liệu thực tế)
    const cartId = "674b3f31c07d26f81d279e68"; // Hoặc nếu dữ liệu cartId khác, cần lấy đúng giá trị
  
    try {
      // Gửi yêu cầu tạo hóa đơn với cartId và totalPrice
      const response = await axios.post(
        "http://10.0.2.2:4000/api/bill",
        {
          cartId: cartId,
          totalPrice: totalPrice,
        },
        {
          headers: { token: `Bearer ${currentUser.accessToken}` },
        }
      );
  
      if (response.status === 200) {
        Alert.alert("Success", "Purchase completed successfully!");
       
  
        // Chuyển hướng đến màn hình hóa đơn hoặc cập nhật UI nếu cần
        navigation.navigate("Invoice"); // Ví dụ chuyển sang màn hình hóa đơn
      } else {
        Alert.alert("Error", "Failed to complete the purchase");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to complete the purchase");
      console.error(error);
    }
  };
  

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {dataCart.map((item, index) => (
          <TouchableOpacity key={index}>
            <View style={styles.productContainer}>
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.products.productId.nameProduct}</Text>
                <Text style={styles.productSize}>Size: {item.products.size}</Text>
                <TouchableOpacity onPress={() => handleNewQuantity("giam", item.products.productId._id)}>
                  <Text>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>Quantity: {item.products.quantity}</Text>
                <TouchableOpacity onPress={() => handleNewQuantity("tang", item.products.productId._id)}>
                  <Text>+</Text>
                </TouchableOpacity>
                <Text style={styles.productPrice}>
                  Price: {item.products.productId.price}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <Text style={styles.totalPrice}>Total: {totalPrice}</Text>
      </ScrollView>
      <TouchableOpacity style={styles.checkoutButton} onPress={()=>handleBuyCart()}>
        <Text style={styles.buttonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
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
    alignitems: "center",
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
    elevation: 3, // Bóng đổ cho Android
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
    marginBottom: 5,
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
    marginTop: 20,
  },
  checkoutButton: {
    position: "absolute",
    bottom: 15,
    left: 15,
    right: 15,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    paddingVertical: 15,
    alignitems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Cart;
