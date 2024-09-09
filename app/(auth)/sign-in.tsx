import { useCustomTheme } from '@/hooks/useCustomTheme';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignIn() {
  const theme = useCustomTheme();
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: theme.bg,
      paddingHorizontal: 40,
    },
    title: {
      textAlign: 'left',
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 30,
    },
    input: {
      width: '100%',
      height: 50,
      backgroundColor: theme.subAlt,
      borderRadius: 10,
      paddingHorizontal: 10,
      marginBottom: 20,
      color: theme.text,
    },
    forgotPassword: {
      color: theme.sub,
      fontWeight: '200',
      marginBottom: 20,
    },
    loginButton: {
      width: '100%',
      height: 50,
      backgroundColor: theme.subAlt,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginBottom: 20,
    },
    loginText: {
      color: theme.text,
      fontWeight: 'bold',
      fontSize: 16,
    },
    registerText: {
      color: '#C1C1C1',
    },
    registerLink: {
      color: '#F3C1C6',
      fontWeight: 'bold',
    },
  });
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>memento</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor={theme.sub}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor={theme.sub}
      />
      
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Lupa Password</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>Log in</Text>
      </TouchableOpacity>
      
      <TouchableOpacity>
        <Text style={styles.registerText}>
          Belum punya akun? <Text style={styles.registerLink}>daftar</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}