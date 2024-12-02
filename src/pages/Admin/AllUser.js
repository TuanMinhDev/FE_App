import { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";  
import { deleteUsers, getAllUsers } from "../../redux/apiRequest";
import { useSelector, useDispatch } from "react-redux";

const AllUser = () => {
    const currentUser = useSelector((state) => state.login.login.currentUser); // Đổi tên biến user thành currentUser
    const dispatch = useDispatch();
    
    const listUser = useSelector((state) => state.users?.users?.allUsers || []); 

    useEffect(() => {
        if (currentUser?.accessToken) {  
            getAllUsers(currentUser.accessToken, dispatch);
        }
    }, [currentUser?.accessToken, dispatch]);

    const handleDelete = (userId) => {
        if (currentUser?.accessToken) {
            deleteUsers(currentUser.accessToken, dispatch, userId);
        } else {
            console.error("Access token not available.");
        }
    };

    return (
        <View style={styles.container}>
            {listUser.length > 0 ? (
                listUser.map((userItem) => (  
                    <View key={userItem._id} style={styles.userCard}>
                        <Text style={styles.userName}>{userItem.name}</Text>
                        <TouchableOpacity 
                            onPress={() => handleDelete(userItem._id)}
                            style={styles.deleteButton}
                        >
                            <Text style={styles.deleteButtonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                ))
            ) : (
                <Text style={styles.noUsersText}>No users found.</Text>  
            )}
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  userCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: "#ff4d4d", // Red color for the delete button
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  noUsersText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
});

export default AllUser;
