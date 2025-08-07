import React, { useState } from 'react';
import axios from 'axios';

const AddProperty = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    image: ''
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append('image', file);

    try {
      setUploading(true);
      const res = await axios.post('http://localhost:5000/api/properties/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setFormData((prev) => ({ ...prev, image: res.data.imageUrl }));
    } catch (err) {
      console.error('Image upload failed:', err);
      alert('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/properties', formData);
      alert('Property added!');
      setFormData({
        title: '',
        description: '',
        price: '',
        location: '',
        bedrooms: '',
        bathrooms: '',
        image: ''
      });
    } catch (err) {
      console.error('Submit failed:', err);
      alert('Error adding property');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Add New Property</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="border rounded px-3 py-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="border rounded px-3 py-2"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="border rounded px-3 py-2"
        />
        <input
          type="number"
          name="bedrooms"
          placeholder="Bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
          required
          className="border rounded px-3 py-2"
        />
        <input
          type="number"
          name="bathrooms"
          placeholder="Bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
          required
          className="border rounded px-3 py-2"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="file-input file-input-bordered"
        />
        {uploading && <p className="text-sm text-gray-500">Uploading image...</p>}
        {formData.image && (
          <img
            src={`http://localhost:5000${formData.image}`}
            alt="Preview"
            className="w-32 h-32 object-cover mt-2"
          />
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
