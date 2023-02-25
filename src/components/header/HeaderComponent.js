import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import {COLORS} from '../../resources/colors';
import {LeftHeaderButton} from "./children/LeftHeaderButton";
import {CenterHeaderIcon} from "./children/CenterHeaderIcon";
import {MenuHeaderModal} from "./children/MenuHeaderModal";
import {RightHeaderButton} from "./children/RightHeaderButton";

export const HeaderComponent = props => {
    return (
        <View style={styles.container}>
            {props.goBackHandler ? (
                <LeftHeaderButton isGoBack={true} goBackHandler={props.goBackHandler}/>
            ) : (
                <LeftHeaderButton isGoBack={false} openDrawer={props.openDrawer}/>
            )}
            {props.chosenItem.dialogName || props.chosenItem.date ? (
                <View style={styles.actionOnMessageButtons}>
                    <CenterHeaderIcon
                        onPress={props.deleteItem}
                        name={"trash-outline"}
                        color={"red"}
                    />
                    <CenterHeaderIcon
                        isPin={true}
                        onPress={props.pinItem}
                        name={"pin"}
                        color={"white"}
                    />
                    {props.chosenItem.date && (
                        <>
                            <CenterHeaderIcon
                                onPress={props.replyToMessage}
                                name={"arrow-undo-outline"}
                                color={"white"}
                            />
                            <CenterHeaderIcon
                                onPress={props.editMessage}
                                name={"pencil-outline"}
                                color={"white"}
                            />
                            <CenterHeaderIcon
                                onPress={props.forwardMessage}
                                name={"arrow-redo-outline"}
                                color={"white"}
                            />
                        </>
                    )}
                </View>
            ) : (
                <Text style={styles.headerText} numberOfLines={1}>
                    {props.chosenMessageForForwarding.sentToAnotherDialog
                        ? 'Переслать в ...'
                        : props.title}
                </Text>
            )}
            <MenuHeaderModal
                headerMenu={props.headerMenu}
                closeModalHeaderMenu={props.closeModalHeaderMenu}
                clearMessages={props.clearMessages}
                currentMessagesList={props.currentMessagesList}
                openModalCreatingDialog={props.openModalCreatingDialog}
                pinnedDialog={props.pinnedDialog}
                unpinDialog={props.unpinDialog}
            />
            {!props.chosenMessageForForwarding.sentToAnotherDialog && (
                <RightHeaderButton
                    setChosenItem={props.setChosenItem}
                    openModalHeaderMenu={props.openModalHeaderMenu}
                    name={"ellipsis-vertical"}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: COLORS.arsenic,
        height: 50,
        borderBottomWidth: 0.5,
        borderColor: COLORS.paynesGreyDark,
    },
    actionOnMessageButtons: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 4,
        justifyContent: 'space-between',
    },
    headerText: {
        flex: 1,
        alignSelf: 'center',
        color: COLORS.white,
        fontSize: 20,
        paddingLeft: 14,
    },
});
