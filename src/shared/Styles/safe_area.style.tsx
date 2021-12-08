import { StyleSheet } from 'react-native';
import StylesVariables from './app.style';

export default StyleSheet.create({
    droidSafeArea: {
        backgroundColor: StylesVariables.backgroundColor,
        flex: 1,
        paddingTop: 0
    },
    container: {
        flex: 1,
        zIndex: 1,
        backgroundColor: StylesVariables.backgroundColor
    }
});
