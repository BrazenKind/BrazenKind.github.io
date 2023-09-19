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

            <div id = "Timeline_Container" style={{height: '80vh'}}>
                <Timeline/>
            </div>

            <Projects/>


        </div>

        <Contact_Me/>

    </main>
  )
}


