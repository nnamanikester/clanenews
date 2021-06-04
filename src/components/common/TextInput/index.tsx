import React from 'react';
import {
  TextInput as TI,
  View,
  StyleSheet,
  Platform,
  LayoutAnimation,
  UIManager,
  TextInputProps as TIProps,
  ViewStyle,
  TextStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import {heightPercentageToDP as hd} from 'react-native-responsive-screen';
import {Text} from '../Text';
import {Block} from '../Block';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export interface TextInputProps extends TIProps {
  password?: boolean;
  iconRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
  error?: boolean;
  type?: 'normal' | 'disabled' | 'outline' | 'ghost' | 'underline';
  shape?: 'normal' | 'rounded';
  rows?: number;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  floatLabel?: boolean;
}

export const TextInput: React.FC<TextInputProps> = props => {
  const {
    onFocus,
    onBlur,
    onEndEditing,
    password,
    rows,
    iconRight,
    iconLeft,
    error,
    type,
    shape,
    containerStyle,
    floatLabel,
    placeholder,
    inputStyle,
  } = props;

  let iconLeftStyle: ViewStyle = {
    paddingLeft: iconLeft ? 50 : 10,
  };
  let iconRightStyle: ViewStyle = {
    paddingRight: iconRight ? 50 : 10,
  };
  const errorStyle: TextStyle = error
    ? {color: '#DD4B39', borderColor: '#DD4B39'}
    : {};
  let shapeStyle: ViewStyle = {
    borderRadius: shape === 'rounded' ? 50 : shape === 'normal' ? 15 : 15,
  };
  let typeStyle: TextStyle = {};
  let editable = true;

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      borderRadius: 10,
    },
    input: {
      borderWidth: 1.5,
      borderColor: '#C4C4C4',
      borderRadius: 5,
      height: hd('6%'),
      color: '#111111',
      fontSize: hd('1.7%'),
      fontFamily: 'Nexa-Light',
      paddingHorizontal: 10,
      flex: 1,
      backgroundColor: 'transparent',
    },
    iconLeft: {
      alignItems: 'center',
      paddingHorizontal: 10,
      position: 'absolute',
      left: 5,
      zIndex: 10,
    },
    iconRight: {
      alignItems: 'center',
      paddingHorizontal: 10,
      position: 'absolute',
      right: 5,
      zIndex: 10,
    },
  });

  const [active, setActive] = React.useState(false);

  switch (type) {
    case 'disabled':
      editable = false;
      break;
    case 'outline':
      typeStyle = {
        borderWidth: 1,
        borderColor: '#2614c1',
      };
      break;
    case 'ghost':
      typeStyle = {
        elevation: 2,
      };
      break;
    case 'underline':
      typeStyle = {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: '#111111',
      };
      break;
    default:
      typeStyle = {};
      break;
  }

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    LayoutAnimation.easeInEaseOut();
    if (onFocus) {
      onFocus(e);
    }
    return setActive(true);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (onBlur) {
      onBlur(e);
    }
    return setActive(false);
  };

  React.useEffect(() => {
    LayoutAnimation.easeInEaseOut();
  }, [active]);

  return (
    <View style={{marginTop: active ? 5 : 0, ...containerStyle}}>
      {floatLabel && active ? (
        <Block style={{paddingLeft: 10, marginBottom: -10, zIndex: 1}}>
          <Text size={hd('1.7%')} color="#2614c1">
            {placeholder}
          </Text>
        </Block>
      ) : null}
      <View style={{...styles.container}}>
        {iconLeft ? <View style={{...styles.iconLeft}}>{iconLeft}</View> : null}
        <TI
          onEndEditing={onEndEditing}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={password}
          numberOfLines={rows}
          textBreakStrategy="highQuality"
          placeholderTextColor={active ? 'transparent' : '#676767'}
          editable={editable}
          style={{
            ...styles.input,
            ...inputStyle,
            ...iconLeftStyle,
            ...iconRightStyle,
            ...errorStyle,
            ...typeStyle,
            ...shapeStyle,
            borderColor: active
              ? '#2614c1'
              : error
              ? '#DD4B39'
              : type === 'underline'
              ? '#676767'
              : '#2614c1',
          }}
          {...props}
        />
        {iconRight ? (
          <View style={{...styles.iconRight}}>{iconRight}</View>
        ) : null}
      </View>
    </View>
  );
};
