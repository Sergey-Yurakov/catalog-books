import { createAsyncThunk } from "@reduxjs/toolkit";
import { Books } from "../types/booksSchema";
import axios from "axios";

type arg = {
    search: string;
    categoties: string;
    sortingBy: 'relevance' | 'newest';
    startIndex: number;
    maxResults?: number;
}

export const fetchBooks = createAsyncThunk<Books[], arg, {rejectValue: string} >(
    'books/fetchBooks',
    async (arg, {rejectWithValue}) => {
        const {categoties, search, sortingBy = 'relevance', startIndex = 0, maxResults = 35} = arg;

        const result = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}+subject=${categoties}&startIndex=${startIndex}&maxResults=${maxResults}&orderBy=${sortingBy}`);

        if (!result.data) {
            return rejectWithValue('Server error');
        }
        return result.data;
    } 
);