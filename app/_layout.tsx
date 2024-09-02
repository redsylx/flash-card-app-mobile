import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import { useEffect } from "react";
import * as SplashScreen from 'expo-splash-screen';

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    'font-regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'font-bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'font-bold-italic': require('../assets/fonts/Poppins-BoldItalic.ttf'),
    'font-medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'font-medium-italic': require('../assets/fonts/Poppins-MediumItalic.ttf'),
    'font-italic': require('../assets/fonts/Poppins-Thin.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index"/>
    </Stack>
  );
}