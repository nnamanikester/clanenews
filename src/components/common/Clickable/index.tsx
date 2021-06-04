import React from 'react';
import {TouchableOpacityProps, TouchableOpacity} from 'react-native';

export interface ClickableProps extends TouchableOpacityProps {
  /**
   * Invoked when a click event is performed.
   */
  onClick?: () => void | undefined | Promise<void>;
}

/**
 * A component for createing an area that can be clickable. Can be used to
 * create a button or any other clickable. Accepts all react native TouchableOpacity
 * props except `onPress` and `activeOpacity`. `onPress` is replaced with `onClick`
 */
export const Clickable: React.FC<ClickableProps> = ({onClick, children}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      activeOpacity={0.9}
      hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
      {children}
    </TouchableOpacity>
  );
};
