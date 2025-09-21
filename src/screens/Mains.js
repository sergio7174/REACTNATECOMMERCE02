import { createDrawerNavigator } from '@react-navigation/drawer';
import Homescreen from './HomeScreen';

const Drawer = createDrawerNavigator() ;
const Main = () => {
  return (
   <Drawer.Navigator>
      <Drawer.Screen  name='Homescreen' component={Homescreen} options={{headerShown:false}}/>
   </Drawer.Navigator>
  )
}


export default Main