import cls from './Menu.module.css'
import Button from "../Button/Button.tsx";
import {useState} from "react";
import {Modal} from "../Module/Modal.tsx";
import {ChooseLanguage} from "../ChooseLanguage/ChooseLanguage.tsx";

interface MenuProps {

}

export const Menu = ({}:MenuProps) => {

    const [isOpen, setIsOpen] = useState(false)

    const openModalLanguage = () =>{
        setIsOpen(true)
    }

    const closeModalLanguage = ()=>{
        setIsOpen(false)
    }

    return (
        <div className={cls.Menu}>
            <div className={cls.overlay}>
                <div className={cls.content}>
                    <Button>
                        Play Offline
                    </Button>
                    <Button>
                        Play Online
                    </Button>
                    <Button onClick={openModalLanguage} margin={'100px 0 25px'}>
                        Change language
                    </Button>
                    <Modal closeHandler={closeModalLanguage} isOpen={isOpen}>
                        <ChooseLanguage/>
                    </Modal>
                </div>
            </div>
        </div>
    );
};
