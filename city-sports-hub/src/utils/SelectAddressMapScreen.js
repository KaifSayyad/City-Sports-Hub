import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';

const SelectAddressMapScreen = ({ route, navigation }) => {
  const { setAddress } = route.params;
  const [selectedCoordinate, setSelectedCoordinate] = useState(null);

  Geocoder.init('AIzaSyBDCRq_KBM-GYuBdY2LK1bA-4iIUr6sEvI');

  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedCoordinate({ latitude, longitude });

    try {
      // const response = await Geocoder.from(latitude, longitude);
      // const address = response.results[0].formatted_address;
      const address = "Demo 123"
      setAddress(address);
      navigation.navigate('CreateEventScreen', { address });
    } catch (error) {
      console.error('Error geocoding coordinates:', error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        {selectedCoordinate && (
          <Marker coordinate={selectedCoordinate} title="Selected Location" />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default SelectAddressMapScreen;
