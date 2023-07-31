import React from 'react';
import { Avatar, Button } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import classes from './UserItem.module.scss';

const UserItem = ({ user }) => {
    return (
        <div className={classes.userItem}>
            <Avatar size={100} src={user.avatar_url} alt="Avatar" />

            <div className={classes.userItemContent}>
                <strong className={classes.userItemTitle}>{user.login}</strong>

                <div>
                    <span style={{ marginRight: '10px' }}>id:</span>
                    <span>{user.id}</span>
                </div>

                <a href={user.html_url} className={classes.userItemLink}>
                    <Button
                        onClick={(e) => e.stopPropagation()}
                        shape="round">
                        <GithubOutlined />
                        Открыть на GitHub
                    </Button>
                </a>
            </div>
        </div>
    );
};

export default UserItem;