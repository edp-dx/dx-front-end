import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Notifications } from '../index';

describe('Notifications Component', () => {
  test('renders without crashing', () => {
    render(<Notifications />);
    expect(screen.getByLabelText('Notifications')).toBeInTheDocument();
  });

  test('opens menu on mouse hover over Notifications icon', () => {
    render(<Notifications />);
    fireEvent.mouseEnter(screen.getByLabelText('Notifications'));
    // Expectations for menu to be visible
  });

  test('closes menu on mouse leave from Notifications icon', () => {
    render(<Notifications />);
    fireEvent.mouseEnter(screen.getByLabelText('Notifications'));
    fireEvent.mouseLeave(screen.getByLabelText('Notifications'));
    // Expectations for menu to be hidden
  });

  test('renders three menu items with correct text and color styling', () => {
    render(<Notifications />);
    fireEvent.mouseEnter(screen.getByLabelText('Notifications'));
    // Expectations for menu items count and their styles
  });
});