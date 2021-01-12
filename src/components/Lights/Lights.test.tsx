import { act, render, screen } from '@testing-library/react';
import React from 'react';
import Lights from './Lights';
import response from './response.json';

describe('<Lights />', () => {
  let lightsService;

  beforeEach(async () => {
    lightsService = {
      getLights: jest.fn()
    };
    lightsService.getLights.mockResolvedValue(response);

    await act(async () => { render(<Lights lightsService={lightsService} />) });
  });

  test('it should mount', async () => {
    const lights = screen.getByTestId('Lights');

    expect(lights).toBeInTheDocument();
  });

  test('it should get lights from LightsService', () => {
    expect(lightsService.getLights).toHaveBeenCalled();
  });

  test('it should map response from LightsService to Bulbs', () => {
    const lights = screen.getAllByTestId('Bulb');

    expect(lights.length).toEqual(Object.keys(response).length);
  });
});