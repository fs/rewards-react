import React from 'react';
import styled from 'styled-components';

const CommentItem = styled.div`
  padding: 20px;
  border-top: 1px solid #efefef;
  font-size: 20px;
  line-height: 28px;
  color: #000;
`;

const CommentAuthor = styled.span``;

const BonusCount = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  color: #63bc36;
`;

const CommentTag = styled.span`
  color: #aaaaaa;
`;

const CommentListItem = () => (
  <CommentItem>
    <CommentAuthor />
    <BonusCount />
    <CommentTag />
  </CommentItem>
);

export default CommentListItem;
