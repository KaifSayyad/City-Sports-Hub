import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet , Platform, StatusBar, TextInput, Button, Image} from 'react-native';
import { firestore } from '../../firebase';
import { setDoc, doc , getDoc} from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from "expo-image-picker";




const EditProfileScreen = () => {
    const auth = getAuth();
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [username, setUsername] = useState('');

    const handleEmailChange = (text) => {
        setEmail(text);
    };

    const handleContactNumberChange = (text) => {
        setContactNumber(text);
    };

    const handleProfilePictureChange = (text) => {
        setProfilePicture(text);
    };

    const handleUsernameChange = (text) => {
        setUsername(text);
    };

    useEffect (() => {
        const currentUser = auth.currentUser;

        const loadInitialData = async () => {
            const UserSnapshot =  await doc(firestore, "Users", currentUser.uid);
            const doc = await getDoc(UserSnapshot);
            const data = doc.data();
            setEmail(data.email);
            setUsername(data.username);
        }

        loadInitialData();
        console.log(email);
        console.log(username);
    }, []);

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

    const saveChanges = () => {
        const userId = firebase.auth().currentUser.uid;
        const userRef = firebase.firestore().collection('Users').doc(userId);
        const profilePicture_base64 = convertToBase64(profilePicture.uri);
        userRef.update({
            email: email,
            contactNumber: contactNumber,
            profilePicture: profilePicture_base64,
            username: username,
        }).then(() => {
            console.log('Document successfully updated');
        }).catch((error) => {
            console.error('Error updating document: ', error);
        });
    };

    // return (
    //     <>
    //         <View style={styles.container}>
    //             <ScrollView>
    //                 <Text>Edit Profile</Text>
    //                 <Text>Profile Picture</Text>
    //                 <TextInput
    //                     style={styles.input}
    //                     onChangeText={handleProfilePictureChange}
    //                     value={profilePicture}
    //                     placeholder="Profile Picture"
    //                 />
    //                 <Text>Email</Text>
    //                 <TextInput
    //                     style={styles.input}
    //                     onChangeText={handleEmailChange}
    //                     value={email}
    //                     placeholder="Email"
    //                     keyboardType="email-address"
    //                 />
    //                 <Text>Contact Number</Text>
    //                 <TextInput
    //                     style={styles.input}
    //                     onChangeText={handleContactNumberChange}
    //                     value={contactNumber}
    //                     placeholder="Contact Number"
    //                     keyboardType="phone-pad"
    //                 />
    //                 <Text>Username</Text>
    //                 <TextInput
    //                     style={styles.input}
    //                     onChangeText={handleUsernameChange}
    //                     value={username}
    //                     placeholder="Username"
    //                 />
    //                 <Button title="Save" onPress={saveChanges} />
    //             </ScrollView>
    //         </View>
    //     </>
    // );
    return (
        <>
            <View style={styles.container}>
                <ScrollView>
                    <Image src={profilePicture} style={{width: 200, height: 200}} />
                    
                    <Button title="Save" onPress={saveChanges} />
                </ScrollView>
            </View>
        </>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: '#f0f0f0',
    },

});

export default EditProfileScreen;