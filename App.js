import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/pages/login/Login";
import Register from "./src/pages/login/Register";
import TrangChu from "./src/pages/giaodien/TrangChu";
import Orders from "./src/pages/giaodien/Orders";
import ProductDetail from "./src/pages/giaodien/ProductDetail";
import Cart from "./src/pages/giaodien/Cart";
import HomeAdmin from "./src/pages/Admin/HomeAdmin";
import AllUser from "./src/pages/Admin/AllUser";
import AddProduct from "./src/pages/Admin/AddProduct";
import ProductAdmin from "./src/pages/Admin/ProductAdmin";
import User from "./src/pages/giaodien/User";
import Bill from "./src/pages/giaodien/Bill";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="TrangChu" component={TrangChu} />
        <Stack.Screen name="Orders" component={Orders} />
        <Stack.Screen name="HomeAdmin" component={HomeAdmin} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="AllUser" component={AllUser} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
        <Stack.Screen name="ProductAdmin" component={ProductAdmin} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="Bill" component={Bill} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
