import cls from './Modal.module.css'
import {memo, ReactNode} from 'react'
import * as classNames from "classnames";

interface ModuleProps {
    isOpen: boolean,
    children: ReactNode
    closeHandler: ()=>void
}

export const Modal = memo((props: ModuleProps) => {
    const {children, isOpen, closeHandler} = props

    const contentClick = (e: React.MouseEvent)=>{
        e.stopPropagation()
    }

    return (
        <div className={classNames(cls.Modal, {[cls.opened]: isOpen})}>
            <div className={cls.overlay} onClick={closeHandler}>
                <div className={cls.content}
                     onClick={contentClick}
                >
                    {children}
                </div>
            </div>
        </div>
    );
});
