import {React,  useEffect, useRef} from 'react';
import NavBar from '../components/navbar'
import Footer from '../components/footer';
import '../styles/about.css'
const AboutPage = () =>{
    const firstsection = useRef(null)
    const secondsection = useRef(null)

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])

    const handleNavigation = () =>{
        secondsection.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }


    return (
        <div className='aboutpagebody'>
            <NavBar></NavBar>
            <div ref={firstsection} className='firstsection'>
                <section className="aboutme">
                  <div className='aboutmetxt'>
                    <p className='abouttxt'>About</p> <p className='metxt'>Me</p> <img className='lightbulb' src={process.env.PUBLIC_URL + "/lightbulb.png"}></img>
                  </div>
                  <p className='textbio1'>                   
                    Hello, it's great to have you here! I'm João Paulo and this is a space where I'll share my journey and the projects I'm passionate about.

                    <br/>
                    I remember my first contact to programming through my cousin, back when I was in middle school. He showed me a simple batch script consisting of a text input and output program that he executed in a terminal. At that moment, that snippet of code seemed like a language of Gods that few could understand.

                    Back then my curiosity led me to endorse some courses from CodeAcademy, where Python was my ready to go language due to its flexibility and logical code syntax.
                    
                    I wanted to learn more about technology, so I decided to endorse a Bachelor's and a Master's degree on Computer Science at University of Minho. Over those years, I've had the opportunity to delve deeper into areas such as Apllications Engineering and Intelligent Systems. I'm passionate about both web and mobile applications' development,
                    even though I developed a special enjoyment towards mobile development. Through this, I've had the opportunity to deepen my knowledge on technologies like Java, Kotlin and Flutter which have allowed me to bring to life some personal projects based on my likes. Some of those applications consisted on a found footage film management application, a POV navigation application with immersive audio, a Japanese language learning application, a football simulator kotlin app, and others.
                    
                    I'm also interested in the critical transition from software design to code implementation, with a focus on emerging practices including model-based development and automated code-generation workflows.

                    I'm a person who likes new challenges and it's always ready to learn new tools and frameworks.

                    Beyond coding, my curiosity leads me to explore the world and see it in different ways through martial arts and drawing, which I practice as a hobby.

                    <br/>
                </p>
                   <div onClick={handleNavigation} className='navigation'>
                    <img className="arrow" src={process.env.PUBLIC_URL + "/arrowdown.png"}/>
                   </div>
                    </section>
                    
                <section className="aboutmeimg">
                <img className="laptopguy" src={process.env.PUBLIC_URL + "/laptopguy.png"}/>
                </section>
            </div>
            <div className='airplanecontainer'>
                <img className='airplane' src={process.env.PUBLIC_URL + "/airplane.png"}/>
            </div>
            <div ref={secondsection} className='secondsection'>
            <section className='living'>
                    <img className="globe" src={process.env.PUBLIC_URL + "/globe.gif"}/>

                </section>
                <section className='livingsection'>

                    <div class='livingtxt'><p>📍 Braga,Portugal</p></div>
                </section>
            </div>
            <Footer></Footer>

        </div>
    )
}

export default AboutPage;