import { useState } from "react";
import axios from "axios";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      console.log('searching in frontend...');
      const { data } = await axios.get(`http://localhost:5000/api/search?query=${query}`);
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Search Question Papers</h2>
      
      <form onSubmit={handleSearch} className="flex gap-2">
        <input 
          type="text" 
          placeholder="Enter keyword (e.g., array)" 
          className="border p-2 flex-1 rounded-md" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)}
        />
        <button 
          type="submit" 
          className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300"
        >
          Search
        </button>
      </form>

      {/* Search Results */}
      {results.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold text-gray-700">Results:</h3>
          <ul className="list-disc ml-6">
            {results.map((paper, index) => (
              <li key={index} className="text-gray-600">
                <a href={paper.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  {paper.subject} - {paper.year} ({paper.department}, Sem {paper.semester})
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
