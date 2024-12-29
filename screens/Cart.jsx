import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { SERVER_URL } from '@env';

const Cart = ({ route }) => {
    const { dish } = route.params;
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedItems, setSelectedItems] = useState({}); // Track selected items by category

    useEffect(() => {
        async function fetchItemData() {
            const fetchedCategories = [];
            for (const item of dish.items) {
                try {
                    const response = await axios.get(`${SERVER_URL}/api/menus/${item.id}`);
                    const menu = response.data;
                    fetchedCategories.push({
                        category: item.item,
                        items: menu.items[0]?.items || [],
                    });
                } catch (error) {
                    console.error(`Error fetching data for ID ${item.id}:`, error.message);
                }
            }
            setCategories(fetchedCategories);
            if (fetchedCategories.length > 0) {
                setSelectedCategory(fetchedCategories[0]);
                setMenuItems(fetchedCategories[0].items);
            }
        }

        fetchItemData();
    }, [dish.items]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setMenuItems(category.items);
    };

    const handleItemSelect = (item) => {
        if (selectedCategory) {
            setSelectedItems(prev => ({
                ...prev,
                [selectedCategory.category]: item
            }));
        }
    };

    const isItemSelected = (item) => {
        return selectedCategory && selectedItems[selectedCategory.category] === item;
    };

    return (
        <View className="flex-1">
            <View className="flex-1 flex-row">
                {/* Sidebar */}
                <View className="w-1/3 bg-gray-100 p-4">
                    <FlatList
                        data={categories}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                className={`p-3 my-2 rounded ${item === selectedCategory ? 'bg-purple-600' : 'bg-gray-300'
                                    }`}
                                onPress={() => handleCategoryClick(item)}
                            >
                                <Text
                                    className={`text-center font-bold ${item === selectedCategory ? 'text-white' : 'text-black'
                                        }`}
                                >
                                    {item.category}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>

                {/* Menu Display */}
                <View className="w-2/3 p-4">
                    {menuItems.length > 0 ? (
                        <FlatList
                            data={menuItems}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => handleItemSelect(item)}
                                    className={`p-4 my-2 rounded ${isItemSelected(item)
                                        ? 'bg-purple-200 border-2 border-purple-600'
                                        : 'bg-gray-200'
                                        }`}
                                >
                                    <Text className="text-lg font-semibold text-gray-800">{item}</Text>
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
                <Text className="text-xl font-bold mb-4">Order Preview</Text>
                <ScrollView className="max-h-40">
                    {categories.map((category, index) => (
                        <View key={index} className="flex-row justify-between items-center mb-2">
                            <Text className="font-semibold text-gray-600">{category.category}:</Text>
                            <Text className="text-gray-800">
                                {selectedItems[category.category] || 'Not selected'}
                            </Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

export default Cart;