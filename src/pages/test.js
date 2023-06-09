import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Main from "./Main";
import CountryCatalog from "./countryCatalog";
CountryCatalog;

describe("CountryCatalog", () => {
  it("renders country cards with data", async () => {
    // Mock the API response
    const mockData = [
      {
        name: { common: "Country 1" },
        flags: { png: "flag1.png" },
        continents: ["Continent 1"],
      },
      {
        name: { common: "Country 2" },
        flags: { png: "flag2.png" },
        continents: ["Continent 2"],
      },
    ];

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    // Render the CountryCatalog component
    const { getByText, getByPlaceholderText } = render(<CountryCatalog />);

    // Wait for API call and rendering
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Assert that country cards are rendered with correct data
    expect(getByText("Country 1")).toBeInTheDocument();
    expect(getByText("Continent 1")).toBeInTheDocument();
    expect(getByText("Country 2")).toBeInTheDocument();
    expect(getByText("Continent 2")).toBeInTheDocument();

    // Search for a specific country
    const searchInput = getByPlaceholderText("Search country");
    fireEvent.change(searchInput, { target: { value: "Country 1" } });

    // Assert that only matching country is rendered
    expect(getByText("Country 1")).toBeInTheDocument();
    expect(getByText("Continent 1")).toBeInTheDocument();
    expect(queryByText("Country 2")).not.toBeInTheDocument();
    expect(queryByText("Continent 2")).not.toBeInTheDocument();
  });

  it('renders "Oops, Country not found" message when no matching country is found', async () => {
    // Mock the API response
    const mockData = [
      {
        name: { common: "Country 1" },
        flags: { png: "flag1.png" },
        continents: ["Continent 1"],
      },
    ];

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    // Render the CountryCatalog component
    const { getByText, getByPlaceholderText } = render(<CountryCatalog />);

    // Wait for API call and rendering
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Search for a country that doesn't exist
    const searchInput = getByPlaceholderText("Search country");
    fireEvent.change(searchInput, { target: { value: "Country 2" } });

    // Assert that "No country found" message is displayed
    expect(getByText("Oops, Country not found")).toBeInTheDocument();
  });
});
