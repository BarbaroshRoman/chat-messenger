import React, {useCallback, useState} from "react";
import {StyleSheet, ScrollView} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import ImagePicker from 'react-native-image-crop-picker';

import {COLORS} from "../resources/colors";
import {
    addAboutMe,
    savingUsername,
    settingMyImageBackground,
    settingMyPhoto
} from "../redux/personalData/personalDataSlice";
import {TableOfContentsProfile} from "../components/TableOfContentsProfile";
import {HeaderSettingsComponent} from "../components/header/HeaderSettingsComponent";

export const ProfileScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const username = useSelector(state => state.personalData.username);
    const aboutMe = useSelector(state => state.personalData.aboutMe);

    const [usernameValue, setUsernameValue] = useState(username);
    const [aboutMeValue, setAboutMeValue] = useState(aboutMe);
    const [myPhoto, setMyPhoto] = useState('');
    const [myImageBackground, setMyImageBackground] = useState('');


    const goBackHandler = useCallback(() => {
        setMyPhoto('');
        setMyImageBackground('');
        navigation.goBack();
    }, [navigation]);

    const savePersonalData = () => {
        if (usernameValue) {
            dispatch(savingUsername(usernameValue));
        }

        dispatch(addAboutMe(aboutMeValue));

        if (myPhoto) {
            dispatch(settingMyPhoto(myPhoto))
        }

        if (myImageBackground) {
            dispatch(settingMyImageBackground(myImageBackground))
        }
        goBackHandler();
    };

    const goToPickImage = (setImage) => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
            setImage(image.path)
        });
    };

    const uploadImage = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            console.log(image);
            setMyPhoto(image.path)
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
                isAboutMe={true}
                value={aboutMeValue}
                onChangeText={setAboutMeValue}
            />
            <TableOfContentsProfile
                title={'Установить фото'}
                myImage={myPhoto}
                setMyImage={setMyPhoto}
                goToPickImage={() => goToPickImage(setMyPhoto)}
                uploadImage={uploadImage}
            />
            <TableOfContentsProfile
                title={'Установить фон'}
                myImage={myImageBackground}
                setMyImage={setMyImageBackground}
                goToPickImage={() => goToPickImage(setMyImageBackground)}
            />
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        backgroundColor: COLORS.charcoal,
    },
})