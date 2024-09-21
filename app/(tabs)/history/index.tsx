import { getIdToken } from "@/firebase";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { IPaginationResult } from "@/interfaces/IPaginationResult";
import { ITransactionActivity } from "@/interfaces/ITransactionActivity";
import { serviceTransactionGetList } from "@/services/ServiceTransaction";
import { useAccount, useStoreTransaction } from "@/store";
import { FontAwesome } from "@expo/vector-icons";
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
    },
    time: {
      fontFamily: 'font-regular',
      color: theme.text,
      fontSize: 12,
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.subAlt,
      borderRadius: 8,
    },
    textContainer: {
      flex: 1,
      marginLeft: 10,
    },
    title: {
      color: theme.text,
      fontSize: 12,
      fontFamily: 'font-bold'
    },
    points: {
      color: '#fff',
      fontSize: 12,
      fontFamily: 'font-regular'
    },
    deleteButton: {
      paddingHorizontal: 20,
    },
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
          <View style={{ marginBottom: 20, marginHorizontal: 20 }}>
            <View style={styles.card}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.id}</Text>
                <Text style={styles.time}>{item.createdTime.toString()}</Text>
                <View style={{ flex: 2, flexDirection: "row", justifyContent: 'space-between',}}>
                <Text style={styles.text}>{item.totalItem} items</Text>
                <Text style={styles.points}>{item.totalPoint} pts</Text>
                </View>
              </View>
              <Pressable style={styles.deleteButton} onPress={() => viewDetail(item)}>
                <FontAwesome size={28} name="eye" color={theme.main} />
              </Pressable>
            </View>

          </View>
        )}
      />
    </View>
  )
}