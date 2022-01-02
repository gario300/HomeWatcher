import { StyleSheet } from "react-native";
import StylesVariables from "../../shared/Styles/app.style"
export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  mapView: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  dangerButtonContainer: {
    width: '100%',
    alignItems: 'center',
    padding: StylesVariables.spacing * 2 * StylesVariables.responsiveHeightMulti
  },
  buttonDanger: {
    width: 110 * StylesVariables.responsiveHeightMulti,
    height: 110 * StylesVariables.responsiveHeightMulti,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 110 * StylesVariables.responsiveHeightMulti,
    borderWidth: 2 * StylesVariables.responsiveHeightMulti,
    borderColor: 'gray'
  },
  imageAlert: {
    width: 80 * StylesVariables.responsiveHeightMulti,
    height: 80 * StylesVariables.responsiveHeightMulti,
  }
})  
