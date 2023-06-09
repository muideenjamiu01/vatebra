import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Main from './Main';

describe('Main', () => {
  it('renders country cards with data', async () => {
    // Mock the API response
    const mockData = [
      {
        name: { common: 'Country 1' },
        flags: { png: 'flag-1.png' },
        continents: ['Continent 1'],
      },
      {
        name: { common: 'Country 2' },
        flags: { png: 'flag-2.png' },
        continents: ['Continent 2'],
      },
    ];

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    // Render the Main component
    const { getByText, getByAltText } = render(<Main />);

    // Wait for API call and rendering
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Assert that country cards are rendered with correct data
    expect(getByText('Country 1')).toBeInTheDocument();
    expect(getByText('Country 2')).toBeInTheDocument();

    const flag1Img = getByAltText('Flag of Country 1');
    expect(flag1Img).toBeInTheDocument();
    expect
