import React from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native';

const Onboarding = () => {
    return (
        <ScrollView className="flex-1 bg-white">
            {/* Header Section */}
            <View className="bg-[#2a47ec] p-5">
                <Text className="text-2xl font-bold text-white text-center mb-3">
                    Welcome to CaterSmart!
                </Text>
                <Text className="text-white text-center mb-5">
                    Your trusted destination for finding reliable and exceptional catering
                    services tailored to meet every need and occasion.
                </Text>
                <View className="w-full flex-row gap-3 mb-3">
                    <TextInput 
                        className="flex-1 p-2 rounded bg-white" 
                        placeholder="Select Your Location"
                    />
                    <TextInput 
                        className="flex-1 p-2 rounded bg-white" 
                        placeholder="Select Number of People"
                    />
                    <TextInput 
                        className="flex-1 p-2 rounded bg-white" 
                        placeholder="Search"
                    />
                </View>
                <TouchableOpacity className="bg-white py-2 px-6 rounded self-center">
                    <Text className="text-[#2a47ec] font-bold">SEARCH</Text>
                </TouchableOpacity>

                <View className="flex-row justify-around gap-4 mt-5">
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
                </View>
            </View>

            {/* Rest of the sections */}
            <Text className="text-xl font-bold text-center my-5">Best Food Offers</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4">
                {["Italian", "Maharashtrian", "North Indian", "South Indian", "Gujarati"].map((offer, index) => (
                    <View key={index} className="items-center mr-4">
                        <Image 
                            source={require('../assets/icon.png')}
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
                            source={require('../assets/icon.png')}
                            className="w-12 h-12 mb-2"
                        />
                        <Text className="text-sm text-center">{category}</Text>
                    </View>
                ))}
            </View>

            {/* Why Choose Us Section */}
            <Text className="text-xl font-bold text-center my-5">Why Caterersnearme</Text>
            <View className="flex-row flex-wrap justify-around px-4 mb-8">
                {[1, 2, 3, 4].map((num, index) => (
                    <View key={index} className="items-center">
                        <Text className="text-2xl font-bold text-[#2a47ec] mb-2">{`0${num}`}</Text>
                        <Text className="text-lg font-bold text-center mb-1">Development is Faster</Text>
                        <Text className="text-sm text-center">At Lorem Ipsum Placeholder Em Semper Habitant Arcu.</Text>
                    </View>
                ))}
            </View>

            {/* Testimonials Section */}
            <Text className="text-xl font-bold text-center my-5">Testimonials</Text>
            <View className="px-4 items-center mb-8">
                <Image 
                    source={require('../assets/icon.png')}
                    className="w-full max-w-2xl h-40 object-cover rounded-lg mb-4"
                />
                <Text className="text-xl font-bold text-center mb-2">Once You Try It, You Can't Go Back</Text>
                <Text className="text-center mb-4">
                    At Caterersnearme, we're dedicated to making exceptional catering accessible and hassle-free for everyone.
                </Text>
                <TouchableOpacity className="bg-[#2a47ec] py-2 px-6 rounded mb-4">
                    <Text className="text-white font-bold">Find Caterer</Text>
                </TouchableOpacity>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-4">
                    {[...Array(4)].map((_, index) => (
                        <View key={index} className="min-w-[250px] bg-gray-50 rounded-lg p-4 shadow-md">
                            <Image 
                                source={require('../assets/icon.png')}
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

export default Onboarding;