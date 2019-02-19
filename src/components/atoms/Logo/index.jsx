import React from 'react';
import styled from 'styled-components';
import logo from '../../../images/logo.png';

const LogoWrapper = styled.a`
  display: inline-flex;
  align-items: center;
  padding-top: 0;
  padding-bottom: 0;
`;

const LogoIcon = styled.span`
  display: inline-block;
  width: 30px;
  height: 30px;
  background-image: url(${logo});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
`;

const LogoText = styled.span`
  display: inline-block;
  font-size: 20px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 800;
  padding: 0 10px;
`;

const Logo = () => (
  <LogoWrapper>
    <LogoIcon />
    <LogoText>Rewards</LogoText>
  </LogoWrapper>
);

export default Logo;
