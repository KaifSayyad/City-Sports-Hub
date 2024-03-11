// import React from 'react';
// import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

// const HomePage = () => {
//   return (
//     <ImageBackground
//       source={require('../assets/homePage_background.png')}
//       style={styles.background}
//     >
//       <View style={styles.overlay}>
//         <View style={styles.container}>
//           <Text style={styles.title}>Welcome to Sportify</Text>
//           <Text style={styles.subtitle}>Your ultimate sports tournament hosting and management app</Text>
//           <TouchableOpacity style={styles.button}>
//             <Text style={styles.buttonText}>Login</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button}>
//             <Text style={styles.buttonText}>Sign Up</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     resizeMode: 'cover',
//     justifyContent: 'center',
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   container: {
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: 'white',
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 18,
//     color: 'white',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#3498db',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 10,
//     width: 200,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//   },
// });

// export default HomePage;

import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
  const navigation = useNavigation();

  const goToLoginPage = () => {
    navigation.navigate('LoginPage');
  };

  const goToSignupPage = () => {
    navigation.navigate('SignupPage');
  };

  return (
    <ImageBackground
      source={require('../assets/homePage_background.png')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome to Sportify</Text>
          <Text style={styles.subtitle}>Your ultimate sports tournament hosting and management app</Text>
          <TouchableOpacity style={styles.button} onPress={goToLoginPage}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={goToSignupPage}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default HomePage;
