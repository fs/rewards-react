import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 0.375rem 0.9375rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #efefef;
`;

const ImageWrap = styled.div`
  flex-shrink: 0;
  width: 1.875rem;
  height: 1.875rem;
  border-radius: 50%;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
`;

const Name = styled.div`
  flex: 1;
  padding: 0 0.625rem;
  color: #000;
  text-align: left;
  font-size: 0.875rem;
  line-height: 1.875rem;
`;

const Amount = styled.div`
  flex-shrink: 0;
  min-width: 0.3125rem;
  width: auto;
  color: #000;
  font-size: 0.875rem;
  line-height: 1.875rem;
`;

const RatingListItem = () => (
  <Container>
    <ImageWrap>
      <Image src={require('../../../images/default-user-profile-image.svg')} alt="User profile" />
    </ImageWrap>
    <Name>John Smith</Name>
    <Amount>100500</Amount>
  </Container>
);

export default RatingListItem;
