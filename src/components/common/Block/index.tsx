import React from 'react';
import {View, StyleSheet, ViewProps, ViewStyle} from 'react-native';

export interface BlockProps extends ViewProps {
  justify?:
    | 'flex-start'
    | 'space-around'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-evenly';
  row?: boolean;
  center?: boolean;
  middle?: boolean;
  right?: boolean;
  left?: boolean;
  bottom?: boolean;
  top?: boolean;
  flex?: boolean;
  width?: number | string;
  height?: number | string;
  backgroundColor?: string;
  absolute?: boolean;
  styles?: object;
}

const Block: React.FC<BlockProps> = ({
  children,
  justify = 'flex-start',
  row,
  center,
  middle,
  right,
  left,
  bottom,
  top,
  flex,
  width,
  height,
  backgroundColor,
  absolute,
  style,
}) => {
  let blockStyles: ViewStyle = {};

  if (justify) {
    blockStyles.justifyContent = justify;
  }
  if (flex) {
    blockStyles.flex = 1;
  }
  if (row) {
    blockStyles.flexDirection = 'row';
  }
  if (center) {
    blockStyles.alignItems = 'center';
    blockStyles.alignSelf = 'center';
  }
  if (top) {
    if (row) {
      blockStyles.justifyContent = 'flex-start';
    } else {
      blockStyles.alignItems = 'flex-start';
      blockStyles.alignSelf = 'flex-start';
    }
  }
  if (middle) {
    blockStyles.justifyContent = 'center';
    blockStyles.alignItems = 'center';
    blockStyles.alignSelf = 'center';
  }
  if (bottom) {
    if (row) {
      blockStyles.alignItems = 'flex-end';
      blockStyles.alignSelf = 'flex-end';
    } else {
      blockStyles.justifyContent = 'flex-end';
    }
  }
  if (right) {
    if (row) {
      blockStyles.justifyContent = 'flex-end';
    } else {
      blockStyles.alignItems = 'flex-end';
    }
  }
  if (left) {
    if (row) {
      blockStyles.justifyContent = 'flex-start';
    } else {
      blockStyles.alignItems = 'flex-start';
    }
  }
  // check

  const styless = StyleSheet.create({
    block: {
      position: absolute ? 'absolute' : 'relative',
      width: width || '100%',
      height: height || 'auto',
      flex: flex ? 1 : 0,
      backgroundColor: backgroundColor || 'transparent',
    },
  });

  return (
    <>
      <View style={[styless.block, blockStyles, style]}>{children}</View>
    </>
  );
};

export {Block};
