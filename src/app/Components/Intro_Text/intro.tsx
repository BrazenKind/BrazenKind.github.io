import '../css/intro.css'
import Image from 'next/image'

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
                I&apos;m <span style={{color: 'var(--rgb-start)'}}>Sinclair</span>, a graduate student whose studies intersect Artificial Intelligence with Software Enginnering.
                 <span style={{color: 'var(--rgb-start)'}}> Brazenkind</span> is the alias I use on github. I just finished my Masters&apos; in Computer Science, alongside a one year fellowship
                 at Devcom ARL doing web development. I&apos;m currently looking for software engineering/artificial intelligence roles, but also have an interest in virtual reality.
              </div>
            </div>
        </div>
    )
}