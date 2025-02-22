import { View, Text, TextInput, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { SERVER_URL } from '@env'

const Profile = () => {
    const [user, setUser] = useState({ firstName: '', lastName: '', phone: '', email: '' })

    useEffect(() => {
        const getUserData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('user')
                if (jsonValue != null) {
                    setUser(JSON.parse(jsonValue))
                }
            } catch (e) {
                console.error(e)
            }
        }
        getUserData()
    }, [])

    const updateProfile = async () => {
        try {
            const userId = user.id// Assuming user object has an id property
            const response = await axios.patch(`${SERVER_URL}/api/users/${userId}`, {
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                email: user.email
            })
            if (response.status === 200) {
                alert('Profile updated successfully')
            }
        } catch (error) {
            console.error(error)
            alert('Failed to update profile')
        }
    }

    return (
        <View className="flex-1 justify-center items-center">
            <Text className="text-xl font-bold">Profile Screen</Text>
        </View>
    )
}

export default Profile