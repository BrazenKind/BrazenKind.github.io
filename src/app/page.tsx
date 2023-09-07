import './css/page.css'
import Banner from './banner.tsx'

export default function Home() {

  return (
    <main>
        <div className="main-container">

            <Banner text="Brazenkind"/>

            <div className="child-container intro">
                test
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


