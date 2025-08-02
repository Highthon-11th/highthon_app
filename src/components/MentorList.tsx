import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { body3, body2 } from '../styles/typography/body';
import { title3 } from '../styles/typography/title';
import { Mentor } from '@/screens/AddMentor';

const MentorList: React.FC<{ mentors: Mentor[] }> = ({ mentors }) => {
  return (
    <View style={styles.wrapper}>
      {mentors.map(mentor => (
        <View key={mentor.id} style={styles.card}>
          <View style={styles.imageBox}>
            {mentor.profileImageUrl ? (
              <Image
                source={{ uri: mentor.profileImageUrl }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.placeholderImage} />
            )}
          </View>
          <View style={styles.cardContent}>
            <View style={styles.cardTopBox}>
              <Text style={title3}>{mentor.name}</Text>
            </View>
            <View style={styles.cardBottomBox}>
              <Text style={[body2, { color: '#747474' }]}>
                "안녕하세요 당신의 멘토입니다."
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
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

export default MentorList;
