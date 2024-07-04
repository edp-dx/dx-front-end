import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Notifications } from '../index';

describe('Notifications Component', () => {
  test('hovering over the Notifications icon opens the mouse-over menu with specific menu items and styles', () => {
    render(<Notifications />);
    const notificationIcon = screen.getByLabelText('Notifications');
    fireEvent.mouseEnter(notificationIcon);
    expect(screen.getByText('App-32 deployment to Prod successfully completed …')).toHaveStyle('color: green');
    expect(screen.getByText('PR-3727 needs your review …')).toHaveStyle('color: yellow');
    expect(screen.getByText('Jon Snow needs your approval …')).toHaveStyle('color: yellow');
  });

  test('moving the cursor away from the Notifications icon closes the mouse-over menu', () => {
    render(<Notifications />);
    const notificationIcon = screen.getByLabelText('Notifications');
    fireEvent.mouseEnter(notificationIcon);
    fireEvent.mouseLeave(notificationIcon);
    expect(screen.queryByText('App-32 deployment to Prod successfully completed …')).toBeNull();
  });

  test('Notifications icon is wrapped properly in a `Div` element with specific properties', () => {
    const { container } = render(<Notifications />);
    const wrapperDiv = container.querySelector('div[aria-label="Notifications"][component="label"]');
    expect(wrapperDiv).not.toBeNull();
  });

  test('menu opens and closes using `handleOpen` and `handleClose` methods upon corresponding events', () => {
    const handleOpenMock = jest.fn();
    const handleCloseMock = jest.fn();
    render(<Notifications handleOpen={handleOpenMock} handleClose={handleCloseMock} />);
    const notificationIcon = screen.getByLabelText('Notifications');
    fireEvent.mouseEnter(notificationIcon);
    expect(handleOpenMock).toHaveBeenCalled();
    fireEvent.mouseLeave(notificationIcon);
    expect(handleCloseMock).toHaveBeenCalled();
  });

  test('styling and functionality adhere to coding standards and use specific methods and libraries for styling', () => {
    const { container } = render(<Notifications />);
    expect(container.firstChild).toMatchSnapshot();
  });
});