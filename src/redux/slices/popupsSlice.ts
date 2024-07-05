import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    productView: false,
    isOpen: false,
    editOpen: false,
}


export const popupsSlice = createSlice({
  name: 'popups',
  initialState,
  reducers: {
    
    setProductView(state, action){
        state.productView = action.payload
    },
    setIsOpen(state, action){
        state.isOpen = action.payload
        console.log(state.isOpen)
    }, 
    setEditOpen(state, action){
        state.editOpen = action.payload
    },
  },
})


export const { setProductView, setIsOpen, setEditOpen } = popupsSlice.actions

export default popupsSlice.reducer