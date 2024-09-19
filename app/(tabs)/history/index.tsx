import { getIdToken } from "@/firebase";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { IPaginationResult } from "@/interfaces/IPaginationResult";
import { ITransactionActivity } from "@/interfaces/ITransactionActivity";
import { serviceTransactionGetList } from "@/services/ServiceTransaction";
import { useAccount, useStoreTransaction } from "@/store";
import { router } from "expo-router";
import { useEffect } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default () => {
  const theme = useCustomTheme();
  const transaction = useStoreTransaction();
  const { account, setAccount } = useAccount();

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

  const getTransactions = async () => {
    const token = await getIdToken();
    const result : IPaginationResult<ITransactionActivity> = await (await serviceTransactionGetList(token, account.id)).json();
    transaction.setItems(result.items);
  }

  const viewDetail = (item: ITransactionActivity) => {
    transaction.setItem(item);
    router.push('/(tabs)/store/history/detail');
  }

  useEffect(() => {
    getTransactions();
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={transaction.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.text}>{item.createdTime.toString()}</Text>
            <Text style={styles.text}>{item.id}</Text>
            <Text style={styles.text}>Item : {item.totalItem}</Text>
            <Text style={styles.text}>Point : {item.totalPoint}</Text>
            <Pressable onPress={() => viewDetail(item)}>
              <Text style={styles.text}>View Detail</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  )
}