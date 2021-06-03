import * as React from 'react';
import {Platform, View, Text} from 'react-native';
import {connect, MapStateToProps} from 'react-redux';
import {RootState, Dispatch} from '../state/store';

export interface HomeScreenProps {
  navigation: any;
}

type Props = HomeScreenProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const isIOS = Platform.OS === 'ios';

const HomeScreen: React.FC<Props> = ({navigation, news, fetchNewsAsync}) => {
  console.log(news);

  React.useEffect(() => {
    fetchNewsAsync();
  }, []);

  return (
    <>
      <View>
        <Text>News</Text>
      </View>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  news: state.news,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchNewsAsync: () => dispatch.news.fetchNewsAsync(),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
