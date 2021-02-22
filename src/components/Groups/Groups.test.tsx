import { act, render, screen } from '@testing-library/react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, mount } from 'enzyme';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Groups from './Groups';

configure({ adapter: new Adapter() });

describe('<Groups />', () => {
  let id;
  let groupsService;
  let fakeGroups;

  beforeEach(async () => {
    fakeGroups = [
      {
        id: '1',
        name: 'Living Room Color 1',
        state: {
          on: true,
          brightness: 254,
          color: {
            r: 127,
            g: 127,
            b: 127
          }
        }
      },
      {
        id: '2',
        name: 'Garage',
        state: {
          on: false,
          brightness: 254,
          color: {
            r: 255,
            g: 255,
            b: 255
          }
        }
      }
    ];

    groupsService = {
      getGroups: jest.fn(),
      getGroupById: jest.fn(),
      setName: jest.fn(),
      setState: jest.fn()
    };
    groupsService.getGroups.mockResolvedValue(fakeGroups);
    groupsService.getGroupById.mockResolvedValue(fakeGroups[0]);
    id = fakeGroups[0].id;
  });

  it('should mount', async () => {
    await act(async () => {
      render(
        <Router>
          <Groups groupsService={groupsService} />
        </Router>
      );
    });

    const groups = screen.getByTestId('Groups');

    expect(groups).toBeInTheDocument();
  });

  describe('when no id is specified', () => {
    beforeEach(async () => {
      await act(async () => {
        render(
          <Router>
            <Groups groupsService={groupsService} />
          </Router>
        );
      });
    });

    it('should call getGroups from GroupsService', () => {
      expect(groupsService.getGroups).toHaveBeenCalled();
    });

    it('should map response from getGroups to Bulbs', () => {
      const bulbs = screen.getAllByTestId('Bulb');

      expect(bulbs.length).toEqual(fakeGroups.length);
    });
  });

  describe('when an id is specified', () => {
    beforeEach(async () => {
      await act(async () => {
        render(
          <Router>
            <Groups id={id} groupsService={groupsService} />
          </Router>
        );
      });
    });

    it('should call getGroupById with id', () => {
      expect(groupsService.getGroupById).toHaveBeenCalledWith(id);
    });

    it('should map result of getGroupById to bulb', () => {
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
            <Groups id={id} groupsService={groupsService} />
          </Router>
        );
      });
    });

    it('should call setName with id and name', async () => {
      const bulb = wrapper.update().find('Bulb');

      await act(async () => bulb.prop('onNameChange')(name));

      expect(groupsService.setName).toHaveBeenCalledWith(id, name);
    });

    it('should cause getGroupsById to be called again to sync state', async () => {
      const bulb = wrapper.update().find('Bulb');

      await act(async () => bulb.prop('onNameChange')(name));

      expect(groupsService.getGroupById).toHaveBeenCalledTimes(2);
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
            <Groups id={id} groupsService={groupsService} />
          </Router>
        );
      });
    });

    it('should call setName with id and name', async () => {
      const bulb = wrapper.update().find('Bulb');

      await act(async () => bulb.prop('onStateChange')(state));

      expect(groupsService.setState).toHaveBeenCalledWith(id, state);
    });

    it('should cause getGroupsById to be called again to sync state', async () => {
      const bulb = wrapper.update().find('Bulb');

      await act(async () => bulb.prop('onStateChange')(state));

      expect(groupsService.getGroupById).toHaveBeenCalledTimes(2);
    });
  });
});