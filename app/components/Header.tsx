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
    if (!account.id) router.push('/');
  }, [account.id])

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.subAlt,
      paddingHorizontal: 20,
      paddingTop: 24,
      color: theme.text
    },
    name: {
      fontFamily: 'font-bold',
      fontSize: 20,
      color: theme.main
    },
    point: {
      fontFamily: 'font-regular',
      fontSize: 16,
      color: theme.text,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <Text style={styles.name}>{account.username ? account.username : '. . .'}</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.point}>{account.point} pts</Text>
      </View>
    </SafeAreaView >
  )
}