import cls from './StartMenu.module.scss';
import Button from '../../components/Button/Button.tsx';

export const StartMenu = () => {
    return (
        <div className={cls.Menu}>
            <div className={cls.overlay}>
                <div className={cls.content}>
                    <a href="/single" style={{ color: 'white' }}>
                        Play Offline
                    </a>
                    <a href="/online">Play Online</a>
                    <Button margin={'100px 0 25px'}>Change language</Button>
                </div>
            </div>
        </div>
    );
};
