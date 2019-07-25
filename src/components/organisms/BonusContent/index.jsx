import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import autosize from 'autosize';
import SendBonusForm from '../SendBonusForm';
import BonusList from './BonusList';
import Context from '../../context/Context';

const BonusContentWrapper = styled.div`
  position: relative;
  margin-bottom: 1.25rem;
  margin-right: 2rem;
  flex: 1;
  border-radius: 4px;
`;

const MyBonuses = styled.h2`
  position: absolute;
  top: -55px;
  line-height: 1.625rem;
  font-weight: 800;
  font-size: 1.375rem;
  color: #fff;
`;

const BonusContent = () => {
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    autosize(document.querySelectorAll('textarea'));
  }, []);

  return (
    <BonusContentWrapper>
      <MyBonuses>{state.user.pointsLeft} points to give away</MyBonuses>
      <SendBonusForm />
      <BonusList bonusList={state.bonusList} hasError={state.hasError} isLoading={state.isLoading} />
    </BonusContentWrapper>
  );
};

export default BonusContent;
