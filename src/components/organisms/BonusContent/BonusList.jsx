import React from 'react';
import styled from 'styled-components';
import Bonus from '../../molecules/Bonus';

const List = styled.div``;

const Loader = styled.div``;

const BonusList = (props) => {
  const { bonusList, isLoading } = props;

  return (
    <div>
      { isLoading
        ? (
          <Loader data-testid="test-loader">
            Content is loading
          </Loader>
        )
        : (
          <List data-testid="test-bonus-list">
            {bonusList.map(bonus => <Bonus bonus={bonus} key={bonus.id} />)}
          </List>
        )
      }
    </div>
  );
};

export default BonusList;
