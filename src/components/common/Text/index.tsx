import React from 'react';
import {
  Text as TXT,
  StyleSheet,
  TextProps as TXTProps,
  TextStyle,
} from 'react-native';
import {
  widthPercentageToDP as wd,
  heightPercentageToDP as hd,
} from 'react-native-responsive-screen';

export interface TextProps extends TXTProps {
  /**
   * Used to change the font size of the `Text`. Default is `16`.
   */
  size?: number;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  bold?: boolean;
  color?: string;
  note?: boolean;
}

/**
 * A component for displaying texts which supports
 */
export const Text: React.FC<TextProps> = ({
  h1 = false,
  h2 = false,
  h3 = false,
  bold = false,
  note = false,
  size,
  children,
  color,
  style,
}) => {
  const styles = StyleSheet.create({
    text: {
      color: '#111111',
      fontSize: hd('1.7%'),
      fontFamily: 'Nexa-Light',
      lineHeight: hd('2%'),
    },
  });

  const textStyle: TextStyle = {};

  if (h1) {
    textStyle.fontSize = hd('2.5%');
    textStyle.fontFamily = 'Nexa-Light';
    textStyle.lineHeight = hd('3');
    textStyle.fontFamily = 'Nexa-Bold';
  } else if (h2) {
    textStyle.fontFamily = 'Nexa-Light';
    textStyle.fontSize = hd('2%');
    textStyle.fontFamily = 'Nexa-Bold';
    textStyle.lineHeight = hd('3%');
  } else if (h3) {
    textStyle.fontFamily = 'Nexa-Light';
    textStyle.fontSize = hd('1.8%');
    textStyle.lineHeight = hd('2%');
    textStyle.fontFamily = 'Nexa-Bold';
  } else if (note) {
    textStyle.color = '#E0E0E0';
    textStyle.fontSize = hd('1.3%');
  } else if (size) {
    textStyle.fontSize = size;
    textStyle.lineHeight = size + 5;
  }

  if (color) {
    textStyle.color = color;
  } else {
    textStyle.color = '#111111';
  }

  if (bold) {
    textStyle.fontFamily = 'Nexa-Bold';
  }

  return <TXT style={[styles.text, textStyle, style]}>{children}</TXT>;
};
