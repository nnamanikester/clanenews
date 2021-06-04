import axios from 'axios';
import React from 'react';
import {Image} from 'react-native';
import {FAB, Icon} from 'react-native-elements';
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

type ImageType = {
  id: string;
  image: string;
  createdAt: string;
  newsId: string;
};

type CommentType = {
  id: string;
  avatar: string;
  createdAt: string;
  comment: string;
  name: string;
  newsId: string;
};

type Props = SingleNewsScreenProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const SingleNewsScreen: React.FC<Props> = ({navigation, route, news}) => {
  const {id} = route.params;
  const post = news.find(item => item.id == id);
  const [loading, setLoading] = React.useState(false);
  const [images, setImages] = React.useState<ImageType[]>([]);
  const [comments, setComments] = React.useState<CommentType[]>([]);

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

  const getComments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/news/${id}/comments`,
      );
      setComments(res.data);
      setLoading(false);
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

          {images.length > 0 && (
            <>
              <Swiper loop={false} style={{height: 200}}>
                {images.map(image => (
                  <Image
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
                onEdit={id => {}}
              />
              <UI.Spacer medium />
            </>
          ))}

        <UI.Spacer size={50} />
      </UI.Layout>

      <FAB
        onPress={() => {}}
        placement="right"
        color="#2614c1"
        icon={<Icon name="comment" color="#fff" size={30} />}
      />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  news: state.news,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchNewsAsync: () => dispatch.news.fetchNewsAsync(),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleNewsScreen);
