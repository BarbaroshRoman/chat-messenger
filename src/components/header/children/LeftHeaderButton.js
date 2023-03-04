import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon} from '@rneui/base';

import {COLORS} from '../../../resources/colors';

export const LeftHeaderButton = props => {
  const {isGoBack, goBackHandler, openDrawer} = props;
  return (
    <View style={styles.leftIcon}>
      <TouchableOpacity onPress={isGoBack ? goBackHandler : openDrawer}>
        <Icon
          size={26}
          name={isGoBack ? 'arrow-back-outline' : 'list-outline'}
          type="ionicon"
          color={COLORS.lightBlue}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  leftIcon: {
    justifyContent: 'center',
    padding: 8,
    marginVertical: 4,
    marginRight: 10,
  },
});
