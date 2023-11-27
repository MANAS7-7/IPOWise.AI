import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    ipoData: [],
    loading: "false",
    name:"",
    
}

export const ipoSlice = createSlice({
    name: 'ipo',
    initialState,
    reducers: {
        setIpoData: (state, action) => {
            state.ipoData.splice(0, 1)
            state.ipoData.push(action.payload)
        },
        setLoading:(state, action) => {
            state.loading = action.payload
        },
        setName:(state, action) => {
            state.name = action.payload
        }

    },
})

// Action creators are generated for each case reducer function
export const { setIpoData,setLoading,setName } = ipoSlice.actions

export default ipoSlice.reducer