import React from 'react';
import styled from 'styled-components';

const ImageWrap = styled.button`
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
  transition: box-shadow 0.08s linear;
  outline: none;
  border: 0;

  &:hover,
  &.active {
    background-color: rgba(0, 85, 112, 0.7);
  }

  &:focus {
    box-shadow: 0 1px 3px 0 rgba(60, 64, 67, 0.302), 0 4px 8px 3px rgba(60, 64, 67, 0.149);
  }

  &:last-child {
    margin-right: 0;
  }
`;

const HelperIcon = ({ imgPath, alt, isActive, onClick }) => (
  <ImageWrap className={isActive ? 'active' : ''} type="button" onClick={onClick}>
    <img src={imgPath} alt={alt} />
  </ImageWrap>
);

export default HelperIcon;
