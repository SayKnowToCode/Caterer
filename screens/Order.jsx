import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Switch } from 'react-native'; // Import Switch
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { SERVER_URL } from '@env'; // Import SERVER_URL from environment variables
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Order = ({ route }) => {
    const { dish, numberOfPeople, selectedItems } = route.params;
    const navigation = useNavigation();

    const [eventDate, setEventDate] = useState(new Date());
    const [eventTime, setEventTime] = useState(new Date());
    const [eventAddress, setEventAddress] = useState('');
    const [message, setMessage] = useState('');
    const [quantity, setQuantity] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [isJain, setIsJain] = useState(false); // Add this line
    const [jainPeopleCount, setJainPeopleCount] = useState(''); // Add this line
    const [user, setUser] = useState({}); // Add this line

    useEffect(() => {
        const fetchUser = async () => {
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            setUser(user);
        };

        fetchUser();
    }, []);

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || eventDate;
        setShowDatePicker(false);
        setEventDate(currentDate);
    };

    const handleTimeChange = (event, selectedTime) => {
        const currentTime = selectedTime || eventTime;
        setShowTimePicker(false);
        setEventTime(currentTime);
    };

    const transformSelectedItems = (selectedItems) => {
        return Object.keys(selectedItems).map((item) => ({
            item,
            quantity: 1, // Assuming quantity is 1 for each item type
            menuItem: selectedItems[item],
        }));
    };

    const handleSubmit = async () => {
        const items = transformSelectedItems(selectedItems);

        const myorder = {
            catererId: dish.catererId,
            dishId: dish?.id || "",
            userId: user.id || "",
            items,
            totalAmount: 20000,
            dishQuantity: Number(quantity) || 1,
            paymentStatus: "Pending",
            address: eventAddress,
            message,
            jainNumber: Number(jainPeopleCount) || 0,
            orderDate: new Date().toISOString(),
            deliveryDate: eventDate.toISOString(),
            time: eventTime.toLocaleTimeString(),
            status: {
                id: 0,
            },
        };

        try {
            const response = await axios.post(`${SERVER_URL}/api/orders`, myorder);
            console.log("Order submitted successfully");
            navigation.navigate('Bookings');
        } catch (error) {
            console.error("Error submitting order:", error);
            // Handle error
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Order</Text>

            {/* Event Date Picker */}
            <Button title="Select Event Date" onPress={() => setShowDatePicker(true)} />
            {showDatePicker && (
                <DateTimePicker
                    value={eventDate}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}
            <Text>Selected Date: {eventDate.toLocaleDateString()}</Text>

            {/* Event Time Picker */}
            <Button title="Select Event Time" onPress={() => setShowTimePicker(true)} />
            {showTimePicker && (
                <DateTimePicker
                    value={eventTime}
                    mode="time"
                    display="default"
                    onChange={handleTimeChange}
                />
            )}
            <Text>Selected Time: {eventTime.toLocaleTimeString()}</Text>

            {/* Event Address */}
            <TextInput
                style={{ borderWidth: 1, padding: 10, marginBottom: 15 }}
                placeholder="Event Address"
                value={eventAddress}
                onChangeText={setEventAddress}
            />

            {/* Special Message */}
            <TextInput
                style={{ borderWidth: 1, padding: 10, marginBottom: 15 }}
                placeholder="Message (special instructions)"
                value={message}
                onChangeText={setMessage}
            />

            {/* Number of People */}
            <TextInput
                style={{ borderWidth: 1, padding: 10, marginBottom: 15 }}
                placeholder="Number of People"
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
            />

            {/* Jain People Switch */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                <Text>Are there any Jain people?</Text>
                <Switch
                    value={isJain}
                    onValueChange={setIsJain}
                />
            </View>

            {/* Number of Jain People */}
            {isJain && (
                <TextInput
                    style={{ borderWidth: 1, padding: 10, marginBottom: 15 }}
                    placeholder="Number of Jain People"
                    value={jainPeopleCount}
                    onChangeText={setJainPeopleCount}
                    keyboardType="numeric"
                />
            )}

            {/* Submit Button */}
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

export default Order;
