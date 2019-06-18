import React from 'react';
import { render } from 'react-testing-library';
import HelperIcon from '.';

describe('HelperIcon', () => {
  const pointsIconPath = require('../../../images/helper-icon-points.svg');
  // const userNamesIconPath = require('../../../images/helper-icon-user.svg');
  // const hashTagsIconPath = require('../../../images/helper-icon-hashtag.svg');
  test('Should render points not active', () => {
    // Arrange
    const isActive = false;
    // Act
    const wrapper = render(<HelperIcon isActive={isActive} imgPath={pointsIconPath} alt="Points" />);
    // Assert
    expect(wrapper).toMatchSnapshot();
  });
  test('Should render points active', () => {
    // Arrange
    const isActive = true;
    // Act
    const wrapper = render(<HelperIcon isActive={isActive} imgPath={pointsIconPath} alt="Points" />);
    // Assert
    expect(wrapper).toMatchSnapshot();
  });
});
