import React, { useReducer } from 'react';
import styled from 'styled-components';
import { ContextProvider } from './Context';
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
  const initialState = {
    pointsLeft: 9000,
  };
  const reducer = (state, action) => {
    if (action.type === 'UPDATE_POINTS') {
      return { pointsLeft: action.payload };
    }
    return state;
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ContextProvider value={{ state, dispatch }}>
      <MainTemplate>
        <BonusMainWrap>
          <BonusContent />
          <BonusRating />
        </BonusMainWrap>
      </MainTemplate>
    </ContextProvider>
  );
};

export default BonusesPage;
