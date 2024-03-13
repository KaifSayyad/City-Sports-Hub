import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app, firestore } from '../../firebase'; // Make sure to update the path if necessary
import { collection, addDoc } from "firebase/firestore"; 
import { updateProfile, sendEmailVerification } from 'firebase/auth';



const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!email || !username || !password || !confirmPassword) {
            Alert.alert('Error', 'All fields are required');
            return;
        }
    
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }
    
        setLoading(true);
    
        try {
            const auth = getAuth(app);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('User signed up:', userCredential.user.email);
    
            // Update the user's display name
            await updateProfile(auth.currentUser, {
                displayName: username,
            });
    
            // Send email verification
            await sendEmailVerification(auth.currentUser);
    
            // Create a new user document in Firestore
            try {
                const docRef = await addDoc(collection(firestore, "Users"), {
                  username: username,
                  email: email,
                });
                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
                    
            // Reset the form after signup
            setEmail('');
            setUsername('');
            setPassword('');
            setConfirmPassword('');
    
            Alert.alert('Success', 'Signup successful. Please verify your email before logging in.');
    
            // Navigate to HomeScreen or wherever you want
            navigation.navigate('HomeScreen');
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert('Error', 'Email is already in use. Please use a different email.');
            } else {
                console.error('Signup failed:', error.message);
                Alert.alert('Error', 'Signup failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };
    
       
    

    const handleLogin = () => {
        navigation.navigate('LoginScreen');
    };

    return (
        <ImageBackground
            source={require('../../assets/signupPage_background.jpg')}
            style={styles.background}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Signup</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleSignup}>
                            {loading ? (
                                <ActivityIndicator size="small" color="white" />
                            ) : (
                                <Text style={styles.buttonText}>Signup</Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
        alignItems: 'left',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    input: {
        backgroundColor: 'white',
        width: 'width',
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        width: '48%', // Adjust width to leave some space between buttons
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default SignupScreen;
