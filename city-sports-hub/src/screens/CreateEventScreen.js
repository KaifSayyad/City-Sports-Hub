import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Platform, StatusBar } from 'react-native';
import { setDoc, doc , getDoc} from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { firestore } from '../../firebase';
import { getAuth } from "firebase/auth";
import { ScrollView } from 'react-native-gesture-handler';
import FooterNavigation from '../utils/FooterNavigation';
import DateTimePicker from '@react-native-community/datetimepicker';


const CreateEventScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const minimumDate = new Date();
  minimumDate.setDate(minimumDate.getDate() + 1); // Set to tomorrow
  minimumDate.setHours(0, 0, 0, 0); // Set time to midnight


  const onChangeDate = (selectedDate) => {
    setDatePickerVisible(false);
    const newDate = new Date(selectedDate.nativeEvent.timestamp);
    setDate((newDate || date));
  };
  const onChangeTime = (selectedTime) => {
    setTimePickerVisible(false);
    const newDate = new Date(selectedTime.nativeEvent.timestamp);
    setTime((newDate || time));
  };

  const showDatepicker = () => {
    setDatePickerVisible(true);
  };
  const showTimepicker = () => {
    setTimePickerVisible(true);
  };

  const convertToBase64 = (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        const reader = new FileReader();
        reader.onloadend = function () {
          resolve(reader.result);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.onerror = function (error) {
        reject(error);
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  };

  const createEvent = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const event_id = generateRandomId();
    setLoading(true);
    try {
        const base64Image = await convertToBase64(image);
        await setDoc(doc(firestore, "Events", event_id), {
            name,
            address,
            date,
            time,
            description,
            price: parseFloat(price),
            image: base64Image,
            organizer: user.displayName,
            id: event_id,
        });

        const userRef = doc(firestore, "Users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            const userData = userDoc.data();
            if (!userData.MyEvents) {
                await setDoc(userRef, { MyEvents: [event_id] }, { merge: true });
            } else {
                await updateDoc(userRef, {
                    MyEvents: arrayUnion(event_id)
                });
            }
        } else {
            throw new Error("User document not found");
        }

        alert('Event added successfully!');
        setName('');
        setAddress('');
        setDate(new Date());
        setTime(new Date());
        setDescription('');
        setPrice('');
        setImage(null);
    } catch (error) {
        console.error('Error adding event:', error);
        alert('Failed to add event. Please try again.');
    } finally {
        setLoading(false);
    }
};

  

  const handleChoosePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    try {
      const result = await ImagePicker.launchImageLibraryAsync(options);
      if (!result.cancelled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error choosing photo:', error);
    }
  };

  const generateRandomId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters[randomIndex];
    }
    const timestamp = new Date().getTime();
    return `${randomId}_${timestamp}`;
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <StatusBar translucent backgroundColor="transparent" />
          <Text>Name:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
            placeholder="Event Name"
          />
          <Text>Address:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setAddress}
            value={address}
            placeholder="Event Address"
          />
          <Button onPress={showDatepicker} title="Select Date" />
          <View>
            {isDatePickerVisible && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                is24Hour={true}
                minimumDate={minimumDate}
                display='inline'
                onChange={onChangeDate}
              />
            )}
          {date && <Text style={styles.input}>{date.toDateString()}</Text>}
          </View>
          <Button onPress={showTimepicker} title="Select Time" />
          <View>
            {isTimePickerVisible && (
              <DateTimePicker
                value={new Date()}
                mode="time"
                is24Hour={false}
                display='inline'
                onChange={onChangeTime}
              />
            )}
          {time && <Text style={styles.input}>{time.toTimeString().slice(0,9)}</Text>}
          </View>
          <Text>Description:</Text>
          <TextInput
            style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
            onChangeText={setDescription}
            value={description}
            placeholder="Event Description"
            multiline={true}
            numberOfLines={4}
          />
          <Text>Price:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPrice}
            value={price}
            placeholder="Event Price"
            keyboardType="numeric"
          />
          <Text>Image:</Text>
          <TouchableOpacity style={styles.button} onPress={handleChoosePhoto}>
            <Text>Choose Image</Text>
          </TouchableOpacity>
          {image && <Image source={{ uri: image.uri }} style={styles.imagePreview} />}
          <Button title="Add Event" onPress={createEvent} disabled={loading} />
          <View style={{ height: 50 }} />
        </ScrollView>
      </View>
      
      <FooterNavigation navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#f0f0f0',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginBottom: 20,
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
    elevation: 8,
  },
  footerIcon: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
  },
});

export default CreateEventScreen;
