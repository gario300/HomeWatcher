import AppSizes from './sizes.style';

const titleFont = 'Bold';
const mediumFont = 'Medium';
const subTitleFont = 'SemiBold';
const textFont = 'Regular';
const italicFont = 'Italic';
const lightFont = 'Light';
const lightItalicFont = 'LightItalic';

const titleBaseFont = 19
const subTitleBaseFont = 15
const baseFont = 13
const smallBaseFont = 10

const textMulti = 
AppSizes.windowWidth >= AppSizes.XXLarge ? 1.5 
: AppSizes.windowWidth >= AppSizes.XLarge ? 1.3 
: AppSizes.windowWidth >= AppSizes.Medium ? 1.2 
: 1;
const textFontSize = 
AppSizes.windowWidth >= AppSizes.XXLarge ? baseFont * 1.8 
: AppSizes.windowWidth >= AppSizes.LargeM ? baseFont * 1.12
: baseFont;
const titleFontSize = 
AppSizes.windowWidth >= AppSizes.XXLarge ? titleBaseFont * 1.8 
: AppSizes.windowWidth >= AppSizes.Medium ? titleBaseFont * 1.25 
: titleBaseFont;
const subTitleFontSize = 
AppSizes.windowWidth >= AppSizes.XXLarge ? subTitleBaseFont * 1.8 
: AppSizes.windowWidth >= AppSizes.Medium ? subTitleBaseFont * 1.25 
: subTitleBaseFont;
const smallFontSize = 
AppSizes.windowWidth >= AppSizes.XXLarge ? smallBaseFont * 1.8 
: AppSizes.windowWidth >= AppSizes.Medium ? smallBaseFont * 1.25 
: smallBaseFont;

const textLineHeight = AppSizes.windowWidth >= AppSizes.XXLarge ? 36 : AppSizes.windowWidth >= AppSizes.Large ? 28 : 26;
const titleLineHeight = AppSizes.windowWidth >= AppSizes.XXLarge ? 40 : AppSizes.windowWidth >= AppSizes.Large ? 30 : 28;
const inputFontSize 
= AppSizes.windowWidth >= AppSizes.XXLarge ? baseFont * 1.8 
: AppSizes.windowWidth >= AppSizes.XLarge ? baseFont * 1.5
: AppSizes.windowWidth >= AppSizes.LargeM ? baseFont * 1.4
: AppSizes.windowWidth >= AppSizes.Medium ? baseFont * 1.3
: baseFont;

export default {
    titleFont,
    subTitleFontSize,
    subTitleFont,
    mediumFont,
    textFont,
    italicFont,
    lightFont,  
    lightItalicFont,  
    textMulti,
    textFontSize,
    titleFontSize,
    textLineHeight,
    titleLineHeight,
    inputFontSize,
    smallFontSize,
};
