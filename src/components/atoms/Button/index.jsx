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
`;

const Button = (props) => {
  const { text } = props;
  return (
    <StyledButton>{ text }</StyledButton>
  );
};

export default Button;
