import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from '@rneui/base';

import {COLORS} from '../../resources/colors';

export const HeaderSettingsComponent = props => {
  return (
    <View style={styles.container}>
      <View style={styles.leftIcon}>
        <TouchableOpacity onPress={props.goBackHandler}>
          <Icon
            size={26}
            name={'arrow-back-outline'}
            type="ionicon"
            color={COLORS.lightBlue}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.headerText} numberOfLines={1}>
        {props.title}
      </Text>
      <TouchableOpacity
        style={styles.saveProfileChanges}
        onPress={props.savePersonalData}>
        <Text style={styles.saveProfileChangesText}>Сохранить</Text>
      </TouchableOpacity>
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
  leftIcon: {
    justifyContent: 'center',
    padding: 8,
    marginVertical: 4,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
    alignSelf: 'center',
    color: COLORS.white,
    fontSize: 20,
    paddingLeft: 14,
  },
  saveProfileChanges: {
    justifyContent: 'center',
    paddingRight: '4%',
  },
  saveProfileChangesText: {
    color: COLORS.white,
    fontSize: 14,
  },
});
