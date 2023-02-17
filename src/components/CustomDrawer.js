import React from 'react';
import {ImageBackground, Image, Text, View, StyleSheet} from "react-native";
import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import Entypo from "react-native-vector-icons/Entypo";

import {COLORS} from "../resources/colors";

export const CustomDrawer = props => {
    return (
        <View style={styles.customDrawerContainer}>
            <ImageBackground
                source={require('../resources/Images/space.jpg')}
                style={styles.imageBackground}>
                <Image
                    source={require('../resources/Images/photo.jpg')}
                    style={styles.image}/>
                <View style={styles.username}>
                    <Entypo name='user' size={18} color={COLORS.lightBlue} />
                    <Text style={styles.usernameText}>Рома</Text>
                </View>
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
})