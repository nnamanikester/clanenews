import axios from 'axios';
import React from 'react';
import {Alert, ToastAndroid} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import * as UI from '../components/common';
import CustomHeader from '../components/CustomHeader';
import {store, Dispatch} from '../state/store';

export interface CreateNewsScreenProps {
  navigation: any;
}

const CreateNewsScreen: React.FC<CreateNewsScreenProps> = ({navigation}) => {
  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [body, setBody] = React.useState('');
  const [author, setAuthor] = React.useState('');

  // Initialize the dispatch functions
  const dispatch: Dispatch = store.dispatch;

  /**
   * A function to create news.
   * @returns void
   */
  const createNews = async () => {
    // Check if the form inputs are empty
    if (!title || !body || !author) {
      return Alert.alert('Error!', 'All fields are required to create news.');
    }
    setLoading(true);

    // Send the data to the server
    try {
      await axios.post(
        'https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/news',
        {
          title,
          author,
          body,
        },
      );
      setLoading(false);
      // Refetch news after creating new one
      dispatch.news.fetchNewsAsync({page: 1, limit: 10});
      ToastAndroid.show('News created successfully!', ToastAndroid.LONG);
      return navigation.goBack();
    } catch (e) {
      ToastAndroid.show('Error creating news!', ToastAndroid.LONG);
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

      <UI.Layout>
        <UI.Spacer medium />

        <UI.Text h1>Create News</UI.Text>

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

        <Button title="Create News" onPress={createNews} />
      </UI.Layout>
    </>
  );
};

export default CreateNewsScreen;
