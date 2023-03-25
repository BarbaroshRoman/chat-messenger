import React, {useCallback, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';

import {COLORS} from '../resources/colors';
import {
  addAbout,
  savingUsername,
  settingImageBackground,
  settingPhoto,
} from '../redux/personalData/personalDataSlice';
import {TableOfContentsProfile} from '../components/TableOfContentsProfile';
import {HeaderSettingsComponent} from '../components/header/HeaderSettingsComponent';

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const username = useSelector(state => state.personalData.username);
  const about = useSelector(state => state.personalData.about);

  const [usernameValue, setUsernameValue] = useState(username);
  const [aboutValue, setAboutValue] = useState(about);
  const [photo, setPhoto] = useState('');
  const [imageBackground, setImageBackground] = useState('');

  const goBackHandler = useCallback(() => {
    setPhoto('');
    setImageBackground('');
    navigation.goBack();
  }, [navigation]);

  const savePersonalData = useCallback(() => {
    if (usernameValue) {
      dispatch(savingUsername(usernameValue));
    }

    dispatch(addAbout(aboutValue));

    if (photo) {
      dispatch(settingPhoto(photo));
    }

    if (imageBackground) {
      dispatch(settingImageBackground(imageBackground));
    }
    goBackHandler();
  }, [
    aboutValue,
    dispatch,
    goBackHandler,
    imageBackground,
    photo,
    usernameValue,
  ]);

  const goToPickImage = setImage => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setImage(image.path);
    });
  };

  const uploadImage = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setPhoto(image.path);
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.profileContainer}>
      <HeaderSettingsComponent
        title={'Профиль'}
        goBackHandler={goBackHandler}
        savePersonalData={savePersonalData}
      />
      <TableOfContentsProfile
        title={'Ваше имя:'}
        isTextInput={true}
        value={usernameValue}
        onChangeText={setUsernameValue}
      />
      <TableOfContentsProfile
        title={'О себе:'}
        isTextInput={true}
        isAbout={true}
        value={aboutValue}
        onChangeText={setAboutValue}
      />
      <TableOfContentsProfile
        title={'Установить фото'}
        image={photo}
        setImage={setPhoto}
        goToPickImage={() => goToPickImage(setPhoto)}
        uploadImage={uploadImage}
      />
      <TableOfContentsProfile
        title={'Установить фон'}
        image={imageBackground}
        setImage={setImageBackground}
        goToPickImage={() => goToPickImage(setImageBackground)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: COLORS.charcoal,
  },
});
