import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Main from './Main';

describe('Main', () => {
  beforeAll(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue([
        {
          name: { common: 'Country 1' },
          flags: { svg: 'flag1.svg' },
          continents: ['Continent 1'],
        },
        {
          name: { common: 'Country 2' },
          flags: { svg: 'flag2.svg' },
          continents: ['Continent 2'],
        },
      ]),
    });
  });

  it('renders country cards with data', async () => {
    const { getByText, getByPlaceholderText } = render(<Main />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    expect(getByText('Country 1')).toBeInTheDocument();
    expect(getByText('Country 2')).toBeInTheDocument();
  });

  it('filters countries based on search term', async () => {
    const { getByText, getByPlaceholderText } = render(<Main />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const input = getByPlaceholderText('Search countries');

    fireEvent.change(input, { target: { value: 'Country 1' } });

    expect(getByText('Country 1')).
