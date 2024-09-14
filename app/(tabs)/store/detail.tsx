import { getIdToken } from "@/firebase";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { IPaginationResult } from "@/interfaces/IPaginationResult";
import { ISellCard } from "@/interfaces/ISellCard";
import { serviceSellCardGetList } from "@/services/ServiceSellCard";
import { useStoreCard, useStoreDetailCard } from "@/store";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native"

export default () => {
  const theme = useCustomTheme();
  const sellCardCategory = useStoreCard();
  const sellCard = useStoreDetailCard();
  const [category, setCategory] = useState(sellCardCategory.item);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
    },
    header: {
      fontFamily: 'font-bold',
      color: theme.text,
      fontSize: 24,
    },
    text: {
      fontFamily: 'font-regular',
      color: theme.text,
    }
  })

  const fetchSellCard = async () => {
    const token = await getIdToken();
    const result: IPaginationResult<ISellCard> = await (await serviceSellCardGetList(token, sellCardCategory.item.id)).json();
    sellCard.setItems(result.items);
  }
  useEffect(() => {
    fetchSellCard()
  }, [])
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{category.name}</Text>
      <FlatList
        data={sellCard.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.text}>{item.clueTxt}</Text>
          </View>
        )}
      />
    </View>
  )
}