import React from 'react';
import { shallow } from 'enzyme';
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';

import BonusTextarea from './BonusTextarea';

describe('BonusTextarea', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('should show tags if user type #', (done) => {
    // Arrange
    const expectedChar = '#';
    // const expectedTag = '#be-curious-never-stop-learn';

    const wrapper = shallow(<BonusTextarea onChange={() => {}} />);
    const textArea = wrapper.find('[data-testid="test-textarea"]').last();

    // Act
    textArea.simulate('change', { target: { value: expectedChar, name: 'bonus-text' } });

    // Assert
    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find(ReactTextareaAutocomplete)).toHaveLength(1);
      done();
    }, 0);
  });
});
