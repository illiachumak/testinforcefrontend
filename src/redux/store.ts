import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice'
import productList from './slices/productListSlice'


export const store = configureStore({
  reducer: {
    filter: filter,
    productList: productList,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
