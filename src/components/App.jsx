import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './home/HomePage.jsx';
import AboutPage from './about/AboutPage.jsx';
import Header from './common/Header.jsx';
import PageNotFound from './404/PageNotFound.jsx';
import CoursesPage from './courses/CoursesPage.jsx';
import CourseManagementPage from './courses/CourseManagementPage.jsx';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="app-wrapper container-fluid d-flex flex-column">
      <ToastContainer autoClose={3000} position="top-center" />
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/course/:slug" component={CourseManagementPage} />
        <Route path="/course" component={CourseManagementPage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
