import { createAsyncThunk } from '@reduxjs/toolkit';
import { BooksData } from '../types/booksSchema';
import axios from 'axios';
import {
    getBooksCategories,
    getBooksMaxResults,
    getBooksSearch,
    getBooksSorting,
    getBooksStartIndex,
} from '../selectors/getBooks';
import { StateSchema } from '../../../../store/StateSchema';

export const fetchBooks = createAsyncThunk<
    BooksData,
    { replace?: boolean },
    { rejectValue: string; state: StateSchema }
>('books/fetchBooks', async ({ replace }, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;

    const search = getBooksSearch(getState());
    const categories = getBooksCategories(getState());
    const startIndex = getBooksStartIndex(getState());
    const maxResults = getBooksMaxResults(getState());
    const sortingBy = getBooksSorting(getState());

    try {
        const { data } = await axios.get<BooksData>('https://www.googleapis.com/books/v1/volumes?', {
            params: {
                q: `${search}+subject=${categories}`,
                _startIndex: startIndex,
                _maxResults: maxResults,
                _orderBy: sortingBy,
            },
        });

        if (!data) {
            throw new Error();
        }
        console.log('data', data);
        return data;
    } catch (e) {
        return rejectWithValue('Server error: ' + e);
    }
});
