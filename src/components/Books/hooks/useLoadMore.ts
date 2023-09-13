import { useCallback } from 'react';
import { fetchBooksNextPage } from '../model/services/fetchBooksNextPage';
import { useAppDispatch } from '../../../shared/hooks/hookStore';
import { filterBooksActions } from '../model/slices/filterBooksSlice';

export const useLoadMore = () => {
    const dispatch = useAppDispatch();

    const fetchNextPage = useCallback(() => {
        dispatch(fetchBooksNextPage());
    }, [dispatch]);

    const onHandleLoadMore = useCallback(
        (value: boolean) => {
            dispatch(filterBooksActions.setIsLoadMore(value));
            fetchNextPage();
        },
        [dispatch, fetchNextPage]
    );

    return {
        onHandleLoadMore,
    };
};
