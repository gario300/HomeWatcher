import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Button, TextInput, Layout, useTheme } from 'react-native-rapi-ui';
import { LoginStyles } from "./AuthStyles";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment"
import StylesVariables from '../../shared/Styles/app.style'
import Validator from '../../shared/utils/Validator'
import { RENDER_MESSAGE } from "../../redux/constants";
import { useDispatch   } from "react-redux";
import QueriyingClass from '../../shared/utils/queriyingClass'
import {
  getAuth,
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import Loading from "../../components/LoadingModal"
interface propTypes {
  navigation: {
    navigate: (screen: string) => void
  };
}
interface userFormTypes {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  [key : string] : string;
}


const RegisterScreen = ({ navigation } : propTypes) => {
  const [userForm, setUserForm] = useState<userFormTypes>({
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [birthday, setBirthday] = useState<Date>(new Date());  
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const dispach = useDispatch()
  const changeForm = (key : string, value:string) => {
    setUserForm({
      ...userForm,
      [key]: value
    })
  }

  const changeDateBirthDay = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowTimePicker(Platform.OS === 'ios');
    setBirthday(currentDate)
  }

  const registerUser = async() => {
    interface errorMessage {
      status: boolean,
      message: string | undefined
    }
    if (userForm.password !== userForm.confirmPassword) { 
      dispach({ message: { show: true, message: 'Las contraseñas no coinciden', status: 'N'}, type: RENDER_MESSAGE })
      return
    }
    if (userForm.password == userForm.confirmPassword) {
      for (const key in userForm) {  
        let validate
        validate = Validator.vNotVoid(key, userForm[key]) 
        if (!validate.status) {
          dispach({ message: { show: true, message: 'Ningun campo puede estar vacio', status: 'N'}, type: RENDER_MESSAGE }) 
          return
        }
        if (key == 'email') {
          validate = Validator.vEmail(userForm[key]) 
          if (!validate.status) {
            dispach({ message: { show: true, message: 'Porfavor introduzca una dirección de email valida', status: 'N'}, type: RENDER_MESSAGE }) 
            return
          }   
        }
        if (key == 'name' || key == 'lastName') {
          validate = Validator.vStringAlpha(key, userForm[key]) 
          if (!validate.status) {
            dispach({ message: { show: true, message: 'Nombre ni apellido pueden contener caracteresn especiales', status: 'N'}, type: RENDER_MESSAGE })
            return
          } 
        }
      } 
    }
    try {
      setLoading(true)
      const userData = {
        name: userForm.name,
        lastName: userForm.lastName,
        email: userForm.email,
        birthday: moment(birthday).format('DD/MM/YYYY'),
        rank: 'U'
      }
      const auth = getAuth()
      await createUserWithEmailAndPassword(auth, userForm.email, userForm.password)
      await QueriyingClass.addData('usersColection', userData)
      setLoading(false)
      dispach({ message: { 
        show: true, 
        message: 'Su cuenta ha sido registrada con exito, ahora puede acceder con su email y contraseña', 
        status: 'Y'
      }, type: RENDER_MESSAGE })
      navigation.navigate('Login')
    } catch (e:any) {
      console.log(e)
      setLoading(false)
      dispach({ message: { show: true, message: e.message, status: 'N'}, type: RENDER_MESSAGE })
    }
  }
  return (
    <Layout>
      <Loading
        show={loading} 
      />
      <View 
        style={LoginStyles.container}
      >
        <View
          style={ LoginStyles.label }
        >
          <Text
            style={LoginStyles.labelText}
          >
            Nombre
          </Text>
          <TextInput
            value={userForm.name}
            onChangeText={(value)=> { changeForm('name', value) }}
          />
        </View>
        <View
          style={ LoginStyles.label }
        >
          <Text
            style={LoginStyles.labelText}
          >
            Apellido
          </Text>
          <TextInput
            value={userForm.lastName}
            onChangeText={(value) => { changeForm('lastName', value) }}
          />
        </View>
        <View
          style={ LoginStyles.label }
        >
          <Text
            style={LoginStyles.labelText}
          >
            Cumpleaños
          </Text>
          <TouchableOpacity
            onPress={() => {
              setShowTimePicker(true)
            }}
          >
            <TextInput
              value={moment(birthday).format('DD/MM/YYYY')}
              editable={false}
            />
          </TouchableOpacity>
        </View>
        <View
          style={ LoginStyles.label }
        >
          <Text
            style={LoginStyles.labelText}
          >
            Correo electrónico
          </Text>
          <TextInput
            value={userForm.email}
            onChangeText={(value) => { changeForm('email', value) } }
          />
        </View>
        <View
          style={ LoginStyles.label }
        >
          <Text
            style={LoginStyles.labelText}
          >
            Contraseña
          </Text>
          <TextInput
            secureTextEntry={true}
            value={userForm.password}
            onChangeText={(value) => { changeForm('password', value) }}
          />
        </View>
        <View
          style={ LoginStyles.label }
        >
          <Text
            style={LoginStyles.labelText}
          >
            Confirmar Contraseña
          </Text>
          <TextInput
            secureTextEntry={true}
            value={userForm.confirmPassword}
            onChangeText={(value) => { changeForm('confirmPassword', value) }}
          />
        </View>
        <View
          style={{ marginVertical: 16 * StylesVariables.responsiveHeightMulti}}
        >
          <Button
            text={'Registrame'}
            onPress={registerUser}
          />
        </View>
        <View
          style={[LoginStyles.label, { width: '100%', alignItems: 'center' }]}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login')
            }}
          >
            <Text
              style={[LoginStyles.registerLabels, { color: 'skyblue', textDecorationLine: 'underline', fontWeight: 'bold' }]}
            >
              Regresar al Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    {
      showTimePicker &&
        <DateTimePicker
          testID="dateTimePicker"
          value={birthday}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={changeDateBirthDay}
        /> 
    }
    </Layout>
  )
}

export default RegisterScreen

