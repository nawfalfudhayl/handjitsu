import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";

const choices = ["Scissors", "Rock", "Paper"];

const imagesUser = {
  Rock: require('../../assets/images/hand-gesture-rock-yellow.png'),
  Paper: require('../../assets/images/hand-gesture-paper-yellow.png'),
  Scissors: require('../../assets/images/hand-gesture-scissors-yellow.png'),
};

const imagesBot = {
  Rock: require('../../assets/images/hand-gesture-rock.png'),
  Paper: require('../../assets/images/hand-gesture-paper.png'),
  Scissors: require('../../assets/images/hand-gesture-scissors.png'),
};

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

  const playGame = (choice) => {
    setUserChoice(choice);
    setBotChoice("");
    setShowResult(false);
  };

  const displayResult = () => {
    const botRandomChoice = choices[Math.floor(Math.random() * choices.length)];
    setBotChoice(botRandomChoice);
    setResult(getResult(userChoice, botChoice));
    setShowResult(true);
  };

  return (
    <ImageBackground source={require('../../assets/images/spaceroom_bg.png')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.handsContainer}>
          <Image source={botChoice ? imagesBot[botChoice] : null} style={styles.botHand} resizeMode="contain" />
        </View>
        <View style={styles.handsContainer}>
          <Image source={userChoice ? imagesUser[userChoice] : null} style={styles.userHand} resizeMode="contain" />
        </View>
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
    justifyContent: "space-between", 
    alignItems: "center",
    paddingVertical: 20,
  },
  handsContainer: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
  },
  botHand: {
    width: 141,
    height: 189.38,
    transform: [{ rotate: "180deg" }],
  },
  userHand: {
    width: 141,
    height: 189.38,
  },
  buttonContainer: { 
    flexDirection: "row", 
    justifyContent: "space-around",
    marginBottom: 10,
  },
  choiceButton: { 
    marginHorizontal: 15,
  },
  choiceImage: {
    width: 90, 
    height: 90, 
  },
  resultButton: { 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  resultButtonImage: { 
    width: 348,
    height: 65.5,
  },
  resultContainer: { 
    alignItems: "center",
  },
  resultText: { 
    fontSize: 20, 
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default GameScreen;
