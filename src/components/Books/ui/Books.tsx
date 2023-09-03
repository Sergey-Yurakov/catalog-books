import { memo, useEffect, useState } from 'react';
import { Input } from '../../../shared/ui/Input/Input';
import { Select } from '../../../shared/ui/Select/Select';
import { optionsCategories, optionsSorting } from '../mockData';
import cl from './Books.module.css';

export const Books = memo(() => {
    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState('');
    const [sorting, setSorting] = useState('');

    useEffect(() => {
        console.log('search', search);
        console.log('categories', categories);
        console.log('sorting', sorting);
    }, [categories, search, sorting]);

    return (
        <div className={cl.wrapper}>
            <h1 className={cl.title}>Search for books</h1>
            <div>
                <Input value={search} setValue={setSearch} placeholder={'search...'} />
            </div>
            <div>
                <Select options={optionsCategories} value={categories} setValue={setCategories} label={'Categories'} />
                <Select options={optionsSorting} value={sorting} setValue={setSorting} label={'Sorting by'} />
            </div>
        </div>
    );
});
