import cls from './StartMenu.module.scss';

export const StartMenu = () => {
    return (
        <div className={cls.Menu}>
            <div className={cls.content}>
                <div className={cls.header}>
                    <h1>Game Chess</h1>
                </div>

                <a
                    href="/single"
                    className={cls.pixel}
                    style={{ color: 'white' }}
                >
                    Play Offline
                </a>
                <a href="/online" className={cls.pixel}>
                    Play Online
                </a>
                <a href="#" className={cls.pixel}>
                    Change language
                </a>
            </div>
        </div>
    );
};
