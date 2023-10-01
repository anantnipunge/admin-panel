import React, { useState } from "react";
import AddCircular from "../Icons/Add";
import CategoryDropdown from "./CategoryDropDown";
import axios from "axios";

const UploadProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    photos: [],
    category: "",
    rating: 0,
    // category: [], //must be array
  });

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT + "/api";
  // const apiEndpoint = "https://545c-2409-40c2-1031-64f7-f40a-ab2c-b635-3239.ngrok-free.app/api";

  const handleInputChange = (e) => {
    const { title, value } = e.target;
    const titleParts = title.split(".");
    if (titleParts.length === 2) {
      setFormData({
        ...formData,
        [titleParts[0]]: {
          ...formData[titleParts[0]],
          [titleParts[1]]: value,
        },
      });
    } else {
      setFormData({ ...formData, [title]: value });
    }
  };

  const handleAddPhoto = () => {
    const newPhotos = [...formData.photos];
    newPhotos.push("");
    setFormData({ ...formData, photos: newPhotos });
  };

  // const handleAddCategory = () => {
  //   const newCategory = [...formData.category];
  //   newCategory.push("");
  //   setFormData({ ...formData, Category: newCategory });
  // };

  // const handleCategoryChange = (e, index) => {
  //   const newCategory = [...formData.category];
  //   newCategory[index] = e.target.value;
  //   setFormData({ ...formData, category: newCategory });
  // };

  const handlePhotoChange = (e, index) => {
    const newPhotos = [...formData.photos];
    newPhotos[index] = e.target.value;
    setFormData({ ...formData, photos: newPhotos });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        apiEndpoint + "/product/upload",
        formData
      );

      console.log("product created:", response.data.product);
      setFormData({
        title: "",
        description: "",
        imageUrl: "",
        photos: [],
        category: "",
        rating: 0,
      });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow bg-gray-100 p-4 flex-grow">
      <div class="text-center">
        <div class="text-2xl font-semibold">Admin Panel</div>
        <div class="text-xs bg-gradient-to-r from-emerald-500 to-emerald-900 bg-clip-text text-transparent">
          Powered by Alpha
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Hotel title */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Product title
          </label>
          <input
            type="text"
            title="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Product title"
            required="true"
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            title="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Product description"
            required="true"
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>

        {/* Category */}
        <CategoryDropdown formData={formData} handleInputChange={handleInputChange}/>

        {/* Image */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Product Image
          </label>
          <input
            type="text"
            title="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            placeholder="image URL"
            required="true"
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Photos */}
        <div className="mb-4 flex flex-wrap items-center">
          <label className="block text-gray-700 text-sm font-bold mb-2 mr-10">
            Photos Array
          </label>
          {formData.photos.map((photo, index) => (
            <div key={index} className="w-full md:w-5/6">
              <input
                type="text"
                title={`photos[${index}]`}
                value={photo}
                onChange={(e) => handlePhotoChange(e, index)}
                placeholder={`Add >3 image URL's`}
                className="border rounded w-100% py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          ))}
          <div className="w-full md:w-1/6 mt-2 md:mt-0">
            <button
              type="button"
              onClick={handleAddPhoto}
              className="bg-gray-500 hover:bg-black-700 text-white font-bold py-1 px-1 rounded-full focus:outline-none focus:shadow-outline w-6 h-6 flex items-center justify-center"
            >
              <AddCircular />
            </button>
          </div>
        </div>

        {/* Rating */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Rating (0 - 5)
          </label>
          <input
            type="number"
            title="rating"
            value={formData.rating}
            onChange={handleInputChange}
            placeholder="rating"
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-4 text-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-green-400 to-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadProduct;

// <div className="h-screen flex flex-col">
//       {/* Section 1 */}
//       <div className="bg-gray-200 p-4">
//         <div class="text-center">
//           <div class="text-2xl font-semibold">Admin Panel</div>
//           <div class="text-xs text-red-700">Powered by Alpha</div>
//         </div>
//         <form onSubmit={handleSubmit}>
//           {/* ... your form fields for Section 1 ... */}
//         </form>
//       </div>

//       {/* Section 2 */}
//       <div className="bg-gray-100 p-4 flex-grow">
//         {/* ... your form fields for Section 2 ... */}
//       </div>

//       {/* Section 3 */}
//       <div className="bg-gray-200 p-4">
//         {/* ... your form fields for Section 3 ... */}
//       </div>
//     </div>
