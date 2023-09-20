import './css/page.css'
import Banner from './banner.tsx'
import Intro from './intro.tsx'
import Image from 'next/image'
import Timeline from './timeline_code.js'
import Projects from './projects.tsx'
import Contact_Me from './contact_me.tsx'

export default function Home() {

  return (
    <main>
        <div className="main-container">

            <Banner text="Brazenkind"/>

            <Intro/>

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

            <Projects/>


        </div>

        <Contact_Me/>

    </main>
  )
}


