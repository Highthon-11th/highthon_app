import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native';
import PlusIcon from '../../assets/plusIcon.png'
import ArrowIcon from '../../assets/arrow_back_ios.png';
import { title3 } from '../styles/typography/title';

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  return (
      <View style={styles.container}>
        <View style={styles.Wrapper}>
          <View style={styles.arrowBox}>
            <Image source={ArrowIcon} style={styles.arrowIcon} />
            <Text style={title3}>{title}</Text>
          </View>
             <Image source={PlusIcon} style={styles.plusIcon} />
        </View>
      
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems:'center',
      justifyContent: 'center',
       width: '100%',
       height: 50,
    },
    Wrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems:'center',
      justifyContent: 'space-between',
      width:362,
      height:30,
   
    },
    arrowBox: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'space-between',
      width:74,
      height:24,
      
    },
    arrowIcon : {
      width: 9,
      height: 16,
      
    },
    plusIcon: {
      width:20,
      height:20
    },
})
export default Header;