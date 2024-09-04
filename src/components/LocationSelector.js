import { useState, useEffect } from "react";

const cities = [
  { name: "Bangalore", lat: 12.9715987, lng: 77.5945627 },
  { name: "Mumbai", lat: 19.0760, lng: 72.8777 },
  { name: "Delhi", lat: 28.6139, lng: 77.2090 },
  { name: "Chennai", lat: 13.0827, lng: 80.2707 },
  { name: "Ghaziabad", lat: 28.6692, lng: 77.4538 },
  { name: "Noida", lat: 28.5355, lng: 77.3910 },
];

const LocationSelector = ({ onLocationChange }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    handleAutoDetect();
  }, []);

  const handleCityChange = (e) => {
    const city = cities.find((c) => c.name === e.target.value);
    setSelectedCity(city ? city.name : "");
    if (city) {
      onLocationChange({ lat: city.lat, lng: city.lng });
      setErrorMessage(""); // Clear any previous error messages
      setShowDropdown(false); // Hide dropdown after selecting a city
    }
  };

  const handleAutoDetect = () => {
    if (!navigator.geolocation) {
      setErrorMessage("Geolocation is not supported by this browser.");
      setShowDropdown(true); // Show dropdown if geolocation is not supported
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
        onLocationChange({ lat: latitude, lng: longitude });
        setErrorMessage(""); // Clear error message
        setShowDropdown(true); // Show dropdown for city selection
      },
      (error) => {
        setErrorMessage("Failed to detect location. Please select a city.");
        setShowDropdown(true); // Show dropdown when auto-detect fails
      }
    );
  };

  return (
    <div className="location-selector">
      {showDropdown && (
        <select value={selectedCity} onChange={handleCityChange}>
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      )}
      <button onClick={handleAutoDetect}>Re-Detect Location</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default LocationSelector;
