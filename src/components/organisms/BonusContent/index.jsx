import React, { Component } from 'react';
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

class BonusContent extends Component {
  state = {
    bonusList: [],
    isLoading: true,
  };

  componentDidMount() {
    this.updateBonusesList();
  }

  onSuccess = () => {
    this.updateBonusesList();
  };

  updateBonusesList = async () => {
    const token = authService.getToken();
    try {
      const data = await bonusService.fetchBonusesList(token);
      const bonusListArray = data.data.data;
      this.setState({
        bonusList: bonusListArray,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);

      // const errorMessage = JSON.parse(error.response.request.response).errors[0].detail;
    }
  };

  render() {
    const {
      bonusList, isLoading,
    } = this.state;
    return (
      <BonusContentWrapper>
        <MyBonuses>points to give away</MyBonuses>
        <SendBonusForm
          onSuccess={this.onSuccess}
        />
        <BonusList
          bonusList={bonusList}
          isLoading={isLoading}
        />
      </BonusContentWrapper>
    );
  }
}

export default BonusContent;
