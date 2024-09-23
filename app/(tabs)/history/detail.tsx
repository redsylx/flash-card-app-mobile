import Popup from "@/app/components/Popup";
import errorHandler from "@/errorHandler";
import { getIdToken } from "@/firebase";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { IPaginationResult } from "@/interfaces/IPaginationResult";
import { ISellCardCategory } from "@/interfaces/ISellCardCategory";
import { serviceCardCategoryConvert } from "@/services/ServiceCardCategory";
import { serviceSellCardCategoryGetBuyerList } from "@/services/ServiceSellCardCategory";
import { useAccount, useAlert, useHistoryPopup, useHomeDropdown, useLoading, useStoreHistoryDetail, useStorePopup, useStoreTransaction } from "@/store";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from "react-native"

export default () => {
  const theme = useCustomTheme();
  const sellCardCategory = useStoreHistoryDetail();
  const category = useHomeDropdown();
  const transaction = useStoreTransaction();
  const loading = useLoading();
  const alert = useAlert();
  const popup = useHistoryPopup();
  const { account } = useAccount();
  const [selectedId, setSelectedId ] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
    },
    subcontainerHeader: {
      height: 40,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderBottomColor: theme.subAlt,
      borderBottomWidth: 2,
    },
    subcontainerList: {
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    header: {
      fontFamily: 'font-bold',
      color: theme.text,
      fontSize: 16,
    },
    text: {
      fontFamily: 'font-regular',
      color: theme.text,
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
    ncardText: {
      fontFamily: 'font-regular',
      fontSize: 16,
      color: theme.text,
    },
    accountName: {
      fontFamily: 'font-regular',
      fontSize: 16,
      color: theme.error,
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
    searchInput: {
      backgroundColor: theme.bg,
      padding: 10,
      borderRadius: 8,
      marginBottom: 10,
      color: theme.text,
      fontFamily: 'font-regular',
      fontSize: 16
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

  const getSellCardCategories = async () => {
    const token = await getIdToken();
    const result: IPaginationResult<ISellCardCategory> = await (await serviceSellCardCategoryGetBuyerList(token, transaction.item.id)).json();
    sellCardCategory.setItems(result.items);
  }

  const convert = async (sellCardCateogryId: string, newCategoryName: string) => {
    try {
      loading.setLoading(true)
      const token = await getIdToken();
      await serviceCardCategoryConvert(token, account.id, sellCardCateogryId, newCategoryName);
      category.setRefresh(!category.refresh);
    } catch (error) {
      errorHandler(error, alert)
    }
    finally {
      loading.setLoading(false)
      popup.setIsOpen(false)
    }
  }

  useEffect(() => {
    loading.setLoading(true)
    getSellCardCategories();
    loading.setLoading(false)
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.subcontainerHeader}>
        <View style={{ flex: 2, flexDirection: "row", justifyContent: 'space-between', }}>
          <Text style={styles.text}>Item : {transaction.item.totalItem}</Text>
          <Text style={styles.text}>Point : {transaction.item.totalPoint}</Text>
        </View>
      </View>
      <View style={styles.subcontainerList}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={sellCardCategory.items}
          keyExtractor={(item) => item.id + Math.random()}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 20 }}>
              <View style={styles.cardContainer}>
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
                    <Text style={styles.pointText}>
                      {item.point} pts
                    </Text>
                  </View>
                  <Text style={styles.clueText}>
                  </Text>

                  <Pressable onPress={() => { setSelectedId(item.id); popup.setIsOpen(true); }} style={styles.btnAddCart}>
                    <FontAwesome size={28} name="arrow-right" color={theme.error} />
                  </Pressable>
                </View>
              </View>
            </View>
          )}
        />
      </View>
      <Popup popup={popup}>
        <TextInput
          style={styles.searchInput}
          placeholder="new category name (3-12 char)"
          placeholderTextColor={theme.sub}
          onChangeText={(text) => setNewCategoryName(text)}
          value={newCategoryName}
        />
        <Pressable style={styles.normalButton} onPress={() => convert(selectedId, newCategoryName)}>
          <Text style={styles.textNormalButton}>Convert</Text>
        </Pressable>
      </Popup>
    </View>
  )
}