import { configureStore } from '@reduxjs/toolkit';
import { booksReducer } from '../components/Books/model/slices/booksSlice';
import { StateSchema } from './StateSchema';
import { filterBooksReducer } from '../components/Books/model/slices/filterBooksSlice';

function createReduxStore() {
    return configureStore<StateSchema>({
        reducer: {
            books: booksReducer,
            filters: filterBooksReducer,
        },
    });
}

export const store = createReduxStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
