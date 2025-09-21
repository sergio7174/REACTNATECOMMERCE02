// file: App.js
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ContactScreen from './src/components/ContactScreen';
import HomeScreen from './src/components/HomeScreen';
import AboutScreen from './src/components/AboutScreen';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Home">
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                />
                <Tab.Screen
                    name="About"
                    component={AboutScreen}
                />
                <Tab.Screen
                    name="Contact"
                    component={ContactScreen}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}