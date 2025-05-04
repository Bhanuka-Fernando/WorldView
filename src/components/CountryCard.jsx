import React from "react";
import { Link } from "react-router-dom";

const CountryCard = ({ country }) => {

    const username = JSON.parse(localStorage.getItem("user"))?.username;
    const favoritesKey = `favorites_${username}`;
    const favorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];

    const isFavorite = favorites.includes(country.cca3);

    const toggleFavorite = () => {
        let updatedFavorites;
        if (isFavorite) {
          updatedFavorites = favorites.filter((code) => code !== country.cca3);
        } else {
          updatedFavorites = [...favorites, country.cca3];
        }
        localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
        window.location.reload(); 
      };


    return (
        <li className=" border-black-200 rounded-2xl p-5 shadow hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
        style={{ backgroundColor: "rgb(255, 255, 255)" }}
        >
        <Link to={`/country/${country.cca3}`}>
          <div className="flex flex-col items-center">
            <img
              src={country.flags.svg}
              alt={`Flag of ${country.name.common}`}
              className="w-28 h-20 object-contain mb-3 rounded shadow-md "
            />
            <h3 className="font-semibold text-lg text-center text-black-800 mb-2 tracking-wider">{country.name.common}</h3>
          </div>
          <div className="text-sm text-black-700 mt-2 mb-1 space-y-2">
            <div className="flex justify-between">
              <span className="font-medium flex items-center gap-1">
                🌍 <span className="text-black-600">Region:</span>
              </span>
              <span className="text-gray-800">{country.region}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium flex items-center gap-1">
                🏛️ <span className="text-black-600">Capital:</span>
              </span>
              <span className="text-gray-800">{country.capital?.[0] || "N/A"}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium flex items-center gap-1">
                👥 <span className="text-black-600">Population :</span>
              </span>
              <span className="text-gray-800 ">{country.population.toLocaleString()}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium flex items-center gap-1">
                🗣️ <span className="text-black-600">Languages:</span>
              </span>
              <span className="text-gray-800 text-right">
                {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}
              </span>
            </div>
          </div>

        </Link>
      
        <button
          onClick={toggleFavorite}
          className={`mt-4 w-full py-2 rounded-lg text-sm font-medium transition text-black`}
          style={{
            backgroundColor: isFavorite ? "rgb(28, 133, 31)" : "rgb(233, 228, 228)", 
          }}
        >
          <span className="mr-3">❤️</span>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>

      </li>
    
    );
  };

  export default CountryCard;
  