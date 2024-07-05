import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Skeleton from '../components/Card/Skeleton';


import {fetchItems, Product } from '../redux/slices/productListSlice';

function Home() {
  const dispatch = useAppDispatch();
  const {editingProduct:edited, deletion:deleted, productList:shopArr, isLoaded } = useAppSelector((state) => (state.productList));

  const { categoryId, sort } = useAppSelector((state) => state.filter);
  const sortType = sort.sortType;

  useEffect(() => {
    dispatch(fetchItems({categoryId, sortType}))
  }, [categoryId, sortType, edited, deleted]);

  

  return (
    <>
      <Navbar />
      <div className='addProduct-btn'><Link to='/addProduct'>Add Product</Link></div>
      <h1>All Products</h1>
      <div className="add-product-popup">
        
        
      </div>
      <div className="shop-container">
        {isLoaded ? (
          shopArr.map((product: Product, i: number) => (
            <Card key={i} index={i} img={product.img} text={product.name} price={product.price} uniqueId={product.uniqueId} weight={product.weight} taste={product.taste}/>
          ))
        ) : (
          [...new Array(6)].map((_, i) => <Skeleton key={i} />)
        )}
      </div>
    </>
  );
}

export default Home;
