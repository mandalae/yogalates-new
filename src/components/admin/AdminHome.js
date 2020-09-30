import React from 'react';
import { Redirect } from "react-router-dom";
import sessionUtils from '../../lib/session';

function AdminHome() {
    if (!sessionUtils.isLoggedIn()) {
        return <Redirect to="/" />;
    } else {
        return (
            <main className="admin-home">
                <section className="jumbotron text-center">
                <div className="container">
                    <h1 className="jumbotron-heading">Admin side</h1>
                    <p className="lead text-muted">Det er her du kan ændre teksten på hele siden, tilføje kurser og uddannelser osv.</p>
                </div>
                </section>
            </main>
        );
    }
}

export default AdminHome;