import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl , Platform, StatusBar} from 'react-native';
import { doc, getDoc} from "firebase/firestore";
import EventCard from '../utils/EventCard';
import { firestore } from '../../firebase';
import { getAuth } from 'firebase/auth';
import FooterNavigation from '../utils/FooterNavigation';
import { Ionicons } from '@expo/vector-icons'; 


const MyEventsScreen = ( {navigation} ) => {
    const auth = getAuth();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = React.useState(false);

    const fillRegisteredEventsId = async () =>{
        const userId = auth.currentUser.uid;
        const userRef = doc(firestore, "Users", userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            const forUpdatingRegisteredEventsId = [];
            await userSnap.data().MyEvents.map(element => {
                forUpdatingRegisteredEventsId.push(element);
            });
            return forUpdatingRegisteredEventsId;
        } else {
            console.log("No such document!");
        }
    }

    const fetchEvents = async () => {
        try {
            
            const temp = await fillRegisteredEventsId();
            const updatedEvents = [];
            for (const eventId of temp) {
                const eventRef = doc(firestore, "Events", eventId);
                const eventSnap = await getDoc(eventRef);
                if (eventSnap.exists()) {
                    updatedEvents.push(eventSnap.data());
                } else {
                    console.log(`Event with ID ${eventId} does not exist`);
                }
            }
            
            setEvents(updatedEvents);
            setLoading(false);
            setRefreshing(false);
        } catch (e) {
            console.log(e);
            setLoading(false);
            alert("You've not created any events :(");
            navigation.goBack();
        }
    };      
    
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setEvents([]);
        fetchEvents();
    }, []);
    
    useEffect(() => {
        setEvents([]);
        fetchEvents();
    }, []);
    
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleNoEvents = () => {
    alert("No events found")
    navigation.goBack();
  }


  return (
    <>
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        
        {
          (events) ? ( 
            <>
            {events && events.map((event, index) => (
              // To add onPress to this EventCard such that it should redirect to EventAnalyticsScreen
              <TouchableOpacity >
              <View key={index}>
                <EventCard event={event} navigation={navigation} />
              </View>
              </TouchableOpacity>
            ))}
          </>
          ) : ( handleNoEvents)
        }

      </ScrollView>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
    </View>
    <FooterNavigation navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:5,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#f0f0f0',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerIcon: {
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default MyEventsScreen;
