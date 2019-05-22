import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import SendBonusForm from './SendBonusForm';
import BonusList from './BonusList';
import bonusService from '../../../services/BonusService';
import authService from '../../../services/AuthService';
import bonusParser from '../../../utils/bonusParser';

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

  const updateBonusesList = useCallback(async () => {
    setHasError(false);
    setIsLoading(true);
    const token = authService.getToken();
    try {
      const data = await bonusService.fetchBonusesList(token);
      const bonusListArray = bonusParser(data.data);

      setBonusList(bonusListArray);
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
      <MyBonuses>points to give away</MyBonuses>
      <SendBonusForm
        onSuccess={onSuccess}
        authService={authService}
        bonusService={bonusService}
      />
      <BonusList
        bonusList={bonusList}
        hasError={hasError}
        isLoading={isLoading}
      />
    </BonusContentWrapper>
  );
};

export default BonusContent;
