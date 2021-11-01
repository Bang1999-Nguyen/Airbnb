import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment'
import ReactMapGL from 'react-map-gl';
import { Rate } from 'antd';
import { actFetchDetail, getCurrentDate, getCurrentLocation, getGuest } from './module/action';
import './PageDetail.scss'
import ContentLoader from 'react-content-loader'
import { TOKEN_MAP } from '../../settings/apiConfig';
export default function PageDetail(props) {
    const { DetailOfLocation, loading } = useSelector(state => state.DetailReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actFetchDetail(props.match.params.id))
        dispatch(getGuest(props.match.params.guest))
        dispatch(getCurrentLocation(props.match.params.location))
        dispatch(getCurrentDate(props.match.params.startDate, props.match.params.endDate))
    }, [])
    const [viewport, setViewport] = useState({
        latitude: 14.315424,
        longitude: 108.339537,
        zoom: 8,
        height:'110vh',
        width:'100%'
    });

    if (loading) return <ContentLoader viewBox="0 0 380 70">
        <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
        <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
        <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
    </ContentLoader>
    return (
        <div>
            <div className="bg_detail" style={{ backgroundImage: `url(${DetailOfLocation[0]?.locationId.image})` }}>

            </div>
            <div className="main__detail">
                <div className="row">
                    <div className="col-7 container list__room">
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

                        {
                            DetailOfLocation?.map((location, index) => {
                                return (
                                    <div className="room__information">
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
                                                        <Rate allowHalf defaultValue={`${location.locationId.valueate / 2}`} className="rate" />
                                                        <i class="fas fa-money-check-alt"></i>
                                                        <h3>{location.price.toLocaleString()} VNĐ / night</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div className="col-5 map">
                        <ReactMapGL
                            {...viewport}
                            mapboxApiAccessToken={TOKEN_MAP}
                            mapStyle="mapbox://styles/mapbox/streets-v11"
                            onViewportChange={viewport =>{
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
