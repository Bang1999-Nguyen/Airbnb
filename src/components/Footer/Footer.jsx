import React, { useEffect } from 'react'
import './Footer.scss'
import AOS from 'aos';
import 'aos/dist/aos.css';
export default function Footer(props) {
    useEffect(() => {
        AOS.init({
        });
    }, []);
    return (
        <div className="footer">
            <div className="footer__infor" >
                <div className="row" data-aos='fade-left'>
                    <div className="col-3" >
                        <h1>ABOUT</h1>
                        <div className="contact">
                            <div className="engine">
                                <a href="https://www.airbnb.com/d/experiences-videos-upload">How Airbnb works</a>
                            </div>
                            <div className="engine">
                                <a  href="https://www.airbnb.com/d/experiences-videos-upload">Newsroom</a>
                            </div>
                            <div className="engine">
                                <a  href="https://www.airbnb.com/d/experiences-videos-upload">Airbnb 2021</a>
                            </div>
                            <div className="engine">
                                <a  href="https://www.airbnb.com/d/experiences-videos-upload">Investors</a>
                            </div>
                            <div className="engine">
                                <a  href="https://www.airbnb.com/d/experiences-videos-upload">Airbnb plus</a>
                            </div>
                            <div className="engine">
                                <a href="https://www.airbnb.com/d/experiences-videos-upload">Airbnb Luxe</a>
                            </div>
                            <div className="engine">
                                <a  href="https://www.airbnb.com/d/experiences-videos-upload">HotelTonight</a>
                            </div>
                            <div className="engine">
                                <a href="https://www.airbnb.com/d/experiences-videos-upload">Airbnb for Work</a>
                            </div>
                            <div className="engine">
                                <a href="https://www.airbnb.com/d/experiences-videos-upload">Made possible by Hosts</a>
                            </div>
                            <div className="engine">
                                <a href="https://www.airbnb.com/d/experiences-videos-upload">Careers</a>
                            </div>
                            <div className="engine">
                                <a href="https://www.airbnb.com/d/experiences-videos-upload">Founder's letter</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <h1>COMMUNITY</h1>
                        <div className="contact">
                            <div className="engine">
                                <a href="https://www.airbnb.com/d/experiences-videos-upload">Diversity & Belonging</a>
                            </div>
                            <div className="engine">
                                <a href="https://www.airbnb.com/d/experiences-videos-upload">Against Discrimination</a>
                            </div>
                            <div className="engine">
                                <a href="https://www.airbnb.com/d/experiences-videos-upload">Accessibility</a>
                            </div>
                            <div className="engine">
                                <a href="https://www.airbnb.com/d/experiences-videos-upload">Airbnb Associates</a>
                            </div>
                            <div className="engine">
                                <a href="https://www.airbnb.com/d/experiences-videos-upload">Host Afghan refugees</a>
                            </div>
                            <div className="engine">
                                <a href="https://www.airbnb.com/d/experiences-videos-upload">Guest Referrals</a>
                            </div>
                            <div className="engine">
                                <a href="https://www.airbnb.com/d/experiences-videos-upload">Gift cards</a>
                            </div>
                            <div className="engine">
                                <a href="https://www.airbnb.com/d/experiences-videos-upload">Airbnb.org</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <h1>HOST</h1>
                        <div className="contact">
                            <div className="engine">
                                <a href="https://www.airbnb.com/d/experiences-videos-upload">Host your home</a>
                            </div>
                            <div className="engine">
                                <a href="https://www.airbnb.com/d/experiences-videos-upload">Host an Online Experience</a>
                            </div>
                            <div className="engine">
                                <a href="https://www.airbnb.com/d/experiences-videos-upload">Host an Experience</a>
                            </div>
                            <div className="engine">
                                <a href="https://www.airbnb.com/d/experiences-videos-upload">Responsible Hosting</a>
                            </div>
                            <div className="engine">
                                <a href="https://www.airbnb.com/d/experiences-videos-upload">Resource Center</a>
                            </div>
                            <div className="engine">
                                <a href="https://www.airbnb.com/d/experiences-videos-upload">Communicate Center</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <h1>SUPPORT</h1>
                        <div className="contact">
                            <div className="engine">
                                <a href="https://www.airbnb.com/d/experiences-videos-upload">Our COVID-19 Response</a>
                            </div>
                            <div className="engine">
                                <a href="https://www.airbnb.com/d/experiences-videos-upload">Help Center</a>
                            </div>
                            <div className="engine">
                                <a href="https://www.airbnb.com/d/experiences-videos-upload">Cancellation options</a>
                            </div>
                            <div className="engine">
                                <a href="https://www.airbnb.com/d/experiences-videos-upload">Neighborhood Support</a>
                            </div>
                            <div className="engine">
                                <a href="https://www.airbnb.com/d/experiences-videos-upload">Trust & Safety</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
