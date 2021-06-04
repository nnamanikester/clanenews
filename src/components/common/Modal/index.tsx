import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import {Clickable, ClickableProps} from '../Clickable';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export interface ModalProps extends ClickableProps {
  show: boolean;
  onBackgroundClick?: () => void;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 150,
    width: '90%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
  },
  background: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 9999,
    backgroundColor: '#000b',
  },
});

export const Modal: React.FC<ModalProps> = ({
  children,
  show = false,
  style,
  onBackgroundClick = () => {},
}) => {
  if (!show) {
    return null;
  }

  React.useMemo(() => {
    LayoutAnimation.easeInEaseOut();
  }, [show]);

  return (
    <Clickable
      activeOpacity={1}
      onPressIn={onBackgroundClick}
      style={[styles.background]}>
      <View style={[styles.container, style]}>{children}</View>
    </Clickable>
  );
};
