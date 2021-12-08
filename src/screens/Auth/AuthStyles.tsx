import { StyleSheet } from "react-native"
import StylesVariables  from "../../shared/Styles/app.style"

export const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSpace: {
    flex: .3
  },
  bodySpace: {
    flex: .7,
    padding: StylesVariables.spacing + 2 * StylesVariables.responsiveHeightMulti,
    justifyContent: 'center'
  }
})
