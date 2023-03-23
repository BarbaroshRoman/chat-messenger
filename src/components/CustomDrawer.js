import React from 'react';
import {ImageBackground, Image, Text, View, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useSelector} from 'react-redux';

import {COLORS} from '../resources/colors';

export const CustomDrawer = props => {
  const username = useSelector(state => state.personalData.username);
  const about = useSelector(state => state.personalData.about);
  const photo = useSelector(state => state.personalData.photo);
  const imageBackground = useSelector(
    state => state.personalData.imageBackground,
  );

  return (
    <View style={styles.customDrawerContainer}>
      <ImageBackground
        source={imageBackground && {uri: imageBackground}}
        style={styles.imageBackground}>
        {photo ? (
          <Image source={{uri: photo}} style={styles.image} />
        ) : (
          <Text style={styles.imageText}>БИ</Text>
        )}
        <Text style={styles.usernameText}>{username}</Text>
        <Text style={styles.aboutMeText}>{about}</Text>
      </ImageBackground>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  customDrawerContainer: {
    flex: 1,
    backgroundColor: COLORS.arsenic,
  },
  imageBackground: {
    padding: 20,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  imageText: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 10,
    textAlignVertical: 'center',
    textAlign: 'center',
    backgroundColor: COLORS.grey,
    color: COLORS.white,
    fontSize: 18,
  },
  usernameText: {
    color: COLORS.white,
    fontSize: 16,
  },
  aboutMeText: {
    color: COLORS.lightSteelBlue,
  },
});
