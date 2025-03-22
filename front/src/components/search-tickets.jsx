import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react"; // Import the Search icon

function SearchTickets() {
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {

  }, [])
  
  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // if (onSearch) {
    //   onSearch(value); // Pass the search term to the parent component
    // }
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        placeholder="Rechercher des tickets..."
        value={searchTerm}
        onChange={handleInputChange}
        className="pl-10" // Add padding to the left to make space for the icon
      />
    </div>
  );
}

export default SearchTickets;