import './global.css';
import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your screens
import Landing from './screens/Landing';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import FindCaterers from './screens/FindCaterers';
import Cart from './screens/Cart';
import Bookings from './screens/Bookings';
import Order from './screens/Order';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Landing">
                    <Stack.Screen
                        name="Landing"
                        component={Landing}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Home"
                        component={Home}
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
                        name="Bookings"
                        component={Bookings}
                        options={{ headerShown: true, title: "My Bookings" }}
                    />
                    <Stack.Screen
                        name="Order"
                        component={Order}
                        options={{ headerShown: true }}
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