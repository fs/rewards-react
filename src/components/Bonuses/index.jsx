import React from 'react';
import styled from 'styled-components';
import MainTemplate from '../templates/MainTemplate';
import SendBonusForm from '../organisms/SendBonusForm';

const BonusMainWrap = styled.div`
  display: flex;
  width: 60%;
  margin: 100px auto 0;
`;

const BonusContent = styled.div`
  margin-bottom: 1.25rem;
  padding: 1.25rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
  border-radius: 4px;
  background-color: #fff;
`;

const Bonuses = () => (
  <MainTemplate>
    <BonusMainWrap>
      <BonusContent>
        <h2>Bonuses</h2>
        <SendBonusForm></SendBonusForm>
      </BonusContent>
      {/* <BonusRating></BonusRating> */}
    </BonusMainWrap>
  </MainTemplate>
);

export default Bonuses;
