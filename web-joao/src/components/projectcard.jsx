import '../styles/projectcard.css';
import { useNavigate } from "react-router";
import {React} from 'react';

const ProjectCard = ({code,name,year,type,image,description,technologies,repository}) =>{
    let navigate = useNavigate();

    const gotoDetails = (mcode) =>{
        navigate('/projects/'+mcode)
    }
    
    return (
        <div onClick={()=>gotoDetails(code)} className="projectcard">
        <a href={'/#/projects/'+code}><h3>{name} ({year}) - {type}</h3></a>
        <div className='imgdescproject'>
        <img src={process.env.PUBLIC_URL + "/" + image} alt={`${name} Mobile App`} className="projectcardimage"/>
        <p>{description}</p>
        </div>
        <div className="projectcardlinks">
        <a href={repository} target="_blank" rel="noopener noreferrer">GitHub Repo</a>

        
        </div>
        <div className="technologiescard">
        {Array.from(technologies).map(tech => (
            <span>{tech}</span>
        ))}
        </div>
        </div>

    )   
}

export default ProjectCard;
//{  type=="Mobile App" ? (<a href="path/to/your/app.apk" target="_blank" rel="noopener noreferrer" download>Download APK</a>) : <br></br>}