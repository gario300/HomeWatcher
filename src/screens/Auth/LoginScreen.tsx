import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LoginStyles } from "./AuthStyles";
import { Button, TextInput, Layout, useTheme } from 'react-native-rapi-ui';
import StylesVariables from "../../shared/Styles/app.style";
import { RENDER_MESSAGE } from "../../redux/constants";
import {
  signInWithEmailAndPassword,
  getAuth
} from 'firebase/auth';
import { useDispatch   } from "react-redux";
import Loading from "../../components/LoadingModal"

interface propTypes {
  navigation: {
    navigate: (screen: string) => void
  };
}

interface credentialsTypes {
  email: string;
  password: string;
}

const LoginScreen = ({ navigation } : propTypes ) => { 
  const [credentials, setCredentials] = useState<credentialsTypes>({
    email: '',
    password:''
  });
  const [loadin, setLoading] = useState(false);
  
  const dispach = useDispatch()
  const changeCred = (key:string, value:string) => {
    setCredentials({
      ...credentials,
      [key] : value
    })
  }

  const sendLogin = async(loginType:string) => {
    const auth = getAuth()
    setLoading(true)
    switch(loginType){
      case 'email':
        try {
          await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
        } catch (e : any ) {
          dispach({ message: { show: true, message: e.message, status: 'N' }, type: RENDER_MESSAGE })
        } 
      break;
    }
    setLoading(false)
  }

  return (
    <Layout>
      <Loading
        show={loadin} 
      />
      <View
        style={LoginStyles.headerSpace}
      >
      </View>
      <View
        style={ LoginStyles.bodySpace }
      >
        <View
          style={ LoginStyles.label }
        >
          <Text
            style={LoginStyles.labelText}
          >
            Correo Electronico
          </Text>
          <TextInput
            value={credentials.email}
            onChangeText={(value) => { changeCred('email', value)}}
          />
        </View>
        <View
          style={LoginStyles.label}
        >
          <Text
            style={LoginStyles.labelText}
          >
            Contraseña
          </Text>
          <TextInput
            value={credentials.password}
            onChangeText={(value) => { changeCred('password', value)}}
            secureTextEntry={true}
          />
        </View>
        <View
          style={{ marginVertical: 16 * StylesVariables.responsiveHeightMulti}}
        >
          <Button
            text={'Acceder'}
            onPress={()=> {
              sendLogin('email')
            }}
          />
        </View>
        <View
          style={[LoginStyles.label, { width: '100%', alignItems: 'center' }]}
        >
          <Text
            style={LoginStyles.registerLabels}
          >
            ¿Aún no tienes una cuenta?
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Register')
            }}
          >
            <Text
              style={[LoginStyles.registerLabels, { color: 'skyblue', textDecorationLine: 'underline', fontWeight: 'bold' }]}
            >
              Registrate
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default LoginScreen;

