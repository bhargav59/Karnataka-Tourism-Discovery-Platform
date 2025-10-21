import { useState } from "react";

export default function FilterPanel({ onFilterChange }) {
  const [filters, setFilters] = useState({
    type: "",
    district: "",
    category: "",
    entryFee: "",
  });

  const types = ["temple", "modern", "quirky", "historical", "nature"];
  const districts = [
    "Bangalore Urban",
    "Mysore",
    "Mangalore",
    "Udupi",
    "Hampi",
    "Coorg",
    "Chikmagalur",
    "Hassan",
  ];
  const categories = [
    "religious",
    "cultural",
    "historical",
    "nature",
    "adventure",
    "architectural",
  ];

  const handleFilterChange = (filterName, value) => {
    const newFilters = {
      ...filters,
      [filterName]: value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters = {
      type: "",
      district: "",
      category: "",
      entryFee: "",
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Clear All
        </button>
      </div>

      {/* Type Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Type
        </label>
        <select
          value={filters.type}
          onChange={(e) => handleFilterChange("type", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Types</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* District Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          District
        </label>
        <select
          value={filters.district}
          onChange={(e) => handleFilterChange("district", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Districts</option>
          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Category
        </label>
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Entry Fee Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Entry Fee
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="entryFee"
              value=""
              checked={filters.entryFee === ""}
              onChange={(e) => handleFilterChange("entryFee", e.target.value)}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">All</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="entryFee"
              value="free"
              checked={filters.entryFee === "free"}
              onChange={(e) => handleFilterChange("entryFee", e.target.value)}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Free</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="entryFee"
              value="paid"
              checked={filters.entryFee === "paid"}
              onChange={(e) => handleFilterChange("entryFee", e.target.value)}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Paid</span>
          </label>
        </div>
      </div>
    </div>
  );
}
