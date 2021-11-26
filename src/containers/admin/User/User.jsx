import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { actFetchUserAdmin } from './module/action';
import './User.scss'
import { Checkbox } from 'antd';
import {
    DatePicker,
} from 'antd';
import { Form } from 'antd';
import { useFormik } from 'formik';
import moment from "moment"
import { Table } from 'antd';
import locationApi from '../../../apis/airbnb';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
import { actFetchInformation } from '../../Profile/module/action';
import EditUser from './EditUser/EditUser';
toast.configure({
    toastClassName: css({
        fontSize: '18px !important',
        backgroundColor: 'red!important',
        padding: '18px !important'
    }),
});
export default function User() {
    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.authReducer)
    useEffect(() => {
        dispatch(actFetchUserAdmin())
        dispatch(actFetchInformation(currentUser._id))
    }, [])
    const { listUser } = useSelector(state => state.UserAdminReducer)
    const [showModal, setShow] = useState(false)
    const options = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
    ];
    const waveChange = () => toast.success('Update image  successfully👋', { position: toast.POSITION.TOP_RIGHT, autoClose: 2500 })
    const formik = useFormik({
        initialValues: {
            avatar: {}
        },
        onSubmit: (values) => {
            let formData = new FormData();
            formData.append('avatar', values.avatar)
            locationApi.updateAvatar(formData, token).then(response => {
                waveChange()
                setTimeout(() => {
                    setModal(false)
                }, 3000);
                dispatch(actFetchUserAdmin())
            }).catch(err => {
                console.log(err);
            })
        }
    })
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        birthday: "",
        gender: true,
        address: ""
    })
    const [imgSrc, setImgSrc] = useState(null)
    const onChangeValue = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }
    const handleChangeDate = (values) => {
        let Birthday = moment(values).format('YYYY/MM/DD')
        setUser(prevState => ({
            ...prevState,
            birthday: Birthday,
        }));
    }
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
    function onChange(checkedValues) {
        if (checkedValues[0] === 'Male') {
            setUser(prevState => ({
                ...prevState,
                gender: true,
            }));
        } else {
            setUser(prevState => ({
                ...prevState,
                gender: false,
            }));
        }
    }
    const wave = () => toast.success('Create a new user  successfully👋', { position: toast.POSITION.TOP_RIGHT, autoClose: 2500 })
    const waveDelete = () => toast.success('Delete user  successfully👋', { position: toast.POSITION.TOP_RIGHT, autoClose: 2500 })
   const deleteUser= (id) =>{
      locationApi.deleteUserAdmin(id, token).then(response =>{
        dispatch(actFetchUserAdmin());
        waveDelete()
      }).catch(err =>{
          console.log(err);
      })
   }
    const { token } = useSelector(state => state.authReducer)
    const newUser = () => {
        locationApi.addUser(user, token).then(response => {
            wave()
            dispatch(actFetchUserAdmin())
            setTimeout(() => {
                setShow(false)
            }, 1500)

        }).catch(err => {
            console.log(err);
        })
    }
    const [modal, setModal] = useState(false)
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    }
    const [change, setChange]= useState(false)
    const [idx, setIdx] = useState('')
    const changeInformation = (id) =>{
        setChange(true)
        setIdx(id)
        dispatch(actFetchInformation(id))
    }
    const findUser = (arr, item) => {
        return arr.filter(function(location){
            return location.name.toLowerCase().indexOf(item.toLowerCase()) !== -1;
        })
    }
    const searchItem = (e) =>{
        if(e.target.value === ''){
            dispatch(actFetchUserAdmin())
        }else{
            var arraySelected = findUser(  listUser, e.target.value)
            dispatch({
                type:'CUSTOM_USER',
                payload: arraySelected
            })
        }
    }
    const closeChange = () =>  setChange(false)
    const [componentSize, setComponentSize] = useState('default');
    const columns = [
        {
            title: 'Image',
            dataIndex: 'user',
            render: (text, user) => {
                return <div>
                    <img src={user.avatar} alt={user.avatar} width={80} height={60} onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://i.pinimg.com/736x/a1/88/3a/a1883aa6e53df2b48626a655d67ea4da.jpg";
                    }
                    } style={{ borderRadius: '10%' }} />
                </div>
            },
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
            width: '10%'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.province - b.province,
            width: '20%'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.email - b.email,
            width: '5%'
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.phone - b.phone,
            width: '8%'
        },
        {
            title: 'Address',
            dataIndex: 'address',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.address - b.address,
            width: '15%'
        },
        {
            title: 'Type',
            dataIndex: 'type',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.type - b.type,
            width: '15%'
        },
        {
            title: 'Actions',
            width: '15%',
            render: (location) => {

                return (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '20px' }}>
                        <i class="fas fa-images" style={{ color: 'gray' }} onClick={() => setModal(true)}></i>
                        <i class="far fa-edit" style={{ color: 'gray', marginLeft: '20px' }} onClick={() => changeInformation(location._id)}></i>
                        <i class="far fa-trash-alt" style={{ color: 'red', marginLeft: '20px' }} onClick={() => deleteUser(location._id)}></i>

                    </div>
                )
            }
        },
    ]

    return (
        <div style={{ width: '89%', margin: '50px auto' }}>
            <div className="function">
                <div className="btn-addAdmin">
                    <input type="search" name="Search" placeholder="Search according to name..." className="w-45 py-3 pl-10 text-sm rounded-md sm:w-auto focus:outline-none bg-coolGray-100 text-coolGray-800 focus:bg-coolGray-50" onKeyUp={searchItem}/>
                    <svg fill="currentColor" viewBox="0 0 512 512" className="w-1 h-4 text-coolGray-800 icon-admin-user" >
                        <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z" />
                    </svg>
                </div>
                <div className="btn-addAdmin">
                    <button onClick={() => setShow(true)}>Add New user</button>
                </div>
            </div>
            <Table columns={columns} dataSource={listUser} className="mt-2" style={{ fontSize: '18px' }} />
            {showModal ? <div className="back_drop"></div> : null}
            <div className="register-admin" style={{
                opacity: showModal ? '1' : '0',
                transform: showModal ? "translateY(10%)" : 'translateY(-150vh)'
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
                                        <input placeholder="Name" type="text" name="name" id="name" onChange={onChangeValue} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-1">
                                        <i class="far fa-envelope"></i>
                                    </div>
                                    <div className="col-11">
                                        <input placeholder="Email" type="email" name="email" id="email" onChange={onChangeValue} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-1">
                                        <i class="fas fa-key"></i>
                                    </div>
                                    <div className="col-11">
                                        <input placeholder="Password" type="text" name="password" id="password" onChange={onChangeValue} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <i class="fas fa-phone-square-alt"></i>
                                        <input placeholder="Phone" type="text" name="phone" id="phone" onChange={onChangeValue} />
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
                                        <input placeholder="Address" type="text" name="address" id="address" onChange={onChangeValue} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-1">
                                        <i class="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div className="col-11">
                                        <input placeholder="Type" type="text" name="type" id="type" onChange={onChangeValue} />
                                    </div>
                                </div>
                                <div className="row btn_register">
                                    <button className="btn-register" onClick={() => newUser()}>Create new user</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-close" onClick={() => setShow(false)}>
                    <svg width="16px" height="16px" viewBox="0 0 16 16" className="icon-close w-1half h-1half absolute pinX-50 pinY-50 translate-50-ul close_icon"><g stroke="none" stroke-width="1" fill="white" fill-rule="evenodd" stroke-linecap="square"><g transform="translate(-1328.000000, -34.000000)" stroke="currentColor"><g transform="translate(1328.000000, 34.000000)"><path d="M1,1 L15,15" id="Line-3"></path> <path d="M1,1 L15,15" id="Line-3" transform="translate(8.000000, 8.000000) scale(-1, 1) rotate(-1.000000) translate(-8.000000, -8.000000) "></path></g></g></g></svg>
                </div>
            </div>
            {modal ? <div className="back_drop"></div> : null}
            <div className="evaluation__wrapProfile" style={{
                opacity: modal ? '1' : '0',
                transform: modal ? 'translateY(13%)' : 'translateY(-150vh)'
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
                    <button className="later" onClick={() => setModal(false)} >May be later</button>
                </Form>
                <div className="modal-close" onClick={() => setModal(false)}>
                    <svg width="16px" height="16px" viewBox="0 0 16 16" className="icon-close w-1half h-1half absolute pinX-50 pinY-50 translate-50-ul close_icon"><g stroke="none" stroke-width="1" fill="white" fill-rule="evenodd" stroke-linecap="square"><g transform="translate(-1328.000000, -34.000000)" stroke="currentColor"><g transform="translate(1328.000000, 34.000000)"><path d="M1,1 L15,15" id="Line-3"></path> <path d="M1,1 L15,15" id="Line-3" transform="translate(8.000000, 8.000000) scale(-1, 1) rotate(-1.000000) translate(-8.000000, -8.000000) "></path></g></g></g></svg>
                </div>
            </div>
            {change ? <div className="back_drop"></div> : null}
            <EditUser change={change} id={idx} closeChange={closeChange}/>
        </div>
    )
}
