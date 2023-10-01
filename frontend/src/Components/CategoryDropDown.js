import React from "react";

const categories = [
  "Electronics",
  "Furniture",
  "Chair",
  "Table",
  "Bag",
  "Wallpaper",
];

const CategoryDropdown = ({ formData, handleInputChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Category
      </label>
      <select
        title="category"
        value={formData.category}
        onChange={handleInputChange}
        placeholder="category"
        required="true"
        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropdown;
