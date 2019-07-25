import React, { useReducer, useEffect } from 'react';
import { ContextProvider } from './Context';
import reducer from '../../models/reducer';
import * as types from '../../models/actionTypes';
import ProfileService from '../../services/ProfileService';
import bonusService from '../../services/BonusService';
import bonusParser from '../../utils/bonusParser';

const DataProvider = ({ children }) => {
  const initialState = {
    user: {
      id: '',
      pointsLeft: 0,
      name: '',
    },
    bonusList: [],
    isLoading: false,
    hasError: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ProfileService.fetchUser();
        const user = {
          id: result.data.id,
          pointsLeft: result.data.attributes['allowance-balance'],
          name: result.data.attributes['full-name'],
        };

        dispatch({ type: types.UPDATE_USER, payload: user });
      } catch (error) {
        console.log(error);
      }
    };

    const fetchBonuses = async () => {
      dispatch({ type: types.UPDATE_BONUS_LIST_LOADING, payload: true });
      try {
        const bonusListObject = await bonusService.fetchBonusesList();
        const bonusListArray = bonusParser(bonusListObject.data);
        dispatch({ type: types.UPDATE_USER, payload: bonusListArray });
        dispatch({ type: types.UPDATE_BONUS_LIST_LOADING, payload: false });
      } catch (error) {
        dispatch({ type: types.UPDATE_BONUS_LIST_ERROR, payload: true });
      }
    };

    fetchData();
    fetchBonuses();
  }, []);

  return <ContextProvider value={{ state, dispatch }}>{children}</ContextProvider>;
};

export default DataProvider;
