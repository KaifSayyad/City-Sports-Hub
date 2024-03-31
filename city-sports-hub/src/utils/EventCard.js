import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const MAX_DESCRIPTION_LENGTH = 100; // Maximum length of the description before truncation

const EventCard = ({ navigation, event }) => {
  
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
        <Text style={styles.info}>{`Organizer: ${event.organizer || 'Unknown'}`}</Text>
        <Text style={styles.info}>{`Price: ₹${event.price}`}</Text>
        <Text style={styles.info}>{`Date & Time: ${new Date(event.time * 1000).toLocaleString()}`}</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Roboto',
    color: '#333',
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
