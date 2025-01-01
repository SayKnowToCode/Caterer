import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { SERVER_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Bookings = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const user = JSON.parse(await AsyncStorage.getItem('user'));
                const userId = user.id;
                const response = await axios.get(`${SERVER_URL}/api/orders?filters=[{"userId":"${userId}"}]&limit=10&page=1`);
                const sortedOrders = response.data.data.sort((a, b) => new Date(b.deliveryDate) - new Date(a.deliveryDate));
                setOrders(sortedOrders);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const openModal = (order) => {
        setSelectedOrder(order);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedOrder(null);
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View className="p-4 bg-gray-100 flex-1">
            {orders.length === 0 ? (
                <Text className="text-lg text-gray-600">No bookings available.</Text>
            ) : (
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => openModal(item)}>
                            <View className="bg-white p-4 mb-4 rounded-lg shadow">
                                <Text className="text-lg font-bold text-gray-700">Order ID: {item.id}</Text>
                                <Text className="text-gray-600">Caterer: {item.catererId.name}</Text>
                                <Text className="text-gray-600">Event Date: {item.deliveryDate}</Text>
                                <Text className="text-gray-600">Event Time: {item.time}</Text>
                                <Text className="text-gray-600">Address: {item.address}</Text>
                                <Text className="text-gray-600">Message: {item.message}</Text>
                                <Text className="text-gray-600">Number of People: {item.dishQuantity}</Text>
                                <Text className="text-gray-600">Total Amount: ${item.totalAmount}</Text>
                                <Text className="text-gray-600">Payment Status: {item.paymentStatus}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
            {selectedOrder && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeModal}
                >
                    <View className="flex-1 justify-end bg-black bg-opacity-50">
                        <View className="bg-white p-4 rounded-t-lg shadow-lg">
                            <Text className="text-lg font-bold mb-4 text-gray-800">Items</Text>
                            {selectedOrder.items.map((orderItem) => (
                                <View key={orderItem._id} className="mb-2">
                                    <Text className="text-gray-700">{orderItem.item} - Quantity: {orderItem.quantity}</Text>
                                    <Text className="text-gray-700">Menu Items: {orderItem.menuItem.join(', ')}</Text>
                                </View>
                            ))}
                            <TouchableOpacity onPress={closeModal} className="mt-4">
                                <Text className="text-blue-500">Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

export default Bookings;