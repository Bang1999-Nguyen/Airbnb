import React from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import Carousel from './Carousel/Carousel'
import Discover from './Discover/Discover'
import Explore from './Explore/Explore'
import Video from './Video/Video'

export default function Home() {
    return (
        <div>
            <Header/>
           <Carousel/>
           <Explore/>
           <Discover/>
           <Video/>
           <Footer/>
        </div>
    )
}
