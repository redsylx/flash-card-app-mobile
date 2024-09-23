import { getIdToken } from "@/firebase";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { ICart } from "@/interfaces/ICart";
import { IPaginationResult } from "@/interfaces/IPaginationResult";
import { ISellCardCategory } from "@/interfaces/ISellCardCategory";
import { serviceCartGet } from "@/services/ServiceCart";
import { serviceCartDetailAdd, serviceCartDetailGet, serviceCartDetailRemove } from "@/services/ServiceCartDetail";
import { serviceSellCardCategoryGetListExclude } from "@/services/ServiceSellCardCategory";
import { useAccount, useAlert, useLoading, useStoreCard, useStoreCart, useStoreCartDetail } from "@/store";
import { FontAwesome } from "@expo/vector-icons";
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
  const loading = useLoading();

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
    try {
      loading.setLoading(true);
      const token = await getIdToken();
      await serviceCartDetailAdd(token, cart.item.id, sellCategoryId);
      await getCart();
    } finally {
      loading.setLoading(false);
    }
    
  }

  const removeCartDetail = async (sellCategoryId: string) => {
    try {
      loading.setLoading(true);
      const token = await getIdToken();
      await serviceCartDetailRemove(token, cart.item.id, sellCategoryId);
      await getCart();
    } finally {
      loading.setLoading(false);
    }
  }

  const getCart = async () => {
    const token = await getIdToken();
    const item: ICart = await (await serviceCartGet(token, account.id)).json();
    cart.setItem(item);
    await getCartDetails()
  }

  useEffect(() => {
    const fetch = async() => {
      loading.setLoading(true)
      await getCart();
      cart.setAddCart(addCartDetail)
      cart.setRemoveCart(removeCartDetail)
      await getSellCardCategoryExclude();
      loading.setLoading(false)
    }

    fetch();
  }, [])

  const viewDetail = (item: ISellCardCategory) => {
    sellCardCategory.setItem(item);
    router.push('/(tabs)/store/detail');
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 10,
      paddingHorizontal: 20,
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
    },
    cart: {
      position: 'absolute',
      right: 20,
      bottom: 20,
      zIndex: 15,
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.subAlt,
      borderRadius: 100
    },
    btnAddCart: {
      position: 'absolute',
      right: 0,
      top: 12,
      zIndex: 15,
      margin: 16,
    },
    clueText: {
      fontFamily: 'font-bold',
      fontSize: 32,
      color: theme.text,
    },
    pointContainer: {
      position: 'absolute',
      left: 16,
      bottom: 16,
      zIndex: 15,
    },
    pointText: {
      fontFamily: 'font-regular',
      fontSize: 24,
      color: theme.main,
    },
    bubble: {
      position: 'absolute',
      left: 30,
      bottom: 30,
      backgroundColor: theme.error,
      borderRadius: 10,
      paddingHorizontal: 5,
      paddingVertical: 2,
      minWidth: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bubbleText: {
      color: theme.bg,
      fontSize: 12,
      fontWeight: 'bold',
    },
    accountName: {
      fontFamily: 'font-regular',
      fontSize: 16,
      color: theme.error,
    },

    row: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
    columnLeft: {
      alignItems: 'flex-start',
    },
    columnMid: {
      alignItems: 'center',
    },
    columnRight: {
      alignItems: 'flex-end',
    },
    label: {
      color: theme.text,
      fontSize: 14,
    },
    value: {
      color: theme.text,
      fontSize: 20,
      fontWeight: 'bold',
    },
  })


  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.push("/(tabs)/store/checkout")} style={styles.cart}>
        <FontAwesome size={28} name="shopping-cart" color={theme.sub} />
        {cart.item.nItems > 0 && (
          <View style={styles.bubble}>
            <Text style={styles.bubbleText}>{cart.item.nItems}</Text>
          </View>
        )}
      </Pressable>
      
      <FlatList
        showsVerticalScrollIndicator={false}
        data={sellCardCategory.items}
        keyExtractor={(item) => item.id + Math.random()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            {cartDetail.items.length > 0 && cartDetail.items.find(p => p.id == item.id)
                ?
                <Pressable onPress={() => cart.removeCart(item.id)} style={styles.btnAddCart}>
                  <FontAwesome size={28} name="trash" color={theme.error} />
                </Pressable>
                :
                <Pressable onPress={() => cart.addCart(item.id)} style={styles.btnAddCart}>
                  <FontAwesome size={28} name="plus-circle" color={theme.main} />
                </Pressable>
              }
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
                <Text style={styles.accountName}>
                    {item.account.username}
                  </Text>
                <View style={styles.pointContainer}>
                  <View style={styles.row}>
                    <View style={styles.columnLeft}>
                      <Text style={styles.label}>card</Text>
                      <Text style={styles.value}>{item.nCard}</Text>
                    </View>
                    <View style={styles.columnMid}>
                      <Text style={styles.label}>sold</Text>
                      <Text style={styles.value}>{item.sold}x</Text>
                    </View>
                    <View style={styles.columnRight}>
                      <Text style={styles.label}>point</Text>
                      <Text style={styles.value}>{item.point}</Text>
                    </View>
                  </View>
                </View>
              </View>

              
            </Pressable>
          </View>
        )}
      />
    </View>
  )
}