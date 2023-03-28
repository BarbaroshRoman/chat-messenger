import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {BottomSheet} from 'react-native-btr';

import {COLORS} from '../../resources/colors';
import {ButtonBottomSheet} from './children/ButtonBottomSheet';

export const ChatScreenBottomSheet = props => {
  const messageHelper = useCallback(
    cb => {
      props.closeBottomSheet();
      cb();
    },
    [props],
  );

  return (
    <BottomSheet
      visible={props.modalVisible}
      onBackButtonPress={props.closeBottomSheet}
      onBackdropPress={props.closeBottomSheet}>
      <View style={styles.bottomSheetContainer}>
        {props.chosenMessage.isPinned ? (
          <ButtonBottomSheet
            isUnpin={true}
            onPress={() => messageHelper(props.unpinMessage)}
            name={'pin-off'}
            color="white"
            text={'Открепить'}
          />
        ) : (
          <>
            {!props.chosenMessage.feedback && (
              <ButtonBottomSheet
                onPress={props.editMessage}
                name={'pencil-outline'}
                color={COLORS.limeGreen}
                text={'Изменить'}
              />
            )}
            <ButtonBottomSheet
              onPress={props.replyToMessage}
              name={'arrow-undo-outline'}
              color={COLORS.orangeRed}
              text={'Ответить'}
            />
            <ButtonBottomSheet
              onPress={props.forwardMessage}
              name={'arrow-redo-outline'}
              color={'white'}
              text={'Переслать'}
            />
            <ButtonBottomSheet
              onPress={() => messageHelper(props.deleteMessage)}
              name={'trash-outline'}
              color={'red'}
              text={'Удалить'}
            />
          </>
        )}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: COLORS.facebookBlue,
    borderWidth: 4,
  },
});
