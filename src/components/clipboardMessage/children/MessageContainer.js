import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "@rneui/base";

import {COLORS} from "../../../resources/colors";

export const ClipboardMessageView = props => {
    const {name, color, dialogName, chosenMessage, clearClipboard} = props;
    return (
        <View style={styles.container}>
            <View style={styles.actionIcon}>
                <Icon
                    name={name}
                    type="ionicon"
                    color={color}
                    size={30}
                />
            </View>
            <View style={styles.messageWithDialogName}>
                <Text
                    style={(styles.dialogNameText, {color: color})}
                    numberOfLines={1}>
                    {dialogName}
                </Text>
                <Text style={styles.messageText} numberOfLines={1}>
                    {chosenMessage.message
                        ? chosenMessage.message
                        : chosenMessage.resendedMessage}
                </Text>
            </View>
            <TouchableOpacity
                style={styles.closeViewButton}
                activeOpacity={0.6}
                onPress={clearClipboard}>
                <Icon name="close-outline" type="ionicon" color="white" size={26} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: COLORS.charcoal,
        padding: 6,
    },
    actionIcon: {
        justifyContent: 'center',
        paddingRight: 10,
    },
    messageWithDialogName: {
        flex: 1,
        flexDirection: 'column',
    },
    dialogNameText: {
        fontSize: 20,
    },
    messageText: {
        color: COLORS.lavender,
        fontSize: 18,
    },
    closeViewButton: {
        justifyContent: 'center',
    },
})