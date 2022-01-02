import AppSizes from './sizes.style';
import AppTexts from './texts.style';
import AppTheme from './theme.style'

/*
  AppSizes = responsive sizes,
  AppText = TextStyles
  AppTheme = theme styles
*/

const responsiveMulti = 
AppSizes.windowWidth >= AppSizes.XXLarge ? 1.7 
: AppSizes.windowWidth >= AppSizes.LargeM ? 1.14 
: 1;

/*
const responsiveHeightMulti = 
AppSizes.windowHeight >= 1024 ? 1.22
: AppSizes.windowHeight > 667 ? 1.16
: AppSizes.windowHeight > 600 ? .88
: 1;
*/
const responsiveHeightMulti = ((AppSizes.windowHeight * 100) / 667) / 100;

const inputMulti = AppSizes.windowWidth >= AppSizes.XXLarge ? 1.2 : AppSizes.windowWidth >= AppSizes.XLarge ? 1.3 : AppSizes.windowWidth >= AppSizes.Large ? 1.1 : 1;
const headerMulti = AppSizes.windowWidth >= AppSizes.XXLarge ? 1.3 : AppSizes.windowWidth >= AppSizes.XLarge ? 1.1 : AppSizes.windowWidth >= AppSizes.Large ? 1 : .85;

/**** COLORS 
  Here insert app colors
 * 
*/


const appText = {
    fontFamily: AppTexts.textFont,
    color: AppTheme.textColor,
    fontSize: AppTexts.textFontSize,
}

const appTextInput = {
    fontFamily: AppTexts.mediumFont,
    color: AppTheme.textColor,
    fontSize: AppTexts.textFontSize * 1.2,
    fontWeight: "600",
    textAlign: 'left'
}

const appTextMinor = {
    fontFamily: AppTexts.textFont,
    color: AppTheme.textColor,
    fontSize: AppTexts.textFontSize * 0.8
}

const appTitleLarge = {
    fontFamily: AppTexts.titleFont,
    color: AppTheme.textColor,
    fontSize: AppTexts.titleFontSize * 1.4
}

const appTitle = {
    fontFamily: AppTexts.titleFont,
    color: AppTheme.textColor,
    fontSize: AppTexts.titleFontSize
}

const appTextMedium = {
    fontFamily: AppTexts.mediumFont,
    color: AppTheme.textColor,
    fontSize: AppTexts.textFontSize
}

const appSubTitle = {
    fontFamily: AppTexts.titleFont,
    color: AppTheme.textColor,
    lineHeight: AppTexts.subTitleFontSize * 1.3,
    fontSize: AppTexts.subTitleFontSize
}

const StylesVariables = { 
    ...AppSizes,
    ...AppTexts,
    ...AppTheme,
    appText,
    appTitleLarge,
    appTextInput,
    appTitle,
    appTextMedium,
    appSubTitle,
    appTextMinor,
    responsiveMulti,
    responsiveHeightMulti,
    inputMulti,
    headerMulti
};

export default StylesVariables;
