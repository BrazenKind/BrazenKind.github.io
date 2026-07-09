import '../css/intro.css'
import Image from 'next/image'
import Link from 'next/link'

export default function Intro(data){

    return (
        <div id="intro">
            <Image
              id="profile_pic"
              src="./Yee.jpg"
              width={500}
              height={500}
              alt="Picture of the author"
            />
            <div id="textbox">
              <div id="texttitle" >About Me</div>
              <div id="textcontent">
                I&apos;m <span style={{color: 'var(--rgb-start)'}}>Sinclair</span>, a software developer whose applied python full stack development to a myriad of government solutions, from <span style={{color: 'var(--rgb-end)'}}> developing AI interfaces for the Devcom Army Reseach Laboratory</span> 
                 to <span style={{color: 'var(--rgb-end)'}}>developing massively scalable data platforms at Lyteforge.</span>
                 <span style={{color: 'var(--rgb-start)'}}> Brazenkind </span> is the alias I use on github. 
                 <br></br>
                  <br></br>I'm actively seeking full stack opportunities that align with my previous experience. If you're a recruiter who'd like to know more about my work experience or simply someone who 
                  would like to reach out, <Link href="#contact_me">click here to be directed to my contact form.</Link>
              </div>
            </div>
        </div>
    )
}