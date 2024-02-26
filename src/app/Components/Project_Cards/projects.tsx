import '../css/projects.css'
import {project_descs} from './project_descriptions'
import Project_Card from './project_card.tsx'

export default function Projects(){

    return(

        <div id = "project_wrapper">
            {
                project_descs.map(item => <Project_Card key={item.name} name={item.name} desc={item.desc} github={item.github}/>)
            }
        </div>
    )
}