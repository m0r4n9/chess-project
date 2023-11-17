import { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
import cls from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    margin?: string;
}

const Button = (props: ButtonProps) => {
    const { children, margin, ...otherProps } = props;

    const styles: CSSProperties = {
        margin,
    };
    return (
        <button className={cls.PixellButton} style={styles} {...otherProps}>
            {children}
        </button>
    );
};

export default Button;
