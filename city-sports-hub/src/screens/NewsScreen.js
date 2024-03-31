import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import FooterNavigation from '../utils/FooterNavigation.js';

const SportsNews = ({ navigation }) => {
  const [newsData, setNewsData] = useState(null);

  useEffect(() => {
    fetchSportsNews();
  }, []);

  const fetchSportsNews = async () => {
    try {
      const response = await fetch('https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=e951ea41552b48ed813f68e3faf00863');
      const data = await response.json();
      setNewsData(data.articles);
      console.log(data.articles.length);
    } catch (error) {
      console.error(error);
    }
  };

  const [fontsLoaded] = useFonts({
    'Kalam-Regular': require('../../assets/fonts/Kalam-Regular.ttf'),
    'Kalam-Bold': require('../../assets/fonts/Kalam-Bold.ttf'),
  });

  if (!fontsLoaded || !newsData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ImageBackground source={require('../../assets/newsScreen_background.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {newsData && newsData.length > 0 && newsData.map((article, index) => (
            <TouchableOpacity key={index} style={styles.card}>
              <Image
                source={{ uri: article.urlToImage }}
                style={styles.image}
              />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{article.title}</Text>
                <Text style={styles.description}>{article.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={{ paddingBottom: 100}} />
      </View>
      <FooterNavigation navigation={navigation} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent background color for the form
  },
  scrollView: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    fontFamily: 'Kalam-Regular',
  },
  card: {
    backgroundColor: 'rgba(230, 247, 255, 0.7)', // Semi-transparent background color for the form

    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Kalam-Bold',
  },
  description: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Kalam-Regular',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SportsNews;
