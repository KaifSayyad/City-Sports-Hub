import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const EventCard = ({ event }) => {

  return (
    <View style={styles.card}>
      <Image source={{ uri: event.image }} style={styles.image} />
      <Text style={styles.title}>{event.name}</Text>
      <Text>{`Organizer: ${event.organizer}`}</Text>
      <Text>{`Price: ${event.price}`}</Text>
      <Text>{`Date & Time: ${new Date(event.date.seconds * 1000).toLocaleString()}`}</Text>
      <Text>{`Location: ${event.address}`}</Text>
      <Text>{event.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default EventCard;
