import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import classes from './Layout.module.scss';

const Layout = () => {
    const navigate = useNavigate();

    return (
        <div className={classes.layout}>
            <header
                onClick={() => navigate('/')}
                className={classes.layoutHeader}>
                ПОИСК ПОЛЬЗОВАТЕЛЕЙ | НАЙДЕМ ВСЕХ
            </header>
            <main className={classes.layoutContainer}>
                <Outlet />
            </main>
            <footer className={classes.layoutFooter}> 2023 </footer>
        </div>
  );
};

export default Layout;