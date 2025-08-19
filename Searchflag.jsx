import { useEffect, useState } from "react";

const SearchFlags = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function getCountries() {
      let resp = await fetch(
        "https://xcountries-backend.azurewebsites.net/all"
      );
      let data = await resp.json();
      setAllCountries(data);
      setCountries(data);
    }
    getCountries();
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setCountries(allCountries);
    } else {
      const filteredCountries = allCountries.filter((ele) => {
        return ele.name.toLowerCase().includes(search.toLowerCase().trim());
      });
      setCountries(filteredCountries);
    }
  }, [search]);

  return (
<div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-blue-200 to-purple-200">
      <h1 className="text-center text-4xl font-bold text-gray-800 py-6 animate-pulse">
  🌍 Search Flags Task
</h1>

    <form className="p-4 flex justify-center items-center">

        <input
  type="search"
  name="search"
  id="search"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search countries..."
  autoComplete="off"
  className="bg-white/70 backdrop-blur-md border border-gray-400 rounded-full w-full max-w-xl p-4 px-6 text-lg shadow-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
/>

      </form>

      <section className="p-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">

        {countries.length === 0 ? (
          <h1>Loading...</h1>
        ) : (
          countries.map((country) => {
            return (
              <div className="border border-gray-400 rounded-xl shadow-2xl p-2 flex flex-col items-center justify-center">
                <img
                  src={country.flag}
                  alt={country.abbr}
                  height={100}
                  width={100}
                />
                <h1>{country.name}</h1>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
};

export default SearchFlags;