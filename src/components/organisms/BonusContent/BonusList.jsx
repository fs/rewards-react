import React from 'react';
import styled from 'styled-components';
import Bonus from '../../molecules/Bonus';

const List = styled.div``;

const BonusList = (props) => {
  const { bonusList } = props;

  return (
    <List>
      {bonusList.map(bonus => <Bonus bonus={bonus} key={bonus.id} />)}
    </List>
  );
};

export default BonusList;
