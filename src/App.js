import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CountryCatalog from "./pages/countryCatalog";
// import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// const client = new ApolloClient({
//   uri: `https://restcountries.com`,
//   cache: new InMemoryCache(),
// });

const App = () => (
  <div className="container mx-auto">
    <ToastContainer />
    <h2 className="font-medium text-xl text-center py-10">Countries Catalog</h2>
    <CountryCatalog />
  </div>
);

export default App;
