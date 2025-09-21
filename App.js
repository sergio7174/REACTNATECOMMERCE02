// file: App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './src/screens/Auth/Login';
import Signup from './src/screens/Auth/Signup';
import { auth } from './src/firebase/firebaseConfig'; // Assuming you have your firebase config set up 
// import components screen
import Main from './src/screens/Mains';
import ProductDetail from './src/screens/ProductDetail';
import Cart from './src/screens/Cart';
import Checkout from './src/screens/Checkout';
import Addresses from './src/screens/Addresses';
import AddAddress from './src/screens/AddAddress';
import OrderSuccess from './src/screens/OrderSuccess';
import Orders from './src/screens/Orders';

// import the store

import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
    });
    return unsubscribe;
  }, []);

    return (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        {/* Login and Signup Screens */}
          {!isAuthenticated && (
           <>
             <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
             <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
           </>
          )}
        {/* Main App Screens with Bottom Tabs */}
      {isAuthenticated && (
        <>
          <Stack.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
          />
          <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{headerShown: false}}
          />
          <Stack.Screen
          name="Cart"
          component={Cart}
          options={{headerShown: false}}
          />
          <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{headerShown: false}}
          />
          <Stack.Screen
          name="Addresses"
          component={Addresses}
          options={{headerShown: false}}
          />
        <Stack.Screen
          name="AddAddress"
          component={AddAddress}
          options={{headerShown: false}}
          />
          <Stack.Screen
          name="Orders"
          component={Orders}
          options={{headerShown: false}}
          />
          <Stack.Screen
          name="OrderSuccess"
          component={OrderSuccess}
          options={{headerShown: false}}
          />

        </>
      )}  

      </Stack.Navigator>
    </NavigationContainer>
   </Provider> 
    );
}