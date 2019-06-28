import React from 'react';
import styled from 'styled-components';

const CommentItem = styled.div`
  padding: 20px;
  border-top: 1px solid #efefef;
  font-size: 20px;
  line-height: 28px;
  color: #000;
`;

const TextItem = styled.div`
  font-size: 1.25rem;
  color: #000;
`;

const Sender = styled.span``;

const CommentPoints = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  color: #63bc36;
`;

const Tag = styled.span`
  color: #aaaaaa;
`;

const CommentListItem = props => {
  const { comment } = props;

  return (
    <CommentItem>
      <TextItem>
        <Sender>{comment.sender}: </Sender>
        <span>
          {comment.text.map((item, index) => {
            if (item.type === 'points') {
              return <CommentPoints key={index}>{item.text} </CommentPoints>;
            }
            if (item.type === 'tags') {
              return <Tag key={index}>{item.text} </Tag>;
            }
            return <span key={index}>{item.text} </span>;
          })}
        </span>
      </TextItem>
    </CommentItem>
  );
};

export default CommentListItem;
