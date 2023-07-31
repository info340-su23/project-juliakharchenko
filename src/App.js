import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import HomePage from "./components/HomePage";
import CommunityPage from "./components/CommunityPage";
import AboutPage from "./components/AboutPage";
import LanguageLearningPage from "./components/LanguageLearningPage";
import LegalAssistancePage from "./components/LegalAssistancePage";
import ResourcesPage from "./components/ResourcesPage";

const App = () => {
  return (
    <Router>
      <div>
        <header>
          <nav>
            <ul>
              <li>
                <NavLink to="/" exact activeClassName="active">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" activeClassName="active">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/resources" activeClassName="active">
                  Resources
                </NavLink>
              </li>
              <li>
                <NavLink to="/community" activeClassName="active">
                  Community
                </NavLink>
              </li>
              <li>
                <NavLink to="/language-learning" activeClassName="active">
                  Language Learning
                </NavLink>
              </li>
              <li>
                <NavLink to="/legal-assistance" activeClassName="active">
                  Legal Assistance
                </NavLink>
              </li>
            </ul>
          </nav>
          <h1>Refugee Connect</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/about" element={<AboutPage/>} />
            <Route path="/resources" element={<ResourcesPage/>} />
            <Route path="/community" element={<CommunityPage/>} />
            <Route path="/language-learning" element={<LanguageLearningPage/>} />
            <Route path="/legal-assistance" element={<LegalAssistancePage/>} />
          </Routes>
        </main>
        <footer>
          <div className="container">
            <p>&copy; {new Date().getFullYear()} Refugee Connect. All rights reserved.</p>
            <ul className="social-icons">
              <li>
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;

