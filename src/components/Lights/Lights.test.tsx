import { act, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RouteableBulb as Light } from '../Bulb/Bulb';
import Lights from './Lights';

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
      color: {
        r: 128,
        g: 128,
        b: 128
      }
    },
    {
      id: '2',
      name: 'Living Room 2',
      brightness: 0,
      on: false,
      color: {
        r: 0,
        g: 255,
        b: 0
      }
    }
  ];
}