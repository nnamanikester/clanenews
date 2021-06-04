import React from 'react';
import {Card, Icon} from 'react-native-elements';
import {formatDate} from '../../utils/format';
import * as UI from '../common';

export interface NewsCardProps {
  onClick?: () => void;
  id: string;
  title: string;
  date: string;
  author?: string;
  onEdit: (id: string) => void;
}

/**
 * A Card to display the latest news on the HomeScreen
 */
const NewsCard: React.FC<NewsCardProps> = ({
  onClick,
  title,
  date,
  author,
  onEdit,
  id,
}) => {
  return (
    <UI.Clickable onClick={onClick}>
      <Card containerStyle={{borderRadius: 10}}>
        <UI.Block row justify="space-between" center>
          <UI.Block width="75%">
            <UI.Text h3>{title}</UI.Text>
            <UI.Text color="#C4C4C4">{formatDate(date)}</UI.Text>
            <UI.Text color="#C4C4C4">{author}</UI.Text>
          </UI.Block>
          <UI.Clickable onClick={() => onEdit(id)}>
            <Icon name="edit" size={30} color="#2614c1" />
          </UI.Clickable>
        </UI.Block>
      </Card>
    </UI.Clickable>
  );
};

export default NewsCard;
