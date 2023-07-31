import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './UserList.module.scss';
import UserItem from '../UserItem/UserItem';

const UserList = ({ users }) => {
    const navigate = useNavigate();

    return (
        <div className={classes.userList}>
            {users?.map((user) => (
                <div
                    key={user.id}
                    onClick={() => {
                    navigate(`user/${user.login}`);
                    }}>
                    <UserItem user={user} />
                </div>
            ))}
        </div>
    );
};

export default UserList;