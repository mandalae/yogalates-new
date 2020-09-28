import React, {useState, useEffect} from 'react';
import {Switch, Route, NavLink, useLocation } from 'react-router-dom';
import cognitoUtils from './lib/cognitoUtils';
import sessionUtils from './lib/session';
import analytics from './lib/analytics';

import Home from './components/home/Home';
import News from './components/news/News';
import Login from './components/login/Login';

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
      return <button className="btn btn-primary ml-2" onClick={logout}>Log ud</button>;
    } else {
      return <button className="btn btn-primary ml-2" onClick={e => { e.preventDefault(); window.location.href=cognitoUtils.getCognitoSignInUri(); }}>Log ind</button>;
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
            <ul className="navbar-nav mr-auto">
              <li className={'nav-item' + (location.pathname.indexOf('nyheder') > -1 ? ' active' : '')}>
                <NavLink to="/nyheder" className="nav-link">Nyheder</NavLink>
              </li>
            </ul>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation" onClick={toggleInformation}>
              <span className="navbar-toggler-icon" />
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
        <Route path="/">
          <Home />
        </Route>
      </Switch>

      <footer className="text-muted">
        <div className="container">
          <small>June Skaaning | Kondrupvej 3 | Enslev | 8983 Gjerlev | CVR nr. 20928271 | Tlf: 2673 2571  | Mail: <a href="mailto:june@yogalates.dk">june@yogalates.dk</a> | Facebook: Yoga med June</small>
        </div>
    </footer>
    </>
  );
}

export default App;
