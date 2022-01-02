import { StyleSheet } from "react-native"
import StylesVariables  from "../../shared/Styles/app.style"

export const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: StylesVariables.spacing * StylesVariables.responsiveHeightMulti,
  },
  headerSpace: {
    flex: .3
  },
  bodySpace: {
    flex: .7,
    padding: StylesVariables.spacing * StylesVariables.responsiveHeightMulti,
  },
  formRow: {
    marginVertical: 5 * StylesVariables.responsiveHeightMulti,
    width: '100%'
  },
  labelText: {
    ...StylesVariables.appTextMinor,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    marginStart: 5
  },
  label: {
    marginVertical: StylesVariables.spacing * StylesVariables.responsiveHeightMulti
  },
  registerLabels: {
    ...StylesVariables.appTextMinor,
    color: 'gray'
  }
})
