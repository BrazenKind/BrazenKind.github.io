import './css/page.css'
import Banner from './banner.tsx'
import Intro from './intro.tsx'
import Image from 'next/image'
import Timeline from './timeline_code.js'

export default function Home() {

  return (
    <main>
        <div className="main-container">

            <Banner text="Brazenkind"/>

            <Intro/>

            <div style={{height: '80vh'}}>
                <Timeline/>
            </div>


            <div className="child-container interactive-graph">
                test
            </div>

            <div className="child-container contact-me">
                test
            </div>
        </div>

    </main>
  )
}


