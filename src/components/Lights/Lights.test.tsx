import { act, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { getLights } from '../../services/Lights/responses';
import Lights from './Lights';
import { RouteableBulb as Light } from '../Bulb/Bulb';

describe('<Lights />', () => {
  let lightsService;
  let fakeLights;

  beforeEach(async () => {
    lightsService = {
      getLights: jest.fn()
    };
    fakeLights = createFakeLights();
    lightsService.getLights.mockResolvedValue(fakeLights);

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

    expect(bulbs.length).toEqual(Object.keys(fakeLights).length);
  });
});

function createFakeLights(): Array<Light> {
  return [
    {
      id: '1',
      name: 'Living Room 1',
      brightness: 254,
      on: true,
      x: 0.5,
      y: 0.5
    },
    {
      id: '2',
      name: 'Living Room 2',
      brightness: 0,
      on: false,
      x: 0.5,
      y: 0.5
    }
  ];
}