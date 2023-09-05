import { ChangeEvent, memo } from 'react';
import { classNames as cn } from '../../lib/classNames/classNames';
import cl from './Input.module.css';

interface InputProps {
    value: string;
    setValue: (value: string) => void;
    placeholder: string;
    className?: string;
    setIsFocused?: (val: boolean) => void;
}

export const Input = memo((props: InputProps) => {
    const { value, placeholder, className, setValue, setIsFocused } = props;

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const onBlur = () => {
        setIsFocused?.(false);
    };
    const onFocus = () => {
        setIsFocused?.(true);
    };

    return (
        <input
            className={cn(cl.input, {}, [className])}
            onChange={onChange}
            value={value}
            type="text"
            placeholder={placeholder}
            onFocus={onFocus}
            onBlur={onBlur}
        />
    );
});
