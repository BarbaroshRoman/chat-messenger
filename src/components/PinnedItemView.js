import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {COLORS} from "../resources/colors";
import Entypo from "react-native-vector-icons/Entypo";

export const PinnedItemView = (props) => {
    return (
        <TouchableOpacity style={styles.pinnedMessageContainer}
                          onPress={props.onPress}
        onLongPress={props.onLongPress}>
            <View style={styles.tableOfContents}>
                <Text style={styles.tableOfContentsText}>{props.title}</Text>
                <Text style={styles.pinnedMessageText} numberOfLines={1}>
                    {props.message}
                </Text>
            </View>
            <View style={styles.pinnedMessageIcon}>
                <Entypo size={24} name='pin'  color={COLORS.lightBlue}/>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    pinnedMessageContainer: {
        flexDirection: "row",
        backgroundColor: COLORS.arsenic,
        minHeight: '8%',
        borderBottomWidth: 0.5,
        borderColor: COLORS.paynesGreyDark,
        paddingLeft: 6,
    },
    tableOfContents: {
        flex: 1,
        borderLeftWidth: 4,
        borderColor: COLORS.paynesGreyDark,
        paddingLeft: 6,
        marginVertical: 6,
    },
    tableOfContentsText: {
        color: COLORS.lightBlue,
    },
    pinnedMessageText: {
        color: COLORS.lightBlue,
    },
    pinnedMessageIcon: {
        justifyContent: "center",
        marginRight: 12,
    },
})