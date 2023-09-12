import { BooksSchema } from '../components/Books';
import { FilterBooksSchema } from '../components/Books/model/types/filterBooksSchema';

export interface StateSchema {
    books: BooksSchema;
    filters: FilterBooksSchema;
}
