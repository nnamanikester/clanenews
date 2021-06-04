import axios from 'axios';
import React from 'react';
import {Alert, ToastAndroid} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import * as UI from '../components/common';
import CustomHeader from '../components/CustomHeader';
import {store, Dispatch} from '../state/store';

export interface EditNewsScreenProps {
  navigation: any;
  route: any;
}

const EditNewsScreen: React.FC<EditNewsScreenProps> = ({navigation, route}) => {
  // Get the news ID from the route
  const {id} = route.params;

  // Redirect back if 'id' is not found
  if (!id) {
    return navigation.goBack();
  }
  // Initialize dispatch functions
  const dispatch: Dispatch = store.dispatch;

  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [body, setBody] = React.useState('');
  const [author, setAuthor] = React.useState('');

  /**
   * A function that fetchs the news and populates the form for editing.
   */
  const getNews = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/news/${id}`,
      );
      setLoading(false);
      setTitle(res.data.title);
      setAuthor(res.data.author);
      setBody(res.data.body);
    } catch (e) {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    // Fetch the news
    getNews();
  }, []);

  /**
   * A function that updates the news to the server
   * @returns void
   */
  const updateNews = async () => {
    // Check if inputs are empty
    if (!title || !body || !author) {
      return Alert.alert('Error!', 'All fields are required to update news.');
    }
    setLoading(true);
    try {
      await axios.put(
        `https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/news/${id}`,
        {
          title,
          author,
          body,
        },
      );
      setLoading(false);
      // Refetch the news and return back to the HomeScreen
      dispatch.news.fetchNewsAsync({page: 1, limit: 10});
      ToastAndroid.show('News updated successfully!', ToastAndroid.LONG);
      return navigation.goBack();
    } catch (e) {
      ToastAndroid.show('Error updating news!', ToastAndroid.LONG);
      setLoading(false);
    }
  };

  return (
    <>
      <UI.Loading show={loading} />

      <CustomHeader
        left={
          <UI.Clickable onClick={() => navigation.goBack()}>
            <Icon name="arrow-back" color="#fff" size={30} />
          </UI.Clickable>
        }
      />

      <UI.Layout onRefresh={getNews}>
        <UI.Spacer medium />

        <UI.Text h1>Update News</UI.Text>

        <UI.Spacer medium />

        <UI.TextInput
          type="underline"
          floatLabel
          placeholder="Author"
          value={author}
          onChangeText={val => setAuthor(val)}
        />

        <UI.Spacer large />

        <UI.TextInput
          type="underline"
          floatLabel
          placeholder="News title"
          value={title}
          onChangeText={val => setTitle(val)}
          autoCapitalize="words"
          autoCorrect
        />

        <UI.Spacer large />

        <UI.TextInput
          inputStyle={{maxHeight: 200, height: 200}}
          type="underline"
          floatLabel
          placeholder="News body"
          value={body}
          onChangeText={val => setBody(val)}
          autoCorrect
          multiline
        />

        <UI.Spacer large />

        <Button title="Update News" onPress={updateNews} />
      </UI.Layout>
    </>
  );
};

export default EditNewsScreen;
