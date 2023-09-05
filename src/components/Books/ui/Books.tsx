import React, { memo, useCallback, useEffect, useState } from 'react';
import { Input } from '../../../shared/ui/Input/Input';
import { Select } from '../../../shared/ui/Select/Select';
import { optionsCategories, optionsSorting } from '../mockData';
import { ReactComponent as SearchIcon } from '../../../shared/assets/search.svg';
import cl from './Books.module.css';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hookStore';
import {
    getBooks,
    getBooksCategories,
    getBooksError,
    getBooksIsLoading,
    getBooksSearch,
    getBooksSorting,
    getBooksTotalItems,
} from '../model/selectors/getBooks';
import { BooksList } from '../../BooksList';
import { booksActions } from '../model/slices/booksSlice';
import { fetchBooks } from '../model/services/fetchBooks';
import { fetchBooksNextPage } from '../model/services/fetchBooksNextPage';

export const Books = memo(() => {
    const dispatch = useAppDispatch();

    const books = useAppSelector(getBooks);
    const booksTotal = useAppSelector(getBooksTotalItems);
    const isLoading = useAppSelector(getBooksIsLoading);
    const error = useAppSelector(getBooksError);
    const search = useAppSelector(getBooksSearch);
    const categories = useAppSelector(getBooksCategories);
    const sorting = useAppSelector(getBooksSorting);

    const [isFocused, setIsFocused] = useState(false);

    const fetchData = useCallback(() => {
        dispatch(
            fetchBooks({
                replace: true,
            })
        );
    }, [dispatch]);

    const fetchNextPage = useCallback(() => {
        dispatch(fetchBooksNextPage());
    }, [dispatch]);

    useEffect(() => {
        if (!books) {
            fetchData();
        }
    }, [books, fetchData]);

    const onChangeInput = useCallback(
        (value: string) => {
            dispatch(booksActions.setSearch(value));
        },
        [dispatch]
    );

    const onChangeSorting = useCallback(
        (value: string) => {
            dispatch(booksActions.setSorting(value));
            dispatch(booksActions.setStartIndex(0));
            fetchData();
        },
        [dispatch, fetchData]
    );

    const onChangeCategories = useCallback(
        (value: string) => {
            dispatch(booksActions.setCategories(value));
            dispatch(booksActions.setStartIndex(0));
            fetchData();
        },
        [dispatch, fetchData]
    );

    const onHandleLoadMore = useCallback(
        (value: boolean) => {
            dispatch(booksActions.setIsLoadMore(value));
            fetchNextPage();
        },
        [dispatch, fetchNextPage]
    );

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Enter' && search && isFocused) {
                fetchData();
            }
        },
        [fetchData, isFocused, search]
    );

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [onKeyDown]);

    const clickHandle = () => {
        if (search) {
            fetchData();
        }
    };

    return (
        <>
            <header className={cl.image}>
                <div className={cl.wrapper}>
                    <h1 className={cl.title}>Search for books</h1>
                    <div className={cl.content}>
                        <div className={cl.input}>
                            <Input
                                value={search}
                                setValue={onChangeInput}
                                setIsFocused={setIsFocused}
                                placeholder={'Search...'}
                            />
                            <button className={cl.btn} onClick={clickHandle}>
                                <SearchIcon />
                            </button>
                        </div>
                        <div className={cl.select}>
                            <Select
                                options={optionsCategories}
                                value={categories}
                                setValue={onChangeCategories}
                                label={'Categories'}
                            />
                            <Select
                                options={optionsSorting}
                                value={sorting}
                                setValue={onChangeSorting}
                                label={'Sorting by'}
                            />
                        </div>
                    </div>
                </div>
            </header>

            <BooksList
                setIsLoadMore={onHandleLoadMore}
                isLoading={isLoading}
                totalItems={booksTotal}
                books={books}
                error={error}
            />
        </>
    );
});
