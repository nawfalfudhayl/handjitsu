import { StatusBar } from 'expo-status-bar';
import {
   StyleSheet,
    Text, 
    View,
    TextInput,
   TouchableOpacity, 
   Image } from 'react-native';
import Button from "./components/Button";
import Input from "./components/Input";
import Axios from 'axios';
export default function App() {
  return (
    <View style={styles.container}>
      <TouchableOpacity> <Image source={require('./assets/logo.png')} style={styles.logo} /></TouchableOpacity>
      <HelloWorld name="Fajar Krisna Jssaya"/>
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        placeholderTextColor="#aaa" 
        />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        placeholderTextColor="#aaa" 
        secureTextEntry={true} 
      />
      <Input text="Email" />
      <Button text="Login" bgcolor="#4DB6AC" />
      <StatusBar style="hidden"/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    resizeMode:'stretch',
  },
  logo: {
    // width: 100,
    //height: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4DB6AC',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',

  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
