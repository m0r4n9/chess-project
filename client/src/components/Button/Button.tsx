import React, {ButtonHTMLAttributes, CSSProperties, ReactNode} from 'react';
import cls from './button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode,
    margin?: string
}

const Button = (props: ButtonProps) => {

    const {children,margin, ...otherProps} = props

    const styles: CSSProperties = {
        margin
    }
    return (
        <button className={cls.PixellButton} style={styles} {...otherProps}>
            {children}
        </button>
    );
};

export default Button;
