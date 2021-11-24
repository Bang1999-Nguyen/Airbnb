import React, { useState, useEffect } from 'react'
import Modal from '../../components/Modal/Modal'
import {  USER_LOGIN_AIRBNB } from '../../settings/apiConfig'
import { useSelector, useDispatch } from 'react-redux';
import './BookTicket.scss'
import moment from "moment"
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import { Rate } from 'antd';
import ContentLoader from 'react-content-loader'
import { actFetchComment, actFetchRoom } from './module/action';
import { getCurrentDate, getCurrentLocation, getGuest } from '../PageDetail/module/action';
import { isCalendar, plusAdult } from '../Home/Carousel/module/action';
import locationApi from '../../apis/airbnb';
import { NavLink } from 'react-router-dom'
import Comment from '../../components/Comment/Comment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slider from "react-slick";
import { css } from 'glamor';

toast.configure({
    toastClassName: css({
        fontSize: '18px !important',
        backgroundColor: 'red!important',
        padding: '18px !important'
    }),
});
export default function BookingTicket(props) {
    const wave = () => toast.success('Delete  successfully👋', { position: toast.POSITION.TOP_RIGHT, autoClose: 2500 })
    const { StartDate, EndDate, quantityPeople, totalPeopleDefault } = useSelector(state => state.CarouselReducer)
    const { comment } = useSelector(state => state.RoomReducer)
    const { token, currentUser, on } = useSelector(state => state.authReducer)
    const [startDate, setStartDate] = useState(StartDate);
    const [endDate, setEndDate] = useState(EndDate);
    const { DetailOfRoom, loading } = useSelector(state => state.RoomReducer)
    const [reserve, setReserve] = useState({
        roomId: props.match.params.id,
        checkIn: moment(props.match.params.startDate).format(),
        checkOut: moment(props.match.params.endDate).format(),
    })
  
    var durationEnd =  moment(EndDate).format('MM/DD/YYYY')
    var durationStart =  moment(StartDate).format('MM/DD/YYYY')
    var date1 = new Date(durationEnd);
    var date2 = new Date(durationStart);
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
          />
        );
      }
      function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
          />
        );
      }
    const settings = {
        className: "center",
        centerMode: true,
        dots: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            },
        ]
      };
    const [focusedInput, setFocusedInput] = useState(null);
    const handleDatesChange = ({ startDate, endDate }) => {
        setStartDate(startDate);
        setEndDate(endDate);
        setReserve(prevState => ({
            ...prevState,
            checkIn: moment(startDate).format(),
            checkOut: moment(endDate).format()
        }));
        
    dispatch(isCalendar(startDate, endDate))
    };
    let user = localStorage.getItem(USER_LOGIN_AIRBNB)
    const [modal, setModal] = useState(false);
    const fullPayment = () => {
        locationApi.reserveRoom(reserve, token).then(response => {
            setTimeout(() => {
                setModal(true)
            }, 1200)
        })
            .catch(error => {
                console.log(error);
            });
        

    }
    const [isQuantity, setIsQuantity] = useState(false)
    const updateComment = (id) => {
        locationApi.updateComment(id, {
            content: "Phòng quá thoải mái và đủ tiên nghi y"
        }, token).then(response => {
            wave()
            dispatch(actFetchComment(props.match.params.id))
        })
            .catch(error => {
                console.log(error);
            });
    }
    const [show, setShow] = useState(false)
    const closeModalHandler = () => setShow(false)
    const [btn] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actFetchRoom(props.match.params.id))
        dispatch(getCurrentLocation(props.match.params.location))
        dispatch(getGuest(props.match.params.guest))
        dispatch(getCurrentDate(props.match.params.startDate, props.match.params.endDate))
        dispatch(actFetchComment(props.match.params.id))
    }, [])
    const collect = () => {
        dispatch(actFetchComment(props.match.params.id))
    }
    const deleteComment = (id) => {
        locationApi.deleteComment(id, token).then(response => {
            wave()
            dispatch(actFetchComment(props.match.params.id))
        })
            .catch(error => {
                console.log(error);
            });
    }
    const [evaluation, setEvaluation] = useState(false)
    const showEvaluate = () => {
        setEvaluation(true)
    }
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(3)
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = comment?.slice(indexOfFirstPost, indexOfLastPost)
    const closeModalEvaluation = () => setEvaluation(false)
    if (loading) return <ContentLoader viewBox="0 0 380 70">
        <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
        <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
        <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
    </ContentLoader>
    return DetailOfRoom && (
        <div>
            <div>
                {!user && on === false ? <div className="back_drop"></div> : null}
                <Modal show={!user && on === false ? true : false} closeModalHandler={closeModalHandler} btn={btn} />
                <div className="modal-backdrop" style={{
                    opacity: modal ? '1' : '0',
                    transform: modal ? 'translateY(-0vh)' : 'translateY(-100vh)',
                    zIndex: `${modal ? '1' : '-1'}`
                }}>
                    <div className="modal-backdrop-wrapper">
                        <div className="result-reverse">
                            <h1 className="results">Booking tickets successfully!</h1>
                            <h1 className="thanks">THANK YOU FOR YOUR PURCHASE!</h1>
                            <div className="btn-changeTab">
                                <p onClick={() => setTimeout(() => {
                                    setModal(false)
                                }, 800)}><i class="fas fa-chevron-left"></i>Close</p>
                                <span>
                                    <NavLink to={`/profile/${currentUser._id}`} className="go_to" onClick={() => window.scrollTo(0,0)}>Go to your profile</NavLink>
                                    <i class="fas fa-chevron-right"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="modal-video">
                        <video autoPlay muted loop>
                            <source type="video/mp4" src="https://a0.muscache.com/v/a9/a7/a9a7873c-95de-5e37-8995-a5abb5b6b02f/a9a7873c95de5e378995a5abb5b6b02f_4000k_1.mp4" />
                        </video>
                    </div>
                </div>
                <div className="bookTicket">
                    <div className="room__detail">
                        <div className="room__content">
                            <div className="room__name"><i class="fas fa-map-marker-alt"></i>
                                <h2>{DetailOfRoom.name}</h2>
                            </div>
                            <div className="room_evaluation">
                                <div className="room_rate">
                                    <Rate allowHalf defaultValue={`${DetailOfRoom?.locationId?.valueate / 2}`} />
                                    <h2>288 reviews</h2>
                                </div>
                                <div className="room_reaction">
                                    <span><i class="far fa-heart"></i> Save</span>
                                </div>
                            </div>
                            <div className="room_image" style={{ backgroundImage: `url(${DetailOfRoom.image})` }}>
                            </div>
                            <div className="ticket">
                                <div className="row">
                                    <div className="col-7">
                                        <div className="room_num">
                                            <p>{DetailOfRoom?.guests} guests - </p>
                                            <p>{DetailOfRoom?.bedRoom} bedroom - </p>
                                            <p>{DetailOfRoom?.bath} bath</p>
                                        </div>
                                        <div className="room_condition">
                                            <div className="room_home">
                                                <div>
                                                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: "block", height: "33px", width: "33px", fill: "currentcolor" }}><path d="m17.9772237 1.90551573.1439807.13496509 13.2525 13.25240998-1.4142088 1.4142184-.9603513-.9603098.0008557 12.5832006c0 1.0543618-.8158778 1.9181651-1.8507377 1.9945143l-.1492623.0054857h-22c-1.0543618 0-1.91816512-.8158778-1.99451426-1.8507377l-.00548574-.1492623-.00085571-12.5822006-.95878858.9593098-1.41421142-1.414217 13.25247161-13.25243161c1.1247615-1.1246896 2.9202989-1.16967718 4.0986078-.13494486zm-2.5902053 1.46599297-.0942127.08318915-10.29366141 10.29310155.00085571 14.5822006h5.9991443l.0008557-9.9966c0-1.0543764.8158639-1.9181664 1.8507358-1.9945144l.1492642-.0054856h6c1.0543764 0 1.9181664.8158639 1.9945144 1.8507358l.0054856.1492642-.0008557 9.9966h6.0008557l-.0008557-14.5832006-10.2921737-10.29212525c-.3604413-.36046438-.9276436-.38819241-1.3199522-.08316545zm3.6129816 14.9618913h-6l-.0008557 9.9963994h6z"></path></svg>
                                                </div>
                                                <div>
                                                    <h3>Entire home</h3>
                                                    <p>You’ll have the loft to yourself.</p>
                                                </div>
                                            </div>
                                            <div className="room_home">
                                                <div>
                                                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: "block", height: "33px", width: "33px", fill: "currentcolor" }}><path d="M15.032 1.747c.263-1.004 1.692-.993 1.94.015.876 3.577 2.415 6.454 4.614 8.652 2.198 2.199 5.075 3.738 8.652 4.615 1.016.249 1.016 1.693 0 1.942-3.577.877-6.454 2.416-8.652 4.615-2.199 2.198-3.738 5.075-4.615 8.652-.249 1.016-1.693 1.016-1.942 0-.877-3.577-2.416-6.454-4.615-8.652-2.198-2.199-5.075-3.738-8.652-4.615-1.008-.247-1.019-1.676-.015-1.939 3.535-.923 6.394-2.487 8.597-4.69 2.202-2.202 3.765-5.06 4.688-8.595zm.945 3.518l-.133.325c-.88 2.085-2.025 3.914-3.438 5.484l-.33.357-.318.326c-1.6 1.6-3.5 2.893-5.693 3.88l-.475.206-.325.133.352.14c2.108.859 3.952 1.995 5.527 3.407l.358.33.326.319c1.603 1.602 2.887 3.515 3.854 5.732l.203.48.115.291.115-.292c.86-2.108 1.996-3.952 3.408-5.527l.33-.358.319-.326c1.602-1.603 3.515-2.887 5.732-3.854l.48-.203.292-.115-.293-.115c-2.421-.988-4.494-2.34-6.211-4.057-1.603-1.602-2.887-3.515-3.854-5.732l-.203-.48-.138-.351zm11.04-3.891c.13-.502.845-.497.969.007.176.718.48 1.287.913 1.72.433.433 1.002.737 1.72.913.508.125.508.847 0 .972-.718.176-1.287.48-1.72.913-.433.433-.737 1.002-.913 1.72-.125.508-.847.508-.972 0-.176-.718-.48-1.287-.913-1.72-.433-.433-1.002-.737-1.72-.913-.504-.124-.51-.839-.007-.97.71-.185 1.277-.496 1.712-.93.434-.435.745-1.002.93-1.712z"></path>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3>Enhanced Clean</h3>
                                                    <p>This Host committed to Airbnb's 5-step enhanced cleaning process.</p>
                                                </div>
                                            </div>
                                            <div className="room_home">
                                                <div>
                                                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: "block", height: "33px", width: "33px", fill: "currentcolor" }}><path d="m24.3334 1.66675c1.0543745 0 1.9181663.81587127 1.9945143 1.85073677l.0054857.14926323-.00065 24.666 3.00065.00075v2h-26.66665v-2l3-.00075v-24.666c0-1.05436681.81587301-1.91816558 1.850737-1.99451429l.149263-.00548571zm-4.00065 2h-12.666l-.00075 24.66625 12.66675-.00025zm4.00065 0h-2.00065v24.666l2.00025.00025zm-7.0001 11.00002c.7363778 0 1.33333.5969522 1.33333 1.33333s-.5969522 1.33333-1.33333 1.33333-1.33333-.5969522-1.33333-1.33333.5969522-1.33333 1.33333-1.33333z"></path>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3>Self check-in</h3>
                                                    <p>Check yourself in with the lockbox.</p>
                                                </div>
                                            </div>
                                            <div className="room_home">
                                                <div>
                                                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: "block", height: "33px", width: "33px", fill: "currentcolor" }}><path d="m11.6667 0-.00095 1.666h8.667l.00055-1.666h2l-.00055 1.666 6.00065.00063c1.0543745 0 1.9181663.81587127 1.9945143 1.85073677l.0054857.14926323v15.91907c0 .4715696-.1664445.9258658-.4669028 1.2844692l-.1188904.1298308-8.7476886 8.7476953c-.3334303.3332526-.7723097.5367561-1.2381975.5778649l-.1758207.0077398h-12.91915c-2.68874373 0-4.88181754-2.1223321-4.99538046-4.7831124l-.00461954-.2168876v-21.66668c0-1.05436021.81587582-1.91815587 1.85073739-1.99450431l.14926261-.00548569 5.999-.00063.00095-1.666zm16.66605 11.666h-24.666v13.6673c0 1.5976581 1.24893332 2.9036593 2.82372864 2.9949072l.17627136.0050928 10.999-.0003.00095-5.6664c0-2.6887355 2.122362-4.8818171 4.7832071-4.9953804l.2168929-.0046196 5.66595-.0006zm-.081 8-5.58495.0006c-1.5977285 0-2.9037573 1.2489454-2.9950071 2.8237299l-.0050929.1762701-.00095 5.5864zm-18.586-16-5.999.00062v5.99938h24.666l.00065-5.99938-6.00065-.00062.00055 1.66733h-2l-.00055-1.66733h-8.667l.00095 1.66733h-2z"></path>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3>Free cancellation before Dec 1</h3>
                                                </div>
                                            </div>
                                            <div className="condition_room">
                                                <h2>What this place offers</h2>
                                                <div className="row"  >
                                                    <div className="col-4-span" style={{ display: `${DetailOfRoom?.kitchen ? 'block' : 'none'}` }}>
                                                        <span> <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: "block", height: "28px", width: "28px", fill: "currentcolor", marginTop: '45px', marginRight: '20px' }}><path d="M26 1a5 5 0 0 1 5 5c0 6.389-1.592 13.187-4 14.693V31h-2V20.694c-2.364-1.478-3.942-8.062-3.998-14.349L21 6l.005-.217A5 5 0 0 1 26 1zm-9 0v18.118c2.317.557 4 3.01 4 5.882 0 3.27-2.183 6-5 6s-5-2.73-5-6c0-2.872 1.683-5.326 4-5.882V1zM2 1h1c4.47 0 6.934 6.365 6.999 18.505L10 21H3.999L4 31H2zm14 20c-1.602 0-3 1.748-3 4s1.398 4 3 4 3-1.748 3-4-1.398-4-3-4zM4 3.239V19h3.995l-.017-.964-.027-.949C7.673 9.157 6.235 4.623 4.224 3.364l-.12-.07zm19.005 2.585L23 6l.002.31c.045 4.321 1.031 9.133 1.999 11.39V3.17a3.002 3.002 0 0 0-1.996 2.654zm3.996-2.653v14.526C27.99 15.387 29 10.4 29 6a3.001 3.001 0 0 0-2-2.829z"></path></svg>Kitchen</span>
                                                    </div>
                                                    <div className="col-4-span" style={{ display: `${DetailOfRoom?.cableTV ? 'block' : 'none'}` }}>
                                                        <span> <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: "block", height: "28px", width: "28px", fill: "currentcolor", marginTop: '45px', marginRight: '20px' }}><path d="M9 29v-2h2v-2H6a5 5 0 0 1-4.995-4.783L1 20V8a5 5 0 0 1 4.783-4.995L6 3h20a5 5 0 0 1 4.995 4.783L31 8v12a5 5 0 0 1-4.783 4.995L26 25h-5v2h2v2zm10-4h-6v2h6zm7-20H6a3 3 0 0 0-2.995 2.824L3 8v12a3 3 0 0 0 2.824 2.995L6 23h20a3 3 0 0 0 2.995-2.824L29 20V8a3 3 0 0 0-2.824-2.995z"></path></svg>Cable TV</span>
                                                    </div>
                                                    <div className="col-4-span" style={{ display: `${DetailOfRoom?.wifi ? 'block' : 'none'}` }}>
                                                        <span> <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: "block", height: "28px", width: "28px", fill: "currentcolor", marginTop: '45px', marginRight: '20px' }}><path d="m15.9999 20.33323c2.0250459 0 3.66667 1.6416241 3.66667 3.66667s-1.6416241 3.66667-3.66667 3.66667-3.66667-1.6416241-3.66667-3.66667 1.6416241-3.66667 3.66667-3.66667zm0 2c-.9204764 0-1.66667.7461936-1.66667 1.66667s.7461936 1.66667 1.66667 1.66667 1.66667-.7461936 1.66667-1.66667-.7461936-1.66667-1.66667-1.66667zm.0001-7.33323c3.5168171 0 6.5625093 2.0171251 8.0432368 4.9575354l-1.5143264 1.5127043c-1.0142061-2.615688-3.5549814-4.4702397-6.5289104-4.4702397s-5.5147043 1.8545517-6.52891042 4.4702397l-1.51382132-1.5137072c1.48091492-2.939866 4.52631444-4.9565325 8.04273174-4.9565325zm.0001-5.3332c4.9804693 0 9.3676401 2.540213 11.9365919 6.3957185l-1.4470949 1.4473863c-2.1746764-3.5072732-6.0593053-5.8431048-10.489497-5.8431048s-8.31482064 2.3358316-10.48949703 5.8431048l-1.44709488-1.4473863c2.56895177-3.8555055 6.95612261-6.3957185 11.93659191-6.3957185zm-.0002-5.3336c6.4510616 0 12.1766693 3.10603731 15.7629187 7.9042075l-1.4304978 1.4309874c-3.2086497-4.44342277-8.4328305-7.3351949-14.3324209-7.3351949-5.8991465 0-11.12298511 2.89133703-14.33169668 7.334192l-1.43047422-1.4309849c3.58629751-4.79760153 9.31155768-7.9032071 15.7621709-7.9032071z"></path></svg>Wifi</span>
                                                    </div>
                                                    <div className="col-4-span" style={{ display: `${DetailOfRoom?.dryer ? 'block' : 'none'}` }}>
                                                        <span> <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: "block", height: "28px", width: "28px", fill: "currentcolor", marginTop: '45px', marginRight: '20px' }}><path d="M28 2a2 2 0 0 1 1.995 1.85L30 4v24a2 2 0 0 1-1.85 1.995L28 30H4a2 2 0 0 1-1.995-1.85L2 28V4a2 2 0 0 1 1.85-1.995L4 2zm0 2H4v24h24zM16 7a9 9 0 1 1 0 18 9 9 0 0 1 0-18zm0 2a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm-4.795 5.579a6.948 6.948 0 0 1 3.675 1.755l.462.444a8.968 8.968 0 0 0 4.614 2.28 5.017 5.017 0 0 1-2.01 1.55 10.978 10.978 0 0 1-4.255-2.644 4.962 4.962 0 0 0-2.656-1.388 5.001 5.001 0 0 1 .17-1.998zm3.08-3.277a10.96 10.96 0 0 1 3.649 2.419 4.974 4.974 0 0 0 2.995 1.436 4.99 4.99 0 0 1-.064 2.002 6.967 6.967 0 0 1-4.12-1.807l-.462-.445a8.955 8.955 0 0 0-4.07-2.17 5.002 5.002 0 0 1 2.072-1.435zM7 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path></svg>Dryer</span>
                                                    </div>
                                                    <div className="col-4-span" style={{ display: `${DetailOfRoom?.indoorFireplace ? 'block' : 'none'}` }}>
                                                        <span> <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: "block", height: "28px", width: "28px", fill: "currentcolor", marginTop: '45px', marginRight: '20px' }}><path d="M23 3a2 2 0 0 1 1.995 1.85L25 5v1.522l5-1.999v11.954l-5-2V16a2 2 0 0 1-1.85 1.995L23 18l-6.1.001a5.005 5.005 0 0 1-3.984 3.915 5.002 5.002 0 0 1-4.7 4.08L8 26H4v4H2V20h2v4h4a3.001 3.001 0 0 0 2.872-2.13A5.004 5.004 0 0 1 7.1 18.002L4 18a2 2 0 0 1-1.995-1.85L2 16V5a2 2 0 0 1 1.85-1.995L4 3zM12 14a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm11-9H4v11h3.1a5.002 5.002 0 0 1 9.8 0H23zm5 2.476l-3 1.2v3.647l3 1.2zM7 7a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path></svg>Camera</span>
                                                    </div>
                                                    <div className="col-4-span" style={{ display: `${DetailOfRoom?.hotTub ? 'block' : 'none'}` }}>
                                                        <span> <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: "block", height: "28px", width: "28px", fill: "currentcolor", marginTop: '45px', marginRight: '20px' }}><path d="M3 3v4h26V3h2v18a5.002 5.002 0 0 1-3.999 4.9L27 30h-2v-4H7v4H5v-4.1a5.002 5.002 0 0 1-3.995-4.683L1 21V3zm6 6H7v15h2zm4 0h-2v15h2zm4 0h-2v15h2zm4 0h-2v15h2zm4 0h-2v15h2zM5 9H3v12c0 1.306.835 2.418 2 2.83zm24 0h-2v14.829a3.002 3.002 0 0 0 1.995-2.653L29 21z"></path></svg>HotTub</span>
                                                    </div>

                                                </div>
                                                {/* tv */}

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 col-sm-12">
                                        <div className="payment">
                                            <div className="price">
                                                <div className="row">
                                                    <div className="col-6">
                                                        <p>{DetailOfRoom?.price?.toLocaleString()} VNĐ / night</p>
                                                    </div>
                                                    <div className="col-6">
                                                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: "block", height: "15px", width: "15px", fill: "#FF385C" }} className="star"><path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" fill-rule="evenodd"></path></svg>
                                                        <h4 style={{ fontSize: '15px' }}>4.93 (238 reviews)</h4>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="reserve">
                                                <DateRangePicker
                                                    startDate={startDate}
                                                    startDateId="tata-start-date"
                                                    endDate={endDate}
                                                    endDateId="tata-end-date"
                                                    onDatesChange={handleDatesChange}
                                                    focusedInput={focusedInput}
                                                    onFocusChange={focusedInput => setFocusedInput(focusedInput)}
                                                    width={900}
                                                    showClearDates={true}
                                                    displayFormat="DD/MM/YYYY"
                                                />
                                                <p className="checkIn">CHECK-IN</p>
                                                <p className="checkOut">CHECK-OUT</p>
                                                <div className="reserve_guest">
                                                    <div>
                                                        <p className="guest_room">GUEST</p>
                                                        <p>{totalPeopleDefault} guests</p>
                                                    </div>
                                                    <div onClick={() => setIsQuantity(true)}>
                                                        <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style={{ display: "block", height: "16px", width: "16px", fill: "black", marginRight: '15px', cursor: 'pointer' }}><path d="m16.29 4.3a1 1 0 1 1 1.41 1.42l-8 8a1 1 0 0 1 -1.41 0l-8-8a1 1 0 1 1 1.41-1.42l7.29 7.29z" fill-rule="evenodd"></path></svg>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                isQuantity ? (
                                                    <div className="btn-adult">
                                                        <div className="overlay__people" onClick={() => setIsQuantity(false)} ></div>
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
                                                        <button className="close-option" onClick={() => setIsQuantity(false)} >Close</button>
                                                    </div>
                                                ) : ''
                                            }

                                            <div className="btn-reserve">
                                                <button onClick={() => fullPayment()}>Reserve</button>
                                            </div>
                                            <div className="total-payment">
                                                <div className="payment_content">
                                                    <p>{DetailOfRoom?.price?.toLocaleString()}  x {Math.abs(Difference_In_Days)} nights</p>
                                                </div>
                                                <div className="money">
                                                    <p>{(DetailOfRoom?.price * Math.abs(Difference_In_Days)).toLocaleString()} VNĐ</p>
                                                </div>
                                            </div>
                                            <div className="total-payment">
                                                <div className="payment_content">
                                                    <p>Cleaning fee</p>
                                                </div>
                                                <div className="money">
                                                    <p>150,000 VNĐ</p>
                                                </div>
                                            </div>
                                            <div className="total-payment">
                                                <div className="payment_content">
                                                    <p>Service fee</p>
                                                </div>
                                                <div className="money">
                                                    <p>0 VNĐ</p>
                                                </div>
                                            </div>
                                            <hr></hr>
                                            <div className="total-payment">
                                                <div className="payment_content">
                                                    <h2 className="total_payment">Total</h2>
                                                </div>
                                                <div className="money">
                                                    <h3>{((DetailOfRoom?.price * props.match.params.guest) + 150000).toLocaleString()} VNĐ</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="comment">
                        <div className="comment-tit">
                            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: "block", height: "15px", width: "15px", fill: "#FF385C" }} className="star"><path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" fill-rule="evenodd"></path></svg>
                            <h1>{DetailOfRoom.locationId?.valueate} · {comment.length} reviews</h1>
                        </div>
                        <div className="comment-evaluate">
                            <div className="comment-item">
                                <div className="tit">
                                    <h3>Cleanliness</h3>
                                </div>
                                <div className="left">
                                    <div className="progress">
                                        <span className="_1wsvxly" style={{ width: '84%' }}></span>
                                    </div>
                                    <div>
                                        <span style={{ margin: '0 15px', fontSize: '16px' }}>4.3</span>
                                    </div>
                                </div>

                            </div>
                            <div className="comment-item">
                                <div className="tit">
                                    <h3>Accuracy</h3>
                                </div>
                                <div className="left">
                                    <div className="progress">
                                        <span className="_1wsvxly" style={{ width: '86%' }}></span>
                                    </div>
                                    <div>
                                        <span style={{ margin: '0 15px', fontSize: '16px' }}>4.5</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="comment-evaluate">
                            <div className="comment-item">
                                <div className="tit">
                                    <h3>Communication</h3>
                                </div>
                                <div className="left">
                                    <div className="progress">
                                        <span className="_1wsvxly" style={{ width: '86%' }}></span>
                                    </div>
                                    <div>
                                        <span style={{ margin: '0 15px', fontSize: '16px' }}>4.7</span>
                                    </div>
                                </div>
                            </div>
                            <div className="comment-item">
                                <div className="tit">
                                    <h3>Location</h3>
                                </div>
                                <div className="left">
                                    <div className="progress">
                                        <span className="_1wsvxly" style={{ width: '89%' }}></span>
                                    </div>
                                    <div>
                                        <span style={{ margin: '0 15px', fontSize: '16px' }}>4.8</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="comment-evaluate">
                            <div className="comment-item">
                                <div className="tit">
                                    <h3>Check-in</h3>
                                </div>
                                <div className="left">
                                    <div className="progress">
                                        <span className="_1wsvxly" style={{ width: '86%' }}></span>
                                    </div>
                                    <div>
                                        <span style={{ margin: '0 15px', fontSize: '16px' }}>4.6</span>
                                    </div>
                                </div>
                            </div>
                            <div className="comment-item">
                                <div className="tit">
                                    <h3>Value</h3>
                                </div>
                                <div className="left">
                                    <div className="progress">
                                        <span className="_1wsvxly" style={{ width: '84%' }}></span>
                                    </div>
                                    <div>
                                        <span style={{ margin: '0 15px', fontSize: '16px' }}>4.6</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="comment-value">
                            <div  >
                               
                            </div>
                        </div> */}
                    </div>
                    <div className="comment-condition">
                        <h1>Leaving comments if yow want</h1>
                        <blockquote before="“" lang="en" className="h4 md-h2 center before-content before-green-light " style={{ fontStyle: 'italic' }}><p style={{ fontWeight: '400',  width: '75%', margin: '0 auto', lineHeight: '20px' }} className="text-impressive"> <svg width="45" height={55} className="mb-5 fill-current text-fuchsia-100 " style={{ fill: 'crimson', marginRight: '50px', }}><path d="M13.415.001C6.07 5.185.887 13.681.887 23.041c0 7.632 4.608 12.096 9.936 12.096 5.04 0 8.784-4.032 8.784-8.784 0-4.752-3.312-8.208-7.632-8.208-.864 0-2.016.144-2.304.288.72-4.896 5.328-10.656 9.936-13.536L13.415.001zm24.768 0c-7.2 5.184-12.384 13.68-12.384 23.04 0 7.632 4.608 12.096 9.936 12.096 4.896 0 8.784-4.032 8.784-8.784 0-4.752-3.456-8.208-7.776-8.208-.864 0-1.872.144-2.16.288.72-4.896 5.184-10.656 9.792-13.536L38.183.001z"></path></svg> Absolutely in love with how easy and effective evaluation with <a href="https://twitter.com/surge_sh">your comments</a>&nbsp;is.</p><footer className="md-col-4 mx-auto left-align"><a href="https://twitter.com/fox/status/597723128488398848" className="media color-inherit"><p className="media-body h6 black muted"></p></a></footer></blockquote>
                        {
                            comment.length > 3 ? (
                                <Slider {...settings}>
                           {
                              comment?.map((item, index) =>{
                                   return (
                                       <div className="col-6-res" key={index} >
                                           <div className="people-evaluation">
                                               <div className="people-i" style={{ backgroundImage: `url(${item.userId.avatar})`, width: '80px', height: '80px', borderRadius: '10px', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                                                 
                                               </div>
                                               <div className="address">
                                                   <h2>- {item.userId.name}</h2>
                                                   <p>{moment(item.userId.created_at).format('DD/MM/YYYY')}</p>
                                               </div>
                                           </div>
                                           <div className="descr">
                                               <p>{item.content}</p>
                                               <span><i class="fas fa-heart"></i>Like</span>
                                               <span style={{ marginLeft: '40px' }} onClick={() => deleteComment(item._id)}><i class="fas fa-trash-alt"></i>Delete</span>
                                               <span style={{ marginLeft: '40px' }} onClick={() => updateComment(item._id)}><i class="fas fa-trash-alt"></i>Update</span>
                                           </div>
                                       </div>
                                   )
                               })
                           } 
                            </Slider> 
                            ):   <div className="slider-show slider-show-add">
                            <div className="row">
                                 {
                              comment?.map((item, index) =>{
                                   return (
                                       <div className="col-6-res item-show" key={index} >
                                           <div className="people-evaluation">
                                               <div className="people-i" style={{ backgroundImage: `url(${item.userId.avatar})`, width: '80px', height: '80px', borderRadius: '10px', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                                                 
                                               </div>
                                               <div className="address">
                                                   <h2>- {item.userId.name}</h2>
                                                   <p>{moment(item.userId.created_at).format('DD/MM/YYYY')}</p>
                                               </div>
                                           </div>
                                           <div className="descr">
                                               <p>{item.content}</p>
                                               <span><i class="fas fa-heart"></i>Like</span>
                                               <span style={{ marginLeft: '40px' }} onClick={() => deleteComment(item._id)}><i class="fas fa-trash-alt"></i>Delete</span>
                                               <span style={{ marginLeft: '40px' }} onClick={() => updateComment(item._id)}><i class="fas fa-trash-alt"></i>Update</span>
                                           </div>
                                       </div>
                                   )
                               })
                           } 
                            </div>
                            </div>
                        } 
                    </div>
                    <div className="btn-add">
                        <button onClick={() => showEvaluate()}>LEAVE A COMMENT</button>
                    </div>
                    {evaluation ? <div className="back_drop"></div> : null}
                    <Comment show={evaluation} closeModalHandler={closeModalEvaluation} btn={btn} id={props.match.params.id} collect={collect} />
                   
                </div>
            </div>
        </div>
    )
}
