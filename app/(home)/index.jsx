import React from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, Image, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';

const MainMenuScreen = ({ navigation }) => {
  return (
    <ImageBackground source={require('../../assets/images/homescreen_bg.png')} style={styles.background}>
      <View style={styles.container}>
        <Image source={require('../../assets/images/title.png')} style={styles.titleImage} />
        <Image source={require('../../assets/images/logo_HandJitsu.png')} style={styles.icons} />
        <View>
          <Link href = "/GameScreen" style={styles.button}>
            <Image source={require('../../assets/images/button_singleplayer.png')} style={styles.buttonImage} resizeMode="contain" />
          </Link>
          <TouchableOpacity style={styles.button}>
            <Image source={require('../../assets/images/button_multiplayer.png')} style={styles.buttonImage} resizeMode="contain" />
          </TouchableOpacity>
          <Link href="/Leaderboard" style={styles.button}>
            <Image source={require('../../assets/images/button_leaderboard.png')} style={styles.buttonImage} resizeMode="contain" />
          </Link>
        </View>
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  titleImage: {
    width: 299,
    height: 92, 
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
  button: {
    marginBottom: 16,
  },
  buttonImage: {
    width: 348,
    height: 65.5,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
  },
});

export default MainMenuScreen;
