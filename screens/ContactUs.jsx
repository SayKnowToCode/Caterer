import { View, Text, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { SERVER_URL } from '@env'
import axios from 'axios'
import { tw } from 'nativewind'

const ContactUs = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [contact, setContact] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${SERVER_URL}/api/contactForm`, {
                firstName,
                lastName,
                contact,
                email,
                message,
            })
            // Handle response data
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <View className="p-5">
            <Text>Contact Us</Text>
            <TextInput
                className="h-10 border border-gray-400 mb-2 p-2"
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                className="h-10 border border-gray-400 mb-2 p-2"
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />
            <TextInput
                className="h-10 border border-gray-400 mb-2 p-2"
                placeholder="Contact"
                value={contact}
                onChangeText={setContact}
            />
            <TextInput
                className="h-10 border border-gray-400 mb-2 p-2"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                className="h-10 border border-gray-400 mb-2 p-2"
                placeholder="Message"
                value={message}
                onChangeText={setMessage}
            />
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    )
}

export default ContactUs