import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const choices = ["scissors", "rock", "paper"];

const imagesUser = {
  rock: require("../../assets/images/hand-gesture-rock-yellow.png"),
  paper: require("../../assets/images/hand-gesture-paper-yellow.png"),
  scissors: require("../../assets/images/hand-gesture-scissors-yellow.png"),
};

const imagesBot = {
  rock: require("../../assets/images/hand-gesture-rock.png"),
  paper: require("../../assets/images/hand-gesture-paper.png"),
  scissors: require("../../assets/images/hand-gesture-scissors.png"),
};

const fetchPlayerProfile = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      "https://handjitsu-api.vercel.app/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Fetched Player Profile:", response.data);
    return response.data.data.id;
  } catch (error) {
    console.error("Error fetching player profile:", error);
    return null;
  }
};

const createGameRoom = async (player1ID) => {
  try {
    console.log("Creating game room with Player1ID:", player1ID);
    const response = await axios.post(
      "https://handjitsu-api.vercel.app/games/singleplayer",
      {
        Player1ID: player1ID,
      }
    );
    console.log("Game room created:", response.data);
    return response.data.data.GameID;
  } catch (error) {
    console.error("Error creating game room:", error);
    return null;
  }
};

const sendUserChoice = async (gameID, choice) => {
  try {
    console.log(`Sending user choice: ${choice} for gameID: ${gameID}`);
    const response = await axios.put(
      `https://handjitsu-api.vercel.app/games/${gameID}`,
      { Player1_choice: choice },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("API Response Data:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error connecting to API:", error);
    console.error(
      "Error details:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};

const GameScreen = () => {
  const [gameID, setGameID] = useState(null);
  const [player1ID, setPlayer1ID] = useState(null);
  const [userChoice, setUserChoice] = useState("");
  const [botChoice, setBotChoice] = useState("");
  const [result, setResult] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loseModalVisible, setLoseModalVisible] = useState(false);
  const [winModalVisible, setWinModalVisible] = useState(false);
  const [drawModalVisible, setDrawModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const initializeGame = async () => {
    try {
      const player1ID = await fetchPlayerProfile();
      if (player1ID) {
        setPlayer1ID(player1ID);
        const gameID = await createGameRoom(player1ID);
        setGameID(gameID);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error initializing game:", error);
    }
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const playGame = async (choice) => {
    if (!gameID) {
      console.error("Game not initialized yet");
      return;
    }

    setUserChoice(choice);
    setIsLoading(true);

    try {
      const apiResponse = await sendUserChoice(gameID, choice);
      if (apiResponse) {
        const { Player2_choice, WinnerID } = apiResponse;
        setBotChoice(Player2_choice);
        const gameResult =
          parseInt(WinnerID) === parseInt(player1ID)
            ? "Win"
            : parseInt(WinnerID) === 0
            ? "Draw"
            : "Lose";
        setResult(gameResult);

        setTimeout(() => {
          setShowResult(true);
          if (gameResult === "Lose") {
            setLoseModalVisible(true);
          } else if (gameResult === "Win") {
            setWinModalVisible(true);
          } else if (gameResult === "Draw") {
            setDrawModalVisible(true);
          }
        }, 2000);
      }
    } catch (error) {
      console.error("Error playing game:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/spaceroom_bg.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => router.push("/(home)")}
          style={styles.backButton}
        >
          <Image
            source={require("../../assets/images/back_arrow.png")}
            style={styles.backButtonImage}
          />
        </TouchableOpacity>
        <View style={styles.handsContainer}>
          <Image
            source={botChoice ? imagesBot[botChoice] : null}
            style={styles.botHand}
            resizeMode="contain"
          />
        </View>
        <View style={styles.handsContainer}>
          {userChoice ? (
            <Image
              source={imagesUser[userChoice]}
              style={styles.userHand}
              resizeMode="contain"
            />
          ) : (
            <Text></Text>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => playGame("rock")}
            style={styles.choiceButton}
            disabled={isLoading || !gameID}
          >
            <Image
              source={require("../../assets/images/button_rock.png")}
              style={styles.choiceImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => playGame("paper")}
            style={styles.choiceButton}
            disabled={isLoading || !gameID}
          >
            <Image
              source={require("../../assets/images/button_paper.png")}
              style={styles.choiceImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => playGame("scissors")}
            style={styles.choiceButton}
            disabled={isLoading || !gameID}
          >
            <Image
              source={require("../../assets/images/button_scissors.png")}
              style={styles.choiceImage}
            />
          </TouchableOpacity>
        </View>

        {showResult && (
          <View style={styles.resultContainer}>
            <Text>{result}</Text>
          </View>
        )}

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
                onPress={async () => {
                  setLoseModalVisible(!loseModalVisible);
                  setShowResult(false);
                  setUserChoice("");
                  setBotChoice("");
                  await initializeGame();
                }}
              >
                <Image
                  source={require("../../assets/images/button_tryagain.png")}
                  style={styles.buttonImageLarge}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setLoseModalVisible(!loseModalVisible);
                  setShowResult(false);
                  setUserChoice("");
                  setBotChoice("");
                  router.push("/(home)");
                }}
              >
                <Image
                  source={require("../../assets/images/button_mainmenu.png")}
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
                onPress={async () => {
                  setWinModalVisible(!winModalVisible);
                  setShowResult(false);
                  setUserChoice("");
                  setBotChoice("");
                  await initializeGame();
                }}
              >
                <Image
                  source={require("../../assets/images/button_tryagain.png")}
                  style={styles.buttonImageLarge}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setWinModalVisible(!winModalVisible);
                  setShowResult(false);
                  setUserChoice("");
                  setBotChoice("");
                  router.push("/(home)");
                }}
              >
                <Image
                  source={require("../../assets/images/button_mainmenu.png")}
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
                onPress={async () => {
                  setDrawModalVisible(!drawModalVisible);
                  setShowResult(false);
                  setUserChoice("");
                  setBotChoice("");
                  await initializeGame();
                }}
              >
                <Image
                  source={require("../../assets/images/button_tryagain.png")}
                  style={styles.buttonImageLarge}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setDrawModalVisible(!drawModalVisible);
                  setShowResult(false);
                  setUserChoice("");
                  setBotChoice("");
                  router.push("/(home)");
                }}
              >
                <Image
                  source={require("../../assets/images/button_mainmenu.png")}
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
  backButton: {
    position: "absolute",
    top: 64,
    left: 10,
  },
  backButtonImage: {
    width: 36,
    height: 36,
    resizeMode: "contain",
  },
});

export default GameScreen;
