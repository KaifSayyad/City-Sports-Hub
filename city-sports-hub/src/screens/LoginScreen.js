import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../firebase';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Email and password are required');
            return;
        }
    
        setLoading(true);
        const auth = getAuth(app);
    
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in:', userCredential.user.email);
    
            // Reset the form after login
            setEmail('');
            setPassword('');
    
            // Navigate to HomeScreen or any other screen
            navigation.navigate('HomeScreen');
        } catch (error) {
            if (error.code === 'auth/invalid-email') {
                Alert.alert('Error', 'Invalid email format. Please enter a valid email.');
            } else if (error.code === 'auth/user-not-found') {
                Alert.alert('Error', 'User not found. Please check your email.');
            } else if (error.code === 'auth/invalid-credential') {
                Alert.alert('Error', 'Invalid password. Please enter the correct password.');
            } else {
                console.error('Login failed:', error.message);
                Alert.alert('Error', 'Login failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };    

    const handleSignup = () => {
        navigation.navigate('SignupScreen');
    };

    return (
        <ImageBackground
            source={require('../../assets/loginScreen_background.jpg')}
            style={styles.background}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Login</Text>
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

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                            <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleSignup}>
                            <Text style={styles.buttonText}>Signup</Text>
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

export default LoginScreen;
