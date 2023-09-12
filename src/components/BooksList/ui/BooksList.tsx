import React, { memo, useMemo } from 'react';
import { BooksType } from '../../Books';
import { Loader } from '../../../shared/ui/Loader/Loader';
import noImage from '../../../shared/assets/noimage.png';
import cl from './BooksList.module.css';
import { BooksItem } from '../../BooksItem';

type BooksListProps = {
    isLoading: boolean;
    error?: string;
    totalItems: number;
    isErrorData?: boolean;
    books: BooksType[] | null;
    setIsLoadMore: (value: boolean) => void;
};

export const BooksList = memo((props: BooksListProps) => {
    const { isLoading, error, books, isErrorData, totalItems, setIsLoadMore } = props;

    // const totalItems = 50;

    const clickHandle = () => {
        setIsLoadMore(true);
    };

    const isLoadMore = useMemo(() => books?.length && books?.length <= totalItems, [books?.length, totalItems]);

    if (error) {
        return (
            <div className={cl.fetching}>
                <p>Error!</p>
            </div>
        );
    }

    if (isErrorData) {
        return (
            <div className={cl.fetching}>
                <h4>По вашему запросу книги не найдены</h4>
            </div>
        );
    }

    return (
        <div className={cl.wrapper}>
            {totalItems && books?.length ? <h3 className={cl.title}>Found {totalItems} result</h3> : null}
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
            {isLoadMore ? (
                <div className={cl.btn}>
                    <button
                        // disabled={books?.length <= totalItems}
                        onClick={clickHandle}
                    >
                        Load more...
                    </button>
                </div>
            ) : null}
        </div>
    );
});
