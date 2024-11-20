import React, { useState, useEffect } from 'react';

  /******************************************** */




const Home = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(null);
  const [countryCode, setCountryCode] = useState("");
  const [error, setError] = useState("");
  const [countryCodes, setCountryCodes] = useState([]);

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

  useEffect(() => {
    const fetchCountryCodes = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const codes = data.map(country => ({
          code: country.cca2,
          name: country.name.common
        }));
        setCountryCodes(codes);
      } catch (error) {
        console.error("Error fetching country codes:", error);
      }
    };

    fetchCountryCodes();
  }, []);

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
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          value={name}
          onChange={handleInputChange}
          placeholder="Enter a name"
          className="field-input"
        />
      </div>



      <div className="input-container">
        <label htmlFor="countryCode">Country Code:</label>
        <select
          className="field-input"
          value={countryCode}
          onChange={handleCountryChange}
        >
          <option value="">Select a country</option>
          {renderCountryOptions()}
        </select>
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