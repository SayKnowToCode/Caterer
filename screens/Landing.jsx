import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import 'nativewind'

const Landing = () => {
    const navigation = useNavigation();

    return (
        <View className="flex-1 justify-center items-center bg-white">
            <Text className="text-2xl font-bold mb-2">Welcome to Caterers Near Me</Text>
            <Text className="text-lg text-gray-600 mb-5">Find the best caterers in your area</Text>
            <TouchableOpacity
                className="bg-blue-500 p-3 rounded mb-2"
                onPress={() => navigation.navigate('Home')}
            >
                <Text className="text-white text-lg">Go to Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
                className="bg-green-500 p-3 rounded mb-2"
                onPress={() => navigation.navigate('Login')}
            >
                <Text className="text-white text-lg">Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                className="bg-red-500 p-3 rounded"
                onPress={() => navigation.navigate('Register')}
            >
                <Text className="text-white text-lg">Register</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Landing