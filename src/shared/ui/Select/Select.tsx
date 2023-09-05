import { ChangeEvent, memo, useMemo } from 'react';
import { classNames as cn } from '../../lib/classNames/classNames';
import cl from './Select.module.css';

export type OptionsArray = {
    value: string;
    name: string;
};

interface SelectProps {
    options: OptionsArray[];
    value: string;
    label?: string;
    className?: string;
    setValue: (value: string) => void;
}

export const Select = memo((props: SelectProps) => {
    const { value, label, options, className, setValue } = props;

    const optionList = useMemo(
        () =>
            options.map(({ name, value }) => (
                <option value={value} key={value}>
                    {name}
                </option>
            )),
        [options]
    );

    const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.value);
    };

    return (
        <div>
            {label && <span>{label}</span>}
            <select className={cn(cl.select, {}, [className])} value={value} onChange={onChange}>
                {optionList}
            </select>
        </div>
    );
});
