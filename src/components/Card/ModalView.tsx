import '../../scss/ModalView.scss'
import React, {useState,} from 'react'
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { setCartProducts } from '../../redux/slices/productListSlice';

interface ProductCardWithCloseProps {
    index: string | number;
    closeFunc: () => void; // Function to handle closing the card
  }

const ModalView = (props: ProductCardWithCloseProps) => {
const dispatch = useAppDispatch();    
const product = useAppSelector(state => state.productList.productList[props.index]);

const [size, setSize] = useState(0);
const [taste, setTaste] = useState(0);
const [inputValue, setInputValue] = useState('');

const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputElement = event.target as HTMLInputElement; // Cast event.target to HTMLInputElement
    if (+inputElement.value < 0) {
      inputElement.value = '';
    }
    setInputValue(inputElement.value);
  };

const addProductFunction = () => {
    
    if(inputValue === ''){
        alert("invalid inputs")
        return
    }

    const addToCartProduct = {
        img: product.img,
        name: product.name,
        quantity: inputValue,
        totalPrice: +product.price*+inputValue,
        size: product.weight[size],
        taste: product.taste[taste],
    }

    dispatch(setCartProducts(addToCartProduct))

    alert("Product added to cart");
    props.closeFunc()

}
    return(
        <div className='card-modal-view'>
        <div className="card-container-modal" >
          <img className='card-img' src={product.img} alt=''></img>
          <div className='card-details'>
            <div className='card-details-first'>
                <span className={size === 0 ? "white-bg" : ""} onClick={() => setSize(0)}>{product.weight[0]}</span>
                <span className={size === 1 ? "white-bg" : ""} onClick={() => setSize(1)}>{product.weight[1]}</span>
            </div>
            <div className='card-details-first'>
                <span className={taste === 0 ? "white-bg" : ""} onClick={() => setTaste(0)}>{product.taste[0]}</span>
                <span className={taste === 1 ? "white-bg" : ""} onClick={() => setTaste(1)}>{product.taste[1]}</span>
            </div>
          </div>
          <label htmlFor="quantityInput" className='label-input'>Enter the quantity of the product:</label>
                <div className='modal-view-price'>
                    <input
                        type="number"
                        id="quantityInput"
                        name="quantityInput"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <div className='price-modal-view'>{inputValue === '' ? product.price : product.price*+inputValue}$</div>
                </div>
          <div className='card-buttons'>
          <div className='add-btn' onClick={props.closeFunc}> <span>Close</span></div>
            <div className='add-btn' onClick={addProductFunction}>
                
                <span>Add</span>
            </div>
          </div>
        </div>
        </div>
    );
}

export default ModalView;
