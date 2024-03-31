import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const MAX_DESCRIPTION_LENGTH = 100; // Maximum length of the description before truncation

const EventCard = ({ navigation, event }) => {

  const getTime = () => {
    const timestamp = event.time.toDate(); // Convert Firestore Timestamp to JavaScript Date
    let hours = timestamp.getHours(); // Extract hours
    const minutes = timestamp.getMinutes(); // Extract minutes
    const seconds = timestamp.getSeconds(); // Extract seconds
    const ampm = hours >= 12 ? 'PM' : 'AM'; // Determine AM or PM

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12;

    const timeString = `${hours}:${minutes}:${seconds} ${ampm}`; // Create the formatted time string
    // console.log(timeString); // Output: '10:00:00 AM' for example
    return timeString;
  };
  
  const truncatedDescription =
    event && event.description && event.description.length > MAX_DESCRIPTION_LENGTH
      ? event.description.substring(0, MAX_DESCRIPTION_LENGTH) + '...'
      : event?.description || '';


  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('EventDetailsScreen', { event: event })}
    >
      <Image source={{ uri: event.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{event.name}</Text>
        <Text style={styles.info}>{`By: ${event.organizer || 'Unknown'}`}</Text>
        <Text style={styles.info}>{`Entry Fee: ₹${event.price}`}</Text>
        <Text style={styles.info}>{`Date & Time: ${event.time.toDate().toDateString()} ${getTime(event.time)}`}</Text>
        <Text style={styles.info}>{`Location: ${event.address}`}</Text>
        <Text style={styles.description}>{truncatedDescription}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(230, 247, 255, 0.8)', // Semi-transparent light blue background color
    borderRadius: 10,
    padding: 10,
    margin: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Roboto',
    color: '#333',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  info: {
    fontSize: 16,
    marginBottom: 3,
    fontFamily: 'Roboto',
    color: '#666',
    
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    maxHeight: 60, // Maximum height of the description before truncation
    overflow: 'hidden',
    fontFamily: 'Roboto',
    color: '#888',
  },
});

export default EventCard;
