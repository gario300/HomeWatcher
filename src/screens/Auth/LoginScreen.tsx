import React, { useState } from "react"
import { View } from "react-native"
import { LoginStyles } from "./AuthStyles"
import { Button, TextInput, Text, Layout, useTheme } from 'react-native-rapi-ui';

const LoginScreen = () => { 
  return (
    <Layout>
      <View
        style={LoginStyles.headerSpace}
      >
      </View>
      <View
        style={ LoginStyles.bodySpace }
      >
        <View>
          <TextInput/>
        </View>
      </View>
    </Layout>
  )
}

export default LoginScreen

