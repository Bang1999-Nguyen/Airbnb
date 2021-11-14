import React, { useState, } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Switch, } from 'antd';
import { useFormik } from 'formik';
import './Room.scss'
import locationApi from '../../../../apis/airbnb';
import { actFetchDetail } from '../../../PageDetail/module/action';
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
export default function Room({ create, closeCreate, id }) {
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    }
    const wave = () => toast.success('Create a new room  successfully👋', { position: toast.POSITION.TOP_RIGHT, autoClose: 2500 })
    const dispatch = useDispatch()
    const { token } = useSelector(state => state.authReducer)
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: '',
            guests: '',
            bedRoom: '',
            bath: '',
            description: '',
            price: '',
            elevator: false,
            indoorFireplace: false,
            dryer: false,
            gym: false,
            kitchen: false,
            wifi: false,
            heating: false,
            cableTV: false,
            locationId: id
        },
        onSubmit: (values) => {
           locationApi.createRoom(values, token).then(response =>{
            dispatch(actFetchDetail(id))
            setTimeout(() => {
                closeCreate()
            }, 1500);
            wave()
           }).catch(err =>{
               console.log(err);
           })
        }
    })
    const handleSwitch = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }
    const [componentSize, setComponentSize] = useState('default');
    return (
        <div className="evaluation__createProfileAdmin" style={{
            opacity: create ? '1' : '0',
            transform: create ? 'translateY(13%)' : 'translateY(-150vh)'
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
                <div className="createRoomAdmin">
                    <Input name="name" placeholder="Name" onChange={formik.handleChange}/>
                </div>
                <div className="queueAdmin">
                    <Input name="guests" placeholder="Guests" onChange={formik.handleChange} />
                    <Input name="bedRoom" placeholder="BedRoom" onChange={formik.handleChange}/>
                    <Input name="bath" placeholder="Bath" onChange={formik.handleChange}/>
                </div>
                <div className="createRoomAdmin">
                    <Input name="description" placeholder="Description" onChange={formik.handleChange}/>
                </div>
                <div className="createRoomAdmin">
                    <Input name="price" placeholder="Price" onChange={formik.handleChange}/>
                </div>
                <div className="condition-admin">
                    <div className="item-condition">
                        <p>Elevator</p>
                        <Switch onChange={handleSwitch('elevator')} name="elevator" />
                    </div>
                    <div className="item-condition">
                        <p>HotTub</p>
                        <Switch onChange={handleSwitch('hotTub')} name="hotTub" />
                    </div>
                    <div className="item-condition">
                        <p>Pool</p>
                        <Switch onChange={handleSwitch('pool')} name="pool" />
                    </div>
                    <div className="item-condition">
                        <p>Dryer</p>
                        <Switch onChange={handleSwitch('dryer')} name="dryer" />
                    </div>
                </div>
                <div className="condition-admin">
                    <div className="item-condition">
                        <p>IndoorFireplace</p>
                        <Switch onChange={handleSwitch('indoorFireplace')} name="indoorFireplace" />
                    </div>
                    <div className="item-condition">
                        <p>Gym</p>
                        <Switch onChange={handleSwitch('gym')} name="gym" />
                    </div>
                    <div className="item-condition">
                        <p>Kitchen</p>
                        <Switch onChange={handleSwitch('kitchen')} name="kitchen" />
                    </div>
                    <div className="item-condition">
                        <p>Wifi</p>
                        <Switch onChange={handleSwitch('wifi')} name="wifi" />
                    </div>
                </div>
                <div className="condition-admin">
                    <div className="item-condition">
                        <p>Heating</p>
                        <Switch onChange={handleSwitch('iheating')} name="heating" />
                    </div>
                    <div className="item-condition">
                        <p>CableTV</p>
                        <Switch onChange={handleSwitch('cableTV')} name="cableTV" />
                    </div>
                </div>
                <button className="rateIs" type="submit" key="submit">Change</button>
            </Form>
            <div className="modal-close" onClick={closeCreate}>
                <svg width="16px" height="16px" viewBox="0 0 16 16" className="icon-close w-1half h-1half absolute pinX-50 pinY-50 translate-50-ul close_icon"><g stroke="none" stroke-width="1" fill="white" fill-rule="evenodd" stroke-linecap="square"><g transform="translate(-1328.000000, -34.000000)" stroke="currentColor"><g transform="translate(1328.000000, 34.000000)"><path d="M1,1 L15,15" id="Line-3"></path> <path d="M1,1 L15,15" id="Line-3" transform="translate(8.000000, 8.000000) scale(-1, 1) rotate(-1.000000) translate(-8.000000, -8.000000) "></path></g></g></g></svg>
            </div>
        </div>
    )
}
