type BooksImageLinks = {
    smallThumbnail: string;
    thumbnail: string;
}

type BooksVolumeInfo = {
    title: string;
    categories?: string[];
    description: string;
    imageLinks: BooksImageLinks;
}

export type Books = {
    id: string;
    volumeInfo: BooksVolumeInfo;
}

export type BooksSchema = {
    isLoading: boolean;
    error?: string;
    data: Books[];
    totalCount: number;
}