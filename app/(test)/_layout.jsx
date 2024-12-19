// /app/(test)/_layout.jsx
import React from 'react';
import { View, Text } from 'react-native';

// Layout for the (test) group
export default function TestLayout({ children }) {
    return (
        <View>
            <Text>Test Group Layout</Text>
            {children}  {/* Renders the children, i.e., the screen content inside the group */}
        </View>
    );
}
