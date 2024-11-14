import './Components/css/page.css'
import Intro_Banner from './Components/Intro_Banner/Intro_Banner.tsx'
import Intro_Text from './Components/Intro_Text/intro.tsx'
import Image from 'next/image'
import Timeline from './Components/Timeline/timeline_code.js'
import Project_Cards from './Components/Project_Cards/projects.tsx'
import Contact_Me from './Components/Contact_Me/contact_me.tsx'

export default function Home() {

  return (
    <main>
        <div className="main-container">

            <Intro_Banner/>

            <Intro_Text/>

            <div style={{fontSize: '2em', fontWeight: 'bold', textAlign: 'center', margin: '30px'}}> Interactive CV </div>
            <div style={{textAlign: 'center'}}>
                Click and drag to move the graph around! Click on any text box to expand it and display its information. <br/>
                After expanding a text box, click on &apos; Return to Free View Mode &apos; to collapse it.
            </div>
            <div id = "Timeline_Container" style={{height: '80vh'}}>
                <Timeline/>
            </div>

            <div style={{fontSize: '2em', fontWeight: 'bold', textAlign: 'center', margin: '30px'}}> Projects </div>
            <div style={{textAlign: 'center'}}>
                Every project described in the interactive CV above.
            </div>

            <Project_Cards/>

            <Contact_Me/>

        </div>



    </main>
  )
}


