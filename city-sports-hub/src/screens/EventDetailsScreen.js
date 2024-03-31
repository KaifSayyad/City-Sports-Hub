import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Platform, StatusBar, ScrollView, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo vector-icons
import FooterNavigation from '../utils/FooterNavigation';
import { firestore } from '../../firebase';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

const EventDetailsScreen = ({ navigation }) => {
    const route = useRoute();
    const auth = getAuth();
    const { event } = route.params;
    const [user, setUser] = useState([]);
    const [events, setEvents] = useState([]);

    const handleRegister = async () => {
        try {
            // Check if the user is already registered for the event
            const userDoc = await getDoc(doc(firestore, 'Users', auth.currentUser.uid));
            if (userDoc.exists()) {
                setUser(userDoc.data());
                if (user.RegisteredEvents && user.RegisteredEvents.includes(event.id)) {
                    Alert.alert('Registration', `You are already registered for ${event.name}`);
                    return;
                }
            }

            // Update the Event document to add the current user's UID to the RegisteredUsers array
            const eventRef = doc(firestore, 'Events', event.id);
            const eventDoc = await getDoc(eventRef);
            if (!eventDoc.exists()) {
                throw new Error('Event not found');
            }

            setEvents(eventDoc.data());
            await updateDoc(eventRef, {
                RegisteredUsers: arrayUnion(auth.currentUser.uid)
            });

            // Update the User document to add the event ID to the RegisteredEvents array 
            const userRef = doc(firestore, "Users", auth.currentUser.uid);
            console.log(userRef);
            await updateDoc(userRef, {
                RegisteredEvents: arrayUnion(event.id)
            });

            Alert.alert('Registration', `You have successfully registered for ${event.name}`);
        } catch (error) {
            console.error('Error registering for event:', error);
            Alert.alert('Registration Failed', 'Failed to register for the event. Please try again.');
        }
    };

    return (
        <ImageBackground source={require('../../assets/eventDetailsScreen_background.jpeg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {event && (
                        <>
                            <Image source={{ uri: event.image }} style={styles.image} />
                            <View style={styles.subContainer}>
                                <Text style={styles.title}>{event.name}</Text>
                                <Text>{`Organizer: ${event.organizer || 'Unknown'}`}</Text>
                                <Text>{`Price: ${event.price}`}</Text>
                                <Text>{`Date & Time: ${new Date(event.date.seconds * 1000).toLocaleString()}`}</Text>
                                <Text>{`Location: ${event.address}`}</Text>
                                <Text>{event.description}</Text>
                                <View style={{ height: 70 }} />
                                <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                                    <Text style={styles.registerButtonText}>
                                        {user.RegisteredEvents && user.RegisteredEvents.includes(event.id) ? 'Already Registered' : `Register for ₹${event.price}`}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </ScrollView>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <FooterNavigation navigation={navigation} />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent background color for the form
        elevation: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        elevation: 4,
    },
    registerButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'green',
        padding: 12,
        borderRadius: 8,
    },
    registerButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
});

export default EventDetailsScreen;
