import { Dimensions, Platform } from 'react-native';
const windowWidth = Dimensions.get('window').width; 
const windowHeight = Dimensions.get('window').height; 
const isiOS = Platform.OS === 'ios';

const XXLarge = 720;
const XLarge = 620;
const Large = 480;
const LargeM = 414;
const Medium = 375;
const Small = 320;

const spacing = 8;

export default {
    XXLarge,
    XLarge,
    Large,
    LargeM,
    Medium,
    Small,
    spacing,
    windowHeight,
    windowWidth,
    isiOS
};
