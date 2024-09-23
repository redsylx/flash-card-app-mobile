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
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";

export default () => {
  const popup = useStorePopup();
  const theme = useCustomTheme();
  const cartDetail = useStoreCartDetail();
  const cart = useStoreCart();
  const { account, setAccount } = useAccount();
  const loading = useLoading();

  const styles = StyleSheet.create({
    container: {
      paddingTop: 20,
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
    containerBottom: {
      height: 60
    },
    containerBottomView: {
      flex: 2,
      justifyContent: 'space-between',
      flexDirection: "row",
      height: 60,
    },
    point: {
      fontFamily: 'font-bold',
      fontSize: 24,
      color: theme.text,
    },
    textPts: {
      fontFamily: 'font-regular',
      color: theme.text,
    },
    mainButton: { backgroundColor: theme.main, paddingHorizontal: 20, alignItems: "center", justifyContent: "center" },
    cardContainer: {
      borderRadius: 8,
      height: 100,
      padding: 10,
      overflow: 'hidden',
      borderColor: theme.sub,
      borderBottomWidth: 2,
      backgroundColor: theme.bg
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.sub,
      borderRadius: 8,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 4,
    },
    imageEmpty: {
      width: 100,
      height: 100,
      borderRadius: 4,
      backgroundColor: theme.subAlt
    },
    textContainer: {
      flex: 1,
      marginLeft: 10,
    },
    title: {
      color: '#fff',
      fontSize: 24,
      fontFamily: 'font-bold'
    },
    points: {
      color: '#fff',
      fontSize: 16,
      fontFamily: 'font-regular'
    },
    deleteButton: {
      padding: 10,
    },
    deleteText: {
      fontSize: 18,
      color: '#FFC107',
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
          <View style={{ marginBottom: 20, marginHorizontal: 20 }}>
            <View style={styles.card}>
              {
                item.imgUrl !== "" 
                ? <Image source={{ uri: item.imgUrl }} style={styles.image} />
                : <View style={styles.imageEmpty}/>
              }
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.points}>{item.point} pts</Text>
              </View>
              <Pressable style={styles.deleteButton} onPress={() => removeCartDetail(item.id)}>
                <FontAwesome size={28} name="trash" color={theme.bg} />
              </Pressable>
            </View>

          </View>
        )}
      />
      <View style={styles.containerBottom}>
        <View style={styles.containerBottomView}>
          <View style={{ flex: 2, flexDirection: 'row', backgroundColor: theme.subAlt, paddingHorizontal: 20, alignItems: "center" }}>
            <Text style={styles.point}>{cartDetail.items.reduce((total, item: ISellCardCategory) => {
              return total + item.point;
            }, 0)}</Text>
            <Text style={styles.textPts}>pts</Text>
          </View>
          <Pressable style={styles.mainButton} onPress={() => popup.setIsOpen(true)}>
            <FontAwesome size={28} name="angle-right" color={theme.bg} />
          </Pressable>
        </View>
      </View>
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