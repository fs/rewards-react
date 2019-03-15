import React from 'react';
import styled from 'styled-components';
import TopReceivers from '../../molecules/TopReceivers';
import MostGenerous from '../../molecules/MostGenerous';

const BonusRatingWrapper = styled.div`
  padding: 1rem 0;
  flex: 0 0 20rem;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
`;

const AppLink = styled.a`
  margin: 1rem 0;
  align-self: center;
  display: flex;
  justify-content: space-between;
  width: 90%;
`;

const AppLinkImage = styled.img`
  width: 140px;
  height: 48px;
`;

const BonusRating = () => (
  <BonusRatingWrapper>
    <TopReceivers />
    <MostGenerous />
    <AppLink href="https://rewards.userecho.com/communities/1/topics/60-dobavlenie-beta-yuzerov">
      <AppLinkImage src={require('../../../images/app-store.png')} alt="Apple store" />
      <AppLinkImage src={require('../../../images/google-play.png')} alt="Google play" />
    </AppLink>
  </BonusRatingWrapper>
);

export default BonusRating;
