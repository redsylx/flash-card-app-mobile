import React from 'react';
import { View, ActivityIndicator, Modal, StyleSheet, Text } from 'react-native';
import { useLoading } from '@/store';
import { useCustomTheme } from '@/hooks/useCustomTheme';

const LoadingOverlay = () => {
  const { isLoading } = useLoading();
  const theme = useCustomTheme();

  const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.bg,
      opacity: 0.5
    },
    activityIndicatorWrapper: {
      backgroundColor: '#FFFFFF',
      height: 100,
      width: 100,
      borderRadius: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
    },
  });

  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={isLoading}
      onRequestClose={() => { }}>
      <View style={styles.modalBackground}>
        <ActivityIndicator size={'large'} color={theme.main} />
      </View>
    </Modal>
  );
};

export default LoadingOverlay;
