import { configureStore } from "@reduxjs/toolkit";
import uiSlice from './store_login'
const store = configureStore({ 
    reducer: {
         ui: uiSlice
        
        }
     });
     export default store;