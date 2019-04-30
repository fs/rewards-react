import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import React from 'react';
import {
  bonusPossibilitiesResponse,
  points,
  users,
  tags,
} from '../../../constants/bonusPossibilitiesResponse';
import BonusPossibilitiesService, {
  apiUrl, POINTS, TAGS, USERS,
} from '../../../services/BonusPossibilitiesService';
import {
  render, fireEvent, wait, getByText, waitForElement
} from 'react-testing-library';
import BonusTextarea from './BonusTextarea';

describe('BonusTextarea', () => {
  test('should show tags if user type #', async () => {
    // Arrange
    const expectedTagsKey = TAGS;
    const expectedTagsArray = tags;
    const expectedChar = '#';
    const expectedTag = '#be-curious-never-stop-learn';

    localStorage.setItem(expectedTagsKey, JSON.stringify(expectedTagsArray));

    const { getByTestId, getByText } = render(<BonusTextarea onChange={() => {}} />);
    const textArea = getByTestId('test-textarea');
    
    // Act
    fireEvent.change(textArea, { target: { value: expectedChar } });
    await waitForElement(() => getByText(expectedChar));
    const wrapper = getByTestId('test-textarea-wrapper');
    
    // Assert
    expect(wrapper).toHaveTextContent(expectedTag);
  });
});
