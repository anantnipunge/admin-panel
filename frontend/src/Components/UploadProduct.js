// import React, { useState } from "react";

// const UploadProduct = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     imageUrl: "",
//     photos: [],
//     category: "",
//     rating: 0,
//     // category: [], //must be array
//   });

//   const apiEndpoint = process.env.REACT_APP_API_ENDPOINT + "/api";
//   // const apiEndpoint = "https://545c-2409-40c2-1031-64f7-f40a-ab2c-b635-3239.ngrok-free.app/api";

//   const handleInputChange = (e) => {
//     const { title, value } = e.target;
//     const titleParts = title.split(".");
//     if (titleParts.length === 2) {
//       setFormData({
//         ...formData,
//         [titleParts[0]]: {
//           ...formData[titleParts[0]],
//           [titleParts[1]]: value,
//         },
//       });
//     } else {
//       setFormData({ ...formData, [title]: value });
//     }
//   };

//   const handleAddPhoto = () => {
//     const newPhotos = [...formData.photos];
//     newPhotos.push("");
//     setFormData({ ...formData, photos: newPhotos });
//   };

//   /*
//   COMMENT BY ANANT 
//   // const handleAddCategory = () => {
//   //   const newCategory = [...formData.category];
//   //   newCategory.push("");
//   //   setFormData({ ...formData, Category: newCategory });
//   // };

//   // const handleCategoryChange = (e, index) => {
//   //   const newCategory = [...formData.category];
//   //   newCategory[index] = e.target.value;
//   //   setFormData({ ...formData, category: newCategory });
//   // };

//   const handlePhotoChange = (e, index) => {
//     const newPhotos = [...formData.photos];
//     newPhotos[index] = e.target.value;
//     setFormData({ ...formData, photos: newPhotos });
//   };
//  */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         apiEndpoint + "/product/upload",
//         formData
//       );

//       console.log("product created:", response.data.product);
//       setFormData({
//         title: "",
//         description: "",
//         imageUrl: "",
//         photos: [],
//         category: "",
//         rating: 0,
//       });
//     } catch (error) {
//       console.error("Error creating product:", error);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-4 border rounded shadow bg-gray-100 p-4 flex-grow">
//       <div class="text-center">
//         <div class="text-2xl font-semibold">Admin Panel</div>
//         <div class="text-xs bg-gradient-to-r from-emerald-500 to-emerald-900 bg-clip-text text-transparent">
//           Powered by Alpha
//         </div>
//       </div>
//       <form onSubmit={handleSubmit}>
//         {/* Hotel title */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Product title
//           </label>
//           <input
//             type="text"
//             title="title"
//             value={formData.title}
//             onChange={handleInputChange}
//             placeholder="Product title"
//             required="true"
//             className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>

//         {/* Description */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Description
//           </label>
//           <textarea
//             title="description"
//             value={formData.description}
//             onChange={handleInputChange}
//             placeholder="Product description"
//             required="true"
//             className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           ></textarea>
//         </div>

//         {/* Category */}
//         <CategoryDropdown formData={formData} handleInputChange={handleInputChange}/>

//         {/* Image */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Product Image
//           </label>
//           <input
//             type="text"
//             title="imageUrl"
//             value={formData.imageUrl}
//             onChange={handleInputChange}
//             placeholder="image URL"
//             required="true"
//             className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>

//         {/* Photos */}
//         <div className="mb-4 flex flex-wrap items-center">
//           <label className="block text-gray-700 text-sm font-bold mb-2 mr-10">
//             Photos Array
//           </label>
//           {formData.photos.map((photo, index) => (
//             <div key={index} className="w-full md:w-5/6">
//               <input
//                 type="text"
//                 title={`photos[${index}]`}
//                 value={photo}
//                 onChange={(e) => handlePhotoChange(e, index)}
//                 placeholder={`Add >3 image URL's`}
//                 className="border rounded w-100% py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               />
//             </div>
//           ))}
//           <div className="w-full md:w-1/6 mt-2 md:mt-0">
//             <button
//               type="button"
//               onClick={handleAddPhoto}
//               className="bg-gray-500 hover:bg-black-700 text-white font-bold py-1 px-1 rounded-full focus:outline-none focus:shadow-outline w-6 h-6 flex items-center justify-center"
//             >
//               <AddCircular />
//             </button>
//           </div>
//         </div>

//         {/* Rating */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Rating (0 - 5)
//           </label>
//           <input
//             type="number"
//             title="rating"
//             value={formData.rating}
//             onChange={handleInputChange}
//             placeholder="rating"
//             className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>

//         {/* Submit Button */}
//         <div className="mt-4 text-center">
//           <button
//             type="submit"
//             className="bg-gradient-to-r from-green-400 to-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Upload
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UploadProduct;

// /** COMMENT BY ANANT  */
// // <div className="h-screen flex flex-col">
// //       {/* Section 1 */}
// //       <div className="bg-gray-200 p-4">
// //         <div class="text-center">
// //           <div class="text-2xl font-semibold">Admin Panel</div>
// //           <div class="text-xs text-red-700">Powered by Alpha</div>
// //         </div>
// //         <form onSubmit={handleSubmit}>
// //           {/* ... your form fields for Section 1 ... */}
// //         </form>
// //       </div>

// //       {/* Section 2 */}
// //       <div className="bg-gray-100 p-4 flex-grow">
// //         {/* ... your form fields for Section 2 ... */}
// //       </div>

// //       {/* Section 3 */}
// //       <div className="bg-gray-200 p-4">
// //         {/* ... your form fields for Section 3 ... */}
// //       </div>
// //     </div>*/
 
import React, { useState } from "react";

const UploadProduct = () => {
  const [formData, setFormData] = useState({
    id: "0",
    name: "",
    model: "",
    category: "",
    price: 0,
    offerPercentage: 0,
    description: "",
    colors: [],
    sizes: [],
    images: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddColor = () => {
    setFormData({ ...formData, colors: [...formData.colors, ""] });
  };

  const handleAddSize = () => {
    setFormData({ ...formData, sizes: [...formData.sizes, ""] });
  };

  const handleAddImage = () => {
    setFormData({ ...formData, images: [...formData.images, ""] });
  };

  const handleColorChange = (e, index) => {
    const newColors = [...formData.colors];
    newColors[index] = e.target.value;
    setFormData({ ...formData, colors: newColors });
  };

  const handleSizeChange = (e, index) => {
    const newSizes = [...formData.sizes];
    newSizes[index] = e.target.value;
    setFormData({ ...formData, sizes: newSizes });
  };

  const handleImageChange = (e, index) => {
    const newImages = [...formData.images];
    newImages[index] = e.target.value;
    setFormData({ ...formData, images: newImages });
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const handleAddItem = (type) => {
    setFormData({ ...formData, [type]: [...formData[type], ""] });
  };

  const handleItemChange = (e, index, type) => {
    const newItems = [...formData[type]];
    newItems[index] = e.target.value;
    setFormData({ ...formData, [type]: newItems });
  };

  const renderDropdown = (type) => {
    const items = formData[type];
    return (
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </label>
        <select
          name={type}
          value=""
          onChange={(e) => handleItemChange(e, -1, type)}
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="" disabled>
            Select {type}
          </option>
          {items.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Perform your upload logic here using axios or fetch
      console.log("Product details uploaded:", formData);
      // Reset the form data after successful upload
      setFormData({
        id: "0",
        name: "",
        model: "",
        category: "",
        price: 0,
        offerPercentage: 0,
        description: "",
        colors: [],
        sizes: [],
        images: [],
      });
    } catch (error) {
      console.error("Error uploading product details:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow bg-gray-100 p-4 flex-grow mt-4">
      <div class="text-center">
        <div class="text-2xl font-semibold">Admin Panel</div>
        <div class="text-xs bg-gradient-to-r from-emerald-500 to-emerald-900 bg-clip-text text-transparent">
          Powered by Alpha
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Product ID
          </label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Model
          </label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Price (in INR)
          </label>
          <input
            type="float"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Offer Percentage (%)
          </label>
          <input
            type="float"
            name="offerPercentage"
            value={formData.offerPercentage}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/**PREVIOUS DESCRIPTION WAS NOT DYNAMIC IN SIZE */}
        {/* <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div> */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Product description"
            required="true"
            rows={2} // Set the number of rows to control the initial height
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
          ></textarea>
        </div>


{/**  COMMENT BY AKASH: PREVIOUS COLORS, SIZES AND IMAGES NOT IN LIST!!!
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            colors
          </label>
          <input
            type="text"
            name="colors"
            value={formData.colors}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
  </div> 
  */}
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Colors
          </label>
          {formData.colors.map((color, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                name={`colors[${index}]`}
                value={color}
                onChange={(e) => handleItemChange(e, index, "colors")}
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddItem("colors")}
            className="bg-gray-500 hover:bg-black-700 text-white font-bold py-1 px-1 rounded-full focus:outline-none focus:shadow-outline"
          >
            Add Color
          </button>
        </div>
        {/* {renderDropdown("colors")}
        <button
          type="button"
          onClick={() => handleAddItem("colors")}
          className="bg-gray-500 hover:bg-black-700 text-white font-bold py-1 px-1 rounded-full focus:outline-none focus:shadow-outline"
        >
          Add Color
        </button> */}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            sizes
          </label>
          <input
            type="text"
            name="sizes"
            value={formData.sizes}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            images
          </label>
          <input
            type="text"
            name="images"
            value={formData.images}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
  </div> 
  */}
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Colors
          </label>
          {formData.colors.map((color, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                name={`colors[${index}]`}
                value={color}
                onChange={(e) => handleItemChange(e, index, "colors")}
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddItem("colors")}
            className="bg-gray-500 hover:bg-black-700 text-white font-bold py-1 px-1 rounded-full focus:outline-none focus:shadow-outline"
          >
            Add Color
          </button>
        </div>
        {/* {renderDropdown("colors")}
        <button
          type="button"
          onClick={() => handleAddItem("colors")}
          className="bg-gray-500 hover:bg-black-700 text-white font-bold py-1 px-1 rounded-full focus:outline-none focus:shadow-outline"
        >
          Add Color
        </button> */}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Sizes
          </label>
          {formData.sizes.map((size, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                name={`sizes[${index}]`}
                value={size}
                onChange={(e) => handleItemChange(e, index, "sizes")}
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddItem("sizes")}
            className="bg-gray-500 hover:bg-black-700 text-white font-bold py-1 px-1 rounded-full focus:outline-none focus:shadow-outline"
          >
            Add Size
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Images
          </label>
          {formData.images.map((image, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                name={`images[${index}]`}
                value={image}
                onChange={(e) => handleItemChange(e, index, "images")}
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddItem("images")}
            className="bg-gray-500 hover:bg-black-700 text-white font-bold py-1 px-1 rounded-full focus:outline-none focus:shadow-outline"
          >
            Add Image
          </button>
        </div>


        {/* Add other input fields for product details */}
        {/* ... */}

        <div className="mt-4 text-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-green-400 to-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Upload Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadProduct;
