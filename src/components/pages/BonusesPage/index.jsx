import React from 'react';
import styled from 'styled-components';
import MainTemplate from '../../templates/MainTemplate';
import SendBonusForm from '../../organisms/SendBonusForm';
import TopReceivers from '../../molecules/TopReceivers';
import MostGenerous from '../../molecules/MostGenerous';

const BonusMainWrap = styled.div`
  margin: 100px auto 0;
  display: flex;
  width: 1100px;
`;

const BonusContent = styled.div`
  margin-bottom: 1.25rem;
  margin-right: 2rem;
  padding: 1.25rem;
  flex: 1;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background-color: #fff;
`;

const BonusRating = styled.div`
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

const Bonuses = () => (
  <MainTemplate>
    <BonusMainWrap>
      <BonusContent>
        <h2>Bonuses</h2>
        <SendBonusForm />
      </BonusContent>
      <BonusRating>
        <TopReceivers />
        <MostGenerous />
        <AppLink href="https://rewards.userecho.com/communities/1/topics/60-dobavlenie-beta-yuzerov">
          <AppLinkImage src={require('../../../images/app-store.png')} alt="Apple store" />
          <AppLinkImage src={require('../../../images/google-play.png')} alt="Google play" />
        </AppLink>
      </BonusRating>
    </BonusMainWrap>
  </MainTemplate>
);

export default Bonuses;
