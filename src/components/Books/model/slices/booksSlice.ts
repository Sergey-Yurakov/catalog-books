import { createSlice } from '@reduxjs/toolkit';
import { fetchBooks } from '../services/fetchBooks';
import { BooksSchema } from '../types/booksSchema';

const booksData = {
    totalItems: 0,
    items: null,
};

const initialState: BooksSchema = {
    isLoading: false,
    error: '',
    isErrorData: false,
    data: booksData,
};

export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},

    extraReducers: builder => {
        builder
            .addCase(fetchBooks.pending, (state, { meta }) => {
                state.isLoading = true;
                state.error = undefined;
                state.isErrorData = false;

                if (meta.arg.replace) {
                    state.data.items = [];
                }
            })
            .addCase(fetchBooks.fulfilled, (state, { payload, meta }) => {
                state.isLoading = false;
                state.data.totalItems = payload.totalItems;
                state.isErrorData = !payload.totalItems;

                if (meta.arg.replace) {
                    state.data.items = payload.items;
                } else {
                    payload.items && state.data.items?.push(...payload.items);
                }
            })
            .addCase(fetchBooks.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
                state.isErrorData = false;
            });
    },
});

export const { reducer: booksReducer } = booksSlice;
export const { actions: booksActions } = booksSlice;
