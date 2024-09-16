import { getIdToken } from "@/firebase";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { ICart } from "@/interfaces/ICart";
import { IPaginationResult } from "@/interfaces/IPaginationResult";
import { ISellCardCategory } from "@/interfaces/ISellCardCategory";
import { serviceCartGet } from "@/services/ServiceCart";
import { serviceCartDetailAdd, serviceCartDetailGet, serviceCartDetailRemove } from "@/services/ServiceCartDetail";
import { serviceSellCardCategoryGetListExclude } from "@/services/ServiceSellCardCategory";
import { useAccount, useAlert, useStoreCard, useStoreCart, useStoreCartDetail } from "@/store";
import { router } from "expo-router";
import { useEffect } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from "react-native";

export default () => {
  const cartDetail = useStoreCartDetail();
  const cart = useStoreCart();
  const theme = useCustomTheme();
  const { account } = useAccount();
  const sellCardCategory = useStoreCard();
  const alert = useAlert();

  const getSellCardCategoryExclude = async () => {
    const token = await getIdToken();
    const items: IPaginationResult<ISellCardCategory> = await (await serviceSellCardCategoryGetListExclude(token, account.id)).json();
    sellCardCategory.setItems(items.items);
  }

  const getCartDetails = async () => {
    const token = await getIdToken();
    const items: ISellCardCategory[] = await (await serviceCartDetailGet(token, cart.item.id)).json();
    cartDetail.setItems(items);
  }

  const addCartDetail = async (sellCategoryId: string) => {
    const token = await getIdToken();
    await serviceCartDetailAdd(token, cart.item.id, sellCategoryId);
    await getCart();
  }

  const removeCartDetail = async (sellCategoryId: string) => {
    const token = await getIdToken();
    await serviceCartDetailRemove(token, cart.item.id, sellCategoryId);
    await getCart();
  }

  const getCart = async () => {
    const token = await getIdToken();
    const item: ICart = await (await serviceCartGet(token, account.id)).json();
    cart.setItem(item);
    await getCartDetails()
  }

  useEffect(() => {
    getSellCardCategoryExclude();
    getCart();
  }, [])

  const viewDetail = (item: ISellCardCategory) => {
    sellCardCategory.setItem(item);
    router.push('/(tabs)/store/detail');
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

            {cartDetail.items.length > 0 && cartDetail.items.find(p => p.id == item.id)
              ?
              <Pressable onPress={() => removeCartDetail(item.id)}>
                <Text style={styles.text}>Remove from Cart</Text>
              </Pressable>
              :
              <Pressable onPress={() => addCartDetail(item.id)}>
                <Text style={styles.text}>Add to Cart</Text>
              </Pressable>
            }
          </View>
        )}
      />
      <Pressable onPress={() => router.push("/(tabs)/store/checkout")}>
        <Text style={styles.text}>Cart ({cart.item.nItems})</Text>
      </Pressable>
      <Pressable onPress={() => router.push("/(tabs)/store/history")}>
        <Text style={styles.text}>History</Text>
      </Pressable>
    </View>
  )
}