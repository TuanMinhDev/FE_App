import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";

const ProductDetail = ({ route }) => {
  const { id } = route.params;

  const [product, setProduct] = useState(null);
  const [info, setInfo] = useState({
    quantity: 1,
    size: "",
  });

  const currentUser = useSelector((state) => state.login.login.currentUser);

  useEffect(() => {
    const handleProductDetail = async () => {
      try {
        const res = await axios.get(`http://10.0.2.2:4000/api/product/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
        Alert.alert("Error", "Failed to fetch product details");
      }
    };

    handleProductDetail();
  }, [id]);

  if (!product) {
    return <Text>Loading...</Text>;
  }

  const handleAddToCart = async () => {
    if (!info.size) {
      Alert.alert("Error", "Please select a size before adding to cart");
      return;
    }

    try {
      await axios.post(
        "http://10.0.2.2:4000/api/cart",
        {
          productId: id,
          quantity: info.quantity,
          size: info.size,
        },
        {
          headers: { token: `Bearer ${currentUser.accessToken}` },
        }
      );
      Alert.alert("Success", "Product added to cart");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to add product to cart");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.productImageContainer}>
        <Image
          source={{ uri: product.linkImg1 }}
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.nameProduct}</Text>
        <Text style={styles.productPrice}>${product.price}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
      </View>

      {product.linkImg2 && (
        <View style={styles.productImageContainer}>
          <Image
            source={{ uri: product.linkImg2 }}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>
      )}
      {product.linkImg3 && (
        <View style={styles.productImageContainer}>
          <Image
            source={{ uri: product.linkImg3 }}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>
      )}

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

      <View style={styles.fixedActions}>
        <TouchableOpacity style={styles.buyNowButton}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => handleAddToCart()}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
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
    color: "#007BFF",
    fontWeight: "bold",
    marginTop: 8,
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 12,
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
});

export default ProductDetail;
