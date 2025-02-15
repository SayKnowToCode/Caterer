import React, { useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Modal } from 'react-native';
import { FontAwesome, Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const TopSection = () => {

    const locations = [
        "Andheri East, Mumbai",
        "Churchgate, Mumbai",
        "Ghatkopar, Mumbai",
        "Bandra, Mumbai",
    ];
    
    const [isVegMode, setIsVegMode] = useState(false);
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(locations[0]);

    

    return (
        <SafeAreaView style={{ backgroundColor: '#0F1CC1' }} className="flex-1">
            <ScrollView showsVerticalScrollIndicator={false}>
                <LinearGradient
                    colors={['#0F1CC1', '#0B137E']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    className="px-6 pb-8 pt-12">

                    {/* Location Header */}
                    <View className="flex-row items-center justify-between mb-4 mt-7">
                        <TouchableOpacity onPress={() => setShowLocationModal(true)}>
                            <View>
                                <View className="flex-row items-center space-x-1">
                                    <Ionicons name="location" size={16} color="#E0E0E0" />
                                    <Text className="text-gray-300 text-sm">Current location</Text>
                                </View>
                                <View className="flex-row items-center mt-1">
                                    <Text className="text-white text-lg font-bold">{selectedLocation}</Text>
                                    <MaterialIcons name="keyboard-arrow-down" size={24} color="white" />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setIsVegMode(!isVegMode)}
                            className={`px-4 py-2 rounded-full ${isVegMode ? 'bg-green-500' : 'bg-white'}`}>
                            <Text className={`font-medium ${isVegMode ? 'text-white' : 'text-blue-900'}`}>
                                Veg Mode
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Modified Search Section */}
                    <View className="flex-row space-x-3 mt-6 mb-4">
                        <View className="flex-1">
                            <TextInput
                                placeholder="Select your location"
                                placeholderTextColor="#666"
                                className="bg-white/90 px-4 py-5 mr-2 rounded-xl text-gray-900"
                            />
                        </View>
                        <View className="w-32">
                            <TextInput
                                placeholder="Guests"
                                placeholderTextColor="#666"
                                keyboardType="numeric"
                                className="bg-white/90 px-4 py-5 rounded-xl text-gray-900 text-center"
                            />
                        </View>
                    </View>
                </LinearGradient>

                {/* Location Selection Modal */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={showLocationModal}
                    onRequestClose={() => setShowLocationModal(false)}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => setShowLocationModal(false)}
                        className="flex-1 bg-black/30 backdrop-blur-sm justify-end"
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={e => e.stopPropagation()}
                            className="bg-white rounded-t-3xl"
                        >
                            <View className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-3" />

                            <View className="p-6">
                                <View className="flex-row justify-between items-center mb-6">
                                    <Text className="text-xl font-bold text-gray-900">Choose location</Text>
                                    <TouchableOpacity
                                        onPress={() => setShowLocationModal(false)}
                                        className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center"
                                    >
                                        <Ionicons name="close" size={20} color="#666" />
                                    </TouchableOpacity>
                                </View>

                                {locations.map((location, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        className={`py-4 border-b border-gray-100 flex-row items-center justify-between ${selectedLocation === location ? 'bg-blue-50' : ''
                                            }`}
                                        onPress={() => {
                                            setSelectedLocation(location);
                                            setShowLocationModal(false);
                                        }}
                                    >
                                        <View className="flex-row items-center flex-1">
                                            <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center mr-3">
                                                <Ionicons
                                                    name="location-outline"
                                                    size={16}
                                                    color="#0B137E"
                                                />
                                            </View>
                                            <Text className="text-gray-800 text-lg flex-1">{location}</Text>
                                        </View>
                                        {selectedLocation === location && (
                                            <Ionicons name="checkmark-circle" size={24} color="#0B137E" />
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </Modal>

                {/* Booking CTA */}
                <View className="px-4 -mt-6">
                    <TouchableOpacity className="bg-white rounded-2xl p-4 shadow-lg flex-row items-center justify-between">
                        <View className="flex-row items-center flex-1">
                            <View className="w-12 h-12 bg-blue-50 rounded-full items-center justify-center">
                                <Feather name="clock" size={24} color="#0B137E" />
                            </View>
                            <Text className="text-gray-900 font-bold text-lg ml-3">
                                Book a Caterer in 5 Mins!
                            </Text>
                        </View>
                        <MaterialIcons name="arrow-forward-ios" size={20} color="#0B137E" />
                    </TouchableOpacity>
                </View>

                {/* Offer Section */}
                <View className="flex-row px-4 mt-6 space-x-4">
                    <TouchableOpacity className="flex-1 bg-white p-4 rounded-2xl shadow">
                        <View className="w-12 h-12 bg-blue-50 rounded-full items-center justify-center mb-3">
                            <MaterialIcons name="restaurant-menu" size={24} color="#0B137E" />
                        </View>
                        <Text className="text-gray-900 font-medium leading-5">
                            Get free tasting from 3 Caterers of your choice
                        </Text>
                    </TouchableOpacity>
                    <View className="w-32 bg-white rounded-2xl shadow overflow-hidden">
                        <Image
                            source={{ uri: 'https://via.placeholder.com/150' }}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    </View>
                </View>

                {/* Quick Actions */}
                <View className="flex-row justify-between px-4 mt-6">
                    {['Wedding', 'Corporate', 'Birthday', 'Party'].map((item, index) => (
                        <TouchableOpacity key={index} className="items-center">
                            <View className="bg-blue-50 w-16 h-16 rounded-full items-center justify-center mb-2">
                                <MaterialIcons name="celebration" size={28} color="#1e40af" />
                            </View>
                            <Text className="text-gray-700 text-sm">{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Special Offer Card */}
                <TouchableOpacity className="mx-4 mt-6">
                    <LinearGradient
                        colors={['#f97316', '#ea580c']}
                        className="p-4 rounded-2xl">
                        <View className="flex-row justify-between items-center">
                            <View className="flex-1">
                                <Text className="text-white text-xl font-bold mb-2">Free Tasting! 🎉</Text>
                                <Text className="text-white/90 text-sm mb-3">Try before you book - Sample menu from top 3 caterers</Text>
                                <TouchableOpacity className="bg-white w-32 py-2 rounded-lg">
                                    <Text className="text-orange-600 font-bold text-center">Book Now</Text>
                                </TouchableOpacity>
                            </View>
                            <Image
                                source={{ uri: 'https://via.placeholder.com/100' }}
                                className="w-24 h-24 rounded-xl"
                            />
                        </View>
                    </LinearGradient>
                </TouchableOpacity>

                {/* Popular Caterers */}
                <View className="mt-6 px-4">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-xl font-bold text-gray-800">Popular Caterers</Text>
                        <TouchableOpacity>
                            <Text className="text-blue-600">See all</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {[...Array(3)].map((_, index) => (
                            <TouchableOpacity key={index} className="mr-4 bg-white rounded-2xl shadow p-3 w-64">
                                <Image
                                    source={{ uri: 'https://via.placeholder.com/200' }}
                                    className="w-full h-32 rounded-xl mb-3"
                                />
                                <View className="flex-row justify-between items-start">
                                    <View>
                                        <Text className="text-lg font-bold text-gray-800">Royal Caterers</Text>
                                        <Text className="text-gray-500">Indian • Continental</Text>
                                        <View className="flex-row items-center mt-1">
                                            <FontAwesome name="star" size={16} color="#fbbf24" />
                                            <Text className="ml-1 text-gray-700">4.8 (2.4k reviews)</Text>
                                        </View>
                                    </View>
                                    <View className="bg-blue-50 px-2 py-1 rounded">
                                        <Text className="text-blue-700 font-bold">₹999/plate</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Recent Orders */}
                <View className="mt-6 px-4 mb-6">
                    <Text className="text-xl font-bold text-gray-800 mb-4">Recent Orders</Text>
                    {[...Array(2)].map((_, index) => (
                        <TouchableOpacity key={index} className="flex-row items-center bg-white p-3 rounded-xl shadow mb-3">
                            <Image
                                source={{ uri: 'https://via.placeholder.com/60' }}
                                className="w-16 h-16 rounded-lg"
                            />
                            <View className="flex-1 ml-3">
                                <Text className="font-bold text-gray-800">Wedding Reception</Text>
                                <Text className="text-gray-500">250 guests • Veg & Non-veg</Text>
                                <Text className="text-blue-600">Track Order →</Text>
                            </View>
                            <View className="bg-blue-50 px-3 py-1 rounded">
                                <Text className="text-blue-700">Active</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default TopSection