import React, { useState,  } from 'react'
import { useSelector,useDispatch  } from 'react-redux';
import { Form, Input } from 'antd';
import { useFormik } from 'formik';
import locationApi from '../../../../apis/airbnb';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
import { actFetchLocationAdmin } from '../module/action';
toast.configure({
    toastClassName: css({
        fontSize: '18px !important',
        backgroundColor: 'red!important',
        padding: '18px !important'
    }),
});
export default function EditLocation({input, closeHandle, id}) {
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    }
    const dispatch = useDispatch()
    const {  moreDetail } = useSelector(state => state.DetailReducer)
    const [componentSize, setComponentSize] = useState('default');
    const { token } = useSelector(state => state.authReducer)
    const wave = () => toast.success('Update the information of location  successfully👋', { position: toast.POSITION.TOP_RIGHT, autoClose: 2500 })
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name:  moreDetail?.name,
           province: moreDetail?.province,
           country: moreDetail?.country,
           valueate: moreDetail?.valueate
        },
        onSubmit: (values) => {
           locationApi.updateInputLocation(id, values, token).then(response =>{
               wave()
               setTimeout(() =>{
                closeHandle()
               }, 2000)
               dispatch(actFetchLocationAdmin())
           }).catch(err =>{
               console.log(err);
           })
    
        }
    })
    return (
        <div className="evaluation__wrapProfile" style={{
            opacity: input ? '1' : '0',
            transform: input ? 'translateY(13%)' : 'translateY(-150vh)'
        }}>

            <div className="content-profile">
                <p>Create a new location if you want</p>
                
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
                <Input name="name" placeholder="Name" value={formik.values.name} onChange={formik.handleChange}/>
                <Input name="province" placeholder="Province" value={formik.values.province} onChange={formik.handleChange}></Input>
                <Input name="country" placeholder="Country" value={formik.values.country} onChange={formik.handleChange}></Input>
                <Input name="valueate" placeholder="Evaluation" value={formik.values.valueate} onChange={formik.handleChange}></Input>
            
            <button className="rateIsAdmin"  >Update location</button>
            </Form>
            {/* <button className="later" >May be later</button> */}
            </div>

            <div className="modal-close" onClick={closeHandle}>
                <svg width="16px" height="16px" viewBox="0 0 16 16" className="icon-close w-1half h-1half absolute pinX-50 pinY-50 translate-50-ul close_icon"><g stroke="none" stroke-width="1" fill="white" fill-rule="evenodd" stroke-linecap="square"><g transform="translate(-1328.000000, -34.000000)" stroke="currentColor"><g transform="translate(1328.000000, 34.000000)"><path d="M1,1 L15,15" id="Line-3"></path> <path d="M1,1 L15,15" id="Line-3" transform="translate(8.000000, 8.000000) scale(-1, 1) rotate(-1.000000) translate(-8.000000, -8.000000) "></path></g></g></g></svg>
            </div>
            
        </div>
    )
}
