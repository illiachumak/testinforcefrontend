import { Action, ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
  productList: [] as Product[] | any,
  cartList: (localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')!) : []) as CartProduct | any,
  totalPrice:  (localStorage.getItem('totalPrice') ? +JSON.parse(localStorage.getItem('totalPrice')!) : 0) as number,
  editingProduct: null,
  deletion: false,
  isLoaded: false,
};

export interface Product {
  uniqueId: number | string;
  id: number[] | string[] | string | number;
  img: string;
  name: string;
  taste: string[];
  count?: number;
  size?: {
    width: number;
    height: number;
  };
  weight?: string[];
  popularity: number | string;
  price: number | string;
}

export interface CartProduct {
  uniqueId: number;
  id: number[];
  img: string;
  name: string;
  taste: string[];
  quantity: string | number;
  totalPrice: number;
  count: number;
  size: {
    width: number;
    height: number;
  };
  weight: string[];
  popularity: number;
  price: number;
}


interface FecthProps {
  categoryId: number,
  sortType: string,
}

export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async ({categoryId, sortType}: FecthProps) => {
    const {data} = await axios.get(`http://localhost:3001/product?category=${categoryId}&sort=${sortType}`)
    return data
  }
)

export const productListSlice = createSlice({
  name: 'productItems',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.productList = action.payload;
    },
    setCartProducts(state, action) {
      const existingItem = state.cartList.find((item: CartProduct) => item.uniqueId === action.payload.uniqueId);
      if (existingItem) {
        existingItem.quantity = (Number(existingItem.quantity) + Number(action.payload.quantity)).toString();
      } else {
        state.cartList.push(action.payload);
      }
      state.totalPrice += action.payload.totalPrice;
      localStorage.setItem('cartItems', JSON.stringify(state.cartList));
      localStorage.setItem('totalPrice', JSON.stringify(state.totalPrice));
    },
    removeCartProduct(state, action: PayloadAction<string>) {
      const removedItemIndex = state.cartList.findIndex(
        (item: any) => item.name === action.payload
      );
      if (removedItemIndex !== -1) {
        const removedItem = state.cartList[removedItemIndex];
        state.cartList.splice(removedItemIndex, 1);
        state.totalPrice -= removedItem.totalPrice;
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartList));
      localStorage.setItem('totalPrice', JSON.stringify(state.totalPrice));
    },
    clearCartProducts(state) {
      state.cartList = [];
      state.totalPrice = 0;
      localStorage.removeItem('cartItems');
      localStorage.removeItem('totalPrice');
    },
    setDeletion(state){
      state.deletion = !state.deletion;
    },

    editProduct(state, action) {
      const updatedProduct = action.payload;
        state.editingProduct = updatedProduct;
        
        axios.put('http://localhost:3001/product', updatedProduct).catch((e) => console.log(e))
      
    },

    
  },
  extraReducers: (builder: ActionReducerMapBuilder<typeof initialState>) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        if (state.totalPrice == undefined) {
          state.totalPrice = 0;
        }
        state.productList = action.payload;
        state.isLoaded = true;
      })
  }
});



export const { setProducts, setCartProducts, removeCartProduct, clearCartProducts, editProduct, setDeletion} = productListSlice.actions;

export default productListSlice.reducer;
