import React from 'react';
import styled from 'styled-components';
import TimeAgo from 'timeago-react';
import commentService from '../../../services/CommentService';
import CommentListItem from '../../atoms/CommentListItem';
import SendCommentForm from '../SendCommentForm';

const BonusContainer = styled.div`
  margin-bottom: 1.25rem;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  color: #000;
`;

const BonusHeader = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 1.25rem 1.25rem 0;
`;

const TotalPoints = styled.div`
  padding: 0 1rem;
  height: 2.5rem;
  line-height: 2.5rem;
  display: inline-block;
  font-size: 1.25rem;
  font-weight: bold;
  color: #63bc36;
  border-radius: 100px;
  background-color: #fff;
  border: solid 2px rgba(99, 188, 54, 0.3);
  flex-shrink: 0;

  &::before {
    display: inline-block;
    content: '+';
  }
`;

const ReceiversList = styled.div`
  padding: 0 0.3125rem;
  width: 100%;
`;

const ReceiverItem = styled.div`
  display: inline-block;
  width: 2.5rem;
  height: 2.5rem;
  margin: 0 0.25rem;
  border-radius: 100px;
  overflow: hidden;
  background-color: #f7f7f7;

  img {
    width: 100%;
  }
`;

const Timestamp = styled.div`
  font-size: 1rem;
  color: #cecece;
  font-weight: bold;
  text-align: right;
  width: auto;
  flex-shrink: 0;

  span {
    color: #cecece;
  }
`;

const BonusBody = styled.div`
  padding: 0 1.25rem 1.25rem;
`;

const TextItem = styled.div`
  margin: 10px 0 0;
  font-size: 1.25rem;
  color: #000;
`;

const Sender = styled.span`
  font-weight: 600;
`;

const BonusPoints = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  color: #63bc36;
`;

const ReceiverName = styled.span`
  color: #63bc36;
  font-weight: bold;
`;

const Tag = styled.span`
  color: #aaaaaa;
`;

const CommentList = styled.div``;

const Bonus = props => {
  const { bonus } = props;

  const onSuccess = () => {};

  return (
    <BonusContainer data-testid="test-bonus">
      <BonusHeader>
        <TotalPoints>{bonus['total-points']}</TotalPoints>
        <ReceiversList>
          {bonus.receivers.map(receiver => (
            <ReceiverItem key={receiver.email}>
              <img src={receiver['profile-image-avatar-url']} alt={receiver['full-name']} />
            </ReceiverItem>
          ))}
        </ReceiversList>
        <Timestamp>
          <TimeAgo datetime={bonus['created-at']} locale="en_US" />
        </Timestamp>
      </BonusHeader>
      <BonusBody>
        <TextItem>
          <Sender>{bonus.sender}: </Sender>
          <span>
            {bonus.text.map((item, index) => {
              if (item.type === 'points') {
                return <BonusPoints key={index}>{item.text} </BonusPoints>;
              }
              if (item.type === 'users') {
                return <ReceiverName key={index}>{item.text} </ReceiverName>;
              }
              if (item.type === 'tags') {
                return <Tag key={index}>{item.text} </Tag>;
              }
              return <span key={index}>{item.text} </span>;
            })}
          </span>
        </TextItem>
      </BonusBody>
      <CommentList data-testid="test-comment-list">
        {bonus.comments.map(item => (
          <CommentListItem comment={item} key={item.id} />
        ))}
      </CommentList>
      <SendCommentForm onSuccess={onSuccess} commentService={commentService} bonusId={bonus.id} />
    </BonusContainer>
  );
};

export default Bonus;
