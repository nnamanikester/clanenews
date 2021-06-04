import React from 'react';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {formatDate} from '../../utils/format';
import * as UI from '../common';

export interface CommentProps {
  onEdit: (id: string) => void;
  comment: string;
  avatar: string;
  date: string;
  name: string;
  id: string;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  onEdit,
  avatar,
  date,
  name,
  id,
}) => {
  return (
    <>
      <UI.Block row center justify="space-between">
        <UI.Block row width="auto">
          <Avatar size="medium" rounded source={{uri: avatar}} />
          <UI.Spacer />
          <UI.Block width="75%">
            <UI.Text bold>{name}</UI.Text>
            <UI.Spacer size={3} />
            <UI.Text>{comment}</UI.Text>
            <UI.Text color="#C4C4C4">{formatDate(date)}</UI.Text>
          </UI.Block>
        </UI.Block>
        <UI.Block width="auto">
          <UI.Clickable onClick={() => onEdit(id)}>
            <Icon color="#2614c1" name="edit" />
          </UI.Clickable>
        </UI.Block>
      </UI.Block>
    </>
  );
};

export default Comment;
