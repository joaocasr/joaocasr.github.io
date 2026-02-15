import {React,  useEffect} from 'react';
import NavBar from "../components/navbar";
import '../styles/contacts.css'
import { SocialIcon } from 'react-social-icons'
import Footer from '../components/footer';
const ContactsPage = () =>{

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])
    return (
        <div className="contactsbody">
        <NavBar></NavBar>
   
        <section id="contact"  className="contacts-section">
                        <div className="contacts-container">
                            <h1 className="gettouch">Let's get in touch!</h1>
                            <p>I'm open to new collaborations and opportunities to learn new things. 
                                <br></br>Feel free to contact me through the following social platforms.</p>
                            <div className="contacts-links">
                                <div className='social-area'>
                                    <SocialIcon url="mailto:joaoppc2002@gmail.com" />
                                    <p><a href="mailto:joaoppc2002@gmail.com">Email</a></p>
                                </div>
                                <div className='social-area'>
                                    <SocialIcon url="https://www.linkedin.com/in/joao-castro-96093b231/" />
                                    <p><a href="https://www.linkedin.com/in/joao-castro-96093b231/">Linkedin</a></p>
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
    )
}

export default ContactsPage;