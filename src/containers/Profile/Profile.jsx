import React, { useState, useEffect } from 'react'
import "./Profile.scss"
import { useSelector, useDispatch } from 'react-redux';
import { actFetchInformation } from './module/action';
import moment from "moment"
import { useFormik } from 'formik';
import locationApi from '../../apis/airbnb';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { css } from 'glamor';
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
    const { token } = useSelector(state => state.authReducer)
    const { Information } = useSelector(state => state.ProfileReducer)
    const [show, setShow] = useState(false)
    useEffect(() => {
        dispatch(actFetchInformation(props.match.params.id))
    }, [])
    const formik = useFormik({
        initialValues: {
            avatar: {}
        },
    })
    const [imgSrc, setImgSrc] = useState(null)
    const handleImage = (e) => {
        let formData = new FormData();
        let file = e.target.files[0]
        if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/img') {
            // Reader
            let reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                setImgSrc(e.target.result)
            }
            formik.setFieldValue('avatar', file)
            formData.append('avatar', file)
           

        }
        locationApi.updateAvatar(formData, token).then(response =>{
            wave()
            setTimeout(() => {
                setShow(false)
            }, 3000);
            dispatch(actFetchInformation(props.match.params.id))
        }).catch(err =>{
            console.log(err);
        })
       
    }
   
    return (
        <div className="profile">
            <div className="profile-img" >
            </div>
            <div className="profile-content">
                <div className="profile-information">
                    <div className="image-profile">
                        <div className="image-infor">
                            <div className="circle-1" />
                            <div className="circle-2" />
                            {/* <img src={`${Information?.avatar}`} width={120} height={120} alt="Jessica Potter" /> */}
                            <div className="img-profile" style={{backgroundImage:`url(${Information?.avatar})`, width:'120px', height:'120px', borderRadius:'50%', backgroundPosition:'center', backgroundSize:'cover'}}></div>
                        </div>
                        <div>
                            <button className="edit" onClick={() => setShow(true)}>Change your avatar</button>
                        </div>
                        <div>
                            <button className="editInfor">Edit your personal information</button>
                        </div>
                    </div>
                </div>
                <div className="profile-detail">
                    <div className="profile-view">
                        <div className="profile-name">
                            <i class="fas fa-file-signature"></i>
                            <h1>{Information?.name}</h1>
                        </div>
                        <div className="profile-name">
                            <i class="fas fa-mobile-alt"></i>
                            <h1>{Information?.phone}</h1>
                        </div>
                        <div className="profile-name">
                            <i class="far fa-envelope"></i>
                            <h1>{Information?.email}</h1>
                        </div>
                        <div className="profile-name">
                            <i class="fas fa-map-marker-alt"></i>
                            <h1>{Information?.address}</h1>
                        </div>
                        <div className="profile-name">
                            <i class="fas fa-birthday-cake"></i>
                            <h1>{moment(Information?.birthday).format('DD/MM/YYYY')}</h1>
                        </div>
                    </div>
                </div>
            </div>
            {show ? <div className="back_drop"></div> : null}
            <div className="evaluation__wrapProfile" style={{
                opacity: show ? '1' : '0',
                transform: show ? 'translateY(13%)' : 'translateY(-150vh)'
            }}>
              
                <div className="content-profile">
                    <p>Change your avatar if you want</p>
                    <input type="file" accept="image/img, image/jpeg, image/gif, image/png" onChange={handleImage} name="avatar"></input>
                    <img width={100} height={100} style={{ margin: '10px 0' }} style={{ borderRadius: '50%' }} src={imgSrc}></img>
                </div>
                <button className="rateIs" >Change</button>
                <button className="later" >May be later</button>
          
            <div className="modal-close" onClick={() => setShow(false)}>
                <svg width="16px" height="16px" viewBox="0 0 16 16" className="icon-close w-1half h-1half absolute pinX-50 pinY-50 translate-50-ul close_icon"><g stroke="none" stroke-width="1" fill="white" fill-rule="evenodd" stroke-linecap="square"><g transform="translate(-1328.000000, -34.000000)" stroke="currentColor"><g transform="translate(1328.000000, 34.000000)"><path d="M1,1 L15,15" id="Line-3"></path> <path d="M1,1 L15,15" id="Line-3" transform="translate(8.000000, 8.000000) scale(-1, 1) rotate(-1.000000) translate(-8.000000, -8.000000) "></path></g></g></g></svg>
            </div>
        </div>
        </div >
    )
}
