import { Dimensions, Platform, StatusBar } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  lightBlack: "#333333",
  white: "#FFFFFF",

  black: "#000000",
  disableBlack: "#00000080",
  gray: "#808080",
  lightGray: '#EEEEEE',

  mainColor: "#111111",
  bodyTextColor: "#333333",
  secondaryTextColor: "#666666",
  btnColor: "#000000",

  pink: "#FF2DAB",

  primaryColor: '#6A5AE0',
  lightPrimaryColor: 'rgba(106, 90, 224, 0.1)',
  extraLightPrimaryColor: 'rgba(106, 90, 224, 0.035)',
  whiteColor: '#FFFFFF',
  offWhiteColor: 'rgba(255,255,255,0.5)',
  extraOffWhiteColor: 'rgba(255,255,255,0.3)',
  blackColor: '#000000',
  grayColor: '#8A9CBF',
  lightGrayColor: 'rgba(138, 156, 191, 0.5)',
  redColor: '#FF0000',
  yellowColor: '#FDD835',
  pinkColor: '#F06292',
  tomatoColor: '#E57373',
  blueColor: '#64B5F6',
  greenColor: '#4DB6AC',
  hightLightGreenColor: '#00D209',

  shadowStartColor: "rgba(6, 38, 100, 0.03)",
  shadowFinalColor: "rgba(6, 38, 100, 0.0)",
  shadowDistance: 10,

  transparent: "transparent",
  transparentWhite1: "rgba(255, 255, 255, 0.1)",
};

export const SIZES = {
  width,
  height,
  fixPadding: 10.0,
  borderRadius: 10,
};

export const FONTS = {
  '100': {
    fontFamily: "Roboto-Thin100",
  },
  '300': {
    fontFamily: "Roboto-Light300",
  },
  '400': {
    fontFamily: "Roboto-Regular400",
  },
  '500': {
    fontFamily: "Roboto-Medium500",
  },
  '700': {
    fontFamily: "Roboto-Bold700",
  },
};

export const AREA = {
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: COLORS.white,
  },
  DefaultBackground: {
    flex: 1,
  },
};

export const REELAREA = {
  AndroidSafeArea: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: COLORS.white,
  },
  DefaultBackground: {
    flex: 1,
  },
};

export const AndroidSafeArea = {
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    // backgroundColor: COLORS.white,
  },
  DefaultBackground: {
    flex: 1,
  },
};