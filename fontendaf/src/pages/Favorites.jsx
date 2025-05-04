import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAllCountries } from "../api/countries";

export default function Favorites() {
  const [favoriteCountries, setFavoriteCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = JSON.parse(localStorage.getItem("user"))?.username;

  const toggleFavorite = (cca3) => {
    const favoritesKey = `favorites_${username}`;
    const favorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];

    let updatedFavorites;
    if (favorites.includes(cca3)) {
      updatedFavorites = favorites.filter(code => code !== cca3);
    } else {
      updatedFavorites = [...favorites, cca3];
    }

    localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
    window.location.reload(); // To re-render
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      const favoritesKey = `favorites_${username}`;
      const favoriteCodes = JSON.parse(localStorage.getItem(favoritesKey)) || [];

      try {
        const response = await getAllCountries();
        const allCountries = response.data;
        const favs = allCountries.filter((country) =>
          favoriteCodes.includes(country.cca3)
        );
        setFavoriteCountries(favs);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch countries", err);
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [username]);

  if (loading) return <div>Loading favorites...</div>;

  return (
    <>
      <Navbar />
      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">My Favorite Countries</h2>
        {favoriteCountries.length === 0 ? (
          <p className="text-center text-gray-600">No favorites added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 shadow rounded-lg">
              <thead className="bg-gray-100 text-gray-700 text-[18px]  h-20">
                <tr>
                  <th className="py-3 px-4 text-left">Flag</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Region</th>
                  <th className="py-3 px-4 text-left">Capital</th>
                  <th className="py-3 px-4 text-left">Population</th>
                  <th className="py-3 px-4 text-left">Languages</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 text-sm ">
                {favoriteCountries.map((country) => (
                  <tr key={country.cca3} className="border-t hover:bg-gray-50 h-15">
                    <td className="py-3 px-4">
                      <img
                        src={country.flags.svg}
                        alt={`Flag of ${country.name.common}`}
                        className="w-10 h-6 object-cover rounded"
                      />
                    </td>
                    <td className="py-3 px-4 font-medium">
                      <a
                        href={`/country/${country.cca3}`}
                        className="text-blue-600 hover:underline"
                      >
                        {country.name.common}
                      </a>
                    </td>
                    <td className="py-3 px-4">{country.region}</td>
                    <td className="py-3 px-4">{country.capital?.[0] || "N/A"}</td>
                    <td className="py-3 px-4">{country.population.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      {country.languages
                        ? Object.values(country.languages).join(", ")
                        : "N/A"}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => toggleFavorite(country.cca3)}
                        className="px-3 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200 text-xs font-medium"
                      >
                        ❤️ Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
