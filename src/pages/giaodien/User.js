import axios from "axios";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { putUser } from "../../redux/apiRequest";

const User = () => {
  const currentUser = useSelector((state) => state.login?.login?.currentUser);

  const [editData, setEditData] = useState({}); // Dữ liệu chỉnh sửa
  const [modalVisible, setModalVisible] = useState(false); // Trạng thái của Modal
  const dispatch = useDispatch();

  
  const handleUpdateUser = async () => {
    if (editData) {
      putUser(dispatch, editData, currentUser.accessToken);
      setModalVisible(false); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin người dùng</Text>
      <View style={styles.userContainer}>
        <Text style={styles.userName}>{currentUser.user.name}</Text>
        <Text style={styles.userDetail}>{currentUser.user.email}</Text>
        <Text style={styles.userDetail}>{currentUser.user.phoneNumber}</Text>
        <Text style={styles.userDetail}>{currentUser.user.address}</Text>
      </View>

      
      <Button
        title="Chỉnh sửa thông tin"
        onPress={() => setModalVisible(true)}
      />

      {/* Modal chỉnh sửa */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Chỉnh sửa thông tin</Text>
          <TextInput
            style={styles.input}
            value={editData.name || currentUser.user.name}
            onChangeText={(text) => setEditData({ ...editData, name: text })}
            placeholder="Tên người dùng"
          />
          <TextInput
            style={styles.input}
            value={editData.email || currentUser.user.email}
            onChangeText={(text) => setEditData({ ...editData, email: text })}
            placeholder="Email"
          />
          <TextInput
            style={styles.input}
            value={editData.phone || currentUser.user.phoneNumber}
            onChangeText={(text) => setEditData({ ...editData, phone: text })}
            placeholder="Số điện thoại"
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            value={editData.address || currentUser.user.address}
            onChangeText={(text) => setEditData({ ...editData, address: text })}
            placeholder="Địa chỉ"
          />
          <Button title="Lưu" onPress={handleUpdateUser} />
          <Button
            title="Đóng"
            onPress={() => setModalVisible(false)}
            color="#FF0000"
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24, // Increased font size
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333", // Darker color for better readability
  },
  userContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  userName: {
    fontWeight: "bold",
    fontSize: 18, // Increased font size for user name
    color: "#333", // Darker color for text
  },
  userDetail: {
    fontSize: 16, // Slightly larger than default text size
    color: "#666", // Lighter color for user details
    marginVertical: 5, // Added vertical margin for spacing
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  modalTitle: {
    fontSize: 22, // Increased modal title size
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
});

export default User;
