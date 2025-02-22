import './global.css';
import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './navigation/TabNavigator';

// Import your screens
import Landing from './screens/Landing';
import Login from './screens/Login';
import Register from './screens/Register';
import FindCaterers from './screens/FindCaterers';
import Cart from './screens/Cart';
import Order from './screens/Order';
import ContactUs from './screens/ContactUs';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <NavigationContainer>
                <Stack.Navigator initialRouteName="MainTabs">
                    <Stack.Screen
                        name="MainTabs"
                        component={TabNavigator}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Landing"
                        component={Landing}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Register"
                        component={Register}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="FindCaterers"
                        component={FindCaterers}
                        options={{ headerShown: true, title: "Find Caterers" }}
                    />
                    <Stack.Screen
                        name="Cart"
                        component={Cart}
                        options={{ headerShown: true }}
                    />
                    <Stack.Screen
                        name="Order"
                        component={Order}
                        options={{ headerShown: true }}
                    />
                    <Stack.Screen
                        name="ContactUs"
                        component={ContactUs}
                        options={{ headerShown: true, title: "Contact Us" }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default App;