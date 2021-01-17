import { act, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RouteableItem as Group } from '../Bulb/Bulb';
import Rooms from './Rooms';

describe('<Rooms />', () => {
  let groupsService;
  let fakeGroups;

  beforeEach(async () => {
    groupsService = {
      getGroups: jest.fn()
    };
    fakeGroups = createFakeGroups();
    groupsService.getGroups.mockResolvedValue(fakeGroups);
    
    await act(async () => { 
      render(
        <Router>
          <Rooms groupsService={groupsService} />
        </Router>
      );
    });
  });

  test('it should mount', () => {
    const groups = screen.getByTestId('Rooms');

    expect(groups).toBeInTheDocument();
  });

  test('it should get groups from GroupsService', () => {
    expect(groupsService.getGroups).toHaveBeenCalled();
  });

  test('it should map response from GroupsService to Bulbs', () => {
    const bulbs = screen.getAllByTestId('Bulb');

    expect(bulbs.length).toEqual(fakeGroups.length);
  });
});

function createFakeGroups(): Array<Group> {
  return [
    {
      id: '1',
      name: 'Living Room',
      brightness: 254,
      on: true,
      x: 0.5,
      y: 0.5
    },
    {
      id: '2',
      name: 'Garage',
      brightness: 0,
      on: false,
      x: 0.5,
      y: 0.5
    }
  ];
}