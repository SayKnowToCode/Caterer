import React from 'react'
import TopSection from '../components/TopSection'
import { StatusBar } from 'expo-status-bar'

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
  )
}

export default Home