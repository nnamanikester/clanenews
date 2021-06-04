import axios from 'axios';
import React from 'react';
import {Alert, Image, ToastAndroid} from 'react-native';
import {FAB, Icon, Button} from 'react-native-elements';
import Swiper from 'react-native-swiper';
import {heightPercentageToDP as hd} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import Comment from '../components/Comment';
import * as UI from '../components/common';
import CustomHeader from '../components/CustomHeader';
import {RootState} from '../state/store';
import {formatDate} from '../utils/format';

export interface SingleNewsScreenProps {
  navigation: any;
  route: any;
}

// Image Type
type ImageType = {
  id: string;
  image: string;
  createdAt: string;
  newsId: string;
};

// Comment Type
type CommentType = {
  id: string;
  avatar: string;
  createdAt: string;
  comment: string;
  name: string;
  newsId: string;
};

type Props = SingleNewsScreenProps & ReturnType<typeof mapStateToProps>;

const SingleNewsScreen: React.FC<Props> = ({navigation, route, news}) => {
  // Get the ID from the route params and find a single news from list of news
  const {id} = route.params;
  const post = news.find(item => item.id == id);

  // Initialize states
  const [loading, setLoading] = React.useState(false);
  const [images, setImages] = React.useState<ImageType[]>([]);
  const [comments, setComments] = React.useState<CommentType[]>([]);
  const [showAddComment, setShowAddComment] = React.useState(false);
  const [showEditComment, setShowEditComment] = React.useState(false);
  const [commentCreateData, setCommentCreateData] = React.useState({
    newsId: id,
    avatar: 'http://lorempixel.com/640/480/fashion',
    comment: '',
    name: '',
  });
  const [commentUpdateData, setCommentUpdateData] = React.useState({
    newsId: id,
    id: '',
    avatar: 'http://lorempixel.com/640/480/fashion',
    comment: '',
    name: '',
  });

  /**
   * A function that fetches the images belonging to a news
   */
  const getImages = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/news/${id}/images`,
      );
      setImages(res.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  /**
   * A funtion that fetches the comments associated to a news
   */
  const getComments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/news/${id}/comments`,
      );
      setComments(
        // Sort and update the commets to the commets state
        res.data.sort(
          (a: CommentType, b: CommentType) => a.createdAt < b.createdAt,
        ),
      );
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  /**
   * Handles the onEdit event of the Comment Component
   * @param id strin
   */
  const onClickEditComment = (id: string) => {
    const comment = comments.find(c => c.id == id);
    if (comment) {
      setCommentUpdateData({
        ...commentUpdateData,
        name: comment.name,
        comment: comment.comment,
        avatar: comment.avatar,
        id,
      });
    }
    setShowEditComment(true);
  };

  /**
   * Handles the onDelete Event of the comment component
   * @param commentId string
   */
  const onClickDeleteComment = (commentId: string) => {
    Alert.alert(
      // Warn before deleting
      'Warning!',
      'Are you sure you want to delete this commnet?\nNote: Action cannot be undone!',
      [
        {
          text: 'Delete',
          onPress: async () => {
            setLoading(true);
            // Sending a delete request to the server
            try {
              await axios.delete(
                `https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/news/${id}/comments/${commentId}`,
              );
              setLoading(false);
              getComments();
              ToastAndroid.show(
                'Comment deleted successfully!',
                ToastAndroid.LONG,
              );
            } catch (e) {
              setLoading(false);
            }
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };

  /**
   * A function that handles the creating of new comment for a particular news
   * @returns void
   */
  const createComment = async () => {
    // Check if the required inputs were provided
    if (!commentCreateData.name || !commentCreateData.comment) {
      return Alert.alert(
        'Error!',
        'All fields are required to create comment.',
      );
    }
    setLoading(true);
    // Send data to the server
    try {
      await axios.post(
        `https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/news/${id}/comments/`,
        commentCreateData,
      );
      setLoading(false);
      // Refetch comments after creating new one
      getComments();
      ToastAndroid.show('Comment added successfully!', ToastAndroid.LONG);
      setShowAddComment(false);
      // Empty the inputs
      setCommentCreateData({...commentCreateData, name: '', comment: ''});
    } catch (e) {
      setLoading(false);
    }
  };

  /**
   * A function to update an existing comment
   * @returns void
   */
  const updateComment = async () => {
    // Validate inputs
    if (!commentUpdateData.name || !commentUpdateData.comment) {
      return Alert.alert(
        'Error!',
        'All fields are required to create comment.',
      );
    }
    setLoading(true);
    // Send data to the server
    try {
      await axios.put(
        `https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/news/${id}/comments/${commentUpdateData.id}`,
        commentUpdateData,
      );
      setLoading(false);
      // Refetch comments after updating
      getComments();
      ToastAndroid.show('Comment updated successfully!', ToastAndroid.LONG);
      setShowEditComment(false);
      // Reset the inputs
      setCommentUpdateData({
        ...commentUpdateData,
        name: '',
        comment: '',
        id: '',
      });
    } catch (e) {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getImages();
    getComments();
  }, []);

  return (
    <>
      <UI.Loading show={loading} />
      <CustomHeader
        left={
          <UI.Clickable onClick={() => navigation.goBack()}>
            <Icon size={30} name="arrow-back" color="#fff" />
          </UI.Clickable>
        }
      />

      <UI.Layout itemsToFloat={[1]}>
        <UI.Block>
          <UI.Spacer medium />
          {/* DISPLAYING POST IMAGES IN SLIDES IF ANY */}
          {images.length > 0 && (
            <>
              <Swiper loop={false} style={{height: 200}}>
                {images.map(image => (
                  <Image
                    key={image.id}
                    style={{width: '100%', height: hd('20%')}}
                    source={{uri: image.image}}
                  />
                ))}
              </Swiper>
            </>
          )}
        </UI.Block>

        <UI.Block backgroundColor="#FFFDFD">
          <UI.Spacer medium />

          <UI.Text h1>{post?.title}</UI.Text>

          <UI.Block row>
            <UI.Text color="#C4C4C4">{post?.author}</UI.Text>
            <UI.Spacer />
            <UI.Text color="#C4C4C4" note>
              {formatDate(post?.createdAt)}
            </UI.Text>
          </UI.Block>

          <UI.Spacer medium />
        </UI.Block>

        <UI.Block>
          <UI.Text>{post?.body}</UI.Text>
        </UI.Block>

        <UI.Spacer large />

        <UI.Text h3>Comments ({comments.length})</UI.Text>

        <UI.Spacer medium />

        {/* LISTING THE COMMENTS FOR THE NEWS */}
        {comments.length > 0 &&
          comments.map(item => (
            <>
              <Comment
                id={item.id}
                key={item.id}
                name={item.name}
                avatar={item.avatar}
                comment={item.comment}
                date={item.createdAt}
                onEdit={onClickEditComment}
                onDelete={onClickDeleteComment}
              />
              <UI.Spacer medium />
            </>
          ))}

        <UI.Spacer size={50} />
      </UI.Layout>

      {/* FLOATING ACTION BUTTON TO CREATE NEW COMMENT */}
      <FAB
        onPress={() => setShowAddComment(true)}
        placement="right"
        color="#2614c1"
        icon={<Icon name="comment" color="#fff" size={30} />}
      />

      {/* MODAL FOR CREATING NEW COMMENT */}
      <UI.Modal show={showAddComment}>
        <UI.Block>
          <UI.Block row justify="space-between">
            <UI.Text h3>Add Comment</UI.Text>
            <UI.Clickable onClick={() => setShowAddComment(false)}>
              <Icon name="close" size={30} color="#676767" />
            </UI.Clickable>
          </UI.Block>
          <UI.TextInput
            type="underline"
            floatLabel
            autoCapitalize="words"
            placeholder="Name"
            value={commentCreateData.name}
            onChangeText={val =>
              setCommentCreateData({...commentCreateData, name: val})
            }
          />

          <UI.Spacer medium />

          <UI.TextInput
            type="underline"
            floatLabel
            placeholder="Comment"
            value={commentCreateData.comment}
            onChangeText={val =>
              setCommentCreateData({...commentCreateData, comment: val})
            }
          />

          <UI.Spacer large />

          <Button title="Add Comment" onPress={createComment} />
        </UI.Block>
      </UI.Modal>

      {/* MODAL FOR UPDATING A COMMENT */}
      <UI.Modal show={showEditComment}>
        <UI.Block>
          <UI.Block row justify="space-between">
            <UI.Text h3>Edit Comment</UI.Text>
            <UI.Clickable onClick={() => setShowEditComment(false)}>
              <Icon name="close" size={30} color="#676767" />
            </UI.Clickable>
          </UI.Block>
          <UI.TextInput
            type="underline"
            floatLabel
            autoCapitalize="words"
            placeholder="Name"
            value={commentUpdateData.name}
            onChangeText={val =>
              setCommentUpdateData({...commentUpdateData, name: val})
            }
          />

          <UI.Spacer medium />

          <UI.TextInput
            type="underline"
            floatLabel
            placeholder="Comment"
            value={commentUpdateData.comment}
            onChangeText={val =>
              setCommentUpdateData({...commentUpdateData, comment: val})
            }
          />

          <UI.Spacer large />

          <Button title="Update Comment" onPress={updateComment} />
        </UI.Block>
      </UI.Modal>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  news: state.news,
});

export default connect(mapStateToProps)(SingleNewsScreen);
