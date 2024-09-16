import { useCustomTheme } from "@/hooks/useCustomTheme";
import { IAlertState, IPopupState } from "@/store";
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AlertProps {
  alert: IAlertState,
}

const Alert: React.FC<AlertProps> = ({ alert }) => {
  const theme = useCustomTheme();
  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      minWidth: 300,
      maxWidth: 300,
      minHeight: 200,
      borderWidth: 2,
      borderColor: theme.error,
      backgroundColor: theme.bg,
      borderRadius: 8,
      padding: 16, // Tambahkan padding agar konten children memiliki ruang
    },
    title: {
      fontFamily: 'font-bold',
      fontSize: 16,
      color: theme.text,
    },
    message: {
      fontFamily: 'font-regular',
      fontSize: 16,
      color: theme.text,
    },
    button: {
      backgroundColor: theme.error,
      paddingVertical: 8,
      borderRadius: 4,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      fontFamily: 'font-regular',
      fontSize: 16,
      color: theme.bg,
    },
    rowBetween: {
      flex: 2,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  });

  return (
    <Modal visible={alert.isOpen} transparent animationType="none">
      <TouchableOpacity style={styles.modalOverlay}>
        <View style={styles.container}>
          <View style={styles.rowBetween}>
            <View>
            <Text style={styles.title}>{alert.title}</Text>
            <Text style={styles.message}>{alert.message}</Text>
            </View>
            <Pressable onPress={alert.onClick} style={styles.button}>
              <Text style={styles.buttonText}>close</Text>
            </Pressable>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default Alert;
