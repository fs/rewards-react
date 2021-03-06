import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #63bc36;
  color: #fff;
  border-radius: 100px;
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;

  &:hover,
  &:focus {
    outline: none;
    background-color:#4f962b;
  }
`;

const Button = (props) => {
  const { text } = props;
  return (
    <StyledButton data-testid="test-button">{ text }</StyledButton>
  );
};

export default Button;
