import React, { useReducer, useEffect } from 'react';
import { ContextProvider } from './Context';
import reducer from '../../models/reducer';
import * as types from '../../models/actionTypes';
import ProfileService from '../../services/ProfileService';
import bonusService from '../../services/BonusService';

export const fetchUserData = async dispatch => {
  dispatch({ type: types.UPDATE_USER_LOADING });
  try {
    const result = await ProfileService.fetchUser();
    const user = {
      id: result.data.id,
      pointsLeft: result.data.attributes['allowance-balance'],
      name: result.data.attributes['full-name'],
    };
    dispatch({ type: types.UPDATE_USER_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: types.UPDATE_USER_ERROR });
  }
};

export const fetchBonuses = async dispatch => {
  dispatch({ type: types.UPDATE_BONUS_LIST_LOADING });
  try {
    const bonusList = await bonusService.fetchBonusesList();

    dispatch({ type: types.UPDATE_BONUS_LIST_SUCCESS, payload: bonusList });
  } catch (error) {
    dispatch({ type: types.UPDATE_BONUS_LIST_ERROR });
  }
};

const DataProvider = ({ children }) => {
  const initialState = {
    user: {
      id: '',
      pointsLeft: 0,
      name: '',
    },
    bonusList: [],
    isBonusListLoading: false,
    hasBonusListError: false,
    isUserLoading: false,
    hasUserError: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchUserData(dispatch);
    fetchBonuses(dispatch);
  }, []);

  return <ContextProvider value={{ state, dispatch }}>{children}</ContextProvider>;
};

export default DataProvider;
