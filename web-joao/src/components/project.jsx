import '../App.css';
import '../styles/projectcard.css';
import {React} from 'react';

const ProjectCard = (authors,journal,abstractxt,title,year,link,image) => {

    return <div class="project-card">
    <div class="project-info">
        <h3>{title}</h3>
        <p class="authors">
        {
            authors.map((author,index)=>(
                index<authors.length-1 ? author+", " : author+'.'
            ))
        }
        </p>
        <p class="journal">{journal}, {year}</p>
        <div className="projectcardbody">
        <img src={process.env.PUBLIC_URL + "/" + image} className="pdfthumbnail"></img>
        <p class="abstract">
            {abstractxt}
        </p>
        </div>
       
    </div>
    <div class="project-links">
        <a href="#" class="link-button" target="_blank">Read Paper</a>
    </div>
</div>
}

export default ProjectCard;