import { act, render, screen } from '@testing-library/react';
import React from 'react';
import Groups from './Groups';
import response from './response.json';
import { BrowserRouter as Router } from 'react-router-dom';

describe('<Groups />', () => {
  let groupsService;

  beforeEach(() => {
    groupsService = {
      getGroups: jest.fn()
    };

    groupsService.getGroups.mockResolvedValue(response);
  });

  test('it should mount', async () => {
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
});