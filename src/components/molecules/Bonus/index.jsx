import React from 'react';
import styled from 'styled-components';

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
		#cecece
	}
`;

const BonusBody = styled.div`
	padding: 0 1.25rem 1.25rem;
`;

const TextItem = styled.div`
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

const Bonus = (props) => {
  const { bonus } = props;
  // console.log(bonus);

  return (
    <BonusContainer>
      <BonusHeader>
        <TotalPoints>
+
          {bonus.attributes['total-points']}
        </TotalPoints>
        <ReceiversList>
          <ReceiverItem>
            <img
              src="https://d1wdbttshyuc5z.cloudfront.net/store/user/273/profile_image/avatar-6218a7b6c256e9b088fbea68ca9aeded.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIAIJWLCQQNSWJW7QQA%2F20190314%2Feu-central-1%2Fs3%2Faws4_request&amp;X-Amz-Date=20190314T075507Z&amp;X-Amz-Expires=900&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Signature=0ab417f6cae8b1a9764837d5ec3732d16c15ddebd71685fd08af83313ff83702"
              alt="Avatar"
            />
          </ReceiverItem>
        </ReceiversList>
        <Timestamp>
          <span title="">18 minutes ago</span>
        </Timestamp>
      </BonusHeader>
      <BonusBody>
        <TextItem>
          <Sender>Username: </Sender>
          <div>{bonus.attributes.text}</div>
          {/* <BonusPoints>+{bonus.attributes.points}</BonusPoints> <ReceiverName>@marat.galeev</ReceiverName> iOS quiz <Tag>#win-win-win</Tag> */}
        </TextItem>
      </BonusBody>
    </BonusContainer>
  );
};

export default Bonus;
