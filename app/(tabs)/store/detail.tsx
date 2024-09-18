import { getIdToken } from "@/firebase";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { IPaginationResult } from "@/interfaces/IPaginationResult";
import { ISellCard } from "@/interfaces/ISellCard";
import { serviceSellCardGetList } from "@/services/ServiceSellCard";
import { useStoreCard, useStoreCart, useStoreCartDetail, useStoreDetailCard } from "@/store";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native"

export default () => {
  const theme = useCustomTheme();
  const sellCardCategory = useStoreCard();
  const sellCard = useStoreDetailCard();
  const cartDetail = useStoreCartDetail();
  const cart = useStoreCart();
  const [category, setCategory] = useState(sellCardCategory.item);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
    },
    text: {
      fontFamily: 'font-regular',
      color: theme.text,
    },
    textPts: {
      fontFamily: 'font-regular',
      color: theme.text,
    },
    title: {
      fontSize: 32,
      fontFamily: 'font-bold',
      color: theme.text,
    },
    cardText: {
      fontFamily: 'font-regular',
      color: theme.text,
      fontSize: 16,
    },
    cardContainer: {
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
    containerBottom: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 15,
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
      {
        category.imgUrl != "" &&
        <View style={styles.cardContainer}>
          <ImageBackground
            source={{ uri: category.imgUrl }}
            style={styles.imageBackground}
            imageStyle={styles.imageStyle}
          >
          </ImageBackground>
        </View>

      }
      <View style={{ paddingHorizontal: 20, flex: 1, paddingTop: 10 }}>
        <Text style={styles.title}>{category.name}</Text>
        <View style={styles.containerBottom}>
          <View style={styles.containerBottomView}>
            <View style={{ flex: 2, flexDirection: 'row', backgroundColor: theme.subAlt, paddingHorizontal: 20, alignItems: "center" }}>
              <Text style={styles.point}>{category.point}</Text>
              <Text style={styles.textPts}>pts</Text>
            </View>
            {cartDetail.items.length > 0 && cartDetail.items.find(p => p.id == category.id)
              ?
              <Pressable onPress={() => cart.removeCart(category.id)} style={{ backgroundColor: theme.error, paddingHorizontal: 20, alignItems: "center", justifyContent: "center" }}>
                <FontAwesome size={28} name="trash" color={theme.bg} />
              </Pressable>
              :
              <Pressable onPress={() => cart.addCart(category.id)}>
                <Text>Add to Cart</Text>
              </Pressable>
            }
          </View>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={sellCard.items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.text}>{item.clueTxt}</Text>
            </View>
          )}
        />
      </View>
    </View>
  )
}