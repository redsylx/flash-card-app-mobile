import { getIdToken } from "@/firebase";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { IPaginationResult } from "@/interfaces/IPaginationResult";
import { ISellCardCategory } from "@/interfaces/ISellCardCategory";
import { serviceSellCardCategoryGetListExclude } from "@/services/ServiceSellCardCategory";
import { useAccount, useStoreCard } from "@/store";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

export default () => {
  const theme = useCustomTheme();
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

  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false, animation: "none" }}>
        <Stack.Screen name="index"/>
        <Stack.Screen name="detail"/>
        <Stack.Screen name="checkout"/>
      </Stack>
    </View>
  )
}