import React from 'react';
import styled from 'styled-components';
import RatingListItem from '../../atoms/RatingListItem';

const containerStyles = {
  margin: '1.9375rem 0 0',
};

const Title = styled.div`
  margin-bottom: 0.6875rem;
  padding: 0 0.9375rem;
  color: #000;
  font-size: 0.875rem;
  line-height: 0.875rem;
  font-weight: 700;
`;

const MostGenerousesList = styled.div`
  display: flex;
  flex-direction: column;
`;

const MostGenerous = () => (
  <div style={containerStyles}>
    <Title>Most generous</Title>
    <MostGenerousesList>
      <RatingListItem />
    </MostGenerousesList>
  </div>
);

export default MostGenerous;
