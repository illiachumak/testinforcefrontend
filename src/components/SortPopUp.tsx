import '../scss/SortPopUp.scss';
import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setSortType } from '../redux/slices/filterSlice';

interface SortItem {
  name: string; // Name of the sort option (e.g., "popular", "price", "alphabetical")
}

const SortPopUp = () => {
  const sortList: SortItem[] = [
    { name: 'popular' },
    { name: 'price' },
    { name: 'alphabetical' },
  ];
  const [popup, setPopup] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    interface ClickOutsideEventHandler {
      (e: MouseEvent): void;
    }
    
    const handleClickOutside: ClickOutsideEventHandler = (e: MouseEvent) => {
      if (!popupRef.current || !popupRef.current.contains(e.target as Element)) {
        setPopup(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const selected = useAppSelector((state) => state.filter.sort.name);
  const dispatch = useAppDispatch();

  const onClickSelectSort = (i: number) => {
    dispatch(setSortType(i));
    setPopup(!popup);
  };

  const popupOnClick = () => {
    setPopup(!popup);
  };

  const priceIcon = (i: number) => {
    if (i === 1) {
      return <span className="sort-icon up"></span>;
    }
  };

  return (
    <div className='sort-second-wrap' ref={popupRef}>
      <div className={`sort-popup ${popup ? 'opened' : 'closed'}`}>
        <ul>
          {sortList.map((sortItem, i) => (
            <li
              key={i}
              onClick={() => onClickSelectSort(i)}
              className={selected === i ? 'active' : ''}
            >
              {sortItem.name}
              {priceIcon(i)}
            </li>
          ))}
        </ul>
      </div>
      <div className='sort-second-wrap'>
        <span onClick={popupOnClick}>{sortList[selected]?.name}</span>
      </div>
    </div>
  );
};

export default SortPopUp;