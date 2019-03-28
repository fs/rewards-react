import React from 'react';
import { mount } from 'enzyme';
import { render, fireEvent, getByTestId } from 'react-testing-library';
import SendBonusForm from './SendBonusForm';

jest.mock('../../../services/AuthService');
jest.mock('../../../services/BonusService');

describe('SendBonusForm', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('should call bonusService.createBonus on submit', async (done) => {
    // Arrange
    const expectedToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTA3MzcwNjIsInN1YiI6MzczLCJ0eXBlIjoiYWNjZXNzIn0.JyTOZ8boBYlq0U3Iz3oVs7Tf-eeBLmD_Kl9ml2TO4YA';
    const expectedBonusCount = '+1';
    const expectedReceiver = '@albert.fazullin';
    const expectedTag = '#create-awesomeness';
    const expectedBonusText = `${expectedBonusCount} ${expectedReceiver} ${expectedTag}`;

    const mockAuthService = jest.requireMock('../../../services/AuthService');
    mockAuthService.getToken = () => expectedToken;
    const mockBonusService = jest.requireMock('../../../services/BonusService');

    const { container } = render(<SendBonusForm onSuccess={() => {}} />);
    const textArea = getByTestId(container, 'test-textarea');
    fireEvent.change(textArea, { target: { value: expectedBonusText } });

    // Act
    const form = getByTestId(container, 'test-form');
    fireEvent.submit(form);
    // Assert
    setTimeout(() => {
      expect(mockBonusService.createBonus).toBeCalledWith(expectedToken, expectedBonusText);
      done();
    }, 0);
  });

  test('should call bonusService.createBonus on submit and show error message when not enough points', async (done) => {
    // Arrange
    const expectedToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTA3MzcwNjIsInN1YiI6MzczLCJ0eXBlIjoiYWNjZXNzIn0.JyTOZ8boBYlq0U3Iz3oVs7Tf-eeBLmD_Kl9ml2TO4YA';
    const expectedBonusCount = '+10000000000';
    const expectedReceiver = '@albert.fazullin';
    const expectedTag = '#create-awesomeness';
    const expectedBonusText = `${expectedBonusCount} ${expectedReceiver} ${expectedTag}`;

    const expectedErrorMessage = "You can't give more points than 500.";
    const expectedResponse = `{"errors":[{"source":{"pointer":"/data/attributes/base"},"detail":"${expectedErrorMessage}"}]}`;
    const expectedError = { response: { request: { response: expectedResponse } } };

    const mockAuthService = class {
      static getToken = jest.fn(() => expectedToken);
    };
    jest.mock('../../../services/AuthService', () => mockAuthService);

    const mockBonusService = class {
      static createBonus = jest.fn(
        () => new Promise((resolve, reject) => {
          reject(expectedError);
        }),
      );
    };
    jest.mock('../../../services/BonusService', () => mockBonusService);

    const wrapper = mount(<SendBonusForm />);
    const textArea = wrapper.find('textarea');
    textArea.simulate('change', { target: { value: expectedBonusText, name: 'bonustext' } });

    // Act
    wrapper.find('form').simulate('submit');

    // Assert
    setTimeout(() => {
      wrapper.update();
      expect(mockBonusService.createBonus).toBeCalledWith(expectedToken, expectedBonusText);
      expect(wrapper.find('.error-message').text()).toEqual(expectedErrorMessage);
      done();
    }, 0);
  });
});
