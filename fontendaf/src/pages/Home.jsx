import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { getAllCountries, getCountriesByRegion, getCountryByName } from "../api/countries";
import CountryCard from "../components/CountryCard";

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        let response = [];
        // Fetch countries based on region and language filters
        if (selectedRegion === "All") {
          // If no region selected, fetch all countries
          response = await getAllCountries();
        } else {
          // Fetch countries by region
          response = await getCountriesByRegion(selectedRegion);
        }

        if (searchTerm) {
          // Search countries by name if search term is provided
          response = await getCountryByName(searchTerm);
        }

        setCountries(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCountries();
  }, [selectedRegion, searchTerm]);

  const allLanguages = Array.from(
    new Set(
      countries.flatMap((country) => country.languages ? Object.values(country.languages) : [])
    )
  ).sort();

  // Filter countries based on selected language
  const languageFilteredCountries = countries.filter((country) => {
    if (selectedLanguage === "All") return true;
    if (!country.languages) return false;
    return Object.values(country.languages).includes(selectedLanguage);
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="" style={{ backgroundColor: "rgba(245, 245, 245)" }}>
      <Navbar />
      
      <div className=" p-6 md:p-10  max-w-7xl mx-auto mt-8">

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by country name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          style={{ backgroundColor: "rgb(255, 255, 255)" }}
        />

        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="w-full md:w-1/4 px-5 py-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="All">🌍 All Regions</option>
          <option value="Africa">🌍 Africa</option>
          <option value="Americas">🌎 Americas</option>
          <option value="Asia">🌏 Asia</option>
          <option value="Europe">🌍 Europe</option>
          <option value="Oceania">🌊 Oceania</option>
        </select>

        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="w-full md:w-1/4 px-5 py-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="All">🈯 All Languages</option>
          {allLanguages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-8 mt-10 text-gray-800"><span className="mr-4">🌐</span>Explore Countries Around the Globe</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {languageFilteredCountries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </ul>
      </div>
    </div>

    </div>
  );
}
