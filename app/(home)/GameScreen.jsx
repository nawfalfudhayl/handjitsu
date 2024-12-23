import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { ImageBackground } from 'react-native';

const GameScreen = () => {
  const [loading, setLoading] = useState(true);
  const [roomId, setRoomId] = useState(null);
  const [gameId, setGameId] = useState(null); // Define gameId state
  const [showResult, setShowResult] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const createRoom = async () => {
      try {
        console.log("Creating room...");
        const response = await axios.post("https://handjitsu-api.vercel.app/games/singleplayer", {
          Player1ID: 1,
          link_room: "room123"
        });
        console.log("Room creation response:", response.data);
        if (response.data && response.data.room_id) {
          setRoomId(response.data.room_id);
          setGameId(response.data.GameID); // Save GameID
          console.log("Room ID set:", response.data.room_id);
          console.log("Game ID set:", response.data.GameID);
        } else {
          console.error("Room ID not found in response");
        }
      } catch (error) {
        console.error("Error creating room:", error);
      } finally {
        setLoading(false);
      }
    };

    createRoom();
  }, []);

  const playGame = async (choice) => {
    if (!gameId) {
      console.error("Game ID is not set");
      return;
    }

    try {
      console.log(`Playing game with choice: ${choice}`);
      const response = await axios.post(`https://handjitsu-api.vercel.app/games/${gameId}`, {
        choice: choice
      });
      console.log("Game play response:", response.data);
      // Handle game play response here
    } catch (error) {
      console.error("Error playing game:", error);
    }
  };

  const displayResult = () => {
    setShowResult(true);
    // Add result display logic here
  };

  return (
    <ImageBackground source={require('../../assets/images/spaceroom_bg.png')} style={styles.background}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : (
          <>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => playGame("Rock")} style={styles.choiceButton} disabled={!roomId}>
                <Image source={require('../../assets/images/button_rock.png')} style={styles.choiceImage} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => playGame("Paper")} style={styles.choiceButton} disabled={!roomId}>
                <Image source={require('../../assets/images/button_paper.png')} style={styles.choiceImage} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => playGame("Scissors")} style={styles.choiceButton} disabled={!roomId}>
                <Image source={require('../../assets/images/button_scissors.png')} style={styles.choiceImage} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={displayResult} style={styles.resultButton}>
              <Image source={require('../../assets/images/button_result_active.png')} style={styles.resultButtonImage} resizeMode="contain" />
            </TouchableOpacity>
            {showResult && (
              <View style={styles.resultContainer}>
                {/* Add result display component here */}
              </View>
            )}
          </>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = {
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  choiceButton: {
    padding: 10,
  },
  choiceImage: {
    width: 50,
    height: 50,
  },
  resultButton: {
    marginTop: 20,
  },
  resultButtonImage: {
    width: 100,
    height: 50,
  },
  resultContainer: {
    marginTop: 20,
  },
};

export default GameScreen;