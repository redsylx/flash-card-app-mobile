// app/index.tsx
import { Text, View, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { getIdToken } from "@/firebase";

export default function HomePage() {
  const theme = useCustomTheme();
  const [ token, setToken ] = useState("");
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-start',
      backgroundColor: theme.bg,
      paddingHorizontal: 50, 
    },
    title: {
      fontFamily: 'font-bold',
      fontSize: 48,
      color: theme.main,
      marginBottom: 0,
      textAlign: 'left',
    },
    pronunciation: {
      fontFamily: 'font-medium-italic',
      fontSize: 32,
      color: theme.text,
      marginBottom: 24,
      textAlign: 'left',
    },
    description: {
      fontFamily: 'font-regular',
      fontSize: 18,
      color: theme.text,
      marginBottom: 48,
      paddingHorizontal: 0,
      textAlign: 'left',
    },
    button: {
      backgroundColor: theme.subAlt,
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 8,
      alignSelf: 'flex-start', 
    },
    buttonText: {
      fontFamily: 'font-bold',
      color: theme.text,
      fontSize: 16,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>memento</Text>
      <Text style={styles.pronunciation}>/məˈmen.təʊ/</Text>
      <Text style={styles.description}>
        an object that you keep to remember a person, place, or event
      </Text>
      <Text>Token: {token}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={() => router.push('/login')}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
