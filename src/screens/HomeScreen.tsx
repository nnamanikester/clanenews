import * as React from 'react';
import {Alert, FlatList} from 'react-native';
import {FAB, Icon, Button} from 'react-native-elements';
import * as UI from '../components/common';
import {connect} from 'react-redux';
import CustomHeader from '../components/CustomHeader';
import NewsCard from '../components/NewsCard';
import {RootState, store, Dispatch} from '../state/store';

export interface HomeScreenProps {
  navigation: any;
}

type Props = HomeScreenProps & ReturnType<typeof mapStateToProps>;

const HomeScreen: React.FC<Props> = ({navigation, news}) => {
  // A state that keeps count of fech retires and helps in refetching news
  const [retryCount, setRetryCount] = React.useState(0);
  // Initial page for pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  // Initialize dispatch functions
  const dispatch: Dispatch = store.dispatch;

  /**
   * A function that helps in navigation to the next page if available
   */
  const nextPage = () => {
    if (news.length > 9) {
      setCurrentPage(currentPage + 1);
    }
  };

  /**
   * A function that helps in returning to previous pages if available
   */
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  /**
   * A funtion that hleps to fetch news from the server and try
   * to refetch the news if it fails
   * @param page number
   */
  const fetchNews = async (page: number) => {
    setLoading(true);
    try {
      await dispatch.news.fetchNewsAsync({page, limit: 10});
      setLoading(false);
    } catch (e) {
      Alert.alert(
        'Request Failed!',
        'Unable to fetch latest news! Please check if you are connected to the internet and try again.',
        [
          {text: 'Try again', onPress: () => setRetryCount(retryCount + 1)},
          {text: 'Cancel', style: 'cancel'},
        ],
      );
      setLoading(false);
    }
  };

  React.useEffect(() => {
    // Fetching the news passing the current page
    fetchNews(currentPage);
  }, [retryCount, currentPage]);

  // Key extractor for the news items
  const keyExtractor = (item: any, index: number) => index.toString();

  /**
   * A function to render the news items
   * @returns
   */
  const renderItem = ({item}: any) => (
    <NewsCard
      onClick={() => navigation.navigate('SingleNews', {id: item.id})}
      title={item.title}
      date={item.createdAt}
      author={item.author}
      id={item.id}
      onEdit={id => navigation.navigate('EditNews', {id})}
    />
  );

  return (
    <>
      <UI.Loading show={loading} />

      <CustomHeader />

      <FlatList
        keyExtractor={keyExtractor}
        data={news}
        renderItem={renderItem}
        ListEmptyComponent={
          <UI.Block flex>
            <UI.Text h1 color="#676767">
              No News Available!
            </UI.Text>
          </UI.Block>
        }
        ListFooterComponent={
          <>
            <UI.Spacer large />
            <UI.Block
              justify="space-between"
              row
              style={{paddingHorizontal: 15}}
              width="auto">
              <Button
                onPress={prevPage}
                disabled={currentPage == 1}
                buttonStyle={{width: '100%', height: 50}}
                containerStyle={{width: '40%'}}
                title="Previous"
              />
              <UI.Spacer medium />
              <Button
                onPress={nextPage}
                disabled={news.length < 10}
                buttonStyle={{width: '100%', height: 50}}
                containerStyle={{width: '40%'}}
                title="Next"
              />
            </UI.Block>
            <UI.Spacer size={50} />
          </>
        }
      />

      <FAB
        onPress={() => navigation.navigate('CreateNews')}
        placement="right"
        color="#2614c1"
        icon={<Icon name="add" color="#fff" size={30} />}
      />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  news: state.news,
});

export default connect(mapStateToProps)(HomeScreen);
