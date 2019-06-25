import React from 'react';
import styled from 'styled-components';
import CommentListItem from '../../atoms/CommentListItem';

const List = styled.div``;

const CommentList = ({ commentList }) => (
  <List data-testid="test-bonus-list">
    {commentList.map(comment => (
      <CommentListItem comment={comment} key={comment.id} />
    ))}
  </List>
);

export default CommentList;
