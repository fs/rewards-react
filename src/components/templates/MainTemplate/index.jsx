import React from 'react';
import styled from 'styled-components';
import Logo from '../../atoms/Logo';
import texture from '../../../images/bg-texture.png';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  &::before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 320px;
    background-image: url(${texture});
    background-repeat: repeat;
    background-position: left top;
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

const MainTemplate = (props) => {
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

export default MainTemplate;
