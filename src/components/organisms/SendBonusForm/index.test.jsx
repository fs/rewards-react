import React from 'react';
import { mount } from 'enzyme';
// import SendBonusForm from '.';

describe('SendBonusForm', () => {
  test('SendBonusForm happy path', async (done) => {
    // Arrange
    const expectedToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTA3MzcwNjIsInN1YiI6MzczLCJ0eXBlIjoiYWNjZXNzIn0.JyTOZ8boBYlq0U3Iz3oVs7Tf-eeBLmD_Kl9ml2TO4YA';
    const expectedBonusCount = '+1';
    const expectedReceiver = '@albert.fazullin';
    const expectedTag = '#create-awesomeness';
    const expectedBonusText = `${expectedBonusCount} ${expectedReceiver} ${expectedTag}`;

    const mockAuthService = class {
      static getToken = jest.fn(() => expectedToken);
    };
    jest.mock('../../../services/AuthService', () => mockAuthService);

    const mockBonusService = class {
      static createBonus = jest.fn(
        () => new Promise((resolve) => {
          resolve();
        }),
      );
    };
    jest.mock('../../../services/BonusService', () => mockBonusService);
    const SendBonusForm = require('./index').default;

    const wrapper = mount(<SendBonusForm />);
    const textArea = wrapper.find('textarea');
    textArea.simulate('change', { target: { value: expectedBonusText, name: 'bonustext' } });

    // Act
    wrapper.find('form').simulate('submit');
    // Assert
    setTimeout(() => {
      expect(mockBonusService.createBonus).toBeCalledWith(expectedToken, expectedBonusText);
      done();
    }, 0);
  });
});
