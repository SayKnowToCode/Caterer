import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, Alert, TextInput, Image } from 'react-native';
import axios from 'axios';
import { SERVER_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import placeholder from '../assets/placeholder.png';
import { Search, Mic } from 'lucide-react-native';

const Cart = ({ route }) => {
    const navigation = useNavigation();
    const { dish, numberOfPeople } = route.params;
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedItems, setSelectedItems] = useState({});
    const [categoryQuantities, setCategoryQuantities] = useState({});
    const [searchQuery, setSearchQuery] = useState('');

    const filteredMenuItems = menuItems.filter(item =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        async function fetchItemData() {
            const fetchedCategories = [];
            const initialQuantities = {};
            for (const item of dish.items) {
                try {
                    const response = await axios.get(`${SERVER_URL}/api/menus/${item.id}`);
                    const menu = response.data;
                    fetchedCategories.push({
                        category: item.item,
                        baseQuantity: item.quantity,
                        items: menu.items[0]?.items || [],
                    });
                    initialQuantities[item.item] = item.quantity;
                } catch (error) {
                    console.error(`Error fetching data for ID ${item.id}:`, error.message);
                }
            }
            setCategories(fetchedCategories);
            setCategoryQuantities(initialQuantities);
            if (fetchedCategories.length > 0) {
                setSelectedCategory(fetchedCategories[0]);
                setMenuItems(fetchedCategories[0].items);
            }
        }
        fetchItemData();
    }, [dish.items]);

    const updateCategoryQuantity = (category, increment) => {
        const baseQuantity = categories.find(cat => cat.category === category)?.baseQuantity || 1;
        const currentQuantity = categoryQuantities[category] || baseQuantity;

        if (increment < 0 && currentQuantity <= baseQuantity) {
            Alert.alert("Cannot Reduce", "Cannot reduce below the initial quantity.");
            return;
        }

        if (increment > 0) {
            Alert.alert(
                "Additional Charge",
                "An additional ₹25 will be charged for increasing the quantity. Do you want to continue?",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "Accept",
                        onPress: () => {
                            setCategoryQuantities(prev => ({
                                ...prev,
                                [category]: Math.max(baseQuantity, (prev[category] || baseQuantity) + increment)
                            }));
                        }
                    }
                ]
            );
        } else {
            setCategoryQuantities(prev => ({
                ...prev,
                [category]: Math.max(baseQuantity, (prev[category] || baseQuantity) + increment)
            }));
        }
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setMenuItems(category.items);
    };

    const handleItemSelect = (item) => {
        if (!selectedCategory) return;

        const currentSelections = selectedItems[selectedCategory.category] || [];
        const maxAllowed = categoryQuantities[selectedCategory.category] || selectedCategory.baseQuantity;

        if (currentSelections.length < maxAllowed && !currentSelections.includes(item)) {
            setSelectedItems(prev => ({
                ...prev,
                [selectedCategory.category]: [...currentSelections, item]
            }));
        }
    };

    const removeItem = (category, item) => {
        setSelectedItems(prev => ({
            ...prev,
            [category]: (prev[category] || []).filter(i => i !== item)
        }));
    };

    const isItemSelected = (item) => {
        return selectedCategory && (selectedItems[selectedCategory.category] || []).includes(item);
    };

    const getSelectedCount = (category) => {
        return (selectedItems[category] || []).length;
    };

    const handlePlaceOrder = () => {
        navigation.navigate('Order', {
            dish: dish,
            numberOfPeople: numberOfPeople,
            selectedItems: selectedItems
        })
    }

    return (
        <View className="flex-1">
            <View className="flex-row items-center bg-[#EBEBF7] rounded-full p-3 px-4">
                <TextInput
                    className="flex-1 text-black text-lg font-semibold"
                    placeholder="Search for dishes"
                    placeholderTextColor="#000"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <Search size={22} color="black" className="mr-3" />
                <View className="w-[1px] h-6 bg-gray-400 mx-2" />
                <Mic size={22} color="blue" />
            </View>
            <View className="flex-1 flex-row">
                {/* Sidebar */}
                <View className="w-1/3 bg-gray-100 p-4">
                    <FlatList
                        data={categories}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View className="mb-4">
                                <TouchableOpacity
                                    className={`p-3 rounded ${item === selectedCategory ? 'bg-blue-600' : 'bg-gray-300'}`}
                                    onPress={() => handleCategoryClick(item)}
                                >
                                    <Text className={`text-center font-bold ${item === selectedCategory ? 'text-white' : 'text-black'}`}>
                                        {item.category}
                                    </Text>
                                    <Text className={`text-center text-xs ${item === selectedCategory ? 'text-white' : 'text-gray-600'}`}>
                                        {getSelectedCount(item.category)}/{categoryQuantities[item.category] || item.baseQuantity} selected
                                    </Text>
                                </TouchableOpacity>
                                <View className="flex-row justify-center mt-2 space-x-2">
                                    <TouchableOpacity
                                        onPress={() => updateCategoryQuantity(item.category, -1)}
                                        className="bg-gray-200 w-8 h-8 rounded-full items-center justify-center"
                                    >
                                        <Text>-</Text>
                                    </TouchableOpacity>
                                    <View className="w-8 h-8 items-center justify-center">
                                        <Text>{categoryQuantities[item.category] || item.baseQuantity}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => updateCategoryQuantity(item.category, 1)}
                                        className="bg-gray-200 w-8 h-8 rounded-full items-center justify-center"
                                    >
                                        <Text>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                </View>

                {/* Menu Display */}
                <View className="w-2/3 p-4">
                    {filteredMenuItems.length > 0 ? (
                        <FlatList
                            data={filteredMenuItems}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => handleItemSelect(item)}
                                    className={`p-4 my-2 rounded ${isItemSelected(item) ? 'bg-blue-200 border-2 border-blue-600' : 'bg-gray-200'}`}
                                >
                                    <View className="flex-row items-center">
                                        <Image
                                            source={placeholder} // Replace with actual image URL
                                            className="w-12 h-12 rounded-full mr-4"
                                        />
                                        <Text className="text-lg font-semibold text-gray-800">{item}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    ) : (
                        <Text className="text-center text-gray-500 text-lg">No items available</Text>
                    )}
                </View>
            </View>

            {/* Order Preview Section */}
            <View className="bg-white p-4 border-t border-gray-200">
                <View className="flex-row justify-evenly">
                    <Text className="text-xl font-bold mb-4 flex-1">Order Preview</Text>
                    <TouchableOpacity
                        onPress={() => handlePlaceOrder()}
                        className="bg-green-500 p-3 rounded-full items-center justify-center"
                    >
                        <Text className="text-white font-bold">Place Order</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView className="max-h-40">
                    {categories.map((category, index) => (
                        <View key={index} className="mb-4">
                            <Text className="font-semibold text-gray-600 mb-2">
                                {category.category} ({getSelectedCount(category.category)}/{categoryQuantities[category.category] || category.baseQuantity}):
                            </Text>
                            {(selectedItems[category.category] || []).map((item, idx) => (
                                <View key={idx} className="flex-row justify-between items-center ml-4 mb-2">
                                    <Text className="text-gray-800">{item}</Text>
                                    <TouchableOpacity
                                        onPress={() => removeItem(category.category, item)}
                                        className="bg-red-200 w-8 h-8 rounded-full items-center justify-center"
                                    >
                                        <Text>×</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

export default Cart;