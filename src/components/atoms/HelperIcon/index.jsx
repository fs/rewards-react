import React from 'react';
import styled from 'styled-components';

const ImageWrap = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #d8d8d8;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 85, 112, 0.7);
  }

  &:last-child {
    margin-right: 0;
  }
`;

const HelperIcon = ({ imgPath, alt, isActive }) => (
  <ImageWrap className={isActive ? 'active' : ''}>
    <img src={imgPath} alt={alt} />
  </ImageWrap>
);

export default HelperIcon;
