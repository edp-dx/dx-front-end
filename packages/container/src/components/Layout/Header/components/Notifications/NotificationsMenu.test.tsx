import { render, fireEvent } from '@testing-library/react';
import Header from '../Header'; // Adjust the import path as necessary

describe('Notifications Menu', () => {
  test('User hovers over the Notifications icon to open the menu', () => {
    const { getByTestId } = render(<Header />);
    fireEvent.mouseOver(getByTestId('notifications-icon'));
    expect(getByTestId('notifications-menu')).toBeVisible();
  });

  test('Notifications menu closes when the user moves the cursor away', () => {
    const { getByTestId } = render(<Header />);
    fireEvent.mouseOver(getByTestId('notifications-icon'));
    fireEvent.mouseOut(getByTestId('notifications-menu'));
    expect(getByTestId('notifications-menu')).not.toBeVisible();
  });

  // Additional tests for each scenario would follow here
});