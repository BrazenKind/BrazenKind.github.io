import '../css/project_card.css'

export default function Project_Card(data){
    return(
        <div className="project_card">
            <div className="title"> {data.name} </div>
            <div className="desc"> {data.desc} </div>
            <div className="github_link">
                <a href={data.github} target="_blank" rel="noopener noreferrer"> <img className = "github_image" src="github-mark.png" alt="github logo"/></a>
            </div>
        </div>
    )
}