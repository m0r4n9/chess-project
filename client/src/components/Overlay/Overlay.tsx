import cls from './Overlay.module.scss';

interface OverlayProps {
    onClick?: () => void;
}

export const Overlay = (props: OverlayProps) => {
    const { onClick } = props;

    return <div onClick={onClick} className={cls.Overlay} />;
};
