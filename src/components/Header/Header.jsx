import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { actFetchLocation, clearResult, findLocation, hideOverlay, isPlaceCurrent, plusAdult, selectAction, valueSelection } from '../../containers/Home/Carousel/module/action';
import DatePicker from '../Calendar/Calendar';
import { NavLink } from 'react-router-dom'
import './Header.scss'
import moment from "moment"
import { ADD__TRANSITION } from '../../containers/Home/Carousel/module/types';

export default function Header(props) {
    const { isDisplay, location, locationDefault, quantityPeople, totalPeople, infants, btnSelection,  startDate, endDate } = useSelector(state => state.CarouselReducer)
    const [isVisible, setIsVisible] = useState(false)
    const [isLocation, setLocation] = useState(false)
    const [isQuantity, setIsQuantity] = useState(false)
    const [isExperience, setIsExperience] = useState(false)
    const [isHighlight, setIsHighlight] = useState(false)
    const [isPlace, setIsPlace] = useState('')
    const [id, setId] = useState('')
    const [toStay, setToStay] = useState(true)
    const [experience, setExperience] = useState(false)
    let btnSelect = [
        { type: 'toStay', select: true, name: "Places to stay" },
        { type: 'experiences', select: false, name: "Experiences" }
    ]
    const chooseOption = (button) => {
        let btnSelectUpdate = [...btnSelect];
        btnSelectUpdate = btnSelectUpdate.map(item => {
            return { ...item, select: false }
        })
        let index = btnSelectUpdate.findIndex(item => item.type === button.type)
        if (index !== -1) {
            btnSelectUpdate[index].select = true;
        }
        btnSelect = btnSelectUpdate;
        if (button.type === 'toStay') {
            setToStay(true)
            setExperience(false)
        } else if (button.type === 'experiences') {
            setToStay(false)
            setExperience(true)
        }
        dispatch({
            type: 'CHANGE__NAVBAR',
            payload: btnSelect
        })
    }
    const toggleVisibility = () => {
        if (window.pageYOffset > 160) {
            setIsVisible(true);
            dispatch(hideOverlay())
            setIsHighlight(false)
            setIsQuantity(false)
            setToStay(false)
        } else if (window.pageYOffset < 3) {
            setIsVisible(false);
            setToStay(true)
        }
    };

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actFetchLocation());
        window.addEventListener("scroll", toggleVisibility);
       
    }, [])
    const onSearch = (event) => {
        if (event.target.value !== '') {
            setLocation(true);
            dispatch(selectAction())
            const list = locationDefault.filter(function (item) {
                return item.province.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1;
            })
            dispatch(findLocation(list))
        } else {
            dispatch(actFetchLocation())
            dispatch(hideOverlay())
        }
    }
    const solveTransition = () => {
        dispatch({
            type: ADD__TRANSITION,
            payload: null
        })
        dispatch(clearResult())
        dispatch(isPlaceCurrent(isPlace))
        window.scrollTo(0,0)
    }
    const changeValue = (item) => {
        document.querySelector('.value__location').value = item.province;
        dispatch(valueSelection(item.province))
        setIsPlace(item.province)
        setId(item._id)
      
    }
    const nearBy = () => {
        document.querySelector('.near').value = "NearBy";
        setIsExperience(false);
        document.querySelector('.value__location').value = "NearBy";
    }
    const showDetail = () => {
        document.querySelector('.search').style.display = 'block';
        dispatch(selectAction())
        setIsHighlight(true)
        setToStay(false)
    }
    const displayQuantity = () => {
        setIsQuantity(true)
        dispatch(hideOverlay())
    }
    return location && (
        <div>
            <div className={`header ${isVisible ? 'active' : ''} ${isHighlight ? 'isHeader' : ''}`} >
                <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4">
                    <div className="container-fluid mx-5">
                        <svg width="102" height="34" fill="currentcolor" style={{ display: 'block', color: 'crimson', fontWeight: 'bold' }}><path d="M29.24 22.68c-.16-.39-.31-.8-.47-1.15l-.74-1.67-.03-.03c-2.2-4.8-4.55-9.68-7.04-14.48l-.1-.2c-.25-.47-.5-.99-.76-1.47-.32-.57-.63-1.18-1.14-1.76a5.3 5.3 0 00-8.2 0c-.47.58-.82 1.19-1.14 1.76-.25.52-.5 1.03-.76 1.5l-.1.2c-2.45 4.8-4.84 9.68-7.04 14.48l-.06.06c-.22.52-.48 1.06-.73 1.64-.16.35-.32.73-.48 1.15a6.8 6.8 0 007.2 9.23 8.38 8.38 0 003.18-1.1c1.3-.73 2.55-1.79 3.95-3.32 1.4 1.53 2.68 2.59 3.95 3.33A8.38 8.38 0 0022.75 32a6.79 6.79 0 006.75-5.83 5.94 5.94 0 00-.26-3.5zm-14.36 1.66c-1.72-2.2-2.84-4.22-3.22-5.95a5.2 5.2 0 01-.1-1.96c.07-.51.26-.96.52-1.34.6-.87 1.65-1.41 2.8-1.41a3.3 3.3 0 012.8 1.4c.26.4.45.84.51 1.35.1.58.06 1.25-.1 1.96-.38 1.7-1.5 3.74-3.21 5.95zm12.74 1.48a4.76 4.76 0 01-2.9 3.75c-.76.32-1.6.41-2.42.32-.8-.1-1.6-.36-2.42-.84a15.64 15.64 0 01-3.63-3.1c2.1-2.6 3.37-4.97 3.85-7.08.23-1 .26-1.9.16-2.73a5.53 5.53 0 00-.86-2.2 5.36 5.36 0 00-4.49-2.28c-1.85 0-3.5.86-4.5 2.27a5.18 5.18 0 00-.85 2.21c-.13.84-.1 1.77.16 2.73.48 2.11 1.78 4.51 3.85 7.1a14.33 14.33 0 01-3.63 3.12c-.83.48-1.62.73-2.42.83a4.76 4.76 0 01-5.32-4.07c-.1-.8-.03-1.6.29-2.5.1-.32.25-.64.41-1.02.22-.52.48-1.06.73-1.6l.04-.07c2.16-4.77 4.52-9.64 6.97-14.41l.1-.2c.25-.48.5-.99.76-1.47.26-.51.54-1 .9-1.4a3.32 3.32 0 015.09 0c.35.4.64.89.9 1.4.25.48.5 1 .76 1.47l.1.2c2.44 4.77 4.8 9.64 7 14.41l.03.03c.26.52.48 1.1.73 1.6.16.39.32.7.42 1.03.19.9.29 1.7.19 2.5zM41.54 24.12a5.02 5.02 0 01-3.95-1.83 6.55 6.55 0 01-1.6-4.48 6.96 6.96 0 011.66-4.58 5.3 5.3 0 014.08-1.86 4.3 4.3 0 013.7 1.92l.1-1.57h2.92V23.8h-2.93l-.1-1.76a4.52 4.52 0 01-3.88 2.08zm.76-2.88c.58 0 1.09-.16 1.57-.45.44-.32.8-.74 1.08-1.25.25-.51.38-1.12.38-1.8a3.42 3.42 0 00-1.47-3.04 2.95 2.95 0 00-3.12 0c-.44.32-.8.74-1.08 1.25a4.01 4.01 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.98.45 1.55.45zM53.45 8.46c0 .35-.06.67-.22.93-.16.25-.38.48-.67.64-.29.16-.6.22-.92.22-.32 0-.64-.06-.93-.22a1.84 1.84 0 01-.67-.64 1.82 1.82 0 01-.22-.93c0-.36.07-.68.22-.93.16-.3.39-.48.67-.64.29-.16.6-.23.93-.23a1.84 1.84 0 011.6.86 2 2 0 01.21.94zm-3.4 15.3V11.7h3.18v12.08h-3.19zm11.68-8.9v.04c-.15-.07-.35-.1-.5-.13-.2-.04-.36-.04-.55-.04-.89 0-1.56.26-2 .8-.48.55-.7 1.32-.7 2.31v5.93h-3.19V11.69h2.93l.1 1.83c.32-.64.7-1.12 1.24-1.48a3.1 3.1 0 011.81-.5c.23 0 .45.02.64.06.1.03.16.03.22.06v3.2zm1.28 8.9V6.74h3.18v6.5c.45-.58.96-1.03 1.6-1.38a5.02 5.02 0 016.08 1.31 6.55 6.55 0 011.6 4.49 6.96 6.96 0 01-1.66 4.58 5.3 5.3 0 01-4.08 1.86 4.3 4.3 0 01-3.7-1.92l-.1 1.57-2.92.03zm6.15-2.52c.57 0 1.08-.16 1.56-.45.44-.32.8-.74 1.08-1.25.26-.51.38-1.12.38-1.8 0-.67-.12-1.28-.38-1.79a3.75 3.75 0 00-1.08-1.25 2.95 2.95 0 00-3.12 0c-.45.32-.8.74-1.09 1.25a4.01 4.01 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.98.45 1.56.45zm7.51 2.53V11.69h2.93l.1 1.57a3.96 3.96 0 013.54-1.89 4.1 4.1 0 013.82 2.44c.35.76.54 1.7.54 2.75v7.24h-3.19v-6.82c0-.84-.19-1.5-.57-1.99-.38-.48-.9-.74-1.56-.74-.48 0-.9.1-1.27.32-.35.23-.64.52-.86.93a2.7 2.7 0 00-.32 1.35v6.92h-3.16zm12.52 0V6.73h3.19v6.5a4.67 4.67 0 013.73-1.89 5.02 5.02 0 013.95 1.83 6.57 6.57 0 011.59 4.48 6.95 6.95 0 01-1.66 4.58 5.3 5.3 0 01-4.08 1.86 4.3 4.3 0 01-3.7-1.92l-.09 1.57-2.93.03zm6.18-2.53c.58 0 1.09-.16 1.56-.45.45-.32.8-.74 1.09-1.25.25-.51.38-1.12.38-1.8a3.42 3.42 0 00-1.47-3.04 2.95 2.95 0 00-3.12 0c-.44.32-.8.74-1.08 1.25a3.63 3.63 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.95.45 1.55.45z"></path>
                        </svg>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            {
                                isVisible ? isHighlight ? <ul className="navbar-nav ml-auto">
                                    {
                                        btnSelection.map((button, index) => {
                                            return (
                                                <li className={`nav-item ${button.select ? 'active' : ''}`} key={index} onClick={() => chooseOption(button)} style={{ color: 'black' }}>
                                                    <a className="nav-link " aria-current="page" href="#" style={{ color: 'black' }}>{button.name}</a>
                                                </li>
                                            )
                                        })}
                                    <li className="nav-item">
                                        <a className="nav-link ">Online Experiences</a>
                                    </li>
                                </ul> : <div className="navbar-nav input__value">
                                    <button onClick={() => showDetail()}>Start your research</button>
                                    <i class="fas fa-search"></i>
                                </div> : <ul className="navbar-nav ml-auto">
                                    {
                                        btnSelection.map((button, index) => {
                                            return (
                                                <li className={`nav-item ${button.select ? 'active' : ''}`} key={index} onClick={() => chooseOption(button)}>
                                                    <a className="nav-link " aria-current="page" href="#">{button.name}</a>
                                                </li>
                                            )
                                        })
                                    }
                                    <li className="nav-item">
                                        <a className="nav-link ">Online Experiences</a>
                                    </li>
                                </ul>
                            }
                            <form className="d-flex ml-auto navbar__right">
                                <a className="nav-link-host">Become a host</a>
                                <a>
                                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: "block", height: '16px', width: "16px", fill: "crimson", fontWeight: 'bold', marginLeft: '-13px' }}>
                                        <path d="m8.002.25a7.77 7.77 0 0 1 7.748 7.776 7.75 7.75 0 0 1 -7.521 7.72l-.246.004a7.75 7.75 0 0 1 -7.73-7.513l-.003-.245a7.75 7.75 0 0 1 7.752-7.742zm1.949 8.5h-3.903c.155 2.897 1.176 5.343 1.886 5.493l.068.007c.68-.002 1.72-2.365 1.932-5.23zm4.255 0h-2.752c-.091 1.96-.53 3.783-1.188 5.076a6.257 6.257 0 0 0 3.905-4.829zm-9.661 0h-2.75a6.257 6.257 0 0 0 3.934 5.075c-.615-1.208-1.036-2.875-1.162-4.686l-.022-.39zm1.188-6.576-.115.046a6.257 6.257 0 0 0 -3.823 5.03h2.75c.085-1.83.471-3.54 1.059-4.81zm2.262-.424c-.702.002-1.784 2.512-1.947 5.5h3.904c-.156-2.903-1.178-5.343-1.892-5.494l-.065-.007zm2.28.432.023.05c.643 1.288 1.069 3.084 1.157 5.018h2.748a6.275 6.275 0 0 0 -3.929-5.068z"></path>
                                    </svg>
                                </a>
                                <a>
                                    <div className="information">
                                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: "block", height: '27px', width: "27px", fill: "white", fontWeight: 'bold', marginTop: '0px', marginLeft: '-13px' }}>
                                            <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path>
                                        </svg>
                                    </div>
                                </a>
                            </form>
                        </div>
                    </div>
                </nav>
                <div className={`search`} style={{ display: `${toStay ? "block" : 'none'}` }}>
                    <div className="row">
                        <div className="point">
                            <div>
                                <h1>Location</h1>
                                <input placeholder="Where are you going?" onClick={() => dispatch(selectAction())} onKeyUp={onSearch} className="value__location" />
                            </div>
                        </div>
                        <div className="Calendar" onClick={() => {
                            dispatch(hideOverlay())
                        }}>
                            <h1>Check in</h1>
                            <DatePicker />
                            <h2>Check out</h2>
                        </div>
                        <div className="find">
                            <h1>Guests</h1>
                            <input placeholder="Add guests" onClick={() => displayQuantity()} value={totalPeople === '' ? '' : totalPeople + ' guests' + `${infants > 0 ? ' , ' + infants + ' infants' : ''}`} />
                            <div className="icon">
                                <NavLink to={`/${isPlace}/${id}/${totalPeople}/${moment(startDate).format("MMM D")}/${moment(endDate).format("MMM D")}`} onClick={() => solveTransition()}><i class="fas fa-search"></i>Search</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    experience && isLocation === false ? (
                        <div className="search__experience">
                            <div className="row">
                                <div className="point">
                                    <h1>Location</h1>
                                    <input placeholder="Where are you going?" onClick={() => setIsExperience(true)} className="near" />
                                </div>
                                <div className="find">
                                    <h1>Date</h1>
                                    <div className="icon">
                                        <i class="fas fa-search"></i>
                                        <a href="https://www.airbnb.com/s/experiences?tab_id=experience_tab&refinement_paths%5B%5D=%2Fexperiences&flexible_trip_dates%5B%5D=december&flexible_trip_dates%5B%5D=november&flexible_trip_lengths%5B%5D=weekend_trip&date_picker_type=calendar&location_search=NEARBY&checkin=2021-11-09&checkout=2021-11-10&source=structured_search_input_header&search_type=filter_change">Search</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : ""
                }
                {
                    isDisplay && isLocation === false ? (
                        <div>
                            <div className="overlay__flexible" onClick={() => {
                                dispatch(hideOverlay())
                            }}></div>
                            <div className="flexible">
                                <div className="goAny">
                                    <h1>GO ANYWHERE, ANYTIME</h1>
                                    <a href="https://www.airbnb.com/s/homes?refinement_paths%5B%5D=%2Fhomes&date_picker_type=flexible_dates&search_mode=flex_destinations_search&category_tag=Tag%3A8175&search_type=AUTOSUGGEST">I'm flexible</a>
                                    <video autoplay="" crossorigin="anonymous" playsinline="" poster="https://a0.muscache.com/pictures/04c0a34f-9880-48b7-a69c-49011f602a35.jpg" preload="auto" width="30" height="30">
                                        <source src="https://a0.muscache.com/videos/vopt/13/e1/13e14ffc-822c-5e84-aa58-d6a6527dc218/13e14ffc822c5e84aa58d6a6527dc218.mp4?impolicy=low_quality" type="video/mp4" />
                                    </video>
                                </div>
                            </div>
                        </div>
                    ) : ''
                }
                {
                    isLocation && isDisplay !== false ? (
                        <div className="location">
                            <div className="location__content">
                                {
                                    location?.map((item, index) => {
                                        return (
                                            <div className="row" key={index} onClick={() => {
                                                setLocation(false)
                                                dispatch(hideOverlay())
                                                changeValue(item)
                                            }}>
                                                <div className="col-2">
                                                    <i class="fas fa-map-marker-alt"></i>
                                                </div>
                                                <div className="col-10">
                                                    <h1>{item.province}</h1>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    ) : ''
                }
                {
                    isQuantity ? (
                        <div>
                            <div className="overlay__people" onClick={() => setIsQuantity(false)} ></div>
                            <div className="people">
                                <div className="people__content">
                                    {
                                        quantityPeople?.map((item, index) => {
                                            return (
                                                <div>
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="people__header">
                                                                <div>
                                                                    <h1>{item.type}</h1>
                                                                    <p>{item.description}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="people__icon">
                                                                <span>
                                                                    <button className={`${item.quantity <= 0 ? 'active' : ''}`} onClick={() => dispatch(plusAdult(item, false))}>
                                                                        <i class="fas fa-minus"></i>
                                                                    </button>
                                                                    <span style={{ padding: '0 12px', fontSize: '17px' }}>{item.quantity}</span>
                                                                    <button onClick={() => dispatch(plusAdult(item, true))}> <i class="fas fa-plus"></i></button>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {index < 2 ? <hr></hr> : ''}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    ) : ''
                }
                {
                    isExperience && isVisible === false ? (
                        <div>
                            <div className="nearBy__overlay" onClick={() => setIsExperience(false)}></div>
                            <div className="nearBy">
                                <div className="nearBy_content" onClick={() => nearBy()}>
                                    <div className="row">
                                        <div className="col-2">
                                            <img src="https://a0.muscache.com/im/pictures/fc42dde0-36a7-460e-af89-10b5e44e48d8.jpg?im_w=240&im_q=lowq"></img>
                                        </div>
                                        <div className="col-10">
                                            <h1>NearBy</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : ''
                }
            </div>
        </div>
    )
}
