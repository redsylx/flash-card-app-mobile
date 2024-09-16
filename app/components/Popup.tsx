import { useCustomTheme } from "@/hooks/useCustomTheme";
import { IPopupState } from "@/store";
import { ReactNode } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";

interface PopupProps {
  children: ReactNode,
  popup: IPopupState,
}

const Popup: React.FC<PopupProps> = ({ children, popup }) => {
  const theme = useCustomTheme();
  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      minWidth: 200,
      borderWidth: 2,
      borderColor: theme.sub,
      backgroundColor: theme.subAlt,
      borderRadius: 8,
      padding: 16, // Tambahkan padding agar konten children memiliki ruang
    },
  });

  return (
    <Modal visible={popup.isOpen} transparent animationType="none">
      <TouchableOpacity style={styles.modalOverlay} onPress={() => popup.setIsOpen(false)}>
        <View style={styles.container}>
          {children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default Popup;
