import { getIdToken } from "@/firebase";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { IPaginationResult } from "@/interfaces/IPaginationResult";
import { ISellCardCategory } from "@/interfaces/ISellCardCategory";
import { serviceSellCardCategoryGetListExclude } from "@/services/ServiceSellCardCategory";
import { useAccount, useStoreCard } from "@/store";
import { router } from "expo-router";
import { useEffect } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default () => {
  const theme = useCustomTheme();
  const { account } = useAccount();
  const sellCardCategory = useStoreCard();
  const getSellCardCategoryExclude = async () => {
    const token = await getIdToken();
    const items: IPaginationResult<ISellCardCategory> = await (await serviceSellCardCategoryGetListExclude(token, account.id)).json();
    sellCardCategory.setItems(items.items);
    console.log(items);
  }
  useEffect(() => {
    getSellCardCategoryExclude();
  }, [])

  const viewDetail = (item: ISellCardCategory) => {
    sellCardCategory.setItem(item);
    router.push('/(tabs)/store/detail');
  }

  const addToCart = (id: string) => {
    console.log(id);
  }

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
      <FlatList
        data={sellCardCategory.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.text}>{item.name} - {item.description} - {item.nCard}</Text>
            <Pressable onPress={() => viewDetail(item)}>
              <Text style={styles.text}>View</Text>
            </Pressable>
            <Pressable onPress={() => addToCart(item.id)}>
              <Text style={styles.text}>Add to Cart</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  )
}