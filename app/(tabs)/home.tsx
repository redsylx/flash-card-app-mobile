import React, { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, FlatList, Image, Animated, TouchableOpacity, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { useAccount, useHomeCard, useHomeDropdown } from "@/store";
import { getIdToken } from "@/firebase";
import ICardCategory, { defaultCardCategory } from "@/interfaces/ICardCategory";
import { serviceCardCategoryGetList } from "@/services/ServiceCardCategory";
import { serviceCardGetList } from "@/services/ServiceCard";
import Dropdown from "../components/Dropdown";
import Card from "../components/Card";

const CardItem = ({ title, imageUri, description }: { title: string; imageUri?: string; description: string }) => {
  const theme = useCustomTheme();
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current; // Animation value to track the flip

  const flipToBack = () => {
    setIsFlipped(true);
  };

  const flipToFront = () => {
    setIsFlipped(false);
  };

  const flipCard = () => {
    if (isFlipped) {
      flipToFront();
    } else {
      flipToBack();
    }
  };

  const styles = StyleSheet.create({
    card: {
      height: 200,
      padding: 16,
      marginBottom: 20,
      borderWidth: 2,
      borderRadius: 8,
      borderColor: theme.sub
    },
    cardText: {
      fontFamily: 'font-regular', // Apply custom font here
      color: theme.text,
      fontSize: 32
    },
    image: {
      width: 150,
      height: 150,
      marginBottom: 10,
      borderRadius: 10,
    },
    description: {
      fontFamily: 'font-regular',
      color: theme.text,
      fontSize: 24
    },
    cardFront: {
      backgroundColor: theme.subAlt,
      borderRadius: 10,
      padding: 20,
      position: 'absolute',
    },
    cardBack: {
      backgroundColor: theme.subAlt,
      borderRadius: 10,
      padding: 20,
      position: 'absolute',
    },
  });

  return (
    <Pressable onPress={flipCard}>
      <View style={styles.card}>
        { !isFlipped 
        ? 
        <Text style={styles.cardText}>{title}</Text>
        : <Text style={styles.description}>{description}</Text>}
      </View>
    </Pressable>
  );
}

export default () => {
  const [ firstRender, setFirstRender ] = useState(true);
  const [ firstRender2, setFirstRender2 ] = useState(true);
  const theme = useCustomTheme();
  const dropdown = useHomeDropdown();
  const {account} = useAccount();
  const card = useHomeCard();

  useEffect(() => {
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
      setFirstRender(false);
    };

    if(firstRender && dropdown.cardCategories.length != 0) setFirstRender(false)
    else fetchCardCategories();
  }, [dropdown.refresh]);

  useEffect(() => {
    const fetchCards = async (categoryId: string) => {
      setFirstRender2(false)
      if (!categoryId) return;
      const token = await getIdToken();
      const cards = (await (await serviceCardGetList(token, categoryId, "SortOrder=desc")).json()).items;
      card.setItems(cards);
    };

    if(firstRender2 && dropdown.cardCategories.length != 0) setFirstRender2(false)
    else fetchCards(dropdown.selectedCardCategory.id);
  }, [dropdown.selectedCardCategory, card.refresh, dropdown.refresh]);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.bg,
      paddingHorizontal: 20,
      paddingTop: 10,
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
