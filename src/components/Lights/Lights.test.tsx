import { act, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { getLights } from '../../services/Lights/responses';
import Lights from './Lights';

describe('<Lights />', () => {
  let lightsService;

  beforeEach(async () => {
    lightsService = {
      getLights: jest.fn()
    };
    lightsService.getLights.mockResolvedValue(getLights);

    await act(async () => { 
      render(
        <BrowserRouter>
          <Lights lightsService={lightsService} />
        </BrowserRouter>
      );
    });
  });

  test('it should mount', async () => {
    const lights = screen.getByTestId('Lights');

    expect(lights).toBeInTheDocument();
  });

  test('it should get lights from LightsService', () => {
    expect(lightsService.getLights).toHaveBeenCalled();
  });

  test('it should map response from LightsService to Bulbs', () => {
    const bulbs = screen.getAllByTestId('Bulb');

    expect(bulbs.length).toEqual(Object.keys(getLights).length);
  });
});