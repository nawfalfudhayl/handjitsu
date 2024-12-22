import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const MainMenuScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']} // Ganti dengan warna gradasi yang Anda inginkan
      style={styles.background}
    >
      <View style={styles.container}>
        <Image source={require('../assets/images/title.png')} style={styles.titleImage} />
        <Image source={require('../assets/images/icon-title.png')} style={styles.icons} />
        <TouchableOpacity style={styles.singlePlayerButton} onPress={() => navigation.navigate('SinglePlayer')}>
          <Text style={styles.buttonText}>Single Player</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  titleImage: {
    width: 299, // Atur sesuai ukuran gambar
    height: 92, // Atur sesuai ukuran gambar
    marginBottom: 20,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    width: 253,
    height: 253,
    marginHorizontal: 10,
  },
  singlePlayerButton: {
    backgroundColor: 'yellow',
    width: 348,
    height: 65.5,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  multiplayerButton: {
    backgroundColor: 'purple',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
  },
});

export default MainMenuScreen;
