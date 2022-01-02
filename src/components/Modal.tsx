import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import StylesVariables from "../shared/Styles/app.style"
import { AntDesign } from '@expo/vector-icons';
interface buttonTypes {
  action: () => void;
  text: string;
  backgroundColor: string;
  textColor: string;
}
interface messageTypes {
  isVisible: boolean;
  message: string;
  buttons: buttonTypes[];
  type: string;
}
const ModalMessage = ({isVisible, message, buttons, type} : messageTypes) => {
  
  const messageStatus = () => {
    switch(type){
      case 'S':
        return <AntDesign name="checkcircleo" size={50 * StylesVariables.responsiveHeightMulti} color="white"/>
      case 'N':
        return <AntDesign name="closecircleo" size={50 * StylesVariables.responsiveHeightMulti} color="white"/>
    }
  }

  if (!isVisible) {
    return null
  }

  return(
    <View
      style={modalStyles.container}
    >
      <View
        style={modalStyles.blackScreen}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
      >
        <View
          style={
            modalStyles.messageContainer
          } 
        >
          <View
            style={modalStyles.message}
          >
            <View
              style={modalStyles.headerMessage}
            >
              {messageStatus()}
            </View>
            <View
              style={modalStyles.bodyMessage}
            >
              <Text
                style={modalStyles.textMessage}
              >
                {message}
              </Text>
              <View
                style={modalStyles.buttonContainer}
              >
                {
                  buttons.map((button, index) => {
                    return(
                      <TouchableOpacity
                        key={index}
                        style={{
                          width: '47%',
                          margin: '1%'
                        }}
                        onPress={() => button.action()}
                      >
                        <View
                          style={[modalStyles.buttonStyle, { backgroundColor: button.backgroundColor }]}
                        >
                          <Text
                            style={[modalStyles.textButtonStyle, { color: button.textColor }]}
                          >
                            { button.text }
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ModalMessage

const modalStyles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  messageContainer: {
    paddingHorizontal: StylesVariables.spacing + 10 * StylesVariables.responsiveHeightMulti,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blackScreen: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    opacity: .7,
    position: 'absolute'
  },
  message: {
    width: '100%',
    padding: 15 * StylesVariables.responsiveHeightMulti,
    backgroundColor: '#211C2F',
    borderRadius: StylesVariables.spacing * StylesVariables.responsiveHeightMulti,
  },
  headerMessage: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 5 * StylesVariables.responsiveHeightMulti
  },
  bodyMessage: {
    alignItems: 'center',
    paddingBottom: 5 * StylesVariables.responsiveHeightMulti,
  },
  textMessage: {
    ...StylesVariables.appText,
    color: 'white',
    textAlign: 'center',
    marginVertical: 10 * StylesVariables.responsiveHeightMulti
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  buttonStyle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7,
    borderRadius: 8
  },
  textButtonStyle: {
    ...StylesVariables.appTextMedium,
    fontWeight: 'bold',
  }
})
