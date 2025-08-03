import React from 'react';
import { User } from '@lib/types/User.ts';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { title3 } from '@styles/typography/title.ts';
import { body2 } from '@styles/typography/body.ts';
import { useNavigation } from '@react-navigation/native';

interface Props {
  data: User;
  chatRoomId: string;
}

const MentoringCard = ({ data, chatRoomId }: Props) => {
  const navgation = useNavigation();

  return (
    <TouchableOpacity
      key={data.id}
      style={styles.card}
      onPress={() => {
        navgation.navigate('Chat', { chatRoomId, user: data });
      }}
    >
      <View style={styles.imageBox}>
        {data.profileImageUrl ? (
          <Image
            source={{ uri: data.profileImageUrl }}
            style={styles.profileImage}
          />
        ) : (
          <View style={styles.placeholderImage} />
        )}
      </View>
      <View style={styles.cardContent}>
        <View style={styles.cardTopBox}>
          <Text style={title3}>{data.name}</Text>
        </View>
        <View style={styles.cardBottomBox}>
          <Text style={[body2, { color: '#747474' }]}>{data.introduce}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 362,
    height: '100%',
    marginTop: 20,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    height: 76,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    marginBottom: 10,
  },
  imageBox: {
    width: 55,
    height: 55,
    borderRadius: 8,
    backgroundColor: '#D9D9D9',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#D9D9D9',
    borderRadius: 8,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    width: 286,
    height: 42,
  },
  cardTopBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 21,
    width: 286,
  },
  cardBottomBox: {
    display: 'flex',
    height: 17,
    width: 286,
  },
});

export default MentoringCard;
