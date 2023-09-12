export type FilterBooksSchema = {
    isInitialFetch: boolean;
    search: string;
    categories: string;
    sorting: string;
    startIndex: number;
    maxResult: number;
    isLoadMore?: boolean;
};
