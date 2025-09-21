import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../../common/Header';

//import AsyncStorage from '@react-native-async-storage/async-storage';

import { auth } from '../../firebase/firebaseConfig';
import {useNavigation} from '@react-navigation/native';

const User = () => {
  const navigation = useNavigation();
  
  /*const logout = async () => {
    await AsyncStorage.removeItem('IS_USER_LOGGED_IN');
    navigation.navigate('Login');
  };*/

  const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.log(error);
  }
};

  return (
    <View style={styles.container}>
      <Header title={'Profile'} />
      <Image
        source={require('../../images/default_user.png')}
        style={styles.user}
      />
      <Text style={styles.name}>{'Sergio Moncada'}</Text>
      <Text style={[styles.name, {fontSize: 16, marginTop: 0}]}>
        {'sergiogmoncada@yahoo.com'}
      </Text>
      <TouchableOpacity style={[styles.tab, {marginTop: 40}]}>
        <Text style={styles.txt}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, {marginTop: 10}]}
        onPress={() => {
          navigation.navigate('Orders');
        }}>
        <Text style={styles.txt}>Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, {marginTop: 10}]}>
        <Text style={styles.txt}>Address</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, {marginTop: 10}]}>
        <Text style={styles.txt}>Payment Methods</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, {marginTop: 10}]}
        onPress={() => {
          logout();
        }}>
        <Text style={styles.txtLogOut}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default User;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  user: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 50,
  },
  name: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  tab: {
    width: '90%',
    height: 50,
    borderBottomWidth: 0.3,
    alignSelf: 'center',
    borderBottomColor: '#DBDBDB',
    paddingLeft: 20,
    justifyContent: 'center',
  },
  
  txtLogOut: {
    color: 'red',
    fontSize:30
  },
  txt: {
    color: 'black',

  },
});
