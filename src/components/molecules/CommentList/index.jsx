import React from 'react';
import styled from 'styled-components';
import CommentListItem from '../../atoms/CommentListItem';

const List = styled.div``;

const CommentList = ({ commentList }) => (
  <List data-testid="test-comment-list">
    <CommentListItem />
    <CommentListItem />
    {/*{commentList.map(item => (*/}
    {/*<CommentListItem comment={item} key={item.id} />*/}
    {/*))}*/}
  </List>
);

export default CommentList;
