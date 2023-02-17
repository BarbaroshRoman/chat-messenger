import React from 'react';
import {Modal, StyleSheet, View} from "react-native";

import {ButtonsModal} from "./ButtonsModal";

export const MenuHeaderModal = props => {
    const {
        headerMenu,
        closeModalHeaderMenu,
        clearMessages,
        currentMessagesList,
        openModalCreatingDialog,
        pinnedDialog,
        unpinDialog,
    } = props;
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={headerMenu}
            onRequestClose={closeModalHeaderMenu}>
            <View style={styles.modalView} onTouchEnd={closeModalHeaderMenu}>
                {clearMessages ? (
                    <ButtonsModal
                        onPress={clearMessages}
                        currentMessagesList={currentMessagesList}
                        isChatModal={true}
                        name={"trash-outline"}
                        buttonText={"Очистить историю"}
                    />
                ) : (
                    <>
                        <ButtonsModal
                            onPress={openModalCreatingDialog}
                            isChatModal={false}
                            name={"chatbubbles-outline"}
                            buttonText={"Создать новый диалог"}
                        />
                        {pinnedDialog.isPinned && (
                            <ButtonsModal
                                isChatModal={false}
                                isUnpin={true}
                                onPress={unpinDialog}
                                name={"pin-off-outline"}
                                buttonText={"Открепить диалог"}
                            />)}
                    </>
                )}
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        alignItems: 'flex-end',
        marginTop: 50,
    },
})
