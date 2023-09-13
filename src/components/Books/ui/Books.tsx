import React, { memo, useState } from 'react';
import { Input } from '../../../shared/ui/Input/Input';
import { Select } from '../../../shared/ui/Select/Select';
import { optionsCategories, optionsSorting } from '../mockData';
import { ReactComponent as SearchIcon } from '../../../shared/assets/search.svg';
import cl from './Books.module.css';
import { useAppSelector } from '../../../shared/hooks/hookStore';
import {
    getBooks,
    getBooksError,
    getBooksIsErrorData,
    getBooksIsLoading,
    getBooksTotalItems,
} from '../model/selectors/getBooks';
import { BooksList } from '../../BooksList';
import {
    getBooksCategories,
    getBooksIsInitialFetch,
    getBooksSearch,
    getBooksSorting,
} from '../model/selectors/getFiltersBooks';
import { useFilters } from '../hooks/useFilters';
import { useSearch } from '../hooks/useSearch';
import { useLoadMore } from '../hooks/useLoadMore';

export const Books = memo(() => {
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

    const { onChangeInput, fetchData, clickHandle } = useSearch({ search, isFocused, isInitialFetch });
    const { onChangeSorting, onChangeCategories } = useFilters(fetchData);
    const { onHandleLoadMore } = useLoadMore();

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
