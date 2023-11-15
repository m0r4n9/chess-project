import cls from './ChooseLanguage.module.css'
import {memo} from 'react'
import Button from "../Button/Button.tsx";

interface ChooseLanguageProps {

}

export const ChooseLanguage = memo((props: ChooseLanguageProps) => {
    const {} = props

    return (
        <div className={cls.ChooseLanguage}>
            <div className={cls.title}>
                Выберите ваш язык:
            </div>
            <div className={cls.LangBtns}>
                <Button className={cls.langBtn} margin={'0'}>
                    English
                </Button>
                <Button className={cls.langBtn} margin={'30px 0 0 0'}>
                    Русский
                </Button>
            </div>
        </div>
    );
});
