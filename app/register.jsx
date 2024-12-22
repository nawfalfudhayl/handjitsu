import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Link } from 'expo-router';
import { z } from 'zod';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [form, setForm] = useState({});
  const [errorMsg, setErrors] = useState({});
  const [fullname, setFullname] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const RegisterSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(3, { message: "Must be 8 or more characters long" }),
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

  // Fungsi untuk mengirim data registrasi ke API
  const handleRegister = async () => {
    if (isRegistering) return; // Mencegah multiple request
    setIsRegistering(true);
    
    if (!fullname || !username || !form.email || !form.password) {
      Alert.alert("Error", "Semua kolom harus diisi dan Anda harus menyetujui syarat & ketentuan.");
      setIsRegistering(false);
      return;
    }

    try {
      const response = await axios.post("https://walled-api-sigma.vercel.app/auth/register", {
        username: username,
        email: form.email,
        fullname: fullname,
        password: form.password
      });

      Alert.alert("Sukses", "Pendaftaran berhasil! Silakan login.");
      router.replace("/"); // Arahkan ke halaman login
    } catch (error) {
      if (error.response) {
        Alert.alert("Gagal", `Pendaftaran gagal: ${error.response.data.message}`);
      } else {
        Alert.alert("Gagal", "Terjadi kesalahan jaringan. Silakan coba lagi.");
      }
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.image} />
      <View style={styles.inputContainer}>
        <Text style={{padding: 8}}>Fullname</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan Fullname Anda"
          value={fullname}
          onChangeText={(text) => setFullname(text)}
        />
        <Text style={{padding: 8}}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan Username Anda"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <Text style={{padding: 8}}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="contoh@gmail.com"
          value={form.email}
          keyboardType="email-address"
          onChangeText={(text) => handleInputChange("email", text)}
        /> 
        {errorMsg.email ? <Text style={styles.errorMsg}>{errorMsg.email}</Text> : null}
        <Text style={{padding: 8}}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan Password Anda"
          value={form.password}
          secureTextEntry={true}
          onChangeText={(text) => handleInputChange("password", text)}
        /> 
        {errorMsg.password ? <Text style={styles.errorMsg}>{errorMsg.password}</Text> : null}
      </View>
      <View style={styles.register}>
        <TouchableOpacity onPress={handleRegister}>
          <Image source={require('../assets/images/Button.png')} />
        </TouchableOpacity>
        <View style={styles.registerContainer}>
          <Text>Already have an account? </Text>
          <Link href="/" style={styles.loginText}>Login here</Link>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FAFAFA',
  },
  inputContainer:{
    width: 384,
    height: 284,
    padding: 16,
    maxWidth: '100%'
  },
  registerContainer:{
    flexDirection: 'row',
    justifyContent: 'center'
  },
  register:{
    marginTop: 200
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
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    width: 348,
    padding: 15,
    backgroundColor: '#6200ee',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  loginText: {
    color: '#6200ee',
    fontSize: 14,
  },
  errorMsg: {
    color: 'red',
    fontSize: 12,
  },
});

export default RegisterScreen;
