import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";

import CountryCatalog from "./pages/countryCatalog";

describe("CountryCatalog", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue([
        {
          name: { common: "Nigeria" },
          flags: { svg: "https://flagcdn.com/w320/ng.png" },
          continents: ["Africa"],
        },
        {
          name: { common: "Jordan" },
          flags: { png: "https://flagcdn.com/w320/jo.png" },
          continents: ["Asia"],
        },
      ]),
    });
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  it("renders country cards with data", async () => {
    const { getByText, queryByText, getByPlaceholderText } = render(
      <CountryCatalog />
    );

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    await waitFor(() => {
      expect(getByText("Nigeria")).toBeInTheDocument();
      expect(getByText("Africa")).toBeInTheDocument();
      expect(getByText("Jordan")).toBeInTheDocument();
      expect(getByText("Asia")).toBeInTheDocument();
    });

    const searchInput = getByPlaceholderText("Search countries");
    fireEvent.change(searchInput, { target: { value: "Nigeria" } });

    await waitFor(() => {
      expect(getByText("Nigeria")).toBeInTheDocument();
      expect(getByText("Africa")).toBeInTheDocument();
      expect(queryByText("Jordan")).not.toBeInTheDocument();
      expect(queryByText("Asia")).not.toBeInTheDocument();
    });
  });

  it('renders "Oops, Country not found" message when no matching country is found', async () => {
    const { getByText, getByPlaceholderText } = render(<CountryCatalog />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const searchInput = getByPlaceholderText("Search countries");
    fireEvent.change(searchInput, { target: { value: "Country 3" } });

    expect(getByText("Oops, Country not found")).toBeInTheDocument();
  });
});
