import errorHandler from "@/errorHandler";
import { getIdToken } from "@/firebase";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { IPaginationResult } from "@/interfaces/IPaginationResult";
import { ISellCardCategory } from "@/interfaces/ISellCardCategory";
import { serviceCardCategoryConvert } from "@/services/ServiceCardCategory";
import { serviceSellCardCategoryGetBuyerList } from "@/services/ServiceSellCardCategory";
import { useAccount, useAlert, useHomeDropdown, useLoading, useStoreHistoryDetail, useStoreTransaction } from "@/store";
import { useEffect } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native"

export default () => {
  const theme = useCustomTheme();
  const sellCardCategory = useStoreHistoryDetail();
  const category = useHomeDropdown();
  const transaction = useStoreTransaction();
  const loading = useLoading();
  const alert = useAlert();
  const { account } = useAccount();

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

  const getSellCardCategories = async () => {
    const token = await getIdToken();
    const result: IPaginationResult<ISellCardCategory> = await (await serviceSellCardCategoryGetBuyerList(token, transaction.item.id)).json();
    sellCardCategory.setItems(result.items);
  }

  const convert = async (sellCardCateogryId: string) => {
    try {
      loading.setLoading(true)
      const token = await getIdToken();
      await serviceCardCategoryConvert(token, account.id, sellCardCateogryId);
      category.setRefresh(!category.refresh);
    } catch (error) {
      errorHandler(error, alert)
    }
    finally {
      loading.setLoading(false)
    }
  }

  useEffect(() => {
    loading.setLoading(true)
    getSellCardCategories();
    loading.setLoading(false)
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{transaction.item.id}</Text>
      <Text style={styles.header}>Item : {transaction.item.totalItem}</Text>
      <Text style={styles.header}>Point : {transaction.item.totalPoint}</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={sellCardCategory.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>Total: {item.nCard}</Text>
            <Pressable onPress={() => convert(item.id)}>
              <Text style={styles.text}>Convert</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  )
}