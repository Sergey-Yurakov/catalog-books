import { ChangeEvent, memo } from 'react';
import { classNames as cn } from '../../lib/classNames/classNames';

interface InputProps {
    value: string;
    setValue: (value: string) => void;
    placeholder: string;
    className?: string;
}

export const Input = memo((props: InputProps) => {
    const { value, placeholder, className, setValue } = props;

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <input
            className={cn('', {}, [className])}
            onChange={onChange}
            value={value}
            type="text"
            placeholder={placeholder}
        />
    );
});
