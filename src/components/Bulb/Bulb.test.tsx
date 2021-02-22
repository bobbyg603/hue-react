import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Bulb, { BulbProps, LightSize } from './Bulb';
import * as util from '../../utils/debounce';

describe('<Bulb />', () => {
  let props: BulbProps;

  beforeEach(() => {
    props = {
      id: '1',
      name: 'Living Room Color 1',
      state: {
        on: true,
        brightness: 255,
        color: {
          r: 0,
          g: 255,
          b: 0
        }
      },
      size: LightSize.medium,
      onNameChange: jest.fn(),
      onStateChange: jest.fn()
    };

    (util.debounce as any) = jest.fn().mockImplementation((func, wait) => func);
  });

  it('should mount', () => {
    render(<Bulb {...props} />);
    
    const bulb = screen.getByTestId('Bulb');
 
    expect(bulb).toBeInTheDocument();
  });

  it('should debounce handleNameChange with a 1000 ms timer', () => {
    render(<Bulb {...props} />);

    expect((util.debounce as any).mock.calls[0][1]).toBe(1000);
  });

  it('should debounce handleBrightnessChange with a 100 ms timer', () => {
    render(<Bulb {...props} />);

    expect((util.debounce as any).mock.calls[1][1]).toBe(100);
  });

  it('should debounce handleColorChange with a 100 ms timer', () => {
    render(<Bulb {...props} />);

    expect((util.debounce as any).mock.calls[2][1]).toBe(100);
  });

  it('should debounce handleOnOffChange with a 100 ms timer', () => {
    render(<Bulb {...props} />);

    expect((util.debounce as any).mock.calls[3][1]).toBe(100);
  });

  it('should set bulb fill to value converted from light color', () => {
    const dom = render(<Bulb {...props} />);

    const bulb = dom.container.querySelector('#bulb') as any;

    expect(bulb.style.fill).toEqual('#00ff00');
  });

  it('should render glow box shadow if light is on', () => {
    const dom = render(<Bulb {...props} />);

    const glow = dom.container.querySelector('#glow') as any;

    expect(glow.style.boxShadow).not.toEqual('none');
  });

  it('should not render glow box shadow if light is off', () => {
    props.state.on = false;
    const dom = render(<Bulb {...props} />);

    const glow = dom.container.querySelector('#glow') as any;

    expect(glow.style.boxShadow).toEqual('none');
  });

  it('should emit onNameChange event when name input text changes', () => {
    const e = { 
      target: {
        value: 'Living Room Color 2'
      }
    };
    const dom = render(<Bulb {...props} />);
    const nameInput = dom.container.querySelector('input[name="name"]');

    fireEvent.change(nameInput as Element, e);

    expect(props.onNameChange).toHaveBeenLastCalledWith(e.target.value);
  });

  it('should emit onStateChange event when color input changes', () => {
    const e = { 
      target: {
        value: '#ff0000'
      }
    };
    const dom = render(<Bulb {...props} />);
    const colorInput = dom.container.querySelector('input[name="color"]');
    
    fireEvent.change(colorInput as Element, e);

    expect(props.onStateChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        ...props.state,
        color: {
          r: 255,
          g: 0,
          b: 0
        }
      })
    );
  });

  it('should emit onStateChange event when brightness input changes', () => {
    const e = { 
      target: {
        value: 127
      }
    };
    const dom = render(<Bulb {...props} />);
    const brightnessInput = dom.container.querySelector('input[name="brightness"]');
    
    fireEvent.change(brightnessInput as Element, e);

    expect(props.onStateChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        ...props.state,
        brightness: 127
      })
    );
  });

  it('should emit onStateChange event when toggleOnOff is clicked', () => {
    const dom = render(<Bulb {...props} />);
    const toggleOnOff = dom.container.querySelector('#toggleOnOff');
    
    fireEvent.click(toggleOnOff as Element, {});

    expect(props.onStateChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        ...props.state,
        on: false
      })
    );
  });
});