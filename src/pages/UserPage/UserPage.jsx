import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Button, Spin } from 'antd';
import { AimOutlined, BookOutlined, GithubOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { getUser } from '../../API/usersAPI';
import classes from './UserPage.module.scss';

const UserPage = () => {
    const { login } = useParams();
    const [user, setUser] = useState();

    const fetchUser = useCallback(async () => {
        const data = await getUser(login);
        setUser(data);
    }, [login]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    if (!user) {
        return (
            <div className={classes.userPageLoader}>
                <Spin size="large" />
            </div>
        );
    }

    return (
      <div className={classes.userPage}>
          <Avatar size={250} src={user?.avatar_url} />
          <h2 className={classes.userPageTitle}>{user?.login}</h2>
          {
              user?.name && <span style={{ marginBottom: '10px' }}>{user?.name}</span>
          }

          <hr style={{ width: '100%' }} />

          {
              user?.location
              && <section className={classes.userPageSection}>
                    <AimOutlined className={classes.userPageInfoIcon} />
                    <span>{user?.location}</span>
                 </section>
          }

          <section className={classes.userPageBriefInfoSection}>
              <div>
                  <UsergroupAddOutlined className={classes.userPageInfoIcon} />
                  <span>{user?.followers}</span>
              </div>

              <div>
                  <BookOutlined className={classes.userPageInfoIcon} />
                  <span>{user?.public_repos}</span>
              </div>
          </section>

          {
              user?.bio
              && <section className={classes.userPageSection}>
                    <div>{user?.bio}</div>
                 </section>
          }

          <a
              href={user?.html_url}
              className={classes.userPageLinkBtn}>
              <Button shape="round" type="primary">
                  <GithubOutlined />
                  Открыть на GitHub
              </Button>
          </a>
      </div>
    );
};

export default UserPage;