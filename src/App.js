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
import AdminClasses from "./components/admin/AdminClasses";
import AdminPages from "./components/admin/AdminPages";

function App() {
  const [pages, setPages] = useState([]);
  const location = useLocation();

  useEffect(() => {
    analytics.recordEvent('page load');

    PageService.getAllPages().then(pages => {
        setPages(pages);
    });
  }, []);

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
        <div className="navbar navbar-dark bg-dark box-shadow">
          <div className="container d-flex justify-content-between">
            <a href="/" className="navbar-brand d-flex align-items-center">
              <i className="fa fa-yoast me-2" />
              <strong>Yoga med June</strong>
            </a>
            <NavDropdown title="Artikler" id="basic-nav-dropdown">
              {pages.filter(item => item.type === 'article').map((page, index) => {
                  return <NavDropdown.Item key={'article-' + index} href={'/artikel/' + page.name}>{page.headline}</NavDropdown.Item>
              })}
            </NavDropdown>
            <NavLink to="/hold" className={'nav-link' + (location.pathname.indexOf('hold') > -1 ? ' active' : '')}>Hold</NavLink>
            <NavLink to="/ommig" className={'nav-link' + (location.pathname.indexOf('ommig') > -1 ? ' active' : '')}>Om mig</NavLink>
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
        <Route path="/admin" element={<AdminHome showToast={showToast} />}>
          <Route path="home" element={<section className="jumbotron">
            <div className="container">
              <h1 className="jumbotron-heading">Admin</h1>
              <p className="lead text-muted">Her kan du rette tekster og tilføje ting</p>
            </div>
          </section>} />
          <Route path="classes" element={<AdminClasses showToast={showToast} />} />
          <Route path="pages/create" element={<AdminPages showToast={showToast} updatePageList={() => {}} />} />
          <Route path="pages/edit/:pageName" element={<AdminPages showToast={showToast} updatePageList={() => {}} />} />
        </Route>
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
