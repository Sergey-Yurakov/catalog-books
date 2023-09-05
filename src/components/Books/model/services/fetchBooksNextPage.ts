import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBooksIsLoadMore, getBooksMaxResults, getBooksStartIndex } from '../selectors/getBooks';
import { StateSchema } from '../../../../store/StateSchema';
import { booksActions } from '../slices/booksSlice';
import { fetchBooks } from './fetchBooks';

export const fetchBooksNextPage = createAsyncThunk<void, void, { rejectValue: string; state: StateSchema }>(
    'books/fetchBooksNextPage',
    async (_, thunkAPI) => {
        const { getState, dispatch } = thunkAPI;

        const isLoadMore = getBooksIsLoadMore(getState());
        const startIndex = getBooksStartIndex(getState());
        const limit = getBooksMaxResults(getState());

        if (isLoadMore) {
            dispatch(booksActions.setStartIndex(startIndex + limit));
            dispatch(fetchBooks({}));
            dispatch(booksActions.setIsLoadMore(false));
        }
    }
);
