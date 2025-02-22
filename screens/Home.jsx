import React from 'react';
import { StatusBar } from 'react-native';
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
