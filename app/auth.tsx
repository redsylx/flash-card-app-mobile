// app/index.tsx
import { Text, View, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { useEffect } from "react";
import { getIdToken } from "@/firebase";
import { serviceAuthGet } from "@/services/ServiceAuth";
import IAccount from "@/interfaces/IAccount";
import { useAccount } from "@/store";
import { router } from "expo-router";

export default function HomePage() {
  const theme = useCustomTheme();
  const account = useAccount();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.bg,
      paddingHorizontal: 50, 
    },
    buttonText: {
      color: theme.text,
      fontSize: 16,
      textAlign: 'center',
    },
  });

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getIdToken();
      const res = (await (await serviceAuthGet(token)).json()) as IAccount;
      account.setAccount(res);
      router.push('/(home)')
    }
    fetchToken();
  })

  return (
    <View style={styles.container}>
      <Text style={styles.buttonText}>Authenticating</Text>
    </View>
  );
}
