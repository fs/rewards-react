import React, { useReducer, useEffect } from 'react';
import { ContextProvider } from './Context';
import reducer from '../../models/reducer';
import * as types from '../../models/actionTypes';
import ProfileService from '../../services/ProfileService';
import bonusService from '../../services/BonusService';
import bonusParser from '../../utils/bonusParser';

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
    console.log(error);
  }
};

export const fetchBonuses = async dispatch => {
  dispatch({ type: types.UPDATE_BONUS_LIST_LOADING });
  try {
    const bonusListObject = await bonusService.fetchBonusesList();
    const bonusListArray = bonusParser(bonusListObject.data);
    dispatch({ type: types.UPDATE_BONUS_LIST_SUCCESS, payload: bonusListArray });
  } catch (error) {
    dispatch({ type: types.UPDATE_BONUS_LIST_ERROR, payload: true });
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
    isLoading: false,
    hasError: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchUserData(dispatch);
    fetchBonuses(dispatch);
  }, []);

  return <ContextProvider value={{ state, dispatch }}>{children}</ContextProvider>;
};

export default DataProvider;
