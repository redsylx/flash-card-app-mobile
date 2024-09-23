import { getIdToken } from "@/firebase";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { IPaginationResult } from "@/interfaces/IPaginationResult";
import { ISellCard } from "@/interfaces/ISellCard";
import { serviceSellCardGetList } from "@/services/ServiceSellCard";
import { useStoreCard, useStoreCart, useStoreCartDetail, useStoreDetailCard } from "@/store";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"

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
    scrollView: {
      flexGrow: 1,
    },
    fixView: {
      height: 60
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
    buttonRemoveCart: {
      width: 100,
      backgroundColor: theme.error,
      paddingHorizontal: 20,
      alignItems: "center",
      justifyContent: "center"
    },
    buttonAddCart: {
      width: 100,
      backgroundColor: theme.main,
      paddingHorizontal: 20,
      alignItems: "center",
      justifyContent: "center"
    },
    subtitle: {
      fontFamily: 'font-regular',
      color: theme.error,
    },
    description: {
      fontFamily: 'font-regular',
      textAlign: 'left',
      color: theme.text,
      marginTop: 20,
      marginBottom: 20,
    },
    statsContainer: {
      flexDirection: 'row',
      backgroundColor: theme.subAlt,
      borderRadius: 8,
      justifyContent: 'space-around',
      paddingVertical: 10,
      marginBottom: 20,
    },
    stat: {
      alignItems: 'center',
    },
    statLabel: {
      fontFamily: 'font-regular',
      color: theme.text,
      fontSize: 12,
    },
    statValue: {
      fontFamily: 'font-bold',
      fontSize: 16,
      color: theme.text,
    },
    previewLabel: {
      fontFamily: 'font-regular',
      color: theme.text,
      fontSize: 16,
      marginBottom: 10,
    },
    previewContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      borderRadius: 8,
      marginBottom: 20,
      width: '100%'
    },
    cardImageContainer: {
      width: 100,
      height: 100,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    cardImage: {
      width: 100,
      height: 100,
      borderRadius: 8,
      marginRight: 10,
    },
    cardImageEmpty: {
      width: 100,
      height: 100,
      borderRadius: 8,
      marginRight: 10,
      borderWidth: 2,
      borderColor: theme.subAlt,
      backgroundColor: theme.bg
    },
    cardTitle: {
      fontFamily: 'font-bold',
      color: theme.text,
      fontWeight: 'bold',
      fontSize: 16,
    },
    cardDescription: {
      fontFamily: 'font-regular',
      color: theme.text,
      fontSize: 12,
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
      <ScrollView style={styles.scrollView}>
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
          <Text style={styles.subtitle}>{category.account.username}</Text>
          <Text style={styles.description}>{category.description}</Text>

          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>card</Text>
              <Text style={styles.statValue}>{category.nCard}</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>sold</Text>
              <Text style={styles.statValue}>{category.sold}x</Text>
            </View>
          </View>

          <Text style={styles.previewLabel}>Preview</Text>
          <View>
            {sellCard.items.map((item, index) => (
              <View style={styles.previewContainer} key={index}>
                {
                  item.clueImg != ""
                    ? <View>
                      <Image source={{ uri: item.clueImgUrl }} style={styles.cardImage} />
                    </View>
                    : <View style={styles.cardImageEmpty} />
                }
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{item.clueTxt}</Text>
                  <Text style={styles.cardDescription}>{item.descriptionTxt}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
      <View style={styles.fixView}>
        <View style={styles.containerBottomView}>
          <View style={{ flex: 2, flexDirection: 'row', backgroundColor: theme.subAlt, paddingHorizontal: 20, alignItems: "center" }}>
            <Text style={styles.point}>{category.point}</Text>
            <Text style={styles.textPts}>pts</Text>
          </View>
          {cartDetail.items.length > 0 && cartDetail.items.find(p => p.id == category.id)
            ?
            <Pressable onPress={() => cart.removeCart(category.id)} style={styles.buttonRemoveCart}>
              <FontAwesome size={28} name="trash" color={theme.bg} />
            </Pressable>
            :
            <Pressable onPress={() => cart.addCart(category.id)} style={styles.buttonAddCart}>
              <FontAwesome size={28} name="plus-circle" color={theme.bg} />
            </Pressable>
          }
        </View>
      </View>
    </View>
  )
}