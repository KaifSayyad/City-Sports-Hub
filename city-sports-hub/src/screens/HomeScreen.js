import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomePage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home Logged In</Text>
            <Text style={styles.description}>
                Welcome to our sports tournaments app! Browse and participate in various sports tournaments happening around you.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 32,
    },
});

export default HomePage;