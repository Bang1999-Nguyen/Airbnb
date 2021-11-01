import React, { useEffect } from 'react'
import './Explore.scss'
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Explore() {
    const lazyLoad = () => {
        var image = document.querySelectorAll('.img');
        var i;
        for (i = 0; i < image.length; i++) {
            image[i].style.filter = "none";
        }
    }
    useEffect(() => {
        AOS.init({
            duration: 1500
        })
    }, []);
    return (
        <div className="explore">
            <div className="explore__title" >
                <h1>FIND <span>POPULAR</span> DESTINATIONS</h1>
                <i class="fas fa-map-marker-alt"></i>
            </div>
            <div className="explore__content" >
                <div className="row">
                    <div className="col-6">
                        <h3>FEATURES STORED</h3>
                        <div className="img__explore" onLoaded={setTimeout(lazyLoad, 4000)}>
                            <img src="./images/Jody-Daunton-Trees-for-Life-1_6 (1).jpg" alt="Hinh 1" className="img" />
                        </div>
                        <h2>THE NATURAL WORLD</h2>
                    </div>
                    <div className="col-6">
                        <div className="image__explore" onLoaded={setTimeout(lazyLoad, 4000)}>
                            <img src="./images/Jody-Daunton-Otter-Surfboards-1_2 (1).jpg" alt="Hinh 2" className="img" />
                        </div>
                        <h4>ANOTHER WORLD</h4>
                    </div>
                </div>
            </div>
            <div className="explore__place" >
                <div className="row">
                    <div className="col-4">
                        <div className="img__place" onLoaded={setTimeout(lazyLoad, 4000)}>
                            <img src="./images/Justin-Kauffman-Another-Escape-Jacob-Witzling-4 (1).jpg" className="img"></img>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="img__place" onLoaded={setTimeout(lazyLoad, 4000)}>
                            <img src="https://images.unsplash.com/photo-1582966772397-ed68d72f35d1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGRhJTIwbGF0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" className="img"></img>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="img__place" onLoaded={setTimeout(lazyLoad, 4000)}>
                            <img src="./images/jet-dela-cruz-5QbZIJV8k4E-unsplash.jpg" className="img"></img>
                        </div>
                    </div>
                </div>
            </div>
            <div className="view__detail" data-aos='fade-up'>
                <div className="btn__view">
                    <a href="https://www.airbnb.com/s/experiences/online">View all featured stories</a>
                </div>
            </div>
        </div>
    )
}
