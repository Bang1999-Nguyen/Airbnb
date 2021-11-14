import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import locationApi from '../../../../apis/airbnb';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
import { Checkbox, Form, Input } from 'antd';
import {
    DatePicker,
} from 'antd';
import moment from "moment"
import { actFetchUserAdmin } from '../module/action';
toast.configure({
    toastClassName: css({
        fontSize: '18px !important',
        backgroundColor: 'red!important',
        padding: '18px !important'
    }),
});
export default function EditUser({ change, closeChange, id }) {
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    }
    const dispatch = useDispatch()
    const [componentSize, setComponentSize] = useState('default');
    const { token } = useSelector(state => state.authReducer)
    const wave = () => toast.success('Update personal information  successfully👋', { position: toast.POSITION.TOP_RIGHT, autoClose: 2500 })
    const options = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
    ];
    function onChange(checkedValues) {
        if (checkedValues[0] === 'Male') {
            formik.setFieldValue('gender', true)
        } else{
            formik.setFieldValue('gender', false)
        }
    }
    const handleChangeDate = (values) => {
        formik.setFieldValue('birthday', moment(values).format())
      
    }
    const { Information } = useSelector(state => state.ProfileReducer)
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: Information?.name,
           email:Information?.email,
           phone:Information?.phone,
           birthday:Information?.birthday,
           gender:Information?.gender,
           address:Information?.address,
           type:Information?.type
        },
        onSubmit: (values) => {
            locationApi.updateUser(id, values, token).then(response =>{
                wave()
                dispatch(actFetchUserAdmin())
                setTimeout(() =>{
                    closeChange()
                }, 1500)
             }).catch(err =>{
                 console.log(err);
             })
        }
    })
    return (
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
            <div className="register-admin" style={{
                opacity: change ? '1' : '0',
                transform: change ? "translateY(10%)" : 'translateY(-150vh)'
            }}>
                <div className="row">
                    <div className="col-12">
                        <div className="signUp__title">
                            <div className="email_signUp">
                                <div className="row">
                                    <div className="col-1">
                                        <i class="fas fa-file-signature"></i>
                                    </div>
                                    <div className="col-11">
                                        <Input placeholder="Name" type="text" name="name" id="name" value={formik.values.name} onChange={formik.handleChange}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-1">
                                        <i class="far fa-envelope"></i>
                                    </div>
                                    <div className="col-11">
                                        <Input placeholder="Email" type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <i class="fas fa-phone-square-alt"></i>
                                        <Input placeholder="Phone" type="text" name="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange}/>
                                    </div>
                                    <div className="col-6">
                                        <i class="fas fa-calendar"></i>
                                        <DatePicker format={"DD/MM/YYYY"} placeholder='Birthday' value={moment(formik.values.birthday)} onChange={handleChangeDate}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-1">
                                        <i class="fas fa-genderless"></i>
                                    </div>
                                    <div className="col-11 checkbox">
                                        <Checkbox.Group options={options} value={[`${formik.values.gender ? "Male" : "Female"}`]} onChange={onChange}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-1">
                                        <i class="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div className="col-11">
                                        <input placeholder="Address" type="text" name="address" id="address" value={formik.values.address} onChange={formik.handleChange}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-1">
                                        <i class="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div className="col-11">
                                        <input placeholder="Type" type="text" name="type" id="type" value={formik.values.type} onChange={formik.handleChange}/>
                                    </div>
                                </div>
                                <div className="row btn_register">
                                    <button className="btn-register" >Update your personal information</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-close" onClick={() => closeChange()}>
                    <svg width="16px" height="16px" viewBox="0 0 16 16" className="icon-close w-1half h-1half absolute pinX-50 pinY-50 translate-50-ul close_icon"><g stroke="none" stroke-width="1" fill="white" fill-rule="evenodd" stroke-linecap="square"><g transform="translate(-1328.000000, -34.000000)" stroke="currentColor"><g transform="translate(1328.000000, 34.000000)"><path d="M1,1 L15,15" id="Line-3"></path> <path d="M1,1 L15,15" id="Line-3" transform="translate(8.000000, 8.000000) scale(-1, 1) rotate(-1.000000) translate(-8.000000, -8.000000) "></path></g></g></g></svg>
                </div>
            </div>
        </Form>
    )
}

