import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, ScrollView, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SERVER_URL } from '@env';
import axios from 'axios';
import placeholder from '../assets/placeholder.png';

const FindCaterers = ({ route }) => {
    const { location, numberOfPeople } = route.params;
    const [caterers, setCaterers] = useState([]);
    const [filteredCaterers, setFilteredCaterers] = useState([]);
    const [vegMode, setVegMode] = useState(false); // Veg mode filter as switch
    const [selectedCuisine, setSelectedCuisine] = useState('all'); // Filter for Cuisine type
    const [sortOption, setSortOption] = useState('lowToHigh'); // Sorting option

    useEffect(() => {
        const fetchCaterers = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/api/caterer`);
                setCaterers(response.data.data);
                setFilteredCaterers(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCaterers();
    }, []);

    const handleVegModeChange = (value) => {
        setVegMode(value);
        applyFilters(value, selectedCuisine);
    };

    const handleCuisineChange = (value) => {
        setSelectedCuisine(value);
        applyFilters(vegMode, value);
    };

    const handleSortChange = (value) => {
        setSortOption(value);
        sortCaterers(value);
    };

    const applyFilters = (vegMode, selectedCuisine) => {
        let filteredData = caterers;

        // Apply Veg Mode filter
        if (vegMode) {
            filteredData = filteredData.filter(caterer =>
                !caterer.cateringType.includes('nonVeg')
            );
        }

        // Apply Cuisine filter
        if (selectedCuisine !== 'all') {
            filteredData = filteredData.filter(caterer =>
                caterer.cuisinesOffered.includes(selectedCuisine)
            );
        }

        sortCaterers(sortOption, filteredData);
    };

    const sortCaterers = (sortOption, data = filteredCaterers) => {
        let sortedData = [...data];
        if (sortOption === 'lowToHigh') {
            sortedData.sort((a, b) => {
                if (a.minPrice !== b.minPrice) return a.minPrice - b.minPrice;
                return a.maxPrice - b.maxPrice; // In case of a tie, sort by maxPrice
            });
        } else if (sortOption === 'highToLow') {
            sortedData.sort((a, b) => {
                if (b.minPrice !== a.minPrice) return b.minPrice - a.minPrice;
                return b.maxPrice - a.maxPrice; // In case of a tie, sort by maxPrice
            });
        }
        setFilteredCaterers(sortedData);
    };

    const handleDetailClick = (id) => {
        // Handle the logic when the Details button is clicked
        console.log(`Caterer details for ID: ${id}`);
    };

    return (
        <ScrollView className="p-4">
            <Text className="text-lg font-semibold">Location: {location}</Text>
            <Text className="text-lg font-semibold">Number of People: {numberOfPeople}</Text>

            {/* Filters */}
            <View className="mb-4">
                <View className="mb-4 flex-row items-center">
                    <Text className="font-semibold mr-2">Veg Mode</Text>
                    <Switch
                        value={vegMode}
                        onValueChange={handleVegModeChange}
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={vegMode ? "#4A90E2" : "#f4f3f4"} // Blue thumb when toggled on
                        className="mb-4"
                    />
                </View>

                <Text className="font-semibold mb-2">Cuisine</Text>
                <Picker
                    selectedValue={selectedCuisine}
                    onValueChange={handleCuisineChange}
                    className="mb-4"
                >
                    <Picker.Item label="All" value="all" />
                    <Picker.Item label="North Indian" value="North Indian" />
                    <Picker.Item label="South Indian" value="South Indian" />
                    <Picker.Item label="Gujarati" value="Gujarati" />
                    <Picker.Item label="Chinese" value="Chinese" />
                    <Picker.Item label="Kathiyawadi" value="Kathiyawadi" />
                    <Picker.Item label="Punjabi" value="Punjabi" />
                    <Picker.Item label="Jain" value="Jain" />
                    <Picker.Item label="Kokani" value="Kokani" />
                    <Picker.Item label="Mexican" value="Mexican" />
                    <Picker.Item label="Maharashtrian" value="Maharashtrian" />
                </Picker>

                {/* Sorting */}
                <Text className="font-semibold mb-2">Sort by Price</Text>
                <Picker
                    selectedValue={sortOption}
                    onValueChange={handleSortChange}
                    className="mb-4"
                >
                    <Picker.Item label="Price - Low to High" value="lowToHigh" />
                    <Picker.Item label="Price - High to Low" value="highToLow" />
                </Picker>
            </View>

            {/* Display filtered caterers */}
            {filteredCaterers.length > 0 ? (
                filteredCaterers.map((caterer) => (
                    <View key={caterer.id} className="bg-white p-4 mb-4 rounded-lg shadow-md max-w-full">
                        <View className="flex-row justify-between">
                            <View className="flex-row flex-1 items-center">
                                <Image
                                    source={placeholder} // Adjust the image path as needed
                                    className="w-20 h-20 rounded-md mr-4"
                                />
                                <View className="flex-1">
                                    <Text className="font-bold text-lg numberOfLines">{caterer.name}</Text>
                                    <Text className="text-sm numberOfLines">{caterer.address}</Text>
                                    <Text className="text-sm numberOfLines">
                                        {caterer.cuisinesOffered.join(', ').toUpperCase()}
                                    </Text>
                                </View>
                            </View>
                            <View className="justify-center">
                                <Button
                                    title="Details"
                                    onPress={() => handleDetailClick(caterer.id)}
                                />
                            </View>
                        </View>

                        {caterer.minPrice !== undefined && caterer.maxPrice !== undefined && (
                            <View className="mt-2">
                                <Text className="text-sm">
                                    <Text className="font-bold">Price: </Text>
                                    <Text className="italic">
                                        ₹{caterer.minPrice} - ₹{caterer.maxPrice}
                                    </Text>
                                </Text>
                            </View>
                        )}
                    </View>
                ))
            ) : (
                <Text>No caterers found. Try adjusting your search or filters.</Text>
            )}
        </ScrollView>
    );
};

export default FindCaterers;
