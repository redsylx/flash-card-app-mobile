import { getIdToken } from "@/firebase";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { IPaginationResult } from "@/interfaces/IPaginationResult";
import { ISellCard } from "@/interfaces/ISellCard";
import { serviceSellCardGetList } from "@/services/ServiceSellCard";
import { useStoreCard, useStoreDetailCard } from "@/store";
import { useEffect, useState } from "react";
import { FlatList, ImageBackground, StyleSheet, Text, View } from "react-native"

export default () => {
  const theme = useCustomTheme();
  const sellCardCategory = useStoreCard();
  const sellCard = useStoreDetailCard();
  const [category, setCategory] = useState(sellCardCategory.item);

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
            <View style={styles.overlayOpen} />
          </ImageBackground>
        </View>

      }
      <Text style={styles.title}>{category.name}</Text>
      <Text style={styles.text}>point: {category.point}</Text>
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
  )
}