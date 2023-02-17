import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';

import {COLORS} from '../resources/colors';

export const MessageView = props => {
    return (
        <View>
            <TouchableHighlight
                style={styles.messageContainer}
                underlayColor={COLORS.lightSteelBlue}
                onPress={() => props.onTouchMessage(props.item)}
                onLongPress={() => {
                    props.setChosenMessage({});
                    props.setChosenMessageForHeader(props.item)
                }}>
                <>
                    {props.item.resended ? (
                        <View style={styles.messageResendLabel}>
                            <Text style={styles.tableOfContents} numberOfLines={1}>
                                {props.item.prevResendedDialogName
                                    ? props.item.prevResendedDialogName
                                    : props.item.resendedDialogName}
                            </Text>
                            <Text style={styles.messageResendText} numberOfLines={1}>
                                {props.item.resendedMessage}
                            </Text>
                        </View>
                    ) : null}
                    {props.item.message && (
                        <Text style={styles.messageText}>{props.item.message}</Text>
                    )}
                    <View style={styles.messageDateContainer}>
                        {props.item.edited && (
                            <Text style={styles.editedMessageLabel}>изменено</Text>
                        )}
                        <Text style={styles.messageDateText}> {props.item.date} </Text>
                    </View>
                </>
            </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
    messageContainer: {
        backgroundColor: COLORS.steelBlue,
        paddingVertical: 4,
        minWidth: '36%',
        paddingHorizontal: 4,
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8,
        borderBottomRightRadius: 8,
        margin: 4,
        marginLeft: 60,
        alignSelf: 'flex-end',
    },
    messageText: {
        fontSize: 18,
        color: 'white',
        paddingLeft: 2,
    },
    messageDateText: {
        color: 'white',
        fontSize: 12,
    },
    messageDateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    messageResendLabel: {
        borderLeftWidth: 4,
        borderColor: COLORS.lightSteelBlue,
        paddingLeft: 4,
    },
    messageResendText: {
        color: 'white',
        paddingEnd: 40,
    },
    tableOfContents: {
        color: COLORS.lightSteelBlue,
        fontSize: 18,
    },
    editedMessageLabel: {
        color: COLORS.lavender,
        fontSize: 12,
    },
});
