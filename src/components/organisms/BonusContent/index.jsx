import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import autosize from 'autosize';
import SendBonusForm from '../SendBonusForm';
import BonusList from './BonusList';
import Context from '../../pages/BonusesPage/Context';
import bonusService from '../../../services/BonusService';
import authService from '../../../services/AuthService';
import bonusParser from '../../../utils/bonusParser';
import profileService from '../../../services/ProfileService';

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
  const [bonusList, setBonusList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { state, dispatch } = useContext(Context);

  const updateBonusesList = async () => {
    setHasError(false);
    setIsLoading(true);
    const token = authService.getToken();
    try {
      const bonusListObject = await bonusService.fetchBonusesList(token);
      const bonusListArray = bonusParser(bonusListObject.data);

      setBonusList(bonusListArray);

      // const userData = await profileService.fetchUser();
      // setCurrentUser(userData.data);
    } catch (error) {
      setHasError(true);
    }
    setIsLoading(false);

    autosize(document.querySelectorAll('textarea'));
  };

  let currentUser;

  const updateCurrentUser = async () => {
    try {
      const userData = await profileService.fetchUser();

      currentUser = {
        id: userData.data.id,
        ...userData.data.attributes,
      };
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateBonusesList();
    updateCurrentUser();
    dispatch({ type: 'UPDATE_POINTS', payload: currentUser });
  }, []);

  const onSuccess = () => {
    updateBonusesList();
    updateCurrentUser();
    dispatch({ type: 'UPDATE_POINTS', payload: currentUser });
  };

  return (
    <BonusContentWrapper>
      <MyBonuses>{state.currentUser['allowance-balance']} points to give away</MyBonuses>
      <SendBonusForm onSuccess={onSuccess} authService={authService} bonusService={bonusService} />
      <BonusList bonusList={bonusList} hasError={hasError} isLoading={isLoading} />
    </BonusContentWrapper>
  );
};

export default BonusContent;
