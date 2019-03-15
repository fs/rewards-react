import React from 'react';
import styled from 'styled-components';
import MainTemplate from '../../templates/MainTemplate';
import BonusContent from '../../organisms/BonusContent';
import BonusRating from '../../organisms/BonusRating';

const BonusMainWrap = styled.div`
  margin: 80px auto 0;
  display: flex;
  width: 1100px;
`;

const BonusesPage = () => (
  <MainTemplate>
    <BonusMainWrap>
      <BonusContent />
      <BonusRating />
    </BonusMainWrap>
  </MainTemplate>
);

export default BonusesPage;
