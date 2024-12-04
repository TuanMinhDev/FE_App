import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getBill } from "../../redux/apiRequest";
import Icon from "react-native-vector-icons/AntDesign";

const Bill = ({ navigation }) => {
  const currentUser = useSelector((state) => state.login.login.currentUser);
  const dispatch = useDispatch();
  const bills = useSelector((state) => state.bills.bills.bill); // bills.bill có thể là null

  useEffect(() => {
    if (currentUser?.accessToken) {
      getBill(dispatch, currentUser.accessToken);
    }
  }, [dispatch, currentUser?.accessToken]);

  // Kiểm tra nếu bills.carts và products có dữ liệu trước khi truy cập
  const products = bills?.carts?.cartId?.products || [];
  const oneProduct = bills?.product?.productId;

  const listProduct = useSelector(
    (state) => state.products.products.listProducts
  );
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.lui} onPress={() => navigation.goBack()}>
        <Icon name="arrowleft" size={30} color="#000" />
      </TouchableOpacity>
      <ScrollView>
        {products.length > 0 ? (
          products.map((product) => {
            const matchedProduct = listProduct.find(
              (item) => item._id === product.productId
            );

            return (
              <View key={product._id} style={styles.billContainer}>
                <View style={styles.khung}>
                  <Image
                    source={{
                      uri: matchedProduct?.linkImg1 || null,
                    }}
                    style={styles.productImage}
                  />
                  <View style={styles.conten}>
                    <Text>{matchedProduct.nameProduct}</Text>
                    <View style={styles.sizeQuatity}>
                      <Text style={styles.billText}>
                        <Text style={styles.label}>Size:</Text> {product.size}
                      </Text>
                      <Text style={styles.billText}>
                        <Text style={styles.label}>x</Text>
                        {product.quantity}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.billContainer}>
            <View style={styles.khung}>
              <Image
                source={{ uri: bills?.product?.productId?.linkImg1 }}
                style={styles.productImage}
              />
              <View style={styles.conten}>
                <Text>{bills?.product?.productId?.nameProduct}</Text>
                <View style={styles.sizeQuatity}>
                  <Text style={styles.billText}>
                    <Text style={styles.label}>Size:</Text>{" "}
                    {bills?.product?.size}
                  </Text>
                  <Text style={styles.billText}>
                    <Text style={styles.label}>x</Text>
                    {bills?.product?.quantity}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
      <View style={styles.boxContentUser}>
        <Text style={styles.chuUser}>Name: {currentUser.user.name}</Text>
        <Text style={styles.chuUser}>SĐT: {currentUser.user.phoneNumber}</Text>
        <Text style={styles.chuUser}>Địa chỉ: {currentUser.user.address}</Text>
        <View style={styles.sum}>
          <Text style={styles.totalPrice}>Tổng: {bills.totalPrice}</Text>
          <TouchableOpacity style={styles.boxThanhToan}>
            <Text>Thanh toán</Text>
          </TouchableOpacity>
        </View>
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
  lui: {
    marginBottom: 10,
  },
  billContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  billText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  label: {
    fontWeight: "bold",
    color: "#555",
  },
  noDataContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginBottom: 10,
  },
  productDetails: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  khung: {
    flexDirection: "row",
  },
  conten: {
    marginLeft: 10,
  },
  sizeQuatity: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    width: "70%",
    color: "#555",
    fontSize: 16,
  },
  boxContentUser: {
    height: 150,
  },
  chuUser: {
    fontSize: 18,
    marginBottom: 5,
    color: "#555",
    fontWeight: "bold",
  },
  sum: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
  },
  totalPrice: {
    color: "red",
    fontSize: 16,
  },
  boxThanhToan: {
    backgroundColor: "#1F41BB",
    padding: 10,
    borderRadius: 8,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    width: "100",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default Bill;
