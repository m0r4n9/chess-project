import cls from './Menu.module.css'
import Button from "../Button/Button.tsx";

interface MenuProps {

}

export const Menu = ({}:MenuProps) => {

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
                    <Button margin={'100px 0 25px'}>
                        Change language
                    </Button>
                </div>
            </div>
        </div>
    );
};
