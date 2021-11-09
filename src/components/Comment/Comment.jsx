import React, { useState } from 'react'
import locationApi from '../../apis/airbnb';
import './Comment.scss'
import { useSelector} from 'react-redux';
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
export default function Comment({ closeModalHandler, show, id, collect}) {
    const wave = () => toast('Commented successfully👋', { position: toast.POSITION.TOP_RIGHT, autoClose: 2500 })
    const [state, setState] = useState({
       content: "",
    })
  
    const { token } = useSelector(state => state.authReducer)
    const onChangeValue = (e) =>{
        const {name, value } = e.target;
        setState(prevState => ({
            ...prevState,
           [name]: value
        }));
    }
   const createComment = () =>{
   
       locationApi.createComment(id, state, token).then(response =>{
           wave()
           setTimeout(() => {
            closeModalHandler()
        }, 4000)
        
       }).catch(err =>{
           console.log(err);
       })
       setTimeout(() => {
        collect()
    }, 6000)
   }
    return (
        <div className="evaluation__wrap" style={{
            opacity: show ? '1' : '0',
            transform: show ? 'translateY(13%)' : 'translateY(-150vh)'
        }}>
            <div className="content-eva">
                <p>Leave a message, if you want</p>
                <input placeholder="What do you think?" onChange={onChangeValue} name="content"></input>
            </div>
            <button className="rateIs" onClick={() => createComment()}>Rate now</button>
            <button className="later" onClick={() => setTimeout(() => {
                closeModalHandler()
            }, 900)}>May be later</button>
            <div className="modal-close" onClick={() => setTimeout(() => {
                closeModalHandler()
            }, 900)}>
                <svg width="16px" height="16px" viewBox="0 0 16 16" className="icon-close w-1half h-1half absolute pinX-50 pinY-50 translate-50-ul close_icon"><g stroke="none" stroke-width="1" fill="white" fill-rule="evenodd" stroke-linecap="square"><g transform="translate(-1328.000000, -34.000000)" stroke="currentColor"><g transform="translate(1328.000000, 34.000000)"><path d="M1,1 L15,15" id="Line-3"></path> <path d="M1,1 L15,15" id="Line-3" transform="translate(8.000000, 8.000000) scale(-1, 1) rotate(-1.000000) translate(-8.000000, -8.000000) "></path></g></g></g></svg>
            </div>
        </div>
    )
}
