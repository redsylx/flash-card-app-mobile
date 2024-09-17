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
import { FlatList, ImageBackground, Modal, Pressable, StyleSheet, Text, View } from "react-native";

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
      paddingTop: 10,
      backgroundColor: theme.bg,
    },
    text: {
      fontFamily: 'font-regular',
      color: theme.text,
    },
    cardText: {
      fontFamily: 'font-regular',
      color: theme.text,
      fontSize: 16,
    },
    cardContainer: {
      borderRadius: 8,
      aspectRatio: 16 / 9,
      overflow: 'hidden',
    },
    imageBackground: {
      flex: 1,
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },
    imageStyle: {
      resizeMode: 'cover',
    },
    overlayOpen: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.bg,
      opacity: 0.75,
    },
    cardBorder: {
      ...StyleSheet.absoluteFillObject,
      borderWidth: 2,
      borderColor: theme.sub,
      borderRadius: 8,
    },
    cardContent: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 10,
      padding: 16,
      justifyContent: 'space-between',
    },
    cart: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      zIndex: 15,
      backgroundColor: theme.main
    },
    history: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      zIndex: 15,
      backgroundColor: theme.main
    },
    btnAddCart: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      zIndex: 15,
      margin: 16,
      backgroundColor: theme.main
    },
    clueText: {
      fontFamily: 'font-bold',
      fontSize: 32,
      color: theme.text,
    },
  })


  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.push("/(tabs)/store/checkout")} style={styles.cart}>
        <Text style={styles.text}>Cart ({cart.item.nItems})</Text>
      </Pressable>
      <Pressable onPress={() => router.push("/(tabs)/store/history")} style={styles.history}>
        <Text style={styles.text}>History</Text>
      </Pressable>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={sellCardCategory.items}
        keyExtractor={(item) => item.id + Math.random()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            <Pressable style={styles.cardContainer} onPress={() => viewDetail(item)}>
              {
                item.imgUrl != "" &&
                <ImageBackground
                source={{ uri: item.imgUrl }}
                style={styles.imageBackground}
                imageStyle={styles.imageStyle}
                >
                  <View style={styles.overlayOpen} />
                </ImageBackground>
              }

              <View style={styles.cardBorder} />

              <View style={styles.cardContent}>
                <Text style={styles.clueText}>
                  {item.name}
                </Text>
                {cartDetail.items.length > 0 && cartDetail.items.find(p => p.id == item.id)
                ?
                <Pressable onPress={() => removeCartDetail(item.id)} style={styles.btnAddCart}>
                  <Text style={styles.cardText}>Remove from Cart</Text>
                </Pressable>
                :
                <Pressable onPress={() => addCartDetail(item.id)} style={styles.btnAddCart}>
                  <Text style={styles.cardText}>Add to Cart</Text>
                </Pressable>
              }
              </View>

              
            </Pressable>
          </View>
        )}
      />
    </View>
  )
}