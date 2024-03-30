import React, { useState , useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, StatusBar, Linking } from 'react-native';
import FooterNavigation from '../utils/FooterNavigation';
import { ScrollView } from 'react-native-gesture-handler';
import { firestore } from '../../firebase';
import { getAuth  } from "firebase/auth";
import { doc, getDoc} from "firebase/firestore";

const ProfileScreen = ({navigation}) => {

    const auth = getAuth();
    const [user, setUser] = useState([]);

    useEffect(() => {
        const userId = auth.currentUser.uid;
            try{
                const fetchUser = async () => {
                    const userRef = doc(firestore, "Users", userId);
                    const userSnap = await getDoc(userRef);
                    if (userSnap.exists()) {
                        setUser(userSnap.data());
                    } else {
                        console.log("No such document!");
                    }
                }
                fetchUser();
            }catch(e){
                console.log(e);
            }
    }, []);

    const handleSignOut = () =>{
        auth.signOut();
    }

    const handleContactUs = () => {
        const phoneNumber = '8432462071';
        const url = `tel:${phoneNumber}`;
        Linking.openURL(url);
    }

    const handleReferAFriend = () =>{
        alert('Sorry! App is not available for public use :)')
    }

    const handleRegisteredEvents = () =>{
        navigation.navigate("RegisteredEventsScreen");
    }
    
    const handleMyEvents = () =>{
        navigation.navigate("MyEventsScreen");
    }

    const handleEditProfile = () =>{
        navigation.navigate("EditProfileScreen");
    }
    
    return (
        <>
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.userCard}>
                    <View style={styles.profilePicture}>
                    <Image source={{ uri: user.profilePicture }} style={styles.image} />
                    </View>
                    <View style={styles.userStatus}>
                        <Text>{user.username}</Text>
                        <Text>{user.email}</Text>
                        <Text>{user.contact}</Text>
                    </View>
                </View>
                <View style={styles.utility}>
                    <TouchableOpacity style={styles.utilityChild} onPress={handleEditProfile}>
                        <Text>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.utilityChild} onPress={handleMyEvents}>
                        <Text>My Events</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.utilityChild} onPress={handleRegisteredEvents}>
                        <Text>Registered Events</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.utilityChild} onPress={handleReferAFriend}>
                        <Text>Refer a Friend</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.utilityChild} onPress={handleContactUs}>
                        <Text>Contact Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.utilityChild} onPress={handleSignOut}>
                        <Text>SignOut</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
        <FooterNavigation navigation={navigation} />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: '#f0f0f0',
    },
    userCard: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        height:150,
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 50,
        marginRight: 20,
        height:100,
        width:100,
    },
    userStatus: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'left',
        height:100,
    },
    utility:{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'left',
        padding:20,
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
        height:'auto',
    },
    utilityChild:{
        justifyContent: 'center',
        alignItems: 'left',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: '#f0f0f0',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    }
    
});

export default ProfileScreen;