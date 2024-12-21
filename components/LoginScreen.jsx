import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi! Welcome</Text>
      <TextInput style={styles.input} placeholder="Email Address" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <Button
        title="Log In"
        onPress={() => navigation.navigate("ChoosePlayers")}
      />
      <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  link: { color: "blue", marginTop: 10 },
});
