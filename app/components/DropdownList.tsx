import { useCustomTheme } from '@/hooks/useCustomTheme';
import ICardCategory from '@/interfaces/ICardCategory';
import { IDropdownState } from '@/store';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface IProps {
  dropdown: IDropdownState;
}

const List: React.FC<IProps> = ({ dropdown }) => {
  const theme = useCustomTheme();
  const lastOptions = dropdown.cardCategoriesToShow[Math.max(0, dropdown.cardCategoriesToShow.length - 1)];

  const handleCategoryClick = async (option: ICardCategory) => {
    dropdown.setSelectedCardCategory(option);
    dropdown.setIsOpen(false);
  };

  const styles = StyleSheet.create({
    categoryItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.bg, // Sesuaikan warna dengan bg-bg di kode asli
      padding: 10,
      borderTopWidth: 2,
      borderTopColor: theme.sub,
    },
    categoryItemLast: {
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
    categoryName: {
      fontSize: 16,
      color: theme.text,
    },
    rightContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemCount: {
      marginRight: 10,
      fontSize: 14,
      color: theme.text,
    },
    editIcon: {
      marginTop: 1, 
    },
    addText: {
      padding: 10,
      backgroundColor: theme.bg,
      fontSize: 16,
      borderTopWidth: 2,
      borderTopColor: theme.sub,
      color: theme.main,
    },
    addTextBold: {
      fontWeight: 'bold',
      color: theme.main, // Sesuaikan dengan text-main
    },
  });

  return (
    <View>
      {dropdown.cardCategoriesToShow.length > 0 ? (
        dropdown.cardCategoriesToShow.map((cardCategory) => (
          <TouchableOpacity
            key={cardCategory.id}
            onPress={() => handleCategoryClick(cardCategory)}
            style={[
              styles.categoryItem,
              cardCategory === lastOptions ? styles.categoryItemLast : {},
            ]}
          >
            <Text style={styles.categoryName}>{cardCategory.name}</Text>
            <View style={styles.rightContent}>
              <Text style={styles.itemCount}>{cardCategory.nCard} items</Text>
            </View>
          </TouchableOpacity>
        ))
      ) : (
          <Text style={[styles.addText, styles.categoryItemLast]}>
            <Text style={styles.addTextBold}>{dropdown.searchTerm}</Text>
            <Text style={{color: theme.text }}> not found</Text>
          </Text>
      )}
    </View>
  );
};

export default List;
