import {React,  useEffect, useState} from 'react';
import NavBar from '../components/navbar'
import Footer from '../components/footer';
import '../styles/details.css'
import {useParams} from "react-router-dom";
const ProjectDetailsPage = () =>{
    const [project,setProject] = useState({})
    const { id } = useParams();

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])
    
    useEffect(() => {
        fetch('projects.json')
        .then(response =>{ return response.json()})
        .then(data =>{
            data.allprojects.forEach((el)=>{
                if(el.code==id){
                    setProject(el);
                }
            })
        })
        .catch(error => console.error('Error fetching projects...'+error));
        }, []);
    return (
        <div className='detailspagebody'>
            <NavBar></NavBar>
            <section class="projectdetails-section project-intro-section">
            <img src={process.env.PUBLIC_URL + "/" + project.image} alt="Imagem principal do projeto" class="projectdetails-image"/>
            <div class="project-summary-container">
                <h2 class="section-title">{project.name}</h2>
                <p class="project-description"> { project.description } </p>
                <div class="project-info-container">
                    <p class="project-info-item"><strong>Type:</strong> {project.type}</p>
                    <p class="project-info-item"><strong>Year:</strong>  {project.year}</p>
                    <p class="project-info-item"><strong>Github Repository:</strong> <a href={project.repository} target="_blank" class="project-link">{project.repository}</a></p>
                </div>
            </div>
        </section>
        <section class="projectdetails-section project-details-section">
            <h2 class="section-title">RoadMap details - Why? Challenges? Learning?</h2>
            <p class="project-description">{project.roadmap}</p>

        </section>


        <section class="projectdetails-section project-details-section">
            <h2 class="section-title">Details and Functionalities</h2>
            {
                !project.functionalities?(<br></br>):(
                    project.functionalities.map(functionality=>(
                        <li class="project-description">{functionality}</li>
            
                    ))
                )
            }

            <h3 class="subsection-title">Technologies and tools used</h3>
            <ul class="technologies-list">
                {
                    !project || !project.technologies? <p>Loading technologies...</p>: (project.technologies.map((tech)=>(
                        <li class="technology-item">{tech}</li>
                    ))) 
                }
            </ul>
        </section>

        <section class="projectdetails-section project-screenshots-section">
            {
               (project.overview && project.overview.length>0) ? (<h2 class="section-title">Demo</h2>) : (<br></br>)
            }
            <div class="screenshots-grid">
                {
                    !project.overview ? (<br></br>):(
                        project.overview.map(imageurl=>(
                            <img src={process.env.PUBLIC_URL + imageurl} alt="" class="screenshot-image"/>
                        ))
                    )
                }
            </div>
        </section>
            <Footer></Footer>

        </div>
    )
}

export default ProjectDetailsPage;