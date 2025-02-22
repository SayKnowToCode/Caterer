import React, { useState, useRef } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Pressable, ScrollView, Modal, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const MainSection = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [showSliders, setShowSliders] = useState(false);
    const [dietaryType, setDietaryType] = useState(null); // null, 'veg', or 'nonveg'
    const vegSlideAnim = useRef(new Animated.Value(0)).current;
    const nonVegSlideAnim = useRef(new Animated.Value(0)).current;
    const vegScaleAnim = useRef(new Animated.Value(1)).current;
    const nonVegScaleAnim = useRef(new Animated.Value(1)).current;

    const animateToggle = (isVeg) => {
        const currentAnim = isVeg ? vegSlideAnim : nonVegSlideAnim;
        const otherAnim = isVeg ? nonVegSlideAnim : vegSlideAnim;
        const currentScale = isVeg ? vegScaleAnim : nonVegScaleAnim;
        const otherScale = isVeg ? nonVegScaleAnim : vegScaleAnim;
        
        // Reset the other toggle
        Animated.parallel([
            Animated.spring(otherAnim, {
                toValue: 0,
                useNativeDriver: true,
                tension: 50,
                friction: 8,
            }),
            Animated.spring(otherScale, {
                toValue: 1,
                useNativeDriver: true,
            })
        ]).start();

        // Animate the selected toggle
        Animated.parallel([
            Animated.spring(currentAnim, {
                toValue: dietaryType === (isVeg ? 'veg' : 'nonveg') ? 0 : 1,
                useNativeDriver: true,
                tension: 50,
                friction: 8,
            }),
            Animated.sequence([
                Animated.timing(currentScale, {
                    toValue: 0.8,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.spring(currentScale, {
                    toValue: 1,
                    tension: 50,
                    useNativeDriver: true,
                })
            ])
        ]).start();
    };

    const toggleVeg = () => {
        const newValue = dietaryType === 'veg' ? null : 'veg';
        setDietaryType(newValue);
        animateToggle(true);
    };

    const toggleNonVeg = () => {
        const newValue = dietaryType === 'nonveg' ? null : 'nonveg';
        setDietaryType(newValue);
        animateToggle(false);
    };

    const sliderOptions = {
        // s
        price: {
            title: 'Price Range',
            options: ['$0-$50', '$51-$100', '$101-$200', '$200+']
        },
        rating: {
            title: 'Rating',
            options: ['4.5+', '4.0+', '3.5+', 'All']
        },
        distance: {
            title: 'Distance',
            options: ['< 1km', '< 3km', '< 5km', 'Any']
        }
    };

    const caterServices = [
        {
            id: '1',
            name: 'Golden Feast Catering',
            rating: 4.8,
            price: '$149.99',
            address: '123 Gourmet Lane, Metro City',
            image: 'https://images.unsplash.com/photo-1555244162-803834f70033',
            type: 'weddings',
        },
        {
            id: '2',
            name: 'Elegant Bites Co.',
            rating: 4.9,
            price: '$159.99',
            address: '456 Luxe Plaza, Urban Town',
            image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba',
            type: 'weddings',
        },
        {
            id: '3',
            name: 'Savoury Events',
            rating: 4.7,
            price: '$139.99',
            address: '789 Prestige Rd, Elite Village',
            image: 'https://images.unsplash.com/photo-1561910381-c7ad7d369cd4',
            type: 'weddings',
        },
    ];

    const SliderModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showSliders}
            onRequestClose={() => setShowSliders(false)}
        >
            <View className="flex-1 bg-transparent">
                <View className="mt-auto bg-white rounded-t-3xl">
                    <View className="w-12 h-1 bg-gray-300 rounded-full self-center my-4" />
                    
                    {Object.entries(sliderOptions).map(([key, { title, options }]) => (
                        <View key={key} className="mb-6 px-6">
                            <Text className="text-lg font-bold text-gray-900 mb-4">{title}</Text>
                            <View className="flex-row flex-wrap gap-2">
                                {Array.isArray(options) ? (
                                    options.map((option) => (
                                        <TouchableOpacity
                                            key={typeof option === 'string' ? option : option.label}
                                            className="px-4 py-2 rounded-full border-2 border-gray-200 bg-gray-50"
                                        >
                                            <Text className="text-gray-700 font-medium">
                                                {typeof option === 'string' ? option : (
                                                    <View className="flex-row items-center">
                                                        <Text>{option.icon}</Text>
                                                        <Text className="ml-2">{option.label}</Text>
                                                    </View>
                                                )}
                                            </Text>
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    <Text>Invalid options</Text>
                                )}
                            </View>
                        </View>
                    ))}
                    
                    <TouchableOpacity 
                        className="bg-blue-700 py-4 mx-6 rounded-full my-4"
                        onPress={() => setShowSliders(false)}
                    >
                        <Text className="text-white text-center font-bold">Apply Filters</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    const filters = [
        { id: 'all', label: 'All', icon: '⚫' },
        { 
            id: 'veg', 
            label: '', 
            icon: <MaterialIcons name="crop-square" size={28} color={dietaryType === 'veg' ? '#fff' : '#22C55E'} />,
            isToggled: dietaryType === 'veg',
            onToggle: toggleVeg,
            slideAnim: vegSlideAnim,
            scaleAnim: vegScaleAnim,
            activeColor: '#22C55E',
            width: 72
        },
        { 
            id: 'nonveg', 
            label: '', 
            icon: <MaterialIcons name="change-history" size={28} color={dietaryType === 'nonveg' ? '#fff' : '#EF4444'} />,
            isToggled: dietaryType === 'nonveg',
            onToggle: toggleNonVeg,
            slideAnim: nonVegSlideAnim,
            scaleAnim: nonVegScaleAnim,
            activeColor: '#EF4444',
            width: 72
        },
        { 
            id: 'sliders', 
            label: 'Filters', 
            icon: '≡',
            onPress: () => setShowSliders(true)
        }
    ];

    const renderCaterCard = ({ item }) => (
        <Pressable
            className="bg-white rounded-2xl m-2 w-72 overflow-hidden"
            style={{
                style: {
                    elevation: 8,
                    shadowColor: '#0B137E',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.15,
                    shadowRadius: 12,
                }
            }}
        >
            <Image
                source={{ uri: item.image }}
                className="w-full h-40 rounded-t-2xl"
            />
            <LinearGradient
                colors={['rgba(11, 19, 126, 0.05)', 'rgba(11, 19, 126, 0.02)']}
                className="p-4"
            >
                <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-lg font-bold text-gray-900">{item.name}</Text>
                    <View className="bg-blue-50 px-3 py-1 rounded-full">
                        <Text className="text-blue-900 font-semibold">{item.price}</Text>
                    </View>
                </View>
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                        <MaterialIcons name="star" size={16} color="#FFB800" />
                        <Text className="ml-1 text-gray-700 font-medium">{item.rating}</Text>
                        <View className="w-1 h-1 bg-gray-400 rounded-full mx-2" />
                        <MaterialIcons name="location-on" size={14} color="#666" />
                        <Text className="ml-1 text-gray-600 text-sm">{item.address}</Text>
                    </View>
                </View>
            </LinearGradient>
        </Pressable>
    );

    const renderGridCard = ({ item }) => (
        <Pressable
            className="bg-white rounded-xl overflow-hidden h-[200px]"
            style={{
                elevation: 4,
                shadowColor: '#0B137E',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            }}
        >
            <Image
                source={{ uri: `${item.image}?w=500&h=300&fit=crop` }}
                className="w-full h-28 rounded-t-xl"
                resizeMode="cover"
            />
            <LinearGradient
                colors={['rgba(11, 19, 126, 0.05)', 'rgba(11, 19, 126, 0.02)']}
                className="p-3 flex-1 justify-between"
            >
                <Text numberOfLines={1} className="text-sm font-bold text-gray-900">{item.name}</Text>
                <View className="flex-row items-center mt-1">
                    <MaterialIcons name="location-on" size={12} color="#666" />
                    <Text numberOfLines={1} className="ml-1 text-gray-600 text-xs flex-1">{item.address}</Text>
                </View>
                <View className="flex-row items-center justify-between mt-2">
                    <View className="flex-row items-center bg-yellow-50 px-2 py-1 rounded-full">
                        <MaterialIcons name="star" size={12} color="#FFB800" />
                        <Text className="ml-1 text-gray-700 text-xs font-medium">{item.rating}</Text>
                    </View>
                    <View className="bg-blue-50 px-3 py-1 rounded-full">
                        <Text className="text-blue-900 font-semibold text-xs">{item.price}</Text>
                    </View>
                </View>
            </LinearGradient>
        </Pressable>
    );

    return (
        <View className="flex-1">
            {/* Curved Transition */}
            <View className="h-16 mt-10 -mb-8" />

            <View className="bg-gray-50 rounded-t-[40px] pt-4 -mt-8">
                {/* Filters Section */}
                <View className="flex-row items-center p-4 gap-3">
                    {filters.map((filter) => (
                        <TouchableOpacity
                            key={filter.id}
                            onPress={() => {
                                if (filter.id === 'sliders') {
                                    filter.onPress();
                                } else if (filter.onToggle) {
                                    filter.onToggle();
                                } else {
                                    setActiveFilter(filter.id);
                                }
                            }}
                            className={`
                                flex-row items-center justify-center px-4 py-2 rounded-full
                                ${filter.id === 'sliders' ? 'bg-blue-700' : ''}
                                ${filter.id !== 'sliders' && !filter.onToggle && activeFilter === filter.id ? 'bg-blue-700' : 'bg-gray-100'}
                                ${filter.onToggle ? 'relative overflow-hidden' : ''}
                            `}
                            style={filter.onToggle ? {
                                backgroundColor: filter.isToggled ? filter.activeColor : '#f3f4f6',
                                width: filter.width,
                                height: 40, // Increased height
                                paddingHorizontal: 16, // Increased padding
                                marginHorizontal: 4
                            } : null}
                        >
                            {filter.onToggle ? (
                                <View className="flex-row items-center w-full relative">
                                    <Animated.View
                                        style={{
                                            transform: [
                                                {
                                                    translateX: filter.slideAnim.interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: [4, 30]
                                                    })
                                                },
                                                {
                                                    scale: filter.scaleAnim
                                                }
                                            ],
                                            position: 'absolute',
                                            left: -5,
                                        }}
                                    >
                                        {filter.icon}
                                    </Animated.View>
                                </View>
                            ) : (
                                <>
                                    <View className="relative">
                                        {filter.icon}
                                    </View>
                                    {filter.label && (
                                        <Text className={`
                                            ${filter.id === 'sliders' || (activeFilter === filter.id && !filter.onToggle) ? 'text-white' : 'text-gray-700'}
                                            font-medium ml-2
                                        `}>
                                            {filter.label}
                                        </Text>
                                    )}
                                </>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Slider Modal */}
                <SliderModal />

                {/* Best Services Section */}
                <View className="px-2">
                    <View className="flex-row justify-between items-center mb-4">
                        <View>
                            <Text className="text-2xl font-bold text-gray-900">
                                Best Services
                            </Text>
                            <Text className="text-gray-500 text-sm mt-1">
                                Find the perfect caterer for your event
                            </Text>
                        </View>
                        <TouchableOpacity className="bg-blue-50 px-4 py-2 rounded-full">
                            <Text className="text-blue-900 font-medium">View All</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Grid Layout */}
                    <View className="flex-row flex-wrap">
                        {caterServices.map((item) => (
                            <View
                                key={`grid-${item.id}`}
                                style={{ width: '50%' }}
                                className="p-1"
                            >
                                {renderGridCard({ item })}
                            </View>
                        ))}
                    </View>
                </View>

                {/* Popular Services Section */}
                <View className="px-4">
                    <View className="flex-row justify-between items-center mb-4">
                        <View>
                            <Text className="text-2xl font-bold text-gray-900">
                                Popular Services
                            </Text>
                            <Text className="text-gray-500 text-sm mt-1">
                                Highly rated by our customers
                            </Text>
                        </View>
                        <TouchableOpacity className="bg-blue-50 px-4 py-2 rounded-full">
                            <Text className="text-blue-900 font-medium">View All</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Horizontal Scrolling Cards */}
                <FlatList
                    data={caterServices}
                    renderItem={renderCaterCard}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerClassName="px-4 pb-6"
                />
            </View>
        </View>
    );
};

export default MainSection;