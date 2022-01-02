import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from "./config/AuthProvider";
import Loading from "./components/Loading"
import { useSelector, useDispatch } from 'react-redux'
import { renderAndChange } from './redux/actions/renderMessage';
import Modal from "./components/Modal"
import { RENDER_MESSAGE, ALTER_USER_DATA } from "./redux/constants";
import {View} from "react-native";
import { RootState } from "./redux/store";
import {
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth';
// auth screens
import LoginScreen from "./screens/Auth/LoginScreen"
import RegisterScreen from './screens/Auth/Register'

// home Screens
import HomeScreen from "./screens/Home/HomeScreen"
const AuthStack = createStackNavigator();
const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen component={LoginScreen} name={'Login'} />
      <AuthStack.Screen component={RegisterScreen} name={'Register'} />
    </AuthStack.Navigator>
  );
};

const TravelStack = createStackNavigator();
const Travel = () => {
  return (
    <TravelStack.Navigator
      screenOptions={{
        headerTitle:"",
        headerStyle:{
          backgroundColor:"black"
        },
        
        headerLeft:()=><Ionicons name="menu-outline" 
        size={30} 
        style={{marginLeft:6}}
        color="#45c7e8" />,

        headerRight:()=> <Ionicons name="notifications-outline" style={{marginRight:6}} size={30} color="#45c7e8" />
      }}
    >
      </TravelStack.Navigator>
  );
};


const MainStack = createStackNavigator();
const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="Home" component={HomeScreen} />
    </MainStack.Navigator>
  );
};



interface messageTypes {
  show: boolean,
  message: string,
  status: string
}
export default () => { 
  const { message } = useSelector<messageTypes, RootState>(( state ) => ({ message: renderAndChange(state) })) 
  const [user, setUser] = useState<any>(false);
  const dispach = useDispatch()
  useEffect(() => {
    checkLogin()
  }, []);
  
  const checkLogin = async() => {
    const auth = getAuth()
    onAuthStateChanged(auth, u => {
      if (u) {
        dispach({ user: { email: u.email, uid:  u.uid}, type: ALTER_USER_DATA }) 
        setUser(u)
      }
    })
	}

  const closeMessage = () => { 
    dispach({ 
      message: { 
        show: false, 
        message: message.message.message.message , 
        status: message.message.message.status
      }, 
      type: RENDER_MESSAGE 
    })
  }

  return (
    <View
      style={{ flex: 1}}
    >
      <NavigationContainer>    
        {user == false && <Loading />}
        {user == null && <Auth />}
        {user !== null && <Main />} 
      </NavigationContainer>
      <Modal
        isVisible={message.message.message.show}
        type={message.message.message.status}
        message={message.message.message.message}
        buttons={[
          {
            action: () => {closeMessage()},
            text: 'Aceptar',
            backgroundColor: '#63CD6D',
            textColor: 'white'
          }
        ]}
      />
    </View>
  );
};
