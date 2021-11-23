import React, { useState } from 'react'
import locationApi from '../../apis/airbnb';
import { useDispatch } from 'react-redux';
import "./Modal.scss"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
import { actLogin } from './module/action';
import SignUp from '../Sign Up/SignUp';
toast.configure({
    toastClassName: css({
        fontSize: '18px !important',
        backgroundColor: 'red!important',
        padding: '18px !important'
    }),
});
export default function Modal({ closeModalHandler, show, btn }) {
    const wave = () => toast('Signed in successfully👋', { position: toast.POSITION.TOP_RIGHT, autoClose: 2500 })
    const waveFail = () => toast.error('Incorrect Password or Email', {
        position: toast.POSITION.TOP_CENTER, autoClose: 2500, backgroundColor: '#8329C5',
        color: '#ffffff'
    })
   

    const [register, setRegister] = useState(true)
    const [back, setBack] = useState(false)
    const handleSignUp = () => {
        setRegister(true)
    }
    const dispatch = useDispatch()
    const [user, setUser] = useState({});
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }
    const registerAction = () => {
        setRegister(false);
        setBack(true)
    }
    const backToSignIn = () => {
        setBack(false)
        setRegister(true);
    }
    const handleSubmit =  async() => {
       await locationApi.logIn(user).then(response => {
            wave()
            setTimeout(() => {
                closeModalHandler()
            }, 4000)
            dispatch(actLogin(response))
        })
            .catch(error => {
                waveFail()
            });
    }
    return (
        <div>
            {
                register ? (
                    <div className="signIn__wrap" style={{
                        opacity: show ? '1' : '0',
                        transform: show ? 'translateY(13%) rotate(0)' : 'translateY(-150vh) rotate(32deg)',
                    }}>
                        <div className="row">
                            <div className="col-5 " style={{ backgroundImage: 'url("https://s3.anotherescape.com/Journal/2020/Our-Story/_700x640_crop_center-center_none/AE-Portraits-1-2.jpg?mtime=20201130182020&focal=none&tmtime=20201130182042")' }}>
                            </div>
                            <div className="col-lg-7 col-sm-12 col-sx-12">
                                <div className="signIn__title" style={{width:'100%'}}>
                                    <h2>SI<span>G</span>N I<span>N</span></h2>
                                    <p>Welcome back! Log in to your account to view today's clients:</p>
                                    <div className="email">
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
                                        <div className="btn-signIn">
                                            <button onClick={() => handleSubmit()}>Log In</button>
                                        </div>
                                        <div className="signInNext">
                                            <p>Not a user?</p>
                                            <h2 onClick={() => registerAction()}>REGISTER</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            btn ? (
                                <div className="modal-close" onClick={closeModalHandler}>
                                    <svg width="16px" height="16px" viewBox="0 0 16 16" className="icon-close w-1half h-1half absolute pinX-50 pinY-50 translate-50-ul close_icon"><g stroke="none" stroke-width="1" fill="white" fill-rule="evenodd" stroke-linecap="square"><g transform="translate(-1328.000000, -34.000000)" stroke="currentColor"><g transform="translate(1328.000000, 34.000000)"><path d="M1,1 L15,15" id="Line-3"></path> <path d="M1,1 L15,15" id="Line-3" transform="translate(8.000000, 8.000000) scale(-1, 1) rotate(-1.000000) translate(-8.000000, -8.000000) "></path></g></g></g></svg>
                                </div>
                            ) : ''
                        }


                    </div>
                ) :

                    <SignUp register={register} handleSignUp={handleSignUp} closeModalHandler={closeModalHandler} back={back} backToSignIn={backToSignIn} btn={btn} />
            }
        </div>
    )
}