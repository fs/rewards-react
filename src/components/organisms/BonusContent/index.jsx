import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import SendBonusForm from './SendBonusForm';
import BonusList from './BonusList';
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
  const [initialized, setInitialized] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentUser, setCurrentUser] = useState({ attributes: {} });

  const updateBonusesList = useCallback(async () => {
    setHasError(false);
    setIsLoading(true);
    const token = authService.getToken();
    try {
      const bonusListObject = await bonusService.fetchBonusesList(token);
      const bonusListArray = bonusParser(bonusListObject.data);

      setBonusList(bonusListArray);

      const userData = await profileService.fetchUser();
      setCurrentUser(userData.data);
    } catch (error) {
      setHasError(true);
    }
    setIsLoading(false);
  });

  useEffect(() => {
    if (!initialized) {
      updateBonusesList();
    }
    setInitialized(true);
  }, [initialized, updateBonusesList]);

  const onSuccess = () => {
    updateBonusesList();
  };

  return (
    <BonusContentWrapper>
      <MyBonuses>
        {currentUser.attributes['allowance-balance']}
        {' '}
points to give away
      </MyBonuses>
      <SendBonusForm onSuccess={onSuccess} authService={authService} bonusService={bonusService} />
      <BonusList bonusList={bonusList} hasError={hasError} isLoading={isLoading} />
    </BonusContentWrapper>
  );
};

export default BonusContent;
