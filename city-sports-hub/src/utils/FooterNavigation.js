import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';


const FooterNavigation = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const title = route.name;
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={[styles.footerIcon, (title === "HomeScreen") ? styles.highlighted : null]}
        onPress={() => { navigation.navigate('HomeScreen'); }}
      >
        <Feather name="calendar" size={33} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.footerIcon, (title === "CreateEventScreen") ? styles.highlighted : null]}
        onPress={() => { navigation.navigate('CreateEventScreen'); }}
      >
        <MaterialCommunityIcons name="plus" size={33} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.footerIcon, (title === "NewsScreen") ? styles.highlighted : null]}
        onPress={() => { navigation.navigate('NewsScreen'); }}
      >
        <Feather name="file-text" size={33} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.footerIcon, (title === "ProfileScreen") ? styles.highlighted : null]}
        onPress={() => { navigation.navigate('ProfileScreen'); }}
      >
        <FontAwesome name="user" size={33} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 20,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  footerIcon: {
    alignItems: 'center',
  },
  highlighted: {
    backgroundColor: '#4285F4', // Light blue background color for highlighted item
    borderRadius: 15,
    padding: 5,
  },
});

export default FooterNavigation;
