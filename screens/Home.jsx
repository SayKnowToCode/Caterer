import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    View,
    Text,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker'
import placeholder from '../assets/placeholder.png';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import 'react-native-get-random-values';
import { GOOGLE_API_KEY } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
    const [selectedPeople, setSelectedPeople] = React.useState('');
    const [location, setLocation] = useState('');

    const navigation = useNavigation();

    const getUserData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('user');
            const parsedValue = JSON.parse(jsonValue);
            console.log("User data from AsyncStorage:", parsedValue);
        } catch (e) {
            console.error("Error fetching user data from AsyncStorage", e);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    const handleSearch = () => {
        // Navigate to FindCaterers page and pass location and selectedPeople as props
        navigation.navigate('FindCaterers', {
            location: location, // Assuming selectedLocation is the state holding the location
            numberOfPeople: selectedPeople,
        });
    };

    return (
        <ScrollView className="flex-1 bg-white">
            {/* Header Section */}
            <View className="bg-[#2a47ec] p-5">
                <TouchableOpacity
                    className="bg-white py-2 px-6 rounded self-center mb-3"
                    onPress={() => navigation.navigate('Bookings')}
                >
                    <Text className="text-[#2a47ec] font-bold">My Bookings</Text>
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-white text-center mb-3">
                    Welcome to CaterersNearMe!
                </Text>
                <Text className="text-white text-center mb-5">
                    Your trusted destination for finding reliable and exceptional catering
                    services tailored to meet every need and occasion.
                </Text>
                <View className="w-full flex-col gap-3 mb-3">
                    <View className="w-full flex-row gap-3 mb-3">
                        <View className="flex-1 rounded bg-white p-0">
                            <GooglePlacesAutocomplete
                                placeholder="Search"
                                fetchDetails={true}
                                onPress={(data, details = null) => {
                                    setLocation(data.description); // Update location on selection
                                }}
                                query={{
                                    key: GOOGLE_API_KEY,
                                    language: 'en',
                                    components: 'country:in', // Restrict to India
                                }}
                                textInputProps={{
                                    value: location, // Controlled input
                                    onChangeText: (text) => setLocation(text), // Update location on typing
                                }}
                                styles={{
                                    container: {
                                        width: '100%', // Ensures the container takes full width
                                        height: 50, // Adjusted height
                                    },
                                    textInput: {
                                        width: '100%', // The input itself takes up the full width
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: 5,
                                        paddingHorizontal: 10,
                                        paddingVertical: 10,
                                        height: 50, // Fixed height for the text input field
                                    },
                                    listView: {
                                        width: '100%', // Make the suggestion dropdown take full width
                                        position: 'absolute', // Position it absolutely so it stretches out
                                        left: 0, // Align to the left
                                        right: 0, // Align to the right
                                        zIndex: 9999, // Ensure it's above other elements
                                    },
                                    predefinedPlacesDescription: {
                                        color: '#1faadb', // Customize description color
                                    },
                                    description: {
                                        fontSize: 16, // Font size for the suggestions
                                    },
                                }}
                            />
                        </View>
                        <View className="flex-1 rounded bg-white p-0">
                            <Picker
                                selectedValue={selectedPeople}
                                onValueChange={(itemValue) => setSelectedPeople(itemValue)}
                                style={{ height: 55, width: '100%' }} // Set the Picker height to 50 to match the input height
                            >
                                <Picker.Item label="Default" value="" />
                                <Picker.Item label="10-25" value="10-25" />
                                <Picker.Item label="25-50" value="25-50" />
                                <Picker.Item label="50-100" value="50-100" />
                                <Picker.Item label="100+" value="100+" />
                            </Picker>
                        </View>
                    </View>
                    <TouchableOpacity className="bg-white py-2 px-6 rounded self-center" onPress={handleSearch}>
                        <Text className="text-[#2a47ec] font-bold">SEARCH</Text>
                    </TouchableOpacity>
                </View>




                {/* <View className="flex-row justify-around gap-4 mt-5">
                    {['Location', 'Choose a Service', 'Search'].map((title, index) => (
                        <View key={index} className="bg-white rounded-lg p-4 flex-1 shadow-md">
                            <Text className="text-lg font-bold mb-2">{title}</Text>
                            <Text className="text-sm text-center mb-3">
                                {title === 'Location' && 'Select your Location Find top-rated caterers near you by selecting your city.'}
                                {title === 'Choose a Service' && 'Select the catering service that matches your needs.'}
                                {title === 'Search' && 'Book top caterers Find and connect with caterers that suit your needs.'}
                            </Text>
                            <TouchableOpacity className="bg-[#2a47ec] w-8 h-8 rounded-full items-center justify-center">
                                <Text className="text-white">→</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View> */}
            </View>

            {/* Rest of the sections */}
            <Text className="text-xl font-bold text-center my-5">Best Food Offers</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4">
                {["Italian", "Maharashtrian", "North Indian", "South Indian", "Gujarati"].map((offer, index) => (
                    <View key={index} className="items-center mr-4">
                        <Image
                            source={placeholder}
                            className="w-24 h-24 rounded-lg mb-2"
                        />
                        <Text className="text-sm">{offer}</Text>
                    </View>
                ))}
            </ScrollView>

            {/* Categories Section */}
            <Text className="text-xl font-bold text-center my-5">Categories</Text>
            <View className="flex-row flex-wrap justify-center px-4">
                {[
                    'Weddings', 'Birthday Parties', 'Kitty Parties', 'Small Get-Togethers',
                    'Corporate Events', 'Mehendi Ceremony', 'Sangeet Ceremony', 'Baby Shower',
                    'Haldi Ceremony', 'Pooja', 'Society Functions', 'Baby Naming Ceremony'
                ].map((category, index) => (
                    <View key={index} className="items-center p-2">
                        <Image
                            source={placeholder}
                            className="w-12 h-12 mb-2"
                        />
                        <Text className="text-sm text-center">{category}</Text>
                    </View>
                ))}
            </View>

            {/* Why Choose Us Section */}
            <Text className="text-xl font-bold text-center mt-5">Why CaterersNearMe</Text>
            <View className="px-4 items-center my-4">
                <Image
                    source={placeholder}
                    className="w-full h-40 object-cover rounded-lg"
                />
            </View>
            {/* <View className="flex-row flex-wrap justify-around px-4 mb-8">
                {[1, 2, 3, 4].map((num, index) => (
                    <View key={index} className="items-center">
                        <Text className="text-2xl font-bold text-[#2a47ec] mb-2">{`0${num}`}</Text>
                        <Text className="text-lg font-bold text-center mb-1">Development is Faster</Text>
                        <Text className="text-sm text-center">At Lorem Ipsum Placeholder Em Semper Habitant Arcu.</Text>
                    </View>
                ))}
            </View> */}

            {/* Testimonials Section */}
            <Text className="text-xl font-bold text-center my-5">Testimonials</Text>
            <View className="px-4 items-center mb-8">
                <Image
                    source={placeholder}
                    className="w-full max-w-2xl h-40 object-cover rounded-lg mb-4"
                />
                <Text className="text-xl font-bold text-center mb-2">Once You Try It, You Can't Go Back</Text>
                <Text className="text-center mb-4">
                    At Caterersnearme, we're dedicated to making exceptional catering accessible and hassle-free for everyone.
                </Text>
                <TouchableOpacity className="bg-[#2a47ec] py-2 px-6 rounded mb-4">
                    <Text className="text-white font-bold">Find Caterer</Text>
                </TouchableOpacity>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-4 mt-4">
                    {[...Array(4)].map((_, index) => (
                        <View key={index} className="max-w-[250px] bg-gray-50 rounded-lg p-4 shadow-md">
                            <Image
                                source={placeholder}
                                className="w-12 h-12 rounded-full mx-auto mb-2"
                            />
                            <Text className="font-bold text-center mb-1">James Patterson</Text>
                            <Text className="text-gray-500 text-sm text-center mb-2">Customer</Text>
                            <Text className="text-sm text-center">
                                "The catering service was outstanding! The food quality and presentation exceeded our expectations. Highly recommended."
                            </Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </ScrollView>
    );
};

export default Home;