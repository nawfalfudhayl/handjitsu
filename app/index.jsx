import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const choices = ['Gunting', 'Batu', 'Kertas'];

const getResult = (userChoice, botChoice) => {
  if (userChoice === botChoice) return 'Seri';
  if (
    (userChoice === 'Gunting' && botChoice === 'Kertas') ||
    (userChoice === 'Batu' && botChoice === 'Gunting') ||
    (userChoice === 'Kertas' && botChoice === 'Batu')
  )
    return 'Menang';
  return 'Kalah';
};

const GameScreen = () => {
  const [userChoice, setUserChoice] = useState('');
  const [botChoice, setBotChoice] = useState('');
  const [result, setResult] = useState('');

  const playGame = (choice) => {
    const botRandomChoice = choices[Math.floor(Math.random() * choices.length)];
    setUserChoice(choice);
    setBotChoice(botRandomChoice);
    setResult(getResult(choice, botRandomChoice));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Permainan Gunting, Batu, Kertas</Text>
      <View style={styles.buttonContainer}>
        {choices.map((choice) => (
          <Button key={choice} title={choice} onPress={() => playGame(choice)} />
        ))}
      </View>
      {userChoice !== '' && (
        <View style={styles.resultContainer}>
          <Text>Kamu: {userChoice}</Text>
          <Text>Bot: {botChoice}</Text>
          <Text style={styles.result}>Hasil: {result}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around' },
  resultContainer: { marginTop: 30, alignItems: 'center' },
  result: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },
});

export default GameScreen;
