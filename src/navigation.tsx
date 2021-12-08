import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from "./config/AuthProvider";
import Loading from "./components/Loading"

// screens
import LoginScreen from "./screens/Auth/LoginScreen"
const AuthStack = createStackNavigator();
const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen component={LoginScreen} name={'Login'} />
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
    </MainStack.Navigator>
  );
};



export default () => {  
  const auth : boolean = useContext(AuthContext);
  const user = auth;
  return (
    <NavigationContainer>
      
      {user == null && <Loading />}
      {user == false && <Auth />}
      {user == true && <Main />}
     
    </NavigationContainer>
  );
};
