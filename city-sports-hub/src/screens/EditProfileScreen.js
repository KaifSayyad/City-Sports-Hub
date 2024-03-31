import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform, StatusBar, TextInput, Button, Image, Modal, TouchableOpacity, Text } from 'react-native';
import { getAuth } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Divider, Provider } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { firestore } from '../../firebase';

const EditProfileScreen = () => {
    const auth = getAuth();
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [originalContactNumber, setOriginalContactNumber] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [username, setUsername] = useState('');
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    useEffect(() => {
        const currentUser = auth.currentUser;

        const loadInitialData = async () => {
            const userRef = await doc(firestore, "Users", currentUser.uid);
            const userSnap = await getDoc(userRef);
            const userData = userSnap.data();
            setEmail(userData.email);
            setContactNumber(userData.contactNumber);
            setOriginalContactNumber(userData.contactNumber);
            setUsername(userData.username);
            setProfilePicture(userData.profilePicture);
        }

        loadInitialData();
    }, []);

    const handleChoosePhoto = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };
        try {
            const result = await ImagePicker.launchImageLibraryAsync(options);
            if (!result.cancelled) {
                setProfilePicture(result.assets[0].uri);
                setIsMenuVisible(false); // Close the menu after selecting an image
            }
        } catch (error) {
            console.error('Error choosing photo:', error);
        }
    };

    const removeProfilePicture = () => {
        setProfilePicture(null);
        setIsMenuVisible(false); // Close the menu after removing the profile picture
    };

    const convertToBase64 = (uri) => {
        if(uri == null) return;
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            const reader = new FileReader();
            reader.onloadend = function () {
              resolve(reader.result);
            };
            reader.readAsDataURL(xhr.response);
          };
          xhr.onerror = function (error) {
            reject(error);
          };
          xhr.responseType = 'blob';
          xhr.open('GET', uri, true);
          xhr.send(null);
        });
      };

    const saveChanges = async () => {
        const userId = auth.currentUser.uid;
        const userRef = doc(firestore, 'Users', userId);
        const profilePictureBase64 = await convertToBase64(profilePicture); // Convert the image to base64

        const updatedData = {
            email: email || '', // Assuming email is a string
            contactNumber: contactNumber || 0, // Assuming contactNumber is a number
            profilePicture: profilePictureBase64 || '', // Assuming profilePicture is a string
            username: username || '', // Assuming username is a string
        };

        try {
            await setDoc(userRef, updatedData, { merge: true });
            alert('Profile updated successfully!')
        } catch (error) {
            console.error('Error updating document:', error);
            alert('An error occurred while updating your profile. Please try again later.');
        }
    };
    
    
    

    return (
        <Provider>
            <View style={styles.container}>
                <ScrollView>
                    <TouchableOpacity onPress={() => setIsMenuVisible(true)}>
                        <Avatar.Image
                            size={150}
                            source={profilePicture ? { uri: profilePicture } : null}
                            style={{ backgroundColor: 'gray' }}
                        />
                    </TouchableOpacity>
                    <Modal
                        visible={isMenuVisible}
                        transparent={true}
                        animationType='slide'
                        onRequestClose={() => setIsMenuVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <TouchableOpacity onPress={removeProfilePicture}>
                                    <Text style={styles.menuItem}>Remove</Text>
                                </TouchableOpacity>
                                <Divider />
                                <TouchableOpacity onPress={handleChoosePhoto}>
                                    <Text style={styles.menuItem}>Update</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <TextInput
                        style={styles.input}
                        value={email}
                        placeholder="Email"
                        editable={false}
                    />
                    <TextInput
                        style={styles.input}
                        value={contactNumber}
                        placeholder="Contact Number"
                        keyboardType="phone-pad"
                        onChangeText={setContactNumber}
                    />
                    <TextInput
                        style={styles.input}
                        value={username}
                        placeholder="Username"
                        onChangeText={setUsername}
                    />
                    <Button title="Save" onPress={saveChanges} />
                </ScrollView>
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: '#f0f0f0',
    },
    input: {
        backgroundColor: 'white',
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    menuItem: {
        padding: 10,
        fontSize: 18,
    },
});

export default EditProfileScreen;
