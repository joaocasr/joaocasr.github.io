import '../App.css';
import '../styles/home.css';
import { useNavigate } from "react-router";
import {React,  useEffect, useState} from 'react';
import { SocialIcon } from 'react-social-icons'
import Footer from '../components/footer';
import { Link } from 'react-router-dom';
const Home = () => {
    const [projects,setProjects] = useState(null)

    let navigate = useNavigate();

    const gotoDetails = (code) => {
        navigate('/projects/' + code);
    };    
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])
    
    useEffect(() => {
    fetch('projects.json')
    .then(response =>{ return response.json()})
    .then(data =>{
        setProjects(data)})
    .catch(error => console.error('Error fetching projects....'+error));
    }, []);

    return (
            <div className="homebody">
                <header className="header-section">
                <div className="header-container">
                    <div className="profile-wrapper">
                    <img className="profile-img" src={process.env.PUBLIC_URL + "/profile.png"} alt="João Paulo's profile photo" />
                    </div>
                    <div className="header-content">
                    <h1 className='myname'>Hello!<br></br>I'm João Paulo</h1>
                    <p className='myrole'>MSc Computer Engineer Student</p>
                    </div>
                    <div className='headerline1'></div>
                    <div className='headerline2'></div>
                    <nav>
                    <ul>
                        <li><Link to="/about">About Me</Link></li>
                        <li><Link to="/projects">All Projects</Link></li>
                        <li><Link to="/publications">Publications</Link></li>
                        <li><Link to="/skills">Skills</Link></li>
                        <li><Link to="/contacts">Contacts</Link></li>
                    </ul>
                    </nav>
                </div>
                </header>


                    <section id="projects" className="projects-section">
                    <div className="projects-container">
                            <h2 className='projects-title'>📌 Pinned Projects</h2>

                    {
                        !projects || !projects.allprojects ? (<p>Loading projects...</p>) :
                         (
                                projects.allprojects.slice(0,4).map(project => (
                                <div onClick={() => gotoDetails(project.code)} className="project-card" key={project.code}>
                                    <Link to={'/#/projects/'+project.code}><h3>{project.name} ({project.year}) - {project.type}</h3></Link> 
                                    <div className='imgdescproject'>
                                    <img src={process.env.PUBLIC_URL + "/" + project.image} alt={`${project.name} Mobile App`} className="project-image"/>
                                    <p className='projectdesc'>{project.description}</p>
                                    </div>
                                    <div className="project-links">
                                    <a href={project.repository} target="_blank" rel="noopener noreferrer">GitHub Repo</a>
                                    </div>
                                    <div className="technologies">
                                    {project.technologies.map(tech => (
                                        <span>{tech}</span>
                                    ))}
                                    </div>
                                </div>
                                ))
                        )
                    }
                    </div>
                    <div><a className='showall'><Link to="/projects">Show All</Link></a></div>
                    </section>

                    <section id="skillshome" className="skillshome-section">
                        <div className="container">
                            <h2><a class='myskillstools' href='/#/skills'>My Skills & Tools</a></h2>
                            <div className="skillshome-grid">
                                <span>JavaScript</span>
                                <span>Python</span>
                                <span>React Native</span>
                                <span>React</span>
                                <span>Node</span>
                                <span>Git</span>
                            </div>
                            <div className="skillshome-grid">

                                <span>Java</span>
                                <span>Docker</span>
                                <span>Kubernetes</span>
                                <span>Vue</span>
                                <span>C</span>
                                <span>C++</span>
                                <span>C#</span>
                                <span>Ansible</span>
                                <span>Kotlin</span>
                                <span>Figma</span>
                                </div>
                        </div>
                    </section>

                    <section id="contact" className="contact-section">
                        <div className="contact-container">
                            <h2>Let's get in touch!</h2>
                            <p>I'm always open to new opportunities and learning. 
                                <br></br>Feel free to connect with me through the following contacts.</p>
                            <div className="contact-links">
                                <div className='social-area'>
                                    <SocialIcon url="mailto:joaoppc2002@gmail.com" />
                                    <p><a href="mailto:joaoppc2002@gmail.com">Email</a></p>
                                </div>
                                <div className='social-area'>
                                    <SocialIcon url="https://www.linkedin.com/in/joao-castro-96093b231/" />
                                    <p><a href="https://www.linkedin.com/in/joao-castro-96093b231/">Linkedin</a></p>
                                </div>
                                <div className='social-area'>
                                    <SocialIcon url="https://github.com/joaocasr" />
                                    <p><a href="https://github.com/joaocasr">Github</a></p>
                                </div>
                                <div className='social-area'>
                                    <SocialIcon href="https://discordapp.com/users/473291331867770892" url="https://discord.com/" />
                                    <p><a href="https://discordapp.com/users/473291331867770892">Discord</a></p>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <Footer></Footer>
            </div>
        );
}



export default Home;