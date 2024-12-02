import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Modal } from "react-native";
import { useSelector } from "react-redux";

const User = () => {
  const users = useSelector((state) => state.login?.login?.currentUser);
  const [people, setPeople] = useState([]); // Danh sách người dùng
  const [editData, setEditData] = useState({}); // Dữ liệu chỉnh sửa
  const [modalVisible, setModalVisible] = useState(false); // Trạng thái của Modal
  const [selectedUserId, setSelectedUserId] = useState(null); // ID người dùng đang chỉnh sửa

  const token = users?.accessToken;

  // Lấy danh sách người dùng
  useEffect(() => {
    const handleUser = async () => {
      try {
        const res = await axios.get(`http://10.0.2.2:4000/api/user`, {
          headers: { token: `Bearer ${token}` },
        });
        setPeople(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    handleUser();
  }, [token]);

  // Mở Modal và thiết lập dữ liệu người dùng cần chỉnh sửa
  const handleEdit = (user) => {
    setEditData(user);
    setSelectedUserId(user._id);
    setModalVisible(true);
  };

  // Cập nhật thông tin người dùng
  const handleUpdateUser = async () => {
    try {
      const res = await axios.put(
        `http://10.0.2.2:4000/api/user/${selectedUserId}`,
        editData,
        {
          headers: { token: `Bearer ${token}` },
        }
      );
      alert("Cập nhật thông tin thành công!");

      // Cập nhật danh sách hiển thị
      setPeople((prev) =>
        prev.map((user) =>
          user._id === selectedUserId ? { ...user, ...res.data } : user
        )
      );
      setModalVisible(false); // Đóng Modal
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách người dùng</Text>
      {people.map((item) => (
        <View key={item._id} style={styles.userContainer}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text>Email: {item.email}</Text>
          <Text>Phone: {item.phone}</Text>
          <Text>Address: {item.address}</Text>
          <Button title="Sửa" onPress={() => handleEdit(item)} />
        </View>
      ))}

      {/* Modal chỉnh sửa */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Chỉnh sửa thông tin</Text>
          <TextInput
            style={styles.input}
            value={editData.name || ""}
            onChangeText={(text) => setEditData({ ...editData, name: text })}
            placeholder="Tên"
          />
          <TextInput
            style={styles.input}
            value={editData.email || ""}
            onChangeText={(text) => setEditData({ ...editData, email: text })}
            placeholder="Email"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            value={editData.phone || ""}
            onChangeText={(text) => setEditData({ ...editData, phone: text })}
            placeholder="Số điện thoại"
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            value={editData.address || ""}
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
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalTitle: {
    fontSize: 20,
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
