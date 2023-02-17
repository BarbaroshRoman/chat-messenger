import React from "react";
import {Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

import {COLORS} from "../resources/colors";

export const ModalCreatingDialog = (props) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.creationDialog}
            onRequestClose={props.closeModalCreatingDialog}>
            <View style={styles.modalDialogContainer}>
                <Text style={styles.modalHeaderText}>Название диалога</Text>
                <TextInput
                    style={styles.inputModal}
                    value={props.dialogNameValue}
                    onChangeText={props.setDialogNameValue}
                    placeholder="Введите название диалога..."
                    placeholderTextColor="white"
                    multiline
                />
                <View style={styles.buttonsModalContainer}>
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={props.closeModalCreatingDialog}>
                        <Text style={styles.buttonText}>Отменить</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.createButton}
                        onPress={props.createDialog}>
                        <Text style={styles.buttonText}>Создать</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalDialogContainer: {
        backgroundColor: COLORS.paynesGrey,
        marginTop: '50%',
        paddingVertical: 15,
        paddingHorizontal: 16,
        marginHorizontal: 8,
        borderRadius: 4,
        elevation: 20,
    },
    modalHeaderText: {
        color: 'white',
        fontSize: 20,
        marginBottom: 10,
        marginLeft: 12,
    },
    inputModal: {
        fontSize: 16,
        paddingLeft: 6,
        marginVertical: 2,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        color: 'white',
        borderColor: 'white',
    },
    buttonsModalContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 4,
        marginTop: 20,
    },
    cancelButton: {
        backgroundColor: COLORS.fireBrick,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 4,
        elevation: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    createButton: {
        backgroundColor: COLORS.cyberGrape,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginRight: 14,
        marginLeft: 30,
        borderRadius: 4,
        elevation: 10,
    },
})