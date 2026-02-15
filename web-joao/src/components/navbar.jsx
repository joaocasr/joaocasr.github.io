import '../styles/navbar.css';
import { Link } from 'react-router-dom';

const NavBar = () =>{
    return <header className="navheader-section">
    <div className="navheader-container">
    <nav>
        <ul>
        <li><Link to="/about">About Me</Link></li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/projects">All Projects</Link></li>
        <li><Link to="/publications">Publications</Link></li>
        <li><Link to="/skills">Skills</Link></li>
        <li><Link to="/contacts">Contacts</Link></li>
        </ul>
    </nav>
    </div>
    </header>
}

export default NavBar;