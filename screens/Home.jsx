import React from 'react'
import { View, ScrollView } from 'react-native'
import TopSection from '../components/TopSection'
import { StatusBar } from 'expo-status-bar'
import MainSection from '../components/MainSection'

const Home = () => {
  return (
    <View className="flex-auto bg-white">
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0F1CC1"
        translucent
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopSection />
        <MainSection />
      </ScrollView>
    </View>
  )
}

export default Home