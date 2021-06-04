import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  ViewProps,
} from 'react-native';
import {
  widthPercentageToDP as wd,
  heightPercentageToDP as hd,
} from 'react-native-responsive-screen';

export interface LoadingProps extends ViewProps {
  show: boolean;
}

export const Loading: React.FC<LoadingProps> = ({show = false}) => {
  if (!show) {
    return null;
  }

  const styles = StyleSheet.create({
    background: {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      position: 'absolute',
      marginTop: hd('45%'),
      borderRadius: 10,
      width: '90%',
      height: 100,
      flex: 1,
      zIndex: 999999,
      // backgroundColor: '#fff',
    },
  });

  return (
    <View style={[styles.background]}>
      <StatusBar backgroundColor="#2614c1" />
      <ActivityIndicator color="#2614c1" size={wd('15%')} />
    </View>
  );
};
