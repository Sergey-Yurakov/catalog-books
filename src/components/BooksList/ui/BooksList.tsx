import React, { memo } from 'react';
import { BooksType } from '../../Books';
import { Loader } from '../../../shared/ui/Loader/Loader';
import noImage from '../../../shared/assets/noimage.png';
import cl from './BooksList.module.css';
import { BooksItem } from '../../BooksItem';

type BooksListProps = {
    isLoading: boolean;
    error?: string;
    totalItems: number;
    books: BooksType[] | null;
    setIsLoadMore: (value: boolean) => void;
};

export const BooksList = memo((props: BooksListProps) => {
    const { isLoading, error, totalItems, books, setIsLoadMore } = props;

    const clickHandle = () => {
        setIsLoadMore(true);
    };

    if (error) {
        return (
            <div className={cl.loaderOrError}>
                <p>Error!</p>
            </div>
        );
    }

    return (
        <div className={cl.wrapper}>
            {totalItems ? <h3 className={cl.title}>Found {totalItems} result</h3> : null}
            <div className={cl.booksItem}>
                {books?.length
                    ? books?.map(({ id, volumeInfo }) => (
                          <BooksItem
                              key={id}
                              image={
                                  volumeInfo.imageLinks
                                      ? volumeInfo.imageLinks?.smallThumbnail || volumeInfo.imageLinks.thumbnail
                                      : noImage
                              }
                              author={volumeInfo.authors}
                              title={volumeInfo.title}
                              category={volumeInfo.categories ? volumeInfo.categories[0] : 'No category'}
                          />
                      ))
                    : null}
            </div>
            {isLoading && (
                <div className={cl.fetching}>
                    <Loader />
                </div>
            )}
            {books?.length ? (
                <div className={cl.btn}>
                    <button disabled={books?.length >= totalItems} onClick={clickHandle}>
                        Load more...
                    </button>
                </div>
            ) : null}
        </div>
    );
});
