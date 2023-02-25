import React from 'react';
import {ImageBackground, Image, Text, View, StyleSheet} from "react-native";
import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import Entypo from "react-native-vector-icons/Entypo";
import {useSelector} from "react-redux";

import {COLORS} from "../resources/colors";

export const CustomDrawer = props => {
    const username = useSelector(state => state.personalData.username);
    const aboutMe = useSelector(state => state.personalData.aboutMe);
    const myPhoto = useSelector(state => state.personalData.myPhoto);
    const myImageBackground = useSelector(state => state.personalData.myImageBackground);


    return (
        <View style={styles.customDrawerContainer}>
            <ImageBackground
                source={{uri: myImageBackground}}
                style={styles.imageBackground}>
                <Image
                    source={{uri: myPhoto}}
                    style={styles.image}/>
                <View style={styles.username}>
                    <Entypo name='user' size={18} color={COLORS.lightBlue} />
                    <Text style={styles.usernameText}>{username}</Text>
                </View>
                <Text style={styles.aboutMeText}>{aboutMe}</Text>
            </ImageBackground>
            <DrawerContentScrollView
                {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    customDrawerContainer: {
        flex: 1,
        backgroundColor: COLORS.arsenic,
    },
    imageBackground: {
        padding: 20
    },
    image: {
        height: 80,
        width: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    username: {
        flexDirection: 'row',
    },
    usernameText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 8,
    },
    aboutMeText: {
        color: COLORS.lightSteelBlue,
    },
})