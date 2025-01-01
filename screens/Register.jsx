// screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios'; // Import Axios for HTTP requests
import { SERVER_URL } from '@env'; // Use environment variable for the server URL

const RegisterScreen = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const handleRegister = async () => {
        const payload = {
            email,
            password,
            phone,
            firstName,
            lastName,
            role: "2", // Role is always fixed to 2
        };

        try {
            const response = await axios.post(`${SERVER_URL}/api/auth/email/register`, payload);
            if (response.status === 200) {
                Alert.alert('Success', 'Registration successful!', [
                    { text: 'OK', onPress: () => navigation.navigate('Login') },
                ]);
            } else {
                Alert.alert('Error', 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to register. Please check your details and try again.');
        }
    };

    return (
        <View className="flex-1 bg-white p-6 justify-center">
            <Text className="text-3xl font-bold mb-8 text-center text-gray-800">Register</Text>
            <TextInput
                className="w-full bg-gray-50 rounded-xl px-4 py-3 mb-4 border border-gray-200"
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                className="w-full bg-gray-50 rounded-xl px-4 py-3 mb-4 border border-gray-200"
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />
            <TextInput
                className="w-full bg-gray-50 rounded-xl px-4 py-3 mb-4 border border-gray-200"
                placeholder="Phone"
                value={phone}
                onChangeText={setPhone}
            />
            <TextInput
                className="w-full bg-gray-50 rounded-xl px-4 py-3 mb-4 border border-gray-200"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                className="w-full bg-gray-50 rounded-xl px-4 py-3 mb-6 border border-gray-200"
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity
                className="w-full bg-blue-500 rounded-xl px-4 py-4 mb-4"
                onPress={handleRegister}
            >
                <Text className="text-white text-center font-bold text-lg">Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
                className="w-full rounded-xl px-4 py-4"
                onPress={() => navigation.navigate('Login')}
            >
                <Text className="text-blue-500 text-center font-semibold">
                    Already have an account? Login
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default RegisterScreen;
