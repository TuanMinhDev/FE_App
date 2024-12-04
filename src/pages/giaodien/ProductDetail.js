import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { getProductById, postBill, postBill2, postCart } from "../../redux/apiRequest";
import Icon from "react-native-vector-icons/AntDesign";

const ProductDetail = ({ route, navigation }) => {
  const { id } = route.params;

  const [info, setInfo] = useState({
    productId: id,
    quantity: 1,
    size: "",
  });

  const currentUser = useSelector((state) => state.login.login.currentUser);
  const product = useSelector((state) => state.products.singleProduct.product);
  const dispatch = useDispatch();

  useEffect(() => {
    getProductById(dispatch, id);
  }, [id]);

  const [pic, setPic] = useState(null);

  useEffect(() => {
    if (product) {
      setPic(product.linkImg1);
    }
  }, [product]);

  if (!product) {
    return <Text>Loading...</Text>;
  }

  const handleAddToCart = () => {
    if (!info.size) {
      Alert.alert("Error", "Please select a size before adding to cart");
      return;
    }

    postCart(dispatch, info, currentUser.accessToken)
      .then(() => {
        Alert.alert("Sản phẩm đã thêm vào giỏ hàng");
      })
      .catch(() => {
        Alert.alert("Lỗi");
      });
  };

  const handlePic = (anh) => {
    setPic(anh);
  };
  const totalPrice = info.quantity * product.price; 
  const handleBuyNow = () =>{
    postBill2(dispatch,id, info.size, info.quantity,totalPrice, currentUser.accessToken, navigation);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.lui} onPress={() => navigation.goBack()}>
        <Icon name="arrowleft" size={30} color="#000" />
      </TouchableOpacity>

      <View style={styles.productImageContainer}>
        <Image
          source={{ uri: pic }}
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.boxPic}>
        <TouchableOpacity
          style={styles.boxIdPic}
          onPress={() => handlePic(product.linkImg1)}
        >
          <Image source={{ uri: product.linkImg1 }} style={styles.pic} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.boxIdPic}
          onPress={() => handlePic(product.linkImg2)}
        >
          <Image source={{ uri: product.linkImg2 }} style={styles.pic} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.boxIdPic}
          onPress={() => handlePic(product.linkImg3)}
        >
          <Image source={{ uri: product.linkImg3 }} style={styles.pic} />
        </TouchableOpacity>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.nameProduct}</Text>
        <Text style={styles.productPrice}>Giá: {product.price} VND</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() =>
            setInfo((prev) => ({
              ...prev,
              quantity: Math.max(1, prev.quantity - 1),
            }))
          }
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{info.quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() =>
            setInfo((prev) => ({
              ...prev,
              quantity: prev.quantity + 1,
            }))
          }
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sizeContainer}>
        {["S", "M", "L", "XL"].map((size) => (
          <TouchableOpacity
            key={size}
            style={[
              styles.sizeButton,
              info.size === size && styles.selectedSizeButton,
            ]}
            onPress={() => setInfo((prev) => ({ ...prev, size }))}
          >
            <Text
              style={[
                styles.sizeButtonText,
                info.size === size && styles.selectedSizeButtonText,
              ]}
            >
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.fixedActions}>
        <TouchableOpacity style={styles.buyNowButton} onPress={()=> handleBuyNow()}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => handleAddToCart()}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    paddingTop: 50,
  },
  productImageContainer: {
    width: "100%",
    height: 250,
    marginBottom: 20,
  },
  productImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  productInfo: {
    marginTop: 15,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    marginTop: 8,
  },
  sizeContainer: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "center",
  },
  sizeButton: {
    marginHorizontal: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  selectedSizeButton: {
    backgroundColor: "#007BFF",
    borderColor: "#007BFF",
  },
  sizeButtonText: {
    fontSize: 16,
    color: "#333",
  },
  selectedSizeButtonText: {
    color: "#fff",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  quantityButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginHorizontal: 10,
  },
  quantityButtonText: {
    fontSize: 18,
    color: "#333",
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  fixedActions: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    paddingVertical: 12,
    marginRight: 8,
    alignItems: "center",
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: "#28a745",
    borderRadius: 5,
    paddingVertical: 12,
    marginLeft: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  boxPic: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
    width: "100%",
  },
  pic: {
    width: "100%",
    height: 150,
  },
  boxIdPic: {
    width: "30%",
    marginBottom: 5,
    marginLeft: 5,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  lui: {
    marginBottom: 10,
  },
});

export default ProductDetail;
