import React from 'react';
import styled from 'styled-components';
import DataProvider from '../../context/DataProvider';
import MainTemplate from '../../templates/MainTemplate';
import BonusContent from '../../organisms/BonusContent';
import BonusRating from '../../organisms/BonusRating';

const BonusMainWrap = styled.div`
  margin: 80px auto 0;
  display: flex;
  width: 1100px;
  align-items: flex-start;
`;

const BonusesPage = () => {
  return (
    <DataProvider>
      <MainTemplate>
        <BonusMainWrap>
          <BonusContent />
          <BonusRating />
        </BonusMainWrap>
      </MainTemplate>
    </DataProvider>
  );
};

export default BonusesPage;
