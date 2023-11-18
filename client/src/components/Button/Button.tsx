import { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
import cls from './Button.module.scss';
import classNames from 'classnames';

type variantButton = 'clear' | 'pixel';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    margin?: string;
    variant?: variantButton;
}

const Button = (props: ButtonProps) => {
    const { children, margin, variant = 'clear', ...otherProps } = props;

    const styles: CSSProperties = {
        margin,
    };

    return (
        <button
            className={classNames(cls.PixellButton, [cls[variant]])}
            style={styles}
            {...otherProps}
        >
            {children}
        </button>
    );
};

export default Button;
