import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  /*
TouchableOpacity is a core component in React Native used to create touchable elements that provide visual feedback to the user. When a user presses down on a TouchableOpacity, the opacity of the wrapped content is temporarily reduced, creating a dimming effect that signifies interaction.*/

  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../common/Header';
import {useNavigation} from '@react-navigation/native';
import {
  addItemToCart,
  reduceItemFromCart,
  removeItemFromCart,
} from '../redux/slices/CartSlice';
import CheckoutLayout from '../common/CheckoutLayout';
import { SafeAreaView } from 'react-native-safe-area-context';

const Cart = () => {

  const items = useSelector(state => state.cart);
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    setCartItems(items.data);
  }, [items]);

  const getTotal = () => {
    let total = 0;
    cartItems.map(item => {
      total = total + item.qty * item.price;
    });
    return total.toFixed(0);
  };
  return (
    <>
    <SafeAreaView style={styles.container}>
      <Header
        title={'Cart Items'}
        leftIcon={require('../images/back.png')}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        data={cartItems}
        renderItem={({item, index}) => {
           
          return (
             <>
             {/*** Product Image button to see the product Details */}
            <TouchableOpacity
              activeOpacity={1}
              style={styles.productItem}
              onPress={() => {
                navigation.navigate('ProductDetail', {data: item});
              }}>
              <Image source={{uri: item.image}} style={styles.itemImage} />
              <View>
                <Text style={styles.name}>
                  {item.title.length > 25
                    ? item.title.substring(0, 25) + '...'
                    : item.title}
                </Text>
                <Text style={styles.desc}>
                  {item.description.length > 30
                    ? item.description.substring(0, 30) + '...'
                    : item.description}
                </Text>
                <View style={styles.qtyview}>
                  <Text style={styles.price}>{'$' + item.price}</Text>
                  {/*** Button - to remove items of the cart */}
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                      if (item.qty > 1) {
                        dispatch(reduceItemFromCart(item));
                      } else {
                        dispatch(removeItemFromCart(index));
                      }
                    }}>
                    <Text style={{fontSize: 18, fontWeight: '600'}}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qty}>{item.qty}</Text>
                  {/*** Button + to add items to the cart */}
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                      dispatch(addItemToCart(item));
                    }}>
                    <Text style={{fontSize: 18, fontWeight: '600'}}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
            </>
          );
        }}
      />
      {cartItems.length < 1 && (
        <View style={styles.noItems}>
          <Text>No Items in Cart</Text>
        </View>
      )}
      {/*** CheckoutLayout component to show the total items and total price */}
      {cartItems.length > 0 && (
        
        <CheckoutLayout items={cartItems.length} total={getTotal()} />
      )}
    </SafeAreaView>
    </>
  );
};

export default Cart;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff',
  },
  productItem: {
    width: Dimensions.get('window').width,
    height: 100,
    marginTop: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
  },
  desc: {
    marginLeft: 20,
  },
  price: {
    color: 'green',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 5,
  },
  qtyview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  btn: {
    padding: 5,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
    marginLeft: 10,
  },
  qty: {
    marginLeft: 10,
    fontSize: 18,
  },
  noItems: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
