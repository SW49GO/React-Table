import { createSlice, configureStore} from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// Configuration telling Redux Persist to store Redux store data under the 'root' key in the specified web storage (default localStorage)
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['employees']
  }
  
  /**
   * Slice to store list of employees in persist store
   */
  const employeeSlice = createSlice({
      name: 'employeeSlice',
      initialState: {
        employees: []
      },
      reducers: {
        createEmployee: (state, action) => {
          const {firstName, lastName, dateOfBirth, startDate, department, street, city, states, zipCode,} = action.payload
          // Adds the employee to the master table
          state.employees.push({
            firstName: firstName || '',
            lastName: lastName || '',
            dateOfBirth: dateOfBirth || '',
            startDate: startDate || '',
            department: department || '',
            street: street || '',
            city: city || '',
            states: states || '',
            zipCode: zipCode || ''
          })
        },
        initializeEmployees: (state, action) => {
            state.employees = action.payload
        },
        removeEmployee: (state, action)=>{
          state.employees = action.payload
        }
      }
    })
  
    /**
     * Slice to store the result of a search
     */
  const searchSlice = createSlice({
    name: 'searchSlice',
    initialState: {
      results: []
    },
    reducers: {
      saveSearch: (state,action)=>{
        state.results = action.payload
      }
    }
  })
  /**
   * Slice to store column selected and number entries by page
   */
  const otherSlice = createSlice({
    name: 'otherSlice',
    initialState:{
      columnIndex:0,
      nbEntries:5
    },
    reducers: {
      changeColumnIndex: (state,action)=>{
        state.columnIndex = action.payload
      },
      changeNbEntries:(state,action)=>{
        state.nbEntries = action.payload
      }
    }
  })

// Definition of the slice that must persist
const persistedEmployeeSlice = persistReducer(persistConfig, employeeSlice.reducer)

// Export actions from the slice
export const {createEmployee,initializeEmployees,removeEmployee} = employeeSlice.actions
export const {saveSearch} = searchSlice.actions
export const {changeColumnIndex, changeNbEntries} = otherSlice.actions

// Selector to access the array of all employees
export const selectEmployees = (state) => state.employeeSlice.employees

// Selector to have the total number of employees
export const selectTotalEmployees = (state) => selectEmployees(state).length

// Selector to retrieve the array corresponding to the search
export const selectSearch = (state)=>state.searchSlice.results
export const selectTotalSearch = (state)=>selectSearch(state).length

// Selector to know which column is selected
export const selectColumn = (state)=>state.otherSlice.columnIndex

// Selector to know the number of entries for the list of employees table
export const selectEntries = (state)=>state.otherSlice.nbEntries

// Store configuration
export const store = configureStore({
    reducer : {
        employeeSlice : persistedEmployeeSlice,
        searchSlice : searchSlice.reducer,
        otherSlice: otherSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        // Excludes the "persist/PERSIST" action from the serialization check, action is special and managed internally by Redux Persist during the persisted data recovery process
        serializableCheck: {
            ignoredActions: ['persist/PERSIST'],
        },
        })
})
// persist store
export const persistor = persistStore(store)