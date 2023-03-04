import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import React from 'react';
import {Icon} from '@rneui/base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {COLORS} from '../../../resources/colors';

export const ButtonsModal = props => {
  const {onPress, isChatModal, currentMessagesList, name, buttonText, isUnpin} =
    props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.modalMenuButton,
        isChatModal && {
          opacity: currentMessagesList.messagesList.length ? 1 : 0.5,
        },
      ]}
      disabled={isChatModal && currentMessagesList.messagesList.length === 0}>
      <View>
        {isUnpin ? (
          <MaterialCommunityIcons
            size={24}
            name={name}
            color={COLORS.lightBlue}
            style={styles.unpinIcon}
          />
        ) : (
          <Icon
            size={24}
            name={name}
            type="ionicon"
            color={COLORS.lightBlue}
            paddingLeft={4}
            paddingRight={4}
          />
        )}
      </View>
      <Text style={styles.modalMenuText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  modalMenuButton: {
    flexDirection: 'row',
    padding: 12,
    elevation: 20,
    backgroundColor: COLORS.arsenic,
  },
  modalMenuText: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 14,
    paddingHorizontal: 8,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  unpinIcon: {
    paddingLeft: 4,
    paddingRight: 4,
  },
});
