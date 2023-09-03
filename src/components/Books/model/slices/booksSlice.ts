import { createSlice } from '@reduxjs/toolkit';
import { fetchBooks } from '../services/fetchBooks';
import { BooksSchema } from '../types/booksSchema';

const initialState: BooksSchema = {
    isLoading: false,
    error: '',
    data: {
        totalItems: 0,
        items: [],
    },
};

export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchBooks.pending, state => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchBooks.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.data.totalItems = payload.totalItems;
                state.data.items = payload.items;
            })
            .addCase(fetchBooks.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            });
    },
});

export const { reducer: booksReducer } = booksSlice;
export const { actions: booksActions } = booksSlice;
