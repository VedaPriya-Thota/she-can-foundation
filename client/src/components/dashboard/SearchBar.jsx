import { Search } from "lucide-react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-8">

      <div className="relative">

        <Search
          className="absolute left-4 top-4 text-gray-400"
          size={20}
        />

        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="w-full bg-white/10 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-pink-500 transition"
        />
      </div>
    </div>
  );
};

export default SearchBar;