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
    bonusText: '',
    hasError: false,
    errorMessage: '',
  };

  handleChange = (event) => {
    this.setState({
      bonusText: event.target.value,
      hasError: false,
      errorMessage: '',
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { bonusText } = this.state;
    const token = authService.getToken();
    try {
      await bonusService.createBonus(token, bonusText);
    } catch (error) {
      const errorMessage = JSON.parse(error.response.request.response).errors[0].detail;
      this.setState({
        hasError: true,
        errorMessage,
      });
    }
  };

  render() {
    const {
      hasError,
      errorMessage,
    } = this.state;

    return (
      <BonusContentWrapper>
        <MyBonuses>points to give away</MyBonuses>
        <SendBonusForm
          submit={this.handleSubmit}
          change={this.handleChange}
          hasError={hasError}
          errorMessage={errorMessage}
        />
        <BonusList />
      </BonusContentWrapper>
    );
  }
}

export default BonusContent;
