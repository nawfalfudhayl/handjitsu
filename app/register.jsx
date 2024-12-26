import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { Link } from "expo-router";
import { z } from "zod";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [form, setForm] = useState({});
  const [errorMsg, setErrors] = useState({});
  const [isRegistering, setIsRegistering] = useState(false);

  const RegisterSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Must be 6 or more characters long" }),
  });

  const handleInputChange = (key, value) => {
    setForm({ ...form, [key]: value });
    try {
      RegisterSchema.pick({ [key]: true }).parse({ [key]: value });
      setErrors((prev) => ({ ...prev, [key]: "" }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [key]: err.errors[0].message }));
    }
  };

  const handleRegister = async () => {
    if (isRegistering) return;
    setIsRegistering(true);

    if (!username || !form.email || !form.password) {
      Alert.alert("Error", "Semua kolom harus diisi.");
      setIsRegistering(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://handjitsu-api.vercel.app/auth/register",
        {
          username: username,
          email: form.email,
          password: form.password,
        }
      );

      Alert.alert("Sukses", "Pendaftaran berhasil! Silakan login.");
      router.replace("/");
    } catch (error) {
      if (error.response) {
        Alert.alert("Gagal", `Pendaftaran gagal: ${error.response.data.error}`);
      } else {
        Alert.alert("Gagal", "Terjadi kesalahan jaringan. Silakan coba lagi.");
      }
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.image}
      />
      <View style={styles.inputContainer}>
        <Text style={{ padding: 8 }}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan Username Anda"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        {errorMsg.username ? (
          <Text style={styles.errorMsg}>{errorMsg.username}</Text>
        ) : null}
        <Text style={{ padding: 8 }}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="contoh@gmail.com"
          value={form.email}
          keyboardType="email-address"
          onChangeText={(text) => handleInputChange("email", text)}
        />
        {errorMsg.email ? (
          <Text style={styles.errorMsg}>{errorMsg.email}</Text>
        ) : null}
        <Text style={{ padding: 8 }}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan Password Anda"
          value={form.password}
          secureTextEntry={true}
          onChangeText={(text) => handleInputChange("password", text)}
        />
        {errorMsg.password ? (
          <Text style={styles.errorMsg}>{errorMsg.password}</Text>
        ) : null}
      </View>
      <View style={styles.register}>
        <TouchableOpacity onPress={handleRegister}>
          <Image
            source={require("../assets/images/button_register.png")}
            style={styles.buttonImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.registerContainer}>
          <Text>Already have an account? </Text>
          <Link href="/" style={styles.loginText}>
            Login here
          </Link>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FAFAFA",
  },
  inputContainer: {
    width: 360,
    padding: 16,
    maxWidth: "100%",
    marginRight: 35,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 16,
  },
  register: {
    marginTop: 0,
  },
  image: {
    width: 313,
    height: 92,
    marginBottom: 20,
  },
  input: {
    width: 348,
    height: 56,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonImage: {
    width: 348,
    height: 65.5,
  },
  loginText: {
    color: "#6200ee",
    fontSize: 14,
  },
  errorMsg: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});

export default RegisterScreen;
