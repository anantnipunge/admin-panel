import React, { useState } from "react";
import { storage, database, firestore } from '../config/firebase';
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../config/firebase';

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

  const uploadFile = (file, fileType) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const folder = fileType === "images" ? "images/" : "models/";
      const fileName = new Date().getTime() + "_" + file.name;
      const storageRef = ref(storage, folder + fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle state changes if needed
        },
        (error) => {
          console.log(error);
          reject(error); // Reject promise on error
        },
        () => {
          // Upload completed successfully, resolve with the download URL
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL);
            })
            .catch((error) => {
              reject(error); // Reject promise if getting download URL fails
            });
        }
      );
    });
  };

  const handleModelChange = async (e) => {
    setIsLoading(true);
    try {
      const modelFile = e.target.files[0];
      const modelUrl = await uploadFile(modelFile);
      setFormData(prevState => ({
        ...prevState,
        model: modelUrl
      }));
      console.log('model url is', formData);
    } catch (error) {
      console.error('Error uploading model:', error);
      alert('Error uploading model. Please try again.'); // Show alert on error
      setTimeout(() => {
        window.location.reload(); // Reload page after 2 seconds
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleItemChange = async (e, index, type) => {
    setIsLoading(true);
    try {
      const newItems = [...formData[type]];
      const imageFile = e.target.files[0];
      const imageUrl = await uploadFile(imageFile, "images");
      newItems[index] = imageUrl;
      setFormData({ ...formData, [type]: newItems });
    } catch (error) {
      console.error('Error uploading model:', error);
      alert('Error uploading model. Please try again.'); // Show alert on error
      setTimeout(() => {
        window.location.reload(); // Reload page after 2 seconds
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      formData.price = parseFloat(formData.price); // Parsing price to a float number
      formData.offerPercentage = parseInt(formData.offerPercentage);
      const productsCollection = collection(firestore, 'Products');
      const productRef = await addDoc(productsCollection, formData);
      setFormData({
        name: "",
        model: "",
        category: "",
        price: 0,
        offerPercentage: 0,
        description: "",
        images: [],
      });
      alert("Product details uploaded");
      window.location.reload();
    } catch (error) {
      console.error("Error uploading product details:", error);
    }
  };

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
