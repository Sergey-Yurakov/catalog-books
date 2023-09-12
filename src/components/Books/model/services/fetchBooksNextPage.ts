import { createAsyncThunk } from '@reduxjs/toolkit';
import { StateSchema } from '../../../../store/StateSchema';
import { fetchBooks } from './fetchBooks';
import { filterBooksActions } from '../slices/filterBooksSlice';
import { getBooksIsLoadMore, getBooksMaxResults, getBooksStartIndex } from '../selectors/getFiltersBooks';

export const fetchBooksNextPage = createAsyncThunk<void, void, { rejectValue: string; state: StateSchema }>(
    'books/fetchBooksNextPage',
    async (_, thunkAPI) => {
        const { getState, dispatch } = thunkAPI;

        const isLoadMore = getBooksIsLoadMore(getState());
        const startIndex = getBooksStartIndex(getState());
        const limit = getBooksMaxResults(getState());

        if (isLoadMore) {
            dispatch(filterBooksActions.setStartIndex(startIndex + limit));
            dispatch(fetchBooks({}));
            dispatch(filterBooksActions.setIsLoadMore(false));
        }
    }
);
