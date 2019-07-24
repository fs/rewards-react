import React, { useReducer, useEffect } from 'react';
import styled from 'styled-components';
import { ContextProvider } from './Context';
import reducer from '../../../models/reducer';
import ProfileService from '../../../services/ProfileService';
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
    pointsLeft: 0,
    userId: '',
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ProfileService.fetchUser();
        const payload = {
          id: result.data.id,
          ...result.data.attributes,
        };
        dispatch({ type: 'UPDATE_POINTS', payload: payload['allowance-balance'] });
        dispatch({ type: 'SAVE_USER_ID', payload: payload.id });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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
