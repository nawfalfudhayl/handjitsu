import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { Link, useRouter } from "expo-router"; 
import { z } from "zod";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Must be 6 or more characters long" }),
});

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMsg, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const router = useRouter();

  const handleInputChange = (key, value) => {
    setForm({ ...form, [key]: value });
    try {
      LoginSchema.pick({ [key]: true }).parse({ [key]: value });
      setErrors((prev) => ({ ...prev, [key]: "" }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [key]: err.errors[0].message }));
    }
  };

  const handleSubmit = async () => {
    try {
      LoginSchema.parse(form);

      const res = await axios.post(
        "https://walled-api-two.vercel.app/auth/login",
        form
      );
      await AsyncStorage.setItem("token", res.data.data.token);

      if (res.status === 200) {
        router.replace("/home"); // Arahkan ke halaman home setelah login berhasil
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          setServerError(err.response.data.message || "An error occurred");
        } else if (err.request) {
          setServerError("Network error. Please try again later.");
          console.error("Network Error:", err.request);
        } else {
          setServerError("An unexpected error occurred.");
          console.error("Request Setup Error:", err.message);
        }
      } else if (err?.errors) {
        const errors = {};
        err.errors.forEach((item) => {
          const key = item.path[0];
          errors[key] = item.message;
        });
        setErrors(errors);
      } else {
        setServerError("An unknown error occurred.");
        console.error("Unhandled Error:", err);
      }
    }
  };

  return (
    <View style={styles.container}>
      {serverError && <Text>{serverError}</Text>}
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="stretch"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        onChangeText={(text) => handleInputChange("email", text)}
      />
      {errorMsg.email ? (
        <Text style={styles.errorMsg}>{errorMsg.email}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry={true}
        onChangeText={(text) => handleInputChange("password", text)}
      />
      {errorMsg.password ? (
        <Text style={styles.errorMsg}>{errorMsg.password}</Text>
      ) : null}
      <View style={styles.LoginPage}>
        <TouchableOpacity onPress={handleSubmit}>
          <Image 
            source={require('../assets/images/button_login.png')} 
            style={styles.button}
            resizeMode="stretch"
          />
        </TouchableOpacity>
        <Text style={styles.linkText}>
          Don’t have an account?
          <Link href="/register" style={styles.link}>
            {" "}
            Register here
          </Link>
        </Text>
        <StatusBar style="auto" hidden />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  logo: {
    width: 313,
    height: 92,
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
  },
  link: {
    color: "#19918F",
  },
  errorMsg: {
    color: "red",
    fontSize: 12,
    width: "100%",
    textAlign: "left",
    marginBottom: 10,
    marginTop: -5,
  },
  LoginPage: {
    marginTop: 0,
  },
  button: {
    width: 348,
    height: 65.5,
  }
});
