import Popup from "@/app/components/Popup";
import { getIdToken } from "@/firebase";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import IAccount from "@/interfaces/IAccount";
import { ICart } from "@/interfaces/ICart";
import { ISellCardCategory } from "@/interfaces/ISellCardCategory";
import { serviceAuthGet } from "@/services/ServiceAuth";
import { serviceCartGet } from "@/services/ServiceCart";
import { serviceCartDetailGet, serviceCartDetailRemove } from "@/services/ServiceCartDetail";
import { serviceTransactionCheckout } from "@/services/ServiceTransaction";
import { useAccount, useLoading, useStoreCart, useStoreCartDetail, useStorePopup } from "@/store";
import { router } from "expo-router";
import { useEffect } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default () => {
  const popup = useStorePopup();
  const theme = useCustomTheme();
  const cartDetail = useStoreCartDetail();
  const cart = useStoreCart();
  const { account, setAccount } = useAccount();
  const loading = useLoading();

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
    normalButton: {
      backgroundColor: theme.sub,
      borderWidth: 2,
      borderColor: theme.sub,
      padding: 4,
      justifyContent: "center",
      alignItems: "center",
    },
    textNormalButton: {
      fontFamily: 'font-regular',
      color: theme.text,
    },
  })

  const getCartDetails = async () => {
    const token = await getIdToken();
    const items: ISellCardCategory[] = await (await serviceCartDetailGet(token, cart.item.id)).json();
    cartDetail.setItems(items);
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

  const checkout = async () => {
    try {
      loading.setLoading(true);
      var token = await getIdToken();
      await serviceTransactionCheckout(token, account.id, cart.item.id);
      await getCart();
      const res = (await (await serviceAuthGet(token)).json()) as IAccount;
      setAccount(res);
    } finally {
      loading.setLoading(false);
      router.push("/(tabs)/store/");
    }
    popup.setIsOpen(false);
  }

  useEffect(() => {
    getCart();
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={cartDetail.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.text}>{item.name} - {item.description} - {item.nCard}</Text>
            {cartDetail.items.length > 0 && cartDetail.items.find(p => p.id == item.id)
              &&
              <Pressable onPress={() => removeCartDetail(item.id)}>
                <Text style={styles.text}>Remove from Cart</Text>
              </Pressable>
            }
          </View>
        )}
      />
      <Pressable onPress={() => popup.setIsOpen(true)}>
        <Text style={styles.text}>Checkout : {cart.item.nItems} ({cartDetail.items.reduce((total, item: ISellCardCategory) => {
          return total + item.point;
        }, 0)})</Text>
      </Pressable>
      <Popup popup={popup}>
        <Text style={styles.text}>Checkout : {cart.item.nItems} ({cartDetail.items.reduce((total, item: ISellCardCategory) => {
          return total + item.point;
        }, 0)})</Text>
        <Pressable style={styles.normalButton} onPress={() => checkout()}>
          <Text style={styles.textNormalButton}>Checkout</Text>
        </Pressable>
      </Popup>
    </View>
  )
}