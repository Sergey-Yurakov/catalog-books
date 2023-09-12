import React, { memo, useCallback, useEffect, useState } from 'react';
import { Input } from '../../../shared/ui/Input/Input';
import { Select } from '../../../shared/ui/Select/Select';
import { optionsCategories, optionsSorting } from '../mockData';
import { ReactComponent as SearchIcon } from '../../../shared/assets/search.svg';
import cl from './Books.module.css';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hookStore';
import {
    getBooks,
    getBooksError,
    getBooksIsErrorData,
    getBooksIsLoading,
    getBooksTotalItems,
} from '../model/selectors/getBooks';
import { BooksList } from '../../BooksList';
import { fetchBooks } from '../model/services/fetchBooks';
import { fetchBooksNextPage } from '../model/services/fetchBooksNextPage';
import {
    getBooksCategories,
    getBooksIsInitialFetch,
    getBooksSearch,
    getBooksSorting,
} from '../model/selectors/getFiltersBooks';
import { filterBooksActions } from '../model/slices/filterBooksSlice';

export const Books = memo(() => {
    const dispatch = useAppDispatch();

    const books = useAppSelector(getBooks);
    const booksTotal = useAppSelector(getBooksTotalItems);
    const isLoading = useAppSelector(getBooksIsLoading);
    const error = useAppSelector(getBooksError);
    const search = useAppSelector(getBooksSearch);
    const categories = useAppSelector(getBooksCategories);
    const sorting = useAppSelector(getBooksSorting);
    const isInitialFetch = useAppSelector(getBooksIsInitialFetch);
    const isErrorData = useAppSelector(getBooksIsErrorData);

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
        if (!isInitialFetch) {
            fetchData();
            dispatch(filterBooksActions.setIsInitialFetch(true));
        }
    }, [books, dispatch, fetchData, isInitialFetch]);

    const onChangeInput = useCallback(
        (value: string) => {
            dispatch(filterBooksActions.setSearch(value));
        },
        [dispatch]
    );

    const onChangeSorting = useCallback(
        (value: string) => {
            dispatch(filterBooksActions.setSorting(value));
            dispatch(filterBooksActions.setStartIndex(0));
            fetchData();
        },
        [dispatch, fetchData]
    );

    const onChangeCategories = useCallback(
        (value: string) => {
            dispatch(filterBooksActions.setCategories(value));
            dispatch(filterBooksActions.setStartIndex(0));
            fetchData();
        },
        [dispatch, fetchData]
    );

    const onHandleLoadMore = useCallback(
        (value: boolean) => {
            dispatch(filterBooksActions.setIsLoadMore(value));
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
                isErrorData={isErrorData}
                setIsLoadMore={onHandleLoadMore}
                isLoading={isLoading}
                totalItems={booksTotal}
                books={books}
                error={error}
            />
        </>
    );
});
