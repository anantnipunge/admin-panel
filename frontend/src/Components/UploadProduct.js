import React, { useState } from "react";
import { storage, database, firestore } from '../config/firebase';
import { collection, addDoc } from "firebase/firestore";

const UploadProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    category: "",
    price: 0,
    offerPercentage: 0,
    description: "",
    images: [],
  });
  const [isLoading,setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddItem = (type) => {
    setFormData({ ...formData, [type]: [...formData[type], ""] });
  };

  const handleModelChange = async (e) => {
    setIsLoading(true);
    const currentFile = e.target.files[0];
    const modelName = `${Date.now()}_${currentFile.name}`; // Generate a unique name for the model file
    const modelRef = storage.ref().child(`models/${modelName}`);
    await modelRef.put(formData.model);
    const modelUrl = await modelRef.getDownloadURL();
    const updatedObject = {target : {name : 'model',value:modelUrl}};
    handleInputChange(updatedObject);
    setIsLoading(false);
    // setFormData({ ...formData, model: modelUrl });
  };

  const handleItemChange = async (e, index, type) => {
    setIsLoading(true);
    const newItems = [...formData[type]];
    const imageFile = e.target.files[0];
    const imageName = `${Date.now()}_${imageFile.name}`; // Generate a unique name for each image
    const imageRef = storage.ref().child(`images/${imageName}`);
    await imageRef.put(imageFile);
    const imageUrl = await imageRef.getDownloadURL();
    newItems[index] = imageUrl;
    console.log('imgurl is',imageUrl);
    setFormData({ ...formData, [type]: newItems });
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productsCollection = collection(firestore, 'Products');
      const productRef = await addDoc(productsCollection, formData);

      // Perform your upload logic here using axios or fetch
      // Reset the form data after successful upload
      setFormData({
        name: "",
        model: "",
        category: "",
        price: "",
        offerPercentage: "",
        description: "",
        images: [],
      });
      alert("Product details uploaded");
      window.location.reload();
    } catch (error) {
      console.error("Error uploading product details:", error);
    }
  };

  // Define a function to handle file selection
  // const handleFileSelect = (event,isModel) => {
  //   const curretnFile = event.target.files[0]; // Get the selected files
  //   console.log('filename is ',curretnFile.name);

  //   if(isModel){
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       model: curretnFile, // Append selectedFiles to existing images array
  //     }));
  //   }else{
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       images: [...prevFormData.images, curretnFile], // Append selectedFiles to existing images array
  //     }));
  //   }
  // };


  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow bg-gray-100 p-4 flex-grow mt-4">
      <div className="text-center">
        <div className="text-2xl font-semibold">Admin Panel</div>
        <div className="text-xs bg-gradient-to-r from-emerald-500 to-emerald-900 bg-clip-text text-transparent">
          Powered by Alpha
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Product Name
          </label>
          <input
            type="text"
            required
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
            type="file"
            required
            name="model"
            // value={formData.model}/
            onChange={(e) => handleModelChange(e)}
            // onChange={handleFileSelect}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category
          </label>
          <input
            type="text"
            required
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
            type="number"
            required
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
            type="number"
            required
            name="offerPercentage"
            value={formData.offerPercentage}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            name="description"
            required
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Product description"
            rows={2} // Set the number of rows to control the initial height
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Images
          </label>
          {formData.images?.map((image, index) => (
            <div key={index} className="mb-2">
              <input
                type="file"
                required
                name={`images[${index}]`}
                // value={formData.images[index]}
                onChange={(e) => handleItemChange(e, index, "images")}
                // onChange={handleFileSelect}
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
            style={{cursor:'pointer'}}
            // className="bg-gradient-to-r from-green-400 to-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            className={`bg-gradient-to-r from-green-400 to-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isLoading ? 'opacity-50' : ''}`}
            disabled={isLoading}
          >
            Upload Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadProduct;
