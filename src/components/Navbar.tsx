import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setCategoryId } from '../redux/slices/filterSlice';
import SortPopUp from './SortPopUp';
import '../scss/Navbar.scss';

const Navbar = () => {
  const navBtn = useAppSelector(state => state.filter.categoryId);
  const dispatch = useAppDispatch();

  const onClickCategory = (i: number) => {
    dispatch(setCategoryId(i));
    console.log(i);
    
  };

  return (
    <div className="nav-container">
      <div className="sorting-first">
        <div className={navBtn === 0 ? 'black-bg' : 'white-bg'} onClick={() => onClickCategory(0)}>All</div>
        <div className={navBtn === 1 ? 'black-bg' : 'white-bg'} onClick={() => onClickCategory(1)}>id1</div>
        <div className={navBtn === 2 ? 'black-bg' : 'white-bg'} onClick={() => onClickCategory(2)}>id2</div>
        <div className={navBtn === 3 ? 'black-bg' : 'white-bg'} onClick={() => onClickCategory(3)}>id3</div>
        <div className={navBtn === 4 ? 'black-bg' : 'white-bg'} onClick={() => onClickCategory(4)}>id4</div>
      </div>

      <div className="sorting-second">
        Sort by: <SortPopUp/>
      </div>
    </div>
  );
};

export default Navbar;
