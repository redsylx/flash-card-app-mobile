import { useCustomTheme } from "@/hooks/useCustomTheme";
import { IDropdownState } from "@/store";
import React, { useEffect, useState } from "react";
import DropdownList from '../components/DropdownList';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList, Modal } from "react-native";

interface IDropdownProps {
  dropdown: IDropdownState;
}

const List = ({ dropdown }: { dropdown: IDropdownState }) => {
  const theme = useCustomTheme();
  const styles = StyleSheet.create({
    dropdownItem: {
      backgroundColor: theme.bg,
      padding: 10,
      borderTopWidth: 2,
      borderTopColor: theme.sub
    },
    itemText: {
      fontSize: 16,
      color: theme.text,
    },
    rowBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={dropdown.cardCategoriesToShow}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.dropdownItem}
          onPress={() => {
            dropdown.setSelectedCardCategory(item);
            dropdown.setIsOpen(false);
          }}
        >
          <View style={ styles.rowBetween }>
          <Text style={styles.itemText}>{item.name}</Text>
          <Text style={styles.itemText}>{item.nCard} items</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const Dropdown: React.FC<IDropdownProps> = ({ dropdown }) => {
  const theme = useCustomTheme();
  useEffect(() => {
    dropdown.setSearchTerm('');
  }, [dropdown.isOpen]);

  useEffect(() => {
    const sortedOptions = dropdown.cardCategories.sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );

    if (!dropdown.searchTerm) {
      dropdown.setCardCategoriesToShow(sortedOptions);
      return;
    }
    dropdown.setCardCategoriesToShow(
      sortedOptions.filter((option) =>
        option.name.toLowerCase().includes(dropdown.searchTerm.toLowerCase())
      ).slice(0, 10)
    );
  }, [dropdown.searchTerm, dropdown.cardCategories]);

  const styles = StyleSheet.create({
    dropdownButton: {
      height: 50,
      backgroundColor: theme.subAlt,
      borderRadius: 8,
      borderWidth: 2,
      paddingHorizontal: 16,
      borderColor: theme.sub,
      width: '100%',
      justifyContent: "center"
    },
    buttonText: {
      fontFamily: "font-regular",
      fontSize: 16,
      color: theme.text,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    dropdownList: {
      backgroundColor: theme.subAlt,
      borderWidth: 2,
      borderColor: theme.sub,
      borderRadius: 8,
      minWidth: 300,
      maxHeight: 300, // Control the height of the dropdown
    },
    searchInput: {
      backgroundColor: theme.bg,
      padding: 10,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      color: theme.text,
      fontFamily: 'font-regular',
      fontSize: 16
    },
    itemCount: {
      marginLeft: 10,
      fontSize: 16,
    },
    rowBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });

  return (
    <View style={{marginBottom: 20}}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => dropdown.setIsOpen(!dropdown.isOpen)}
      >
        <View style={styles.rowBetween}>
          <Text style={styles.buttonText}>
            {dropdown.selectedCardCategory.name}
          </Text>
          <Text style={styles.buttonText}>
            {dropdown.selectedCardCategory.nCard} items
          </Text>
        </View>
      </TouchableOpacity>

      {/* Modal for the dropdown list */}
      <Modal visible={dropdown.isOpen} transparent animationType="none">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => dropdown.setIsOpen(false)}
        >
          <View style={styles.dropdownList}>
            <TextInput
              style={styles.searchInput}
              placeholder="find or create category"
              placeholderTextColor={theme.sub}
              onChangeText={(text) => dropdown.setSearchTerm(text)}
              value={dropdown.searchTerm}
            />
            <DropdownList dropdown={dropdown} />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Dropdown;
