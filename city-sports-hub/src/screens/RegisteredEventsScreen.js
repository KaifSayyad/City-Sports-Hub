import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import FooterNavigation from '../utils/FooterNavigation';

const RegisteredEventsScreen = ({navigation}) => {
    return (
        <>
        <View style={styles.container}>
            <Text>Registered Events Screen</Text>
        </View>
        <FooterNavigation navigation={navigation}/>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: '#f0f0f0',
    }
});

export default RegisteredEventsScreen;