import {React,  useEffect, useState} from 'react';
import NavBar from '../components/navbar'
import Footer from '../components/footer';
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import '../styles/skills.css'
const SkillsPage = () =>{
    const [open,setopen] = useState(false)

    const handleToggle = () =>{
        setopen((prev)=>!prev)
    }
    const handleClose = () =>{
        setopen(false)
    }

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])

    return (
        <div className='skillspagebody'>
            <NavBar></NavBar>
            <section class="skills-section">
        <h2>My Skills</h2>
        <Tooltip open={open} onClose={handleClose} disableFocusListener disableHoverListener disableTouchListener  placement="bottom-start" className='helptooltip' title="Here you'll find a collection of frameworks, languages, tools that I have used and organized by proficiency level. Additionally, I have provided additional context on the practical applications of each.">
        <IconButton onClick={handleToggle}>
            <HelpIcon></HelpIcon>
        </IconButton>
        </Tooltip>
        <div class="skills-grid">

            <div class="skill-column advanced">
                <h3>Advanced</h3>
                <div class="skill-item">
                    <span class="skill-name">Python & FastAPI</span>
                    <ul>
                        <li class="skill-context">I developed a Python automation tool to convert Figma prototypes to Vue code. This allowed me to be confortable with API manipulation, data processing, data structures and code generation. I used the FastAPI framework to turn this tool into a RESTful service in order to request for different prototype URL's and different grid systems for the web pages to be built.</li>
                        <li class="skill-context">Built a Python conversion tool from Toml to Json, which allowed me to be in contact with lex and yacc submodules from ply in order to identify tokens and build a grammar. This project also allowed me to be in contact with the manipulation of data structures such as dictionaries, lists and the operations inherent.
                        <li class="skill-context">Developed a software simulation to compare intelligent search algorithms. This allowed me to gain practical experience with pathfinding algorithms like A*, Breadth-First Search, Depth First Search and Greedy Search. I also gained experience with collision detection and learned how to model and manage a dynamic environment in code. This project solidified my understanding of how algorithm choice impacts performance and efficiency.</li>
                        <li class="skill-context">Engineered a vector race game environment. This allowed me to apply Object-Oriented Programming (OOP) principles to create classes for game objects like the car and obstacles. I also improved my skills in problem decomposition and state management, as I had to systematically handle the car's position, movement, and interactions within the game circuit.  This project also provided experience in performance analysis by comparing the cost and efficiency of different algorithms.</li>
                        </li><li class="skill-context">I designed and developed a real-time OTT media streaming service using Python on a simulated application overlay network. This project allowed me to gain significant experience with multithreading and concurrency, implementing a simultaneous client/server model to handle concurrent data transmission. I also built the core functionality around pathfinding and routing algorithms, which the Rendezvous Point (RP) used to find the most efficient paths for content distribution.</li>
                        <li class="skill-context">I gained hands-on experience with key networking and data handling technologies. I used TCP as a reliable transport protocol to ensure every video frame was delivered, a crucial decision after testing with UDP. I worked with RTP for real-time video data transmission and implemented a custom messaging protocol using JSON to manage server-to-RP communication. The project also honed my skills in data structures like trees and dictionaries to manage network topology and connections.</li>
                    </ul>
                </div>
                
                <div class="skill-item">
                    <span class="skill-name">Java & Kotlin</span>
                    <ul>
                    <li class="skill-context">I have experience in Java and Kotlin for building Android mobile applications, which allowed me to understand better mobile development lifecycle. I developed a found footage movie database application in Java using SQLite for local data persistence, a flashcard and a Japanese learning app. Using Kotlin, I built a nearest sales detector and a football simulator app, which provided me with a strong foundation in modern Android development, including the implementation of the MVVM architecture, and the use of libraries like Room for local persistence, LiveData for reactive UI updates, and Coroutines for asynchronous task execution.</li>
                    </ul>
                </div>
                <div class="skill-item">
                    <span class="skill-name">Vue</span>
                    <ul>
                        <li class="skill-context">I have leveraged Vue.js's declarative UI, component-based architecture, and reactive data binding to build dynamic web applications. My projects included implementing features like state management with Vuex/Pinia mostly for authentication requisites, component-based navigation, conditional rendering, and dynamic pagination.</li>
                    </ul>
                </div>
                <div class="skill-item">
                    <span class="skill-name">Figma</span>
                    <ul>
                        <li class="skill-context">I have experience in Figma, where I've developed skills in creating more complex variants, building and organizing components, and integrating elements from external design systems. I've designed some high-fidelity prototypes, including a library app, an e-commerce platform, a movie streaming application and others.</li>
                    </ul>
                </div>
                <div class="skill-item">
                    <span class="skill-name">Git & GitHub</span>
                    <p class="skill-context">
                        <ul>
                        <li class="skill-context">I have experience using Git for version control and GitHub for collaborative development. I am comfortable with core Git workflows, including branching, merging, pull requests and merge conflict solving in order to manage code changes and contribute to team projects. I have basic knowledge of GitHub Actions where I've used it to automate UI interactive testing.</li>                        </ul>
                    </p>
                </div>
            </div>

            <div class="skill-column intermediate">
                <h3>Intermediate</h3>
                <div class="skill-item">
                    <span class="skill-name">Java & Springboot</span>
                    <ul>
                    <li class="skill-context">
                    I designed and implemented RESTful APIs using SpringBoot. I've used Spring Data JPA and Hibernate to manage database interactions and also used JPA for pagination and sorting in order to split and manage large sets of data into manageable chunks. </li>
                    <li class="skill-context">My projects included integrating message brokers with Apache Kafka to ensure data consistency amongst Springboot microservices. I was responsible for building a notifications service using Apache Kafa which helped on managing the subscribe and consume of events.
                    </li>
                    <li class="skill-context">
                    I was also involved on the developing of an authentication microservice based on token authentication using Spring Security and JWT, and ensuring API endpoints were secure and performant.
                    </li>
                    </ul>
                </div>
                <div class="skill-item">
                    <span class="skill-name">React</span>
                    <ul>
                        <li class="skill-context">
                        I've built some responsive and interactive SPAs using React.js's component-based architecture. My experience includes implementing web applications like an online exams platform utilizing React Router for dynamic navigation, asynchronous data fetching using libraries like Axios, and building modular UI through reusable compoents and UI libraries such as MUI.
                        </li>
                    </ul>
                </div>
                <div class="skill-item">
                    <span class="skill-name">Node.js & Express</span>
                    <ul>
                    <li class='skill-context'>
                            I was also enrolled on a project where I was responsible for building a real-time notifications microservice by using using libraries such as Socket.IO with Express. I'm confortable building RESTful APIs using Express to handle different HTTP methods for different URL endpoints, and EXpress' middleware capabilities for different scenarios such as routing modularization, data validation, and authentication.
                        </li>
                        <li class='skill-context'>
                            I have been involved in projects where a server-side dynamic page rendering paradigm was followed through Express's support for different template engines (mostly used Pug).
                        </li>
                    </ul>
                </div>
                <div class="skill-item">
                    <span class="skill-name">Docker & Kubernetes</span>
                    <p class="skill-context">
                        <ul>
                            <li class="skill-context">I possess intermediate-level experience in containerization and orchestration using Docker and Kubernetes. I am proficient in dockerizing applications and services, managing their inter-container communication via a bridge network. Furthermore, I have deployed and managed some containerized applications on Google Kubernetes Engine (GKE), for instance, a e-commerce-like web app following a microservices architecture.</li>
                        </ul>
                    </p>
                </div>
                <div class="skill-item">
                    <span class="skill-name">PostgreSQL & MongoDB </span>
                    <p class="skill-context">
                    <ul>
                    <li class="skill-context">I possess intermediate-level skills in PostgreSQL and MongoDB. My experience includes writing and optimizing queries with techniques such as materialization and indexation to improve database query performance.</li>
                    </ul>
                    </p>
                </div>
               { /**
                <div class="skill-item">
                    <span class="skill-name">CSS3 & SASS</span>
                    <p class="skill-context">
                        Proficiente na criação de interfaces responsivas e na utilização de pré-processadores para manter o código organizado.
                    </p>
                </div>*/ }
            </div>

            <div class="skill-column basic">
                <h3>Basic</h3>
                
                <div class="skill-item">
                    <span class="skill-name">Typescript</span>
                    <p class="skill-context">
                        <ul>
                        <li class="skill-context">I have basic knowledge of TypeScript, including understanding how static typing can be used to improve code quality and prevent common errors. I applied this knowledge to build a Trello clone, which helped me understand the benefits of types in a real-world application.</li>                        </ul>
                    </p>
                </div>
                <div class="skill-item">
                    <span class="skill-name">Flutter</span>
                    <p class="skill-context">
                        <ul>
                        <li class="skill-context">I have basic knowledge of Flutter, including the use of widgets to build cross-platform applications from a single codebase. I used these skills to develop a mobile app for Hogwarts navigation with immersive audio, gaining hands-on experience with mobile app development.</li>
                        </ul>
                    </p>
                </div>
            </div>
        </div>
    </section>

            <Footer></Footer>

        </div>
    )
}

export default SkillsPage;