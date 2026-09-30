import './App.css';
import React from 'react';

import { Routes, Navigate ,Route } from 'react-router-dom';
import Home from './pages/Home';
import PublicationsPage from './pages/Publications';
import ProjectsPage from './pages/Projects';
import ProjectDetailsPage from './pages/Details';
import ContactsPage from './pages/Contacts';
import SkillsPage from './pages/Skills';
import AboutPage from './pages/About';
import MobileApps from './pages/MobileApps';
import DetailsMobileApp from './pages/DetailsMobileApp';

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
            <Route path="/androidapps_store" element={<MobileApps/>}/>
            <Route path="/androidapps_store/:appId" element={<DetailsMobileApp/>}/>

            <Route path="*" element={<Navigate to="/androidapps_store" replace />} />
          </Routes>
          </div>
            );
  }
}

export default App;