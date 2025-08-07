import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/properties');
        setProperties(res.data);
      } catch (err) {
        console.error('Error fetching properties:', err.message);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">It works!</h1>
      <h2 className="text-xl font-semibold mb-6">Available Properties</h2>
      <div className="flex flex-wrap gap-4">
        {properties.map((prop) => (
          <Link
            key={prop._id}
            to={`/properties/${prop._id}`}
            className="no-underline text-inherit"
          >
            <div className="border border-gray-300 rounded-lg p-4 w-64 shadow hover:shadow-lg transition">
              <img
                src={prop.image}
                alt={prop.title}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-semibold">{prop.title}</h3>
              <p><strong>Location:</strong> {prop.location}</p>
              <p><strong>Price:</strong> ${prop.price.toLocaleString()}</p>
              <p>
                <strong>Bedrooms:</strong> {prop.bedrooms}, <strong>Bathrooms:</strong> {prop.bathrooms}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;

