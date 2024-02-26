import Banner_Text from './banner_text.tsx'
import Intro_Menu from './Intro_Menu.tsx'
import '../css/intro_banner.css'

export default function Intro_Banner(){

    return(
        <div id="intro_banner">
            <Banner_Text text="Brazenkind"/>
            <Intro_Menu/>
        </div>
    )

}