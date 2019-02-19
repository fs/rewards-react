import React from 'react';
import styled from 'styled-components';
import MainTemplate from '../templates/MainTemplate';

const BonusMainWrap = styled.div`
  display: flex;
  width: 60%;
  margin: 100px auto 0;

`;

const DashboardForm = styled.div`
  margin-bottom: 1.25rem;
  padding: 1.25rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
  border-radius: 4px;
  background-color: #fff;
`;

const Bonuses = () => (
  <MainTemplate>
    <BonusMainWrap>
      <DashboardForm />
    </BonusMainWrap>
  </MainTemplate>
);

export default Bonuses;
