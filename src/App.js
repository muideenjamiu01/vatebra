import React from "react";
// import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import CountryCatalog from "./pages/countryCatalog";

// const client = new ApolloClient({
//   uri: `https://restcountries.com`,
//   cache: new InMemoryCache(),
// });

const App = () => (
  <div className="container mx-auto">
    <h2 className="font-medium text-xl text-center py-10">Countries Catalog</h2>
    <CountryCatalog />
  </div>
);

export default App;
