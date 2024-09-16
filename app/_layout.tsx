import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import { useEffect, useState } from "react";
import * as SplashScreen from 'expo-splash-screen';
import LoadingOverlay from "./components/Loading";
import { useAlert, useLoading } from "@/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import Alert from "./components/Alert";

export default function RootLayout() {
  const [isAuthReady, setIsAuthReady] = useState(false);
  const { setLoading } = useLoading();
  const alert = useAlert();

  const [fontsLoaded] = useFonts({
    'font-regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'font-bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'font-bold-italic': require('../assets/fonts/Poppins-BoldItalic.ttf'),
    'font-medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'font-medium-italic': require('../assets/fonts/Poppins-MediumItalic.ttf'),
    'font-italic': require('../assets/fonts/Poppins-Thin.ttf'),
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      setIsAuthReady(true);
    });
    
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setLoading(!isAuthReady); 
  }, [isAuthReady])

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
    <LoadingOverlay/>
    <Alert alert={alert}/>
    <Stack screenOptions={{ headerShown: false, animation: "none" }}>
      <Stack.Screen name="(tabs)"/>
      <Stack.Screen name="index"/>
    </Stack>
    </>
  );
}