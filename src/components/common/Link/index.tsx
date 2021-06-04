import React from 'react';
import {Linking, StyleSheet, TextStyle} from 'react-native';
import {Text} from '../Text';
import {Clickable, ClickableProps} from '../Clickable';

export interface LinkProps extends ClickableProps {
  /**
   * A string containing a destination url. same with href
   */
  to?: string;
  /**
   * Style to be applied to link text
   */
  textStyle?: TextStyle;
  /**
   * Color of the text
   */
  color?: string;
}

export const Link: React.FC<LinkProps> = ({
  children,
  to,
  textStyle,
  onClick,
  style,
  color,
}) => {
  const styles = StyleSheet.create({
    link: {
      width: 'auto',
    },
  });

  return (
    <Clickable
      style={[styles.link, style]}
      onClick={to ? () => Linking.openURL(to) : onClick}>
      <Text style={textStyle} color={color || '#2614c1'}>
        {children}
      </Text>
    </Clickable>
  );
};
