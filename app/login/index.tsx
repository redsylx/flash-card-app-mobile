import { useCustomTheme } from '@/hooks/useCustomTheme';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen() {
  const theme = useCustomTheme();

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
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
