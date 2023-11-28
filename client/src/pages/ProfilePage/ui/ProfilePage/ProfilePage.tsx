import { memo } from 'react';
import cls from './ProfilePage.module.scss';
import { useSelector } from 'react-redux';
import { getUserData } from '@/entities/User';

interface ProfilePageProps {}

export const ProfilePage = memo((props: ProfilePageProps) => {
    const user = useSelector(getUserData);

    return (
        <div>
            <div></div>
        </div>
    );
});
