import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ImageBackground, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const LeaderboardScreen = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get('https://handjitsu-api.vercel.app/leaderboard');
        setLeaderboardData(response.data.data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchLeaderboardData();
  }, []);

  const renderItem = ({ item, index }) => {
    let trophyIcon;
    if (index === 0) {
      trophyIcon = require('../../assets/images/gold_medal.png');
    } else if (index === 1) {
      trophyIcon = require('../../assets/images/silver_medal.png');
    } else if (index === 2) {
      trophyIcon = require('../../assets/images/bronze_medal.png');
    }

    return (
      <View style={[styles.leaderboardItem, index === 0 && styles.firstPlace]}>
        <View style={styles.rank}>
          <Text style={styles.rankText}>{index + 1}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{item.username}</Text>
          <Text style={styles.wins}>{item.winrate_text} win</Text>
        </View>
        {trophyIcon && <Image source={trophyIcon} style={styles.trophyIcon} />}
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/images/leaderboard_bg.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style = {styles.leaderboardContainer}>
      <TouchableOpacity onPress={() => router.push("/(home)")}>
        <Image 
          source={require('../../assets/images/button-back-white.png')}
          style={styles.backButtonImage} 
        />
      </TouchableOpacity>
      <Text style={styles.title}>Leaderboard HandJitsu</Text>
      </View>
      <FlatList
        data={leaderboardData}
        renderItem={renderItem}
        keyExtractor={(item, index) => (item.leaderboard_id || index).toString()}
        contentContainerStyle={styles.listContainer}
        style={styles.leaderboard}
      />
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 30,
    width: "100%"
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    flexGrow: 1,             
    textAlign: 'center',      
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  listContainer: {
    paddingBottom: 20,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
    elevation: 3,
  },
  firstPlace: {
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  rank: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  rankText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4F4F4F',
  },
  wins: {
    fontSize: 14,
    color: '#828282',
  },
  trophyIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  leaderboard: {
    backgroundColor: '#EFEEFC',
    borderRadius: 20,
    padding: 16,
  },
  backButtonImage: {
    width: 36,
    height: 36, 
    resizeMode: 'contain', 
  },
  leaderboardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', 
    marginBottom: 20
  }
});

export default LeaderboardScreen;
