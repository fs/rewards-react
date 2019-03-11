import React from 'react';
import { mount } from 'enzyme';
import SendBonusForm from '.';

describe('SendBonusForm', () => {
  test('SendBonusForm happy path', (done) => {
    // Arrange
    const expectedToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTA3MzcwNjIsInN1YiI6MzczLCJ0eXBlIjoiYWNjZXNzIn0.JyTOZ8boBYlq0U3Iz3oVs7Tf-eeBLmD_Kl9ml2TO4YA';
    const expectedBonusCount = '+1';
    const expectedReceiver = '@albert.fazullin';
    const expectedTag = '#create-awesomeness';
    const expectedBonusText = `${expectedBonusCount} ${expectedReceiver} ${expectedTag}`;

    const expectedResponse = {
      data: {
        id: '239',
        type: 'bonuses',
        attributes: {
          text: ' +1 to @leyla.khamidullina #create-awesomeness Thank you!',
          points: 1,
          'total-points': 1,
          'created-at': '2019-03-11T08:50:47.661Z',
        },
        relationships: {
          sender: {
            data: {
              id: '39',
              type: 'users',
            },
          },
          comments: {
            data: [],
          },
        },
      },
      included: [
        {
          id: '39',
          type: 'users',
          attributes: {
            email: 'nadezhda.kharchuk@flatstack.com',
            'full-name': 'Nadezhda Kharchuk',
            username: 'nadezhda.kharchuk',
            'profile-image-avatar-url': 'default-user-profile_image.svg',
            'bonus-balance': 71,
            'allowance-balance': 494,
          },
        },
      ],
    };

    const wrapper = mount(<SendBonusForm />);
    const textArea = wrapper.find('textarea');
    textArea.simulate('change', { target: { value: expectedBonusText, name: 'bonustext' } });


    // Act
    wrapper.find('form').simulate('submit');
    // Assert
    setTimeout(() => {
      expect(mockCreateBonus).toBeCalledWith(expectedToken, expectedBonusText);
      done();
    }, 0);
  });
});
