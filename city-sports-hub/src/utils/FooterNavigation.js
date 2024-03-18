// FooterNav.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const FooterNavigation = ({ navigation }) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerIcon} onPress={() => { navigation.navigate('HomeScreen'); }}>
        <Icon name="calendar" size={24} color="black" />
        <Text>Events</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerIcon} onPress={() => { navigation.navigate('CreateEventScreen'); }}>
        <Icon name="plus" size={24} color="black" />
        <Text>Create Event</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerIcon} onPress={() => { navigation.navigate('NewsScreen'); }}>
        <Icon name="newspaper-o" size={24} color="black" />
        <Text>News</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerIcon} onPress={() => { navigation.navigate('ProfileScreen'); }}>
        <Icon name="user" size={24} color="black" />
        <Text>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  footerIcon: {
    alignItems: 'center',
  },
});

export default FooterNavigation;
