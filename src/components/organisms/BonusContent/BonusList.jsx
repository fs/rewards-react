import React from 'react';
import styled from 'styled-components';
import Bonus from '../../molecules/Bonus';

const List = styled.div``;

export const Loader = styled.div``;

const BonusList = (props) => {
  const { bonusList, isLoading } = props;

  return (
    <div>
      { isLoading
        ? (
          <Loader>
            Content is loading
          </Loader>
        )
        : (
          <List>
            {bonusList.map(bonus => <Bonus bonus={bonus} key={bonus.id} />)}
          </List>
        )
      }
    </div>
  );
};

export default BonusList;
