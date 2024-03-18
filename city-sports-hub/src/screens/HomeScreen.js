import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl , Platform, StatusBar} from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import EventCard from '../utils/EventCard';
import { firestore } from '../../firebase';
import FooterNavigation from '../utils/FooterNavigation';

const HomeScreen = ( {navigation} ) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchEvents = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "Events"));
      const updatedEvents = [];
      querySnapshot.forEach((doc) => {
        updatedEvents.push(doc.data());
      });
      setEvents(updatedEvents);
      setLoading(false);
      setRefreshing(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
      alert("Error fetching events");
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


  return (
    <>
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>

        {events.map((event, index) => (
          <View key={index}>
            <EventCard event={event} navigation={navigation} />
          </View>
        ))}

      </ScrollView>
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
});

export default HomeScreen;
