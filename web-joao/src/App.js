import './App.css';
import React from 'react';

import { Routes ,Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import PublicationsPage from './pages/Publications';
import ProjectsPage from './pages/Projects';
import ContactsPage from './pages/Contacts';
import ProjectDetailsPage from './pages/Details';
import SkillsPage from './pages/Skills';
import AboutPage from './pages/About';
class App extends React.Component {
  render() {
      return (
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/publications" element={<PublicationsPage />}/>
            <Route path="/projects" element={<ProjectsPage />}/>
            <Route path="/projects/:id" element={<ProjectDetailsPage />}/>
            <Route path="/contacts" element={<ContactsPage />}/>
            <Route path="/skills" element={<SkillsPage />}/>
            <Route path="/about" element={<AboutPage />}/>
          </Routes>
          </div>
            );
  }
}

export default App;