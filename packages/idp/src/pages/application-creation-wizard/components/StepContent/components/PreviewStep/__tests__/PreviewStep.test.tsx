import React from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useFormContext } from 'react-hook-form';
import { ThemeProvider } from '@mui/material/styles';
import theme from '~/themes';
import { PreviewStep } from '../index';

jest.mock('react-hook-form', () => ({
  useFormContext: jest.fn(),
}));

jest.mock('react-query', () => ({
  useQuery: jest.fn(() => ({ data: [], isLoading: false }))
}));

const mockFormData = {
  FORM_NAMES: {
    name: 'Test Application',
    description: 'This is a test description',
    enterpriseOneID: '12345',
    businessUnitName: 'Test Unit'
  }
};

const queryClient = new QueryClient();

describe('PreviewStep', () => {
  beforeEach(() => {
    useFormContext.mockImplementation(() => ({ watch: () => mockFormData }));
  });

  test('renders correctly with application details', () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <PreviewStep />
        </ThemeProvider>
      </QueryClientProvider>
    );

    expect(getByText('Test Application')).toBeInTheDocument();
    expect(getByText('This is a test description')).toBeInTheDocument();
    expect(getByText('12345')).toBeInTheDocument();
    expect(getByText('Test Unit')).toBeInTheDocument();
  });
});