import React, { useState, useEffect } from 'react';
import fallbackCountries from '../data/countries-fallback.json';

  /******************************************** */




const Home = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(null);
  const [countryCode, setCountryCode] = useState("");
  const [error, setError] = useState("");
  const [countryCodes, setCountryCodes] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(false);
  const [countriesFetchError, setCountriesFetchError] = useState("");

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountryCode(event.target.value);
  };

  const predictAge = async () => {
    if (!name) {
      setError("Please enter a name!");
      setAge(null);
      return;
    }

    setError(""); // Clear any previous errors
    try {
      const response = await fetch(
        `https://api.agify.io?name=${name}${countryCode ? `&country_id=${countryCode}` : ""}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.age === undefined) {
        throw new Error("Age data is not available");
      }
      setAge(data.age);
    } catch (error) {
      setError("Error fetching data. Please try again later.");
      console.error("Error:", error);
    }
  };

  // fetch function is defined here so we can call it on mount and on retry
  const fetchCountryCodes = async () => {
    setCountriesLoading(true);
    setCountriesFetchError("");
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      if (!response.ok) throw new Error(`Network response was not ok: ${response.status}`);
      const data = await response.json();
      // Filter out entries without a 2-letter code and map to {code,name}
      const codes = data
        .filter(country => country && country.cca2 && country.name && country.name.common)
        .map(country => ({
          code: country.cca2,
          name: country.name.common
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

      setCountryCodes(codes);
    } catch (err) {
      console.error("Error fetching country codes:", err);
      // Expose the real error message so user can see why it failed (CORS, network, etc.)
      setCountriesFetchError(err && err.message ? `Failed to load countries: ${err.message}` : "Failed to load countries");
      // populate fallback so the UI still works
      if (fallbackCountries && fallbackCountries.length) {
        setCountryCodes(fallbackCountries.map(c=>({code:c.code,name:c.name})));
      }
    } finally {
      setCountriesLoading(false);
    }
  };

  useEffect(() => {
    fetchCountryCodes();
  }, []);

  // no retry button: keep fallback populated when fetch fails

  const renderCountryOptions = () => {
    return countryCodes.map((country) => (
      <option key={country.code} value={country.code}>
       {country.code} - {country.name}
      </option>
    ));
  };



  return (
    <div className="app-container" style={{ textAlign: "center", paddingTop: "50px" }}>
      
      <h1 className="info">Powered by - Agify.io API & Database</h1>
      
      <h2>Estimate Age by Name</h2>
      <div className="input-container">
        <div className="form-row">
          <div className="label-col">
            <label htmlFor="name">Name:</label>
          </div>
          <div className="control-col">
            <input
              type="text"
              value={name}
              onChange={handleInputChange}
              placeholder="Enter a name"
              className="field-input"
            />
          </div>
        </div>
      </div>



      <div className="input-container">
        <div className="form-row">
          <div className="label-col">
            <label htmlFor="countryCode">Country Code:</label>
          </div>
          <div className="control-col">
            <select
              className="field-input"
              value={countryCode}
              onChange={handleCountryChange}
              onFocus={() => setCountriesFetchError("")}
              onClick={() => setCountriesFetchError("")}
            >
              <option value="">Select a country</option>
              {countriesLoading && !countriesFetchError && (
                <option value="" disabled>Loading countries...</option>
              )}
              {countriesFetchError && (
                <option value="" disabled>{countriesFetchError}</option>
              )}
              {renderCountryOptions()}
            </select>
            {/* removed retry button per request */}
          </div>
        </div>
      </div>

      <button onClick={predictAge} className="predict-button">
        Check Age
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {age !== null && !error && (
        <div style={{ marginTop: "20px", fontSize: "1.2em" }}>
          Estimated age for "{name}" is: {age} years old {countryCode ? `in ${countryCode}` : ""}
        </div>
      )}


    
    </div>
  );
};

export default Home;