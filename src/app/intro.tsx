import './css/intro.css'
import Image from 'next/image'

export default function Intro(data){

    return (
        <div id="intro">
            <Image
              id="profile_pic"
              src="./Yee.jpg"
              width={500}
              height={500}
              style={{width: '20%', height: '100%', objectFit: 'cover', borderRadius: '10px'}}
              alt="Picture of the author"
            />
            <div id="textbox">
              <div style={{fontSize: '3em'}}>About Me</div>
              <div style={{fontSize: '1.5em'}}>
                I&apos;m <span style={{color: 'blue'}}>Sinclair</span>, a graduate student whose studies intersect Artificial Intelligence with Software Enginnering.
                As of writing this, I&apos;m interning at the DEVCOM army reserach laboratory. I&apos;m working on developing interactive demos that
                 demonstrate their research projects in AI, as well as the webpage that hosts said interactive demos.
              </div>
            </div>
        </div>
    )
}