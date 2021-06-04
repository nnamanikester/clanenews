import React from 'react';
import {View, ViewProps, ViewStyle} from 'react-native';
import {heightPercentageToDP as hd} from 'react-native-responsive-screen';

export interface SpacerProps extends ViewProps {
  large?: boolean;
  small?: boolean;
  medium?: boolean;
  horizontal?: boolean;
  vertical?: boolean;
  size?: number;
}

export const Spacer: React.FC<SpacerProps> = ({
  children,
  large,
  size = 5,
  small,
  medium,
  horizontal,
  vertical,
}) => {
  let value: ViewStyle = {
    margin: small
      ? hd('0.8%')
      : medium
      ? hd('1.2%')
      : large
      ? hd('2.4%')
      : size,
  };

  if (horizontal) {
    value = {
      marginHorizontal: small
        ? hd('0.8%')
        : medium
        ? hd('1.2%')
        : large
        ? hd('2.4%')
        : size,
    };
  }
  if (vertical) {
    value = {
      marginVertical: small
        ? hd('0.8%')
        : medium
        ? hd('12%')
        : large
        ? hd('2.4%')
        : size,
    };
  }

  return <View style={value}>{children}</View>;
};
