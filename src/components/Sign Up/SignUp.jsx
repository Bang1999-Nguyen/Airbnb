import React, { useState } from 'react'
import "./SignUp.scss"
import { Checkbox } from 'antd';
import {
    DatePicker,
} from 'antd';
import moment from "moment"
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
export default function SignUp({ register, handleSignUp, back, backToSignIn, closeModalHandler, btn}) {
    const wave = () => toast('Signed up successfully👋', { position: toast.POSITION.TOP_RIGHT, autoClose: 2500 })
    const waveFail = () => toast.error('Account is exist! Retry', {
        position: toast.POSITION.TOP_CENTER, autoClose: 2500, backgroundColor: '#8329C5',
        color: '#ffffff'
    })
    function onChange(checkedValues) {
        if (checkedValues[0] === 'Male') {
            setAccount(prevState => ({
                ...prevState,
                gender: true,
            }));
        } else {
            setAccount(prevState => ({
                ...prevState,
                gender: false,
            }));
        }
    }
    const [account, setAccount] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        birthday: "",
        gender: true,
        address: ""
    })
    const closeAll = () =>{
        if(back) {
        closeModalHandler();
    }
            handleSignUp()
    }
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setAccount(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }
    const options = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
    ];
    const handleChangeDate = (values) => {
        let Birthday = moment(values).format('YYYY/MM/DD')
        setAccount(prevState => ({
            ...prevState,
            birthday: Birthday,
        }));
    }
    const signUpAction = async () => {
        await locationApi.register(account).then(response => {
            wave()
            setTimeout(() => {
                handleSignUp()
            }, 4000)
        })
            .catch(error => {
                waveFail()
            });
    }
    return (
        <div>
            <div className="register" style={{
                opacity: register ? '0' : '1',
                // transform: register ? "translateY(-150vh)" : 'translateY(10%)'
                transform:  register ? 'translateY(-150vh) rotate(32deg)' : 'translateY(10%) rotate(0)',
            }}>
                <div className="row">
                    <div className="col-5" style={{ backgroundImage: 'url("https://s3.anotherescape.com/_390xAUTO_crop_center-center_none/PB280982-small-1.jpg?mtime=20200407213215&focal=none&tmtime=20200407213449")' }}>
                    </div>
                    <div className="col-7">
                        <div className="signUp__title">
                            <h2>SI<span>G</span>N U<span>P</span></h2>
                            <p>Welcome to airbnb! Sign up to your account to view today's clients:</p>
                            <div className="email_signUp">
                                <div className="row">
                                    <div className="col-1">
                                        <i class="fas fa-file-signature"></i>
                                    </div>
                                    <div className="col-11">
                                        <input placeholder="Name" type="text" name="name" id="name" onChange={handleOnChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-1">
                                        <i class="far fa-envelope"></i>
                                    </div>
                                    <div className="col-11">
                                        <input placeholder="Email" type="email" name="email" id="email" onChange={handleOnChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-1">
                                        <i class="fas fa-key"></i>
                                    </div>
                                    <div className="col-11">
                                        <input placeholder="Password" type="text" name="password" id="password" onChange={handleOnChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <i class="fas fa-phone-square-alt"></i>
                                        <input placeholder="Phone" type="text" name="phone" id="phone" onChange={handleOnChange} />
                                    </div>
                                    <div className="col-6">
                                        <i class="fas fa-calendar"></i>
                                        <DatePicker format={"DD/MM/YYYY"} placeholder='Birthday' onChange={handleChangeDate} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-1">
                                        <i class="fas fa-genderless"></i>
                                    </div>
                                    <div className="col-11 checkbox">
                                        <Checkbox.Group options={options} onChange={onChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-1">
                                        <i class="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div className="col-11">
                                        <input placeholder="Address" type="text" name="address" id="address" onChange={handleOnChange} />
                                    </div>
                                </div>
                                <div className="row btn_register">
                                    <button onClick={() => signUpAction()} className="btn-register">Sign up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    btn ? (
                        <div className="modal-close" onClick={() => closeAll()}>
                        <svg width="16px" height="16px" viewBox="0 0 16 16" className="icon-close w-1half h-1half absolute pinX-50 pinY-50 translate-50-ul close_icon"><g stroke="none" stroke-width="1" fill="white" fill-rule="evenodd" stroke-linecap="square"><g transform="translate(-1328.000000, -34.000000)" stroke="currentColor"><g transform="translate(1328.000000, 34.000000)"><path d="M1,1 L15,15" id="Line-3"></path> <path d="M1,1 L15,15" id="Line-3" transform="translate(8.000000, 8.000000) scale(-1, 1) rotate(-1.000000) translate(-8.000000, -8.000000) "></path></g></g></g></svg>
                    </div>
                    ) : ''
                }
               
                <div className="btn-back" onClick={backToSignIn}>
                    {back ? <div className="link__back"> <i class="fas fa-angle-double-left"></i> <h2>Back</h2></div> : ''}
                </div>
            </div>
        </div>
    )
}
