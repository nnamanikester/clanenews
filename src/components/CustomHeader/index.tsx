import * as React from 'react';
import {Header} from 'react-native-elements';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import * as UI from '../common';
import logo from '../../../assets/icon.png';

export interface HeaderProps {
  left?: any;
  right?: any;
}

/**
 * Custom Header made from the React Native Elements Header.
 */
const CustomHeader: React.FC<HeaderProps> = ({left}) => {
  return (
    <Header
      centerContainerStyle={{justifyContent: 'center'}}
      containerStyle={{backgroundColor: '#2614c1'}}
      backgroundColor="#2614c1"
      leftComponent={left}
      centerComponent={
        <UI.Block row bottom middle>
          <Avatar source={logo} />
          <UI.Text h1 color="#fff">
            News
          </UI.Text>
        </UI.Block>
      }
    />
  );
};

export default CustomHeader;
