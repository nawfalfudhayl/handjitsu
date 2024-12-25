import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground, Modal } from "react-native";
import { router, useRouter } from "expo-router";
import axios from "axios";

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

const sendUserChoice = async (choice) => {
  try {
    const response = await axios.put(
      "https://handjitsu-api.vercel.app/games/16",
      { Player1_choice: choice },
      {
        headers: {
          "Content-Type":"application/json", 
        },
      }
    );

    console.log("API Response:", response.data);
    return response.data;
  } catch (error){
      console.error("error connecting to API:", error);
      return null;
    }
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
    const [loseModalVisible, setLoseModalVisible] = useState(false);
    const [winModalVisible, setWinModalVisible] = useState(false);
    const [drawModalVisible, setDrawModalVisible] = useState(false);
    const router = useRouter();

  const playGame = async (choice) => {
    setUserChoice(choice);

    try {
      const apiResponse = await sendUserChoice(choice);

      if (apiResponse){
        const Player1_choice = apiResponse.Player1_choice;
        setBotChoice("Waiting for bot response...");
        setResult(`Player 1 chose: ${Player1_choice}`);
        setShowResult(true);
      }
    } catch (error) {
      console.error("Error in playgame:", error);
    }
  };

  const displayResult = () => {
    const botRandomChoice = choices[Math.floor(Math.random() * choices.length)];
    setBotChoice(botRandomChoice);
    const gameResult = getResult(userChoice, botRandomChoice);
    setResult(gameResult);
    setShowResult(true);
    if (gameResult === "Lose") {
      setLoseModalVisible(true);
    } else if (gameResult === "Win") {
      setWinModalVisible(true);
    } else if (gameResult === "Draw"){
      setDrawModalVisible(true);
    }
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

        <TouchableOpacity
           onPress={userChoice ? displayResult : null}
          style={styles.resultButton}
           >
            <Image
                source={
                 userChoice
                    ? require("../../assets/images/button_result_active.png")
                    : require("../../assets/images/button_result_disabled.png")
                }
              style={styles.resultButtonImage}
            />
            </TouchableOpacity>

        {/* Lose Modal */}
        <Modal
        animationType="slide"
        transparent={true}
        visible={loseModalVisible}
        onRequestClose={() => {
          setLoseModalVisible(!loseModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Nice try! Let's see if you can beat it next time!
          </Text>
          <Image
            source={require("../../assets/images/emoji_lose.png")}
            style={styles.modalImage}
          />
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setLoseModalVisible(!loseModalVisible);
                setShowResult(false);
                setUserChoice("");
              }}
            >
              <Image
                source={require("../../assets/images/button_tryAgain.png")}
                style={styles.buttonImageLarge}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setLoseModalVisible(!loseModalVisible);
                setShowResult(false);
                setUserChoice("");
                router.push("/(home)");
              }}
            >
              <Image
                source={require("../../assets/images/button_mainMenu.png")}
                style={styles.buttonImageLarge}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
        
      {/* Win Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={winModalVisible}
        onRequestClose={() => {
          setWinModalVisible(!winModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Hooray! Victory is yours!</Text>
          <Image
            source={require("../../assets/images/emoji_win.png")}
            style={styles.modalImage}
          />
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setWinModalVisible(!winModalVisible);
                setShowResult(false);
                setUserChoice("");
              }}
            >
              <Image
                source={require("../../assets/images/button_tryAgain.png")}
                style={styles.buttonImageLarge}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setWinModalVisible(!winModalVisible);
                setShowResult(false);
                setUserChoice("");
                router.push("/(home)");
              }}
            >
              <Image
                source={require("../../assets/images/button_mainMenu.png")}
                style={styles.buttonImageLarge}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      {/* Draw Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={drawModalVisible}
        onRequestClose={() => {
          setDrawModalVisible(!drawModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Well, it's a draw!</Text>
          <Image
            source={require("../../assets/images/emoji_draw.png")}
            style={styles.modalImage}
          />
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setDrawModalVisible(!drawModalVisible);
                setShowResult(false);
                setUserChoice("");
              }}
            >
              <Image
                source={require("../../assets/images/button_tryAgain.png")}
                style={styles.buttonImageLarge}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setDrawModalVisible(!drawModalVisible);
                setShowResult(false);
                setUserChoice("");
                router.push("/(home)");
              }}
            >
              <Image
                source={require("../../assets/images/button_mainMenu.png")}
                style={styles.buttonImageLarge}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalView: {
    margin: 10,
    marginTop: 120,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
  },
  modalImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "120%",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
  },
  buttonImage: {
    width: "100%",
    height: 60,
    resizeMode: "contain",
  },
  buttonImageLarge: {
    width: "100%",
    height: 80,
    resizeMode: "contain",
  },
});

export default GameScreen;