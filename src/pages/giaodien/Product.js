import Icon from "react-native-vector-icons/MaterialIcons";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProduct } from "../../redux/apiRequest";

const Product = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const dispatch = useDispatch();
  const listProducts = useSelector(
    (state) => state.products.products.listProducts
  );

  useEffect(() => {
    getAllProduct(dispatch);
  }, [dispatch]);

  useEffect(() => {
    const filterProducts = () => {
      let products = listProducts;
      if (selectedCategory) {
        products = products.filter(
          (product) => product.category === selectedCategory
        );
      }
      if (searchText) {
        products = products.filter((product) =>
          product.nameProduct.toLowerCase().includes(searchText.toLowerCase())
        );
      }

      setFilteredProducts(products);
    };

    filterProducts();
  }, [searchText, selectedCategory, listProducts]);

  const handleCategory = (category) => {
    setSelectedCategory(category);
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image source={{ uri: item.linkImg1 }} style={styles.productImage} />
      <Text style={styles.productName}>{item.nameProduct}</Text>
      <Text style={styles.productPrice}>{item.price} VND</Text>
    </View>
  );

  return (
    <View style={styles.container}>
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
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === null && styles.selectedCategory,
          ]}
          onPress={() => handleCategory(null)}
        >
          <Text style={styles.categoryText}>Tất cả</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "Quần" && styles.selectedCategory,
          ]}
          onPress={() => handleCategory("Quần")}
        >
          <Text style={styles.categoryText}>Quần</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "Áo" && styles.selectedCategory,
          ]}
          onPress={() => handleCategory("Áo")}
        >
          <Text style={styles.categoryText}>Áo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "Mũ" && styles.selectedCategory,
          ]}
          onPress={() => handleCategory("Mũ")}
        >
          <Text style={styles.categoryText}>Mũ</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item._id}
          numColumns={2}
          contentContainerStyle={styles.productList}
          ListEmptyComponent={
            <Text style={styles.noProducts}>Không có sản phẩm nào</Text>
          }
        />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.footerItem}
        >
          <Icon name="home" size={30} color="#007BFF" />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Product")}
          style={styles.footerItem}
        >
          <Icon name="store" size={30} color="#007BFF" />
          <Text style={styles.footerText}>Sản phẩm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Order")}
          style={styles.footerItem}
        >
          <Icon name="list-alt" size={30} color="#007BFF" />
          <Text style={styles.footerText}>Đơn hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("User")}
          style={styles.footerItem}
        >
          <Icon name="person" size={30} color="#007BFF" />
          <Text style={styles.footerText}>User</Text>
        </TouchableOpacity>
      </View>
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
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#f1f1f1",
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedCategory: {
    backgroundColor: "#007BFF",
    borderColor: "#007BFF",
  },
  categoryText: {
    color: "#333",
    fontWeight: "bold",
  },
  productList: {
    paddingHorizontal: 10,
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
    marginRight: 10,
    marginTop: 10,
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
  footer: {
    flexDirection: "row",
    justifyContent: "space-around", // Ensure that items are spaced evenly
    alignItems: "center", // Align items vertically centered
    padding: 10,
    backgroundColor: "#F1F4FF",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  footerItem: {
    alignItems: "center", // Align items horizontally centered
  },
  footerText: {
    fontSize: 12,
    color: "#007BFF",
  },
});

export default Product;
