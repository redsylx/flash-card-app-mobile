import { auth } from "@/firebase";
import { useCustomTheme } from "@/hooks/useCustomTheme"
import { defaultAccount } from "@/interfaces/IAccount";
import { useAccount } from "@/store";
import { Pressable, StyleSheet, Text, View } from "react-native"

export default () => {
  const theme = useCustomTheme();
  const { setAccount } = useAccount();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
    },
    text: {
      fontFamily: 'font-regular',
      color: theme.text,
    }
  })

  const logout = () => {
    console.log("Logout")
    auth.signOut().then(() => setAccount(defaultAccount));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is Profile</Text>
      <Pressable onPress={() => logout()}>
        <Text style={styles.text}>
          Logout
        </Text>
      </Pressable>
    </View>
  )
}