import React from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {COLORS} from '../../resources/colors';
import {ModalCreatingDialogButtons} from './children/ModalCreatingDialogButtons';

export const ModalCreatingDialog = props => {
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
          <View>
            <ModalCreatingDialogButtons
              onPress={props.goToPickUserAvatar}
              title={'Добавить фото'}
              userAvatar={props.userAvatar}
            />
          </View>
          <View>
            <ModalCreatingDialogButtons
              onPress={props.createDialog}
              title={'Создать'}
            />
            <ModalCreatingDialogButtons
              onPress={props.closeModalCreatingDialog}
              title={'Отменить'}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

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
    color: COLORS.white,
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
    color: COLORS.white,
    borderColor: COLORS.white,
  },
  buttonsModalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    marginTop: 20,
  },
});
