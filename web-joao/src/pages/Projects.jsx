import {React,  useEffect, useState} from 'react';
import NavBar from '../components/navbar'
import ProjectCard from '../components/projectcard'
import Footer from '../components/footer';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import '../styles/projects.css'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      backgroundColor: "#3b3b3b",
      border: '1px solid black',
      color: "white"
    },
  },
};

const projectypes = ["Web","Mobile","Generic Tool"];
const technologies = ["React","Vue","Node.js","Express","Java","Javascript","Jupyter Notebook","Springboot","PostgreSQL","MongoDB","SQLite","Docker","Kubernetes","Kotlin","Android Studio","Flutter","Firebase","Python","C","C#","C++"];

const ProjectsPage = () =>{
    const [projects, setProjects] = useState([]);
    const [statsbtncolor,setstatsbtncolor] = useState("#3b3b3b")
    const [stats, setStats] = useState(false);
    const [statstxt, setStatstxt] = useState("Show Stats");
    const [projecttypes, setprojecttypes] = useState([]);
    const [selectedTech, setselectedTech] = useState([]);
    const [filtered_projects, setfiltered_projects] = useState([]);

    const handleProjectTypeChange = (event) => {
        event.preventDefault();
        const value = event.target.value;

        setprojecttypes(typeof value === 'string' ? value.split(',') : value);

    };
    const changeStats = () => {
        if(statsbtncolor==="#3b3b3b") setstatsbtncolor("#576499")
        else setstatsbtncolor("#3b3b3b")
        setStats(value => !value);
    }

    useEffect(()=>{
        if(stats==true) setStatstxt("Hide Stats");
        else setStatstxt("Show Stats");

    },[stats])
    
    const handleTechnologyChange = (event) =>{
        event.preventDefault();
        const value = event.target.value;

        setselectedTech(typeof value === 'string' ? value.split(',') : value);
    }
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])
    
    useEffect(()=>{
        let filtered = projects.allprojects
        let selectedProjects = []
        for(let i=0;i<projecttypes.length;i++){
            let projfiltered = filtered.filter(project => project.projecttype === projecttypes[i]); 
            selectedProjects = selectedProjects.concat(projfiltered)
        }
        for(let i=0;i<selectedTech.length;i++){
            if(selectedProjects.length>0){
                let projfiltered = selectedProjects.filter(project => project.technologies.includes(selectedTech[i])); 
                selectedProjects = projfiltered
            }else{
                let projfiltered = filtered.filter(project => project.technologies.includes(selectedTech[i])); 
                selectedProjects = selectedProjects.concat(projfiltered)
            }
        }
        if(projecttypes.length==0 && selectedTech.length==0) selectedProjects = filtered
        setfiltered_projects({ allprojects : selectedProjects})
    },[projecttypes,selectedTech])


    useEffect(() => {
        fetch('projects.json')
        .then(response =>{ return response.json()})
        .then(data =>{
            setProjects(data);
            setfiltered_projects(data);
        })
        .catch(error => console.error('Error fetching projects...'+error));
        }, []);

        
    return (
        <div className="projectsbody">
            <NavBar></NavBar>
            <h1 className="projectstitle">All projects</h1>
            <div>
                <button style={{"background-color":statsbtncolor}} className='statsbtn' onClick={changeStats}>{statstxt}</button>
                <FormControl className="formtype" sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Project Type</InputLabel>
                <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={projecttypes}
                onChange={handleProjectTypeChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
                >
                {projectypes.map((name) => (
                    <MenuItem key={name} value={name}>
                    <Checkbox checked={projecttypes.includes(name)} />
                    <ListItemText primary={name} />
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            <FormControl className="formtype" sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Technologies</InputLabel>
                <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={selectedTech}
                onChange={handleTechnologyChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
                >
                {technologies.map((name) => (
                    <MenuItem key={name} value={name}>
                    <Checkbox checked={selectedTech.includes(name)} />
                    <ListItemText primary={name} />
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            </div>
            {
                stats === true ? (
                    <div className='statscontainer'>
                        <img width="400px" src="https://github-readme-stats.vercel.app/api/top-langs/?username=joaocasr&langs_count=20&theme=tokyonight&hide=jupyter%20notebook,Roff,Assembly&layout=donut-vertical" />
                    </div>
                ) : (
                        (!filtered_projects || !filtered_projects.allprojects)? (<p>Loading projects...</p>) :
                         (
                            filtered_projects.allprojects.map(project => (
                                    <ProjectCard key={project.code}
                                        code={project.code}
                                        name={project.name}
                                        year={project.year}
                                        type={project.type}
                                        image={project.image}
                                        description={project.description}
                                        technologies={project.technologies}
                                        repository={project.repository}
                                  />
                                ))
                        )
                    )
            }
          
            <Footer></Footer>

        </div>
    )
}

export default ProjectsPage;