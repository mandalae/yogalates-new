import React, {useEffect, useState} from 'react';
import { Redirect, Switch, Route, Link, useLocation } from "react-router-dom";
import sessionUtils from '../../lib/session';
import PageService from '../../services/PageService';

import AdminPages from './AdminPages';

function AdminHome() {
    const [pages, setPages] = useState([]);
    const location = useLocation();

    useEffect(() => {
        PageService.getAllPages().then(pages => {
          setPages(pages);
        });
    }, []);

    if (!sessionUtils.isLoggedIn()) {
        return <Redirect to="/" />;
    } else {
        return (
            <div className="d-flex">
                <nav id="sidebar" className="w-25 p-4">
                    <ul className="list-group">
                        <li className={'list-group-item' + (location.pathname === '/admin/home' ? ' active' : '')}>
                            <Link to="/admin/home">Admin</Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="/admin/pages">Sider</Link>
                            <ul className="list-group">
                                {pages.map(page => {
                                    return (<li className="list-group-item border-0">
                                                <Link to={'/admin/pages/' + page.name}>{page.headline}</Link>
                                            </li>);
                                })}
                            </ul>
                        </li>
                    </ul>
                </nav>
                <main className="admin-home w-75">
                    <Switch>
                        <Route path="/admin/home">
                            <section className="jumbotron">
                                <div className="container">
                                    <h1 className="jumbotron-heading">Admin</h1>
                                    <p className="lead text-muted">Her kan du rette tekster og tilføje ting</p>
                                </div>
                            </section>
                        </Route>
                        <Route path="/admin/pages/:pageName">
                            <AdminPages />
                        </Route>
                    </Switch>
                </main>
            </div>
        );
    }
}

export default AdminHome;
