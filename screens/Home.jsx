import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Modal } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome, Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import TopSection from '../components/TopSection';

const Home = () => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0F1CC1"
        translucent
      />
        <TopSection />
    </>
  );
};

export default Home;
