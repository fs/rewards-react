import React, { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { ContextProvider } from './Context';
import MainTemplate from '../../templates/MainTemplate';
import BonusContent from '../../organisms/BonusContent';
import BonusRating from '../../organisms/BonusRating';
import profileService from '../../../services/ProfileService';
import reducer from '../../../model/reducer';

const BonusMainWrap = styled.div`
  margin: 80px auto 0;
  display: flex;
  width: 1100px;
  align-items: flex-start;
`;

const BonusesPage = () => {
  const updateCurrentUser = async () => {
    try {
      const userData = await profileService.fetchUser();

      const user = {
        id: userData.data.id,
        ...userData.data.attributes,
      };
      console.log(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  const [state, dispatch] = useReducer(reducer, { currentUser: updateCurrentUser() });

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
