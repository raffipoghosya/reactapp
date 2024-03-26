import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCountries();
  }, []); 

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchCountries = () => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        const data = response.data;
        setCountries(data);
        setError(null);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      });
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country === selectedCountry ? null : country);
  };

  const handleLogoClick = () => {
    setSelectedCountry(null);
    setSearchTerm('');
  };

  const filteredCountries = countries.filter(country => {
    return country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="App">
      <header className="header">
        <span className="logo" onClick={handleLogoClick}>LOGO</span>
        <div className="input-container">
          <input
            type="text"
            placeholder="Search for a country..."
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button onClick={fetchCountries} className="search-button">Refresh</button>
        </div>
      </header>

      {error && <p>{error}</p>}

      <div className="middle-section">
        {searchTerm === '' ? (
          <div className="welcome-section">
            <img src="https://s3-alpha-sig.figma.com/img/3434/6dec/252577b899af6bd1f467eaa99acf13c0?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dLHs-saaH9fiZL3ox3giUCHXbcsuYTBwt2tO4~im0D-jcI3XTddZ8J6MSMT9AYXGdffvuymt8knWE6k3SyqCbrqYLEH-3SVv4zD5Ke4gOZ1JPEtIctqCmDn2iasDgmfYhnjVReukRorY1A9XFmKwO45T5tFKv8LgTrY4l27pdTwC6Whh9OE8~LiNX7VWlBoQ1lc8n-9P-YbuA9Z3DodqdlxvJwPdctypC61WhwJR-ky85qS6rTtJzCAUQAnMo8DYvWl78ul0BTJ8KGYUGFRWNiEq7scWEa8W3QCj-YyHobwzCCnyt~CVzG~X5sCxFYavJ~EhfV1Xkpsgyv~UZY15fg__" alt="Welcome Image" />
          </div>
        ) : (
          <div className="countries-list">
            {filteredCountries.map(country => (
              <div key={country.name.common} className="country-card" onClick={() => handleCountryClick(country)}>
                <p className="country-name">{country.name.common}</p>
                {selectedCountry === country && (
                  <div className="country-details">
                    <img src={country.flags.png} alt="Flag" className="country-flag" />
                    <p>Population: {country.population}</p>
                    <p>Capital: {country.capital}</p>
                    <p>Currency: {Object.keys(country.currencies)[0]}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="footer">
        <div className="newsletter">
          <input type="email" placeholder="Email Address" />
          <button className="subscribe-button">Subscribe</button>
        </div>

        <div className="legal-links">
          <p>Privacy policy</p>
          <p>Cookies policy</p>
          <p>Terms of use</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
