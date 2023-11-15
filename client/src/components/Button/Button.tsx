import React, {ButtonHTMLAttributes, CSSProperties, ReactNode} from 'react';
import cls from './button.module.css'
import * as classNames from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string,
    children: ReactNode,
    margin?: string
}

const Button = (props: ButtonProps) => {

    const {className ,children,margin, ...otherProps} = props

    const styles: CSSProperties = {
        margin
    }
    return (
        <button className={classNames(cls.PixellButton, className)} style={styles} {...otherProps}>
            {children}
        </button>
    );
};

export default Button;
