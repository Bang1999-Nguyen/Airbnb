import React, { useState, useEffect } from 'react'
import "./Profile.scss"
import { useSelector, useDispatch } from 'react-redux';
import { actFetchInformation, actFetchTickets } from './module/action';
import { Form } from 'antd';
import { useFormik } from 'formik';
import locationApi from '../../apis/airbnb';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
import ChangeProfile from './ChangeProfile/ChangeProfile';
import Paginate from './Pagination';
import moment from 'moment'
import { CHANGE_SUCCESS } from '../../components/Modal/module/types';

toast.configure({
    toastClassName: css({
        fontSize: '18px !important',
        backgroundColor: 'red!important',
        padding: '18px !important'
    }),
});
export default function Profile(props) {
    const wave = () => toast.success('Update avatar  successfully👋', { position: toast.POSITION.TOP_RIGHT, autoClose: 2500 })
    const dispatch = useDispatch()
    const { token, currentUser } = useSelector(state => state.authReducer)
    const { Information } = useSelector(state => state.ProfileReducer)
    const [show, setShow] = useState(false)
    useEffect(() => {
        dispatch(actFetchTickets(currentUser?._id))
        dispatch(actFetchInformation(props.match.params.id))
    }, [show])
    const { tickets } = useSelector(state => state.ProfileReducer)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(6)
    // get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = tickets?.slice(indexOfFirstPost, indexOfLastPost)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    const nextPage = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    const prevPage = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    const formik = useFormik({
        initialValues: {
            avatar: {}
        },
        onSubmit: (values) => {
            let formData = new FormData();
            formData.append('avatar', values.avatar)
            locationApi.updateAvatar(formData, token).then(response => {
                wave()
                setTimeout(() => {
                    setShow(false)
                }, 3000);
                dispatch(actFetchInformation(props.match.params.id))
              dispatch({
                  type:CHANGE_SUCCESS,
                  payload: response
              })
            }).catch(err => {
                console.log(err);
            })
        }
    })
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    }
    const [componentSize, setComponentSize] = useState('default');
    const [imgSrc, setImgSrc] = useState(null)
    const [showModal,] = useState(false)
    const handleImage = (e) => {
        let file = e.target.files[0]
        if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/img') {
            // Reader
            let reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                setImgSrc(e.target.result)
            }
            formik.setFieldValue('avatar', file)
        }
    }
    return  (
        <div className="profile">
            <div className="profile-img" >
            </div>
            <div className="profile-content">
                <div className="profile-information">
                    <div className="image-profile">
                        <div className="image-infor">
                            <div className="circle-1" />
                            <div className="circle-2" />
                            <div className="img-profile" style={{ backgroundImage: `url(${Information?.avatar})`, width: '200px', height: '200px', borderRadius: '50%', backgroundPosition: 'center', backgroundSize: 'cover' }}></div>
                        </div>
                        <div>
                            <button className="edit" onClick={() => setShow(true)}>Change your avatar</button>
                        </div>
                    </div>
                </div>
                <div className="profile-detail">
                    <ChangeProfile id={props.match.params.id} />
                </div>
               
                <div className="text-custom">

                </div>
            </div>
            <div className="profile-custom">
                <ChangeProfile id={props.match.params.id} />
                </div>
            {showModal ? alert('1') : ''}
            <div className="tickets" >
                <h1 className="stroke_ticket">HISTORY BOOKING</h1>
                <div className="content-tickets">
                    <div className="row">
                        {
                            currentPosts?.map((ticket, index) => {
                                return (
                                    <div className="col-4-res" key={index}>
                                        <h1>{ticket.roomId?.name}</h1>
                                        <img src={`${ticket.roomId?.image}`} alt="" />
                                        <figcaption>
                                            <h3>
                                                More Info
                                            </h3>
                                            <p>CHECK-IN: {moment(`${ticket.checkIn}`).format('DD/MM/YYYY')} - CHECK-OUT: {moment(`${ticket.checkOut}`).format('DD/MM/YYYY')}</p>
                                            <p>{ticket.roomId?.price?.toLocaleString()} VNĐ / night</p>
                                            <button>
                                                More Info
                                            </button>
                                        </figcaption>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="pagination">
                        <div className="paginate">
                            <Paginate postsPerPage={postsPerPage} totalPosts={tickets?.length} style={{ marginTop: '30px' }} paginate={paginate} pageNumber={currentPage} nextPage={nextPage} prevPage={prevPage} />
                        </div>
                    </div>
                </div>
                <div className="text-align">

                </div>
            </div>
            {show ? <div className="back_drop"></div> : null}
            <div className="evaluation__wrapProfile" style={{
                opacity: show ? '1' : '0',
                transform: show ? 'translateY(13%)' : 'translateY(-150vh)'
            }}>
                <Form onSubmitCapture={formik.handleSubmit}
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    layout="horizontal"
                    initialValues={{
                        size: componentSize,
                    }}
                    onValuesChange={onFormLayoutChange}
                    size={componentSize}
                    className="form-Change"
                    style={{ marginTop: '50px' }}
                >
                    <div className="content-profileSed">
                        <p>Change your avatar if you want</p>
                        <div className="img-sed">
                            <input type="file" accept="image/img, image/jpeg, image/gif, image/png" onChange={handleImage} name="avatar"></input>
                            <div className="people-i" style={{ backgroundImage: `url(${imgSrc})`, width: '60px', height: '60px', borderRadius: '50%', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                            </div>
                        </div>
                    </div>
                    <button className="rateIs" type="submit" key="submit">Change</button>
                    <button className="later" onClick={() => setShow(false)}>May be later</button>
                </Form>
                <div className="modal-close" onClick={() => setShow(false)}>
                    <svg width="16px" height="16px" viewBox="0 0 16 16" className="icon-close w-1half h-1half absolute pinX-50 pinY-50 translate-50-ul close_icon"><g stroke="none" stroke-width="1" fill="white" fill-rule="evenodd" stroke-linecap="square"><g transform="translate(-1328.000000, -34.000000)" stroke="currentColor"><g transform="translate(1328.000000, 34.000000)"><path d="M1,1 L15,15" id="Line-3"></path> <path d="M1,1 L15,15" id="Line-3" transform="translate(8.000000, 8.000000) scale(-1, 1) rotate(-1.000000) translate(-8.000000, -8.000000) "></path></g></g></g></svg>
                </div>
            </div>
        </div >
    ) 
}
