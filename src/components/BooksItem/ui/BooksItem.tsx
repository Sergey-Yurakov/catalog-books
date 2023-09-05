import { memo } from 'react';
import cl from './BooksItem.module.css';

type BooksItemProps = {
    image: string;
    author: string[];
    title: string;
    category: string;
};

export const BooksItem = memo((props: BooksItemProps) => {
    const { author, category, image, title } = props;

    return (
        <div className={cl.wrapper}>
            <div className={cl.img}>
                <img src={image} alt={title} />
            </div>
            <div className={cl.content}>
                <p className={cl.category}>{category}</p>
                <h3 className={cl.title}>{title}</h3>
                {author ? author.map(i => <p key={i}>{i}</p>) : 'There is no author'}
            </div>
        </div>
    );
});
