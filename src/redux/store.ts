import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
  reducer: {},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/* steps: 
1. create store + configureStore 
2. connect store app to main.tsx
3. create slice for corresponding feature
4. In store reducer,  declare state with related reducer(from coresponding slice)
*/
