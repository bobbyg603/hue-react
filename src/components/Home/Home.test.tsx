import React from 'react';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from './Home';

describe('<Home />', () => {
  let configService;
  let response;

  beforeEach(async () => {
    response = {
      name: 'Philips Hue',
      zigbeechannel: 15
    };
    configService = {
      getConfig: jest.fn()
    };
    configService.getConfig.mockResolvedValue(response);

    await act(async () => { render(<Home configService={configService} />) });
  })

  it('should mount', () => {
    const home = screen.getByTestId('Home');

    expect(home).toBeInTheDocument();
  });

  it('should call getConfig', () => {
    expect(configService.getConfig).toHaveBeenCalled();
  });

  it('should render result of getConfig', () => {
    Object.keys(response).forEach(key => {
      const keyColumn = screen.getByText(key);
      const valueColumr = screen.getByText(JSON.stringify(response[key]));

      expect(keyColumn).toBeInTheDocument();
      expect(valueColumr).toBeInTheDocument();
    });
  });
});