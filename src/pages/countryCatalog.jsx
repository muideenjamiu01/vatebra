import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";

// const GET_COUNTRIES = gql`
//   query {
//     countries {
//       name
//       flags {
//         svg
//       }
//       continents {
//         name
//       }
//     }
//   }
// `;

function CountryCatalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,continents"
        );
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-center">
      <div>
        <div className="flex flex-col  mt-10">
          <div className="flex justify-center">
            <form onSubmit={handleSearch}>
              <div className="flex items-center">
                <div className="w-96">
                  <div className="mb-3">
                    <label htmlFor="search">Keyword</label>
                  </div>
                  <div className="flex items-center gap-x-10">
                    <input
                      type="text"
                      id="search"
                      placeholder="Search countries"
                      value={searchTerm}
                      onChange={handleSearchInputChange}
                      className="w-full border border-gray-300 rounded-l px-4 py-2 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="bg-green-400 text-white px-4 py-2 rounded focus:outline-none hover:bg-green-400"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <hr className="my-10" />

          <div className="grid grid-cols-4 gap-4 justify-items-center">
            {filteredCountries.map((country) => (
              <div
                className="mt-6 w-[250px] bg-[#f5f5f5] rounded-md p-4"
                key={country.name.common}
              >
                <div className="flex gap-x-4 items-center mb-2">
                  <img
                    className="h-10 w-10"
                    src={country.flags.svg}
                    alt={`Flag of ${country.name.common}`}
                  />{" "}
                  <span className="font-bold text-base">
                    {country.name.common}
                  </span>
                </div>
                <div className="mb-2">
                  <span>Continent</span> :{" "}
                  <span className="font-medium "> {country.continents[0]}</span>
                </div>
                <button className="bg-green-400 text-white text-base px-4 py-2 rounded focus:outline-none hover:bg-green-400">
                  See details...
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryCatalog;
