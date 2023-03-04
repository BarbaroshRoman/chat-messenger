import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Icon} from '@rneui/base';

import {COLORS} from '../../../resources/colors';

export const RightHeaderButton = props => {
  const {setChosenItem, openModalHeaderMenu, name} = props;
  return (
    <View
      style={styles.iconEllipsisVertical}
      onTouchEnd={() => setChosenItem({})}>
      <TouchableOpacity onPress={openModalHeaderMenu}>
        <Icon size={26} name={name} type="ionicon" color={COLORS.lightBlue} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  iconEllipsisVertical: {
    padding: 8,
    marginVertical: 4,
    marginLeft: 20,
  },
});
