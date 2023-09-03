import { createAsyncThunk } from '@reduxjs/toolkit';
import { BooksData } from '../types/booksSchema';
import axios from 'axios';

type arg = {
    search: string;
    categories: string;
    sortingBy: 'relevance' | 'newest';
    startIndex: number;
    maxResults?: number;
};

export const fetchBooks = createAsyncThunk<BooksData, arg, { rejectValue: string }>(
    'books/fetchBooks',
    async (arg, { rejectWithValue }) => {
        const { categories, search, sortingBy = 'relevance', startIndex = 0, maxResults = 35 } = arg;

        const { data } = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${search}+subject=${categories}&startIndex=${startIndex}&maxResults=${maxResults}&orderBy=${sortingBy}`
        );

        if (!data) {
            return rejectWithValue('Server error');
        }
        console.log('data', data);
        return data;
    }
);
