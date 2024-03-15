import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';

const SportsNews = () => {

    const [newsData, setNewsData] = useState(null);

    useEffect(() => {
        fetchSportsNews();
    }, []);

    const fetchSportsNews = async () => {
        try {
            const response = await fetch('https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=e951ea41552b48ed813f68e3faf00863');
            const data = await response.json();
            setNewsData(data.articles);
        } catch (error) {
            console.error(error);
        }
    };

    const [fontsLoaded] = useFonts({
        'Kalam-Regular': require('../../assets/fonts/Kalam-Regular.ttf'),
        'Kalam-Bold': require('../../assets/fonts/Kalam-Bold.ttf'),
      });
    
      if (!fontsLoaded) {
        return <Text>Loading...</Text>;
      }

    return (
        <ScrollView contentContainerStyle={styles.container}>
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
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#ecf0f1',
        paddingVertical: 20,
        paddingHorizontal: 10,
        fontFamily: 'Kalam-Regular',
    },
    card: {
        backgroundColor: '#fff',
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
});

export default SportsNews;
