import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import ICard from '@/interfaces/ICard';
import { useHomeCard } from '@/store';
import { useCustomTheme } from '@/hooks/useCustomTheme';

interface ICardProps {
  card: ICard;
}

const Card: React.FC<ICardProps> = ({ card }) => {
  const theme = useCustomTheme();
  const cardState = useHomeCard();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(cardState.openedItem.id === card.id);
  }, [cardState.openedItem]);

  const onClick = () => {
    if (card.id === cardState.openedItem.id) {
      setOpen(!open);
    } else {
      cardState.setOpenedItem(card);
    }
  };

  const styles = StyleSheet.create({
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
      opacity: 0.25,
    },
    overlayClosed: {
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
    descriptionText: {
      fontFamily: 'font-regular',
      fontSize: 24,
      color: theme.text,
      textShadowColor: theme.bg,
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 5,
    },
    clueText: {
      fontFamily: 'font-bold',
      fontSize: 32,
      color: theme.text,
    },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginTop: 'auto',
    },
    frequencyText: {
      fontSize: 16,
      color: '#fff',
    },
    correctText: {
      fontSize: 16,
      color: theme.main, // Warna teks persentase benar
    },
  });

  return (
    <TouchableOpacity onPress={onClick} style={styles.cardContainer}>
      <ImageBackground
        source={{ uri: card.clueImgUrl }}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        <View style={open ? styles.overlayOpen : styles.overlayClosed} />
      </ImageBackground>

      <View style={styles.cardBorder} />

      <View style={styles.cardContent}>
        {open ? (
          <Text style={styles.descriptionText}>
            {card.descriptionTxt}
          </Text>
        ) : (
          <View>
            <Text style={styles.clueText}>{card.clueTxt}</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.frequencyText}>{card.nFrequency}x</Text>
              <Text style={styles.correctText}>
                {Math.round((card.pctCorrect ?? 0) * 100)}%
              </Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Card;
