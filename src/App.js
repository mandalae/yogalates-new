import React, {useState, useEffect} from 'react';
import {
  Route,
  Routes,
  NavLink, useLocation
} from "react-router-dom";
import cognitoUtils from './lib/cognitoUtils';
import sessionUtils from './lib/session';
import analytics from './lib/analytics';
import Dropdown from "react-bootstrap/Dropdown";
import NavDropdown from 'react-bootstrap/NavDropdown';

import toast, { Toaster } from 'react-hot-toast';

import PageService from './services/PageService';

import Home from './components/home/Home';
import News from './components/news/News';
import Login from './components/login/Login';
import About from './components/about/About';
import Courses from './components/courses/Courses';
import Article from './components/article/Article';
import Classes from './components/classes/Classes';

import AdminHome from './components/admin/AdminHome';

function App() {
  const [showInformation, setShowInformation] = useState(false);
  const [pages, setPages] = useState([]);
  const location = useLocation();

  useEffect(() => {
    analytics.recordEvent('page load');

    PageService.getAllPages().then(pages => {
        setPages(pages);
    });
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

  const showToast = (type, content) => {
      toast(content, {
          appearance: type,
          autoDismiss: true
      });
  }

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
                <i className="fa fa-envelope me-2" />Email:{" "}
                {sessionUtils.getEmail()}
              </Dropdown.Item>
              <Dropdown.Item href="/admin/home">
                <i className="fa fa-edit me-2" />Admin
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#/action-5" onClick={logout}>
                <i className="fa fa-sign-out me-2" />Log ud
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
        <Toaster />
        <div className={(showInformation ? 'visible ' : '') + 'show collapse bg-dark'} id="navbarHeader">
          <div className="container">
            <div className="row">
              <div className="col-sm-8 col-md-7 py-4">
                <h4 className="text-white">Om mig</h4>
                <div className="d-flex">
                  <img src="/images/june.png" width="100" alt="June Skaaning profile" className="me-2" />
                  <p className="text-muted">Jeg hedder June Skaaning og er fra 1961. Jeg er bosiddende nord for Randers i en lille landsby. I 2006 begyndte jeg mit nye liv, hvor jeg selv ville bestemme over min arbejdstid og det jeg havde lyst til. Det blev og er en dejlig rejse, med mange uddannelser og kurser indenfor bevægelse, se nærmere under uddannelser og kurser.</p>
                </div>
              </div>
              <div className="col-sm-4 offset-md-1 py-4">
                <h4 className="text-white">Kontakt</h4>
                <ul className="list-unstyled">
                  <li><a href="https://www.facebook.com/groups/1023752511027539/" className="text-white"><i className="fa fa-facebook-square me-2" />Yoga med June</a></li>
                  <li><a href="mailto:june@yogalates.dk" className="text-white"><i className="fa fa-envelope me-2" />Email mig</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar navbar-dark bg-dark box-shadow">
          <div className="container d-flex justify-content-between">
            <a href="/" className="navbar-brand d-flex align-items-center">
              <i className="fa fa-yoast me-2" />
              <strong>Yogalates</strong>
            </a>
            <NavDropdown title="Artikler" id="basic-nav-dropdown">
              {pages.filter(item => item.type === 'article').map((page, index) => {
                  return <NavDropdown.Item key={'article-' + index} href={'/artikel/' + page.name}>{page.headline}</NavDropdown.Item>
              })}
            </NavDropdown>
            <NavLink to="/hold" className={'nav-link' + (location.pathname.indexOf('hold') > -1 ? ' active' : '')}>Hold</NavLink>
            <NavLink to="/ommig" className={'nav-link' + (location.pathname.indexOf('ommig') > -1 ? ' active' : '')}>Om mig</NavLink>

            <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation" onClick={toggleInformation}>
              <i className={'fa ' + (showInformation ? 'fa-chevron-up' : 'fa-chevron-down')} />
            </button>
            {getLoginLogoutButton()}
          </div>
        </div>
      </header>

      <Routes>
        <Route path="/nyheder" element={<News />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ommig" element={<About />} />
        <Route path="/kurser" element={<Courses />} />
        <Route path="/hold" element={<Classes />} />
        <Route path="/artikel/:pageName" element={<Article />} />
        <Route path="/admin" element={<AdminHome showToast={showToast} />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <footer className="text-muted mt-4">
        <div className="container">
          <small>June Skaaning | Kondrupvej 3 | Enslev | 8983 Gjerlev | CVR nr. 20928271 | Tlf: 2673 2571  | Mail: <a href="mailto:june@yogalates.dk" className="text-dark"><i className="fa fa-envelope me-1" />june@yogalates.dk</a> | Facebook: <a href="https://www.facebook.com/groups/1023752511027539/" className="text-dark"><i className="fa fa-facebook-square me-1" />Yoga med June</a></small>
        </div>
    </footer>
    </>
  );
}

export default App;
