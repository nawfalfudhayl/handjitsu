import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { useRouter } from "expo-router";

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
  const [showResult, setShowResult] = useState(false);
  const router = useRouter();

  const playGame = (choice) => {
    const botRandomChoice = choices[Math.floor(Math.random() * choices.length)];
    setUserChoice(choice);
    setBotChoice(botRandomChoice);
    setShowResult(false);
  };

  const displayResult = () => {
    setResult(getResult(userChoice, botChoice));
    setShowResult(true);
  };

  return (
    <ImageBackground source={require('../../assets/images/spaceroom_bg.png')} style={styles.background}>
      <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => playGame("Rock")} style={styles.choiceButton}>
              <Image source={require('../../assets/images/button_rock.png')} style={styles.choiceImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => playGame("Paper")} style={styles.choiceButton}>
              <Image source={require('../../assets/images/button_paper.png')} style={styles.choiceImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => playGame("Scissors")} style={styles.choiceButton}>
              <Image source={require('../../assets/images/button_scissors.png')} style={styles.choiceImage} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={displayResult} style={styles.resultButton}>
            <Image source={require('../../assets/images/button_result_active.png')} style={styles.resultButtonImage} resizeMode="contain" />
          </TouchableOpacity>
        {showResult && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>You: {userChoice}</Text>
            <Text style={styles.resultText}>Bot: {botChoice}</Text>
            <Text style={styles.resultText}>Result: {result}</Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { 
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    padding: 20 
  },
  buttonContainer: { 
    flexDirection: "row", 
    justifyContent: "space-around",
    width: '100%',
    paddingHorizontal: 50,
    marginBottom: 20,
  },
  choiceButton: { 
    marginHorizontal: 10,
  },
  choiceImage: {
    width: 80, 
    height: 80, 
  },
  resultButton: { 
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  resultButtonImage: { 
    width: 348,
    height: 65.5,
  },
  resultContainer: { 
    marginTop: 20,
    alignItems: "center",
  },
  resultText: { 
    fontSize: 20, 
    fontWeight: "bold",
    marginTop: 10 
  },
});

export default GameScreen;
