import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

import {COLORS} from '../resources/colors';

export const PinnedItemView = props => {
  return (
    <TouchableOpacity
      style={styles.pinnedMessageContainer}
      onPress={props.onPress}
      onLongPress={props.onLongPress}>
      <View style={styles.tableOfContents}>
        <Text style={styles.tableOfContentsText}>{props.title}</Text>
        <Text style={styles.pinnedMessageText} numberOfLines={1}>
          {props.message}
        </Text>
      </View>
      <View style={styles.pinnedMessageIcon}>
        {props.userAvatar && (
          <Image source={{uri: props.userAvatar}} style={styles.avatar} />
        )}
        <Entypo size={24} name="pin" color={COLORS.lightBlue} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pinnedMessageContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.arsenic,
    minHeight: '8%',
    borderBottomWidth: 0.5,
    borderColor: COLORS.paynesGreyDark,
    paddingLeft: 6,
  },
  tableOfContents: {
    flex: 1,
    borderLeftWidth: 4,
    borderColor: COLORS.paynesGreyDark,
    paddingLeft: 6,
    marginVertical: 6,
  },
  tableOfContentsText: {
    color: COLORS.lightBlue,
  },
  pinnedMessageText: {
    color: COLORS.lightBlue,
  },
  pinnedMessageIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 40,
    marginVertical: 4,
    marginHorizontal: 20,
  },
});
