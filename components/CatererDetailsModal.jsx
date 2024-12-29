import React from 'react';
import { View, Text, Button, Image, Modal, ScrollView, TouchableOpacity } from 'react-native';
import placeholder from '../assets/placeholder.png';
import { useNavigation } from '@react-navigation/native';

const CatererDetailsModal = ({ visible, caterer, onClose, numberOfPeople }) => {
    const navigation = useNavigation();

    if (!caterer) {
        return null; // Return null if no caterer is selected
    }

    const onCardClick = (dish) => {
        onClose();
        navigation.navigate('Cart', { dish: dish });
    };

    const getDishes = () => {
        if (numberOfPeople <= 25) {
            return caterer.dishesfor10_25;
        } else if (numberOfPeople <= 50) {
            return caterer.dishesfor25_50;
        } else if (numberOfPeople <= 100) {
            return caterer.dishesfor50_100;
        } else {
            return caterer.dishesforabove100;
        }
    };

    const dishes = getDishes();

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-white">
                <ScrollView className="p-4">
                    <Image
                        source={placeholder}
                        className="w-full h-40 rounded-md mb-4"
                    />
                    <Text className="text-lg font-bold mb-2">{caterer.name}</Text>
                    <Text className="text-sm mb-4">{caterer.extraInformation}</Text>
                    <Text className="font-semibold mb-2">Specialties: {caterer.specialistIn}</Text>
                    <Text className="text-sm mb-4">Maximum Serving Capacity : {caterer.maximumServingCapacity}</Text>

                    <View>
                        <Text className="font-semibold mb-4">Provided Dishes:</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 10 }}
                        >
                            {dishes.map((dish, index) => (
                                <TouchableOpacity
                                    key={index}
                                    className="mr-4 bg-white rounded-lg shadow-md"
                                    onPress={() => onCardClick(dish)}
                                    style={{ width: 150, alignItems: 'center', padding: 10 }}
                                >
                                    <Image
                                        source={placeholder}
                                        className="w-32 h-32 rounded-md"
                                        style={{ resizeMode: 'cover' }}
                                    />
                                    <Text className="text-center mt-2 text-sm font-bold">{dish.name}</Text>
                                    <Text className="text-center text-sm text-gray-700">Price: ₹{dish.price}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    <Text className="font-semibold mb-2">Cuisines Offered:</Text>
                    <Text className="text-sm mb-4">{caterer.cuisinesOffered.join(', ')}</Text>

                    <Text className="font-semibold mb-2">Reviews:</Text>

                </ScrollView>

                <View className="p-4">
                    <Button title="Close" onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
};

export default CatererDetailsModal;
