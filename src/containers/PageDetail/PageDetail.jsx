import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment'
import ReactMapGL from 'react-map-gl';
import { Rate } from 'antd';
import { NavLink } from 'react-router-dom'
import { actFetchDetail, actMoreDetail, getCurrentDate, getCurrentLocation, getGuest, } from './module/action';
import './PageDetail.scss'
import ContentLoader from 'react-content-loader'
import { TOKEN_MAP } from '../../settings/apiConfig';
import Modal from '../../components/Modal/Modal';
export default function PageDetail(props) {
    const { DetailOfLocation, loading, moreDetail } = useSelector(state => state.DetailReducer)
    const [show, setShow] = useState(false)
    const closeModalHandler = () => setShow(false)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actFetchDetail(props.match.params.id))
        dispatch(getGuest(props.match.params.guest))
        dispatch(getCurrentLocation(props.match.params.location))
        dispatch(getCurrentDate(props.match.params.startDate, props.match.params.endDate))
        dispatch(actMoreDetail(props.match.params.id))
    }, [])
    const [viewport, setViewport] = useState({
        latitude: 14.315424,
        longitude: 108.339537,
        zoom: 8,
        height: '110vh',
        width: '100%'
    });
    const scroll = () => {
        window.scrollTo(0, 0)
    }
    if (loading) return <ContentLoader viewBox="0 0 380 70">
        <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
        <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
        <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
    </ContentLoader>
    return (
        <div>
            <div className="bg_detail" style={{ backgroundImage: `url(${moreDetail?.image})` }}>
                <div className="detail-container">
                    <div>
                    <span className="welcome-in">Welcome in</span>
                    </div>
                    <div>
                  <span className="place-province">{props.match.params.location}</span>
                    </div>
                </div>
            </div>
            <div className="main__detail">
                <div className="row">
                    <div className="col-lg-7 col-sm-12 container list__room col-xs-12">
                        <div className="room__detail">
                            <span>{moment(props.match.params.startDate).format("MMM D")} - {moment(props.match.params.endDate).format("MMM D")}.</span>
                            <span className="guest_detail"> {props.match.params.guest} guests</span>
                            <h2>Stay in selected map area</h2>
                            <div className="selection">
                                <p>Free cancellation</p>
                                <p>Type of price</p>
                                <p>Price</p>
                                <p>Instant Book</p>
                                <p>More filters</p>
                            </div>
                        </div>
                        <div className="contain">
                        {
                            DetailOfLocation?.map((location, index) => {
                                return (
                                    <NavLink to={`/bookTicket/${location._id}/${location.locationId?.province}/${location.guests}/${moment(props.match.params.startDate).format("MMM D")}/${moment(props.match.params.endDate).format("MMM D")}`} onClick={() => scroll()}>
                                        <div className="room__information" key={index} >
                                            <div className="room__item">
                                                <div className="row">
                                                    <div className="img__room" style={{ backgroundImage: `url(${location.image})` }}>
                                                    </div>
                                                    <div className="infor__room">
                                                        <div className="like">
                                                            <h2>{location.name}</h2><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" className="heart">
                                                                <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path></svg>
                                                        </div>
                                                        <hr style={{ width: '70px', position: 'absolute', left: '20px' }}></hr>
                                                        <div className="content">
                                                            <span>{location.guests} guests - </span>
                                                            <span>{location.bedRoom} bedrooms - </span>
                                                            <span>{location.bath} bath</span>
                                                        </div>
                                                        <div className="service">
                                                            <span style={{ display: `${location.wifi ? 'block' : 'none'}` }} className="wifi">Free wifi</span>
                                                            <span style={{ display: `${location.kitchen ? 'block' : 'none'}` }}>Kitchen</span>
                                                            <span style={{ display: `${location.cableTV ? 'block' : 'none'}` }}>Cable TV</span>
                                                            <span style={{ display: `${location.elevator ? 'block' : 'none'}` }}>Elevator</span>
                                                        </div>
                                                        <p>{location.description.length > 30 ? location.description.substr(0, 52) : location.description}...</p>
                                                        <div className="price">
                                                            <Rate allowHalf defaultValue={`${location.locationId?.valueate / 2}`} className="rate" />
                                                            <i class="fas fa-money-check-alt"></i>
                                                            <h3>{location.price.toLocaleString()} VNĐ / night</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </NavLink>
                                )
                            })
                        }
                        </div>
                       

                    </div>
                    {show ? <div className="back_drop"></div> : null}
                    <Modal show={show} closeModalHandler={closeModalHandler} />
                    <div className="mobile">
                        {
                            DetailOfLocation?.map((location, index) => {
                                return (
                                    <NavLink to={`/bookTicket/${location._id}/${location.locationId?.province}/${location.guests}/${moment(props.match.params.startDate).format("MMM D")}/${moment(props.match.params.endDate).format("MMM D")}`} onClick={() => scroll()}>
                                       <div className="res-mobile" style={{ backgroundImage: `url(${location.image})` }}>
                                            <div className="res-overlay-mobile">
                                                <div className="res-border">
                                                    <h2>{location.name}</h2>
                                                    <h2>
                                                    <span>{location.guests} guests - </span>
                                                            <span>{location.bedRoom} bedrooms - </span>
                                                            <span>{location.bath} bath</span>
                                                    </h2>
                                                   
                                                            <div className="service">
                                                            <span style={{ display: `${location.wifi ? 'block' : 'none'}` }} className="wifi">Free wifi</span>
                                                            <span style={{ display: `${location.kitchen ? 'block' : 'none'}` }}>Kitchen</span>
                                                            <span style={{ display: `${location.cableTV ? 'block' : 'none'}` }}>Cable TV</span>
                                                            <span style={{ display: `${location.elevator ? 'block' : 'none'}` }}>Elevator</span>
                                                        </div>
                                                        <h3>Price: {location.price.toLocaleString()} VNĐ / night</h3>
                                                </div>
                                            </div>
                                       </div>
                                    </NavLink>
                                )
                            })
                        }
                      
                        </div>
                    <div className="col-5 map">
                        <ReactMapGL
                            {...viewport}
                            mapboxApiAccessToken={TOKEN_MAP}
                            mapStyle="mapbox://styles/mapbox/streets-v11"
                            onViewportChange={viewport => {
                                setViewport(viewport)
                            }}
                        >
                        </ReactMapGL>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
