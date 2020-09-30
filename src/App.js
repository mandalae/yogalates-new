import React, {useState, useEffect} from 'react';
import {Switch, Route, NavLink, useLocation } from 'react-router-dom';
import cognitoUtils from './lib/cognitoUtils';
import sessionUtils from './lib/session';
import analytics from './lib/analytics';
import Dropdown from "react-bootstrap/Dropdown";

import Home from './components/home/Home';
import News from './components/news/News';
import Login from './components/login/Login';
import About from './components/about/About';
import Courses from './components/courses/Courses';

import AdminHome from './components/admin/AdminHome';

function App() {
  const [showInformation, setShowInformation] = useState(false);
  const location = useLocation();

  useEffect(() => {
    analytics.recordEvent('page load');
  }, []);

  const toggleInformation = e => {
    e.preventDefault();
  
    setShowInformation(!showInformation);
  };

  const logout = () => {
    analytics.recordEvent("logout");

    sessionUtils.removeSession();
    cognitoUtils.signOutCognitoSession();
  };

  const getLoginLogoutButton = () => {
    if (sessionUtils.isLoggedIn()){
      return (
          <Dropdown className="ml-4">
            <Dropdown.Toggle id="dropdown-basic" className="btn btn-secondary">
              <i className="fa fa-user mr-2"></i>
              Profil
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1" disabled>
                <i className="fa fa-envelope mr-2"></i>Email:{" "}
                {sessionUtils.getEmail()}
              </Dropdown.Item>
              <Dropdown.Item href="/admin/home">
                <i className="fa fa-edit mr-2"></i>Admin
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#/action-5" onClick={logout}>
                <i className="fa fa-sign-out mr-2"></i>Log ud
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        );
    } else {
      return <button className="btn btn-secondary ml-2" onClick={e => { e.preventDefault(); window.location.href=cognitoUtils.getCognitoSignInUri(); }}>Log ind</button>;
    }
  };

  return (
    <>
      <header>
        <div className={(showInformation ? 'visible ' : '') + 'show collapse bg-dark'} id="navbarHeader">
          <div className="container">
            <div className="row">
              <div className="col-sm-8 col-md-7 py-4">
                <h4 className="text-white">Om mig</h4>
                <p className="text-muted">Jeg hedder June Skaaning og er fra 1961. Jeg er bosiddende nord for Randers i en lille landsby. I 2006 begyndte jeg mit nye liv, hvor jeg selv ville bestemme over min arbejdstid og det jeg havde lyst til. Det blev og er en dejlig rejse, med mange uddannelser og kurser indenfor bevægelse, se nærmere under uddannelser og kurser.</p>
              </div>
              <div className="col-sm-4 offset-md-1 py-4">
                <h4 className="text-white">Kontakt</h4>
                <ul className="list-unstyled">
                  <li><a href="https://www.facebook.com/groups/1023752511027539/" className="text-white"><i className="fa fa-facebook-square mr-2" />Yoga med June</a></li>
                  <li><a href="mailto:june@yogalates.dk" className="text-white"><i className="fa fa-envelope mr-2" />Email mig</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar navbar-dark bg-dark box-shadow">
          <div className="container d-flex justify-content-between">
            <a href="/" className="navbar-brand d-flex align-items-center">
              <i className="fa fa-yoast mr-2" />
              <strong>Yogalates</strong>
            </a>
            <ul className="navbar-nav d-flex">
              <li className={'nav-item flex-fill' + (location.pathname.indexOf('ommig') > -1 ? ' active' : '')}>
                <NavLink to="/ommig" className="nav-link">Om mig</NavLink>
              </li>
            </ul>

            <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation" onClick={toggleInformation}>
              <i className={'fa ' + (showInformation ? 'fa-chevron-up' : 'fa-chevron-down')} />
            </button>
            {getLoginLogoutButton()}
          </div>
        </div>
      </header>

      <Switch>
        <Route path="/nyheder">
          <News />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/ommig">
          <About />
        </Route>
        <Route path="/kurser">
          <Courses />
        </Route>
        <Route path="/admin/home">
          <AdminHome />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>

      <footer className="text-muted mt-4">
        <div className="container">
          <small>June Skaaning | Kondrupvej 3 | Enslev | 8983 Gjerlev | CVR nr. 20928271 | Tlf: 2673 2571  | Mail: <a href="mailto:june@yogalates.dk">june@yogalates.dk</a> | Facebook: Yoga med June</small>
        </div>
    </footer>
    </>
  );
}

export default App;
