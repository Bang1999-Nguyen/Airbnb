import React from 'react'
import { useDispatch } from 'react-redux';
import { IS_BACK, IS_LOGOUT } from '../../containers/Home/Carousel/module/types';
import './LogOut.scss'
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
import { toast } from 'react-toastify';
toast.configure({
    toastClassName: css({
        fontSize: '18px !important',
        backgroundColor: 'red!important',
        padding: '18px !important'
    }),
});
export default function LogOut({logOut, closeLogOut, props, back, }) {
    const dispatch = useDispatch()
    const wave = () => toast('Log out successfully👋', { position: toast.POSITION.TOP_RIGHT, autoClose: 2500 })
    return (
        <div className="popup-inner" style={{
            transform: logOut ? 'translateY(0) rotate(0)' : 'translateY(-150vh) rotate(32deg)',
            opacity: logOut ? '1' : '0'
        }}>
            <div className="popup__photo">
                <img src="https://images.unsplash.com/photo-1515224526905-51c7d77c7bb8?ixlib=rb-0.3.5&s=9980646201037d28700d826b1bd096c4&auto=format&fit=crop&w=700&q=80" alt />
            </div>
            <div className="prop-text" style={{position:'relative'}}>
                <div className="text-content"  style={{ position:'absolute', top:'50%', left:'0%', transform:'translate(-0%, -50%)', margin:'0 auto', width:'100%'}}>
                <h1>Are you sure to log out ?</h1>
                <img src="https://cdn.dribbble.com/users/500242/screenshots/3830959/airbnb-dribbble1.gif"></img>
                <div className="btn-out">
                    <button className="btn-later" onClick={closeLogOut}>May be later</button>
                    <button onClick={() =>{
                        dispatch({
                            type:IS_LOGOUT,
                            payload:null
                        })
                        wave()
                        setTimeout(() =>{
                            closeLogOut()
                            
                        }, 3000)
                      back()
                     dispatch({
                         type:IS_BACK,
                         payload:null
                     })
                    }}>Yes, right now</button>
                </div>
                </div>
            </div>
            <a className="popup__close" href="#" onClick={closeLogOut}>X</a>
        </div>
    )
}
