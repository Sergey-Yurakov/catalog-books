import { useCallback } from 'react';
import { filterBooksActions } from '../model/slices/filterBooksSlice';
import { useAppDispatch } from '../../../shared/hooks/hookStore';

export const useFilters = (fetchData: () => void) => {
    const dispatch = useAppDispatch();

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

    return {
        onChangeSorting,
        onChangeCategories,
    };
};
