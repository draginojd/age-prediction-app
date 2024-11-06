import './App.css'
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(null);
  const [countryCode, setCountryCode] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    setName(event.target.value);
  };


  const handleCountryChange = async (event) => {
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
        `https://api.agify.io?name=${name}${countryCode ? `&country_id=${countryCode}` : ""}`);
      const data = await response.json();
      setAge(data.age);
    } catch (error) {
      setError("Error fetching data. Please try again later.");
      console.error("Error:", error);
    }
  };

  return (
    
    <div className='app-container' style={{ textAlign: "center", paddingTop: "50px" }}>
      <nav>
          <h1>Armins Age Prediction App</h1>
      </nav>
   
    
     <div className="prediction-container">
       

        <h2>Predict Age by Name</h2>

        <p>Enter a name and country code to predict the age of a person.</p>
    
    
        

        <div className="inputs-container">
          <div className="input-container">
          <label htmlFor="name">Name:</label>
              <input
              className='field-input'
              type="text"
              value={name}
              onChange={handleInputChange}
              placeholder="Enter a name"
              style={{ padding: "10px", fontSize: "1em" }}
            />
            
          </div>

          <div className="input-container">
              <label htmlFor="countryCode">Country Code:</label>
              <input className='field-input'
                type="text"
                value={countryCode}
                onChange={handleCountryChange}
                placeholder="Enter country code (example: US, EN, IN SE, DE, DK etc.)"
                style={{ padding: "10px", fontSize: "1em", marginLeft: "10px" }}
              />
          </div>
            

        </div>
     

      <button onClick={predictAge} style={{ padding: "10px 20px", marginLeft: "10px" }}>
        Check Age
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {age !== null && !error && (
        <div style={{ marginTop: "20px", fontSize: "1.2em" }}>
          Predicted age for "{name}" is: {age} years old
        </div>
      )}
    
     </div>
     

    </div>
  );
}

export default App;

