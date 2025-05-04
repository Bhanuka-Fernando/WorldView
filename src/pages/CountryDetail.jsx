import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllCountries } from "../api/countries";
import Navbar from "../components/Navbar";

export default function CountryDetail() {
  const { cca3 } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await getAllCountries();
        const found = response.data.find((c) => c.cca3 === cca3);
        setCountry(found);
        setLoading(false);
      } catch (err) {
        console.error("Error loading country data", err);
        setLoading(false);
      }
    };

    fetchCountry();
  }, [cca3]);

  if (loading) return <div>Loading country details...</div>;
  if (!country) return <div>Country not found</div>;

  return (

    <div className="h-[2000px]" style={{ backgroundColor: "rgba(245, 245, 245)" }}>
      <Navbar />

      <div className="mt-10 p-8 max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl">
        <div className="text-3xl font-light text-center text-black-800 tracking-wide">
            <div className="mr-[1000px]  mb-[-40px] ">
            <button
                onClick={() => navigate(-1)}
                className="bg-gray-100 text-black-800 text-xs font-extralight py-2 px-4 rounded-lg hover:bg-gray-200 transition"
            >
                ← Back
            </button>
            </div>
            Details of the Country {country.name.common} </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 ml-2">
            {/* Left Side - Flag and Names */}
            <div className="mt-10 flex flex-col items-center md:items-start gap-8 p-6 rounded-2xl shadow-sm bg-white">
                {/* Flag */}
                <img
                    src={country.flags.svg}
                    alt={`Flag of ${country.name.common}`}
                    className="w-full md:w-[500px] h-auto object-contain rounded-xl "
                />

                {/* Names */}
                <div className="overflow-x-auto">
                <table className="w-78 text-left text-sm text-gray-800 border border-gray-200 rounded-lg">
                    <tbody>
                    <tr className="border-b">
                        <th className="px-4 py-2 bg-gray-50 font-medium text-gray-900">Official</th>
                        <td className="px-4 py-2">{country.name.official}</td>
                    </tr>
                    <tr className="border-b">
                        <th className="px-4 py-2 bg-gray-50 font-medium text-gray-900">Common</th>
                        <td className="px-4 py-2">{country.name.common}</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2 bg-gray-50 font-medium text-gray-900">Native</th>
                        <td className="px-4 py-2">
                        {Object.values(country.name.nativeName || {}).map((n, index, arr) => (
                            <span key={index}>
                            {n.common}
                            {index < arr.length - 1 ? ", " : ""}
                            </span>
                        ))}
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                {/* Border Countries */}
                <div className="w-full mt-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-5">🌐 Bordering Countries</h2>
                    {country.borders?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {country.borders.map((border, index) => (
                        <span
                            key={index}
                            className="mr-2 px-4 py-1 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-full text-sm font-medium text-gray-700 transition-all"
                        >
                            {border}
                        </span>
                        ))}
                    </div>
                    ) : (
                    <p className="text-gray-400 text-sm italic">No bordering countries.</p>
                    )}
                </div>
                </div>


            {/* Right Side - Country Details */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 text-sm md:text-base text-gray-800 ml-50 mt-20 gap-x-[-60px] gap-y-[-10px]">
            <div className="flex flex-col">
                <span className="text-gray-500 font-semibold">🏛️ Capital</span>
                <span>{country.capital?.[0] || "N/A"}</span>
            </div>

            <div className="flex flex-col ">
                <span className="text-gray-500 font-semibold">🌍 Region</span>
                <span>{country.region}</span>
            </div>

            <div className="flex flex-col ">
                <span className="text-gray-500 font-semibold">📍 Subregion</span>
                <span>{country.subregion}</span>
            </div>

            <div className="flex flex-col">
                <span className="text-gray-500 font-semibold ">👥 Population</span>
                <span>{country.population.toLocaleString()}</span>
            </div>

            <div className="flex flex-col ">
                <span className="text-gray-500 font-semibold ">📏 Area</span>
                <span>{country.area.toLocaleString()} km²</span>
            </div>

            <div className="flex flex-col">
                <span className="text-gray-500 font-semibold ">🕒 Timezones</span>
                <span>{country.timezones.join(", ")}</span>
            </div>

            <div className="flex flex-col sm:col-span-2">
                <span className="text-gray-500 font-semibold ">💱 Currencies</span>
                <span>
                {country.currencies
                    ? Object.values(country.currencies).map((c, i) => (
                        <span key={i} className="inline-block mr-2">
                        {c.name} ({c.symbol})
                        </span>
                    ))
                    : "N/A"}
                </span>
            </div>

            <div className="flex flex-col sm:col-span-2">
                <span className="text-gray-500 font-semibold">🗣️ Languages</span>
                <span>{country.languages ? Object.values(country.languages).join(", ") : "N/A"}</span>
            </div>

            <div className="flex flex-col sm:col-span-2 ">
                <span className="text-gray-500 font-semibold mb-1 ">🌐 Google Maps</span>
                <a
                    href={country.maps.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-2 w-30 py-1 rounded-lg text-xs font-medium transition text-black text-center`}
                    style={{ backgroundColor: "rgba(245, 245, 245)" }}
                    >
                    View Location
                    </a>

            </div>
            </div>

        </div>
        </div>

    </div>
  );
}
