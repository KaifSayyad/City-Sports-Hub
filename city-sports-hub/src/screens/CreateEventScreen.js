import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { setDoc , doc, documentId} from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
// import firestore from '../../firebase';
import { firestore } from '../../firebase';
import { getAuth } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;

const CreateEventScreen = ( { navigation }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      console.log(image);
      const base64Image = await convertToBase64(image);

      await setDoc(doc(firestore, "Events", generateRandomId()), {
        name,
        address,
        date,
        description,
        price: parseFloat(price),
        image: base64Image,
        organizer : user.uid,
      });

      alert('Event added successfully!');
      setName('');
      setAddress('');
      setDate('');
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
    if (status !== 'granted') { alert('Sorry, we need camera roll permissions to make this work!'); return; }
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    try{

      const res = await ImagePicker.launchImageLibraryAsync();
      if (!res.cancelled) {
        setImage(res.assets[0].uri);
      }
    }catch(e){
      console.log(e);
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
    <View style={styles.container}>
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
      <Text>Date:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setDate}
        value={date}
        placeholder="Event Date"
      />
      <Text>Description:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setDescription}
        value={description}
        placeholder="Event Description"
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
      <Button title="Choose Image" onPress={handleChoosePhoto} />
      <Button title="Add Event" onPress={createEvent} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default CreateEventScreen;
