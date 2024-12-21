import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function ChoosePlayersScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Players</Text>
      <Button
        title="Player vs Bot"
        onPress={() => navigation.navigate("Game")}
      />
      <Button
        title="Player vs Player"
        onPress={() => navigation.navigate("Game")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
});
