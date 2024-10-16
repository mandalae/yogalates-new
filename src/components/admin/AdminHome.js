import React, {useEffect, useState} from 'react';
import { Link, useLocation, Outlet } from "react-router-dom";
import PageService from '../../services/PageService';
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import outputs from '../../config/amplify-config.json';

import '@aws-amplify/ui-react/styles.css';

Amplify.configure(outputs);

function AdminHome() {
    const [pages, setPages] = useState([]);
    const location = useLocation();

    useEffect(() => {
        PageService.getAllPages().then(pages => {
          setPages(pages);
        });
    }, []);

    // const updatePageList = page => {
    //     const newPages = [];
    //     let found = false;
    //     pages.forEach(item => {
    //         if (page.name === item.name){
    //             found = true;
    //             newPages.push(page);
    //         } else {
    //             newPages.push(item);
    //         }
    //     });
    //     if (!found) {
    //         newPages.push(page);
    //     }
    //     setPages(newPages);
    // };

    return (
        <Authenticator>
            <div className="d-flex">
                <nav id="sidebar" className="w-25 p-4">
                    <ul className="list-group">
                        <li className={'list-group-item' + (location.pathname === '/admin/home' ? ' active' : '')}>
                            <Link to="/admin/home">Admin</Link>
                        </li>
                        <li className={'list-group-item' + (location.pathname === '/admin/classes' ? ' active' : '')}>
                            <Link to="/admin/classes">Hold</Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="/admin/pages/create">Sider</Link>
                            <ul className="list-group">
                                {pages.map((page, index) => {
                                    return (<li key={index} className="list-group-item border-0">
                                                <Link to={'/admin/pages/edit/' + page.name}>{page.headline}</Link>
                                            </li>);
                                })}
                            </ul>
                        </li>
                    </ul>
                </nav>
                <main className="admin-home w-75">
                    <Outlet />
                </main>
            </div>
        </Authenticator>
    );
}

export default AdminHome;
