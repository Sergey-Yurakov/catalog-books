import { useCallback, useEffect } from 'react';
import { filterBooksActions } from '../model/slices/filterBooksSlice';
import { useAppDispatch } from '../../../shared/hooks/hookStore';
import { fetchBooks } from '../model/services/fetchBooks';

type SearchProps = {
    search: string;
    isFocused: boolean;
    isInitialFetch: boolean;
};

export const useSearch = (props: SearchProps) => {
    const { isFocused, search, isInitialFetch } = props;

    const dispatch = useAppDispatch();

    const fetchData = useCallback(() => {
        dispatch(
            fetchBooks({
                replace: true,
            })
        );
    }, [dispatch]);

    const onChangeInput = useCallback(
        (value: string) => {
            dispatch(filterBooksActions.setSearch(value));
        },
        [dispatch]
    );

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Enter' && search && isFocused) {
                fetchData();
            }
        },
        [fetchData, isFocused, search]
    );

    const clickHandle = () => {
        if (search) {
            fetchData();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [onKeyDown]);

    useEffect(() => {
        if (!isInitialFetch) {
            fetchData();
            dispatch(filterBooksActions.setIsInitialFetch(true));
        }
    }, [dispatch, fetchData, isInitialFetch]);

    return {
        onChangeInput,
        fetchData,
        onKeyDown,
        clickHandle,
    };
};
