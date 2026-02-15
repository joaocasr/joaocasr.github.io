import {React,  useEffect, useState} from 'react';
import NavBar from '../components/navbar'
import PublicationCard from '../components/publicationcard';
import '../styles/publications.css'
const PublicationsPage = () =>{
    const [publications, setPublications] = useState(null);

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])

    useEffect(() => {
        fetch('publications.json')
        .then(response =>{ return response.json()})
        .then(data =>{
            setPublications(data)})
        .catch(error => console.error('Error fetching publications...'+error));
        }, []);

        
    return (
        <div className="publicationsbody">
            <NavBar></NavBar>
            <h1 className="publicationstitle">Articles Published</h1>
            {
                !publications || !publications.allpublications ? (<p>Loading articles published...</p>) :(
                publications.allpublications.map(pub=>(
                    (PublicationCard(pub.authors,pub.journal,pub.abstract,pub.name,pub.year,pub.link,pub.image))
                )))
            }
            <div>
                
            </div>
        </div>
    )
}

export default PublicationsPage;