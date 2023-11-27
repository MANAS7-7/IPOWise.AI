import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  industry: [],
  ageGroup: "",
  gainType: "",
  marketExp: "",
  riskAppetite: "",
  userData: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIndustry: (state, action) => {
      state.industry.push(action.payload)
    },
    setAgeGroup: (state, action) => {
      state.ageGroup = action.payload
    },
    setGainType: (state, action) => {
      state.gainType = action.payload
    },
    setMarketExp: (state, action) => {
      state.marketExp = (action.payload)
    },
    setRiskAppetite: (state, action) => {
      state.riskAppetite = action.payload
    },
    setUserData: (state, action) => {
      state.userData = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setIndustry, setAgeGroup, setMarketExp, setGainType, setRiskAppetite, setUserData } = userSlice.actions

export default userSlice.reducer