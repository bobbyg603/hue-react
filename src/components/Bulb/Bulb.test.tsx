import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Bulb from './Bulb';

describe('<Bulb />', () => {
  const on = true;
  const x = 0.5021;
  const y = 0.2652;
  const brightness = 214;

  test('it should mount', () => {
    render(<Bulb on={on} x={x} y={y} brightness={brightness} />);
    
    const light = screen.getByTestId('Bulb');

    expect(light).toBeInTheDocument();
  });

  test('it should set bulb fill to color converted from xy space to rgb', () => {
    const dom = render(<Bulb on={on} x={x} y={y} brightness={brightness} />);
    const bulb = dom.container.querySelector('#bulb') as any;
    const fill = bulb.style.fill;

    expect(fill).toEqual('rgb(255, 124.35628685014815, 154.37441207450894)');
  });

  test('it should render glow if light is on', () => {
    const dom = render(<Bulb on={on} x={x} y={y} brightness={brightness} />);

    const glow = dom.container.querySelector('#glow');

    expect(glow).toBeTruthy();
  });

  test('it should not render glow if light is off', () => {
    const on = false;
    const dom = render(<Bulb on={on} x={x} y={y} brightness={brightness} />);

    const glow = dom.container.querySelector('#glow');

    expect(glow).toBeFalsy();
  });
});