import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, StatusBar , TouchableOpacity} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import Geocoder from 'react-native-geocoding';
import { Ionicons } from '@expo/vector-icons'; 


export default SelectAddressMapScreen = ({ route, navigation }) => {
  const { setAddress } = route.params;
  const [selectedCoordinate, setSelectedCoordinate] = useState(null);
  const [latitude, setLatitude] = useState(19.0457);
  const [longitude, setLongitude] = useState(72.8892);

  useEffect(() => {
    const fetchLocation = async () => {
      let { status } = await requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    };

    fetchLocation();
    setLocation({ latitude, longitude });
  }, []);

  const setLocation = async ({latitude, longitude}) => {
    const response = await Geocoder.from(latitude, longitude);
    const address = response.results[0].formatted_address || 'Unknown';
    setAddress(address);
    // console.log(latitude, longitude);
  };

  Geocoder.init('**YOUR API KEY**');

  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedCoordinate({ latitude, longitude });

    try {
      const response = await Geocoder.from(latitude, longitude);
      const address = response.results[0].formatted_address || 'Unknown';
      setAddress(address);
      navigation.navigate('CreateEventScreen');
    } catch (error) {
      console.error('Error geocoding coordinates:', error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        {selectedCoordinate && (
          <Marker coordinate={selectedCoordinate} title="Selected Location" />
        )}
        {!selectedCoordinate && (
          <Marker
          coordinate={{latitude: latitude,
          longitude: longitude}}
          title={"title"}
          description={"description"}
       />)}
      </MapView>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    // backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent background color for the form
  },
  map: {
    flex: 1,
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

// export default SelectAddressMapScreen;
