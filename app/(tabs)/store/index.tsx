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
    getCart();
    
    cart.setAddCart(addCartDetail)
    cart.setRemoveCart(removeCartDetail)
    getSellCardCategoryExclude();
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
      justifyContent: 'space-between',
    },
    cart: {
      position: 'absolute',
      right: 20,
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
    },
    clueText: {
      fontFamily: 'font-bold',
      fontSize: 32,
      color: theme.text,
    },
    pointContainer: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      zIndex: 15,
      margin: 16,
    },
    pointText: {
      fontFamily: 'font-regular',
      fontSize: 24,
      color: theme.main,
    },
  })


  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.push("/(tabs)/store/checkout")} style={styles.cart}>
        <Text style={styles.text}>Cart ({cart.item.nItems})</Text>
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
                <View style={styles.pointContainer}>
                  <Text style={styles.pointText}>
                    {item.point} pts
                  </Text>
                </View>
                <Text style={styles.clueText}>
                </Text>
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
              </View>

              
            </Pressable>
          </View>
        )}
      />
    </View>
  )
}