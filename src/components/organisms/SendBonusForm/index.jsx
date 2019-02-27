import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '../../atoms/Button';
import createBonus from '../../../services/createBonusService';

const Form = styled.form`
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
`;

const Textarea = styled.textarea`
  display: block;
  width: 100%;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.75rem;
  color: #000;
  border: none;
  outline: none;
  padding: 0;
  height: 3.5rem;
  margin: 0 0 30px 0;
  resize: none;
  box-shadow: none;
`;

class SendBonusForm extends Component {
  state = { bonusText: '' };

  handleChange = (event) => {
    this.setState({ bonusText: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Textarea onChange={this.handleChange} placeholder="+100 @person add description for #create_awesomness" />
        <Button text="Give" />
      </Form>
    );
  }
}

export default SendBonusForm;
