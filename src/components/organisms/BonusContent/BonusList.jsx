import React from 'react';
import styled from 'styled-components';
import Bonus from '../../molecules/Bonus';

const List = styled.div``;

const Loader = styled.div`
  margin: 20px;
  text-align: center;
`;

const Error = styled.div`
  margin: 20px;
  text-align: center;
`;

const BonusList = (props) => {
  const { bonusList, isLoading, hasError } = props;

  return (
    <div>
      { isLoading
          && (
          <Loader data-testid="test-loader">
            Content is loading
          </Loader>
          )
      }

      { hasError
          && (
          <Error data-testid="test-error">
            Something went wrong
          </Error>
          )
      }

      { !isLoading && !hasError
          && (
          <List data-testid="test-bonus-list">
            {bonusList.map(bonus => <Bonus bonus={bonus} key={bonus.id} />)}
          </List>
          )
      }
    </div>
  );
};

export default BonusList;
