import { auth } from '@/firebase';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import { defaultAccount } from '@/interfaces/IAccount';
import { useAccount } from '@/store';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default () => {
  const { account, setAccount } = useAccount();
  const theme = useCustomTheme();

  useEffect(() => {
    if(!account.id) router.push('/');
  }, [account.id])

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',

      alignItems: 'center',
      backgroundColor: theme.bg,
      paddingHorizontal: 50, 
      color: theme.text
    },
  });

  const logout = () => {
    console.log("Logout")
    auth.signOut().then(() => setAccount(defaultAccount));
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>{account.point} points</Text>
      <Text>{account.username ? account.username : '. . .'}</Text>
      <Pressable onPress={logout}>
        <Text>Logout</Text>
      </Pressable>
    </SafeAreaView >
  )
}