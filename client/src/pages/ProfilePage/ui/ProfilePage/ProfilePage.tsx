import { memo, useEffect } from 'react';
import cls from './ProfilePage.module.scss';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/useAppDispatch/useAppDispatch.ts';
import { fetchUserData } from '../../model/services/fetchUserData.ts';
import { useSelector } from 'react-redux';
import { StateSchema } from '@/providers/StoreProvider';

interface ProfilePageProps {}

const ProfilePage = memo((props: ProfilePageProps) => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const profileData = useSelector(
        (state: StateSchema) => state.profile.profile,
    );

    useEffect(() => {
        if (!id) return;
        dispatch(fetchUserData(id));
    }, [dispatch, id]);

    return (
        <div className={cls.wrapper}>
            <div className={cls.header}>
                <h1>Username: {profileData?.login}</h1>
            </div>
            <div className={cls.content}>
                <ul>
                    <li>
                        <div>Игр сыграно: {profileData?.countGames}</div>
                    </li>
                    <li>
                        <div>Побед: {profileData?.wins}</div>
                    </li>
                </ul>
            </div>
        </div>
    );
});

export default ProfilePage;
