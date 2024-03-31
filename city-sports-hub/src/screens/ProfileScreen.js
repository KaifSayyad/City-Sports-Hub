import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, Platform, StatusBar, Linking, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { firestore } from '../../firebase';
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import FooterNavigation from '../utils/FooterNavigation';

const ProfileScreen = ({ navigation }) => {
  const auth = getAuth();
  const [user, setUser] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const userId = auth.currentUser.uid;
    fetchUserData(userId);
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const userRef = doc(firestore, "Users", userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUser(userSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleSignOut = () => {
    auth.signOut();
  }

  const handleContactUs = () => {
    const phoneNumber = '8432462071';
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url);
  }

  const handleReferAFriend = () => {
    alert('Sorry! App is not available for public use :)')
  }

  const handleRegisteredEvents = () => {
    navigation.navigate("RegisteredEventsScreen");
  }

  const handleMyEvents = () => {
    navigation.navigate("MyEventsScreen");
  }

  const handleEditProfile = () => {
    navigation.navigate("EditProfileScreen");
  }

  return (
    <ImageBackground source={require('../../assets/profileScreen_background.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>

          <View style={styles.userCard}>
            <View style={styles.profilePicture}>
              <Image source={{ uri: user.profilePicture }} style={styles.image} />
            </View>
            <View style={styles.userStatus}>
              <Text style={{fontSize:20, fontWeight:"bold", marginBottom:5}} >{user.username}</Text>
              <Text style={{fontSize:14, marginBottom:3}} >{user.email}</Text>
              <Text style={{fontSize:14, marginBottom:3}} >{user.contactNumber}</Text>
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
              <Text>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={{ paddingBottom: 100 }} />
      </View>
      <FooterNavigation navigation={navigation} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: 'rgba(230, 247, 255, 0.3)', // Semi-transparent background color for the form
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  userCard: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    height: 150,
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 50,
    marginRight: 20,
    height: 100,
    width: 100,
  },
  userStatus: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'left',
    height: 'auto',
  },
  utility: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'left',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    height: 'auto',
  },
  utilityChild: {
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
