import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const choices = ["Scissors", "Rock", "Paper"];

const getResult = (userChoice, botChoice) => {
  if (userChoice === botChoice) return "Draw";
  if (
    (userChoice === "Scissors" && botChoice === "Paper") ||
    (userChoice === "Rock" && botChoice === "Scissors") ||
    (userChoice === "Paper" && botChoice === "Rock")
  )
    return "Win";
  return "Lose";
};

const GameScreen = () => {
  const [userChoice, setUserChoice] = useState("");
  const [botChoice, setBotChoice] = useState("");
  const [result, setResult] = useState("");

  const playGame = (choice) => {
    const botRandomChoice = choices[Math.floor(Math.random() * choices.length)];
    setUserChoice(choice);
    setBotChoice(botRandomChoice);
    setResult(getResult(choice, botRandomChoice));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scissors, Rock, Paper Game</Text>
      <View style={styles.buttonContainer}>
        {choices.map((choice) => (
          <Button
            key={choice}
            title={choice}
            onPress={() => playGame(choice)}
          />
        ))}
      </View>
      {userChoice !== "" && (
        <View style={styles.resultContainer}>
          <Text>You: {userChoice}</Text>
          <Text>Bot: {botChoice}</Text>
          <Text style={styles.result}>Result: {result}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  buttonContainer: { flexDirection: "row", justifyContent: "space-around" },
  resultContainer: { marginTop: 30, alignItems: "center" },
  result: { fontSize: 20, fontWeight: "bold", marginTop: 10 },
});

export default GameScreen;
