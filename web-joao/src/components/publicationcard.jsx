import '../App.css';
import '../styles/publicationcard.css';
import {React} from 'react';

const PublicationCard = (authors,journal,abstractxt,title,year,link,image) => {

    return <div class="publication-card">
    <div class="publication-info">
        <h3>{title}</h3>
        <p class="authors">
        {
            authors.map((author,index)=>(
                index<authors.length-1 ? author+", " : author+'.'
            ))
        }
        </p>
        <p class="journal">{journal}, {year}</p>
        <div className="publicationcardbody">
        <img src={process.env.PUBLIC_URL + "/" + image} className="pdfthumbnail"></img>
        <p class="abstract">
            {abstractxt}
        </p>
        </div>
       
    </div>
    <div class="publication-links">
        <a href={process.env.PUBLIC_URL + "/article.pdf"}  class="link-button" download>Read Paper</a>
    </div>
</div>
}

export default PublicationCard;