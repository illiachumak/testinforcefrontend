import '../scss/AddProduct.scss';
import React, { useState } from 'react';
import axios from 'axios';
import { Product } from '../redux/slices/productListSlice';

interface FormValues<T> {
  [key: string]: T;
}

function AddProduct() {
  const [formData, setFormData] = useState<FormValues<any>>({
    uniqueId: (Math.random()*1000).toString(),
    id: ['0', '1'],
    img: '',
    name: '',
    taste: ['Raspberry', 'Blueberry'],
    weight: ['250g', '300g'],
    popularity: 0,
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'weight') {
      const weightArray = value.split(',');
      setFormData((prevData) => ({
        ...prevData,
        [name]: weightArray,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Type conversion and validation before sending data
    const convertedData: FormValues<any> = {
      uniqueId: formData.uniqueId,
      id: formData.id,
      img: formData.img,
      name: formData.name,
      taste: formData.taste,
      weight: formData.weight,
      popularity: formData.popularity, // Convert to number
      price: formData.popularity, // Convert to number
    };

    for (const field in convertedData) {
      if (convertedData[field] === '') {
        alert('Please fill in all fields');
        return;
      }
    }

    try {
      const response = await axios.post('http://localhost:3001/product', convertedData);
      if (response.data === 'success') {
        alert('Product added to the list');
      }

      setFormData({
        id: [0, 1],
        img: '',
        name: '',
        taste: ['Crunchy', 'Smooth'],
        weight: ['250g', '300g'],
        popularity: 0,
        price: 0,
      } as Product);
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <div className='wrapper-add'>
    <form onSubmit={handleSubmit}>
      <label htmlFor="id">ID:</label>
      <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} />

      <label htmlFor="img">Image URL:</label>
      <input type="text" id="img" name="img" value={formData.img} onChange={handleChange} />

      <label htmlFor="name">Product Name:</label>
      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />

      <label htmlFor="taste">Taste:</label>
      <input type="text" id="taste" name="taste" value={formData.taste} onChange={handleChange} />

      <label htmlFor="weight">Weight:</label>
      <input type="text" id="weight" name="weight" value={formData.weight} onChange={handleChange} />

      <label htmlFor="popularity">Popularity:</label>
      <input
        type="number"
        id="popularity"
        name="popularity"
        value={formData.popularity}
        onChange={handleChange}
      />

      <label htmlFor="price">Price:</label>
      <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} />

      <button type="submit">Submit</button>
    </form>
    </div>
  );
}

export default AddProduct;
