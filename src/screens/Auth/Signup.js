import { KeyboardAvoidingView, StyleSheet, Text, TextInput,ImageBackground, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase/firebaseConfig';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';
import {Image} from 'react-native'
 
const Signup = () => {
    
  const [username ,setUsername]= useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
 
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, [navigation]);
 
  const handleSignUp = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with", user.email);
      })
      .catch(error => alert(error.message));
  }
 
//   const handleLogin = () => {
//     const auth = getAuth();
//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredentials) => {
//         const user = userCredentials.user;
//         console.log("Logged in with", user.email);
//       })
//       .catch(error => alert(error.message));
//   }
 
  return (
    <ImageBackground source={require('../../assets/bg.jpg')} style={styles.container}>
 
    <KeyboardAvoidingView
      behavior="padding" //option that won't let the keyboard cover the email and password text view
      style={styles.inner}
    >
      <View style={styles.inputContainer}>
      <Image
        style={styles.tinyLogo}
        source={require('../../assets/blue.png')}
      />
      <TextInput
          placeholder="Username"
          value={username}
          onChangeText={text => setUsername(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
         
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
        />
      </View>
 
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button]}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.signupButton}
        >
          <Text style={styles.signupButtonText}>Already have an account ?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    </ImageBackground>
  );
}
 
export default Signup;
 
const styles = StyleSheet.create({
  tinyLogo:{
    width:"60%",
    height:"40%",
    marginLeft:60,
   
   
    marginBottom:7
  },
  container: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    width: '88%',
    justifyContent: 'center',
    alignItems: 'center',
   
    borderRadius:10,
    backgroundColor:"white",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  inputContainer: {
    marginTop:10,
    marginBottom:10,
   
    width: '80%',
    borderColor:'#6F6F6F'
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: 'white', // White border
    margin:3,
    backgroundColor: "#F3F3F3"
  },
  button: {
    backgroundColor: 'greeen',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#F9F9F9', // White border
  },
  buttonText: {
    color: 'green',
    fontWeight: '700',
    fontSize: 16,
  },
  signupButton: {
    marginBottom: 10,
  },
  signupButtonText: {
    color: '#424242',
    fontSize: 14,
    marginBottom:10
  },
});