import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl, ImageBackground, Platform, StatusBar } from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import EventCard from '../utils/EventCard';
import { firestore } from '../../firebase';
import FooterNavigation from '../utils/FooterNavigation';

const HomeScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "Events"));
      const updatedEvents = [];
      await querySnapshot.forEach((doc) => {
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

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <ImageBackground source={require('../../assets/homeScreen_background.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : (
            events.map((event, index) => (
              <View key={index}>
                <EventCard event={event} navigation={navigation} />
              </View>
            ))
          )}
        </ScrollView>
        <View style={{ paddingBottom: 100 }} />
      </View>
      <FooterNavigation navigation={navigation} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background to allow the background image to show through
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
