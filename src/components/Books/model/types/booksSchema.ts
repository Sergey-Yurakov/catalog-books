type BooksImageLinks = {
    smallThumbnail: string;
    thumbnail: string;
};

type BooksVolumeInfo = {
    title: string;
    categories?: string[];
    authors: string[];
    description: string;
    imageLinks: BooksImageLinks;
};

export type Books = {
    id: string;
    volumeInfo: BooksVolumeInfo;
};

export type BooksData = {
    totalItems: number;
    items: Books[] | null;
};

export type BooksSchema = {
    isLoading: boolean;
    error?: string;
    data: BooksData;
    search: string;
    categories: string;
    sorting: string;
    startIndex: number;
    maxResult: number;
    isLoadMore?: boolean;
};
