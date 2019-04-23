import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import SendBonusForm from './SendBonusForm';
import BonusList from './BonusList';
import bonusService from '../../../services/BonusService';
import authService from '../../../services/AuthService';

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

  const parseBonusText = (text) => {
    const textArray = [];

    text.split(' ').forEach((item) => {
      let newItem;

      if (item.startsWith('+')) {
        newItem = {
          type: 'count',
          text: item,
        };
      } else if (item.startsWith('@')) {
        newItem = {
          type: 'receiver',
          text: item,
        };
      } else if (item.startsWith('#')) {
        newItem = {
          type: 'tag',
          text: item,
        };
      } else {
        newItem = {
          type: 'text',
          text: item,
        };
      }
      textArray.push(newItem);
    });
    return textArray;
  };

  const parseBonusList = data => data.data.data.map(item => ({
    id: item.id,
    'created-at': item.attributes['created-at'],
    points: item.attributes.points,
    text: parseBonusText(item.attributes.text),
    'total-points': item.attributes['total-points'],
    comments: item.relationships.comments,
    'sender-id': item.relationships.sender.data.id,
    sender: bonusService.getUser(item.relationships.sender.data.id),
  }));

  const updateBonusesList = useCallback(async () => {
    const token = authService.getToken();
    try {
      const data = await bonusService.fetchBonusesList(token);
      const bonusListArray = parseBonusList(data);
      setBonusList(bonusListArray);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      // const errorMessage = JSON.parse(error.response.request.response).errors[0].detail;
    }
  });

  useEffect(() => {
    if (!initialized) {
      updateBonusesList();

      setInitialized(true);
    }
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
        isLoading={isLoading}
      />
    </BonusContentWrapper>
  );
};

export default BonusContent;
