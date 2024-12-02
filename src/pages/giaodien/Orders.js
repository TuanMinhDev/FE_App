import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Orders = ({ navigation }) => {
   

    return (
        <View style={styles.container}>
            <ScrollView style={styles.orderList}>
                

            </ScrollView>

            
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    orderList: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 20,
    },
    orderItem: {
        backgroundColor: "#F9F9F9",
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    orderValue: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 5,
    },
    orderStatus: {
        fontSize: 14,
        color: "#555",
        marginBottom: 5,
    },
    orderTime: {
        fontSize: 12,
        color: "#888",
    },
    bottomBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
        height: 60,
        borderTopWidth: 1,
        borderTopColor: "#ddd",
    },
    iconButton: {
        justifyContent: "center",
        alignItems: "center",
    },
    iconLabel: {
        fontSize: 12,
        color: "#aaa",
        marginTop: 4,
    },
    activeTab: {
        fontWeight: "bold",
        color: "#000",
    },
});

export default Orders;
