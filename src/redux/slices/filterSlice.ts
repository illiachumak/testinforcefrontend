import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryId: 0,
  sort: {
    name: 2,
    sortType: 'priceDesc'

  }
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    
    setCategoryId(state, action) {
      state.categoryId = action.payload
    },

    setSortType(state, action) {
      state.sort.name = action.payload
      console.log(action.payload)
      if (action.payload === 0){
        state.sort.sortType = 'popularity'
      }
      else if (action.payload === 1){
        state.sort.sortType = 'priceAsc'
      }
      else{
        state.sort.sortType = 'priceDesc'
      }
      
    },
  },
})


export const { setCategoryId, setSortType } = filterSlice.actions

export default filterSlice.reducer