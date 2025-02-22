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
                {/* Enhanced Offer Section */}
                <View className="flex-row px-4 mt-6 space-x-4 pb-6 rounded-b-3xl">
                    <TouchableOpacity
                        className="flex-1 bg-white p-5 rounded-2xl shadow-lg"
                        style={{
                            elevation: 4,
                            shadowColor: '#0B137E',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.1,
                            shadowRadius: 8,
                        }}
                    >
                        <View className="flex-row items-center space-x-3 mb-4">
                            <View className="w-14 h-14 bg-blue-50 rounded-full items-center justify-center">
                                <MaterialIcons name="restaurant-menu" size={28} color="#0B137E" />
                            </View>
                            <View className="bg-blue-50 px-3 py-1 rounded-full">
                                <Text className="text-blue-900 font-semibold">Limited Time</Text>
                            </View>
                        </View>
                        <Text className="text-2xl font-bold text-gray-900 mb-2">
                            Free Tasting
                        </Text>
                        <Text className="text-gray-600 text-base leading-5 mb-3">
                            Sample premium menus from 3 top-rated caterers of your choice
                        </Text>
                        <View className="flex-row items-center">
                            <Text className="text-blue-900 font-semibold mr-2">Learn More</Text>
                            <MaterialIcons name="arrow-forward-ios" size={14} color="#0B137E" />
                        </View>
                    </TouchableOpacity>
                </View>

                
            </ScrollView>
        </SafeAreaView>
    )
}

export default TopSection