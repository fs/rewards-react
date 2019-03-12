import React from 'react';
import styled from 'styled-components';
import Logo from '../../atoms/Logo';
import background from '../../../images/bg.png';

const Wrapper = styled.div`
  display: flex;
  width: 100%;

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 430px;
    background-image: url(${background});
    background-repeat: no-repeat;
    background-position: center top;
    background-size: cover;
    z-index: -1;
  }
`;

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 20px 15px;
  z-index: 10;
`;

const LoginTemplate = (props) => {
  const { children } = props;

  return (
    <Wrapper>
      <Header>
        <Logo />
      </Header>
      {children}
    </Wrapper>
  );
};

export default LoginTemplate;
