import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

const leaderboardData = [
  { id: "1", name: "Fulan 1", wins: 10 },
  { id: "2", name: "Fulan 2", wins: 8 },
  { id: "3", name: "Fulan 3", wins: 7 },
  { id: "4", name: "Fulan 4", wins: 5 },
  { id: "5", name: "Fulan 5", wins: 4 },
  { id: "6", name: "Fulan 6", wins: 2 },
];

const LeaderboardScreen = () => {
  const renderItem = ({ item, index }) => {
    let trophyIcon;
    if (index === 0) {
      trophyIcon = require("../assets/images/gold_medal.png");
    } else if (index === 1) {
      trophyIcon = require("../assets/images/silver_medal.png");
    } else if (index === 2) {
      trophyIcon = require("../assets/images/bronze_medal.png");
    }

    return (
      <View style={[styles.leaderboardItem, index === 0 && styles.firstPlace]}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.wins}>Wins: {item.wins}</Text>
        </View>
        {trophyIcon && <Image source={trophyIcon} style={styles.trophyIcon} />}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <FlatList
        data={leaderboardData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#4F4F4F",
  },
  listContainer: {
    paddingBottom: 20,
  },
  leaderboardItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  firstPlace: {
    borderColor: "#FFD700",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#6C63FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  avatarText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  wins: {
    fontSize: 14,
    color: "#828282",
  },
  trophyIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});

export default LeaderboardScreen;