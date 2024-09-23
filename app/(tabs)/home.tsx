import React, { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, FlatList, Image, Animated, TouchableOpacity, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { useAccount, useHomeCard, useHomeDropdown, useLoading } from "@/store";
import { getIdToken } from "@/firebase";
import ICardCategory, { defaultCardCategory } from "@/interfaces/ICardCategory";
import { serviceCardCategoryGetList } from "@/services/ServiceCardCategory";
import { serviceCardGetList } from "@/services/ServiceCard";
import Dropdown from "../components/Dropdown";
import Card from "../components/Card";
import ICard, { defaultCard, emptyCard } from "@/interfaces/ICard";

export default () => {
  const theme = useCustomTheme();
  const dropdown = useHomeDropdown();
  const {account} = useAccount();
  const card = useHomeCard();
  const loading = useLoading();

  const fetchCardCategories = async () => {
    const token = await getIdToken();
    const categories : ICardCategory[] = await (await serviceCardCategoryGetList(token, account.id)).json();
    const defaultCategory = (categories.find(p => p.name === "default")) || (categories.length > 0 ? categories[0] : defaultCardCategory);
    dropdown.setCardCategories(categories);
    dropdown.setPrevSelectedCardCategory(dropdown.selectedCardCategory);
    dropdown.setSelectedCardCategory(
      dropdown.selectedCardCategory.name
        ? categories.find(p => p.id === dropdown.selectedCardCategory.id) || defaultCategory
        : defaultCategory
    );
  };

  const fetchCards = async (categoryId: string) => {
    if (!categoryId) return;
    const token = await getIdToken();
    const cards : ICard[] = (await (await serviceCardGetList(token, categoryId, "SortOrder=desc")).json()).items;
    if(cards.length == 0) cards.push(emptyCard);
    card.setItems(cards);
  };

  useEffect(() => {
    fetchCardCategories();
  }, [dropdown.refresh]);


  useEffect(() => {
    fetchCards(dropdown.selectedCardCategory.id);
  }, [dropdown.selectedCardCategory, card.refresh, dropdown.refresh]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    modalSelector: {
      backgroundColor: theme.subAlt,
      borderRadius: 5,
    },
    modalText: {
      fontFamily: 'font-regular',
      color: theme.text,
    },
    itemCount: {
      fontFamily: 'font-regular',
      color: theme.text,
      fontSize: 18,
    },
    card: {
      backgroundColor: theme.subAlt,
      borderRadius: 10,
      padding: 20,
      marginBottom: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    cardText: {
      color: theme.text,
      fontSize: 16,
    },
  });

  return (
    <View style={styles.container}>
      <Dropdown dropdown={dropdown}/>
      <FlatList
      
        showsVerticalScrollIndicator={false}
        data={card.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{marginBottom: 20}}>
            <Card card={item}/>
          </View>
        )}
      />
    </View>
  );
};
