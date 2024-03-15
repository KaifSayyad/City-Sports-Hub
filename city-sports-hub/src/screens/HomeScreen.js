import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { collection, getDocs } from "firebase/firestore";
import EventCard from '../utils/EventCard';
import { firestore } from '../../firebase';

const HomeScreen = ( {navigation} ) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try{
        setEvents([]);
        const querySnapshot = await getDocs(collection(firestore, "Events"));
        querySnapshot.forEach((doc) => {
          events.push(doc.data());
        });
        setEvents(events);
        setLoading(false);
      }catch(e){
        console.log(e);
        setLoading(false);
        alert("Error fetching events");
      }
    };

    fetchEvents();
  }, []);


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }


  const handleNewsClick = () => {
    navigation.navigate('NewsScreen');
  }
  
  const handleCreateEventClick = () => {
    navigation.navigate('CreateEventScreen');
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {events.map((event, index) => (
          <View key={index}>
            <EventCard event={event} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerIcon}>
          <Icon name="calendar" size={24} color="black" />
          <Text>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon} onPress={handleCreateEventClick}>
          <Icon name="plus" size={24} color="black" />
          <Text>Create Event</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon} onPress={handleNewsClick}>
          <Icon name="newspaper-o" size={24} color="black" />
          <Text>News</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}>
          <Icon name="user" size={24} color="black" />
          <Text>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
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
});

export default HomeScreen;
