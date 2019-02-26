import React from 'react';
import styled from 'styled-components';
import RatingListItem from '../../atoms/RatingListItem';

const Title = styled.div`
  margin-bottom: 0.6875rem;
  padding: 0 0.9375rem;
  color: #000;
  font-size: 0.875rem;
  line-height: 0.875rem;
  font-weight: 700;
`;

const ReceiversList = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopReceivers = () => (
  <div>
    <Title>Top receivers</Title>
    <ReceiversList>
      <RatingListItem />
    </ReceiversList>
  </div>
);

export default TopReceivers;
