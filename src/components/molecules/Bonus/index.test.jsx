import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import TimeAgo from 'timeago-react';

import React from 'react';

import { render } from 'react-testing-library';
import Bonus from '.';
import bonusList from '../../../mock_data/bonusList';

jest.mock('timeago-react');

describe('Bonus index', () => {
  test('render Bonus correctly', () => {
    // Arrange
    const expectedDateTime = '2019-06-11T15:35:22.447Z';
    // eslint-disable-next-line react/prefer-stateless-function
    const mockTimeAgo = class TimeAgo extends React.Component {
      render() {
        return <TimeAgo datetime={expectedDateTime} locale="en_US" />;
      }
    };
    TimeAgo.mockImplementation(mockTimeAgo);
    // Act
    const wrapper = render(<Bonus bonus={bonusList[0]} />);
    // Assert
    expect(wrapper).toMatchSnapshot();
  });
});
