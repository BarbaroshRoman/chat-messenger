import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from '@rneui/base';

import {COLORS} from '../../../resources/colors';
import {CITY} from '../../../resources/city';

export const SitySelectionContainer = props => {
  const {showCityContainer, selectCity, clearClipboard, loadingStatus} = props;
  if (showCityContainer) {
    return (
      <View style={styles.container}>
        {loadingStatus ? (
          <>
            <ActivityIndicator size="large" />
            <Text style={styles.loadingStatusText}>{loadingStatus}</Text>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.city}
              onPress={() => selectCity(CITY.tiraspol)}>
              <Text style={styles.cityText}>Тирасполь</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.city}
              onPress={() => selectCity(CITY.kishinev)}>
              <Text style={styles.cityText}>Кишинёв</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeViewButton}
              activeOpacity={0.6}
              onPress={clearClipboard}>
              <Icon
                name="close-outline"
                type="ionicon"
                color="white"
                size={26}
              />
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.charcoal,
    padding: 10,
  },
  closeViewButton: {
    justifyContent: 'center',
    padding: 4,
  },
  city: {
    flex: 1,
    paddingLeft: 8,
  },
  cityText: {
    color: COLORS.white,
    fontSize: 24,
  },
  loadingStatusText: {
    flex: 1,
    fontSize: 24,
    color: COLORS.white,
    marginLeft: 8,
  },
});
