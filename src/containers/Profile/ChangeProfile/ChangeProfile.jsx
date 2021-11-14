import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { actFetchInformation } from '../module/action';
import './ChangeProfile.scss'
import moment from "moment"
import { useFormik } from 'formik';
import { Checkbox } from 'antd';
import {
    Form,
    DatePicker,
    Input,
} from 'antd';
import locationApi from '../../../apis/airbnb';
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
export default function ChangeProfile({ id }) {
    const wave = () => toast.success('Update personal information  successfully👋', { position: toast.POSITION.TOP_RIGHT, autoClose: 2500 })
    const dispatch = useDispatch()
    const [componentSize, setComponentSize] = useState('default');
    const { Information } = useSelector(state => state.ProfileReducer)
    const { token } = useSelector(state => state.authReducer)
    useEffect(() => {
        dispatch(actFetchInformation(id))
    }, [])
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: Information?.name,
            email: Information?.email,
            phone: Information?.phone,
            birthday: Information?.birthday,
            gender: Information?.gender,
            address: Information?.address,
            type: Information?.type,
        },
        onSubmit: (values) => {
            locationApi.updateUser(id, values, token).then(response =>{
               wave()
               dispatch(actFetchInformation(id))
            }).catch(err =>{
                console.log(err);
            })
        }
    })
    
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
    
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    }
    return (
        <div>
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
                <div className="profile-name">
                    <i class="fas fa-file-signature"></i>
                    <Input name='name' placeholder='Your name' className="name" value={formik.values.name} onChange={formik.handleChange} />
                </div>
                <div className="profile-name">
                    <i class="far fa-envelope"></i>
                    <Input name='email' placeholder='Your email' className="name" value={formik.values.email} onChange={formik.handleChange} />
                </div>
                <div className="profile-name">
                    <i class="fas fa-mobile-alt"></i>
                    <Input name='phone' placeholder='Your phone' className="name" value={formik.values.phone} onChange={formik.handleChange} />
                </div>
                <div className="profile-name">
                    <i class="fas fa-birthday-cake"></i>
                    <DatePicker format="DD/MM/YYYY" placeholder='Your birthday' style={{ marginLeft: '20px', border: 'none' }} value={moment(formik.values.birthday)} onChange={handleChangeDate}/>
                </div>
                <div className="profile-name">
                <i class="fas fa-genderless"></i>
                    <Checkbox.Group options={options} style={{marginTop:'20px', marginLeft:'-250px', fontSize:'16px'}} onChange={onChange} value={[`${formik.values.gender ? "Male" : "Female"}`]}/>
                </div>
                <div className="profile-name">
                    <i class="fas fa-map-marker-alt"></i>
                    <Input name='address' placeholder='Your address' className="name" value={formik.values.address} onChange={formik.handleChange} />
                </div>
                <button className="changing" type="submit"  key="submit">Change</button>
            </Form> 
        </div>
    )
}
