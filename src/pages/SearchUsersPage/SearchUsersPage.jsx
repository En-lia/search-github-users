import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Input, Empty, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';
import { getUsers } from '../../API/usersAPI';
import UserList from '../../components/UserList/UserList';
import { getTotalPage } from '../../utils/helper';
import classes from './SearchUsersPage.module.scss';

const SearchUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersCount, setUsersCount] = useState(null);
    const [sortMethod, setSortMethod] = useState(null);
    const [order, setOrder] = useState(null);

    const totalPage = useMemo(() => {
        return getTotalPage(usersCount);
    }, [usersCount]);

    const searchUsers = useCallback(async (value) => {
        if (!value) {
            setUsers([]);
            return;
        }

        setIsLoading(true);
        setSortMethod(null);
        setOrder(null);

        const data = await getUsers({ query: value });
        const usersData = data?.items;

        if (usersData) {
            setUsers(usersData);
            setUsersCount(data?.total_count);
        }

        setIsLoading(false);
    }, []);

    const debounceSearchUsers = useMemo(() => {
        return debounce(searchUsers, 300);
    }, [searchUsers]);

    const searchChangeHandler = useCallback((e) => {
        setSearchQuery(e.target.value);
        debounceSearchUsers(e.target.value);
    }, [debounceSearchUsers]);

    const placeholderMessage = useMemo(() => {
        let msg = 'Для отображения пользователей начните поиск';

        if (isLoading) {
            msg = 'Идет загрузка...';
        } else if (!isLoading && searchQuery) {
            msg = 'Поиск не дал результатов';
        }

        return msg;
    }, [isLoading, searchQuery]);

    const sortUsers = useCallback(async (value) => {
        setIsLoading(true);

        setSortMethod('repositories');
        setOrder(value);

        const data = await getUsers({
            query: searchQuery,
            sort: 'repositories',
            order: value,
            });
        setUsers(data?.items);

        setIsLoading(false);
    }, [searchQuery]);

    const showMoreUsers = useCallback(async () => {
        setIsLoading(true);

        const data = await getUsers({
            query: searchQuery,
            sort: sortMethod,
            order,
            page: currentPage + 1,
        });

        setUsers([...users, ...data.items]);
        setCurrentPage(currentPage + 1);

        setIsLoading(false);
    }, [currentPage, order, searchQuery, sortMethod, users]);

    return (
        <div className={classes.searchUsersPage}>
            <div className={classes.searchUsersPageSearchPanel}>
                <Input
                    value={searchQuery}
                    placeholder="Поиск по логину пользователя"
                    prefix={<UserOutlined />}
                    onChange={searchChangeHandler}
                />

                <Select
                    disabled={isLoading || !users.length}
                    placeholder="Сортировать по"
                    onChange={sortUsers}
                    className={classes.searchUsersPageSort}
                    options={[
                        {
                            value: 'asc',
                            label: 'репозитории по ↑',
                        },
                        {
                            value: 'desc',
                            label: 'репозитории по ↓',
                        },
                    ]}
                />
            </div>

            { users?.length
                ? <div className={classes.searchUsersPageUsersContent}>
                    <UserList users={users} />
                    {
                        currentPage <= totalPage
                        && <Button
                            onClick={showMoreUsers}
                            className={classes.searchUsersPageShowMoreBtn}
                            size="large"
                            type="primary"
                            loading={isLoading}>
                            Покажу еще
                           </Button>
                    }
                  </div>
                : <div className={classes.searchUsersPagePlaceholder}>
                    <Empty description={<span style={{ color: '#ffffff' }}>{placeholderMessage}</span>} />
                  </div>
            }
        </div>
    );
};

export default SearchUsersPage;