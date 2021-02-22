import { act, render, screen } from '@testing-library/react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount } from 'enzyme';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Lights from './Lights';

configure({ adapter: new Adapter() });

describe('<Lights />', () => {
  let id;
  let lightsService;
  let fakeLights;

  beforeEach(async () => {
    fakeLights = [
      {
        id: '1',
        name: 'Living Room 1',
        state: {
          on: true,
          brightness: 254,
          color: {
            r: 128,
            g: 128,
            b: 128
          }
        }
      },
      {
        id: '2',
        name: 'Living Room 2',
        state: {
          on: false,
          brightness: 0,
          color: {
            r: 0,
            g: 255,
            b: 0
          }
        }
      }
    ];

    lightsService = {
      getLights: jest.fn(),
      getLightById: jest.fn(),
      setName: jest.fn(),
      setState: jest.fn()
    };
    lightsService.getLights.mockResolvedValue(fakeLights);
    lightsService.getLightById.mockResolvedValue(fakeLights[0]);
    id = fakeLights[0].id;
  });

  it('it should mount', async () => {
    await act(async () => {
      render(
        <Router>
          <Lights lightsService={lightsService} />
        </Router>
      );
    });

    const lights = screen.getByTestId('Lights');

    expect(lights).toBeInTheDocument();
  });

  describe('when no id is specified', () => {
    beforeEach(async () => {
      await act(async () => {
        render(
          <Router>
            <Lights lightsService={lightsService} />
          </Router>
        );
      });
    });

    it('it should call getLights from LightsService', () => {
      expect(lightsService.getLights).toHaveBeenCalled();
    });

    it('it should map response from getLights to Bulbs', () => {
      const bulbs = screen.getAllByTestId('Bulb');

      expect(bulbs.length).toEqual(fakeLights.length);
    });
  });

  describe('when an id is specified', () => {
    beforeEach(async () => {
      await act(async () => {
        render(
          <Router>
            <Lights id={id} lightsService={lightsService} />
          </Router>
        );
      });
    });

    it('should call getLightById with id', () => {
      expect(lightsService.getLightById).toHaveBeenCalledWith(id);
    });

    it('should map result of getLightById to bulb', () => {
      const bulbs = screen.getAllByTestId('Bulb');

      expect(bulbs.length).toEqual(1);
    });
  });

  describe('when onNameChange emits', () => {
    let name;
    let wrapper;

    beforeEach(async () => {
      name = 'Living Room Light 3';
      await act(async () => {
        wrapper = mount(
          <Router>
            <Lights id={id} lightsService={lightsService} />
          </Router>
        );
      });
    });

    it('should call setName with id and name', async () => {
      const bulb = wrapper.update().find('Bulb');

      await act(async () => bulb.prop('onNameChange')(name));

      expect(lightsService.setName).toHaveBeenCalledWith(id, name);
    });

    it('should cause getLightsById to be called again to sync state', async () => {
      const bulb = wrapper.update().find('Bulb');

      await act(async () => bulb.prop('onNameChange')(name));

      expect(lightsService.getLightById).toHaveBeenCalledTimes(2);
    });
  });

  describe('when onStateChange emits', () => {
    let state;
    let wrapper;

    beforeEach(async () => {
      state = {
        on: false,
        brightness: 123,
        color: {
          r: 101,
          g: 101,
          b: 101
        }
      };
      await act(async () => {
        wrapper = mount(
          <Router>
            <Lights id={id} lightsService={lightsService} />
          </Router>
        );
      });
    });

    it('should call setName with id and name', async () => {
      const bulb = wrapper.update().find('Bulb');

      await act(async () => bulb.prop('onStateChange')(state));

      expect(lightsService.setState).toHaveBeenCalledWith(id, state);
    });

    it('should cause getLightsById to be called again to sync state', async () => {
      const bulb = wrapper.update().find('Bulb');

      await act(async () => bulb.prop('onStateChange')(state));

      expect(lightsService.getLightById).toHaveBeenCalledTimes(2);
    });
  });
});
