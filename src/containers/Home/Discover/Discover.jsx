import React, { useEffect } from 'react'
import './Discover.scss'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
function callback(key) {
    console.log(key);
}
export default function Discover(props) {
    useEffect(() => {
        AOS.init({
        });
    }, []);
    return (
        <div className='discover' >
            <div className="discover__title" data-aos='fade-up'>
                <h1>LIVE ANYWHERE<span></span></h1>
            </div>
            <div className="discover__content" >
                <div className="row g-2" data-aos='fade-up'>
                    <div className="col-3">
                        <div className="img__place" style={{ backgroundImage: `url('./images/2f13349d-879d-43c6-83e3-8e5679291d53.jpg')` }}>
                        </div>
                        <div className="title">
                            Outdoor getaways
                        </div>
                    </div>
                    <div className="col-3" >
                        <div className="img__place" style={{ backgroundImage: `url('./images/36f53e61-db8d-403c-9122-5b761c0e4264.jpg')` }}>
                        </div>
                        <div className="title">
                            Unique stays
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="img__place" style={{ backgroundImage: `url('./images/7d82ca14-56e5-4465-8218-dcfa7d69b6ac.jpg')` }}>
                        </div>
                        <div className="title">
                            Entire homes
                        </div>
                    </div>
                    <div className="col-3" >
                        <div className="img__place" style={{ backgroundImage: `url('./images/10a638e1-6aff-4313-8033-1275cec83987.jpg')` }}>
                        </div>
                        <div className="title">
                            Pets allowed
                        </div>
                    </div>
                </div>
            </div>
            <div className="things">
                <div className="things__title" data-aos="fade-up">
                    <h1>DISCOVER THINGS TO DO<span></span></h1>
                </div>
                <div className="event" data-aos="fade-up">
                    <div className="row">
                        <div className="col-4" >
                            <div className="something" style={{ backgroundImage: `url('./images/istockphoto-1324381802-170667a.jpg')` }} >
                            </div>
                            <div className="mess">
                                <a href="https://www.airbnb.com/s/experiences/online">Experiences</a>
                                <p>Find unforgettable activities near you.</p>
                            </div>
                        </div>
                        <div className="col-4" >
                            <div className="something" style={{ backgroundImage: `url('./images/0ce799cb-7553-4369-be9e-d0011e0ef636.jpg')` }} >
                            </div>
                            <div className="mess">
                                <a href="https://www.airbnb.com/s/experiences/online">Online Experiences</a>
                                <p>Live, interactive activities led by Hosts.</p>
                            </div>
                        </div>
                        <div className="col-4" >
                            <div className="something" style={{ backgroundImage: `url('./images/247a1ea3-946d-4eb8-a6ab-e8b9a66846f4.jpg')` }} >
                            </div>
                            <div className="mess">
                                <a href="https://www.airbnb.com/s/experiences/online">Featured Collections: Wanderlust</a>
                                <p>Travel from home with Online Experiences.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="inspiration" data-aos='fade-up'>
                    <h1>Inspiration for future getaways</h1>
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="Destinations for arts & culture" key="1">
                            <div className="row">
                                <div className="col-3">
                                    <div className="contact__destination">
                                        <h3>Phoenix</h3>
                                        <p>Arizona</p>
                                    </div>
                                    <div className="contact__destination">
                                        <h3>San Francisco</h3>
                                        <p>California</p>
                                    </div>
                                    <div className="contact__destination">
                                        <h3>Dublin</h3>
                                        <p>Ireland</p>
                                    </div>
                                    <div className="contact__destination">
                                        <h3>Edinburgh</h3>
                                        <p>United Kingdom</p>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="contact__destination">
                                        <h3>Hot Springs</h3>
                                        <p>Arkansas</p>
                                    </div>
                                    <div className="contact__destination">
                                        <h3>Barcelona</h3>
                                        <p>Catalonia</p>
                                    </div>
                                    <div className="contact__destination">
                                        <h3>Florence</h3>
                                        <p>Italy</p>
                                    </div>
                                    <div className="contact__destination">
                                        <h3>Liverpool</h3>
                                        <p>United Kingdom</p>
                                    </div>
                                </div>
                                <div className="col-3">
                                <div className="contact__destination">
                                        <h3>Los Angeles</h3>
                                        <p>California</p>
                                    </div>
                                    <div className="contact__destination">
                                        <h3>Prague</h3>
                                        <p>Czechia</p>
                                    </div>
                                    <div className="contact__destination">
                                        <h3>Rome</h3>
                                        <p>Italy</p>
                                    </div>
                                    <div className="contact__destination">
                                        <h3>St lves</h3>
                                        <p>United Kingdom</p>
                                    </div>
                                </div>
                                <div className="col-3">
                                <div className="contact__destination">
                                        <h3>Edinburgh</h3>
                                        <p>United Kingdom</p>
                                    </div>
                                    <div className="contact__destination">
                                        <h3>Edinburgh</h3>
                                        <p>United Kingdom</p>
                                    </div>
                                    <div className="contact__destination">
                                        <h3>Edinburgh</h3>
                                        <p>United Kingdom</p>
                                    </div>
                                    <div className="contact__destination">
                                        <h3>Edinburgh</h3>
                                        <p>United Kingdom</p>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="Destinations for outdoor adventure" key="2">
                            Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab="Mountain cabins" key="3">
                            Content of Tab Pane 3
                        </TabPane>
                        <TabPane tab="Beach destinations" key="4">
                            Content of Tab Pane 4
                        </TabPane>
                        <TabPane tab="Popular destinations" key="5">
                            Content of Tab Pane 5
                        </TabPane>
                        <TabPane tab="Unique stays" key="6">
                            Content of Tab Pane 6
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
