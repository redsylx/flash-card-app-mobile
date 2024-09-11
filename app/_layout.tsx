import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import { useEffect, useState } from "react";
import * as SplashScreen from 'expo-splash-screen';
import LoadingOverlay from "./components/Loading";
import { useLoading } from "@/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

export default function RootLayout() {
  const [isAuthReady, setIsAuthReady] = useState(false);
  const { setLoading } = useLoading();

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
    <Stack screenOptions={{ headerShown: false, animation: "none" }}/>
    </>
  );
}