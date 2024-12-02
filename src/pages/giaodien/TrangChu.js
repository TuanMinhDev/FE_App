import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
const TrangChu = ({ navigation }) => {
  const images = [
    "https://product.hstatic.net/200000525319/product/milk_box__10__0e853655bac04bfdb6058d79a96f6ddd_large.jpg",
    "https://product.hstatic.net/200000525319/product/lazy_boss__9__077559e85e2342b2b4b5d2f77ff4aadc_large.jpg",
    "https://product.hstatic.net/200000525319/product/bag__3__f884f3895330481fa66440381d3048d1_large.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const handleGetAllProduct = async () => {
      try {
        const res = await axios.get("http://10.0.2.2:4000/api/product");
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleGetAllProduct();
  }, []);

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductDetail", { id: item._id })
        }
      >
        <Image source={{ uri: item.linkImg1 }} style={styles.productImage} />
        <Text style={styles.productName}>{item.nameProduct}</Text>
        <Text style={styles.productPrice}>{item.price} VNĐ</Text>
      </TouchableOpacity>
      
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.boxSearch}>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Icon
              name="search"
              size={20}
              color="#007BFF"
              style={styles.searchIcon}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Tìm kiếm sản phẩm"
            style={styles.input}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <Icon name="shopping-cart" size={30} color="#007BFF" />
        </TouchableOpacity>
      </View>

      
      <ScrollView>
        <View style={styles.boxVoucherContainer}>
        <View style={styles.boxVoucher}>
          <Image
            source={{ uri: images[currentImageIndex] }}
            style={styles.voucherImage}
          />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Sản phẩm mới</Text>

      {/* Product List */}
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={renderProductItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.productList}
        ListEmptyComponent={
          <Text style={styles.noProducts}>Không có sản phẩm nào.</Text>
        }
      />
      </ScrollView>
      <TouchableOpacity onPress={()=> navigation.navigate("User")}><Text>User</Text></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: "#F1F4FF",
  },
  boxSearch: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5E5E5",
    width: 230,
    height: 40,
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#333",
  },
  boxVoucherContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  boxVoucher: {
    width: "90%",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderWidth: 1,
  },
  voucherImage: {
    width: "100%",
    height: 160,
    resizeMode: "contain",
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  productList: {
    paddingHorizontal: 10,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  productItem: {
    width: "48%",
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 14,
    color: "#007BFF",
  },
  addToCartButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#007BFF",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  noProducts: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    marginTop: 20,
  },
});

export default TrangChu;
